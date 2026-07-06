// MANA Melon & Mint — 3D product hero
// vanilla three.js + GSAP; motion grammar: entry settle (G1), idle float (G2),
// pointer parallax (G3) — per the MANA reference teardown.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';

// resolves to an inlined data: URI when window.__ASSET_MAP__ is present
// (the standalone single-file build), otherwise the normal relative path.
const assetURL = (path) => (window.__ASSET_MAP__ && window.__ASSET_MAP__[path]) || path;

const canvas = document.getElementById('scene');
const params = new URLSearchParams(location.search);
const staticMode = params.has('static');            // deterministic pose for headless QA
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches || staticMode;
const isCoarse = matchMedia('(pointer: coarse)').matches;
const DPR = Math.min(devicePixelRatio || 1, 2);
gsap.ticker.lagSmoothing(0);

// ---------- renderer / scene / camera ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(DPR);
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.12;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.01, 10);
function layoutCamera() {
  const aspect = innerWidth / innerHeight;
  camera.aspect = aspect;
  // narrow screens: pull back and look slightly lower so the can sits above the copy
  const narrow = aspect < 0.8;
  camera.position.set(0, narrow ? -0.042 : 0.004, narrow ? 0.68 : 0.46);
  camera.lookAt(0, narrow ? 0.022 : 0, 0);
  camera.updateProjectionMatrix();
}
layoutCamera();

const key = new THREE.DirectionalLight(0xffffff, 1.35);
key.position.set(0.35, 0.6, 0.65);
scene.add(key);
const fill = new THREE.DirectionalLight(0xd8ffd0, 0.35);
fill.position.set(-0.5, 0.2, -0.4);
scene.add(fill);

// ---------- backdrop: soft green radial gradient + droplet bokeh ----------
function backdropTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(512, 430, 80, 512, 512, 760);
  grad.addColorStop(0, '#8fd063');
  grad.addColorStop(0.55, '#6cbe45');
  grad.addColorStop(1, '#4da236');
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 1024);
  // condensation bokeh on the backdrop, like the key visual
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * 1024, y = Math.random() * 1024;
    const r = 1 + Math.random() * (Math.random() < 0.08 ? 10 : 4);
    const a = 0.05 + Math.random() * 0.1;
    const hl = g.createRadialGradient(x - r * 0.3, y - r * 0.4, r * 0.1, x, y, r);
    hl.addColorStop(0, `rgba(255,255,255,${a + 0.12})`);
    hl.addColorStop(0.7, `rgba(255,255,255,${a * 0.4})`);
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = hl;
    g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const backdrop = new THREE.Mesh(
  new THREE.PlaneGeometry(1.6, 1.1),
  new THREE.MeshBasicMaterial({ map: backdropTexture(), depthWrite: false })
);
backdrop.position.z = -0.42;
scene.add(backdrop);

// ---------- frosted glass MANA letters ----------
const lettersGroup = new THREE.Group();
scene.add(lettersGroup);
const glassMat = isCoarse
  ? new THREE.MeshStandardMaterial({ color: 0xf2fbe9, transparent: true, opacity: 0.38, roughness: 0.55, metalness: 0 })
  : new THREE.MeshPhysicalMaterial({
      color: 0xf5fcee, transmission: 0.9, roughness: 0.44, thickness: 0.018,
      ior: 1.44, specularIntensity: 0.45, envMapIntensity: 0.85,
    });

new SVGLoader().load(assetURL('assets/mana-logo.svg'), (svg) => {
  const shapes = svg.paths.flatMap((p) => SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth: 42, bevelEnabled: true, bevelThickness: 3, bevelSize: 3, bevelSegments: 2, curveSegments: 10,
  });
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const w = bb.max.x - bb.min.x;
  geo.translate(-(bb.min.x + bb.max.x) / 2, -(bb.min.y + bb.max.y) / 2, -(bb.min.z + bb.max.z) / 2);
  const targetW = 0.42;
  const s = targetW / w;
  const mesh = new THREE.Mesh(geo, glassMat);
  mesh.scale.set(s, -s, s);          // SVG y-down -> three y-up
  lettersGroup.add(mesh);
  lettersGroup.position.set(0, 0.014, -0.11);
});

// ---------- product can ----------
const canRig = new THREE.Group();     // entry + idle float
const canMouse = new THREE.Group();   // pointer-driven, nested (the Mana pattern)
canRig.add(canMouse);
scene.add(canRig);

let canRoot = null;
new GLTFLoader().load(assetURL('assets/mana-can.glb'), (g) => {
  canRoot = g.scene;
  canRoot.traverse((o) => {
    if (o.isMesh && o.material) {
      if (o.material.map) o.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
      o.material.envMapIntensity = 1.6;
      o.frustumCulled = false;
    }
  });
  canMouse.add(canRoot);
  startIntro();
});

// soft contact shadow under the floating can
function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 8, 128, 128, 120);
  grad.addColorStop(0, 'rgba(16,60,20,0.42)');
  grad.addColorStop(0.65, 'rgba(16,60,20,0.16)');
  grad.addColorStop(1, 'rgba(16,60,20,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
const shadow = new THREE.Mesh(
  new THREE.PlaneGeometry(0.2, 0.075),
  new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false })
);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = -0.115;
scene.add(shadow);

// ---------- floating sprites (label artwork cutouts) ----------
const spriteDefs = [
  //  file            x       y       z      size   depth  spin
  ['leaf-upper',   -0.108,  0.052, -0.03,  0.036, 1.4,  0.25],
  ['leaf-lower',    0.116, -0.062,  0.0,   0.042, 1.1, -0.2],
  ['melon-ball',   -0.068,  0.082, -0.08,  0.028, 1.6,  0.35],
  ['melon-star',    0.108,  0.092, -0.05,  0.04,  1.7,  0.15],
  ['flowers',      -0.083, -0.096,  0.02,  0.034, 0.9,  0.1],
  ['sky-oval',      0.152,  0.032, -0.09,  0.046, 2.0,  0.05],
  ['cloud',        -0.122,  0.106, -0.12,  0.042, 2.1,  0.08],
  ['sparkle',       0.062, -0.098,  0.04,  0.015, 0.6,  0.5],
  ['sparkle',      -0.052,  0.05,   0.07,  0.012, 0.4, -0.6],
];
const sprites = [];
const texLoader = new THREE.TextureLoader();
for (const [file, x, y, z, size, depth, spin] of spriteDefs) {
  texLoader.load(assetURL(`assets/sprites/${file}.png`), (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    const ar = t.image.width / t.image.height;
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(size * ar, size),
      new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false })
    );
    m.position.set(x, y, z);
    m.userData = { base: new THREE.Vector3(x, y, z), depth, spin, phase: Math.random() * 7 };
    m.renderOrder = 2;
    scene.add(m);
    sprites.push(m);
    if (!reduceMotion) {
      m.scale.setScalar(0.001);
      gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.1, delay: 0.55 + Math.random() * 0.5, ease: 'back.out(1.7)' });
    }
  });
}

// ---------- airborne water droplets ----------
const dropMat = new THREE.MeshPhysicalMaterial({
  color: 0xf2fff8, transmission: isCoarse ? 0 : 1, opacity: isCoarse ? 0.4 : 1,
  transparent: isCoarse, roughness: 0.04, ior: 1.33, thickness: 0.004,
});
const dropGeo = new THREE.SphereGeometry(1, 16, 12);
const airDrops = [];
for (let i = 0; i < 9; i++) {
  const d = new THREE.Mesh(dropGeo, dropMat);
  const s = 0.0016 + Math.random() * 0.0022;
  d.scale.setScalar(s);
  d.position.set((Math.random() - 0.5) * 0.42, (Math.random() - 0.5) * 0.26, -0.05 + Math.random() * 0.16);
  d.userData = { base: d.position.clone(), phase: Math.random() * 7, amp: 0.004 + Math.random() * 0.006 };
  scene.add(d);
  airDrops.push(d);
}

// ---------- motion ----------
const clock = new THREE.Clock();
let introDone = reduceMotion;

function startIntro() {
  document.getElementById('loader').classList.add('done');
  if (reduceMotion) {
    introDone = true;
    renderer.render(scene, camera);
    window.__sceneReady = true;
    return;
  }
  canRig.position.y = -0.05;
  canRig.rotation.y = -2.4;
  gsap.timeline({ onComplete: () => { introDone = true; } })
    .to(canRig.position, { y: 0, duration: 1.25, ease: 'power3.out' }, 0.15)
    .to(canRig.rotation, { y: 0, duration: 1.45, ease: 'power3.out' }, 0.15)
    .from(lettersGroup.position, { z: -0.3, duration: 1.4, ease: 'power2.out' }, 0)
    .from(glassMat, { opacity: 0, duration: 0.01 }, 0);
  window.__sceneReady = true;
}

// pointer parallax via gsap.quickTo (the Mana recipe)
const rotY = gsap.quickTo(canMouse.rotation, 'y', { duration: 0.6, ease: 'power3' });
const rotX = gsap.quickTo(canMouse.rotation, 'x', { duration: 0.6, ease: 'power3' });
const posX = gsap.quickTo(canMouse.position, 'x', { duration: 0.7, ease: 'power3' });
const posY = gsap.quickTo(canMouse.position, 'y', { duration: 0.7, ease: 'power3' });
const letX = gsap.quickTo(lettersGroup.position, 'x', { duration: 0.9, ease: 'power2' });
const letY = gsap.quickTo(lettersGroup.position, 'y', { duration: 0.9, ease: 'power2' });
let mx = 0, my = 0;

if (!reduceMotion && !isCoarse) {
  addEventListener('pointermove', (e) => {
    mx = (e.clientX / innerWidth) * 2 - 1;
    my = (e.clientY / innerHeight) * 2 - 1;
    rotY(mx * 0.3);
    rotX(my * 0.13);
    posX(mx * 0.008);
    posY(-my * 0.006);
    letX(-mx * 0.02 );
    letY(0.012 + my * 0.01);
  });
}

let raf = true;
document.addEventListener('visibilitychange', () => { raf = !document.hidden; });

function tick() {
  if (!raf) return;
  const t = clock.getElapsedTime();
  if (!reduceMotion && introDone) {
    canRig.position.y = Math.sin(t * 0.9) * 0.0045;          // idle float
    canRig.rotation.z = Math.sin(t * 0.55) * 0.016;
    canRig.rotation.y = Math.sin(t * 0.32) * 0.05;
    shadow.scale.setScalar(1 - Math.sin(t * 0.9) * 0.05);
  }
  if (!reduceMotion) {
    for (const s of sprites) {
      const u = s.userData;
      s.position.y = u.base.y + Math.sin(t * 0.8 + u.phase) * 0.006;
      s.position.x = u.base.x + Math.cos(t * 0.5 + u.phase) * 0.003 + mx * 0.012 * u.depth * -0.4;
      s.rotation.z = Math.sin(t * 0.4 + u.phase) * 0.08 * u.spin * 4;
    }
    for (const d of airDrops) {
      d.position.y = d.userData.base.y + Math.sin(t * 0.7 + d.userData.phase) * d.userData.amp;
    }
  }
  renderer.render(scene, camera);
}
gsap.ticker.add(tick);

addEventListener('resize', () => {
  layoutCamera();
  renderer.setSize(innerWidth, innerHeight);
});

// graceful fallback if WebGL is unavailable
if (!renderer.getContext()) {
  canvas.remove();
  document.getElementById('loader').classList.add('done');
}
