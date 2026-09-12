// ---------------------------------------------------------------------------
// Tutu Expedition — procedural audio for a six-wheel electric survey rover.
//
// Pure Web Audio, zero imports. Nothing touches the AudioContext until
// resume() is called from a user gesture; when Web Audio is unavailable (or
// the context refuses to start) every method stays a silent no-op, so callers
// never have to check for audio support.
//
// Graph. Every continuous layer is a persistent node driven by setTargetAtTime;
// update() allocates nothing. Only the one-shot SFX (play*) create voices.
//
//   motor   osc(saw) + osc(tri, detuned) -> lowpass -> gain
//   roll    noiseA -> lowpass(300 + speed*120) -> gain
//   wind    noiseB -> bandpass L -> pan L -+
//           noiseC -> bandpass R -> pan R -+-> gain (both modulated by slow LFOs)
//   skid    noiseA -> bandpass 1.8 kHz -> gain -> pan(steering)
//   thump   osc(sine 55..85) -> gain(env)   +   noiseA -> bandpass -> gain(20 ms env)
//   amb     osc(sine 38) -> gain ; noiseA -> lowpass -> gain ; noiseA -> lowpass -> rumble gain(env)
//   shimmer osc(E6) + osc(B6) -> gain (tremolo LFO), audible only at night
//   sfx     one-shot voices -> sfx gain
//                        everything -> bus -> compressor(-18 dB, 4:1) -> master -> destination
// ---------------------------------------------------------------------------

const MASTER_LEVEL = 0.9;
const TINY = 0.0001;          // floor for exponential ramps (they can never reach 0)
const NOISE_SECONDS = 2;
const THUMP_THRESHOLD = 0.25;
const THUMP_COOLDOWN = 0.09;
const RUMBLE_MIN = 18;
const RUMBLE_MAX = 45;
const MAX_DT = 0.25;

// Slots of the "last target sent" table; update() skips automation calls whose
// target has not moved, which keeps the message rate to the audio thread low.
const P_MOTOR_F = 0, P_MOTOR_G = 1, P_MOTOR_LP = 2, P_ROLL_F = 3, P_ROLL_G = 4,
  P_WIND_F = 5, P_WIND_G = 6, P_WIND_Q = 7, P_SKID_G = 8, P_SKID_PAN = 9, P_COUNT = 10;

const GRAPH_KEYS = ['ctx', 'master', 'compressor', 'bus', 'sfx', 'noiseBuffer', 'sources',
  'motor', 'roll', 'wind', 'skid', 'thump', 'ambience', 'shimmer'];

const PENTATONIC = [0, 2, 4, 7, 9, 12, 14, 16];        // semitones above E5 for pickups
const MOTIF = [523.25, 659.25, 783.99];                // C5 E5 G5: "return to base"
const CHORD = [261.63, 392.0, 523.25, 659.25];         // C4 G4 C5 E5: mission complete
const EMPTY = Object.freeze({});

function noop() {}
function num(v, fallback) { return Number.isFinite(v) ? v : fallback; }
function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function swallow(p) { if (p && typeof p.then === 'function') p.then(noop, noop); }

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function snapPentatonic(semis) {
  let best = 0, err = Infinity;
  for (let i = 0; i < PENTATONIC.length; i++) {
    const e = Math.abs(PENTATONIC[i] - semis);
    if (e < err) { err = e; best = PENTATONIC[i]; }
  }
  return best;
}

/** attack -> hold -> exponential release, starting from silence. Returns the end time. */
function envelope(param, t0, attack, hold, release, peak) {
  param.value = 0;
  param.setValueAtTime(0, t0);
  param.linearRampToValueAtTime(peak, t0 + attack);
  if (hold > 0) param.setValueAtTime(peak, t0 + attack + hold);
  const end = t0 + attack + hold + release;
  param.exponentialRampToValueAtTime(TINY, end);
  return end;
}

/** Re-fires an envelope on a persistent voice without a click: it ramps from wherever the param is now. */
function retrigger(param, now, attack, peak, release) {
  param.cancelScheduledValues(now);
  param.setValueAtTime(Math.max(0, num(param.value, 0)), now);
  param.linearRampToValueAtTime(peak, now + attack);
  param.exponentialRampToValueAtTime(TINY, now + attack + release);
  param.setValueAtTime(0, now + attack + release + 0.005);
}

/**
 * @param {{ seed?: number }} [options]  seed fixes the ambience timing (rumble schedule) for a session.
 */
export function createAudio(options) {
  const seed = options && Number.isFinite(options.seed)
    ? options.seed
    : (Date.now() ^ (Math.random() * 0x7fffffff)) >>> 0;
  const rng = mulberry32(seed);
  const last = new Float64Array(P_COUNT).fill(NaN);
  const debug = { thumpCount: 0, rumbleCount: 0 };
  for (let i = 0; i < GRAPH_KEYS.length; i++) debug[GRAPH_KEYS[i]] = null;

  let ctx = null;        // AudioContext, non-null exactly when N is
  let N = null;          // node graph built by build()
  let muted = false;
  let night = 0;
  let clock = 0;         // dt-accumulated time for cooldowns
  let prevImpulse = 0;
  let lastThump = -Infinity;
  let rumbleTimer = nextRumble();

  function nextRumble() { return RUMBLE_MIN + rng() * (RUMBLE_MAX - RUMBLE_MIN); }

  function dirty(slot, value, eps) {
    if (Math.abs(last[slot] - value) <= eps) return false;   // NaN (never sent) falls through
    last[slot] = value;
    return true;
  }

  // ------------------------------------------------------------------ graph

  function build(c) {
    const sr = num(c.sampleRate, 48000);
    const sources = [];
    const gainNode = (v) => { const n = c.createGain(); n.gain.value = v; return n; };
    const filter = (type, f, q) => {
      const n = c.createBiquadFilter(); n.type = type; n.frequency.value = f; n.Q.value = q; return n;
    };
    const osc = (type, f, detune) => {
      const n = c.createOscillator(); n.type = type; n.frequency.value = f;
      if (detune !== 0) n.detune.value = detune;
      n.start(0); sources.push(n); return n;
    };

    // One shared 2 s white-noise buffer; every noisy layer loops it from its own offset.
    const length = Math.max(1, Math.floor(sr * NOISE_SECONDS));
    const noiseBuffer = c.createBuffer(1, length, sr);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const noise = (offset) => {
      const s = c.createBufferSource(); s.buffer = noiseBuffer; s.loop = true;
      s.start(0, offset); sources.push(s); return s;
    };

    // Master chain: bus -> compressor -> master -> destination.
    const bus = gainNode(1);
    const compressor = c.createDynamicsCompressor();
    compressor.threshold.value = -18; compressor.knee.value = 10; compressor.ratio.value = 4;
    compressor.attack.value = 0.004; compressor.release.value = 0.25;
    const master = gainNode(muted ? 0 : MASTER_LEVEL);
    bus.connect(compressor); compressor.connect(master); master.connect(c.destination);
    const sfx = gainNode(0.9);
    sfx.connect(bus);

    const noiseA = noise(0), noiseB = noise(0.53), noiseC = noise(1.31);
    const hasPanner = typeof c.createStereoPanner === 'function';

    // Motor whine.
    const motor = { osc1: osc('sawtooth', 90, -4), osc2: osc('triangle', 90, 6), filter: filter('lowpass', 700, 0.8), gain: gainNode(0) };
    motor.osc1.connect(motor.filter); motor.osc2.connect(motor.filter);
    motor.filter.connect(motor.gain); motor.gain.connect(bus);

    // Rolling / tyre noise.
    const roll = { filter: filter('lowpass', 300, 0.5), gain: gainNode(0) };
    noiseA.connect(roll.filter); roll.filter.connect(roll.gain); roll.gain.connect(bus);

    // Wind: two decorrelated noise sources through slightly different band-passes, panned apart.
    const wind = {
      filterL: filter('bandpass', 400, 0.7), filterR: filter('bandpass', 428, 0.75), gain: gainNode(0.04),
      lfo: osc('sine', 0.11, 0), lfo2: osc('sine', 0.17, 0), panL: null, panR: null, merger: null,
    };
    noiseB.connect(wind.filterL); noiseC.connect(wind.filterR);
    if (hasPanner) {
      wind.panL = c.createStereoPanner(); wind.panL.pan.value = -0.6;
      wind.panR = c.createStereoPanner(); wind.panR.pan.value = 0.6;
      wind.filterL.connect(wind.panL); wind.panL.connect(wind.gain);
      wind.filterR.connect(wind.panR); wind.panR.connect(wind.gain);
    } else {
      wind.merger = c.createChannelMerger(2);
      wind.filterL.connect(wind.merger, 0, 0); wind.filterR.connect(wind.merger, 0, 1);
      wind.merger.connect(wind.gain);
    }
    wind.gain.connect(bus);
    const lfoWindGain = gainNode(0.012), lfoWindL = gainNode(80), lfoWindR = gainNode(60);
    wind.lfo.connect(lfoWindGain); lfoWindGain.connect(wind.gain.gain);
    wind.lfo.connect(lfoWindL); lfoWindL.connect(wind.filterL.frequency);
    wind.lfo2.connect(lfoWindR); lfoWindR.connect(wind.filterR.frequency);

    // Skid.
    const skid = { filter: filter('bandpass', 1800, 2.2), gain: gainNode(0), pan: null };
    noiseA.connect(skid.filter); skid.filter.connect(skid.gain);
    if (hasPanner) { skid.pan = c.createStereoPanner(); skid.gain.connect(skid.pan); skid.pan.connect(bus); }
    else skid.gain.connect(bus);

    // Suspension thump: one retriggered sine voice plus a 20 ms noise click.
    const thump = { osc: osc('sine', 70, 0), gain: gainNode(0), clickFilter: filter('bandpass', 2200, 0.8), click: gainNode(0) };
    thump.osc.connect(thump.gain); thump.gain.connect(bus);
    noiseA.connect(thump.clickFilter); thump.clickFilter.connect(thump.click); thump.click.connect(bus);

    // Ambience: 38 Hz drone, slowly filtered noise bed, distant rumble (persistent, swelled on demand).
    const ambience = {
      drone: osc('sine', 38, 0), droneGain: gainNode(0.05),
      bed: filter('lowpass', 240, 0.6), bedGain: gainNode(0.02),
      rumble: filter('lowpass', 110, 1.0), rumbleGain: gainNode(0),
    };
    ambience.drone.connect(ambience.droneGain); ambience.droneGain.connect(bus);
    noiseA.connect(ambience.bed); ambience.bed.connect(ambience.bedGain); ambience.bedGain.connect(bus);
    const lfoBed = gainNode(50); wind.lfo2.connect(lfoBed); lfoBed.connect(ambience.bed.frequency);
    noiseA.connect(ambience.rumble); ambience.rumble.connect(ambience.rumbleGain); ambience.rumbleGain.connect(bus);

    // Aurora shimmer, only at night: two high sines with a slow tremolo and a hint of vibrato.
    const shimmer = { osc1: osc('sine', 1318.51, 0), osc2: osc('sine', 1975.53, 4), gain: gainNode(0), tremolo: gainNode(0) };
    shimmer.osc1.connect(shimmer.gain); shimmer.osc2.connect(shimmer.gain); shimmer.gain.connect(bus);
    wind.lfo.connect(shimmer.tremolo); shimmer.tremolo.connect(shimmer.gain.gain);
    const vibrato = gainNode(3); wind.lfo2.connect(vibrato); vibrato.connect(shimmer.osc1.frequency);

    return { ctx: c, master, compressor, bus, sfx, noiseBuffer, sources, motor, roll, wind, skid, thump, ambience, shimmer };
  }

  function applyNight(now) {
    N.shimmer.gain.gain.setTargetAtTime(0.012 * night, now, 0.2);
    N.shimmer.tremolo.gain.setTargetAtTime(0.004 * night, now, 0.2);
    N.ambience.bedGain.gain.setTargetAtTime(0.02 * (1 - 0.3 * night), now, 0.2);
  }

  // -------------------------------------------------------------- lifecycle

  function resume() {
    if (N !== null && ctx.state === 'closed') dispose();
    if (N === null) {
      const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (typeof AC !== 'function') return Promise.resolve();
      let c = null;
      try { c = new AC({ latencyHint: 'interactive' }); } catch (_) {
        try { c = new AC(); } catch (__) { c = null; }
      }
      if (!c) return Promise.resolve();
      let graph = null;
      try { graph = build(c); } catch (_) { graph = null; }
      if (graph === null) {
        try { swallow(c.close()); } catch (_) { /* nothing to release */ }
        return Promise.resolve();
      }
      ctx = c; N = graph;
      for (let i = 0; i < GRAPH_KEYS.length; i++) debug[GRAPH_KEYS[i]] = graph[GRAPH_KEYS[i]];
      last.fill(NaN); prevImpulse = 0; lastThump = -Infinity;
      try { applyNight(ctx.currentTime); } catch (_) { /* cosmetic */ }
    }
    if (ctx.state !== 'running') {
      try {
        const p = ctx.resume();
        if (p && typeof p.then === 'function') return p.then(noop, noop);
      } catch (_) { /* stays idle until the next gesture */ }
    }
    return Promise.resolve();
  }

  function dispose() {
    if (N === null) return;
    const sources = N.sources;
    for (let i = 0; i < sources.length; i++) { try { sources[i].stop(0); } catch (_) { /* already stopped */ } }
    try { N.master.disconnect(); } catch (_) { /* ignore */ }
    try { swallow(ctx.close()); } catch (_) { /* ignore */ }
    N = null; ctx = null;
    for (let i = 0; i < GRAPH_KEYS.length; i++) debug[GRAPH_KEYS[i]] = null;
  }

  function setMuted(m) {
    muted = !!m;
    if (N !== null) N.master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, ctx.currentTime, 0.05);
  }

  function toggleMute() { setMuted(!muted); return muted; }

  function setNight(n) {
    night = clamp01(num(n, 0));
    if (N !== null) applyNight(ctx.currentTime);
  }

  // ------------------------------------------------------------- per frame

  /**
   * @param {number} dt seconds since the last frame
   * @param {{ throttle?:number, speed?:number, speedSigned?:number, rpm01?:number, slip?:number,
   *           onGround?:number, suspensionImpulse?:number, steering?:number, airborne?:boolean, brake?:number }} [t]
   */
  function update(dt, t) {
    if (N === null) return;
    const now = ctx.currentTime;
    if (!(now >= 0)) return;
    dt = clamp(num(dt, 0), 0, MAX_DT);
    if (t == null) t = EMPTY;
    const throttle = clamp(num(t.throttle, 0), -1, 1);
    const speed = Math.max(0, num(t.speed, 0));
    const speedSigned = num(t.speedSigned, speed);
    const rpm = clamp01(num(t.rpm01, 0));
    const slip = clamp01(num(t.slip, 0));
    const airborne = t.airborne === true;
    const onGround = airborne ? 0 : clamp01(num(t.onGround, 1));
    const impulse = clamp01(num(t.suspensionImpulse, 0));
    const steering = clamp(num(t.steering, 0), -1, 1);
    const brake = clamp01(num(t.brake, 0));
    clock += dt;

    // Motor: 90 Hz + rpm * 620 Hz with a small throttle overshoot; regen (coasting, braking or
    // reversing against motion) drops the pitch and keeps the level soft.
    const drive = Math.abs(throttle);
    const opposing = throttle * speedSigned < 0 ? drive : 0;
    const regen = clamp01(speed / 6) * Math.max(brake, 1 - drive, opposing) * clamp01(rpm * 3);
    const whine = (90 + 620 * rpm) * (1 - 0.3 * regen) + 45 * drive * (1 - regen);
    const motorLevel = Math.max((0.02 + 0.26 * drive) * clamp01(speed * 0.5 + drive), 0.07 * regen);
    const motorCut = clamp(500 + whine * 2.2 + drive * 900, 200, 8000);
    const m = N.motor;
    if (dirty(P_MOTOR_F, whine, 0.5)) {
      m.osc1.frequency.setTargetAtTime(whine, now, 0.04);
      m.osc2.frequency.setTargetAtTime(whine, now, 0.04);
    }
    if (dirty(P_MOTOR_G, motorLevel, 0.0005)) m.gain.gain.setTargetAtTime(motorLevel, now, 0.06);
    if (dirty(P_MOTOR_LP, motorCut, 2)) m.filter.frequency.setTargetAtTime(motorCut, now, 0.08);

    // Rolling noise.
    const rollCut = clamp(300 + speed * 120, 300, 8000);
    const rollLevel = 0.2 * clamp01(speed / 15) * onGround;
    if (dirty(P_ROLL_F, rollCut, 1)) N.roll.filter.frequency.setTargetAtTime(rollCut, now, 0.08);
    if (dirty(P_ROLL_G, rollLevel, 0.0005)) N.roll.gain.gain.setTargetAtTime(rollLevel, now, 0.08);

    // Wind: louder and brighter with speed, thinner and colder at night, a touch more exposed in the air.
    const gust = clamp(speed / 20, 0, 1.3);
    const windLevel = (0.04 + 0.3 * Math.pow(gust, 1.5)) * (1 - 0.2 * night) * (airborne ? 1.15 : 1);
    const windCentre = 400 + 1000 * clamp01(speed / 20) + 350 * night;
    const windQ = 0.7 + 0.45 * night;
    const w = N.wind;
    if (dirty(P_WIND_G, windLevel, 0.0005)) w.gain.gain.setTargetAtTime(windLevel, now, 0.15);
    if (dirty(P_WIND_F, windCentre, 1)) {
      w.filterL.frequency.setTargetAtTime(windCentre, now, 0.15);
      w.filterR.frequency.setTargetAtTime(windCentre * 1.07, now, 0.18);
    }
    if (dirty(P_WIND_Q, windQ, 0.005)) {
      w.filterL.Q.setTargetAtTime(windQ, now, 0.2);
      w.filterR.Q.setTargetAtTime(windQ + 0.05, now, 0.2);
    }

    // Skid: needs slip, ground contact and some speed; follows the steering across the stereo field.
    const skidLevel = 0.35 * slip * onGround * clamp01(speed - 2);
    if (dirty(P_SKID_G, skidLevel, 0.0005)) N.skid.gain.gain.setTargetAtTime(skidLevel, now, 0.05);
    if (N.skid.pan !== null && dirty(P_SKID_PAN, steering * 0.4, 0.01)) {
      N.skid.pan.pan.setTargetAtTime(steering * 0.4, now, 0.1);
    }

    // Suspension thumps: rising edge through the threshold, rate-limited.
    if (impulse >= THUMP_THRESHOLD && prevImpulse < THUMP_THRESHOLD && clock - lastThump >= THUMP_COOLDOWN) {
      lastThump = clock;
      thump(impulse, now);
    }
    prevImpulse = impulse;

    // Distant rumble every 18-45 s (seeded).
    rumbleTimer -= dt;
    if (rumbleTimer <= 0) {
      rumbleTimer = nextRumble();
      rumble(now);
    }
  }

  function thump(amp, now) {
    const th = N.thump;
    const f = 85 - 30 * amp;                         // heavier landings sit lower: 85 -> 55 Hz
    th.osc.frequency.cancelScheduledValues(now);
    th.osc.frequency.setValueAtTime(f, now);
    th.osc.frequency.exponentialRampToValueAtTime(f * 0.72, now + 0.14);
    retrigger(th.gain.gain, now, 0.006, 0.1 + 0.45 * amp, 0.18);
    retrigger(th.click.gain, now, 0.002, 0.03 + 0.12 * amp, 0.02);
    debug.thumpCount++;
  }

  function rumble(now) {
    const a = N.ambience;
    const swell = 1 + rng() * 0.5, decay = 1 + rng() * 0.6, peak = 0.05 + rng() * 0.05;
    a.rumble.frequency.setTargetAtTime(80 + rng() * 60, now, 0.3);
    const g = a.rumbleGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(0, num(g.value, 0)), now);
    g.linearRampToValueAtTime(peak, now + swell);
    g.linearRampToValueAtTime(0, now + swell + decay);
    debug.rumbleCount++;
  }

  // ------------------------------------------------------------ one-shots

  function voice(type, f0, f1, t0, attack, hold, release, peak, detune, dest) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    const end = t0 + attack + hold + release;
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, end);
    if (detune !== 0) o.detune.value = detune;
    const g = ctx.createGain();
    envelope(g.gain, t0, attack, hold, release, peak);
    o.connect(g); g.connect(dest);
    o.start(t0); o.stop(end + 0.02);
    o.onended = () => { o.disconnect(); g.disconnect(); };
    return o;
  }

  function burst(type, f0, f1, q, t0, attack, hold, release, peak, dest) {
    const s = ctx.createBufferSource();
    s.buffer = N.noiseBuffer; s.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t0);
    const end = t0 + attack + hold + release;
    if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, end);
    const g = ctx.createGain();
    envelope(g.gain, t0, attack, hold, release, peak);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t0, Math.random() * 1.5); s.stop(end + 0.02);
    s.onended = () => { s.disconnect(); f.disconnect(); g.disconnect(); };
    return s;
  }

  /** Crisp bell; pitch climbs a pentatonic scale from E5 as index/total rises. */
  function playPickup(index, total) {
    if (N === null) return;
    const i = Math.max(0, Math.floor(num(index, 0)));
    const n = Math.max(1, Math.floor(num(total, 1)));
    const frac = n > 1 ? clamp01(i / (n - 1)) : 0;
    const f = 659.25 * Math.pow(2, snapPentatonic(16 * frac) / 12);
    const now = ctx.currentTime, sfx = N.sfx;
    voice('sine', f, f, now, 0.004, 0.02, 0.6, 0.22, 0, sfx);
    voice('sine', f * 2.756, f * 2.756, now, 0.003, 0, 0.3, 0.06, 0, sfx);      // bell partial
    voice('triangle', f * 2, f * 2, now + 0.012, 0.004, 0.01, 0.4, 0.05, 0, sfx);
  }

  /** Radio key-up, then a rising three-note motif: "return to base". */
  function playAllCollected() {
    if (N === null) return;
    const now = ctx.currentTime, sfx = N.sfx;
    burst('bandpass', 2400, 2400, 3, now, 0.003, 0.02, 0.05, 0.05, sfx);
    for (let k = 0; k < MOTIF.length; k++) {
      const lastNote = k === MOTIF.length - 1;
      voice('triangle', MOTIF[k], MOTIF[k], now + 0.06 + k * 0.14, 0.008, lastNote ? 0.2 : 0.06, lastNote ? 0.5 : 0.18, 0.16, 0, sfx);
    }
    voice('sine', 1567.98, 1567.98, now + 0.34, 0.01, 0.2, 0.5, 0.05, 0, sfx);
  }

  /** ~2 s sting: a slow major chord in detuned sine/triangle pairs, a high sparkle and a soft noise swell. */
  function playComplete() {
    if (N === null) return;
    const now = ctx.currentTime, sfx = N.sfx;
    for (let k = 0; k < CHORD.length; k++) {
      voice('sine', CHORD[k], CHORD[k], now, 0.12, 1.0, 0.9, 0.11, -4 + k * 3, sfx);
      voice('triangle', CHORD[k], CHORD[k], now + 0.02, 0.15, 0.9, 0.9, 0.045, 5 - k * 2, sfx);
    }
    voice('sine', 1318.51, 1318.51, now + 0.35, 0.05, 0.4, 1.1, 0.06, 0, sfx);
    burst('bandpass', 700, 1400, 0.8, now, 0.7, 0.3, 1.0, 0.05, sfx);
  }

  /** Rover power-up: motors spin up through an opening filter, two relay clicks, a two-note ready tone. */
  function playStart() {
    if (N === null) return;
    const now = ctx.currentTime, sfx = N.sfx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.Q.value = 1.2;
    lp.frequency.setValueAtTime(260, now);
    lp.frequency.exponentialRampToValueAtTime(2600, now + 0.9);
    lp.connect(sfx);
    const spin = voice('sawtooth', 55, 380, now, 0.08, 0.5, 0.35, 0.08, 0, lp);
    voice('triangle', 55, 380, now, 0.08, 0.5, 0.35, 0.06, 7, lp);
    const done = spin.onended;
    spin.onended = () => { done(); lp.disconnect(); };
    burst('highpass', 1800, 1800, 0.7, now + 0.02, 0.002, 0.004, 0.025, 0.12, sfx);
    burst('highpass', 2400, 2400, 0.7, now + 0.62, 0.002, 0.004, 0.02, 0.08, sfx);
    voice('sine', 880, 880, now + 0.72, 0.01, 0.05, 0.22, 0.05, 0, sfx);
    voice('sine', 1174.66, 1174.66, now + 0.84, 0.01, 0.08, 0.3, 0.05, 0, sfx);
  }

  /** Hydraulic thud with an air release. */
  function playReset() {
    if (N === null) return;
    const now = ctx.currentTime, sfx = N.sfx;
    voice('sine', 75, 38, now, 0.005, 0.03, 0.28, 0.45, 0, sfx);
    burst('lowpass', 500, 500, 0.8, now, 0.003, 0.01, 0.12, 0.2, sfx);
    burst('bandpass', 3200, 2200, 1.2, now + 0.06, 0.02, 0.05, 0.5, 0.08, sfx);
  }

  /** Collision: low sine drop plus a noise burst, both scaled by strength (0 is silent and free). */
  function playImpact(strength) {
    if (N === null) return;
    const s = clamp01(num(strength, 0));
    if (s <= 0) return;
    const now = ctx.currentTime, sfx = N.sfx;
    voice('sine', 60 + 20 * s, 34, now, 0.004, 0.02, 0.22 + 0.15 * s, 0.5 * s, 0, sfx);
    burst('lowpass', 700 + 2200 * s, 300, 0.7, now, 0.002, 0.01, 0.08 + 0.1 * s, 0.3 * s, sfx);
  }

  return {
    get state() { return N !== null && ctx.state === 'running' ? 'running' : 'idle'; },
    get muted() { return muted; },
    resume, setMuted, toggleMute, update,
    playPickup, playAllCollected, playComplete, playStart, playReset, playImpact,
    setNight, dispose,
    _debug: debug,
  };
}
