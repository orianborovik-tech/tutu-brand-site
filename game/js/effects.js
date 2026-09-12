// Post-processing: HDR render → bloom → lens (vignette, chromatic aberration, grain) → tone-mapped output.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const LensShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.55 },
    uAberration: { value: 0.012 },
    uGrain: { value: 0.035 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uAberration;
    uniform float uGrain;
    varying vec2 vUv;
    float hash(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);
      float ab = uAberration * r2;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ab).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ab).b;
      float vig = 1.0 - uVignette * smoothstep(0.25, 1.0, sqrt(r2) * 1.45);
      col *= vig;
      col += (hash(vUv * vec2(1920.0, 1080.0) + fract(uTime) * 7.0) - 0.5) * uGrain * (0.4 + 0.6 * (1.0 - vig));
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export function createEffects(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2());
  const target = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.55, 0.5, 1.0);
  composer.addPass(bloom);
  const lens = new ShaderPass(LensShader);
  composer.addPass(lens);
  composer.addPass(new OutputPass());

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { lens.uniforms.uGrain.value = 0; lens.uniforms.uAberration.value = 0.004; }

  function setSize(w, h) {
    composer.setSize(w, h);
    bloom.setSize(w, h);
  }
  setSize(size.x, size.y);
  function render(dt) {
    lens.uniforms.uTime.value += dt;
    composer.render(dt);
  }
  return { composer, bloom, lens, setSize, render };
}
