// Turns the decoded OSM dataset into merged, tiled Three.js geometry.
import * as THREE from 'three';
import earcut from 'earcut';
import { buildingsMaterial, flatMaterial, roadsMaterial, seaMaterial, foamMaterial } from './shaders.js';

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pointInRing(ring, x, z) {
  let inside = false;
  const n = ring.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = ring[i * 2], zi = ring[i * 2 + 1];
    const xj = ring[j * 2], zj = ring[j * 2 + 1];
    if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

function ringAreaXZ(ring) {
  let s = 0;
  const n = ring.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    s += ring[j * 2] * ring[i * 2 + 1] - ring[i * 2] * ring[j * 2 + 1];
  }
  return s / 2;
}

const hex = (h) => {
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};

const PAL = {
  res: ['#f1ece1', '#ece5d6', '#e8dfcd', '#f4efe6', '#e2d9c6', '#efe8db', '#e6ddcf', '#dfd6c0'].map(hex),
  comm: ['#ddd8cc', '#d0ccc2', '#cfc7b8', '#d8d2c8'].map(hex),
  ind: ['#c9c4ba', '#bdb8ae', '#cfcabf'].map(hex),
  worship: ['#f6f1e8', '#efe9dd'].map(hex),
  public: ['#e5ded0', '#dcd5c5'].map(hex),
  hotel: ['#eee9df', '#e4dfd5'].map(hex),
  glass: ['#9fb6c9', '#8fa8bd', '#a8bccc', '#8298ae'].map(hex),
};
const TY_PAL = [PAL.res, PAL.glass, PAL.ind, PAL.worship, PAL.hotel, PAL.public, PAL.comm];
const ROOF_TERRACOTTA = hex('#b06045');
const ROOF_DOME = hex('#c9c2ae');

const ROAD_STYLE = [ // width, y, color
  [19.0, 0.30, hex('#33363c')], [15.0, 0.27, hex('#3a3d43')], [12.0, 0.25, hex('#3e4147')],
  [9.5, 0.23, hex('#43464c')], [7.0, 0.21, hex('#4a4d52')], [4.2, 0.19, hex('#54565a')],
  [2.7, 0.17, hex('#a39b8d')], [3.4, 0.15, hex('#5a5550')], [4.5, 0.45, hex('#b0aa9e')],
];
const SIDEWALK_COL = hex('#948d80');

const AREA_STYLE = { // color, y
  0: [hex('#2e6d84'), 0.06], 1: [hex('#83a45f'), 0.12], 2: [hex('#5f8148'), 0.13],
  3: [hex('#ecdcb0'), 0.09], 4: [hex('#6f9c74'), 0.18], 5: [hex('#3ec3de'), 0.30],
  6: [hex('#62656a'), 0.10], 7: [hex('#74875c'), 0.11], 8: [hex('#d8d1bf'), 0.105],
  9: [hex('#cbc4b4'), 0.14], 10: [hex('#b5afa2'), 0.55], 11: [hex('#a09a90'), 0.35],
};

const nextFrame = () => new Promise(requestAnimationFrame);

class Acc {
  constructor(withExtras) {
    this.pos = []; this.col = []; this.idx = []; this.n = 0;
    if (withExtras) { this.uv = []; this.id = []; this.flags = []; }
  }
  vert(x, y, z, c, u, v, id, fl) {
    this.pos.push(x, y, z); this.col.push(c[0], c[1], c[2]);
    if (this.uv) { this.uv.push(u || 0, v || 0); this.id.push(id || 0); this.flags.push(fl || 0); }
    return this.n++;
  }
  geometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.pos), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Uint8Array(this.col), 3, true));
    if (this.uv) {
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(this.uv), 2));
      g.setAttribute('aId', new THREE.BufferAttribute(new Float32Array(this.id), 1));
      g.setAttribute('aFlags', new THREE.BufferAttribute(new Uint8Array(this.flags), 1));
    }
    g.setIndex(new THREE.BufferAttribute(this.n > 65500 ? new Uint32Array(this.idx) : new Uint16Array(this.idx), 1));
    g.computeBoundingSphere();
    return g;
  }
}

export async function buildCity(data, scene, env, onProgress) {
  const refs = {
    tileMeshes: [], buildingMeta: [], carPaths: [], pedPaths: [], railPaths: [],
    parks: [], roadsForGreen: [], dudSpots: [], acSpots: [], beacons: [],
    balconySpots: [], antennaSpots: [], roadGrid: new Map(),
    coastLine: null, stats: {},
  };
  const ultra = data.meta.mode === 'ultra';
  refs.ultra = ultra;
  const TILE = 1500;
  const tiles = new Map();
  const tileFor = (x, z) => {
    const k = Math.floor(x / TILE) + ':' + Math.floor(z / TILE);
    let t = tiles.get(k);
    if (!t) { t = new Acc(true); tiles.set(k, t); }
    return t;
  };

  // ------------------------------------------------------------ buildings --
  const B = data.buildings;
  let dudCap = 60000, acCap = 30000, balCap = ultra ? 400000 : 90000, antCap = ultra ? 40000 : 9000;
  for (let start = 0; start < B.length; start += 2200) {
    const endI = Math.min(B.length, start + 2200);
    for (let i = start; i < endI; i++) {
      const b = B[i];
      const rng = mulberry32(i * 2654435761 + 7);
      let h = b.h, mh = b.mh;
      if (h <= 0) {
        const base = [8, 12, 5.5, 8, 15, 9, 10][b.ty] || 8;
        const spread = [9, 16, 5, 5, 12, 9, 12][b.ty] || 8;
        h = base + rng() * spread;
      }
      if (mh > 0 && h <= mh) h = mh + 4;
      const glass = (h >= 76 || (b.ty === 6 && h >= 42)) ? 1 : 0;
      const comm = (b.ty === 6 || b.ty === 4) && !glass ? 1 : 0;
      const flags = glass | (comm << 1);
      let c;
      if (b.col > 0 && data.meta.colours[b.col - 1]) c = hex(data.meta.colours[b.col - 1]);
      else {
        const pal = glass ? PAL.glass : (TY_PAL[b.ty] || PAL.res);
        c = pal[(rng() * pal.length) | 0];
      }
      const jit = 0.95 + rng() * 0.09;
      const col = [Math.min(255, c[0] * jit) | 0, Math.min(255, c[1] * jit) | 0, Math.min(255, c[2] * jit) | 0];
      let roofCol = [(col[0] * 0.82) | 0, (col[1] * 0.82) | 0, (col[2] * 0.83) | 0];

      const o0 = b.outers[0].outer;
      const area = Math.abs(ringAreaXZ(o0));
      if (area < 4) continue;
      let cx = 0, cz = 0;
      for (let k = 0; k < o0.length; k += 2) { cx += o0[k]; cz += o0[k + 1]; }
      cx /= o0.length / 2; cz /= o0.length / 2;
      const metaIdx = refs.buildingMeta.length;
      refs.buildingMeta.push({ nm: b.nm !== 0xFFFF ? data.meta.names[b.nm] : null, h, ty: b.ty, cx, cz, part: b.part, a: area });
      const acc = tileFor(cx, cz);

      // roof style: OSM roof:shape → apex fan; flat roofs get a parapet rim
      const shaped = b.rsh > 0 && area < 2600;
      const roofH = shaped ? (b.rh > 0.5 ? b.rh : Math.min(4.5, Math.sqrt(area) * 0.22 + 1)) : 0;
      const parapet = !shaped && !glass && h >= 6 && area >= 55 ? 0.85 : 0;
      if (shaped) {
        roofCol = b.rsh === 4 ? ROOF_DOME.slice() : (b.ty === 0 || b.ty === 3 ? ROOF_TERRACOTTA.slice() : roofCol);
        const rj = 0.9 + rng() * 0.18;
        roofCol = [Math.min(255, roofCol[0] * rj) | 0, Math.min(255, roofCol[1] * rj) | 0, Math.min(255, roofCol[2] * rj) | 0];
      }
      const wallTop = h + parapet;
      const isResLike = b.ty === 0 || b.ty === 4 || b.ty === 5;

      for (const { outer, inners } of b.outers) {
        // walls (uv: u = facade meters, v = roofline height for the shader)
        for (const ring of [outer, ...inners]) {
          const n = ring.length / 2;
          let d = 0;
          for (let k = 0; k < n; k++) {
            const k2 = (k + 1) % n;
            const x0 = ring[k * 2], z0 = ring[k * 2 + 1];
            const x1 = ring[k2 * 2], z1 = ring[k2 * 2 + 1];
            const len = Math.hypot(x1 - x0, z1 - z0);
            if (len < 0.05) continue;
            const a = acc.vert(x0, mh, z0, col, d, h, metaIdx, flags);
            const bb = acc.vert(x1, mh, z1, col, d + len, h, metaIdx, flags);
            const cc = acc.vert(x1, wallTop, z1, col, d + len, h, metaIdx, flags);
            const dd = acc.vert(x0, wallTop, z0, col, d, h, metaIdx, flags);
            acc.idx.push(a, bb, cc, a, cc, dd);
            d += len;

            // balconies on street-scale residential facades
            if (ring === outer && !b.part && isResLike && !glass && balCap > 0 &&
                h >= 8.5 && h <= 46 && len >= 7.5) {
              let nx = z1 - z0, nz = -(x1 - x0);
              const nl = Math.hypot(nx, nz) || 1;
              nx /= nl; nz /= nl;
              const midx = (x0 + x1) / 2, midz = (z0 + z1) / 2;
              if (nx * (midx - cx) + nz * (midz - cz) < 0) { nx = -nx; nz = -nz; }
              const ry = Math.atan2(-nz, nx);
              const slots = Math.min(ultra ? 6 : 4, Math.floor(len / (ultra ? 6.2 : 7.6)));
              const floors = Math.min(7, Math.floor((h - 3.2) / 3.0));
              for (let s2 = 0; s2 < slots; s2++) {
                if (rng() > (ultra ? 0.8 : 0.62)) continue;
                const t = ((s2 + 0.5) / slots) * len;
                const bx = x0 + (x1 - x0) * (t / len), bz = z0 + (z1 - z0) * (t / len);
                for (let f = 1; f <= floors && balCap > 0; f++) {
                  if (rng() < 0.2) continue;
                  refs.balconySpots.push(bx + nx * 0.05, mh + f * 3.0 + 0.1, bz + nz * 0.05, ry);
                  balCap--;
                }
              }
            }
          }
        }
        // roof
        if (shaped) {
          const apex = acc.vert(cx, h + roofH, cz, roofCol, 0, -1000, metaIdx, flags);
          const n = outer.length / 2;
          for (let k = 0; k < n; k++) {
            const k2 = (k + 1) % n;
            const a = acc.vert(outer[k * 2], h, outer[k * 2 + 1], roofCol, 0, -1000, metaIdx, flags);
            const bb = acc.vert(outer[k2 * 2], h, outer[k2 * 2 + 1], roofCol, 0, -1000, metaIdx, flags);
            acc.idx.push(a, bb, apex);
          }
        } else {
          const flat = [];
          const holeIdx = [];
          for (let k = 0; k < outer.length; k += 2) flat.push(outer[k], outer[k + 1]);
          for (const inn of inners) {
            holeIdx.push(flat.length / 2);
            for (let k = 0; k < inn.length; k += 2) flat.push(inn[k], inn[k + 1]);
          }
          const tris = earcut(flat, holeIdx.length ? holeIdx : null, 2);
          const base = acc.n;
          for (let k = 0; k < flat.length; k += 2) {
            acc.vert(flat[k], h, flat[k + 1], roofCol, 0, -1000, metaIdx, flags);
          }
          for (let k = 0; k < tris.length; k++) acc.idx.push(base + tris[k]);
        }
      }

      // rooftop micro detail spots
      if (!b.part && !shaped && h >= 5.5 && area >= 90) {
        const isRes = b.ty === 0 || b.ty === 5;
        const wantDud = isRes && h <= 42 && dudCap > 0;
        const wantAc = (!isRes || h > 42 || b.ty === 6) && acCap > 0;
        const cnt = Math.min(5, 1 + ((area / 260) | 0));
        const bb = boundsOf(o0);
        for (let k = 0; k < cnt; k++) {
          let px = 0, pz = 0, ok = false;
          for (let tr = 0; tr < 8; tr++) {
            px = bb[0] + rng() * (bb[2] - bb[0]);
            pz = bb[1] + rng() * (bb[3] - bb[1]);
            if (pointInRing(o0, px, pz)) { ok = true; break; }
          }
          if (!ok) continue;
          if (wantDud) { refs.dudSpots.push(px, h, pz, rng() * Math.PI * 2); dudCap--; }
          else if (wantAc) { refs.acSpots.push(px, h, pz, rng() * Math.PI * 2); acCap--; }
        }
      }
      if (!b.part && !shaped && h >= 7 && antCap > 0 && rng() < 0.16) {
        refs.antennaSpots.push(cx, h + parapet, cz, rng());
        antCap--;
      }
      if (h >= 100) refs.beacons.push(cx, h + 2.5, cz);
    }
    onProgress(0.05 + 0.42 * (endI / B.length), 'בונה ' + B.length.toLocaleString('he') + ' בניינים…');
    await nextFrame();
  }

  const bMat = buildingsMaterial(env);
  for (const acc of tiles.values()) {
    const mesh = new THREE.Mesh(acc.geometry(), bMat);
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
    refs.tileMeshes.push(mesh);
  }

  // ---------------------------------------------------------------- roads --
  const fMat = flatMaterial(env);
  const roadAcc = new Acc(true);       // uv.x = length, uv.y = lateral, flags = class
  const walkAcc = new Acc(false);      // sidewalks
  const R = data.roads;
  let roadLen = 0;
  const gridAdd = (x, z, rec) => {
    const k = ((x / 60) | 0) + ':' + ((z / 60) | 0);
    let l = refs.roadGrid.get(k);
    if (!l) { l = []; refs.roadGrid.set(k, l); }
    l.push(rec);
  };
  for (let start = 0; start < R.length; start += 7000) {
    const endI = Math.min(R.length, start + 7000);
    for (let i = start; i < endI; i++) {
      const r = R[i];
      const [w, yBase, colA] = ROAD_STYLE[r.cls];
      const y = yBase + Math.max(0, r.layer) * 7.0;
      const col = r.layer > 0 ? [colA[0] * 0.92 | 0, colA[1] * 0.92 | 0, colA[2] * 0.92 | 0] : colA;
      const L = ribbonUV(roadAcc, r.pts, w, y, col, r.cls);
      roadLen += L;
      if (r.layer > 0) skirts(roadAcc, r.pts, w, y, 1.6, hex('#46464a'));
      else if (r.cls >= 1 && r.cls <= 4 && L > 60) {
        ribbon(walkAcc, r.pts, 2.4, y - 0.055, SIDEWALK_COL, w / 2 + 1.45);
        ribbon(walkAcc, r.pts, 2.4, y - 0.055, SIDEWALK_COL, -(w / 2 + 1.45));
      }
      if (r.cls <= 4 && L > 150) {
        const p = makePath(r.pts, y, r.oneway, r.cls, L);
        refs.carPaths.push(p);
        // spatial grid of segments for crosswalks / bus shelters
        for (let k = 0; k < r.pts.length / 2 - 1; k++) {
          gridAdd(r.pts[k * 2], r.pts[k * 2 + 1], { pts: r.pts, seg: k, w, y, cls: r.cls });
        }
      }
      if (r.cls === 6 && L > 90) refs.pedPaths.push(makePath(r.pts, y, 0, 6, L));
      if (r.cls === 7 && L > 1200 && r.layer <= 0) refs.railPaths.push(makePath(r.pts, y, 0, 7, L));
      if (r.cls >= 3 && r.cls <= 6) refs.roadsForGreen.push({ pts: r.pts, w, cls: r.cls, i });
    }
    onProgress(0.47 + 0.12 * (endI / R.length), 'סולל כבישים, מדרכות ומסילות…');
    await nextFrame();
  }
  const roadMesh = new THREE.Mesh(roadAcc.geometry(), roadsMaterial(env));
  roadMesh.matrixAutoUpdate = false;
  scene.add(roadMesh);
  const walkMesh = new THREE.Mesh(walkAcc.geometry(), fMat);
  walkMesh.matrixAutoUpdate = false;
  scene.add(walkMesh);
  refs.stats.roadKm = Math.round(roadLen / 1000);

  // plot fences / hedges / walls (ultra neighborhoods)
  if (data.barriers && data.barriers.length) {
    const barAcc = new Acc(false);
    const BAR = [
      { h: 1.35, w: 0.05, col: hex('#6b6f66') },   // fence
      { h: 1.55, w: 0.55, col: hex('#4f7a3d') },   // hedge
      { h: 1.9, w: 0.22, col: hex('#c9c0ae') },    // wall
    ];
    let fenceLen = 0;
    for (const b of data.barriers) {
      const st = BAR[b.ty] || BAR[0];
      const n = b.pts.length / 2;
      let pa = -1, pb = -1;
      for (let i = 0; i < n; i++) {
        const x = b.pts[i * 2], z = b.pts[i * 2 + 1];
        if (i > 0) fenceLen += Math.hypot(x - b.pts[(i-1)*2], z - b.pts[(i-1)*2+1]);
        const a = barAcc.vert(x, 0.1, z, st.col);
        const c2 = barAcc.vert(x, st.h, z, st.col);
        if (pa >= 0) barAcc.idx.push(pa, pb, c2, pa, c2, a);
        pa = a; pb = c2;
      }
      if (st.w > 0.1) ribbon(barAcc, b.pts, st.w, st.h, st.col);
    }
    const barMesh = new THREE.Mesh(barAcc.geometry(), fMat);
    barMesh.matrixAutoUpdate = false;
    scene.add(barMesh);
    refs.stats.fenceKm = Math.round(fenceLen / 100) / 10;
  }

  // ---------------------------------------------------------------- areas --
  const areaAcc = new Acc(false);
  const A = data.areas;
  for (let start = 0; start < A.length; start += 2600) {
    const endI = Math.min(A.length, start + 2600);
    for (let i = start; i < endI; i++) {
      const a = A[i];
      const st = AREA_STYLE[a.ty];
      if (!st) continue;
      let [col, y] = st;
      if (a.ty === 4) {
        const rr = mulberry32(i * 977 + 3)();
        if (rr < 0.3) col = hex('#b3794e');
      }
      for (const { outer, inners } of a.outers) {
        fillPoly(areaAcc, outer, inners, y, col);
        if (a.ty === 1 || a.ty === 2) refs.parks.push({ outer, inners, dense: a.ty === 2 });
        if (a.ty === 3) refs.beaches = (refs.beaches || []).concat([{ outer, inners }]);
      }
    }
    onProgress(0.6 + 0.06 * (endI / A.length), 'משתיל פארקים, חופים ומגרשים…');
    await nextFrame();
  }
  const areaMesh = new THREE.Mesh(areaAcc.geometry(), fMat);
  areaMesh.matrixAutoUpdate = false;
  scene.add(areaMesh);

  // ------------------------------------------------------- ground and sea --
  const gAcc = new Acc(false);
  const gb = data.meta.bbox.map((v) => v * 0.1);
  const GM = ultra ? 450 : 2500;
  const GX0 = gb[0] - GM, GZ0 = gb[1] - GM, GX1 = gb[2] + GM, GZ1 = gb[3] + GM;
  const gcol = hex('#b3aa9c');
  {
    const a = gAcc.vert(GX0, -1.2, GZ0, gcol), b2 = gAcc.vert(GX1, -1.2, GZ0, gcol);
    const c2 = gAcc.vert(GX1, -1.2, GZ1, gcol), d2 = gAcc.vert(GX0, -1.2, GZ1, gcol);
    gAcc.idx.push(a, b2, c2, a, c2, d2);
  }
  const groundMesh = new THREE.Mesh(gAcc.geometry(), fMat);
  groundMesh.matrixAutoUpdate = false;
  scene.add(groundMesh);

  if (data.sea) {
    const sAcc = new Acc(false);
    fillPoly(sAcc, data.sea, [], -0.2, [255, 255, 255]);
    // far backdrop water beyond the detailed coast polygon
    const W = [255, 255, 255];
    const E2 = 4100, FAR = 34000;
    const quad = (x0, z0, x1, z1) => {
      const a = sAcc.vert(x0, -0.42, z0, W), b2 = sAcc.vert(x1, -0.42, z0, W);
      const c2 = sAcc.vert(x1, -0.42, z1, W), d2 = sAcc.vert(x0, -0.42, z1, W);
      sAcc.idx.push(a, b2, c2, a, c2, d2);
    };
    quad(gb[0] - FAR, gb[1] - FAR, gb[0] - E2 + 100, gb[3] + FAR); // west
    const sg = sAcc.geometry();
    const seaMesh = new THREE.Mesh(sg, seaMaterial(env));
    seaMesh.matrixAutoUpdate = false;
    scene.add(seaMesh);

    const inb = (x, z) => x > gb[0] - 1500 && x < gb[2] + 1500 && z > gb[1] - 1500 && z < gb[3] + 1500;
    const runs = [];
    let cur = [];
    for (let i = 0; i < data.sea.length; i += 2) {
      const x = data.sea[i], z = data.sea[i + 1];
      if (inb(x, z)) cur.push(x, z);
      else if (cur.length) { runs.push(cur); cur = []; }
    }
    if (cur.length) runs.push(cur);
    runs.sort((p, q) => q.length - p.length);
    if (runs.length) {
      refs.coastLine = new Float32Array(runs[0]);
      const foamAcc = new Acc(false);
      foamRibbon(foamAcc, refs.coastLine, data.sea, 15, -0.08);
      const fg = foamAcc.geometry();
      fg.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(foamAcc.uvArr), 2));
      const foamMesh = new THREE.Mesh(fg, foamMaterial(env));
      foamMesh.matrixAutoUpdate = false;
      scene.add(foamMesh);
    }
  }

  onProgress(0.68, 'שופך את הים התיכון…');
  await nextFrame();
  refs.flatMat = fMat;
  refs.buildingsMat = bMat;
  return refs;
}

export function nearestRoad(refs, x, z) {
  let best = null, bd = 1e9;
  const gx = (x / 60) | 0, gz = (z / 60) | 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      const l = refs.roadGrid.get((gx + dx) + ':' + (gz + dz));
      if (!l) continue;
      for (const rec of l) {
        const k = rec.seg;
        const x0 = rec.pts[k * 2], z0 = rec.pts[k * 2 + 1];
        const x1 = rec.pts[k * 2 + 2], z1 = rec.pts[k * 2 + 3];
        const dx1 = x1 - x0, dz1 = z1 - z0;
        const L2 = dx1 * dx1 + dz1 * dz1 || 1;
        let t = ((x - x0) * dx1 + (z - z0) * dz1) / L2;
        t = Math.max(0, Math.min(1, t));
        const px = x0 + dx1 * t, pz = z0 + dz1 * t;
        const d = Math.hypot(x - px, z - pz);
        if (d < bd) { bd = d; best = { px, pz, dir: Math.atan2(-(dz1), dx1), w: rec.w, y: rec.y, cls: rec.cls, d }; }
      }
    }
  }
  return best;
}

function boundsOf(ring) {
  let x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9;
  for (let i = 0; i < ring.length; i += 2) {
    const x = ring[i], z = ring[i + 1];
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (z < z0) z0 = z; if (z > z1) z1 = z;
  }
  return [x0, z0, x1, z1];
}

function fillPoly(acc, outer, inners, y, col) {
  const flat = [];
  const holeIdx = [];
  for (let k = 0; k < outer.length; k += 2) flat.push(outer[k], outer[k + 1]);
  for (const inn of inners) {
    holeIdx.push(flat.length / 2);
    for (let k = 0; k < inn.length; k += 2) flat.push(inn[k], inn[k + 1]);
  }
  const tris = earcut(flat, holeIdx.length ? holeIdx : null, 2);
  const base = acc.n;
  for (let k = 0; k < flat.length; k += 2) acc.vert(flat[k], y, flat[k + 1], col);
  for (let k = 0; k < tris.length; k++) acc.idx.push(base + tris[k]);
}

function miterAt(pts, i, n) {
  const x = pts[i * 2], z = pts[i * 2 + 1];
  let dx0 = 0, dz0 = 0, dx1 = 0, dz1 = 0;
  if (i > 0) { dx0 = x - pts[(i - 1) * 2]; dz0 = z - pts[(i - 1) * 2 + 1]; const l = Math.hypot(dx0, dz0) || 1; dx0 /= l; dz0 /= l; }
  if (i < n - 1) { dx1 = pts[(i + 1) * 2] - x; dz1 = pts[(i + 1) * 2 + 1] - z; const l = Math.hypot(dx1, dz1) || 1; dx1 /= l; dz1 /= l; }
  let tx = dx0 + dx1, tz = dz0 + dz1;
  const tl = Math.hypot(tx, tz) || 1;
  tx /= tl; tz /= tl;
  const cosHalf = Math.sqrt(Math.max(0.2, (1 + Math.max(-0.99, dx0 * dx1 + dz0 * dz1)) / 2)) || 1;
  const scale = Math.min(2.2, 1 / Math.max(0.45, cosHalf));
  return [-tz * scale, tx * scale];
}

// Road ribbon with uv (u = length, v = lateral -1..1) and class flag.
function ribbonUV(acc, pts, w, y, col, cls) {
  const n = pts.length / 2;
  if (n < 2) return 0;
  const hw = w / 2;
  let len = 0, d = 0;
  let prevL = -1, prevR = -1;
  for (let i = 0; i < n; i++) {
    const x = pts[i * 2], z = pts[i * 2 + 1];
    if (i > 0) d += Math.hypot(x - pts[(i - 1) * 2], z - pts[(i - 1) * 2 + 1]);
    const [ox, oz] = miterAt(pts, i, n);
    const l = acc.vert(x - ox * hw, y, z - oz * hw, col, d, -1, 0, cls);
    const r = acc.vert(x + ox * hw, y, z + oz * hw, col, d, 1, 0, cls);
    if (prevL >= 0) acc.idx.push(prevL, prevR, r, prevL, r, l);
    prevL = l; prevR = r;
  }
  len = d;
  return len;
}

// Plain ribbon, optionally offset sideways (for sidewalks).
function ribbon(acc, pts, w, y, col, offset = 0) {
  const n = pts.length / 2;
  if (n < 2) return 0;
  const hw = w / 2;
  let prevL = -1, prevR = -1;
  for (let i = 0; i < n; i++) {
    const x = pts[i * 2], z = pts[i * 2 + 1];
    const [ox, oz] = miterAt(pts, i, n);
    const cxp = x + ox * offset, czp = z + oz * offset;
    const l = acc.vert(cxp - ox * hw, y, czp - oz * hw, col);
    const r = acc.vert(cxp + ox * hw, y, czp + oz * hw, col);
    if (prevL >= 0) acc.idx.push(prevL, prevR, r, prevL, r, l);
    prevL = l; prevR = r;
  }
  return 0;
}

function skirts(acc, pts, w, y, depth, col) {
  const n = pts.length / 2;
  const hw = w / 2;
  for (const side of [-1, 1]) {
    let pa = -1, pb = -1;
    for (let i = 0; i < n; i++) {
      const x = pts[i * 2], z = pts[i * 2 + 1];
      const [ox, oz] = miterAt(pts, i, n);
      const a = acc.vert(x + ox * hw * side, y, z + oz * hw * side, col);
      const b = acc.vert(x + ox * hw * side, y - depth, z + oz * hw * side, col);
      if (pa >= 0) acc.idx.push(pa, pb, b, pa, b, a);
      pa = a; pb = b;
    }
  }
}

function foamRibbon(acc, line, seaRing, w, y) {
  const n = line.length / 2;
  acc.uvArr = [];
  let pa = -1, pb = -1, d = 0;
  let sign = null;
  for (let i = 0; i < n; i++) {
    const x = line[i * 2], z = line[i * 2 + 1];
    let dx = 0, dz = 0;
    if (i > 0) { dx += x - line[(i - 1) * 2]; dz += z - line[(i - 1) * 2 + 1]; d += Math.hypot(x - line[(i - 1) * 2], z - line[(i - 1) * 2 + 1]); }
    if (i < n - 1) { dx += line[(i + 1) * 2] - x; dz += line[(i + 1) * 2 + 1] - z; }
    const l = Math.hypot(dx, dz) || 1;
    let nx = -dz / l, nz = dx / l;
    if (sign === null) {
      if (!pointInRing(seaRing, x + nx * 20, z + nz * 20)) { nx = -nx; nz = -nz; }
      sign = [nx, nz];
    } else {
      if (nx * sign[0] + nz * sign[1] < 0) { nx = -nx; nz = -nz; }
      sign = [nx, nz];
    }
    const a = acc.vert(x, y, z, [255, 255, 255]);
    const b = acc.vert(x + nx * w, y, z + nz * w, [255, 255, 255]);
    acc.uvArr.push(d, 0, d, 1);
    if (pa >= 0) acc.idx.push(pa, pb, b, pa, b, a);
    pa = a; pb = b;
  }
}

function makePath(pts, y, oneway, cls, len) {
  const n = pts.length / 2;
  const cum = new Float32Array(n);
  for (let i = 1; i < n; i++) {
    cum[i] = cum[i - 1] + Math.hypot(pts[i * 2] - pts[(i - 1) * 2], pts[i * 2 + 1] - pts[(i - 1) * 2 + 1]);
  }
  return { pts, cum, len, y, oneway, cls };
}
