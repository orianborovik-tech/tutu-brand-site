// Single source of truth for the Tutu planet surface. Pure functions, no three.js.
// Used by: terrain mesh, cannon-es heightfield, radar, object placement, tests.
import { createNoise } from './noise.js';

export const WORLD_SIZE = 480;          // metres, square
export const GRID_N = 241;              // heightfield samples per side (2 m spacing)
export const ELEMENT_SIZE = WORLD_SIZE / (GRID_N - 1);
export const HALF = WORLD_SIZE / 2;

const N = createNoise(20260912);

// Brand environments laid out across the map (x, z in metres).
export const REGIONS = {
  crater: { x: -120, z: -60, radius: 62, maskRadius: 86, name: 'The Nested Crater' },
  hex:    { x: 118,  z: -62, radius: 58, name: 'Hexfield' },
  lava:   { x: 140,  z: 96,  radius: 46, name: 'Fracture Ground' },
  spires: { x: -150, z: 118, radius: 52, name: 'The Spire City' },
  smoke:  { x: -34,  z: -178, radius: 42, name: 'The Smoke Array' },
  flat:   { x: 34,   z: 22,  radius: 44, name: 'The Cosmic Seam' },
  canyon: { x: -196, z: -190, radius: 46, name: 'The Gilded Canyon' },
};

export const HEX_SIZE = 8;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export function smoothstep(e0, e1, x) {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function radialMask(x, z, r, feather = 22) {
  const d = Math.hypot(x - r.x, z - r.z);
  const R = r.maskRadius ?? r.radius;
  return 1 - smoothstep(R - feather, R, d);
}

// Pointy-top hexagonal grid. Returns distance to the nearest edge (0 on an edge) and a cell id.
export function hexCell(x, z, size = HEX_SIZE) {
  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * z) / size;
  const r = ((2 / 3) * z) / size;
  // cube rounding
  let rx = Math.round(q), rz = Math.round(r), ry = Math.round(-q - r);
  const dx = Math.abs(rx - q), dz = Math.abs(rz - r), dy = Math.abs(ry - (-q - r));
  if (dx > dz && dx > dy) rx = -ry - rz;
  else if (dz > dy) rz = -rx - ry;
  const cx = size * Math.sqrt(3) * (rx + rz / 2);
  const cz = size * 1.5 * rz;
  // Distance to the nearest edge of a pointy-top hexagon with circumradius `size`.
  // In the first quadrant the boundary is a vertical edge (normal (1,0)) and a
  // slanted edge (normal (0.5, 0.866)), both at the apothem distance from the centre.
  const ax = Math.abs(x - cx), az = Math.abs(z - cz);
  const apothem = size * 0.8660254;
  const edge = Math.max(0, Math.min(apothem - ax, apothem - (0.5 * ax + 0.8660254 * az)));
  return { edge, id: [rx, rz], cx, cz };
}

export function regionMasks(x, z) {
  const m = {
    crater: radialMask(x, z, REGIONS.crater, 26),
    hex: radialMask(x, z, REGIONS.hex, 24),
    lava: radialMask(x, z, REGIONS.lava, 22),
    spires: radialMask(x, z, REGIONS.spires, 24),
    smoke: radialMask(x, z, REGIONS.smoke, 20),
    flat: radialMask(x, z, REGIONS.flat, 18),
    canyon: radialMask(x, z, REGIONS.canyon, 22),
  };
  // regions never overlap by layout, but normalise defensively
  let s = 0;
  for (const k in m) s += m[k];
  if (s > 1) for (const k in m) m[k] /= s;
  return m;
}

function baseHeight(x, z) {
  const broad = N.fbm(x * 0.0045, z * 0.0045, 4) * 11;       // rolling plains
  const dunes = N.ridged(x * 0.011 + 3.1, z * 0.009 - 1.7, 3) * 6 - 3; // dune crests
  const detail = N.fbm(x * 0.05, z * 0.05, 3) * 0.9;          // rubble roughness
  return broad + dunes * 0.7 + detail;
}

function craterShape(x, z) {
  const c = REGIONS.crater;
  const d = Math.hypot(x - c.x, z - c.z);
  const R = c.radius;
  // outer bowl
  let h = 0;
  if (d < R) {
    const t = d / R;
    h -= 13 * (1 - t * t);
    // concentric terraces
    h += Math.sin(t * Math.PI * 5) * 0.8 * (1 - t);
  }
  // outer rim
  h += 4.5 * Math.exp(-((d - R) * (d - R)) / (2 * 7 * 7));
  // inner crater (the glowing core)
  const R2 = 20;
  if (d < R2) {
    const t = d / R2;
    h -= 7 * (1 - t * t);
  }
  h += 1.8 * Math.exp(-((d - R2) * (d - R2)) / (2 * 3 * 3));
  return h;
}

export function heightAt(x, z) {
  let h = baseHeight(x, z);
  const m = regionMasks(x, z);

  // Nested Crater: blend the analytic crater into the plain
  if (m.crater > 0) {
    const plain = baseHeight(REGIONS.crater.x, REGIONS.crater.z) - 1;
    const cr = plain + craterShape(x, z);
    h = h + (cr - h) * m.crater;
  }
  // Hexfield: level tectonic tiles with tiny per-tile offsets
  if (m.hex > 0) {
    const cell = hexCell(x, z);
    const tileLift = N.hash2(cell.id[0] * 7 + 11, cell.id[1] * 13 + 5) * 0.32;
    const lip = smoothstep(0, 0.9, cell.edge) * tileLift;
    const level = baseHeight(REGIONS.hex.x, REGIONS.hex.z) + lip;
    h = h + (level - h) * m.hex;
  }
  // Fracture Ground: broken slabs, glowing cracks are shaded in the material
  if (m.lava > 0) {
    const level = baseHeight(REGIONS.lava.x, REGIONS.lava.z) + 1.5 + N.fbm(x * 0.03, z * 0.03, 2) * 1.2;
    h = h + (level - h) * m.lava;
  }
  // Spire City: raised plateau
  if (m.spires > 0) {
    const level = baseHeight(REGIONS.spires.x, REGIONS.spires.z) + 5 + N.fbm(x * 0.02, z * 0.02, 3) * 1.5;
    h = h + (level - h) * m.spires;
  }
  // Smoke Array: bone-flat cracked plain
  if (m.smoke > 0) {
    const level = baseHeight(REGIONS.smoke.x, REGIONS.smoke.z) - 1 + N.fbm(x * 0.09, z * 0.09, 2) * 0.15;
    h = h + (level - h) * m.smoke;
  }
  // Cosmic Seam: mirror-flat salt flat
  if (m.flat > 0) {
    const level = baseHeight(REGIONS.flat.x, REGIONS.flat.z) - 1.5;
    h = h + (level - h) * m.flat;
  }
  // Gilded Canyon: a deep trench across the region
  if (m.canyon > 0) {
    const c = REGIONS.canyon;
    const ux = 0.62, uz = -0.78; // trench direction
    const px = x - c.x, pz = z - c.z;
    const along = px * ux + pz * uz;
    const across = Math.abs(-px * uz + pz * ux) + N.fbm(along * 0.04, 2.5, 2) * 4;
    const trench = -12 * (1 - smoothstep(6, 18, across));
    const walls = 6 * smoothstep(6, 18, across) * (1 - smoothstep(20, 34, across));
    const level = baseHeight(c.x, c.z) + 6 + trench + walls;
    h = h + (level - h) * m.canyon;
  }
  // Boundary wall: keeps the rover in the world
  const edge = Math.max(Math.abs(x), Math.abs(z));
  h += smoothstep(200, 240, edge) * 45 + N.fbm(x * 0.03, z * 0.03, 2) * smoothstep(196, 226, edge) * 6;
  return h;
}

export function normalAt(x, z, eps = 0.5) {
  const hl = heightAt(x - eps, z), hr = heightAt(x + eps, z);
  const hd = heightAt(x, z - eps), hu = heightAt(x, z + eps);
  const nx = hl - hr, nz = hd - hu, ny = 2 * eps;
  const len = Math.hypot(nx, ny, nz);
  return [nx / len, ny / len, nz / len];
}

// cannon-es Heightfield layout: matrix[i][j] is the height at local (i*es, j*es).
// The body is rotated -90° about X and placed at (-HALF, 0, +HALF), so
// world x = -HALF + i*es and world z = HALF - j*es.
export function buildHeightMatrix() {
  const m = new Array(GRID_N);
  for (let i = 0; i < GRID_N; i++) {
    const row = new Array(GRID_N);
    const x = -HALF + i * ELEMENT_SIZE;
    for (let j = 0; j < GRID_N; j++) {
      row[j] = heightAt(x, HALF - j * ELEMENT_SIZE);
    }
    m[i] = row;
  }
  return m;
}

export function sampleHeightBilinear(matrix, x, z) {
  const fi = (x + HALF) / ELEMENT_SIZE;
  const fj = (HALF - z) / ELEMENT_SIZE;
  const i0 = Math.max(0, Math.min(GRID_N - 2, Math.floor(fi)));
  const j0 = Math.max(0, Math.min(GRID_N - 2, Math.floor(fj)));
  const tx = Math.max(0, Math.min(1, fi - i0));
  const tz = Math.max(0, Math.min(1, fj - j0));
  const h00 = matrix[i0][j0], h10 = matrix[i0 + 1][j0];
  const h01 = matrix[i0][j0 + 1], h11 = matrix[i0 + 1][j0 + 1];
  return (h00 * (1 - tx) + h10 * tx) * (1 - tz) + (h01 * (1 - tx) + h11 * tx) * tz;
}

function site(x, z, name, region) {
  return { x, z, y: heightAt(x, z), name, region };
}

export const COMPOUND = { x: 0, z: 178, y: heightAt(0, 178), radius: 30, name: 'The Compound' };
export const SPAWN = { x: 0, z: 118, y: heightAt(0, 118) };

export const SAMPLE_SITES = [
  site(-120, -60, 'Crater core', 'crater'),
  site(118, -62, 'Hexfield seam', 'hex'),
  site(150, 88, 'Fracture slab', 'lava'),
  site(-140, 112, 'Spire plateau', 'spires'),
  site(-34, -178, 'Smoke plain', 'smoke'),
  site(40, 18, 'Salt mirror', 'flat'),
  site(-190, -184, 'Canyon floor', 'canyon'),
  site(196, -178, 'Dune ridge', 'dunes'),
];
