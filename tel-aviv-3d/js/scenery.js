// Instanced micro-detail: vegetation, street furniture, rooftops, traffic,
// balconies, crosswalks, beach life, pedestrians, trains, boats.
import * as THREE from 'three';
import { instancedMaterial, haloMaterial, SM } from './shaders.js';
import { mulberry32, pointInRing, nearestRoad } from './citybuild.js';

// merge simple primitives into one non-indexed geometry with aEm + aVCol
function mergeParts(parts) {
  const pos = [], nor = [], em = [], vc = [];
  for (const { geo, mat4, e, c } of parts) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    if (mat4) g.applyMatrix4(mat4);
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    const pc = c || [1, 1, 1];
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nor.push(n.getX(i), n.getY(i), n.getZ(i));
      em.push(e || 0);
      vc.push(pc[0], pc[1], pc[2]);
    }
    geo.dispose();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(nor), 3));
  g.setAttribute('aEm', new THREE.BufferAttribute(new Float32Array(em), 1));
  g.setAttribute('aVCol', new THREE.BufferAttribute(new Float32Array(vc), 3));
  return g;
}

const M = (x, y, z, ry = 0, rx = 0, rz = 0, s = 1) => {
  const m = new THREE.Matrix4();
  m.makeRotationFromEuler(new THREE.Euler(rx, ry, rz));
  m.scale(new THREE.Vector3(s, s, s));
  m.setPosition(x, y, z);
  return m;
};

function makeInstanced(geo, items, env, opts = {}) {
  // items: {x,y,z,ry,s|sx/sy/sz,c:[r,g,b]}
  const mesh = new THREE.InstancedMesh(geo, instancedMaterial(env, opts), items.length);
  const colors = new Float32Array(items.length * 3);
  const m = new THREE.Matrix4();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    e.set(0, it.ry || 0, 0);
    m.makeRotationFromEuler(e);
    const s = it.s || 1;
    m.scale(v.set(it.sx || s, it.sy || s, it.sz || s));
    m.setPosition(it.x, it.y, it.z);
    mesh.setMatrixAt(i, m);
    colors[i * 3] = it.c[0]; colors[i * 3 + 1] = it.c[1]; colors[i * 3 + 2] = it.c[2];
  }
  geo.setAttribute('aInstColor', new THREE.InstancedBufferAttribute(colors, 3));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.frustumCulled = false;
  return mesh;
}

const GREENS = ['#4e7a38', '#5d8a42', '#6b9450', '#47703a', '#557d3d', '#728f4e', '#3f6b33']
  .map((h) => new THREE.Color(h).toArray());
const PALM_GREEN = ['#4a7a3a', '#568444', '#5f8f4a'].map((h) => new THREE.Color(h).toArray());

export function makeVegetation(data, refs, env, scene, cap = 95000) {
  const rng = mulberry32(1234567);
  const trees = [];
  const palms = [];
  const T = data.trees;
  for (let i = 0; i < T.length; i += 2) {
    trees.push({ x: T[i], z: T[i + 1], s: 1.1 + rng() * 1.3 });
  }
  for (const park of refs.parks) {
    if (trees.length > cap) break;
    const b = [1e9, 1e9, -1e9, -1e9];
    const o = park.outer;
    for (let i = 0; i < o.length; i += 2) {
      b[0] = Math.min(b[0], o[i]); b[1] = Math.min(b[1], o[i + 1]);
      b[2] = Math.max(b[2], o[i]); b[3] = Math.max(b[3], o[i + 1]);
    }
    const step = (park.dense ? 11 : 15) * (refs.ultra ? 0.65 : 1);
    const keep = (park.dense ? 0.8 : 0.5) + (refs.ultra ? 0.12 : 0);
    for (let x = b[0]; x < b[2]; x += step) {
      for (let z = b[1]; z < b[3]; z += step) {
        if (rng() > keep) continue;
        const px = x + (rng() - 0.5) * 9, pz = z + (rng() - 0.5) * 9;
        if (!pointInRing(o, px, pz)) continue;
        let inHole = false;
        for (const inn of park.inners) if (pointInRing(inn, px, pz)) { inHole = true; break; }
        if (inHole) continue;
        trees.push({ x: px, z: pz, s: 0.9 + rng() * 1.5 });
      }
    }
  }
  for (const rd of refs.roadsForGreen) {
    if (trees.length > cap) break;
    const wayKeep = mulberry32(rd.i * 31 + 5)();
    const p = (rd.cls === 6 ? 0.42 : rd.cls === 3 ? 0.4 : 0.3) * (refs.ultra ? 1.8 : 1);
    if (wayKeep > p) continue;
    const pts = rd.pts;
    const off = rd.w / 2 + 2.8;
    let acc = 0;
    for (let i = 1; i < pts.length / 2; i++) {
      const x0 = pts[(i - 1) * 2], z0 = pts[(i - 1) * 2 + 1];
      const x1 = pts[i * 2], z1 = pts[i * 2 + 1];
      const dx = x1 - x0, dz = z1 - z0;
      const L = Math.hypot(dx, dz);
      let t = 26 - acc;
      while (t < L) {
        const px = x0 + (dx / L) * t, pz = z0 + (dz / L) * t;
        const nx = -dz / L, nz = dx / L;
        for (const side of [1, -1]) {
          if (rng() < 0.82) {
            trees.push({
              x: px + nx * off * side + (rng() - 0.5) * 2,
              z: pz + nz * off * side + (rng() - 0.5) * 2,
              s: 0.8 + rng() * 0.9,
            });
          }
        }
        t += 26;
      }
      acc = (acc + L) % 26;
    }
  }
  if (refs.coastLine && data.sea) {
    const line = refs.coastLine;
    let acc = 0;
    for (let i = 1; i < line.length / 2; i++) {
      const x0 = line[(i - 1) * 2], z0 = line[(i - 1) * 2 + 1];
      const x1 = line[i * 2], z1 = line[i * 2 + 1];
      const dx = x1 - x0, dz = z1 - z0;
      const L = Math.hypot(dx, dz);
      let t = 24 - acc;
      while (t < L) {
        const px = x0 + (dx / L) * t, pz = z0 + (dz / L) * t;
        let nx = -dz / L, nz = dx / L;
        if (pointInRing(data.sea, px + nx * 25, pz + nz * 25)) { nx = -nx; nz = -nz; }
        if (rng() < 0.75) palms.push({ x: px + nx * 24, z: pz + nz * 24, s: 0.85 + rng() * 0.5 });
        if (rng() < 0.4) palms.push({ x: px + nx * 46, z: pz + nz * 46, s: 0.8 + rng() * 0.5 });
        t += 24;
      }
      acc = (acc + L) % 24;
    }
  }

  const group = new THREE.Group();
  const trunkGeo = mergeParts([{ geo: new THREE.CylinderGeometry(0.13, 0.2, 2.6, 5, 1, true), mat4: M(0, 1.3, 0) }]);
  const canopyGeo = mergeParts([{ geo: new THREE.IcosahedronGeometry(1.65, 0), mat4: M(0, 3.4, 0) }]);
  const trunkItems = trees.map((t) => ({ x: t.x, y: 0.05, z: t.z, s: 0.8 + t.s * 0.3, sy: t.s, c: [0.34, 0.25, 0.18] }));
  const canopyItems = trees.map((t, i) => ({
    x: t.x, y: 0.05 + (t.s - 1) * 2.2, z: t.z, s: t.s, sy: t.s * 1.05,
    c: GREENS[i % GREENS.length],
  }));
  group.add(makeInstanced(trunkGeo, trunkItems, env));
  group.add(makeInstanced(canopyGeo, canopyItems, env));

  const fronds = [];
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2;
    const g = new THREE.PlaneGeometry(3.2, 0.7, 3, 1);
    const p = g.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      p.setY(i, -Math.pow(Math.max(0, x + 1.6) / 3.2, 2) * 1.3);
    }
    g.computeVertexNormals();
    fronds.push({ geo: g, mat4: M(Math.cos(a) * 1.1, 7.1, Math.sin(a) * 1.1, -a) });
  }
  const palmGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.14, 0.23, 7, 5, 1, true), mat4: M(0, 3.5, 0), c: [0.62, 0.52, 0.4] },
    ...fronds,
  ]);
  const palmItems = palms.map((t, i) => ({ x: t.x, y: 0.05, z: t.z, ry: (i * 2.39) % 6.28, s: t.s, c: PALM_GREEN[i % 3] }));
  if (palmItems.length) group.add(makeInstanced(palmGeo, palmItems, env));
  scene.add(group);
  return { group, treeCount: trees.length + palms.length };
}

export function makeStreetFurniture(data, refs, env, scene) {
  const rng = mulberry32(99991);
  const group = new THREE.Group();
  const lamps = [];
  const L = data.lamps;
  for (let i = 0; i < L.length; i += 2) lamps.push({ x: L[i], z: L[i + 1] });
  const SPACING = refs.ultra ? [30, 30, 34, 40, 46] : [42, 44, 52, 62, 76];
  for (const p of refs.carPaths) {
    if (lamps.length > 30000) break;
    if (p.cls > 4) continue;
    const sp = SPACING[p.cls];
    const pts = p.pts;
    let acc = 0, sideFlip = 1;
    for (let i = 1; i < pts.length / 2; i++) {
      const x0 = pts[(i - 1) * 2], z0 = pts[(i - 1) * 2 + 1];
      const x1 = pts[i * 2], z1 = pts[i * 2 + 1];
      const dx = x1 - x0, dz = z1 - z0;
      const seg = Math.hypot(dx, dz);
      let t = sp - acc;
      while (t < seg) {
        const px = x0 + (dx / seg) * t, pz = z0 + (dz / seg) * t;
        const nx = -dz / seg, nz = dx / seg;
        const off = (p.cls <= 1 ? 8.2 : 5.2);
        lamps.push({ x: px + nx * off * sideFlip, z: pz + nz * off * sideFlip, y: p.y });
        sideFlip = -sideFlip;
        t += sp;
      }
      acc = (acc + seg) % sp;
    }
  }
  const lampGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.06, 0.09, 5.4, 5, 1, true), mat4: M(0, 2.7, 0) },
    { geo: new THREE.BoxGeometry(1.0, 0.07, 0.07), mat4: M(0.45, 5.35, 0) },
    { geo: new THREE.SphereGeometry(0.19, 5, 3), mat4: M(0.85, 5.3, 0), e: 1 },
  ]);
  const lampItems = lamps.map((l) => ({ x: l.x, y: l.y || 0.15, z: l.z, ry: rng() * 6.28, c: [0.22, 0.23, 0.25] }));
  group.add(makeInstanced(lampGeo, lampItems, env));

  const haloPos = new Float32Array(lamps.length * 3);
  lamps.forEach((l, i) => {
    haloPos[i * 3] = l.x + 0.8; haloPos[i * 3 + 1] = (l.y || 0.15) + 5.35; haloPos[i * 3 + 2] = l.z;
  });
  const hg = new THREE.BufferGeometry();
  hg.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
  const halos = new THREE.Points(hg, haloMaterial(env));
  halos.frustumCulled = false;
  group.add(halos);

  // traffic signals
  const S = data.signals;
  const sigGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.05, 0.07, 3.1, 4, 1, true), mat4: M(0, 1.55, 0) },
    { geo: new THREE.BoxGeometry(0.26, 0.72, 0.22), mat4: M(0, 3.35, 0), e: 1, c: [0.4, 0.4, 0.4] },
  ]);
  const sigItems = [];
  for (let i = 0; i < S.length; i += 2) {
    sigItems.push({ x: S[i], y: 0.15, z: S[i + 1], ry: rng() * 6.28, c: [0.15, 0.16, 0.18] });
  }
  if (sigItems.length) group.add(makeInstanced(sigGeo, sigItems, env, { emColor: '#ffb033' }));

  // rooftop solar heaters + AC units
  const dudGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.5, 0.5, 1.7, 6), mat4: M(0, 0.62, 0, 0, 0, Math.PI / 2) },
    { geo: new THREE.BoxGeometry(1.55, 0.06, 1.15), mat4: M(0, 0.45, 1.05, 0, -0.5, 0), c: [0.35, 0.42, 0.5] },
  ]);
  const dudItems = [];
  const D = refs.dudSpots;
  for (let i = 0; i < D.length; i += 4) {
    dudItems.push({ x: D[i], y: D[i + 1], z: D[i + 2], ry: D[i + 3], s: 0.9 + (i % 5) * 0.05, c: [0.92, 0.92, 0.9] });
  }
  if (dudItems.length) group.add(makeInstanced(dudGeo, dudItems, env));

  const acGeo = mergeParts([{ geo: new THREE.BoxGeometry(1.25, 0.72, 0.95), mat4: M(0, 0.36, 0) }]);
  const acItems = [];
  const AC = refs.acSpots;
  for (let i = 0; i < AC.length; i += 4) {
    acItems.push({ x: AC[i], y: AC[i + 1], z: AC[i + 2], ry: AC[i + 3], s: 0.9 + (i % 4) * 0.12, c: [0.7, 0.71, 0.72] });
  }
  if (acItems.length) group.add(makeInstanced(acGeo, acItems, env));

  // aviation beacons
  if (refs.beacons.length) {
    const bg = new THREE.BufferGeometry();
    bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(refs.beacons), 3));
    const bm = SM({
      uniforms: env, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        varying float vPhase;
        void main() {
          vPhase = fract(position.x * 0.137 + position.z * 0.291);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(1500.0 / length(mv.xyz), 2.0, 10.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform float uTime, uNight;
        varying float vPhase;
        void main() {
          float blink = smoothstep(0.4, 0.5, fract(uTime * 0.6 + vPhase));
          vec2 c = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.1, length(c)) * blink * (0.25 + 0.75 * uNight);
          gl_FragColor = vec4(1.0, 0.12, 0.1, a);
        }`,
    });
    const beacons = new THREE.Points(bg, bm);
    beacons.frustumCulled = false;
    group.add(beacons);
  }
  scene.add(group);
  return { group, lampCount: lamps.length };
}

// Balconies, antennas, crosswalks, bus shelters, benches, beach life.
export function makeStreetLife(data, refs, env, scene) {
  const rng = mulberry32(31337);
  const group = new THREE.Group();

  // balconies (collected during the building pass)
  const balGeo = mergeParts([
    { geo: new THREE.BoxGeometry(1.35, 0.14, 2.7), mat4: M(0.72, 0, 0) },
    { geo: new THREE.BoxGeometry(0.07, 0.85, 2.7), mat4: M(1.36, 0.48, 0), c: [0.9, 0.9, 0.88] },
  ]);
  const BS = refs.balconySpots;
  const balItems = [];
  for (let i = 0; i < BS.length; i += 4) {
    balItems.push({ x: BS[i], y: BS[i + 1], z: BS[i + 2], ry: BS[i + 3], s: 0.92 + (i % 7) * 0.02, c: [0.88, 0.85, 0.79] });
  }
  if (balItems.length) group.add(makeInstanced(balGeo, balItems, env));

  // rooftop antennas
  const antGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.025, 0.035, 4.6, 4, 1, true), mat4: M(0, 2.3, 0) },
    { geo: new THREE.BoxGeometry(0.7, 0.03, 0.03), mat4: M(0, 4.1, 0) },
    { geo: new THREE.BoxGeometry(0.5, 0.03, 0.03), mat4: M(0, 3.6, 0, 0.7) },
  ]);
  const AN = refs.antennaSpots;
  const antItems = [];
  for (let i = 0; i < AN.length; i += 4) {
    antItems.push({ x: AN[i], y: AN[i + 1], z: AN[i + 2], ry: AN[i + 3] * 6.28, c: [0.3, 0.3, 0.32] });
  }
  if (antItems.length) group.add(makeInstanced(antGeo, antItems, env));

  // crosswalks at every real traffic signal
  const cwStripe = [];
  for (let k = 0; k < 6; k++) {
    cwStripe.push({ geo: new THREE.BoxGeometry(0.42, 0.05, 1), mat4: M(-2.2 + k * 0.88, 0, 0) });
  }
  const cwGeo = mergeParts(cwStripe);
  const cwItems = [];
  const SIG = data.signals;
  for (let i = 0; i < SIG.length; i += 2) {
    const road = nearestRoad(refs, SIG[i], SIG[i + 1]);
    if (!road || road.d > 25) continue;
    cwItems.push({
      x: road.px, y: road.y + 0.045, z: road.pz, ry: road.dir,
      sx: 1, sy: 1, sz: road.w + 1.5, c: [0.88, 0.88, 0.85],
    });
  }
  if (cwItems.length) group.add(makeInstanced(cwGeo, cwItems, env));

  // bus shelters at real bus stops, aligned to the nearest road
  const shelterGeo = mergeParts([
    { geo: new THREE.BoxGeometry(3.1, 0.12, 1.5), mat4: M(0, 2.45, 0), c: [0.85, 0.4, 0.15] },
    { geo: new THREE.CylinderGeometry(0.05, 0.05, 2.4, 4, 1, true), mat4: M(-1.4, 1.22, -0.6) },
    { geo: new THREE.CylinderGeometry(0.05, 0.05, 2.4, 4, 1, true), mat4: M(1.4, 1.22, -0.6) },
    { geo: new THREE.BoxGeometry(3.1, 1.5, 0.06), mat4: M(0, 1.35, -0.68), c: [0.7, 0.78, 0.82] },
    { geo: new THREE.BoxGeometry(2.6, 0.06, 0.4), mat4: M(0, 0.55, -0.35) },
  ]);
  const busItems = [];
  const BUS = data.busstops || new Float32Array(0);
  for (let i = 0; i < BUS.length; i += 2) {
    const road = nearestRoad(refs, BUS[i], BUS[i + 1]);
    const ry = road && road.d < 30 ? road.dir : rng() * 6.28;
    busItems.push({ x: BUS[i], y: 0.16, z: BUS[i + 1], ry, c: [0.55, 0.57, 0.6] });
  }
  if (busItems.length) group.add(makeInstanced(shelterGeo, busItems, env));

  // benches (real OSM)
  const benchGeo = mergeParts([
    { geo: new THREE.BoxGeometry(1.7, 0.07, 0.45), mat4: M(0, 0.46, 0) },
    { geo: new THREE.BoxGeometry(1.7, 0.42, 0.06), mat4: M(0, 0.72, -0.22, 0, -0.15) },
    { geo: new THREE.BoxGeometry(0.08, 0.45, 0.4), mat4: M(-0.72, 0.22, 0) },
    { geo: new THREE.BoxGeometry(0.08, 0.45, 0.4), mat4: M(0.72, 0.22, 0) },
  ]);
  const BEN = data.benches || new Float32Array(0);
  const benchItems = [];
  for (let i = 0; i < BEN.length; i += 2) {
    benchItems.push({ x: BEN[i], y: 0.16, z: BEN[i + 1], ry: rng() * 6.28, c: [0.5, 0.38, 0.26] });
  }
  if (benchItems.length) group.add(makeInstanced(benchGeo, benchItems, env));

  // lifeguard huts: mapped ones + a procedural row along the beach
  const hutGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.09, 0.09, 2.4, 4, 1, true), mat4: M(-1.1, 1.2, -1.1), c: [0.5, 0.42, 0.32] },
    { geo: new THREE.CylinderGeometry(0.09, 0.09, 2.4, 4, 1, true), mat4: M(1.1, 1.2, -1.1), c: [0.5, 0.42, 0.32] },
    { geo: new THREE.CylinderGeometry(0.09, 0.09, 2.4, 4, 1, true), mat4: M(-1.1, 1.2, 1.1), c: [0.5, 0.42, 0.32] },
    { geo: new THREE.CylinderGeometry(0.09, 0.09, 2.4, 4, 1, true), mat4: M(1.1, 1.2, 1.1), c: [0.5, 0.42, 0.32] },
    { geo: new THREE.BoxGeometry(2.9, 1.9, 2.9), mat4: M(0, 3.3, 0) },
    { geo: new THREE.BoxGeometry(3.5, 0.14, 3.5), mat4: M(0, 4.4, 0), c: [0.75, 0.2, 0.15] },
    { geo: new THREE.BoxGeometry(1.1, 0.9, 2.94), mat4: M(-0.9, 2.8, 0), c: [0.75, 0.2, 0.15] },
  ]);
  const hutItems = [];
  const LG = data.lifeguards || new Float32Array(0);
  for (let i = 0; i < LG.length; i += 2) {
    hutItems.push({ x: LG[i], y: 0.1, z: LG[i + 1], ry: rng() * 6.28, c: [0.93, 0.9, 0.85] });
  }
  if (refs.coastLine) {
    const line = refs.coastLine;
    let acc = 0;
    for (let i = 1; i < line.length / 2; i++) {
      const x0 = line[(i - 1) * 2], z0 = line[(i - 1) * 2 + 1];
      const x1 = line[i * 2], z1 = line[i * 2 + 1];
      const L = Math.hypot(x1 - x0, z1 - z0);
      let t = 175 - acc;
      while (t < L) {
        const px = x0 + (x1 - x0) * (t / L), pz = z0 + (z1 - z0) * (t / L);
        let nx = -(z1 - z0) / L, nz = (x1 - x0) / L;
        if (data.sea && pointInRing(data.sea, px + nx * 15, pz + nz * 15)) { nx = -nx; nz = -nz; }
        // only where a mapped beach polygon exists
        let onBeach = false;
        for (const b of refs.beaches || []) {
          if (pointInRing(b.outer, px + nx * 14, pz + nz * 14)) { onBeach = true; break; }
        }
        if (onBeach && rng() < 0.8) {
          hutItems.push({ x: px + nx * 14, y: 0.1, z: pz + nz * 14, ry: Math.atan2(-nz, nx) + Math.PI, c: [0.93, 0.9, 0.85] });
        }
        t += 175;
      }
      acc = (acc + L) % 175;
    }
  }
  if (hutItems.length) group.add(makeInstanced(hutGeo, hutItems, env));

  // beach umbrellas
  const umbGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.03, 0.04, 1.9, 4, 1, true), mat4: M(0, 0.95, 0), c: [0.75, 0.73, 0.7] },
    { geo: new THREE.ConeGeometry(1.35, 0.5, 7, 1, true), mat4: M(0, 1.95, 0) },
  ]);
  const UMB_COL = ['#d94f3d', '#e8963c', '#2fa8b5', '#e8d44c', '#f0ece2', '#5a8fd4'].map((h) => new THREE.Color(h).toArray());
  const umbItems = [];
  for (const b of refs.beaches || []) {
    if (umbItems.length > 2600) break;
    const bb = [1e9, 1e9, -1e9, -1e9];
    for (let i = 0; i < b.outer.length; i += 2) {
      bb[0] = Math.min(bb[0], b.outer[i]); bb[1] = Math.min(bb[1], b.outer[i + 1]);
      bb[2] = Math.max(bb[2], b.outer[i]); bb[3] = Math.max(bb[3], b.outer[i + 1]);
    }
    for (let x = bb[0]; x < bb[2]; x += 11) {
      for (let z = bb[1]; z < bb[3]; z += 11) {
        if (rng() > 0.3) continue;
        const px = x + (rng() - 0.5) * 7, pz = z + (rng() - 0.5) * 7;
        if (!pointInRing(b.outer, px, pz)) continue;
        umbItems.push({ x: px, y: 0.12, z: pz, ry: rng() * 6.28, s: 0.85 + rng() * 0.35, c: UMB_COL[(rng() * UMB_COL.length) | 0] });
      }
    }
  }
  if (umbItems.length) group.add(makeInstanced(umbGeo, umbItems, env));

  scene.add(group);
  return {
    group,
    counts: {
      balconies: balItems.length, antennas: antItems.length, crosswalks: cwItems.length,
      shelters: busItems.length, benches: benchItems.length, huts: hutItems.length, umbrellas: umbItems.length,
    },
  };
}

const CAR_COLORS = ['#e8e8e8', '#d0d0d0', '#b8bcc0', '#3a3d42', '#606468', '#8f9296',
  '#ffffff', '#c0392b', '#2c5f8a', '#7a6a52', '#e8e8e8', '#f0f0f0'].map((h) => new THREE.Color(h).toArray());
const PED_COLORS = ['#d95f4c', '#3f6fb5', '#e8e4da', '#48484c', '#69a05c', '#e0b13e',
  '#b46fc4', '#5cc2c9', '#f0f0f0', '#8a6a4f'].map((h) => new THREE.Color(h).toArray());

export function makeTraffic(refs, env, scene) {
  const rng = mulberry32(424242);
  const SPACING = [26, 52, 88, 140, 260];
  const SPEED = [24, 13.5, 11.5, 9.5, 7];
  const cars = [];
  const buses = [];
  const ordered = [...refs.carPaths].sort((a, b) => a.cls - b.cls);
  for (const p of ordered) {
    const n = Math.floor(p.len / SPACING[p.cls]);
    for (let k = 0; k < n && cars.length < 2200; k++) {
      cars.push({
        p, s: rng() * p.len, dir: p.oneway ? 1 : (rng() < 0.5 ? 1 : -1),
        v: SPEED[p.cls] * (0.85 + rng() * 0.4),
        lane: p.cls <= 1 ? (rng() < 0.5 ? 2.1 : 5.6) : 1.9,
        seg: 0, ci: (rng() * CAR_COLORS.length) | 0,
      });
    }
    if (p.cls <= 2 && p.len > 500 && buses.length < 110 && rng() < 0.5) {
      buses.push({
        p, s: rng() * p.len, dir: p.oneway ? 1 : (rng() < 0.5 ? 1 : -1),
        v: SPEED[p.cls] * 0.8, lane: 2.2, seg: 0, ci: 0,
      });
    }
  }
  // pedestrians on footways
  const peds = [];
  for (const p of refs.pedPaths) {
    const n = Math.min(4, Math.floor(p.len / 130));
    for (let k = 0; k < n && peds.length < 900; k++) {
      peds.push({
        p, s: rng() * p.len, dir: rng() < 0.5 ? 1 : -1,
        v: 1.0 + rng() * 0.8, lane: (rng() - 0.5) * 1.6, seg: 0,
        ci: (rng() * PED_COLORS.length) | 0,
      });
    }
  }
  // trains on the longest rail lines
  const trains = [];
  const rails = [...refs.railPaths].sort((a, b) => b.len - a.len).slice(0, 3);
  for (const p of rails) {
    for (const dir of [1, -1]) {
      const s0 = rng() * p.len;
      for (let c = 0; c < 4; c++) {
        trains.push({ p, s: s0 - c * 19.5 * dir, dir, v: 19, lane: dir * 2.1, seg: 0, ci: 0 });
      }
    }
  }

  const carGeo = mergeParts([
    { geo: new THREE.BoxGeometry(4.2, 0.95, 1.8), mat4: M(0, 0.65, 0) },
    { geo: new THREE.BoxGeometry(2.3, 0.65, 1.62), mat4: M(-0.25, 1.42, 0) },
    { geo: new THREE.BoxGeometry(0.1, 0.22, 0.38), mat4: M(2.08, 0.62, 0.55), e: 3 },
    { geo: new THREE.BoxGeometry(0.1, 0.22, 0.38), mat4: M(2.08, 0.62, -0.55), e: 3 },
    { geo: new THREE.BoxGeometry(0.08, 0.2, 0.42), mat4: M(-2.12, 0.68, 0.6), e: 2 },
    { geo: new THREE.BoxGeometry(0.08, 0.2, 0.42), mat4: M(-2.12, 0.68, -0.6), e: 2 },
  ]);
  const busGeo = mergeParts([
    { geo: new THREE.BoxGeometry(10.8, 2.9, 2.5), mat4: M(0, 1.75, 0) },
    { geo: new THREE.BoxGeometry(0.12, 0.3, 0.5), mat4: M(5.42, 0.8, 0.75), e: 3 },
    { geo: new THREE.BoxGeometry(0.12, 0.3, 0.5), mat4: M(5.42, 0.8, -0.75), e: 3 },
  ]);
  const pedGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.16, 0.22, 1.05, 5, 1, true), mat4: M(0, 0.68, 0) },
    { geo: new THREE.SphereGeometry(0.15, 5, 4), mat4: M(0, 1.45, 0), c: [0.85, 0.66, 0.52] },
  ]);
  const trainGeo = mergeParts([
    { geo: new THREE.BoxGeometry(18.6, 3.3, 3.0), mat4: M(0, 2.0, 0) },
    { geo: new THREE.BoxGeometry(18.6, 0.7, 3.04), mat4: M(0, 1.2, 0), c: [0.75, 0.15, 0.12] },
    { geo: new THREE.BoxGeometry(0.2, 0.5, 1.6), mat4: M(9.35, 1.2, 0), e: 3 },
  ]);

  const group = new THREE.Group();
  const mk = (geo, list, colFn) => {
    const mesh = new THREE.InstancedMesh(geo, instancedMaterial(env), list.length);
    const cols = new Float32Array(list.length * 3);
    list.forEach((c, i) => cols.set(colFn(c), i * 3));
    geo.setAttribute('aInstColor', new THREE.InstancedBufferAttribute(cols, 3));
    mesh.frustumCulled = false;
    group.add(mesh);
    return mesh;
  };
  const carMesh = mk(carGeo, cars, (c) => CAR_COLORS[c.ci]);
  const busMesh = mk(busGeo, buses, () => [0.16, 0.5, 0.3]);
  const pedMesh = mk(pedGeo, peds, (c) => PED_COLORS[c.ci]);
  const trainMesh = mk(trainGeo, trains, () => [0.82, 0.83, 0.85]);
  scene.add(group);

  const m = new THREE.Matrix4();
  function place(list, mesh, dt, yOff) {
    for (let i = 0; i < list.length; i++) {
      const c = list[i];
      const P = c.p;
      c.s += c.v * c.dir * dt;
      if (c.s >= P.len) { if (P.oneway) c.s -= P.len; else { c.dir = -1; c.s = P.len - 0.01; } }
      if (c.s < 0) { if (P.oneway) c.s += P.len; else { c.dir = 1; c.s = 0.01; } }
      const cum = P.cum, pts = P.pts;
      let seg = Math.min(c.seg, cum.length - 2);
      while (seg < cum.length - 2 && cum[seg + 1] < c.s) seg++;
      while (seg > 0 && cum[seg] > c.s) seg--;
      c.seg = seg;
      const segLen = (cum[seg + 1] - cum[seg]) || 1;
      const t = (c.s - cum[seg]) / segLen;
      const x0 = pts[seg * 2], z0 = pts[seg * 2 + 1];
      const dx = (pts[(seg + 1) * 2] - x0) * c.dir, dz = (pts[(seg + 1) * 2 + 1] - z0) * c.dir;
      const L2 = Math.hypot(dx, dz) || 1;
      const fx = dx / L2, fz = dz / L2;
      const rx = -fz, rz = fx;
      const px = x0 + (pts[(seg + 1) * 2] - x0) * t + rx * c.lane;
      const pz = z0 + (pts[(seg + 1) * 2 + 1] - z0) * t + rz * c.lane;
      m.makeRotationY(Math.atan2(-fz, fx));
      m.setPosition(px, P.y + yOff, pz);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
  return {
    group,
    count: cars.length + buses.length,
    pedCount: peds.length,
    trainCount: trains.length,
    update(dt) {
      place(cars, carMesh, dt, 0.15);
      place(buses, busMesh, dt, 0.15);
      place(peds, pedMesh, dt, 0.12);
      place(trains, trainMesh, dt, 0.1);
    },
  };
}

export function makeBoats(env, scene, lonlatToLocal, meta, seaRing) {
  const rng = mulberry32(777);
  const spots = [];
  const add = (lon, lat, n, spread) => {
    const [cx, cz] = lonlatToLocal(meta, lon, lat);
    for (let i = 0; i < n; i++) {
      spots.push({ x: cx + (rng() - 0.5) * spread, z: cz + (rng() - 0.5) * spread, ry: rng() * 6.28, s: 0.7 + rng() * 0.9 });
    }
  };
  add(34.7655, 32.0873, 26, 220);
  add(34.7509, 32.0532, 12, 160);
  add(34.7692, 32.0965, 8, 200);
  for (let i = 0; i < 14; i++) {
    spots.push({ x: -3800 - rng() * 2600, z: -6000 + rng() * 11000, ry: rng() * 6.28, s: 0.8 + rng() * 0.7 });
  }
  const kept = seaRing ? spots.filter((s) => pointInRing(seaRing, s.x, s.z)) : spots;
  const boatGeo = mergeParts([
    { geo: new THREE.BoxGeometry(4.6, 0.75, 1.55), mat4: M(0, 0.28, 0) },
    { geo: new THREE.BoxGeometry(1.6, 0.7, 1.1), mat4: M(-0.4, 0.95, 0) },
    { geo: new THREE.CylinderGeometry(0.035, 0.05, 4.6, 4, 1, true), mat4: M(0.5, 2.6, 0), c: [0.55, 0.5, 0.45] },
  ]);
  const items = kept.map((s, i) => ({
    x: s.x, y: -0.3, z: s.z, ry: s.ry, s: s.s,
    c: i % 5 === 0 ? [0.75, 0.8, 0.85] : [0.94, 0.94, 0.92],
  }));
  const mesh = makeInstanced(boatGeo, items, env);
  scene.add(mesh);
  return { group: mesh, count: items.length };
}
