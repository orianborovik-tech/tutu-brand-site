import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WORLD_SIZE, GRID_N, ELEMENT_SIZE, REGIONS, heightAt, buildHeightMatrix,
  sampleHeightBilinear, hexCell, regionMasks, SAMPLE_SITES, COMPOUND, SPAWN,
} from '../js/terrain-math.js';

test('heightAt is deterministic, finite and bounded', () => {
  let min = Infinity, max = -Infinity;
  for (let x = -240; x <= 240; x += 7) {
    for (let z = -240; z <= 240; z += 7) {
      const h = heightAt(x, z);
      assert.ok(Number.isFinite(h), `non-finite at ${x},${z}`);
      assert.equal(h, heightAt(x, z));
      min = Math.min(min, h); max = Math.max(max, h);
    }
  }
  assert.ok(min > -60 && max < 120, `range ${min}..${max}`);
});

test('boundary wall rises toward the edge of the world', () => {
  assert.ok(heightAt(236, 0) > heightAt(120, 0) + 20);
  assert.ok(heightAt(0, -236) > heightAt(0, -120) + 20);
});

test('nested crater is a bowl with a raised rim and a deeper core', () => {
  const c = REGIONS.crater;
  const centre = heightAt(c.x, c.z);
  const rim = heightAt(c.x + c.radius, c.z);
  const outside = heightAt(c.x + c.radius + 30, c.z);
  const midBowl = heightAt(c.x + c.radius * 0.55, c.z);
  assert.ok(midBowl < outside - 6, 'bowl should be well below the plain');
  assert.ok(centre < midBowl - 3, 'core should be deeper than the bowl');
  assert.ok(rim > outside + 1.5, 'rim should rise above the plain');
});

test('hexfield and salt flat are nearly level', () => {
  for (const key of ['hex', 'flat', 'smoke']) {
    const r = REGIONS[key];
    const h0 = heightAt(r.x, r.z);
    for (let a = 0; a < Math.PI * 2; a += 0.7) {
      const h = heightAt(r.x + Math.cos(a) * r.radius * 0.5, r.z + Math.sin(a) * r.radius * 0.5);
      assert.ok(Math.abs(h - h0) < 1.2, `${key} not level: ${h0} vs ${h}`);
    }
  }
});

test('region masks are 1 at centres, 0 far away, and sum to at most 1', () => {
  for (const [key, r] of Object.entries(REGIONS)) {
    const m = regionMasks(r.x, r.z);
    assert.ok(m[key] > 0.99, `${key} mask at centre = ${m[key]}`);
  }
  const far = regionMasks(230, 230);
  const total = Object.values(far).reduce((a, b) => a + b, 0);
  assert.ok(total < 0.01);
  for (let x = -240; x <= 240; x += 11) for (let z = -240; z <= 240; z += 11) {
    const s = Object.values(regionMasks(x, z)).reduce((a, b) => a + b, 0);
    assert.ok(s <= 1.0001, `masks sum ${s} at ${x},${z}`);
  }
});

test('height matrix follows the cannon-es heightfield layout', () => {
  const m = buildHeightMatrix();
  assert.equal(m.length, GRID_N);
  assert.equal(m[0].length, GRID_N);
  assert.equal(ELEMENT_SIZE, WORLD_SIZE / (GRID_N - 1));
  const half = WORLD_SIZE / 2;
  for (const [i, j] of [[0, 0], [GRID_N - 1, GRID_N - 1], [17, 200], [120, 3]]) {
    const x = -half + i * ELEMENT_SIZE;
    const z = half - j * ELEMENT_SIZE;
    assert.equal(m[i][j], heightAt(x, z));
  }
});

test('bilinear sampling of the matrix matches the analytic height', () => {
  const m = buildHeightMatrix();
  for (let k = 0; k < 400; k++) {
    const x = (Math.sin(k * 12.9898) * 0.5 + 0.5) * 460 - 230;
    const z = (Math.sin(k * 78.233) * 0.5 + 0.5) * 460 - 230;
    const err = Math.abs(sampleHeightBilinear(m, x, z) - heightAt(x, z));
    assert.ok(err < 1.6, `err ${err} at ${x},${z}`);
  }
  assert.equal(sampleHeightBilinear(m, -240, 240), heightAt(-240, 240));
});

test('hex cells: centres are far from edges, edges are at distance ~0', () => {
  const size = 8;
  const c = hexCell(0, 0, size);
  assert.ok(c.edge > size * 0.8, `centre edge distance ${c.edge}`);
  // Move toward a neighbour: with pointy-top hexes the neighbour along +x is at (sqrt(3)*size, 0)
  const e = hexCell(Math.sqrt(3) * size * 0.5, 0, size);
  assert.ok(e.edge < 0.05, `edge distance ${e.edge}`);
  const n = hexCell(Math.sqrt(3) * size, 0, size);
  assert.notDeepEqual(n.id, c.id);
  assert.ok(n.edge > size * 0.8);
  // midpoint to the upper-right neighbour (sqrt(3)/2*size, 1.5*size) lies on a slanted edge
  const s = hexCell(Math.sqrt(3) * size * 0.25, size * 0.75, size);
  assert.ok(s.edge < 0.05, `slanted edge distance ${s.edge}`);
  // a point just inside the top vertex is close to the boundary
  const v = hexCell(0, size * 0.97, size);
  assert.ok(v.edge < 0.25, `vertex distance ${v.edge}`);
});

test('sample sites and landmarks sit on the terrain, inside the world', () => {
  assert.equal(SAMPLE_SITES.length, 8);
  for (const s of SAMPLE_SITES) {
    assert.ok(Math.abs(s.x) < 225 && Math.abs(s.z) < 225);
    assert.equal(s.y, heightAt(s.x, s.z));
    assert.ok(typeof s.name === 'string' && s.name.length > 0);
  }
  assert.equal(COMPOUND.y, heightAt(COMPOUND.x, COMPOUND.z));
  const d = Math.hypot(SPAWN.x - COMPOUND.x, SPAWN.z - COMPOUND.z);
  assert.ok(d > 35 && d < 120, `spawn distance to compound ${d}`);
});
