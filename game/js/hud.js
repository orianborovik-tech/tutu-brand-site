// Telemetry HUD, objective compass, radar, toasts and the start/end screens.
import * as THREE from 'three';
import { WORLD_SIZE, HALF, heightAt, normalAt, COMPOUND, SAMPLE_SITES } from './terrain-math.js';
import { vertexColor } from './terrain.js';

const $ = (id) => document.getElementById(id);

function fmtTime(s) {
  const m = Math.floor(s / 60), r = s - m * 60;
  return `${String(m).padStart(2, '0')}:${r.toFixed(1).padStart(4, '0')}`;
}

function buildMapImage(size = 384) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  const col = new THREE.Color();
  const sun = [0.5, 0.7, -0.5];
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const x = (px / (size - 1)) * WORLD_SIZE - HALF;
      const z = (py / (size - 1)) * WORLD_SIZE - HALF;
      const y = heightAt(x, z);
      const n = normalAt(x, z, 1.5);
      const slope = 1 - n[1];
      vertexColor(x, z, y, slope, col);
      col.convertLinearToSRGB();
      const light = 0.55 + 0.6 * Math.max(0, n[0] * sun[0] + n[1] * sun[1] + n[2] * sun[2]);
      const i = (py * size + px) * 4;
      img.data[i] = Math.min(255, col.r * 255 * light);
      img.data[i + 1] = Math.min(255, col.g * 255 * light);
      img.data[i + 2] = Math.min(255, col.b * 255 * light);
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

export function createHud() {
  const el = {
    hud: $('hud'), samples: $('samples'), total: $('samplesTotal'), timer: $('timer'),
    objArrow: $('objArrow'), objName: $('objName'), objDist: $('objDist'),
    speed: $('speed'), throttleFill: $('throttleFill'), gear: $('gear'), grip: $('grip'), clock: $('clock'),
    radar: $('radar'), toast: $('toast'), start: $('start'), end: $('end'), loading: $('loading'),
    startBtn: $('startBtn'), startTitle: $('startTitle'), endStats: $('endStats'), phaseLbl: $('phaseLbl'),
    muteBtn: $('muteBtn'), camBtn: $('camBtn'),
  };
  el.total.textContent = String(SAMPLE_SITES.length);
  const rg = el.radar.getContext('2d');
  const RS = el.radar.width;
  let mapImg = null;
  let toastTimer = 0;
  let last = { samples: -1, timer: '', speed: -1, obj: '', dist: '', gear: '', grip: '', clock: '' };

  function prepare() { mapImg = buildMapImage(320); }

  function setLoading(text) { if (el.loading) el.loading.textContent = text; }
  function showStart(mode = 'start') {
    el.start.hidden = false;
    el.startBtn.textContent = mode === 'resume' ? 'Resume expedition' : 'Start expedition';
    el.startTitle.textContent = mode === 'resume' ? 'Expedition paused' : 'Survey Unit 07';
    el.loading.hidden = true;
  }
  function hideStart() { el.start.hidden = true; }
  function showEnd(stats) {
    el.end.hidden = false;
    el.endStats.innerHTML = '';
    for (const [k, v] of stats) {
      const row = document.createElement('div');
      row.className = 'stat';
      row.innerHTML = `<span class="stat-k">${k}</span><span class="stat-v">${v}</span>`;
      el.endStats.appendChild(row);
    }
  }
  function hideEnd() { el.end.hidden = true; }
  function show() { el.hud.hidden = false; }
  function hide() { el.hud.hidden = true; }

  function toast(text, kind = '') {
    el.toast.textContent = text;
    el.toast.className = `toast is-on ${kind}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.toast.className = 'toast'; }, 3200);
  }

  function drawRadar(pos, heading, objective, mission) {
    if (!mapImg) return;
    const range = 120; // metres shown from centre to edge
    const scale = (RS / 2) / range; // px per metre
    const mapScale = mapImg.width / WORLD_SIZE; // map px per metre
    rg.save();
    rg.clearRect(0, 0, RS, RS);
    rg.beginPath(); rg.arc(RS / 2, RS / 2, RS / 2 - 2, 0, Math.PI * 2); rg.clip();
    rg.fillStyle = '#070a08'; rg.fillRect(0, 0, RS, RS);
    rg.translate(RS / 2, RS / 2);
    rg.rotate(-heading);
    rg.scale(scale / mapScale, scale / mapScale);
    rg.translate(-(pos.x + HALF) * mapScale, -(pos.z + HALF) * mapScale);
    rg.imageSmoothingEnabled = true;
    rg.globalAlpha = 0.9;
    rg.drawImage(mapImg, 0, 0);
    rg.globalAlpha = 1;
    rg.restore();
    // blips
    const blip = (x, z, color, r, ring) => {
      const dx = x - pos.x, dz = z - pos.z;
      const c = Math.cos(-heading), s = Math.sin(-heading);
      let bx = dx * c - dz * s, bz = dx * s + dz * c;
      const d = Math.hypot(bx, bz);
      const maxD = range * 0.94;
      let clamped = false;
      if (d > maxD) { bx *= maxD / d; bz *= maxD / d; clamped = true; }
      const px = RS / 2 + bx * scale, py = RS / 2 + bz * scale;
      rg.beginPath(); rg.arc(px, py, clamped ? r * 0.7 : r, 0, Math.PI * 2);
      rg.fillStyle = color; rg.fill();
      if (ring) { rg.beginPath(); rg.arc(px, py, r + 4, 0, Math.PI * 2); rg.strokeStyle = color; rg.lineWidth = 1.5; rg.stroke(); }
    };
    for (const s of mission.sites) if (!s.collected) blip(s.x, s.z, '#e8b643', 4, objective && objective.name === s.name);
    blip(COMPOUND.x, COMPOUND.z, mission.phase === 'return' ? '#5cf58a' : '#8f948c', 6, mission.phase === 'return');
    // rover
    rg.save(); rg.translate(RS / 2, RS / 2);
    rg.beginPath(); rg.moveTo(0, -9); rg.lineTo(6, 7); rg.lineTo(0, 4); rg.lineTo(-6, 7); rg.closePath();
    rg.fillStyle = '#f2f0e6'; rg.fill();
    rg.restore();
    // bezel
    rg.beginPath(); rg.arc(RS / 2, RS / 2, RS / 2 - 2, 0, Math.PI * 2);
    rg.strokeStyle = 'rgba(217,207,176,0.35)'; rg.lineWidth = 2; rg.stroke();
    // north tick
    const nx = RS / 2 + Math.sin(-heading) * (RS / 2 - 10), ny = RS / 2 - Math.cos(-heading) * (RS / 2 - 10);
    rg.fillStyle = '#5cf58a'; rg.beginPath(); rg.arc(nx, ny, 3, 0, Math.PI * 2); rg.fill();
  }

  function update({ mission, objective, telemetry, pos, heading, phase, cameraMode, muted }) {
    if (mission.collected !== last.samples) { el.samples.textContent = String(mission.collected); last.samples = mission.collected; }
    const t = fmtTime(mission.time);
    if (t !== last.timer) { el.timer.textContent = t; last.timer = t; }
    const kmh = Math.round(telemetry.speed * 3.6);
    if (kmh !== last.speed) { el.speed.textContent = String(kmh); last.speed = kmh; }
    el.throttleFill.style.transform = `scaleX(${Math.abs(telemetry.throttle).toFixed(2)})`;
    el.throttleFill.style.background = telemetry.brake ? '#ff6a1f' : telemetry.throttle < 0 ? '#d9cfb0' : '#5cf58a';
    const gear = telemetry.brake ? 'BRK' : telemetry.speedSigned < -0.5 ? 'REV' : telemetry.airborne ? 'AIR' : 'DRV';
    if (gear !== last.gear) { el.gear.textContent = gear; last.gear = gear; }
    const grip = `GRIP ${Math.round((1 - telemetry.slip) * 100)}%`;
    if (grip !== last.grip) { el.grip.textContent = grip; last.grip = grip; }
    const hours = (6 + phase * 24) % 24;
    const clock = `${String(Math.floor(hours)).padStart(2, '0')}:${String(Math.floor((hours % 1) * 60)).padStart(2, '0')}`;
    if (clock !== last.clock) { el.clock.textContent = clock; last.clock = clock; }
    if (objective) {
      const rel = objective.bearing - heading;
      el.objArrow.style.transform = `rotate(${(rel * 180 / Math.PI).toFixed(1)}deg)`;
      if (objective.name !== last.obj) { el.objName.textContent = objective.name; last.obj = objective.name; }
      const dist = objective.distance >= 1000 ? `${(objective.distance / 1000).toFixed(2)} km` : `${Math.round(objective.distance)} m`;
      if (dist !== last.dist) { el.objDist.textContent = dist; last.dist = dist; }
    } else if (last.obj !== 'done') {
      el.objName.textContent = 'Expedition complete'; el.objDist.textContent = ''; last.obj = 'done';
      el.objArrow.style.transform = 'rotate(0deg)';
    }
    if (el.phaseLbl) el.phaseLbl.textContent = mission.phase === 'return' ? 'RETURN TO THE COMPOUND' : mission.phase === 'complete' ? 'MISSION COMPLETE' : 'RECOVER SAMPLES';
    const narrow = window.innerWidth < 640;
    if (el.muteBtn) el.muteBtn.textContent = narrow ? (muted ? 'MUTED' : 'SOUND') : (muted ? 'SOUND OFF' : 'SOUND ON');
    if (el.camBtn) el.camBtn.textContent = narrow ? 'CAM' : `CAM · ${cameraMode.toUpperCase()}`;
    drawRadar(pos, heading, objective, mission);
  }

  return { prepare, setLoading, showStart, hideStart, showEnd, hideEnd, show, hide, toast, update, el };
}
