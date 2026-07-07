import * as THREE from 'three';
import Experience from './Experience.js';

/**
 * Camera (30/31). fov is a COMPOSITING decision when a background plate exists:
 * product plates need fov 15–30, never the default 50 (system file 26).
 */
export default class Camera {
  constructor() {
    this.experience = new Experience();
    const { width, height } = this.experience.sizes;

    // TODO_DECIDE(26,31): fov from PLATE-SHEET (EXIF/estimate) or concept
    this.instance = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    this.instance.position.set(0, 0.4, 4);
    this.experience.scene.add(this.instance);

    this._initDebug();
  }

  resize() {
    const { width, height } = this.experience.sizes;
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
  }

  update(dt) {
    this.path?.update?.(dt); // CameraPath drives position when active (31)
  }

  async _initDebug() {
    if (!this.experience.debug.active) return;
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    this.controls = new OrbitControls(this.instance, this.experience.canvas);
    // Pose authoring (31 pattern B): move camera, read console, paste into CameraPath.POSES
    window.__logPose = () =>
      console.log(JSON.stringify({
        position: this.instance.position.toArray().map((v) => +v.toFixed(3)),
        target: this.controls.target.toArray().map((v) => +v.toFixed(3)),
      }));
  }
}
