// Landmarks and props: boulders, spires, the Compound, sample crystals with beacons,
// smoke columns, altar stones, steam vents, lava embers and their lights.
import * as THREE from 'three';
import { REGIONS, heightAt, regionMasks, SAMPLE_SITES, COMPOUND, SPAWN, normalAt } from './terrain-math.js';
import { createNoise } from './noise.js';

const R = createNoise(4242);
const rand = () => R.rand();

const BEACON_VERT = /* glsl */`
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewDir;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const BEACON_FRAG = /* glsl */`
uniform vec3 uColor;
uniform float uTime;
uniform float uStrength;
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewDir;
void main() {
  float fres = abs(dot(normalize(vNormalW), normalize(vViewDir)));
  float edge = pow(fres, 1.2);
  float fall = pow(1.0 - vUv.y, 1.6);
  float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + vUv.y * 20.0);
  float a = fall * edge * uStrength * pulse;
  gl_FragColor = vec4(uColor * 2.2, a);
}`;

function displacedRock() {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const p = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.set(p.getX(i), p.getY(i), p.getZ(i));
    const n = R.fbm(v.x * 1.3 + 7, v.y * 1.3 + v.z * 0.9, 3) * 0.32 + R.fbm(v.z * 3 + 2, v.x * 3, 2) * 0.12;
    v.multiplyScalar(1 + n);
    v.y *= 0.8;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function makeConcreteTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#6a6c67'; g.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 4000; i++) {
    g.fillStyle = `rgba(${40 + Math.random() * 60},${40 + Math.random() * 60},${38 + Math.random() * 55},${0.12 + Math.random() * 0.2})`;
    g.fillRect(Math.random() * 512, Math.random() * 256, 2 + Math.random() * 6, 1 + Math.random() * 3);
  }
  g.strokeStyle = '#2f302d'; g.lineWidth = 3;
  for (let x = 0; x <= 512; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 256); g.stroke(); }
  for (let y = 0; y <= 256; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke(); }
  g.fillStyle = '#3a3b38';
  for (let x = 8; x < 512; x += 64) for (let y = 8; y < 256; y += 64) { g.beginPath(); g.arc(x, y, 3, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(x + 48, y + 48, 3, 0, Math.PI * 2); g.fill(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(8, 2);
  return t;
}

export function createWorld(scene, physics, particles, normalMap) {
  const group = new THREE.Group();
  scene.add(group);
  const updaters = [];

  // ---- boulders -------------------------------------------------------------
  const rockGeo = displacedRock();
  const rockMat = new THREE.MeshStandardMaterial({ color: '#7a6852', roughness: 0.9, metalness: 0.0, normalMap, normalScale: new THREE.Vector2(0.5, 0.5) });
  const ROCKS = 720;
  const rocks = new THREE.InstancedMesh(rockGeo, rockMat, ROCKS);
  rocks.castShadow = true; rocks.receiveShadow = true;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s3 = new THREE.Vector3(), p3 = new THREE.Vector3();
  const tint = new THREE.Color();
  let placed = 0, tries = 0;
  const avoid = (x, z) => {
    const m = regionMasks(x, z);
    if (m.hex > 0.2 || m.flat > 0.2 || m.smoke > 0.2) return true;
    if (Math.hypot(x - SPAWN.x, z - SPAWN.z) < 30) return true;
    if (Math.hypot(x - COMPOUND.x, z - COMPOUND.z) < 44) return true;
    if (Math.hypot(x - REGIONS.crater.x, z - REGIONS.crater.z) < 24) return true;
    for (const st of SAMPLE_SITES) if (Math.hypot(x - st.x, z - st.z) < 9) return true;
    return false;
  };
  while (placed < ROCKS && tries++ < ROCKS * 20) {
    const x = (rand() * 2 - 1) * 232, z = (rand() * 2 - 1) * 232;
    if (avoid(x, z)) continue;
    const sc = Math.exp(THREE.MathUtils.lerp(Math.log(0.35), Math.log(3.6), Math.pow(rand(), 1.8)));
    const y = heightAt(x, z) - sc * 0.3;
    e.set(rand() * 0.6 - 0.3, rand() * Math.PI * 2, rand() * 0.6 - 0.3);
    q.setFromEuler(e);
    s3.set(sc * (0.8 + rand() * 0.5), sc * (0.7 + rand() * 0.5), sc * (0.8 + rand() * 0.5));
    m4.compose(p3.set(x, y, z), q, s3);
    rocks.setMatrixAt(placed, m4);
    const m = regionMasks(x, z);
    tint.setHSL(0.08 + rand() * 0.04, 0.25 + rand() * 0.2, 0.32 + rand() * 0.2);
    if (m.lava > 0.3) tint.setHSL(0.05, 0.1, 0.12 + rand() * 0.08);
    if (m.canyon > 0.3) tint.setHSL(0.05 + rand() * 0.03, 0.5, 0.3 + rand() * 0.15);
    rocks.setColorAt(placed, tint);
    if (sc >= 1.25) physics.addStaticSphere(x, y + sc * 0.15, z, sc * 0.85);
    placed++;
  }
  rocks.count = placed;
  rocks.instanceMatrix.needsUpdate = true;
  if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
  group.add(rocks);

  // ---- spire city -----------------------------------------------------------
  const spireMat = new THREE.MeshStandardMaterial({ color: '#6b5236', roughness: 0.88, metalness: 0.02, normalMap, normalScale: new THREE.Vector2(0.6, 0.6) });
  const spireGeos = [];
  const spirePts = [];
  const sp = REGIONS.spires;
  const site = SAMPLE_SITES.find((s) => s.region === 'spires');
  for (let i = 0, guard = 0; i < 64 && guard < 2000; guard++) {
    const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * sp.radius * 0.85;
    const x = sp.x + Math.cos(a) * r, z = sp.z + Math.sin(a) * r;
    if (Math.hypot(x - site.x, z - site.z) < 9) continue;
    if (spirePts.some((p) => Math.hypot(p.x - x, p.z - z) < 5.5)) continue;
    const h = 10 + Math.pow(rand(), 0.7) * 30, rb = 1.1 + rand() * 2.2;
    const geo = new THREE.ConeGeometry(rb, h, 7, 6, false);
    const pa = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let k = 0; k < pa.count; k++) {
      v.set(pa.getX(k), pa.getY(k), pa.getZ(k));
      const n = 1 + R.fbm(v.x * 0.9 + i, v.y * 0.35, 2) * 0.35;
      pa.setXYZ(k, v.x * n, v.y, v.z * n);
    }
    geo.computeVertexNormals();
    const y = heightAt(x, z);
    geo.translate(x, y + h / 2 - 1.5, z);
    spireGeos.push(geo);
    spirePts.push({ x, z });
    physics.addStaticCylinder(x, y + h / 2 - 1.5, z, rb * 0.12, rb * 0.85, h, 8);
    i++;
  }
  const spireMesh = new THREE.Mesh(mergeGeos(spireGeos), spireMat);
  spireMesh.castShadow = true; spireMesh.receiveShadow = true;
  group.add(spireMesh);

  // ---- the Compound ---------------------------------------------------------
  const cy = COMPOUND.y;
  const compound = new THREE.Group();
  const concrete = new THREE.MeshStandardMaterial({ map: makeConcreteTexture(), roughness: 0.92, metalness: 0.02, normalMap, normalScale: new THREE.Vector2(0.4, 0.4) });
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(24, 26, 16, 64, 1), concrete);
  hull.position.set(COMPOUND.x, cy + 6, COMPOUND.z);
  hull.castShadow = true; hull.receiveShadow = true;
  compound.add(hull);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(20, 24, 4, 64, 1), concrete);
  roof.position.set(COMPOUND.x, cy + 16, COMPOUND.z);
  roof.castShadow = true; roof.receiveShadow = true;
  compound.add(roof);
  const darkMetal = new THREE.MeshStandardMaterial({ color: '#2b2d2b', roughness: 0.5, metalness: 0.8 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(22.5, 0.5, 10, 80), darkMetal);
  ring.rotation.x = Math.PI / 2; ring.position.set(COMPOUND.x, cy + 14.2, COMPOUND.z);
  compound.add(ring);
  // split emblem facing the approach
  const emblemGreen = new THREE.MeshStandardMaterial({ color: '#0d2a16', emissive: '#5cf58a', emissiveIntensity: 2.6, roughness: 0.35 });
  const emblemOrange = new THREE.MeshStandardMaterial({ color: '#2a1206', emissive: '#ff6a1f', emissiveIntensity: 2.6, roughness: 0.35 });
  const halfA = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.55, 12, 48, Math.PI), emblemGreen);
  const halfB = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.55, 12, 48, Math.PI), emblemOrange);
  halfA.rotation.z = Math.PI / 2; halfB.rotation.z = -Math.PI / 2;
  for (const h of [halfA, halfB]) { h.position.set(COMPOUND.x, cy + 9.5, COMPOUND.z - 26.6); compound.add(h); }
  const emblemCore = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.4, 32).rotateX(Math.PI / 2), darkMetal);
  emblemCore.position.set(COMPOUND.x, cy + 9.5, COMPOUND.z - 26.6); compound.add(emblemCore);
  // gate recess + floodlight
  const gate = new THREE.Mesh(new THREE.BoxGeometry(9, 6, 2.5), new THREE.MeshStandardMaterial({ color: '#0b0c0b', roughness: 0.9 }));
  gate.position.set(COMPOUND.x, cy + 2.5, COMPOUND.z - 25.6); compound.add(gate);
  const flood = new THREE.SpotLight('#dfeeff', 0, 90, 0.6, 0.5, 1.3);
  flood.position.set(COMPOUND.x, cy + 8, COMPOUND.z - 27.5);
  flood.target.position.set(COMPOUND.x, cy - 2, COMPOUND.z - 60);
  compound.add(flood); compound.add(flood.target);
  // masts + beacon
  for (const [dx, dz, h] of [[-8, 4, 14], [6, -6, 9], [10, 8, 11]]) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, h, 8), darkMetal);
    mast.position.set(COMPOUND.x + dx, cy + 18 + h / 2, COMPOUND.z + dz);
    mast.castShadow = true; compound.add(mast);
  }
  const beaconMat = new THREE.MeshStandardMaterial({ color: '#3a0a05', emissive: '#ff2a1a', emissiveIntensity: 3, roughness: 0.3 });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), beaconMat);
  beacon.position.set(COMPOUND.x - 8, cy + 32.5, COMPOUND.z + 4); compound.add(beacon);
  physics.addStaticCylinder(COMPOUND.x, cy + 8, COMPOUND.z, 24, 26.5, 20, 16);
  group.add(compound);
  updaters.push((t, dt, night) => {
    beaconMat.emissiveIntensity = 1 + 3 * Math.max(0, Math.sin(t * 2.4));
    flood.intensity = THREE.MathUtils.smoothstep(night, 0.3, 0.7) * 500;
  });

  // ---- sample crystals + beacons -------------------------------------------
  const crystalMat = new THREE.MeshPhysicalMaterial({ color: '#ffcf62', emissive: '#ffb347', emissiveIntensity: 1.7, roughness: 0.12, metalness: 0.1, clearcoat: 1 });
  const beaconMats = [];
  const samples = SAMPLE_SITES.map((st, i) => {
    const g = new THREE.Group();
    g.position.set(st.x, st.y + 0.9, st.z);
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.85, 0), crystalMat);
    core.scale.y = 1.7; core.castShadow = true; g.add(core);
    for (let k = 0; k < 3; k++) {
      const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), crystalMat);
      sat.scale.y = 1.6;
      sat.position.set(Math.cos(k * 2.1) * 1.3, -0.3 + k * 0.3, Math.sin(k * 2.1) * 1.3);
      sat.rotation.set(rand(), rand(), rand());
      g.add(sat);
    }
    const bm = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color('#ffc14a') }, uTime: { value: 0 }, uStrength: { value: 0.32 } },
      vertexShader: BEACON_VERT, fragmentShader: BEACON_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    beaconMats.push(bm);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 160, 16, 1, true), bm);
    beam.position.y = 80; beam.renderOrder = 5; g.add(beam);
    group.add(g);
    return { site: st, group: g, core, beam, mat: bm, index: i, collected: false };
  });
  const sampleLights = [0, 1].map(() => { const l = new THREE.PointLight('#ffc866', 60, 26, 2); group.add(l); return l; });

  // ---- smoke array + altar fires + steam + crater haze -----------------------
  const sm = REGIONS.smoke;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const x = sm.x - 21 + i * 14, z = sm.z - 14 + j * 14;
    particles.addColumn(x, heightAt(x, z), z, { color: '#e8e4d8', count: 110, radius: 0.7, size: 3.4, rise: 3.6, life: 16 });
  }
  const altarStone = new THREE.MeshStandardMaterial({ color: '#5c5044', roughness: 0.95, normalMap, normalScale: new THREE.Vector2(0.5, 0.5) });
  const altars = [[sm.x - 34, sm.z + 30, '#4aa3ff'], [sm.x + 34, sm.z + 30, '#ff6ac8']];
  for (const [ax, az, col] of altars) {
    const ay = heightAt(ax, az);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.4, 9, 12), altarStone);
    stem.position.set(ax, ay + 4, az); stem.castShadow = true; stem.receiveShadow = true; group.add(stem);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(7, 20, 12), altarStone);
    cap.scale.y = 0.42; cap.position.set(ax, ay + 9, az); cap.castShadow = true; cap.receiveShadow = true; group.add(cap);
    physics.addStaticCylinder(ax, ay + 4, az, 2.6, 3.4, 9, 10);
    particles.addColumn(ax, ay + 11.5, az, { color: col, count: 170, radius: 2.2, size: 5.5, rise: 2.8, life: 18 });
  }
  const hx = REGIONS.hex;
  for (let i = 0; i < 7; i++) {
    const a = i * 0.9, r = 12 + i * 5;
    const x = hx.x + Math.cos(a) * r, z = hx.z + Math.sin(a) * r;
    particles.addColumn(x, heightAt(x, z), z, { color: '#f4f4f0', count: 55, radius: 0.5, size: 2.4, rise: 3.2, life: 9 });
  }
  const cr = REGIONS.crater;
  particles.addColumn(cr.x, heightAt(cr.x, cr.z), cr.z, { color: '#e0a84a', count: 90, radius: 7, size: 7, rise: 1.4, life: 22 });
  const coreLight = new THREE.PointLight('#ffb347', 400, 80, 2);
  coreLight.position.set(cr.x, heightAt(cr.x, cr.z) + 6, cr.z);
  group.add(coreLight);

  // ---- fracture ground ------------------------------------------------------
  const lv = REGIONS.lava;
  particles.addEmbers(lv.x, heightAt(lv.x, lv.z), lv.z, 320, 34);
  const lavaLights = [[-14, 8], [16, -10]].map(([dx, dz]) => {
    const l = new THREE.PointLight('#ff6a1f', 90, 34, 2);
    l.position.set(lv.x + dx, heightAt(lv.x + dx, lv.z + dz) + 2.5, lv.z + dz);
    group.add(l); return l;
  });

  // ---- per-frame ------------------------------------------------------------
  const tmp = new THREE.Vector3();
  function update(t, dt, night, roverPos) {
    for (const u of updaters) u(t, dt, night);
    for (const s of samples) {
      if (s.collected) continue;
      s.core.rotation.y = t * 0.8 + s.index;
      s.core.position.y = 0.6 + Math.sin(t * 1.6 + s.index) * 0.25;
      s.mat.uniforms.uTime.value = t;
    }
    // two shared lights follow the nearest live samples
    const live = samples.filter((s) => !s.collected)
      .sort((a, b) => tmp.set(a.site.x, 0, a.site.z).distanceToSquared(roverPos) - tmp.set(b.site.x, 0, b.site.z).distanceToSquared(roverPos));
    sampleLights.forEach((l, i) => {
      const s = live[i];
      if (s) { l.visible = true; l.position.set(s.site.x, s.site.y + 2.2, s.site.z); l.intensity = 50 + 20 * Math.sin(t * 3 + i); }
      else l.visible = false;
    });
    lavaLights.forEach((l, i) => { l.intensity = 70 + 40 * Math.abs(Math.sin(t * 5.3 + i * 1.7) * Math.sin(t * 2.1 + i)); });
    coreLight.intensity = 380 + 60 * Math.sin(t * 0.7);
  }

  function collect(index) {
    const s = samples[index];
    if (!s || s.collected) return null;
    s.collected = true;
    s.group.visible = false;
    tmp.set(s.site.x, s.site.y + 1.2, s.site.z);
    particles.burst(tmp, 160);
    return s;
  }
  function resetSamples() {
    for (const s of samples) { s.collected = false; s.group.visible = true; }
  }

  return { group, samples, collect, resetSamples, update, compound };
}

function mergeGeos(geos) {
  // minimal merge (all non-indexed cone geometries share attributes)
  let total = 0;
  for (const g of geos) total += g.index ? g.index.count : g.attributes.position.count;
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), uv = new Float32Array(total * 2);
  let o = 0;
  for (const g of geos) {
    const ng = g.toNonIndexed();
    pos.set(ng.attributes.position.array, o * 3);
    nor.set(ng.attributes.normal.array, o * 3);
    uv.set(ng.attributes.uv.array, o * 2);
    o += ng.attributes.position.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return out;
}
