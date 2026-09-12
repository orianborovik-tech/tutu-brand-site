// Tutu Expedition — boot, game loop, camera and state machine.
import * as THREE from 'three';
import { createSky } from './sky.js';
import { createTerrain, createProceduralNormalMap } from './terrain.js';
import { createPhysics } from './physics.js';
import { createVehicle } from './vehicle.js';
import { createWorld } from './world.js';
import { createParticles } from './particles.js';
import { createTracks } from './tracks.js';
import { createEffects } from './effects.js';
import { createHud } from './hud.js';
import { createInput } from './input.js';
import { createAudio } from './audio.js';
import { createMission, updateMission, currentObjective } from './mission.js';
import { SAMPLE_SITES, COMPOUND, SPAWN, heightAt } from './terrain-math.js';

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));
const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const canvas = document.getElementById('view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.3, 2600);
camera.position.set(0, 20, 60);

const hud = createHud();
const inputCtl = createInput(document);
const audio = createAudio();

let state = 'loading'; // loading | intro | play | paused | complete
let sky, terrain, physics, rover, world, particles, effects, mission, tracks;
const IDLE = { throttle: 0, steer: 0, brake: false };

const cam = {
  mode: 'chase',
  modes: {
    chase: { dist: 8.6, height: 3.1, ahead: 4.5, fov: 62 },
    far: { dist: 14.5, height: 5.6, ahead: 6, fov: 54 },
    hood: { dist: 0, height: 0, ahead: 0, fov: 70 },
  },
  pos: new THREE.Vector3(), look: new THREE.Vector3(), shake: 0, fov: 62, introAngle: 0, snap: false,
};
const stats = { distance: 0, topSpeed: 0 };
const V = { heading: new THREE.Vector3(), tmp: new THREE.Vector3(), tmp2: new THREE.Vector3(), prev: new THREE.Vector3(), light: new THREE.Vector3(1, 1, 1) };

async function boot() {
  hud.setLoading('Generating planet surface…');
  await nextFrame();
  const normalMap = createProceduralNormalMap(256);
  terrain = createTerrain(scene, normalMap);
  hud.setLoading('Building physics…');
  await nextFrame();
  physics = createPhysics();
  hud.setLoading('Placing landmarks…');
  await nextFrame();
  particles = createParticles(scene);
  world = createWorld(scene, physics, particles, normalMap);
  sky = createSky(scene, renderer);
  rover = createVehicle(scene, physics, { x: SPAWN.x, z: SPAWN.z, yaw: Math.PI / 2 });
  tracks = createTracks(scene, 6, 900, 0.42);
  effects = createEffects(renderer, scene, camera);
  hud.setLoading('Charting the radar…');
  await nextFrame();
  hud.prepare();
  mission = createMission(SAMPLE_SITES, COMPOUND);
  hud.setLoading('Compiling shaders…');
  await nextFrame();
  // settle + warm-up render (compiles shaders before the first visible frame)
  for (let i = 0; i < 60; i++) physics.world.step(physics.STEP);
  rover.sync(1 / 60);
  sky.update(0, rover.position, camera);
  updateIntroCamera(0);
  renderer.compile(scene, camera);
  effects.render(0);
  state = 'intro';
  hud.showStart('start');
  restoreHot();
}

function begin() {
  if (state === 'intro') {
    audio.resume();
    audio.playStart();
    hud.hideStart();
    hud.show();
    state = 'play';
    cam.snap = true;
    hud.toast('Recover the samples. Follow the beacons.', 'info');
  } else if (state === 'paused') {
    audio.resume();
    audio.setMuted(audio.muted);
    hud.hideStart();
    state = 'play';
  }
}
function pause() {
  if (state !== 'play') return;
  state = 'paused';
  hud.showStart('resume');
}
function restart() {
  mission = createMission(SAMPLE_SITES, COMPOUND);
  world.resetSamples();
  rover.teleport(SPAWN.x, SPAWN.z, Math.PI / 2);
  tracks.clear();
  cam.snap = true;
  stats.distance = 0; stats.topSpeed = 0;
  hud.hideEnd();
  hud.show();
  state = 'play';
  audio.playStart();
}

hud.el.startBtn.addEventListener('click', () => begin());
document.getElementById('restartBtn').addEventListener('click', () => restart());
inputCtl.on('any', () => { if (state === 'intro' || state === 'paused') begin(); });
inputCtl.on('reset', () => { if (state === 'play') { rover.reset(); audio.playReset(); hud.toast('Rover righted', 'info'); } });
inputCtl.on('mute', () => { audio.toggleMute(); });
inputCtl.on('camera', () => {
  const order = ['chase', 'far', 'hood'];
  cam.mode = order[(order.indexOf(cam.mode) + 1) % order.length];
});
inputCtl.on('pause', () => { if (state === 'play') pause(); else if (state === 'paused') begin(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  effects?.setSize(w, h);
});

function updateIntroCamera(dt) {
  cam.introAngle += dt * 0.18;
  const a = cam.introAngle;
  V.tmp.set(rover.position.x + Math.cos(a) * 11, rover.position.y + 3.6, rover.position.z + Math.sin(a) * 11);
  const minY = heightAt(V.tmp.x, V.tmp.z) + 1.6;
  if (V.tmp.y < minY) V.tmp.y = minY;
  cam.pos.copy(V.tmp);
  cam.look.copy(rover.position).addScaledVector(V.tmp2.set(0, 1, 0), 0.9);
  camera.position.copy(cam.pos);
  camera.lookAt(cam.look);
  camera.fov = 50;
  camera.updateProjectionMatrix();
}

function updateChaseCamera(dt) {
  const t = rover.telemetry;
  const m = cam.modes[cam.mode];
  V.heading.copy(rover.forward); V.heading.y = 0; V.heading.normalize();
  if (t.speed > 3 && !t.airborne) {
    V.tmp.copy(rover.velocity); V.tmp.y = 0;
    if (V.tmp.lengthSq() > 1) { V.tmp.normalize(); if (V.tmp.dot(V.heading) > 0.2) V.heading.lerp(V.tmp, 0.5).normalize(); }
  }
  if (cam.mode === 'hood') {
    V.tmp.set(1.2, 1.05, 0).applyQuaternion(rover.group.quaternion).add(rover.position);
    cam.pos.lerp(V.tmp, 1 - Math.exp(-dt * 30));
    V.tmp2.copy(rover.forward).multiplyScalar(12).add(rover.position).add(V.tmp.set(0, 0.6, 0));
    cam.look.lerp(V.tmp2, 1 - Math.exp(-dt * 20));
  } else {
    const dist = m.dist + Math.min(1, t.speed / 20) * 1.8;
    V.tmp.copy(rover.position).addScaledVector(V.heading, -dist);
    V.tmp.y += m.height;
    if (cam.snap) { cam.pos.copy(V.tmp); cam.look.copy(rover.position); cam.snap = false; }
    cam.pos.lerp(V.tmp, 1 - Math.exp(-dt * 4.5));
    const minY = heightAt(cam.pos.x, cam.pos.z) + 1.4;
    if (cam.pos.y < minY) cam.pos.y += (minY - cam.pos.y) * Math.min(1, dt * 12);
    V.tmp2.copy(rover.position).addScaledVector(V.heading, m.ahead);
    V.tmp2.y += 1.1;
    cam.look.lerp(V.tmp2, 1 - Math.exp(-dt * 7));
  }
  cam.shake = Math.max(cam.shake * Math.exp(-dt * 7), t.suspensionImpulse * 0.35 + t.impact * 0.9);
  camera.position.copy(cam.pos);
  if (!reducedMotion && cam.shake > 0.01) {
    camera.position.x += (Math.random() - 0.5) * cam.shake * 0.12;
    camera.position.y += (Math.random() - 0.5) * cam.shake * 0.12;
  }
  camera.lookAt(cam.look);
  const targetFov = m.fov + Math.min(1, t.speed / 20) * 9;
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 3);
  camera.updateProjectionMatrix();
}

function handleMission(dt) {
  const events = updateMission(mission, rover.position, dt);
  for (const ev of events) {
    if (ev.type === 'pickup') {
      world.collect(mission.sites.indexOf(ev.site));
      audio.playPickup(ev.index, ev.total);
      hud.toast(`Sample ${ev.index}/${ev.total} recovered — ${ev.site.name}`, 'pickup');
    } else if (ev.type === 'all-collected') {
      audio.playAllCollected();
      hud.toast('All samples recovered. Return to the Compound.', 'phase');
    } else if (ev.type === 'complete') {
      state = 'complete';
      audio.playComplete();
      const m = Math.floor(ev.time / 60), s = (ev.time - m * 60).toFixed(1);
      hud.showEnd([
        ['Expedition time', `${m}:${String(s).padStart(4, '0')}`],
        ['Distance driven', `${(stats.distance / 1000).toFixed(2)} km`],
        ['Top speed', `${Math.round(stats.topSpeed * 3.6)} km/h`],
        ['Samples', `${mission.collected} / ${mission.sites.length}`],
      ]);
    }
  }
}

function emitWheelDust(dt) {
  const t = rover.telemetry;
  if (t.speed < 0.4) return;
  rover.contacts.forEach((c, i) => { if (c.hit) tracks.add(i, c.point, 0.28 + t.slip * 0.6 + t.brake * 0.2); });
  tracks.flush();
  if (t.speed < 1.2) return;
  const amount = dt * t.speed * (0.7 + t.slip * 7) * 0.3;
  for (const c of rover.contacts) if (c.hit) particles.emitDust(c.point, rover.velocity, amount, 0.6);
}

let last = performance.now();
let simTime = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
  last = now;
  if (state === 'loading') return;
  const input = inputCtl.update();
  const running = state === 'play';
  const simulating = running || state === 'intro' || state === 'complete';

  if (simulating) {
    physics.step(dt, (step) => rover.drive(running ? input : IDLE, step));
    rover.sync(dt);
    simTime += dt;
    if (running) {
      handleMission(dt);
      stats.distance += V.prev.distanceTo(rover.position);
      stats.topSpeed = Math.max(stats.topSpeed, rover.telemetry.speed);
      emitWheelDust(dt);
      if (rover.telemetry.impact > 0.05) audio.playImpact(rover.telemetry.impact);
    }
    V.prev.copy(rover.position);
    sky.update(dt, rover.position, camera);
  }
  const night = sky.state.night;
  terrain.update(sky.state.time, night);
  world.update(sky.state.time, dt, night, rover.position);
  V.light.set(sky.palette.horizon.r, sky.palette.horizon.g, sky.palette.horizon.b).multiplyScalar(1.25).addScalar(0.05);
  particles.update(simulating ? dt : 0, V.light);
  rover.setNight(night);
  audio.setNight(night);

  if (state === 'intro') updateIntroCamera(dt);
  else updateChaseCamera(dt);

  const tel = running ? rover.telemetry : IDLE_TEL;
  audio.update(dt, tel);
  if (state !== 'intro') {
    hud.update({
      mission, objective: currentObjective(mission, rover.position), telemetry: rover.telemetry,
      pos: rover.position, heading: rover.telemetry.heading, phase: sky.state.phase, cameraMode: cam.mode, muted: audio.muted,
    });
  }
  effects.render(dt);
}
const IDLE_TEL = { throttle: 0, speed: 0, speedSigned: 0, rpm01: 0, slip: 0, onGround: 1, suspensionImpulse: 0, steering: 0, airborne: false, brake: 0 };

// ---- hot state for the artifact host (keeps the run across republishes) ----
function snapshot() {
  if (!rover || !mission) return null;
  return {
    x: rover.position.x, z: rover.position.z, yaw: Math.atan2(-rover.forward.z, rover.forward.x),
    collected: mission.sites.map((s) => s.collected), time: mission.time, phase: mission.phase,
    distance: stats.distance, topSpeed: stats.topSpeed, camMode: cam.mode,
  };
}
let hotData = null;
function restoreHot() {
  const d = hotData;
  if (!d || !Array.isArray(d.collected)) return;
  try {
    rover.teleport(d.x, d.z, d.yaw);
    d.collected.forEach((c, i) => { if (c) { mission.sites[i].collected = true; world.collect(i); } });
    mission.collected = d.collected.filter(Boolean).length;
    mission.time = d.time || 0;
    if (mission.collected === mission.sites.length && d.phase !== 'complete') mission.phase = 'return';
    stats.distance = d.distance || 0; stats.topSpeed = d.topSpeed || 0;
    cam.mode = d.camMode || 'chase';
    for (let i = 0; i < 30; i++) physics.world.step(physics.STEP);
    rover.sync(1 / 60);
  } catch (e) { /* ignore corrupt snapshots */ }
}
window.claude?.hot?.snapshot?.(snapshot);

// ---- debug hooks (used by the automated smoke test) -------------------------
window.__tutu = {
  get state() { return state; },
  get rover() { return rover; },
  get mission() { return mission; },
  get stats() { return stats; },
  get sky() { return sky; },
  get audio() { return audio; },
  begin, pause, restart,
  teleport: (x, z, yaw) => { rover.teleport(x, z, yaw); cam.snap = true; },
  setCamera: (m) => { cam.mode = m; },
  heightAt,
  // deterministic simulation for automated tests: steps physics with a fixed input, no rendering
  simulate(seconds, inp = IDLE) {
    const n = Math.round(seconds / physics.STEP);
    for (let i = 0; i < n; i++) {
      rover.drive(inp, physics.STEP); physics.world.step(physics.STEP); rover.sync(physics.STEP);
      if (state === 'play') handleMission(physics.STEP);
    }
    return { x: rover.position.x, y: rover.position.y, z: rover.position.z, speed: rover.telemetry.speed, heading: rover.telemetry.heading, wy: rover.chassisBody.angularVelocity.y, onGround: rover.telemetry.onGround };
  },
};

function start(data) {
  hotData = data && Object.keys(data).length ? data : null;
  boot().catch((err) => {
    console.error(err);
    hud.setLoading('Could not start the expedition: ' + (err?.message || err));
  });
  requestAnimationFrame(frame);
}
if (window.claude?.hot?.ready) window.claude.hot.ready(start); else start(window.claude?.hot?.data ?? {});
