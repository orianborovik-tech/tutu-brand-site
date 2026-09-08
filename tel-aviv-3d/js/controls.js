// Orbit/pan/fly camera tuned for a city model. Left-drag orbits, right- or
// shift-drag pans, wheel zooms toward the cursor, WASD flies, QE spins.
import * as THREE from 'three';

export class CityControls {
  constructor(camera, dom, bounds) {
    this.camera = camera;
    this.dom = dom;
    this.bounds = bounds; // {x0,z0,x1,z1}
    this.target = new THREE.Vector3(0, 0, 0);
    this.yaw = 0.35;
    this.pitch = 1.05;
    this.dist = 4500;
    this.keys = new Set();
    this.userMoved = false;
    this._drag = null;
    this._touches = new Map();
    this._raycaster = new THREE.Raycaster();
    this._plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    dom.addEventListener('pointerdown', (e) => this._down(e));
    window.addEventListener('pointermove', (e) => this._move(e));
    window.addEventListener('pointerup', (e) => this._up(e));
    dom.addEventListener('wheel', (e) => this._wheel(e), { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      this.keys.add(e.code);
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF'].includes(e.code)) this.userMoved = true;
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
  }

  _down(e) {
    this.dom.setPointerCapture?.(e.pointerId);
    this._touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._touches.size === 1) {
      this._drag = { x: e.clientX, y: e.clientY, btn: e.button, shift: e.shiftKey, moved: 0 };
    } else {
      this._drag = null;
      const t = [...this._touches.values()];
      this._pinch = { d: Math.hypot(t[0].x - t[1].x, t[0].y - t[1].y), cx: (t[0].x + t[1].x) / 2, cy: (t[0].y + t[1].y) / 2 };
    }
  }

  _move(e) {
    const t = this._touches.get(e.pointerId);
    if (t) { t.x = e.clientX; t.y = e.clientY; }
    if (this._touches.size === 2 && this._pinch) {
      const ts = [...this._touches.values()];
      const d = Math.hypot(ts[0].x - ts[1].x, ts[0].y - ts[1].y);
      const cx = (ts[0].x + ts[1].x) / 2, cy = (ts[0].y + ts[1].y) / 2;
      this.dist = THREE.MathUtils.clamp(this.dist * (this._pinch.d / Math.max(20, d)), 60, 32000);
      this._panPixels(cx - this._pinch.cx, cy - this._pinch.cy);
      this._pinch = { d, cx, cy };
      this.userMoved = true;
      return;
    }
    if (!this._drag) return;
    const dx = e.clientX - this._drag.x;
    const dy = e.clientY - this._drag.y;
    this._drag.x = e.clientX; this._drag.y = e.clientY;
    this._drag.moved += Math.abs(dx) + Math.abs(dy);
    if (this._drag.moved > 4) this.userMoved = true;
    if (this._drag.btn === 2 || this._drag.shift) this._panPixels(dx, dy);
    else {
      this.yaw -= dx * 0.0052;
      this.pitch = THREE.MathUtils.clamp(this.pitch - dy * 0.0042, 0.08, 1.52);
    }
  }

  _up(e) {
    this._touches.delete(e.pointerId);
    if (this._touches.size < 2) this._pinch = null;
    if (this._touches.size === 0) this._drag = null;
  }

  _panPixels(dx, dy) {
    const k = this.dist / this.dom.clientHeight * 1.35;
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    // screen right in world
    this.target.x -= (cy * dx - sy * dy) * k;
    this.target.z -= (-sy * dx - cy * dy) * k;
    this._clamp();
  }

  _wheel(e) {
    e.preventDefault();
    this.userMoved = true;
    const f = Math.exp(e.deltaY * 0.0011);
    // zoom toward the point under the cursor
    const r = this.dom.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
    this._raycaster.setFromCamera({ x: nx, y: ny }, this.camera);
    const hit = new THREE.Vector3();
    if (this._raycaster.ray.intersectPlane(this._plane, hit)) {
      const move = 1 - f;
      this.target.x += (hit.x - this.target.x) * move;
      this.target.z += (hit.z - this.target.z) * move;
    }
    this.dist = THREE.MathUtils.clamp(this.dist * f, 60, 32000);
    this._clamp();
  }

  _clamp() {
    const b = this.bounds;
    this.target.x = THREE.MathUtils.clamp(this.target.x, b.x0 - 2000, b.x1 + 2000);
    this.target.z = THREE.MathUtils.clamp(this.target.z, b.z0 - 2000, b.z1 + 2000);
  }

  update(dt) {
    const spd = this.dist * 0.9 * dt;
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    if (this.keys.has('KeyW')) { this.target.x += sy * spd; this.target.z -= cy * spd; }
    if (this.keys.has('KeyS')) { this.target.x -= sy * spd; this.target.z += cy * spd; }
    if (this.keys.has('KeyA')) { this.target.x -= cy * spd; this.target.z -= sy * spd; }
    if (this.keys.has('KeyD')) { this.target.x += cy * spd; this.target.z += sy * spd; }
    if (this.keys.has('KeyQ')) this.yaw += 1.4 * dt;
    if (this.keys.has('KeyE')) this.yaw -= 1.4 * dt;
    if (this.keys.has('KeyR')) this.dist = Math.max(60, this.dist * (1 - 1.2 * dt));
    if (this.keys.has('KeyF')) this.dist = Math.min(32000, this.dist * (1 + 1.2 * dt));
    this._clamp();
    this.apply();
  }

  apply() {
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    const x = this.target.x - sy * cp * this.dist;
    const z = this.target.z + cy * cp * this.dist;
    const y = this.target.y + sp * this.dist;
    this.camera.position.set(x, Math.max(2.5, y), z);
    this.camera.lookAt(this.target.x, this.target.y, this.target.z);
  }

  // smooth flight to a pose; returns a promise
  flyTo(pose, dur = 2.4) {
    this.userMoved = false;
    const from = { x: this.target.x, z: this.target.z, yaw: this.yaw, pitch: this.pitch, dist: this.dist };
    let yawTo = pose.yaw ?? this.yaw;
    while (yawTo - from.yaw > Math.PI) yawTo -= Math.PI * 2;
    while (yawTo - from.yaw < -Math.PI) yawTo += Math.PI * 2;
    const t0 = performance.now();
    return new Promise((res) => {
      const step = () => {
        if (this.userMoved) return res(false);
        const t = Math.min(1, (performance.now() - t0) / (dur * 1000));
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        this.target.x = from.x + (pose.x - from.x) * e;
        this.target.z = from.z + (pose.z - from.z) * e;
        this.yaw = from.yaw + (yawTo - from.yaw) * e;
        this.pitch = from.pitch + ((pose.pitch ?? from.pitch) - from.pitch) * e;
        this.dist = from.dist * Math.pow((pose.dist ?? from.dist) / from.dist, e);
        if (t < 1) requestAnimationFrame(step);
        else res(true);
      };
      step();
    });
  }
}
