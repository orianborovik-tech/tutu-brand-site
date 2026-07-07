/**
 * Experience — the singleton that owns the WebGL world (system file 30).
 * Any module can `new Experience()` to reach camera/renderer/resources.
 */
import * as THREE from 'three';
import gsap from 'gsap';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Debug from './Utils/Debug.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import sources from './sources.js';

let instance = null;

export default class Experience {
  constructor({ canvas, tier = 2, reducedMotion = false } = {}) {
    if (instance) return instance;
    instance = this;

    this.canvas = canvas;
    this.tier = tier;
    this.reducedMotion = reducedMotion;
    this.paused = false;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(sources, this.renderer.instance);
    this.world = new World();

    // Shared uniforms: sections/scroll write, materials read (30/31)
    this.uniforms = {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uSectionProgress: { value: 0 },
      uVelocity: { value: 0 },
    };

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', (dt, elapsed) => this.update(dt, elapsed));

    if (this.debug.active) window.__exp = this; // verification hook (?debug only)
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update(dt, elapsed) {
    if (this.paused) return;
    this.uniforms.uTime.value = elapsed;
    this.camera.update(dt);
    this.world.update(dt, elapsed);
    this.sectionManager?.update(dt);
    this.renderer.update(); // render LAST
  }

  pause() { this.paused = true; gsap.ticker.sleep?.(); }
  resume() { this.paused = false; gsap.ticker.wake?.(); }

  /** Warm-up: compile shaders + render frames under the preloader (34). */
  async warmUp() {
    if (this.renderer.instance.compileAsync) {
      await this.renderer.instance.compileAsync(this.scene, this.camera.instance);
    }
    this.renderer.update();
    this.renderer.update();
  }

  destroy() {
    this.time.off('tick');
    this.sizes.off('resize');
    this.scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          for (const v of Object.values(m)) if (v && v.isTexture) v.dispose();
          m.dispose();
        }
      }
    });
    this.renderer.instance.dispose();
    instance = null;
  }
}
