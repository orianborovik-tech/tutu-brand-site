// Sky dome, sun/moon light, fog, day cycle and the environment map.
import * as THREE from 'three';
import { createSunFlare } from './flare.js';

export const DAY_LENGTH = 600; // seconds for a full day
export const START_PHASE = 0.415; // late afternoon → golden hour → aurora night

const VERT = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAG = /* glsl */`
precision highp float;
varying vec3 vDir;
uniform vec3 uSunDir;
uniform vec3 uPlanetDir;
uniform float uTime;
uniform float uNight;
uniform float uAurora;
uniform float uGain;
uniform vec3 uHorizon;
uniform vec3 uZenith;
uniform vec3 uSunColor;

float hash21(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
float hash31(vec3 p) { p = fract(p * vec3(443.897, 441.423, 437.195)); p += dot(p, p.yzx + 19.19); return fract((p.x + p.y) * p.z); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
float vnoise3(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i), hash31(i + vec3(1, 0, 0)), f.x), mix(hash31(i + vec3(0, 1, 0)), hash31(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0, 0, 1)), hash31(i + vec3(1, 0, 1)), f.x), mix(hash31(i + vec3(0, 1, 1)), hash31(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm2(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; } return s; }
float fbm3(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * vnoise3(p); p = p * 2.05 + vec3(3.1, 1.7, 9.2); a *= 0.5; } return s; }

// One aurora curtain. dz: horizontal unit direction (seamless around the horizon), y: elevation.
float curtain(vec2 dz, float y, float t, float seed) {
  float shape = fbm2(dz * 1.8 + vec2(seed, t * 0.015));
  float band = smoothstep(0.46, 0.74, shape);
  float rays = pow(vnoise(dz * 34.0 + vec2(t * 0.2, seed * 7.0)), 2.5);
  float base = 0.10 + shape * 0.28;
  float env = exp(-pow((y - base) * 3.4, 2.0)) * smoothstep(0.02, 0.12, y);
  float tail = exp(-max(y - base, 0.0) * 2.2) * step(base, y) * 0.35;
  return band * (0.45 + 0.95 * rays) * (env + tail);
}

void main() {
  vec3 d = normalize(vDir);
  float y = d.y;
  vec2 dz = normalize(d.xz + vec2(1e-5, 0.0));

  // atmosphere gradient
  float hz = pow(1.0 - clamp(y, 0.0, 1.0), 2.6);
  vec3 col = mix(uZenith, uHorizon, hz) * uGain;
  col = mix(col, uHorizon * 0.55, smoothstep(0.0, -0.18, y));

  // sun disc + corona
  float sd = max(dot(d, uSunDir), 0.0);
  float sunUp = smoothstep(-0.08, 0.06, uSunDir.y);
  col += uSunColor * (smoothstep(0.9990, 0.9996, sd) * 14.0 + pow(sd, 90.0) * 1.6 + pow(sd, 7.0) * 0.32) * sunUp;
  // warm glow along the horizon toward the sun
  vec2 sz = normalize(uSunDir.xz + vec2(1e-5, 0.0));
  float az = pow(max(dot(dz, sz), 0.0), 3.0);
  col += uSunColor * az * pow(1.0 - clamp(abs(y), 0.0, 1.0), 6.0) * 0.6 * smoothstep(-0.25, 0.15, uSunDir.y);

  // stars
  vec3 sp = d * 160.0; vec3 sc = floor(sp); vec3 sf = fract(sp);
  vec3 starPos = vec3(hash31(sc + 1.3), hash31(sc + 7.1), hash31(sc + 13.7));
  float sdist = length(sf - starPos);
  float sbright = hash31(sc + 3.7);
  float twinkle = 0.7 + 0.3 * sin(uTime * (2.0 + sbright * 4.0) + sbright * 60.0);
  float star = smoothstep(0.12, 0.0, sdist) * step(0.86, sbright) * twinkle * (0.6 + 1.8 * (sbright - 0.86) / 0.14);
  col += vec3(0.85, 0.95, 1.0) * star * uNight * smoothstep(-0.05, 0.25, y) * 2.2;

  // nebula
  float n1 = fbm3(d * 2.3 + vec3(0.0, uTime * 0.004, 0.0));
  float n2 = fbm3(d * 1.6 + vec3(5.2, 1.1, 8.3));
  float n3 = fbm3(d * 3.4 + vec3(9.0, 4.0, 2.0));
  vec3 neb = mix(vec3(0.12, 0.85, 0.42), vec3(1.0, 0.72, 0.25), smoothstep(0.35, 0.7, n2)) * pow(max(n1 - 0.25, 0.0) * 1.6, 2.4) * 0.9;
  neb += vec3(0.25, 0.55, 1.2) * pow(max(n3 - 0.4, 0.0) * 2.0, 3.0) * 0.5;
  col += neb * uNight * smoothstep(-0.1, 0.3, y);

  // aurora curtains
  if (y > 0.0) {
    float t = uTime;
    float a = curtain(dz, y, t, 0.0)
            + 0.7 * curtain(dz * 1.5 + 2.0, y, t * 1.25, 4.0)
            + 0.6 * curtain(dz * 0.8 - 1.5, y, t * 0.8, 8.0);
    vec3 aurCol = mix(vec3(0.30, 1.0, 0.45), vec3(0.75, 0.30, 1.0), smoothstep(0.18, 0.6, y));
    col += aurCol * a * uAurora * (0.9 + 0.3 * uNight) * 1.35;
  }

  // sister planet on the horizon
  float pr = 0.986;
  float pd = dot(d, uPlanetDir);
  if (pd > pr - 0.01) {
    vec3 px = normalize(cross(uPlanetDir, vec3(0.0, 1.0, 0.0)));
    vec3 py = cross(px, uPlanetDir);
    vec2 uvp = vec2(dot(d, px), dot(d, py)) / sqrt(1.0 - pr * pr);
    float r2 = dot(uvp, uvp);
    if (r2 < 1.0) {
      float zz = sqrt(1.0 - r2);
      vec3 nrm = px * uvp.x + py * uvp.y - uPlanetDir * zz;
      float ndl = max(dot(nrm, uSunDir), 0.0);
      float band = fbm2(vec2(uvp.y * 5.0 + uvp.x * 0.3, 2.0));
      vec3 pcol = mix(vec3(0.82, 0.62, 0.38), vec3(0.45, 0.30, 0.26), smoothstep(0.35, 0.65, band));
      pcol = mix(pcol, vec3(0.92, 0.85, 0.7), smoothstep(0.7, 0.8, band));
      vec3 lit = pcol * (0.05 + ndl * 1.1) + vec3(0.1, 0.4, 0.2) * pow(1.0 - zz, 3.0) * uNight * 0.6;
      float edge = smoothstep(1.0, 0.985, r2);
      // daytime atmosphere washes it out
      lit = mix(col, lit, 0.35 + 0.65 * uNight);
      col = mix(col, lit, edge);
    }
  }

  gl_FragColor = vec4(col, 1.0);
}`;

// Palette keyframes across the day (sRGB hex; three converts to linear).
const KEYS = [
  { p: 0.00, horizon: '#d9a25a', zenith: '#2d5a52', sun: '#ffb070', fog: '#c8a878', sky: '#6f8f7c', ground: '#4a3b25', sunI: 2.6, hemiI: 0.9, gain: 1.4, exposure: 1.05, night: 0.25 },
  { p: 0.25, horizon: '#c9b98a', zenith: '#4a8f7c', sun: '#fff1d2', fog: '#bfb590', sky: '#8fb8a5', ground: '#6b5a35', sunI: 4.6, hemiI: 1.25, gain: 1.7, exposure: 1.0, night: 0.0 },
  { p: 0.44, horizon: '#d1b072', zenith: '#3f8a74', sun: '#ffe3b0', fog: '#c4ad7c', sky: '#86ad98', ground: '#5f4d2c', sunI: 4.2, hemiI: 1.15, gain: 1.6, exposure: 1.05, night: 0.0 },
  { p: 0.485, horizon: '#e5923f', zenith: '#2f6c60', sun: '#ffb455', fog: '#cf9a5a', sky: '#6f9a86', ground: '#503d22', sunI: 3.4, hemiI: 0.95, gain: 1.5, exposure: 1.1, night: 0.05 },
  { p: 0.52, horizon: '#c9622b', zenith: '#1d4a44', sun: '#ff8a3c', fog: '#8d5c3a', sky: '#3f6e5e', ground: '#2d2418', sunI: 1.4, hemiI: 0.7, gain: 1.3, exposure: 1.15, night: 0.4 },
  { p: 0.58, horizon: '#3c3a2e', zenith: '#0b1f1c', sun: '#6a7f9a', fog: '#2a2f27', sky: '#2a5a45', ground: '#171410', sunI: 0.35, hemiI: 0.55, gain: 1.1, exposure: 1.25, night: 0.9 },
  { p: 0.66, horizon: '#14201a', zenith: '#030709', sun: '#7fa0c0', fog: '#101a15', sky: '#2a6b45', ground: '#0e0c09', sunI: 0.55, hemiI: 0.5, gain: 1.0, exposure: 1.35, night: 1.0 },
  { p: 0.90, horizon: '#14201a', zenith: '#030709', sun: '#7fa0c0', fog: '#101a15', sky: '#2a6b45', ground: '#0e0c09', sunI: 0.55, hemiI: 0.5, gain: 1.0, exposure: 1.35, night: 1.0 },
  { p: 0.95, horizon: '#4a3a30', zenith: '#0d1c1c', sun: '#b08a80', fog: '#33302a', sky: '#3f6e5e', ground: '#221c14', sunI: 0.5, hemiI: 0.6, gain: 1.1, exposure: 1.2, night: 0.8 },
  { p: 1.00, horizon: '#d9a25a', zenith: '#2d5a52', sun: '#ffb070', fog: '#c8a878', sky: '#6f8f7c', ground: '#4a3b25', sunI: 2.6, hemiI: 0.9, gain: 1.4, exposure: 1.05, night: 0.25 },
].map((k) => ({
  ...k,
  horizon: new THREE.Color(k.horizon), zenith: new THREE.Color(k.zenith), sun: new THREE.Color(k.sun),
  fog: new THREE.Color(k.fog), sky: new THREE.Color(k.sky), ground: new THREE.Color(k.ground),
}));

function sampleKeys(phase, out) {
  let a = KEYS[0], b = KEYS[KEYS.length - 1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (phase >= KEYS[i].p && phase <= KEYS[i + 1].p) { a = KEYS[i]; b = KEYS[i + 1]; break; }
  }
  const span = b.p - a.p || 1;
  const t = THREE.MathUtils.smoothstep((phase - a.p) / span, 0, 1);
  out.horizon.lerpColors(a.horizon, b.horizon, t);
  out.zenith.lerpColors(a.zenith, b.zenith, t);
  out.sun.lerpColors(a.sun, b.sun, t);
  out.fog.lerpColors(a.fog, b.fog, t);
  out.sky.lerpColors(a.sky, b.sky, t);
  out.ground.lerpColors(a.ground, b.ground, t);
  out.sunI = THREE.MathUtils.lerp(a.sunI, b.sunI, t);
  out.hemiI = THREE.MathUtils.lerp(a.hemiI, b.hemiI, t);
  out.gain = THREE.MathUtils.lerp(a.gain, b.gain, t);
  out.exposure = THREE.MathUtils.lerp(a.exposure, b.exposure, t);
  out.night = THREE.MathUtils.lerp(a.night, b.night, t);
  return out;
}

export function createSky(scene, renderer) {
  const uniforms = {
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uPlanetDir: { value: new THREE.Vector3(0.55, 0.22, -0.8).normalize() },
    uTime: { value: 0 },
    uNight: { value: 0 },
    uAurora: { value: 0.35 },
    uGain: { value: 1.5 },
    uHorizon: { value: new THREE.Color() },
    uZenith: { value: new THREE.Color() },
    uSunColor: { value: new THREE.Color() },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERT, fragmentShader: FRAG,
    side: THREE.BackSide, depthWrite: false, depthTest: false, fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1000, 48, 24), material);
  mesh.renderOrder = -1000;
  mesh.frustumCulled = false;
  scene.add(mesh);

  // key light: the sun by day, an aurora-lit moon by night
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 10;
  sun.shadow.camera.far = 420;
  sun.shadow.camera.left = -80; sun.shadow.camera.right = 80;
  sun.shadow.camera.top = 80; sun.shadow.camera.bottom = -80;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.05;
  sun.shadow.radius = 3;
  scene.add(sun);
  scene.add(sun.target);

  const hemi = new THREE.HemisphereLight(0x8fb8a5, 0x5f4d2c, 0.7);
  scene.add(hemi);

  scene.fog = new THREE.FogExp2(0xc4ad7c, 0.0026);

  // environment map from the sky itself (for PBR reflections)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(mesh.geometry, material));
  let envRT = null;
  let envTimer = 99;

  const cur = {
    horizon: new THREE.Color(), zenith: new THREE.Color(), sun: new THREE.Color(),
    fog: new THREE.Color(), sky: new THREE.Color(), ground: new THREE.Color(),
    sunI: 1, hemiI: 1, gain: 1.5, exposure: 1, night: 0,
  };
  const sunDir = new THREE.Vector3();
  const moonDir = new THREE.Vector3(0.35, 0.72, 0.55).normalize();
  const lightDir = new THREE.Vector3();
  const moonColor = new THREE.Color('#7fa8c8');
  const auroraTint = new THREE.Color('#5cf58a');

  const state = { phase: START_PHASE, night: 0, sunDir, time: 0, exposure: 1 };
  const flare = createSunFlare(scene);

  function update(dt, focus, camera) {
    state.time += dt;
    state.phase = (START_PHASE + state.time / DAY_LENGTH) % 1;
    const ang = state.phase * Math.PI * 2;
    sunDir.set(Math.cos(ang), Math.sin(ang) * 0.8, -0.35).normalize();
    sampleKeys(state.phase, cur);
    state.night = cur.night;
    state.exposure = cur.exposure;

    uniforms.uTime.value = state.time;
    uniforms.uNight.value = cur.night;
    uniforms.uAurora.value = 0.2 + 0.85 * cur.night;
    uniforms.uGain.value = cur.gain;
    uniforms.uSunDir.value.copy(sunDir);
    uniforms.uHorizon.value.copy(cur.horizon);
    uniforms.uZenith.value.copy(cur.zenith);
    uniforms.uSunColor.value.copy(cur.sun);

    // blend key light from sun to moon as the sun sets
    const moonBlend = THREE.MathUtils.smoothstep(-sunDir.y, -0.03, 0.10);
    lightDir.copy(sunDir).lerp(moonDir, moonBlend).normalize();
    sun.position.copy(focus).addScaledVector(lightDir, 180);
    sun.target.position.copy(focus);
    sun.color.copy(cur.sun).lerp(moonColor, moonBlend);
    sun.intensity = cur.sunI;
    hemi.color.copy(cur.sky).lerp(auroraTint, cur.night * 0.35);
    hemi.groundColor.copy(cur.ground);
    hemi.intensity = cur.hemiI;
    scene.fog.color.copy(cur.fog);
    scene.fog.density = 0.0026 + cur.night * 0.0006;
    renderer.toneMappingExposure = cur.exposure;

    mesh.position.copy(camera.position);
    flare.update(camera, sunDir, THREE.MathUtils.smoothstep(sunDir.y, -0.02, 0.1) * (1 - cur.night));

    envTimer += dt;
    if (envTimer > 3) {
      envTimer = 0;
      const old = envRT;
      envRT = pmrem.fromScene(envScene, 0.04);
      scene.environment = envRT.texture;
      if (old) old.dispose();
    }
  }

  return { mesh, sun, hemi, state, update, palette: cur };
}
