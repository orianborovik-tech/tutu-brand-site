// All materials are hand-written shaders sharing one environment uniform set,
// so the whole city responds to the time-of-day slider coherently.
import * as THREE from 'three';


// Wrap ShaderMaterial creation, injecting three's logarithmic-depth chunks so
// custom shaders coexist with logarithmicDepthBuffer (needed: the city spans
// 30 km with 10 cm layer separations).
function logify(vs, fs) {
  vs = '#include <common>\n#include <logdepthbuf_pars_vertex>\n' + vs.replace(/}\s*$/, '\n#include <logdepthbuf_vertex>\n}');
  fs = '#include <common>\n#include <logdepthbuf_pars_fragment>\n' + fs.replace('void main() {', 'void main() {\n#include <logdepthbuf_fragment>');
  return [vs, fs];
}
export function SM(opts) {
  const [vertexShader, fragmentShader] = logify(opts.vertexShader, opts.fragmentShader);
  return new THREE.ShaderMaterial({ ...opts, vertexShader, fragmentShader });
}

const FOG_GLSL = `
uniform vec3 uFogColor;
uniform float uFogDensity;
vec3 applyFog(vec3 col, float dist) {
  float f = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
  return mix(col, uFogColor, clamp(f, 0.0, 1.0));
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`;

export function makeEnvUniforms() {
  return {
    uSunDir: { value: new THREE.Vector3(0.4, 0.8, 0.2) },
    uSunColor: { value: new THREE.Color('#fff2dd') },
    uAmbSky: { value: new THREE.Color('#b8cfe0') },
    uAmbGround: { value: new THREE.Color('#8c8474') },
    uFogColor: { value: new THREE.Color('#d8e2ea') },
    uFogDensity: { value: 0.000045 },
    uNight: { value: 0.0 },
    uWindowLitFrac: { value: 0.34 },
    uCamPos: { value: new THREE.Vector3() },
    uTime: { value: 0 },
  };
}

// Sun/sky state from hour-of-day (0..24). Tuned for a Tel Aviv look.
export function computeEnv(hour, env) {
  const t = ((hour % 24) + 24) % 24;
  const dayF = Math.sin(Math.PI * (t - 6.1) / 12.7);      // >0 during day
  const altDeg = 69 * dayF;
  const azDeg = 84 + (t - 6.1) / 12.7 * 196;              // E → W
  const alt = THREE.MathUtils.degToRad(Math.max(altDeg, -30));
  const az = THREE.MathUtils.degToRad(azDeg);
  const night = THREE.MathUtils.smoothstep(-altDeg, -1.5, 7.5); // 0 day → 1 night
  const dusk = Math.exp(-Math.pow((altDeg - 7) / 11, 2));       // golden-hour bump

  if (altDeg > -4) {
    env.uSunDir.value.set(Math.sin(az) * Math.cos(alt), Math.sin(alt), -Math.cos(az) * Math.cos(alt)).normalize();
  } else { // moon
    env.uSunDir.value.set(-0.45, 0.62, 0.55).normalize();
  }
  const c = (a, b, f) => new THREE.Color(a).lerp(new THREE.Color(b), THREE.MathUtils.clamp(f, 0, 1));
  const sunDay = c('#fff3de', '#ffa261', dusk);
  const sunCol = sunDay.multiplyScalar(1.95 * Math.max(0, Math.min(1, (altDeg + 3) / 12)));
  const moonCol = new THREE.Color('#5d6f96').multiplyScalar(0.5);
  env.uSunColor.value.copy(sunCol.lerp(moonCol, night));
  env.uAmbSky.value.copy(c('#b9d0e2', '#c9a68c', dusk * 0.7).lerp(new THREE.Color('#2b3a55'), night).multiplyScalar(1.12));
  env.uAmbGround.value.copy(c('#8f8878', '#8a7462', dusk).lerp(new THREE.Color('#141a26'), night));
  env.uFogColor.value.copy(c('#dde6ee', '#eccaa6', dusk * 0.85).lerp(new THREE.Color('#0d1420'), night));
  env.uFogDensity.value = 0.000026 + dusk * 0.000012 + night * 0.000009;
  env.uNight.value = night;
  return { altDeg, azDeg, night, dusk };
}

// ------------------------------------------------------------- buildings ---
export function buildingsMaterial(env) {
  return SM({
    uniforms: env,
    side: THREE.DoubleSide,
    vertexShader: `
      attribute vec3 color;
      attribute float aId;
      attribute float aFlags;
      varying vec3 vWorld;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vId;
      varying float vFlags;
      void main() {
        vWorld = position;
        vColor = color;
        vUv = uv;
        vId = aId;
        vFlags = aFlags;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos;
      uniform float uNight, uWindowLitFrac;
      varying vec3 vWorld;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vId;
      varying float vFlags;
      ${FOG_GLSL}
      void main() {
        vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
        vec3 col = vColor;
        vec3 emit = vec3(0.0);
        bool wall = vUv.y > -900.0;
        float glass = mod(vFlags, 2.0);
        if (wall) {
          vec2 cell = vec2(vUv.x / 3.35, vWorld.y / 3.02);
          vec2 f = fract(cell);
          vec2 id = floor(cell);
          float inWin = step(0.16, f.x) * step(f.x, 0.80) * step(0.22, f.y) * step(f.y, 0.78);
          float rnd = hash12(id * 1.03 + vec2(vId * 0.719, vId * 0.133));
          col = mix(col, col * vec3(0.60, 0.65, 0.74), inWin * (0.5 + 0.3 * glass));
          float lit = step(rnd, uWindowLitFrac + glass * 0.25) * inWin;
          vec3 warm = mix(vec3(1.0, 0.82, 0.5), vec3(0.72, 0.83, 1.0), step(0.86, fract(rnd * 9.0)));
          emit = lit * uNight * warm * (0.55 + 0.75 * fract(rnd * 13.0));
        }
        vec3 V = normalize(uCamPos - vWorld);
        float fres = pow(1.0 - abs(dot(N, V)), 3.0);
        vec3 skyRef = uAmbSky * 1.35 + uSunColor * 0.12;
        float floorLine = glass * (1.0 - step(0.12, fract(vWorld.y / 3.02))) * 0.35;
        col = mix(col, mix(col * 0.7, skyRef, 0.30 + 0.45 * fres), glass * 0.72);
        col *= 1.0 - floorLine;
        float lam = max(dot(N, uSunDir), 0.0);
        vec3 hemi = mix(uAmbGround, uAmbSky, N.y * 0.5 + 0.5);
        float ao = clamp(vWorld.y / 7.0, 0.0, 1.0) * 0.30 + 0.70;
        float sunScale = mix(1.0, 0.62, clamp(N.y, 0.0, 1.0));
        vec3 outCol = col * (uSunColor * lam * sunScale + hemi * 1.05) * ao + emit;
        gl_FragColor = vec4(applyFog(outCol, length(uCamPos - vWorld)), 1.0);
      }`,
  });
}

// ------------------------------------------------- flat ground/areas/roads --
export function flatMaterial(env) {
  return SM({
    uniforms: env,
    side: THREE.DoubleSide,
    vertexShader: `
      attribute vec3 color;
      varying vec3 vColor;
      varying vec3 vWorld;
      void main() {
        vColor = color;
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos;
      varying vec3 vColor;
      varying vec3 vWorld;
      ${FOG_GLSL}
      void main() {
        float n = hash12(floor(vWorld.xz * 0.55)) * 0.06 - 0.03;
        vec3 col = vColor * (1.0 + n);
        vec3 light = uSunColor * 0.6 * max(uSunDir.y, 0.0) + mix(uAmbGround, uAmbSky, 1.0) * 1.0;
        vec3 outCol = col * light;
        gl_FragColor = vec4(applyFog(outCol, length(uCamPos - vWorld)), 1.0);
      }`,
  });
}

// -------------------------------------------------------------------- sea --
export function seaMaterial(env) {
  return SM({
    uniforms: env,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uSunDir, uSunColor, uAmbSky, uCamPos;
      uniform float uNight, uTime;
      varying vec3 vWorld;
      ${FOG_GLSL}
      float wnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x),
                   mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
      }
      void main() {
        vec2 p = vWorld.xz;
        float t = uTime;
        float w = wnoise(p * 0.020 + vec2(t * 0.06, t * 0.028))
                + wnoise(p * 0.061 - vec2(t * 0.05, t * 0.09)) * 0.5
                + wnoise(p * 0.16 + vec2(t * 0.12, -t * 0.07)) * 0.25;
        w /= 1.75;
        float dist = length(uCamPos - vWorld);
        float att = clamp(1.0 - dist / 2600.0, 0.0, 1.0);
        vec3 N = normalize(vec3(dFdx(w) * 34.0 * att, 1.0, dFdy(w) * 34.0 * att));
        vec3 deep = mix(vec3(0.075, 0.26, 0.34), vec3(0.015, 0.05, 0.10), uNight);
        vec3 shallow = mix(vec3(0.13, 0.42, 0.47), vec3(0.03, 0.09, 0.14), uNight);
        vec3 col = mix(deep, shallow, w * w);
        vec3 V = normalize(uCamPos - vWorld);
        float fres = pow(1.0 - max(dot(vec3(0, 1, 0), V), 0.0), 2.2);
        col = mix(col, uAmbSky * (1.1 - 0.5 * uNight), fres * 0.75);
        vec3 R = reflect(-uSunDir, N);
        float spec = pow(max(dot(R, V), 0.0), 220.0) * (1.4 - uNight * 0.7) * (0.25 + 0.75 * att);
        // broad sun-glitter streak on the horizon-facing water
        vec2 sunH = normalize(uSunDir.xz + vec2(1e-5));
        vec2 vH = normalize(-V.xz + vec2(1e-5));
        float streak = pow(max(dot(sunH, vH), 0.0), 22.0) * pow(1.0 - abs(V.y), 3.0) * 0.35 * max(uSunDir.y + 0.05, 0.0);
        col += uSunColor * (spec + streak);
        gl_FragColor = vec4(applyFog(col, dist), 1.0);
      }`,
  });
}

export function foamMaterial(env) {
  return SM({
    uniforms: env,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform float uTime, uNight;
      uniform vec3 uCamPos;
      varying vec2 vUv;
      varying vec3 vWorld;
      ${FOG_GLSL}
      void main() {
        float wavePhase = sin(uTime * 0.9 + vUv.x * 0.05);
        float band = fract(vUv.y + wavePhase * 0.22 + uTime * 0.05);
        float a = smoothstep(0.0, 0.25, band) * (1.0 - smoothstep(0.45, 1.0, band));
        a *= 0.32 + 0.20 * sin(uTime * 1.7 + vUv.x * 0.21);
        a *= (1.0 - uNight * 0.55);
        float f = exp(-uFogDensity * uFogDensity * pow(length(uCamPos - vWorld), 2.0));
        gl_FragColor = vec4(vec3(0.93, 0.97, 1.0), a * clamp(f, 0.0, 1.0));
      }`,
  });
}

// -------------------------------------------------------------------- sky --
export function skyMaterial(env) {
  return SM({
    uniforms: env,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = (projectionMatrix * mv).xyww;
      }`,
    fragmentShader: `
      uniform vec3 uSunDir, uSunColor, uAmbSky, uFogColor;
      uniform float uNight;
      varying vec3 vDir;
      float hash13(vec3 p3) {
        p3 = fract(p3 * 0.1031);
        p3 += dot(p3, p3.zyx + 31.32);
        return fract((p3.x + p3.y) * p3.z);
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 zenithDay = mix(vec3(0.35, 0.56, 0.80), vec3(0.03, 0.05, 0.12), uNight);
        vec3 horizon = mix(uFogColor, uFogColor * 1.1, 0.5);
        vec3 col = mix(horizon, zenithDay, pow(h, 0.62));
        float sunAmt = pow(max(dot(d, uSunDir), 0.0), 900.0);
        float glow = pow(max(dot(d, uSunDir), 0.0), 14.0);
        col += uSunColor * (sunAmt * 1.6 + glow * 0.16) * (1.0 - uNight * 0.75);
        // stars
        vec3 sp = floor(d * 380.0);
        float star = step(0.9985, hash13(sp)) * uNight * smoothstep(0.04, 0.3, d.y);
        col += vec3(star) * (0.5 + 0.5 * hash13(sp + 7.0));
        // city glow near horizon at night
        col += vec3(0.32, 0.22, 0.12) * uNight * pow(1.0 - h, 5.0);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
}

// ------------------------------------------------- instanced static things --
export function instancedMaterial(env, opts = {}) {
  return SM({
    uniforms: { ...env, uEmColor: { value: new THREE.Color(opts.emColor || '#ffc27d') } },
    vertexShader: `
      attribute vec3 aInstColor;
      attribute float aEm;
      varying vec3 vColor;
      varying vec3 vNormalW;
      varying vec3 vWorld;
      varying float vEm;
      void main() {
        vColor = aInstColor;
        vEm = aEm;
        mat4 im = instanceMatrix;
        vec4 wp = im * vec4(position, 1.0);
        vWorld = wp.xyz;
        vNormalW = normalize(mat3(im) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos, uEmColor;
      uniform float uNight;
      varying vec3 vColor;
      varying vec3 vNormalW;
      varying vec3 vWorld;
      varying float vEm;
      ${FOG_GLSL}
      void main() {
        vec3 N = normalize(vNormalW);
        float lam = max(dot(N, uSunDir), 0.0);
        vec3 hemi = mix(uAmbGround, uAmbSky, N.y * 0.5 + 0.5);
        vec3 col = vColor * (uSunColor * lam + hemi * 1.05);
        // aEm 1 = warm lamp at night, 2 = red, 3 = white headlight
        if (vEm > 0.5) {
          vec3 e = uEmColor;
          if (vEm > 2.5) e = vec3(1.0, 0.97, 0.85);
          else if (vEm > 1.5) e = vec3(1.0, 0.16, 0.12);
          col = mix(col, e * 1.6, uNight * 0.96);
        }
        gl_FragColor = vec4(applyFog(col, length(uCamPos - vWorld)), 1.0);
      }`,
  });
}

// ---------------------------------------------------------- lamp halo dots --
export function haloMaterial(env) {
  return SM({
    uniforms: env,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform vec3 uCamPos;
      varying float vFade;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float d = length(mv.xyz);
        gl_PointSize = clamp(3000.0 / d, 2.5, 26.0);
        vFade = clamp(1.0 - d / 15000.0, 0.0, 1.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uNight;
      varying float vFade;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float a = smoothstep(0.5, 0.04, length(c));
        gl_FragColor = vec4(vec3(1.0, 0.72, 0.42) * 1.5, a * a * uNight * vFade * 0.85);
      }`,
  });
}
