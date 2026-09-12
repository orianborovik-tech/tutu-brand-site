import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudio } from '../js/audio.js';

// ---------------------------------------------------------------------------
// Minimal fake Web Audio API. It is deliberately strict where browsers are
// strict (non-finite param values, exponential ramps to <= 0, double start(),
// negative time constants all throw) so that "does not throw" is meaningful.
// ---------------------------------------------------------------------------

class FakeParam {
  constructor(name, value) {
    this.name = name; this._v = value; this.defaultValue = value;
    this.calls = 0; this._lastMethod = null; this._lastArgs = null; this._max = -Infinity;
  }
  get value() { return this._v; }
  set value(v) { this._checkValue(v); this._apply(v); }
  _apply(v) { this._v = v; if (v > this._max) this._max = v; }
  _checkValue(v) {
    if (typeof v !== 'number' || !Number.isFinite(v)) throw new TypeError(`${this.name}: non-finite value ${v}`);
  }
  _checkTime(t) {
    if (typeof t !== 'number' || !Number.isFinite(t) || t < 0) throw new RangeError(`${this.name}: bad time ${t}`);
  }
  _rec(method, args, v) {
    this._lastMethod = method; this._lastArgs = args; this.calls++;
    if (v !== undefined) this._apply(v);
    return this;
  }
  setValueAtTime(v, t) { this._checkValue(v); this._checkTime(t); return this._rec('setValueAtTime', [v, t], v); }
  linearRampToValueAtTime(v, t) { this._checkValue(v); this._checkTime(t); return this._rec('linearRampToValueAtTime', [v, t], v); }
  exponentialRampToValueAtTime(v, t) {
    this._checkValue(v); this._checkTime(t);
    if (v <= 0) throw new RangeError(`${this.name}: exponential ramp to ${v}`);
    return this._rec('exponentialRampToValueAtTime', [v, t], v);
  }
  setTargetAtTime(v, t, tc) {
    this._checkValue(v); this._checkTime(t);
    if (typeof tc !== 'number' || !Number.isFinite(tc) || tc < 0) throw new RangeError(`${this.name}: bad timeConstant ${tc}`);
    return this._rec('setTargetAtTime', [v, t, tc], v);
  }
  cancelScheduledValues(t) { this._checkTime(t); return this._rec('cancelScheduledValues', [t]); }
}

class InvalidStateError extends Error { constructor(m) { super(m); this.name = 'InvalidStateError'; } }

class FakeNode {
  constructor(ctx, kind, params = {}, props = {}) {
    this.context = ctx; this._kind = kind; this._outputs = [];
    this.channelCount = 2; this.numberOfInputs = kind === 'oscillator' || kind === 'bufferSource' || kind === 'constant' ? 0 : 1;
    this.numberOfOutputs = kind === 'destination' ? 0 : 1;
    for (const [k, v] of Object.entries(params)) this[k] = new FakeParam(`${kind}.${k}`, v);
    Object.assign(this, props);
    if (this.numberOfInputs === 0) { this._started = null; this._stopped = null; this.onended = null; }
  }
  connect(target) {
    if (this.context._closed) throw new InvalidStateError('connect on closed context');
    if (!(target instanceof FakeNode) && !(target instanceof FakeParam)) throw new TypeError('connect: invalid destination');
    this._outputs.push(target);
    return target instanceof FakeNode ? target : undefined;
  }
  disconnect(target) {
    if (target === undefined) this._outputs.length = 0;
    else this._outputs = this._outputs.filter(o => o !== target);
  }
  start(when = 0, offset = 0) {
    if (this.numberOfInputs !== 0) throw new TypeError('start on non-source');
    if (typeof when !== 'number' || !Number.isFinite(when) || when < 0) throw new RangeError(`start: bad time ${when}`);
    if (typeof offset !== 'number' || !Number.isFinite(offset) || offset < 0) throw new RangeError(`start: bad offset ${offset}`);
    if (this._started !== null) throw new InvalidStateError('start called twice');
    this._started = when;
  }
  stop(when = 0) {
    if (this._started === null) throw new InvalidStateError('stop before start');
    if (typeof when !== 'number' || !Number.isFinite(when) || when < 0) throw new RangeError(`stop: bad time ${when}`);
    this._stopped = when;
  }
}

class FakeAudioContext {
  static instances = [];
  constructor(opts = {}) {
    if (FakeAudioContext.throwOnConstruct) throw new Error('AudioContext refused');
    this._t = 0; this.sampleRate = 48000; this._closed = false; this._resumeCalls = 0;
    this.state = FakeAudioContext.initialState;
    this.latencyHint = opts.latencyHint;
    this._created = [];
    this.destination = new FakeNode(this, 'destination');
    FakeAudioContext.instances.push(this);
  }
  static initialState = 'running';
  static throwOnConstruct = false;
  static reset() { FakeAudioContext.instances = []; FakeAudioContext.initialState = 'running'; FakeAudioContext.throwOnConstruct = false; }
  get currentTime() { return this._t; }
  _advance(dt) { this._t += dt; }
  resume() {
    this._resumeCalls++;
    if (this._closed) return Promise.reject(new InvalidStateError('resume on closed context'));
    this.state = 'running';
    return Promise.resolve();
  }
  suspend() { this.state = 'suspended'; return Promise.resolve(); }
  close() { this._closed = true; this.state = 'closed'; return Promise.resolve(); }
  _node(kind, params, props) {
    if (this._closed) throw new InvalidStateError(`create ${kind} on closed context`);
    const n = new FakeNode(this, kind, params, props);
    this._created.push(n);
    return n;
  }
  _count(kind) { return this._created.filter(n => n._kind === kind).length; }
  createGain() { return this._node('gain', { gain: 1 }); }
  createOscillator() { return this._node('oscillator', { frequency: 440, detune: 0 }, { type: 'sine' }); }
  createBufferSource() { return this._node('bufferSource', { playbackRate: 1, detune: 0 }, { buffer: null, loop: false, loopStart: 0, loopEnd: 0 }); }
  createConstantSource() { return this._node('constant', { offset: 1 }); }
  createBiquadFilter() { return this._node('filter', { frequency: 350, Q: 1, gain: 0, detune: 0 }, { type: 'lowpass' }); }
  createDynamicsCompressor() { return this._node('compressor', { threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }); }
  createStereoPanner() { return this._node('panner', { pan: 0 }); }
  createChannelMerger(n = 6) { const m = this._node('merger', {}); m.numberOfInputs = n; return m; }
  createBuffer(channels, length, sampleRate) {
    if (!(channels >= 1) || !(length >= 1) || !(sampleRate >= 3000)) throw new RangeError('createBuffer: bad args');
    const data = [];
    return {
      numberOfChannels: channels, length, sampleRate, duration: length / sampleRate,
      getChannelData(i) { if (i >= channels) throw new RangeError('channel'); return (data[i] ||= new Float32Array(length)); },
    };
  }
}

function installStub(t, { name = 'AudioContext', ...flags } = {}) {
  FakeAudioContext.reset();
  Object.assign(FakeAudioContext, flags);
  delete globalThis.AudioContext; delete globalThis.webkitAudioContext;
  globalThis[name] = FakeAudioContext;
  t.after(() => { delete globalThis.AudioContext; delete globalThis.webkitAudioContext; FakeAudioContext.reset(); });
  return FakeAudioContext;
}

function telemetryAt(i) {
  const s = Math.sin(i * 0.031), c = Math.cos(i * 0.017);
  const speed = Math.max(0, 12 + 12 * s);
  const airborne = (i % 97) > 90;
  return {
    throttle: Math.sin(i * 0.05),
    speed,
    speedSigned: speed * (c > -0.6 ? 1 : -1),
    rpm01: Math.min(1, speed / 22),
    slip: Math.max(0, c) * 0.9,
    onGround: airborne ? 0 : 1 - Math.max(0, s) * 0.3,
    suspensionImpulse: i % 23 === 0 ? 0.3 + 0.7 * Math.abs(c) : Math.abs(s) * 0.2,
    steering: Math.sin(i * 0.09),
    airborne,
    brake: c < -0.7 ? 1 : 0,
  };
}

const STILL = { throttle: 0, speed: 0, speedSigned: 0, rpm01: 0, slip: 0, onGround: 1, suspensionImpulse: 0, steering: 0, airborne: false, brake: 0 };
const FULL = { throttle: 1, speed: 20, speedSigned: 20, rpm01: 1, slip: 0, onGround: 1, suspensionImpulse: 0, steering: 0, airborne: false, brake: 0 };

function exerciseEverything(audio) {
  audio.update(0.016, FULL);
  audio.update(0.016, STILL);
  audio.update(0.016, undefined);
  audio.playPickup(0, 8); audio.playPickup(7, 8);
  audio.playAllCollected(); audio.playComplete(); audio.playStart(); audio.playReset();
  audio.playImpact(0); audio.playImpact(0.5); audio.playImpact(1);
  audio.setNight(0.5);
  audio.setMuted(true); audio.toggleMute();
}

async function running(t, opts) {
  const AC = installStub(t, opts);
  const audio = createAudio({ seed: 7 });
  await audio.resume();
  const ctx = AC.instances[0];
  return { AC, audio, ctx };
}

// ---------------------------------------------------------------------------

test('without any AudioContext every method is a safe no-op', async () => {
  delete globalThis.AudioContext; delete globalThis.webkitAudioContext;
  let audio;
  assert.doesNotThrow(() => { audio = createAudio(); });
  assert.equal(audio.state, 'idle');
  assert.equal(audio.muted, false);
  await assert.doesNotReject(async () => { await audio.resume(); });
  assert.equal(audio.state, 'idle');
  assert.doesNotThrow(() => exerciseEverything(audio));
  assert.equal(audio.muted, false, 'setMuted(true) then toggleMute() leaves it unmuted');
  assert.equal(audio._debug.master, null);
  assert.doesNotThrow(() => audio.dispose());
});

test('a throwing AudioContext constructor leaves the object idle and harmless', async (t) => {
  installStub(t, { throwOnConstruct: true });
  const audio = createAudio();
  await assert.doesNotReject(async () => { await audio.resume(); });
  assert.equal(audio.state, 'idle');
  assert.equal(audio._debug.master, null);
  assert.doesNotThrow(() => exerciseEverything(audio));
  assert.doesNotThrow(() => audio.dispose());
});

test('resume() builds the graph once and routes it through compressor and master', async (t) => {
  const { AC, audio, ctx } = await running(t);
  assert.equal(audio.state, 'running');
  assert.equal(AC.instances.length, 1);
  assert.equal(audio._debug.ctx, ctx);
  const { master, compressor } = audio._debug;
  assert.ok(master, 'master gain exists');
  assert.equal(master._kind, 'gain');
  assert.equal(compressor._kind, 'compressor');
  assert.equal(compressor.threshold.value, -18);
  assert.equal(compressor.ratio.value, 4);
  assert.ok(compressor._outputs.includes(master), 'compressor feeds master');
  assert.ok(master._outputs.includes(ctx.destination), 'master feeds destination');
  assert.ok(master.gain.value > 0, 'unmuted master is audible');
  assert.ok(ctx._count('bufferSource') >= 1, 'looping noise sources exist');
  assert.ok(ctx._count('oscillator') >= 2, 'motor oscillators exist');
  for (const n of ctx._created) if (n.numberOfInputs === 0) assert.notEqual(n._started, null, `${n._kind} was started`);

  const before = ctx._created.length;
  await audio.resume();
  await audio.resume();
  assert.equal(audio._debug.master, master, 'second resume keeps the same graph');
  assert.equal(ctx._created.length, before, 'second resume creates no nodes');
  assert.equal(AC.instances.length, 1, 'second resume creates no context');
});

test('webkitAudioContext is used when the unprefixed constructor is missing', async (t) => {
  const { audio } = await running(t, { name: 'webkitAudioContext' });
  assert.equal(audio.state, 'running');
  assert.ok(audio._debug.master);
});

test('graph builds without createStereoPanner (ChannelMerger fallback)', async (t) => {
  const AC = installStub(t);
  const orig = AC.prototype.createStereoPanner;
  AC.prototype.createStereoPanner = undefined;
  t.after(() => { AC.prototype.createStereoPanner = orig; });
  const audio = createAudio();
  await audio.resume();
  assert.equal(audio.state, 'running');
  assert.ok(audio._debug.master);
  assert.equal(AC.instances[0]._count('panner'), 0);
  assert.ok(AC.instances[0]._count('merger') >= 1, 'merger used for stereo width');
  assert.doesNotThrow(() => { for (let i = 0; i < 50; i++) audio.update(0.016, telemetryAt(i)); });
});

test('a suspended context is resumed by resume(), and again after the browser suspends it', async (t) => {
  const { audio, ctx } = await running(t, { initialState: 'suspended' });
  assert.ok(ctx._resumeCalls >= 1, 'ctx.resume() was called');
  assert.equal(ctx.state, 'running');
  assert.equal(audio.state, 'running');
  const master = audio._debug.master;
  ctx.state = 'suspended';
  assert.equal(audio.state, 'idle');
  assert.doesNotThrow(() => { audio.update(0.016, FULL); audio.playPickup(1, 8); });
  const calls = ctx._resumeCalls;
  await audio.resume();
  assert.equal(ctx._resumeCalls, calls + 1);
  assert.equal(audio.state, 'running');
  assert.equal(audio._debug.master, master, 'no rebuild after a suspend/resume cycle');
});

test('update() survives 2000 frames of varied telemetry without throwing or allocating nodes', async (t) => {
  const { audio, ctx } = await running(t);
  const before = ctx._created.length;
  assert.doesNotThrow(() => {
    for (let i = 0; i < 2000; i++) {
      const dt = 1 / 60 + (i % 7) * 0.004;
      audio.update(dt, telemetryAt(i));
      ctx._advance(dt);
    }
  });
  assert.equal(ctx._created.length, before, 'update() creates no audio nodes');
  assert.ok(audio._debug.thumpCount > 0, 'suspension thumps were triggered');
  assert.ok(audio._debug.rumbleCount > 0, 'at least one distant rumble in ~57 s');
});

test('update() tolerates missing, partial and non-finite telemetry', async (t) => {
  const { audio } = await running(t);
  assert.doesNotThrow(() => {
    audio.update(0.016);
    audio.update(0.016, null);
    audio.update(0.016, {});
    audio.update(NaN, { throttle: NaN, speed: Infinity, rpm01: -Infinity, slip: 'x', onGround: undefined, suspensionImpulse: NaN });
    audio.update(-1, { speed: -5, throttle: 3, rpm01: 2, onGround: 4 });
    audio.update(1e9, FULL);
  });
});

test('motor whine tracks rpm and throttle, goes silent when parked, softens under regen', async (t) => {
  const { audio } = await running(t);
  const m = audio._debug.motor;
  audio.update(0.016, FULL);
  assert.ok(m.osc1.frequency.value >= 700 && m.osc1.frequency.value <= 800, `full rpm frequency ${m.osc1.frequency.value}`);
  assert.ok(m.gain.gain.value >= 0.25 && m.gain.gain.value <= 0.3, `full throttle gain ${m.gain.gain.value}`);
  assert.equal(m.osc1.type, 'sawtooth');
  assert.equal(m.osc2.type, 'triangle');
  assert.notEqual(m.osc1.detune.value, m.osc2.detune.value, 'oscillators are detuned from each other');
  assert.equal(m.filter.type, 'lowpass');
  assert.equal(m.osc1.frequency._lastMethod, 'setTargetAtTime');
  const tc = m.osc1.frequency._lastArgs[2];
  assert.ok(tc >= 0.03 && tc <= 0.2, `time constant ${tc}`);

  audio.update(0.016, STILL);
  assert.ok(Math.abs(m.osc1.frequency.value - 90) < 1, `idle frequency ${m.osc1.frequency.value}`);
  assert.ok(m.gain.gain.value < 0.005, `parked gain ${m.gain.gain.value}`);

  const coasting = { ...FULL, throttle: 0, speed: 10, speedSigned: 10, rpm01: 0.5 };
  audio.update(0.016, coasting);
  const regenF = m.osc1.frequency.value, regenG = m.gain.gain.value;
  audio.update(0.016, { ...coasting, throttle: 1 });
  assert.ok(regenF < m.osc1.frequency.value, 'regen whine is lower than driven whine at the same rpm');
  assert.ok(regenG > 0 && regenG < m.gain.gain.value, 'regen whine is softer than driven whine');
});

test('rolling noise follows speed and ground contact', async (t) => {
  const { audio } = await running(t);
  const r = audio._debug.roll;
  audio.update(0.016, { ...FULL, speed: 10, speedSigned: 10, rpm01: 0.5 });
  assert.ok(r.gain.gain.value > 0, 'rolling audible on the ground');
  assert.ok(Math.abs(r.filter.frequency.value - 1500) < 1, `cutoff ${r.filter.frequency.value}`);
  assert.equal(r.filter.type, 'lowpass');
  audio.update(0.016, { ...FULL, speed: 10, speedSigned: 10, rpm01: 0.5, onGround: 0, airborne: true });
  assert.equal(r.gain.gain.value, 0, 'silent in the air');
  audio.update(0.016, STILL);
  assert.equal(r.gain.gain.value, 0, 'silent when parked');
});

test('wind has a speed-dependent baseline, stereo width, an LFO, and thins at night', async (t) => {
  const { audio, ctx } = await running(t);
  const w = audio._debug.wind;
  audio.update(0.016, STILL);
  assert.ok(Math.abs(w.gain.gain.value - 0.04) < 1e-6, `baseline ${w.gain.gain.value}`);
  assert.ok(Math.abs(w.filterL.frequency.value - 400) < 1, `centre at rest ${w.filterL.frequency.value}`);
  assert.equal(w.filterL.type, 'bandpass');
  assert.equal(w.filterR.type, 'bandpass');
  assert.notEqual(w.filterL, w.filterR);
  assert.ok(ctx._count('panner') >= 2, 'two panners for stereo width');
  assert.equal(w.lfo._kind, 'oscillator');
  assert.ok(w.lfo.frequency.value < 1, 'LFO is slow');
  const feedsGainParam = ctx._created.some(n => n._kind === 'gain' && n._outputs.includes(w.gain.gain));
  assert.ok(feedsGainParam, 'an LFO depth gain modulates the wind gain param');

  audio.update(0.016, FULL);
  assert.ok(Math.abs(w.gain.gain.value - 0.34) < 1e-6, `gain at 20 m/s ${w.gain.gain.value}`);
  assert.ok(w.filterL.frequency.value > 1300 && w.filterL.frequency.value <= 1400.5, `centre at speed ${w.filterL.frequency.value}`);
  const dayQ = w.filterL.Q.value, dayF = w.filterL.frequency.value;

  audio.setNight(1);
  audio.update(0.016, FULL);
  assert.ok(w.filterL.frequency.value > dayF, 'colder wind sits higher');
  assert.ok(w.filterL.Q.value > dayQ, 'thinner band at night');
  assert.ok(audio._debug.shimmer.gain.gain.value > 0, 'aurora shimmer audible at night');
  assert.ok(audio._debug.shimmer.gain.gain.value < 0.05, 'shimmer is very faint');
  audio.setNight(0);
  audio.update(0.016, FULL);
  assert.equal(audio._debug.shimmer.gain.gain.value, 0, 'no shimmer by day');
  assert.doesNotThrow(() => { audio.setNight(NaN); audio.setNight(-2); audio.setNight(7); audio.update(0.016, FULL); });
});

test('skid noise needs slip, ground contact and speed above 2 m/s', async (t) => {
  const { audio } = await running(t);
  const s = audio._debug.skid;
  assert.equal(s.filter.type, 'bandpass');
  assert.ok(Math.abs(s.filter.frequency.value - 1800) < 1);
  audio.update(0.016, { ...FULL, speed: 10, speedSigned: 10, slip: 0.5, onGround: 1 });
  assert.ok(Math.abs(s.gain.gain.value - 0.175) < 1e-6, `skid gain ${s.gain.gain.value}`);
  audio.update(0.016, { ...FULL, speed: 10, speedSigned: 10, slip: 0.5, onGround: 0 });
  assert.equal(s.gain.gain.value, 0, 'no skid in the air');
  audio.update(0.016, { ...FULL, speed: 1, speedSigned: 1, slip: 1, onGround: 1 });
  assert.equal(s.gain.gain.value, 0, 'no skid below 2 m/s');
});

test('suspension thumps are edge-triggered with a 90 ms cooldown and reuse one voice', async (t) => {
  const { audio, ctx } = await running(t);
  const seq = [0, 0.6, 0.1, 0.6, 0.1, 0.1, 0.6, 0.6, 0.6, 0.05, 0.9];
  const nodes = ctx._created.length;
  const dt = 0.03;
  for (const imp of seq) { audio.update(dt, { ...STILL, suspensionImpulse: imp }); ctx._advance(dt); }
  assert.equal(audio._debug.thumpCount, 3, 'rising edges outside the cooldown: frame 1, frame 6, frame 10');
  assert.equal(ctx._created.length, nodes, 'thumps do not allocate nodes');
  const th = audio._debug.thump;
  assert.equal(th.osc.type, 'sine');
  assert.ok(th.osc.frequency.value >= 30 && th.osc.frequency.value <= 85, `thump frequency ${th.osc.frequency.value}`);
  assert.ok(th.gain.gain.calls > 0 && th.click.gain.calls > 0, 'thump and click envelopes were scheduled');
});

test('ambience: low drone, filtered bed and a seeded distant rumble', async (t) => {
  const { audio, ctx } = await running(t);
  const a = audio._debug.ambience;
  assert.equal(a.drone.type, 'sine');
  assert.ok(Math.abs(a.drone.frequency.value - 38) < 0.01);
  assert.ok(a.droneGain.gain.value > 0 && a.droneGain.gain.value < 0.2);
  assert.equal(a.bed.type, 'lowpass');
  assert.ok(a.bedGain.gain.value > 0 && a.bedGain.gain.value < 0.1);
  assert.equal(a.rumbleGain.gain.value, 0, 'rumble silent until triggered');
  let frames = 0;
  while (audio._debug.rumbleCount === 0 && frames < 60 * 50) { audio.update(1 / 60, STILL); ctx._advance(1 / 60); frames++; }
  assert.ok(audio._debug.rumbleCount === 1, 'rumble fired within 50 s');
  assert.ok(frames / 60 >= 18 && frames / 60 <= 45, `first rumble at ${frames / 60} s`);
  assert.equal(a.rumbleGain.gain._lastMethod, 'linearRampToValueAtTime');
  const first = frames;
  const b = createAudio({ seed: 7 });
  await b.resume();
  const ctx2 = ctx.constructor.instances[1];
  let f2 = 0;
  while (b._debug.rumbleCount === 0 && f2 < 60 * 50) { b.update(1 / 60, STILL); ctx2._advance(1 / 60); f2++; }
  assert.equal(f2, first, 'same seed reproduces the rumble schedule');
});

test('one-shot SFX schedule bounded voices and pickups rise in pitch', async (t) => {
  const { audio, ctx } = await running(t);
  const newNodes = (fn) => { const n = ctx._created.length; fn(); return ctx._created.slice(n); };
  const oscFreqs = (nodes) => nodes.filter(n => n._kind === 'oscillator').map(n => n.frequency._max);
  const check = (nodes, label) => {
    assert.ok(nodes.length > 0, `${label} creates voices`);
    for (const n of nodes) {
      if (n.numberOfInputs === 0) {
        assert.notEqual(n._started, null, `${label}: source started`);
        assert.notEqual(n._stopped, null, `${label}: source has a scheduled stop`);
        assert.ok(n._stopped > n._started, `${label}: stop after start`);
      }
      const reaches = (node, depth = 0) => node === audio._debug.master || (depth < 8 && node._outputs.some(o => o instanceof FakeNode && reaches(o, depth + 1)));
      assert.ok(reaches(n), `${label}: ${n._kind} reaches the master chain`);
    }
  };
  const p0 = newNodes(() => audio.playPickup(0, 8)); check(p0, 'pickup 0');
  const p7 = newNodes(() => audio.playPickup(7, 8)); check(p7, 'pickup 7');
  assert.ok(Math.max(...oscFreqs(p7)) > Math.max(...oscFreqs(p0)), 'pickup pitch rises with index');
  assert.doesNotThrow(() => { audio.playPickup(); audio.playPickup(NaN, 0); audio.playPickup(30, 8); });
  const motif = newNodes(() => audio.playAllCollected()); check(motif, 'all-collected');
  assert.ok(new Set(oscFreqs(motif)).size >= 3, 'three distinct notes');
  const done = newNodes(() => audio.playComplete()); check(done, 'complete');
  const span = Math.max(...done.filter(n => n._stopped != null).map(n => n._stopped)) - ctx.currentTime;
  assert.ok(span >= 1.6 && span <= 3.5, `complete sting lasts ${span} s`);
  assert.ok(done.some(n => n._kind === 'bufferSource'), 'complete has a noise swell');
  assert.ok(done.filter(n => n._kind === 'oscillator').length >= 4, 'complete is layered');
  check(newNodes(() => audio.playStart()), 'start');
  check(newNodes(() => audio.playReset()), 'reset');
  const soft = newNodes(() => audio.playImpact(0.3)); check(soft, 'impact 0.3');
  const hard = newNodes(() => audio.playImpact(1)); check(hard, 'impact 1');
  const peak = (nodes) => Math.max(...nodes.filter(n => n._kind === 'gain').map(n => n.gain._max));
  assert.ok(peak(hard) > peak(soft), 'harder impacts are louder');
  assert.equal(newNodes(() => audio.playImpact(0)).length, 0, 'zero-strength impact is silent and free');
  assert.doesNotThrow(() => { audio.playImpact(NaN); audio.playImpact(-1); audio.playImpact(5); });
});

test('mute ramps the master gain to zero and back, and is honoured before resume()', async (t) => {
  const AC = installStub(t);
  const audio = createAudio();
  audio.setMuted(true);
  assert.equal(audio.muted, true);
  await audio.resume();
  const master = audio._debug.master;
  assert.equal(master.gain.value, 0, 'graph built muted stays silent');
  audio.setMuted(false);
  assert.equal(audio.muted, false);
  assert.ok(master.gain.value > 0);
  audio.setMuted(true);
  assert.equal(master.gain.value, 0);
  assert.equal(master.gain._lastMethod, 'setTargetAtTime', 'mute is ramped, not stepped');
  assert.ok(master.gain._lastArgs[2] > 0, 'non-zero time constant');
  assert.equal(audio.toggleMute(), false);
  assert.equal(audio.muted, false);
  assert.ok(master.gain.value > 0);
  assert.equal(audio.toggleMute(), true);
  assert.equal(master.gain.value, 0);
  assert.equal(AC.instances.length, 1);
});

test('dispose() stops sources, closes the context, and leaves a safe object that can resume again', async (t) => {
  const { AC, audio, ctx } = await running(t);
  audio.update(0.016, FULL);
  audio.playStart();
  assert.doesNotThrow(() => audio.dispose());
  assert.equal(audio.state, 'idle');
  assert.equal(audio._debug.master, null);
  assert.equal(ctx._closed, true, 'context closed');
  for (const n of ctx._created) if (n.numberOfInputs === 0 && n.loop) assert.notEqual(n._stopped, null, `${n._kind} loop stopped`);
  assert.doesNotThrow(() => exerciseEverything(audio));
  assert.doesNotThrow(() => audio.dispose(), 'double dispose is harmless');
  await audio.resume();
  assert.equal(audio.state, 'running');
  assert.equal(AC.instances.length, 2, 'a fresh context after dispose');
  assert.ok(audio._debug.master && audio._debug.ctx === AC.instances[1]);
  assert.doesNotThrow(() => audio.update(0.016, FULL));
  audio.dispose();
});
