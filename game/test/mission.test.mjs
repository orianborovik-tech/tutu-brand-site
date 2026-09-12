import test from 'node:test';
import assert from 'node:assert/strict';
import { createMission, updateMission, currentObjective, PICKUP_RADIUS } from '../js/mission.js';

const sites = [
  { x: 0, z: 10, y: 0, name: 'A' },
  { x: 50, z: 0, y: 0, name: 'B' },
];
const compound = { x: 0, z: -100, y: 0, radius: 20, name: 'The Compound' };

test('collecting samples by proximity, once each, then return, then complete', () => {
  const m = createMission(sites, compound);
  assert.equal(m.phase, 'collect');
  assert.equal(updateMission(m, { x: 0, y: 0, z: 30 }, 0.1).length, 0);
  const ev = updateMission(m, { x: 0.5, y: 0, z: 10 + PICKUP_RADIUS - 0.5 }, 0.1);
  assert.deepEqual(ev.map(e => e.type), ['pickup']);
  assert.equal(ev[0].site.name, 'A');
  assert.equal(m.collected, 1);
  assert.equal(updateMission(m, { x: 0, y: 0, z: 10 }, 0.1).length, 0, 'no double pickup');
  const ev2 = updateMission(m, { x: 50, y: 0, z: 0 }, 0.1);
  assert.deepEqual(ev2.map(e => e.type), ['pickup', 'all-collected']);
  assert.equal(m.phase, 'return');
  assert.equal(currentObjective(m).name, 'The Compound');
  const ev3 = updateMission(m, { x: 5, y: 0, z: -95 }, 0.1);
  assert.deepEqual(ev3.map(e => e.type), ['complete']);
  assert.equal(m.phase, 'complete');
  assert.equal(updateMission(m, { x: 5, y: 0, z: -95 }, 0.1).length, 0);
});

test('timer accumulates only while the mission runs', () => {
  const m = createMission(sites, compound);
  updateMission(m, { x: 0, y: 0, z: 30 }, 1.5);
  updateMission(m, { x: 0, y: 0, z: 30 }, 0.5);
  assert.equal(m.time, 2);
  updateMission(m, { x: 0, y: 0, z: 10 }, 1);
  updateMission(m, { x: 50, y: 0, z: 0 }, 1);
  updateMission(m, { x: 0, y: 0, z: -100 }, 1);
  assert.equal(m.phase, 'complete');
  const t = m.time;
  updateMission(m, { x: 0, y: 0, z: -100 }, 5);
  assert.equal(m.time, t);
});

test('current objective is the nearest uncollected site, with bearing and distance', () => {
  const m = createMission(sites, compound);
  const o = currentObjective(m, { x: 40, y: 0, z: 0 });
  assert.equal(o.name, 'B');
  assert.equal(o.distance, 10);
  const o2 = currentObjective(m, { x: 0, y: 0, z: 40 });
  assert.equal(o2.name, 'A');
  assert.equal(Math.round(o2.distance), 30);
});
