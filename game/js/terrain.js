// Terrain mesh: vertex-coloured PBR surface with brand-specific shader details
// (hex seams, lava cracks, crater core glow, mirror salt flat, micro grain).
import * as THREE from 'three';
import {
  WORLD_SIZE, GRID_N, REGIONS, heightAt, regionMasks, hexCell, HEX_SIZE, smoothstep,
} from './terrain-math.js';
import { createNoise } from './noise.js';

const N = createNoise(777);

const srgb = (hex) => new THREE.Color(hex); // ColorManagement converts hex → linear

const PAL = {
  dust: srgb('#b0863f'), dustLight: srgb('#d2b26a'), rock: srgb('#5a4630'), basalt: srgb('#2a2624'),
  amber: srgb('#c98a2c'), craterDark: srgb('#6a4a24'), core: srgb('#ffd27a'),
  hexTile: srgb('#c96a1e'), hexTile2: srgb('#e0902c'), seam: srgb('#3d3a36'),
  lava: srgb('#1c1a19'), lavaSlab: srgb('#3a3230'),
  spire: srgb('#9c7a45'), smoke: srgb('#d8cc9c'), salt: srgb('#cfd4c4'),
  canyonRed: srgb('#a34a25'), canyonBrown: srgb('#7a5636'), canyonOchre: srgb('#c88a3c'),
  wall: srgb('#4a3d2e'),
};

// Periodic value noise for a tileable normal map.
function periodicNoise(x, y, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const h = (i, j) => N.hash2(((i % period) + period) % period + 31, ((j % period) + period) % period + 17);
  const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
  return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
}

export function createProceduralNormalMap(size = 256) {
  const hmap = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      let h = 0;
      h += periodicNoise(u * 6, v * 6, 6) * 0.55;
      h += periodicNoise(u * 14, v * 14, 14) * 0.28;
      h += periodicNoise(u * 40, v * 40, 40) * 0.12;
      h += periodicNoise(u * 90, v * 90, 90) * 0.05;
      hmap[y * size + x] = h;
    }
  }
  const data = new Uint8Array(size * size * 4);
  const strength = 6.0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = hmap[y * size + ((x - 1 + size) % size)], r = hmap[y * size + ((x + 1) % size)];
      const d = hmap[((y - 1 + size) % size) * size + x], u = hmap[((y + 1) % size) * size + x];
      let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
      const i = (y * size + x) * 4;
      data[i] = (nx * 0.5 + 0.5) * 255; data[i + 1] = (ny * 0.5 + 0.5) * 255; data[i + 2] = (nz * 0.5 + 0.5) * 255; data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export function vertexColor(x, z, y, slope, out) {
  const m = regionMasks(x, z);
  const grain = N.fbm(x * 0.08, z * 0.08, 3) * 0.5 + 0.5; // 0..1
  const patch = N.fbm(x * 0.012 + 40, z * 0.012 - 20, 3) * 0.5 + 0.5;
  // base dunes: dust → rock by slope, with patches
  out.copy(PAL.dust).lerp(PAL.dustLight, patch * 0.7).lerp(PAL.rock, smoothstep(0.25, 0.7, slope));
  out.multiplyScalar(0.85 + grain * 0.3);

  const tmp = _tmpColor;
  if (m.crater > 0) {
    const c = REGIONS.crater; const d = Math.hypot(x - c.x, z - c.z);
    const band = 0.5 + 0.5 * Math.sin(d * 0.55);
    tmp.copy(PAL.amber).lerp(PAL.craterDark, band * 0.8);
    tmp.lerp(PAL.core, 1 - smoothstep(4, 20, d));
    tmp.lerp(PAL.rock, smoothstep(0.45, 0.8, slope) * 0.6);
    out.lerp(tmp, m.crater);
  }
  if (m.hex > 0) {
    const cell = hexCell(x, z, HEX_SIZE);
    const tv = N.hash2(cell.id[0] * 3 + 5, cell.id[1] * 5 + 9);
    tmp.copy(PAL.hexTile).lerp(PAL.hexTile2, tv);
    tmp.lerp(PAL.seam, 1 - smoothstep(0.2, 1.1, cell.edge));
    out.lerp(tmp, m.hex);
  }
  if (m.lava > 0) {
    tmp.copy(PAL.lava).lerp(PAL.lavaSlab, grain);
    out.lerp(tmp, m.lava);
  }
  if (m.spires > 0) {
    tmp.copy(PAL.spire).multiplyScalar(0.8 + grain * 0.4);
    out.lerp(tmp, m.spires);
  }
  if (m.smoke > 0) {
    tmp.copy(PAL.smoke).multiplyScalar(0.9 + grain * 0.2);
    out.lerp(tmp, m.smoke);
  }
  if (m.flat > 0) {
    tmp.copy(PAL.salt).multiplyScalar(0.95 + grain * 0.1);
    out.lerp(tmp, m.flat);
  }
  if (m.canyon > 0) {
    const s = 0.5 + 0.5 * Math.sin(y * 1.9 + grain * 2);
    tmp.copy(PAL.canyonRed).lerp(PAL.canyonBrown, s).lerp(PAL.canyonOchre, smoothstep(0.6, 0.9, N.fbm(y * 0.7, x * 0.02, 2) * 0.5 + 0.5) * 0.7);
    out.lerp(tmp, m.canyon);
  }
  const edge = Math.max(Math.abs(x), Math.abs(z));
  out.lerp(PAL.wall, smoothstep(200, 226, edge) * 0.85);
  return out;
}
const _tmpColor = new THREE.Color();

const SHADER_HEAD = /* glsl */`
uniform float uTime;
uniform float uNight;
uniform vec3 uCrater;
uniform vec3 uHex;
uniform vec3 uLava;
uniform vec3 uFlat;
varying vec3 vWPos;
float thash(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
float tnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(thash(i), thash(i + vec2(1, 0)), f.x), mix(thash(i + vec2(0, 1)), thash(i + vec2(1, 1)), f.x), f.y); }
float tridged(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { float n = 1.0 - abs(tnoise(p) * 2.0 - 1.0); s += n * n * a; a *= 0.5; p = p * 2.1 + vec2(3.7, 1.3); } return s; }
float rmask(vec3 r, vec2 p, float feather) { float d = distance(p, r.xy); return 1.0 - smoothstep(r.z - feather, r.z, d); }
float hexEdgeGL(vec2 p, float R) {
  vec2 s = vec2(1.7320508 * R, 3.0 * R);
  vec2 a = mod(p, s) - s * 0.5;
  vec2 b = mod(p - s * 0.5, s) - s * 0.5;
  vec2 q = (dot(a, a) < dot(b, b)) ? a : b;
  q = abs(q);
  float ap = 0.8660254 * R;
  return max(0.0, min(ap - q.x, ap - (0.5 * q.x + 0.8660254 * q.y)));
}
`;

export function createTerrain(scene, normalMap) {
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, GRID_N - 1, GRID_N - 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const col = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    pos.setY(i, heightAt(x, z));
  }
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
    const slope = 1 - nrm.getY(i);
    vertexColor(x, z, y, slope, col);
    colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeBoundingSphere();

  const uniforms = {
    uTime: { value: 0 },
    uNight: { value: 0 },
    uCrater: { value: new THREE.Vector3(REGIONS.crater.x, REGIONS.crater.z, REGIONS.crater.radius) },
    uHex: { value: new THREE.Vector3(REGIONS.hex.x, REGIONS.hex.z, REGIONS.hex.radius) },
    uLava: { value: new THREE.Vector3(REGIONS.lava.x, REGIONS.lava.z, REGIONS.lava.radius) },
    uFlat: { value: new THREE.Vector3(REGIONS.flat.x, REGIONS.flat.z, REGIONS.flat.radius) },
  };

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.0,
    normalMap,
    normalScale: new THREE.Vector2(0.75, 0.75),
    envMapIntensity: 0.6,
  });
  normalMap.repeat.set(52, 52);

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\n' + SHADER_HEAD)
      .replace('#include <color_fragment>', /* glsl */`
        #include <color_fragment>
        vec2 wp = vWPos.xz;
        float grain = tnoise(wp * 1.9) * 0.6 + tnoise(wp * 7.3) * 0.4;
        diffuseColor.rgb *= 0.82 + grain * 0.36;
        float lavaM = rmask(uLava, wp, 22.0);
        float flatM = rmask(uFlat, wp, 18.0);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.55, lavaM * smoothstep(0.75, 0.95, tridged(wp * 0.045 + vec2(9.0, -4.0))));
      `)
      .replace('#include <roughnessmap_fragment>', /* glsl */`
        #include <roughnessmap_fragment>
        roughnessFactor = mix(roughnessFactor, 0.10, flatM);
        roughnessFactor = mix(roughnessFactor, 0.6, lavaM * 0.5);
      `)
      .replace('#include <emissivemap_fragment>', /* glsl */`
        #include <emissivemap_fragment>
        float hexM = rmask(uHex, wp, 24.0);
        if (hexM > 0.001) {
          float e = hexEdgeGL(wp, ${HEX_SIZE.toFixed(1)});
          float seam = 1.0 - smoothstep(0.03, 0.42, e);
          float pulse = 0.75 + 0.25 * sin(uTime * 0.9 + wp.x * 0.05 + wp.y * 0.07);
          totalEmissiveRadiance += vec3(1.0, 0.55, 0.12) * seam * hexM * 1.5 * pulse;
        }
        if (lavaM > 0.001) {
          float r = tridged(wp * 0.045 + vec2(9.0, -4.0));
          float crack = smoothstep(0.75, 0.95, r);
          float heat = 0.8 + 0.2 * sin(uTime * 2.1 + wp.x * 0.3) * sin(uTime * 1.3 + wp.y * 0.2);
          totalEmissiveRadiance += mix(vec3(1.0, 0.12, 0.0), vec3(1.0, 0.75, 0.2), crack) * crack * lavaM * 4.0 * heat;
        }
        float dcr = distance(wp, uCrater.xy);
        float coreM = 1.0 - smoothstep(4.0, 22.0, dcr);
        totalEmissiveRadiance += vec3(1.0, 0.62, 0.2) * coreM * coreM * 3.0 * (0.85 + 0.15 * sin(uTime * 0.7));
        float ring = pow(0.5 + 0.5 * sin(dcr * 0.55), 14.0) * (1.0 - smoothstep(30.0, 62.0, dcr)) * smoothstep(8.0, 20.0, dcr);
        totalEmissiveRadiance += vec3(1.0, 0.7, 0.3) * ring * 0.7;
      `);
  };
  material.customProgramCacheKey = () => 'tutu-terrain';

  const mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  scene.add(mesh);

  function update(t, night) {
    uniforms.uTime.value = t;
    uniforms.uNight.value = night;
  }
  return { mesh, material, update };
}
