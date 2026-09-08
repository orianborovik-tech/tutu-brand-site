// Boot: decode data → build city → scenery → interaction → render loop.
import * as THREE from 'three';
import { loadData, lonlatToLocal } from './decode.js';
import { buildCity } from './citybuild.js';
import { makeVegetation, makeStreetFurniture, makeTraffic, makeBoats } from './scenery.js';
import { CityControls } from './controls.js';
import { makeEnvUniforms, computeEnv, skyMaterial } from './shaders.js';
import { LANDMARKS, localizeLandmarks, buildHud, makeLabels, attachPicking, runTour } from './ui.js';

const $ = (s) => document.querySelector(s);

async function main() {
  const canvas = $('#gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true });
  } catch (e) {
    $('#load-caption').textContent = 'הדפדפן לא תומך ב-WebGL — נסה דפדפן אחר';
    throw e;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 2, 90000);
  const env = makeEnvUniforms();

  const sky = new THREE.Mesh(new THREE.SphereGeometry(45000, 32, 16), skyMaterial(env));
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  scene.add(sky);

  const prog = (f, caption) => {
    $('#load-bar-in').style.width = (f * 100).toFixed(1) + '%';
    if (caption) $('#load-caption').textContent = caption;
  };

  prog(0.02, 'פורס נתוני OSM דחוסים…');
  const data = await loadData(window.TLV_DATA_B64);
  localizeLandmarks(data.meta);

  const refs = await buildCity(data, scene, env, prog);

  prog(0.74, 'שותל ' + (60000).toLocaleString('he') + '+ עצים ודקלים…');
  await new Promise(requestAnimationFrame);
  const veg = makeVegetation(data, refs, env, scene);

  prog(0.84, 'מציב פנסים, רמזורים ודודי שמש…');
  await new Promise(requestAnimationFrame);
  const furn = makeStreetFurniture(data, refs, env, scene);

  prog(0.92, 'משחרר תנועה לאיילון…');
  await new Promise(requestAnimationFrame);
  const traffic = makeTraffic(refs, env, scene);
  const boats = makeBoats(env, scene, lonlatToLocal, data.meta, data.sea);
  const labels = makeLabels(scene);

  const bb = data.meta.bbox.map((v) => v * 0.1);
  const controls = new CityControls(camera, canvas, { x0: bb[0], z0: bb[1], x1: bb[2], z1: bb[3] });

  let hour = 18.2;
  let envDirty = true;
  const hud = buildHud(document.body, {
    setHour(h) { hour = h; envDirty = true; },
    flyTo(l) { controls.flyTo({ x: l.x, z: l.z, dist: l.dist, pitch: l.pitch, yaw: l.yaw }, 2.6); },
    tour(btn) {
      if (btn.dataset.on) { controls.userMoved = true; return; }
      btn.dataset.on = '1';
      btn.textContent = '⏸ עצור';
      runTour(controls, () => { delete btn.dataset.on; btn.textContent = '▶ סיור'; });
    },
    toggle(key, on) {
      if (key === 'trees') veg.group.visible = on;
      else if (key === 'traffic') traffic.group.visible = on;
      else if (key === 'labels') labels.visible = on;
      else if (key === 'furniture') { furn.group.visible = on; boats.group.visible = on; }
    },
  });
  hud.setStats({
    buildings: refs.buildingMeta.length,
    trees: veg.treeCount,
    roadKm: refs.stats.roadKm,
    vehicles: traffic.count,
  });
  attachPicking(canvas, camera, refs.tileMeshes, refs.buildingMeta, hud.popup);

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  prog(1, 'ממריאים…');
  $('#loader').classList.add('done');
  setTimeout(() => $('#loader').remove(), 900);

  // intro flight: high above the sea → city overview
  controls.target.set(0, 0, 500);
  controls.yaw = 0.001;
  controls.pitch = 1.5;
  controls.dist = 26000;
  controls.apply();
  controls.flyTo({ x: -700, z: 900, yaw: 0.42, pitch: 0.86, dist: 5200 }, 4.5);

  // test/debug hook: jump the camera to a pose
  window.__setView = (v) => {
    controls.userMoved = true;
    if (v.x !== undefined) controls.target.x = v.x;
    if (v.z !== undefined) controls.target.z = v.z;
    if (v.yaw !== undefined) controls.yaw = v.yaw;
    if (v.pitch !== undefined) controls.pitch = v.pitch;
    if (v.dist !== undefined) controls.dist = v.dist;
  };
  window.__lm = (nm) => LANDMARKS.find((l) => l.nm.includes(nm));
  window.__dbg = { scene, refs, data, env, renderer };

  // render loop with adaptive resolution
  let last = performance.now();
  let slow = 0, fast = 0;
  const fpsEl = $('#fps');
  let frames = 0, fpsT = last;
  function loop(now) {
    const dt = Math.min(0.06, (now - last) / 1000);
    last = now;
    env.uTime.value += dt;
    if (envDirty) { computeEnv(hour, env); envDirty = false; }
    controls.update(dt);
    env.uCamPos.value.copy(camera.position);
    if (traffic.group.visible) traffic.update(dt);
    renderer.render(scene, camera);
    frames++;
    if (now - fpsT > 1000) {
      if (fpsEl) fpsEl.textContent = frames + ' FPS';
      frames = 0; fpsT = now;
    }
    // adaptive: drop pixel ratio if consistently slow
    if (dt > 0.04) { slow++; fast = 0; } else if (dt < 0.02) { fast++; }
    if (slow > 90 && renderer.getPixelRatio() > 1) {
      renderer.setPixelRatio(1);
      slow = 0;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

main().catch((e) => {
  console.error(e);
  const c = $('#load-caption');
  if (c) c.textContent = 'שגיאה בטעינה: ' + e.message;
});
