// Instanced micro-detail: vegetation, street furniture, rooftops, traffic, boats.
import * as THREE from 'three';
import { instancedMaterial, haloMaterial, SM } from './shaders.js';
import { mulberry32, pointInRing } from './citybuild.js';

// merge simple primitives into one non-indexed geometry with an aEm attribute
function mergeParts(parts) {
  const pos = [], nor = [], em = [];
  for (const { geo, mat4, e } of parts) {
    const g = geo.toNonIndexed();
    if (mat4) g.applyMatrix4(mat4);
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nor.push(n.getX(i), n.getY(i), n.getZ(i));
      em.push(e || 0);
    }
    geo.dispose();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(nor), 3));
  g.setAttribute('aEm', new THREE.BufferAttribute(new Float32Array(em), 1));
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
  // items: flat array of {x,y,z,ry,s,sy,c:[r,g,b]}
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
    m.scale(v.set(s, it.sy || s, s));
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

  // real OSM trees
  const T = data.trees;
  for (let i = 0; i < T.length; i += 2) {
    trees.push({ x: T[i], z: T[i + 1], s: 1.1 + rng() * 1.3 });
  }
  // park fill
  for (const park of refs.parks) {
    if (trees.length > cap) break;
    const b = [1e9, 1e9, -1e9, -1e9];
    const o = park.outer;
    for (let i = 0; i < o.length; i += 2) {
      b[0] = Math.min(b[0], o[i]); b[1] = Math.min(b[1], o[i + 1]);
      b[2] = Math.max(b[2], o[i]); b[3] = Math.max(b[3], o[i + 1]);
    }
    const step = park.dense ? 11 : 15;
    const keep = park.dense ? 0.8 : 0.5;
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
  // boulevard rows
  for (const rd of refs.roadsForGreen) {
    if (trees.length > cap) break;
    const wayKeep = mulberry32(rd.i * 31 + 5)();
    const p = rd.cls === 6 ? 0.42 : rd.cls === 3 ? 0.4 : 0.3;
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
  // beach palms
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
  // trunks + canopies
  const trunkGeo = mergeParts([{ geo: new THREE.CylinderGeometry(0.13, 0.2, 2.6, 5), mat4: M(0, 1.3, 0) }]);
  const canopyGeo = mergeParts([{ geo: new THREE.IcosahedronGeometry(1.65, 1), mat4: M(0, 3.4, 0, 0, 0, 0, 1) }]);
  const trunkItems = trees.map((t) => ({ x: t.x, y: 0.05, z: t.z, ry: 0, s: 0.8 + t.s * 0.3, sy: t.s, c: [0.34, 0.25, 0.18] }));
  const canopyItems = trees.map((t, i) => ({
    x: t.x, y: 0.05 + (t.s - 1) * 2.2, z: t.z, ry: 0, s: t.s, sy: t.s * 1.05,
    c: GREENS[i % GREENS.length],
  }));
  group.add(makeInstanced(trunkGeo, trunkItems, env));
  group.add(makeInstanced(canopyGeo, canopyItems, env));

  // palms: trunk + frond star
  const fronds = [];
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2;
    const g = new THREE.PlaneGeometry(3.2, 0.7, 3, 1);
    const p = g.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      p.setY(i, -Math.pow(Math.max(0, x + 1.6) / 3.2, 2) * 1.3); // droop
    }
    g.computeVertexNormals();
    fronds.push({ geo: g, mat4: M(Math.cos(a) * 1.1, 7.1, Math.sin(a) * 1.1, -a, 0, 0) });
  }
  const palmGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.14, 0.23, 7, 5), mat4: M(0, 3.5, 0) },
    ...fronds,
  ]);
  const palmItems = palms.map((t, i) => ({ x: t.x, y: 0.05, z: t.z, ry: (i * 2.39) % 6.28, s: t.s, c: PALM_GREEN[i % 3] }));
  if (palmItems.length) group.add(makeInstanced(palmGeo, palmItems, env));
  scene.add(group);
  return { group, treeCount: trees.length + palms.length };
}

export function makeStreetFurniture(data, refs, env, scene) {
  const rng = mulberry32(99991);
  const lamps = [];
  const L = data.lamps;
  for (let i = 0; i < L.length; i += 2) lamps.push({ x: L[i], z: L[i + 1] });
  // procedural lamps along roads
  const SPACING = [42, 44, 52, 62, 76];
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
  const group = new THREE.Group();
  const lampGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.06, 0.09, 5.4, 5), mat4: M(0, 2.7, 0) },
    { geo: new THREE.BoxGeometry(1.0, 0.07, 0.07), mat4: M(0.45, 5.35, 0) },
    { geo: new THREE.SphereGeometry(0.19, 6, 5), mat4: M(0.85, 5.3, 0), e: 1 },
  ]);
  const lampItems = lamps.map((l) => ({ x: l.x, y: l.y || 0.15, z: l.z, ry: rng() * 6.28, s: 1, c: [0.22, 0.23, 0.25] }));
  group.add(makeInstanced(lampGeo, lampItems, env));

  // glow halos
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
    { geo: new THREE.CylinderGeometry(0.05, 0.07, 3.1, 5), mat4: M(0, 1.55, 0) },
    { geo: new THREE.BoxGeometry(0.26, 0.72, 0.22), mat4: M(0, 3.35, 0), e: 1 },
  ]);
  const sigItems = [];
  for (let i = 0; i < S.length; i += 2) {
    sigItems.push({ x: S[i], y: 0.15, z: S[i + 1], ry: rng() * 6.28, s: 1, c: [0.15, 0.16, 0.18] });
  }
  if (sigItems.length) group.add(makeInstanced(sigGeo, sigItems, env, { emColor: '#ffb033' }));

  // rooftop: solar water heaters
  const dudGeo = mergeParts([
    { geo: new THREE.CylinderGeometry(0.5, 0.5, 1.7, 7), mat4: M(0, 0.62, 0, 0, 0, Math.PI / 2) },
    { geo: new THREE.BoxGeometry(1.55, 0.06, 1.15), mat4: M(0, 0.45, 1.05, 0, -0.5, 0) },
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

  // aviation warning beacons on towers ≥ 100 m
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

const CAR_COLORS = ['#e8e8e8', '#d0d0d0', '#b8bcc0', '#3a3d42', '#606468', '#8f9296',
  '#ffffff', '#c0392b', '#2c5f8a', '#7a6a52', '#e8e8e8', '#f0f0f0'].map((h) => new THREE.Color(h).toArray());

export function makeTraffic(refs, env, scene) {
  const rng = mulberry32(424242);
  const SPACING = [36, 60, 92, 140, 260];
  const SPEED = [24, 13.5, 11.5, 9.5, 7];
  const cars = [];
  const buses = [];
  for (const p of refs.carPaths) {
    const n = Math.floor(p.len / SPACING[p.cls]);
    for (let k = 0; k < n && cars.length < 1500; k++) {
      cars.push({
        p, s: rng() * p.len, dir: p.oneway ? 1 : (rng() < 0.5 ? 1 : -1),
        v: SPEED[p.cls] * (0.85 + rng() * 0.4),
        lane: p.cls <= 1 ? (rng() < 0.5 ? 2.1 : 5.6) : 1.9,
        seg: 0, ci: (rng() * CAR_COLORS.length) | 0,
      });
    }
    if (p.cls <= 2 && p.len > 500 && buses.length < 90 && rng() < 0.5) {
      buses.push({
        p, s: rng() * p.len, dir: p.oneway ? 1 : (rng() < 0.5 ? 1 : -1),
        v: SPEED[p.cls] * 0.8, lane: 2.2, seg: 0, ci: 0,
      });
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

  const group = new THREE.Group();
  const carMesh = new THREE.InstancedMesh(carGeo, instancedMaterial(env), cars.length);
  const busMesh = new THREE.InstancedMesh(busGeo, instancedMaterial(env), buses.length);
  const carCols = new Float32Array(cars.length * 3);
  cars.forEach((c, i) => { const cc = CAR_COLORS[c.ci]; carCols.set(cc, i * 3); });
  carGeo.setAttribute('aInstColor', new THREE.InstancedBufferAttribute(carCols, 3));
  const busCols = new Float32Array(buses.length * 3);
  buses.forEach((b, i) => busCols.set([0.16, 0.5, 0.3], i * 3));
  busGeo.setAttribute('aInstColor', new THREE.InstancedBufferAttribute(busCols, 3));
  carMesh.frustumCulled = false;
  busMesh.frustumCulled = false;
  group.add(carMesh, busMesh);
  scene.add(group);

  const m = new THREE.Matrix4();
  function place(list, mesh, dt) {
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
      const rx = -fz, rz = fx; // right side of travel
      const px = x0 + (pts[(seg + 1) * 2] - x0) * t + rx * c.lane;
      const pz = z0 + (pts[(seg + 1) * 2 + 1] - z0) * t + rz * c.lane;
      m.makeRotationY(Math.atan2(-fz, fx));
      m.setPosition(px, P.y + 0.15, pz);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
  return {
    group,
    count: cars.length + buses.length,
    update(dt) { place(cars, carMesh, dt); place(buses, busMesh, dt); },
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
  add(34.7655, 32.0873, 26, 220);   // marina
  add(34.7509, 32.0532, 12, 160);   // Jaffa port
  add(34.7692, 32.0965, 8, 200);    // TLV port
  // offshore sails
  for (let i = 0; i < 14; i++) {
    const x = -3800 - rng() * 2600;
    const z = -6000 + rng() * 11000;
    spots.push({ x, z, ry: rng() * 6.28, s: 0.8 + rng() * 0.7 });
  }
  const kept = seaRing ? spots.filter((s) => pointInRing(seaRing, s.x, s.z)) : spots;
  const boatGeo = mergeParts([
    { geo: new THREE.BoxGeometry(4.6, 0.75, 1.55), mat4: M(0, 0.28, 0) },
    { geo: new THREE.BoxGeometry(1.6, 0.7, 1.1), mat4: M(-0.4, 0.95, 0) },
    { geo: new THREE.CylinderGeometry(0.035, 0.05, 4.6, 4), mat4: M(0.5, 2.6, 0) },
  ]);
  const items = kept.map((s, i) => ({
    x: s.x, y: -0.3, z: s.z, ry: s.ry, s: s.s,
    c: i % 5 === 0 ? [0.75, 0.8, 0.85] : [0.94, 0.94, 0.92],
  }));
  const mesh = makeInstanced(boatGeo, items, env);
  scene.add(mesh);
  return { group: mesh, count: items.length };
}
