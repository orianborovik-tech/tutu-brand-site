import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience.js';

/**
 * Hero — REPLACE with the verified model from the 20–24 pipeline.
 * The GROUP RIG below is the permanent architecture (30): scroll, cursor and
 * idle each own ONE group and never fight. Keep the rig; swap the model.
 */
export default class Hero {
  constructor(items) {
    this.experience = new Experience();
    const { scene } = this.experience;

    // rig: scene → scrollGroup → mouseGroup → idleGroup → model
    this.scrollGroup = new THREE.Group();
    this.mouseGroup = new THREE.Group();
    this.idleGroup = new THREE.Group();
    scene.add(this.scrollGroup);
    this.scrollGroup.add(this.mouseGroup);
    this.mouseGroup.add(this.idleGroup);

    if (items.hero) {
      // The real model (24): re-enable shadows (exporter drops them), upgrade materials by name (21)
      this.model = items.hero.scene;
      this.model.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
      // Personality animation: scrub mixer time at narrative beats via gsap (30)
      if (items.hero.animations?.length) {
        this.mixer = new THREE.AnimationMixer(this.model);
        this.action = this.mixer.clipAction(items.hero.animations[0]);
        this.action.play();
        this.mixer.timeScale = 0; // gsap scrubs mixer.setTime at beats (31)
      }
    } else {
      // PLACEHOLDER — engine proof-of-life only. The real hero comes from YOUR
      // reference image via files 02 → 20 → 24. No design intent here.
      this.model = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.6, 4),
        new THREE.MeshStandardMaterial({ color: '#8a8a8a', roughness: 0.35, metalness: 0.1 }),
      );
      this.model.castShadow = true;
    }
    this.idleGroup.add(this.model);

    // cursor parallax → mouseGroup only (quickTo — 30)
    if (matchMedia('(pointer: fine)').matches && !this.experience.reducedMotion) {
      const rx = gsap.quickTo(this.mouseGroup.rotation, 'x', { duration: 0.6, ease: 'power3' });
      const ry = gsap.quickTo(this.mouseGroup.rotation, 'y', { duration: 0.6, ease: 'power3' });
      this._onMove = (e) => {
        const nx = (e.clientX / innerWidth) * 2 - 1;
        const ny = (e.clientY / innerHeight) * 2 - 1;
        ry(nx * 0.06); rx(ny * 0.04); // ±2–4° — presence, not seasickness
      };
      window.addEventListener('mousemove', this._onMove);
    }
  }

  update(dt, elapsed) {
    // idle life → idleGroup only; visibility-gated by Experience.pause (30)
    if (!this.experience.reducedMotion) {
      this.idleGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.04;
      this.idleGroup.position.y = Math.sin(elapsed * 0.4) * 0.015;
    }
    this.mixer?.update(dt);
  }

  destroy() { window.removeEventListener('mousemove', this._onMove); }
}
