// Wheel tracks pressed into the dust: a ring buffer of quad strips per wheel,
// multiplied over the terrain so they darken whatever is underneath.
import * as THREE from 'three';
import { normalAt } from './terrain-math.js';

const VERT = /* glsl */`
attribute float aStrength;
varying float vStrength;
void main() {
  vStrength = aStrength;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const FRAG = /* glsl */`
uniform vec3 uColor;
varying float vStrength;
void main() {
  vec3 c = mix(vec3(1.0), uColor, vStrength);
  gl_FragColor = vec4(c, 1.0);
}`;

export function createTracks(scene, wheels = 6, perWheel = 900, width = 0.42) {
  const quads = wheels * perWheel;
  const pos = new Float32Array(quads * 6 * 3);
  const str = new Float32Array(quads * 6);
  const geo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(pos, 3);
  const strAttr = new THREE.BufferAttribute(str, 1);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  strAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('position', posAttr);
  geo.setAttribute('aStrength', strAttr);
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#6d5a3c') } },
    vertexShader: VERT, fragmentShader: FRAG,
    blending: THREE.MultiplyBlending, depthWrite: false, transparent: true,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  scene.add(mesh);

  const heads = new Int32Array(wheels);
  const prevL = Array.from({ length: wheels }, () => new THREE.Vector3());
  const prevR = Array.from({ length: wheels }, () => new THREE.Vector3());
  const prevP = Array.from({ length: wheels }, () => new THREE.Vector3(1e9, 0, 1e9));
  const dir = new THREE.Vector3(), side = new THREE.Vector3(), n = new THREE.Vector3(), l = new THREE.Vector3(), r = new THREE.Vector3();
  let dirty = false;

  function add(w, point, strength = 0.35) {
    const p = prevP[w];
    const d2 = p.distanceToSquared(point);
    if (d2 < 0.35 * 0.35) return;
    const nn = normalAt(point.x, point.z, 0.6);
    n.set(nn[0], nn[1], nn[2]);
    if (d2 > 6 * 6) { // teleport / long gap: restart the strip
      dir.set(1, 0, 0);
      side.crossVectors(n, dir).normalize().multiplyScalar(width / 2);
      prevL[w].copy(point).add(side).addScaledVector(n, 0.03);
      prevR[w].copy(point).sub(side).addScaledVector(n, 0.03);
      p.copy(point);
      return;
    }
    dir.copy(point).sub(p).normalize();
    side.crossVectors(n, dir).normalize().multiplyScalar(width / 2);
    l.copy(point).add(side).addScaledVector(n, 0.03);
    r.copy(point).sub(side).addScaledVector(n, 0.03);
    const q = w * perWheel + heads[w];
    heads[w] = (heads[w] + 1) % perWheel;
    const o = q * 18;
    const pl = prevL[w], pr = prevR[w];
    // two triangles: pl, pr, r  /  pl, r, l
    pos[o] = pl.x; pos[o + 1] = pl.y; pos[o + 2] = pl.z;
    pos[o + 3] = pr.x; pos[o + 4] = pr.y; pos[o + 5] = pr.z;
    pos[o + 6] = r.x; pos[o + 7] = r.y; pos[o + 8] = r.z;
    pos[o + 9] = pl.x; pos[o + 10] = pl.y; pos[o + 11] = pl.z;
    pos[o + 12] = r.x; pos[o + 13] = r.y; pos[o + 14] = r.z;
    pos[o + 15] = l.x; pos[o + 16] = l.y; pos[o + 17] = l.z;
    const s = Math.min(1, strength);
    for (let k = 0; k < 6; k++) str[q * 6 + k] = s;
    pl.copy(l); pr.copy(r); p.copy(point);
    dirty = true;
  }

  function flush() {
    if (!dirty) return;
    posAttr.needsUpdate = true;
    strAttr.needsUpdate = true;
    dirty = false;
  }

  function clear() {
    pos.fill(0); str.fill(0); heads.fill(0);
    for (const p of prevP) p.set(1e9, 0, 1e9);
    dirty = true; flush();
  }

  return { mesh, add, flush, clear };
}
