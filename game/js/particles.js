// GPU-driven particle systems: wheel dust (ring-buffer emitter), looping smoke/steam
// columns, and one-shot sparkle bursts. Motion is integrated in the vertex shader.
import * as THREE from 'three';

function makeSoftSprite(size = 64, hard = false) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  if (hard) {
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
  } else {
    grad.addColorStop(0, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.35)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
  }
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const VERT = /* glsl */`
attribute vec3 aVel;
attribute float aStart;
attribute float aLife;
attribute float aSize;
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime;
uniform float uGravity;
uniform float uGrow;
uniform float uLoop;
uniform vec3 uWind;
uniform float uPixelRatio;
varying float vAlpha;
varying vec3 vColor;
varying float vSeed;
void main() {
  float age = uTime - aStart;
  if (uLoop > 0.5) age = mod(age, aLife);
  float t = clamp(age / aLife, 0.0, 1.0);
  vec3 p = position + aVel * age + uWind * age * age * 0.5;
  p.y += uGravity * age * age * 0.5;
  // gentle turbulence
  p.x += sin(age * 1.7 + aSeed * 12.0) * 0.25 * age * 0.3;
  p.z += cos(age * 1.3 + aSeed * 7.0) * 0.25 * age * 0.3;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float fadeIn = smoothstep(0.0, 0.08, t);
  float fadeOut = 1.0 - smoothstep(0.55, 1.0, t);
  vAlpha = fadeIn * fadeOut * step(0.0, age) * step(age, aLife);
  vColor = aColor;
  vSeed = aSeed;
  float size = aSize * (1.0 + uGrow * t);
  gl_PointSize = size * uPixelRatio * (300.0 / max(-mv.z, 1.0));
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */`
uniform sampler2D uMap;
uniform float uOpacity;
uniform vec3 uLight;
varying float vAlpha;
varying vec3 vColor;
varying float vSeed;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  float a = tex.a * vAlpha * uOpacity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor * uLight, a);
}`;

function createSystem(scene, count, opts) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const start = new Float32Array(count).fill(-1e6);
  const life = new Float32Array(count).fill(1);
  const size = new Float32Array(count);
  const color = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aVel', new THREE.BufferAttribute(vel, 3));
  geo.setAttribute('aStart', new THREE.BufferAttribute(start, 1));
  geo.setAttribute('aLife', new THREE.BufferAttribute(life, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
  const uniforms = {
    uTime: { value: 0 },
    uGravity: { value: opts.gravity ?? 0 },
    uGrow: { value: opts.grow ?? 1.5 },
    uLoop: { value: opts.loop ? 1 : 0 },
    uWind: { value: new THREE.Vector3(0.15, 0, 0.08) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    uMap: { value: opts.map },
    uOpacity: { value: opts.opacity ?? 1 },
    uLight: { value: new THREE.Vector3(1, 1, 1) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false,
    blending: opts.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = opts.renderOrder ?? 10;
  scene.add(points);
  let head = 0;
  const attrs = geo.attributes;
  function emit(p, v, sz, lifeS, col, startAt) {
    const i = head; head = (head + 1) % count;
    pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
    vel[i * 3] = v.x; vel[i * 3 + 1] = v.y; vel[i * 3 + 2] = v.z;
    start[i] = startAt; life[i] = lifeS; size[i] = sz;
    color[i * 3] = col.r; color[i * 3 + 1] = col.g; color[i * 3 + 2] = col.b;
    seed[i] = Math.random();
    for (const k in attrs) attrs[k].needsUpdate = true;
  }
  return { points, uniforms, emit, count };
}

const AMBIENT_VERT = /* glsl */`
attribute float aSize;
attribute float aSeed;
uniform float uTime;
uniform vec3 uBox;
uniform vec3 uWind;
uniform float uPixelRatio;
varying float vAlpha;
void main() {
  vec3 p = position + uWind * uTime + vec3(sin(uTime * 0.7 + aSeed * 9.0), cos(uTime * 0.5 + aSeed * 5.0) * 0.4, cos(uTime * 0.6 + aSeed * 3.0)) * 0.6;
  vec3 local = mod(p - cameraPosition, uBox) - uBox * 0.5;
  vec3 world = local + cameraPosition;
  vec4 mv = modelViewMatrix * vec4(world, 1.0);
  float d = -mv.z;
  vAlpha = smoothstep(1.5, 5.0, d) * (1.0 - smoothstep(uBox.x * 0.35, uBox.x * 0.5, length(local)));
  gl_PointSize = aSize * uPixelRatio * (220.0 / max(d, 1.0));
  gl_Position = projectionMatrix * mv;
}`;
const AMBIENT_FRAG = /* glsl */`
uniform sampler2D uMap;
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
void main() {
  float a = texture2D(uMap, gl_PointCoord).a * vAlpha * uOpacity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(uColor, a);
}`;

function createAmbient(scene, map, count = 700) {
  const geo = new THREE.BufferGeometry();
  const box = new THREE.Vector3(46, 22, 46);
  const pos = new Float32Array(count * 3), size = new Float32Array(count), seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = Math.random() * box.x; pos[i * 3 + 1] = Math.random() * box.y; pos[i * 3 + 2] = Math.random() * box.z;
    size[i] = 0.05 + Math.random() * 0.14; seed[i] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
  const uniforms = {
    uTime: { value: 0 }, uBox: { value: box }, uWind: { value: new THREE.Vector3(0.9, -0.15, 0.4) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }, uMap: { value: map },
    uColor: { value: new THREE.Color('#e6d3a0') }, uOpacity: { value: 0.5 },
  };
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: AMBIENT_VERT, fragmentShader: AMBIENT_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = 12;
  scene.add(points);
  return { points, uniforms };
}

export function createParticles(scene) {
  const soft = makeSoftSprite(64, false);
  const hard = makeSoftSprite(32, true);
  const dust = createSystem(scene, 2400, { map: soft, gravity: -0.6, grow: 1.8, opacity: 0.3 });
  const smoke = createSystem(scene, 3000, { map: soft, gravity: 0.0, grow: 3.0, loop: true, opacity: 0.32, renderOrder: 9 });
  const sparks = createSystem(scene, 600, { map: hard, gravity: -6, grow: -0.6, opacity: 1, additive: true, renderOrder: 11 });
  const embers = createSystem(scene, 800, { map: hard, gravity: 0.3, grow: -0.5, loop: true, opacity: 0.9, additive: true });
  const ambient = createAmbient(scene, hard, 700);

  let time = 0;
  const dustColor = new THREE.Color('#c9b073');
  const tmpV = new THREE.Vector3();
  const tmpP = new THREE.Vector3();
  let dustBudget = 0;

  function emitDust(point, velocity, amount, spread = 0.5) {
    dustBudget += amount;
    while (dustBudget >= 1) {
      dustBudget -= 1;
      tmpP.copy(point).add(tmpV.set((Math.random() - 0.5) * spread, 0.1, (Math.random() - 0.5) * spread));
      tmpV.set(-velocity.x * 0.25 + (Math.random() - 0.5) * 1.2, 0.9 + Math.random() * 1.6, -velocity.z * 0.25 + (Math.random() - 0.5) * 1.2);
      dust.emit(tmpP, tmpV, 0.6 + Math.random() * 0.8, 1.4 + Math.random() * 1.4, dustColor, time);
    }
  }

  // Continuous column: particles are spread across their loop so the column is full from frame one.
  function addColumn(x, y, z, { color, count = 160, height = 60, radius = 1.2, life = 14, size = 4, rise = 4 }) {
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * radius;
      tmpP.set(x + Math.cos(a) * r, y + Math.random() * 0.5, z + Math.sin(a) * r);
      tmpV.set((Math.random() - 0.5) * 0.4, rise * (0.8 + Math.random() * 0.4), (Math.random() - 0.5) * 0.4);
      const l = life * (0.8 + Math.random() * 0.4);
      smoke.emit(tmpP, tmpV, size * (0.7 + Math.random() * 0.6), l, c, -Math.random() * l);
    }
  }

  function addEmbers(x, y, z, count = 60, radius = 12) {
    const c = new THREE.Color('#ff7a1f');
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * radius;
      tmpP.set(x + Math.cos(a) * r, y + 0.2, z + Math.sin(a) * r);
      tmpV.set((Math.random() - 0.5) * 0.6, 1.2 + Math.random() * 2.0, (Math.random() - 0.5) * 0.6);
      const l = 3 + Math.random() * 4;
      embers.emit(tmpP, tmpV, 0.25 + Math.random() * 0.3, l, c, -Math.random() * l);
    }
  }

  function burst(p, count = 140) {
    const c = new THREE.Color('#ffd27a');
    for (let i = 0; i < count; i++) {
      const th = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI * 0.6;
      const sp = 4 + Math.random() * 9;
      tmpV.set(Math.cos(th) * Math.sin(ph) * sp, Math.cos(ph) * sp + 3, Math.sin(th) * Math.sin(ph) * sp);
      tmpP.copy(p);
      sparks.emit(tmpP, tmpV, 0.35 + Math.random() * 0.5, 1.2 + Math.random() * 1.4, c, time);
    }
  }

  function update(dt, light) {
    time += dt;
    for (const s of [dust, smoke, sparks, embers]) {
      s.uniforms.uTime.value = time;
    }
    ambient.uniforms.uTime.value = time;
    if (light) {
      dust.uniforms.uLight.value.copy(light);
      smoke.uniforms.uLight.value.copy(light);
      ambient.uniforms.uColor.value.setRGB(light.x * 0.9, light.y * 0.85, light.z * 0.7);
    }
  }

  return { update, emitDust, addColumn, addEmbers, burst, get time() { return time; } };
}
