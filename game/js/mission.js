// Pure mission state machine. No DOM, no three.js.
export const PICKUP_RADIUS = 5;

export function createMission(sites, compound) {
  return {
    phase: 'collect', // 'collect' | 'return' | 'complete'
    sites: sites.map((s) => ({ ...s, collected: false })),
    compound,
    collected: 0,
    time: 0,
    distance: 0,
    topSpeed: 0,
  };
}

export function updateMission(m, pos, dt) {
  const events = [];
  if (m.phase === 'complete') return events;
  m.time += dt;
  if (m.phase === 'collect') {
    for (const s of m.sites) {
      if (s.collected) continue;
      const d = Math.hypot(pos.x - s.x, pos.z - s.z);
      if (d <= PICKUP_RADIUS) {
        s.collected = true;
        m.collected++;
        events.push({ type: 'pickup', site: s, index: m.collected, total: m.sites.length });
      }
    }
    if (m.collected === m.sites.length) {
      m.phase = 'return';
      events.push({ type: 'all-collected' });
    }
  } else if (m.phase === 'return') {
    const d = Math.hypot(pos.x - m.compound.x, pos.z - m.compound.z);
    if (d <= m.compound.radius) {
      m.phase = 'complete';
      events.push({ type: 'complete', time: m.time });
    }
  }
  return events;
}

// Nearest outstanding objective from `pos` (or the first one when no position is given).
export function currentObjective(m, pos = { x: 0, z: 0 }) {
  let target = null;
  if (m.phase === 'collect') {
    let best = Infinity;
    for (const s of m.sites) {
      if (s.collected) continue;
      const d = Math.hypot(pos.x - s.x, pos.z - s.z);
      if (d < best) { best = d; target = s; }
    }
  } else if (m.phase === 'return') {
    target = m.compound;
  }
  if (!target) return null;
  const dx = target.x - pos.x, dz = target.z - pos.z;
  return {
    name: target.name,
    x: target.x, z: target.z, y: target.y,
    distance: Math.hypot(dx, dz),
    bearing: Math.atan2(dx, -dz), // 0 = north (-z), clockwise positive
  };
}
