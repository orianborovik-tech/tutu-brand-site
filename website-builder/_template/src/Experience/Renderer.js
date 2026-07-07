import * as THREE from 'three';
import Experience from './Experience.js';

/**
 * Renderer — the non-negotiable baseline from system file 21,
 * with tier-aware DPR caps from file 41.
 */
export default class Renderer {
  constructor() {
    this.experience = new Experience();
    const { canvas, sizes, tier } = this.experience;

    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: true, // turn OFF if/when SMAA lives in a composer (41)
      powerPreference: 'high-performance',
      stencil: false,
    });

    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    // TODO_DECIDE(21): tone mapping BY TABLE — ACESFilmic punchy / AgX saturated brands / Neutral color-true
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.0;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.dprCap = tier >= 3 ? 2 : tier === 2 ? 1.5 : 1; // 41 tier ladder
    this.resize();

    // Runtime governor hook (41): rolling frame-time watchdog steps quality down
    this._frameTimes = [];
    this._degraded = 0;
  }

  resize() {
    const { width, height } = this.experience.sizes;
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, this.dprCap));
  }

  update() {
    const t0 = performance.now();
    this.instance.render(this.experience.scene, this.experience.camera.instance);
    this._govern(performance.now() - t0);
  }

  /** Degradation ladder: DPR −25% → (post off) → shadows off. Never steps back up. */
  _govern(frameMs) {
    this._frameTimes.push(frameMs);
    if (this._frameTimes.length < 120) return;
    const sorted = [...this._frameTimes].sort((a, b) => a - b);
    const median = sorted[sorted.length >> 1];
    this._frameTimes.length = 0;
    if (median > 22 && this._degraded < 2) { // ~<45fps sustained
      this._degraded++;
      if (this._degraded === 1) {
        this.dprCap = Math.max(1, this.dprCap - 0.5);
        this.resize();
      } else {
        this.instance.shadowMap.enabled = false;
      }
    }
  }
}
