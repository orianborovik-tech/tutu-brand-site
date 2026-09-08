// Hebrew RTL HUD, landmark labels, click-to-identify, guided tour.
import * as THREE from 'three';
import { lonlatToLocal } from './decode.js';

export const LANDMARKS = [
  { nm: 'מרכז עזריאלי', lon: 34.7925, lat: 32.0748, dist: 950, pitch: 0.62, yaw: 0.7, h: 190 },
  { nm: 'מגדל עזריאלי שרונה', lon: 34.78585, lat: 32.07165, dist: 1000, pitch: 0.6, yaw: -0.5, h: 245 },
  { nm: 'מגדל שלום מאיר', lon: 34.7699, lat: 32.0637, dist: 700, pitch: 0.65, yaw: 0.4, h: 145 },
  { nm: 'כיכר דיזנגוף', lon: 34.7746, lat: 32.0779, dist: 450, pitch: 0.8, yaw: 0, h: 45 },
  { nm: 'כיכר רבין', lon: 34.7805, lat: 32.0805, dist: 500, pitch: 0.8, yaw: 0.3, h: 45 },
  { nm: 'הבימה', lon: 34.7793, lat: 32.0729, dist: 450, pitch: 0.78, yaw: -0.4, h: 40 },
  { nm: 'שדרות רוטשילד', lon: 34.7714, lat: 32.0645, dist: 600, pitch: 0.7, yaw: 0.9, h: 55 },
  { nm: 'שוק הכרמל', lon: 34.7683, lat: 32.0684, dist: 450, pitch: 0.75, yaw: 0.2, h: 35 },
  { nm: 'נווה צדק', lon: 34.7638, lat: 32.0603, dist: 500, pitch: 0.7, yaw: -0.3, h: 35 },
  { nm: 'שעון יפו', lon: 34.7522, lat: 32.0537, dist: 550, pitch: 0.68, yaw: -0.6, h: 40 },
  { nm: 'נמל יפו', lon: 34.7508, lat: 32.0528, dist: 700, pitch: 0.6, yaw: 1.2, h: 30 },
  { nm: 'מרינה תל אביב', lon: 34.7663, lat: 32.0868, dist: 800, pitch: 0.6, yaw: -1.0, h: 35 },
  { nm: 'נמל תל אביב', lon: 34.7723, lat: 32.0967, dist: 700, pitch: 0.65, yaw: -0.8, h: 30 },
  { nm: 'פארק הירקון', lon: 34.79, lat: 32.0975, dist: 1200, pitch: 0.7, yaw: 0.5, h: 45 },
  { nm: 'מגדלי הבורסה', lon: 34.8035, lat: 32.0832, dist: 1100, pitch: 0.6, yaw: -0.7, h: 240 },
  { nm: 'אוניברסיטת תל אביב', lon: 34.8036, lat: 32.113, dist: 1000, pitch: 0.7, yaw: 0.4, h: 60 },
];

export function localizeLandmarks(meta) {
  for (const l of LANDMARKS) {
    const [x, z] = lonlatToLocal(meta, l.lon, l.lat);
    l.x = x; l.z = z;
  }
}

export function makeLabels(scene) {
  const group = new THREE.Group();
  for (const l of LANDMARKS) {
    const cnv = document.createElement('canvas');
    const ctx = cnv.getContext('2d');
    ctx.font = '600 44px system-ui, "Segoe UI", Arial';
    const w = Math.ceil(ctx.measureText(l.nm).width) + 56;
    cnv.width = w; cnv.height = 84;
    const c2 = cnv.getContext('2d');
    c2.font = '600 44px system-ui, "Segoe UI", Arial';
    c2.fillStyle = 'rgba(12,16,26,0.78)';
    roundRect(c2, 0, 6, w, 66, 30);
    c2.fill();
    c2.strokeStyle = 'rgba(255,255,255,0.28)';
    c2.lineWidth = 2;
    roundRect(c2, 1, 7, w - 2, 64, 29);
    c2.stroke();
    c2.fillStyle = '#fff';
    c2.textAlign = 'center';
    c2.textBaseline = 'middle';
    c2.fillText(l.nm, w / 2, 40);
    // pointer notch
    c2.fillStyle = 'rgba(12,16,26,0.78)';
    c2.beginPath();
    c2.moveTo(w / 2 - 10, 70); c2.lineTo(w / 2 + 10, 70); c2.lineTo(w / 2, 84);
    c2.fill();
    const tex = new THREE.CanvasTexture(cnv);
    tex.anisotropy = 4;
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, sizeAttenuation: false });
    const spr = new THREE.Sprite(mat);
    const scale = 0.052; // constant on-screen size
    spr.scale.set((w / 84) * scale, scale, 1);
    spr.position.set(l.x, l.h + 60, l.z);
    spr.renderOrder = 20;
    group.add(spr);
  }
  scene.add(group);
  return group;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const TY_HE = ['מגורים', 'מגדל', 'תעשייה', 'בית תפילה', 'מלון', 'מבנה ציבור', 'מסחר ומשרדים'];

export function attachPicking(dom, camera, tileMeshes, buildingMeta, popup) {
  const ray = new THREE.Raycaster();
  window.__pickAll = (cx, cy) => {
    const r = dom.getBoundingClientRect();
    ray.setFromCamera({ x: ((cx - r.left) / r.width) * 2 - 1, y: -((cy - r.top) / r.height) * 2 + 1 }, camera);
    const hits = ray.intersectObjects(window.__dbg.scene.children, true);
    return hits.slice(0, 5).map((h) => ({
      d: h.distance | 0, type: h.object.type, y: h.point.y.toFixed(2),
      frag: h.object.material && h.object.material.fragmentShader ? h.object.material.fragmentShader.slice(400, 430) : '',
      wnoise: !!(h.object.material && h.object.material.fragmentShader && h.object.material.fragmentShader.includes('wnoise')),
    }));
  };
  window.__pick = (cx, cy) => {
    const r = dom.getBoundingClientRect();
    ray.setFromCamera({ x: ((cx - r.left) / r.width) * 2 - 1, y: -((cy - r.top) / r.height) * 2 + 1 }, camera);
    const hits = ray.intersectObjects(tileMeshes, false);
    if (!hits.length) return { hits: 0 };
    const h = hits[0];
    const idA = h.object.geometry.getAttribute('aId');
    return { hits: hits.length, d: h.distance | 0, id: idA ? idA.getX(h.face.a) : -1,
             meta: buildingMeta[idA.getX(h.face.a)] };
  };
  let downPos = null;
  dom.addEventListener('pointerdown', (e) => { downPos = [e.clientX, e.clientY]; });
  dom.addEventListener('pointerup', (e) => {
    if (!downPos || Math.hypot(e.clientX - downPos[0], e.clientY - downPos[1]) > 5) { popup.hide(); return; }
    const r = dom.getBoundingClientRect();
    ray.setFromCamera({
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -((e.clientY - r.top) / r.height) * 2 + 1,
    }, camera);
    const hits = ray.intersectObjects(tileMeshes, false);
    if (!hits.length) { popup.hide(); return; }
    const hit = hits[0];
    const idAttr = hit.object.geometry.getAttribute('aId');
    const meta = buildingMeta[idAttr.getX(hit.face.a)];
    if (!meta) { popup.hide(); return; }
    const name = meta.nm || TY_HE[meta.ty] || 'בניין';
    popup.show(e.clientX, e.clientY,
      `<b>${esc(name)}</b><br>` +
      `${TY_HE[meta.ty] || ''} · גובה ${Math.round(meta.h)} מ׳` +
      (meta.nm ? '' : ' (מנתוני OSM)'));
  });
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function runTour(controls, onDone) {
  const seq = ['שעון יפו', 'נווה צדק', 'מגדל שלום מאיר', 'שדרות רוטשילד', 'הבימה',
    'מגדל עזריאלי שרונה', 'מרכז עזריאלי', 'כיכר רבין', 'כיכר דיזנגוף',
    'מרינה תל אביב', 'נמל תל אביב', 'פארק הירקון'];
  for (const nm of seq) {
    const l = LANDMARKS.find((x) => x.nm === nm);
    if (!l) continue;
    const ok = await controls.flyTo({ x: l.x, z: l.z, dist: l.dist, pitch: l.pitch, yaw: l.yaw }, 3.0);
    if (!ok) { onDone(false); return; }
    // slow orbit dwell
    const t0 = performance.now();
    while (performance.now() - t0 < 2600) {
      if (controls.userMoved) { onDone(false); return; }
      controls.yaw += 0.0035;
      await new Promise(requestAnimationFrame);
    }
  }
  onDone(true);
}

export function buildHud(root, cb) {
  root.insertAdjacentHTML('beforeend', `
  <div id="hud">
    <div id="hud-head">
      <div>
        <div id="hud-title">תל אביב <span>3D</span></div>
        <div id="hud-sub">כל העיר, מנתוני OSM אמיתיים</div>
      </div>
      <button id="hud-min" title="מזעור">–</button>
    </div>
    <div id="hud-body">
      <div id="stats"></div>
      <div class="row presets">
        <button data-h="13">☀️ יום</button>
        <button data-h="18.2" class="on">🌇 שקיעה</button>
        <button data-h="21.8">🌙 לילה</button>
      </div>
      <label class="slider-row">🕐 <input id="hour" type="range" min="0" max="24" step="0.05" value="18.2"><span id="hour-v">18:12</span></label>
      <div class="row chips">
        <label><input type="checkbox" id="tg-trees" checked>עצים</label>
        <label><input type="checkbox" id="tg-traffic" checked>תנועה</label>
        <label><input type="checkbox" id="tg-labels" checked>תוויות</label>
        <label><input type="checkbox" id="tg-furniture" checked>ריהוט רחוב</label>
      </div>
      <div class="row">
        <select id="landmarks"><option value="">✈️ טוס אל…</option></select>
        <button id="tour">▶ סיור</button>
      </div>
      <div id="hint">גרירה — סיבוב · גרירה ימנית/Shift — הזזה · גלגלת — זום · WASD — טיסה · לחיצה על בניין — מידע</div>
    </div>
  </div>
  <div id="popup"></div>
  <div id="credit">נתונים © תורמי OpenStreetMap (ODbL) · הדמיה: Three.js</div>`);

  const $ = (s) => root.querySelector(s);
  const sel = $('#landmarks');
  for (const l of LANDMARKS) {
    const o = document.createElement('option');
    o.value = l.nm; o.textContent = l.nm;
    sel.appendChild(o);
  }
  sel.addEventListener('change', () => {
    const l = LANDMARKS.find((x) => x.nm === sel.value);
    if (l) cb.flyTo(l);
    sel.value = '';
  });
  $('#tour').addEventListener('click', () => cb.tour($('#tour')));
  const hourIn = $('#hour');
  const hourV = $('#hour-v');
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;
  hourIn.addEventListener('input', () => {
    hourV.textContent = fmt(+hourIn.value);
    root.querySelectorAll('.presets button').forEach((b) => b.classList.remove('on'));
    cb.setHour(+hourIn.value);
  });
  root.querySelectorAll('.presets button').forEach((b) => {
    b.addEventListener('click', () => {
      root.querySelectorAll('.presets button').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      hourIn.value = b.dataset.h;
      hourV.textContent = fmt(+b.dataset.h);
      cb.setHour(+b.dataset.h);
    });
  });
  for (const [id, key] of [['tg-trees', 'trees'], ['tg-traffic', 'traffic'], ['tg-labels', 'labels'], ['tg-furniture', 'furniture']]) {
    $('#' + id).addEventListener('change', (e) => cb.toggle(key, e.target.checked));
  }
  $('#hud-min').addEventListener('click', () => {
    const body = $('#hud-body');
    const hidden = body.style.display === 'none';
    body.style.display = hidden ? '' : 'none';
    $('#hud-min').textContent = hidden ? '–' : '+';
  });

  const popupEl = $('#popup');
  const popup = {
    show(x, y, html) {
      popupEl.innerHTML = html;
      popupEl.style.display = 'block';
      const w = popupEl.offsetWidth;
      popupEl.style.left = Math.min(window.innerWidth - w - 8, Math.max(8, x - w / 2)) + 'px';
      popupEl.style.top = Math.max(8, y - popupEl.offsetHeight - 16) + 'px';
    },
    hide() { popupEl.style.display = 'none'; },
  };
  return {
    popup,
    setStats(s) {
      $('#stats').innerHTML =
        `<div><b>${s.buildings.toLocaleString('he')}</b><span>בניינים</span></div>` +
        `<div><b>${s.trees.toLocaleString('he')}</b><span>עצים</span></div>` +
        `<div><b>${s.roadKm.toLocaleString('he')}</b><span>ק״מ כבישים</span></div>` +
        `<div><b>${s.vehicles.toLocaleString('he')}</b><span>כלי רכב</span></div>`;
    },
  };
}
