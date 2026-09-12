// Sun lens flare drawn with screen-space sprites (no framebuffer read-back, so it works
// inside the multisampled post-processing chain). Occlusion is approximated by marching
// the sun ray against the analytic terrain height.
import * as THREE from 'three';
import { heightAt } from './terrain-math.js';

function discTexture(size, stops) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [t, col] of stops) grad.addColorStop(t, col);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createSunFlare(scene) {
  const core = discTexture(256, [[0, 'rgba(255,240,210,1)'], [0.1, 'rgba(255,225,170,0.85)'], [0.28, 'rgba(255,190,110,0.3)'], [0.6, 'rgba(255,160,80,0.07)'], [1, 'rgba(255,140,60,0)']]);
  const ring = discTexture(128, [[0, 'rgba(255,255,255,0)'], [0.62, 'rgba(255,255,255,0)'], [0.72, 'rgba(255,255,255,0.5)'], [0.82, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,0)']]);
  const ghost = discTexture(128, [[0, 'rgba(255,255,255,0.4)'], [0.5, 'rgba(255,255,255,0.16)'], [0.95, 'rgba(255,255,255,0.04)'], [1, 'rgba(255,255,255,0)']]);
  // [texture, screen-height fraction, position along the axis (0 = sun, 1 = opposite), colour, opacity]
  const defs = [
    [core, 0.95, 0, '#ffd9a0', 0.9],
    [ghost, 0.10, 0.45, '#5cf58a', 0.35],
    [ghost, 0.16, 0.62, '#e8b643', 0.3],
    [ring, 0.26, 0.8, '#ff9a4a', 0.35],
    [ghost, 0.07, 1.0, '#5cf58a', 0.3],
    [ghost, 0.05, 1.25, '#ffd27a', 0.25],
  ];
  const group = new THREE.Group();
  const sprites = defs.map(([map, frac, k, color, opacity]) => {
    const mat = new THREE.SpriteMaterial({ map, color: new THREE.Color(color), blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true, opacity, fog: false });
    const s = new THREE.Sprite(mat);
    s.renderOrder = 50;
    s.userData = { frac, k, opacity };
    group.add(s);
    return s;
  });
  scene.add(group);

  const ndc = new THREE.Vector3(), p = new THREE.Vector3(), dir = new THREE.Vector3();
  const DIST = 6;

  function occluded(camera, sunDir) {
    // march along the sun ray; if the terrain rises above the ray the sun is hidden
    for (let d = 12; d < 420; d *= 1.35) {
      p.copy(camera.position).addScaledVector(sunDir, d);
      if (heightAt(p.x, p.z) > p.y) return true;
    }
    return false;
  }

  function update(camera, sunDir, strength) {
    dir.copy(sunDir);
    let vis = strength > 0.02;
    if (vis) {
      ndc.copy(camera.position).addScaledVector(sunDir, 500).project(camera);
      const inFront = ndc.z < 1;
      const onScreen = Math.abs(ndc.x) < 1.6 && Math.abs(ndc.y) < 1.6;
      vis = inFront && onScreen && !occluded(camera, sunDir);
    }
    group.visible = vis;
    if (!vis) return;
    const edge = 1 - THREE.MathUtils.smoothstep(Math.max(Math.abs(ndc.x), Math.abs(ndc.y)), 0.9, 1.5);
    const centre = 1 - Math.min(1, Math.hypot(ndc.x, ndc.y) / 1.6);
    const h = 2 * DIST * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    for (const s of sprites) {
      const { frac, k, opacity } = s.userData;
      const sx = ndc.x * (1 - 2 * k), sy = ndc.y * (1 - 2 * k);
      p.set(sx, sy, 0.5).unproject(camera);
      dir.copy(p).sub(camera.position).normalize();
      s.position.copy(camera.position).addScaledVector(dir, DIST);
      const size = frac * h;
      s.scale.set(size, size, 1);
      s.material.opacity = opacity * strength * edge * (k === 0 ? 1 : 0.4 + 0.6 * centre);
    }
  }
  return { group, update };
}
