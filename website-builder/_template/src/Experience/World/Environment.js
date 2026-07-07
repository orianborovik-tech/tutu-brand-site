import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import Experience from '../Experience.js';

/**
 * Environment — REPLACE per project (system files 23/25/26):
 *   case B: recreated background plate + plate-derived IBL + shadow catcher
 *   case A/C: invented archetype + fromScene env so reflections contain the world
 * Template default: RoomEnvironment IBL (zero bytes) + fog-ready scene — engine
 * proof-of-life only; carries no art direction.
 */
export default class Environment {
  constructor(items) {
    this.experience = new Experience();
    const { scene, renderer } = this.experience;

    // IBL: project HDR if the manifest has one, else procedural room (23)
    const pmrem = new THREE.PMREMGenerator(renderer.instance);
    if (items.env) {
      items.env.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = pmrem.fromEquirectangular(items.env).texture;
      items.env.dispose();
    } else {
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    }
    pmrem.dispose();

    // Key light: env maps cast no crisp shadows — one analytic key always (23/26)
    this.key = new THREE.DirectionalLight('#ffffff', 2.5);
    // TODO_DECIDE(23,26): key position from PLATE-SHEET azimuth/elevation, color from plate
    this.key.position.set(3, 4, 2);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(1024, 1024);
    this.key.shadow.bias = -0.0001;
    this.key.shadow.normalBias = 0.03;
    const r = 2; // tighten to modelBoundingRadius * 1.5 when the hero lands (26)
    Object.assign(this.key.shadow.camera, { left: -r, right: r, top: r, bottom: -r });
    scene.add(this.key);

    // TODO_DECIDE(25): background + fog — fog color MUST equal horizon color (the gas-wall rule)
    scene.background = new THREE.Color('#141414');
  }

  update() {
    /* environment life (25): gradient drift / particle float / fog breathing —
       built per project; nothing is perfectly static on an award site */
  }
}
