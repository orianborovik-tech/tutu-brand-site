import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience.js';
import { MOTION } from '../../motion.js';

/**
 * CameraPath (31) — both proven patterns; pick per concept:
 *   MODE 'poses'  (default): pose-to-pose states, quaternion tweens, ≥80vh sections
 *   MODE 'spline': continuous fly-through on a CatmullRom curve, damped, arc-length
 * Author poses with ?debug OrbitControls + window.__logPose(), paste below.
 */
const MODE = 'poses'; // TODO_DECIDE(31): 'poses' | 'spline' per the concept's camera language

const POSES = {
  // TODO_DECIDE(31): authored per project — position + lookAt per data-camera-state
  hero:     { position: [0, 0.4, 4],    lookAt: [0, 0.2, 0] },
  'beat-1': { position: [1.6, 0.5, 2.4], lookAt: [0, 0.2, 0] },
  'beat-2': { position: [-1.2, 0.9, 2.0], lookAt: [0, 0.3, 0] },
  cta:      { position: [0, 0.6, 3.2],  lookAt: [0, 0.2, 0] },
  footer:   { position: [0, 1.4, 5],    lookAt: [0, 0, 0] },
};

const SPLINE_POINTS = [
  // TODO_DECIDE(31): control points for spline mode
  new THREE.Vector3(0, 0.4, 4),
  new THREE.Vector3(1.5, 0.6, 2.5),
  new THREE.Vector3(0, 1.0, 1.8),
];

export default class CameraPath {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.camera.path = this;
    this._lookAt = new THREE.Vector3(0, 0.2, 0);
    // helper must be a CAMERA: camera.lookAt aims -Z, plain Object3D aims +Z (180° flip bug)
    this._tmp = new THREE.PerspectiveCamera();

    if (MODE === 'spline') {
      this.curve = new THREE.CatmullRomCurve3(SPLINE_POINTS, false, 'catmullrom', 0.5);
      this.target = 0;
      this.current = 0;
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.create({
          trigger: document.body, start: 'top top', end: 'bottom bottom',
          onUpdate: (self) => { this.target = self.progress; },
        });
      });
    }
  }

  /** poses mode: quaternion + position tween — NEVER Euler tweens (gimbal) */
  goTo(stateName, _direction) {
    if (MODE !== 'poses') return;
    const pose = POSES[stateName];
    if (!pose) return;

    this._tmp.position.set(...pose.position);
    this._tmp.lookAt(...pose.lookAt);

    const cam = this.camera.instance;
    gsap.to(cam.position, {
      x: pose.position[0], y: pose.position[1], z: pose.position[2],
      duration: MOTION.dur.hero, ease: MOTION.ease.scene, overwrite: 'auto',
    });
    gsap.to(cam.quaternion, {
      x: this._tmp.quaternion.x, y: this._tmp.quaternion.y,
      z: this._tmp.quaternion.z, w: this._tmp.quaternion.w,
      duration: MOTION.dur.hero, ease: MOTION.ease.scene, overwrite: 'auto',
    });
  }

  /** spline mode: damped scroll-follow, constant speed, look-ahead */
  update(dt) {
    if (MODE !== 'spline') return;
    this.current = THREE.MathUtils.damp(this.current, this.target, 4, dt);
    const cam = this.camera.instance;
    cam.position.copy(this.curve.getPointAt(this.current)); // getPointAt = arc-length
    this._lookAt.copy(this.curve.getPointAt(Math.min(this.current + 0.02, 1))); // look-ahead
    cam.lookAt(this._lookAt);
  }
}
