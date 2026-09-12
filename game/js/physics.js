// cannon-es world with the planet heightfield and helpers for static obstacles.
import * as CANNON from 'cannon-es';
import { buildHeightMatrix, ELEMENT_SIZE, HALF } from './terrain-math.js';

export const GRAVITY = 8.9; // m/s², a little lighter than Earth

export function createPhysics() {
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -GRAVITY, 0) });
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.allowSleep = true;
  world.defaultContactMaterial.friction = 0.6;
  world.defaultContactMaterial.restitution = 0.05;
  world.defaultContactMaterial.contactEquationStiffness = 1e7;
  world.defaultContactMaterial.contactEquationRelaxation = 3;

  const groundMaterial = new CANNON.Material('ground');
  const matrix = buildHeightMatrix();
  const shape = new CANNON.Heightfield(matrix, { elementSize: ELEMENT_SIZE });
  const ground = new CANNON.Body({ mass: 0, material: groundMaterial });
  ground.addShape(shape);
  ground.position.set(-HALF, 0, HALF);
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(ground);

  const rockMaterial = new CANNON.Material('rock');

  function addStaticSphere(x, y, z, r) {
    const b = new CANNON.Body({ mass: 0, material: rockMaterial, shape: new CANNON.Sphere(r) });
    b.position.set(x, y, z);
    world.addBody(b);
    return b;
  }
  function addStaticCylinder(x, y, z, rTop, rBottom, h, segments = 8) {
    const b = new CANNON.Body({ mass: 0, material: rockMaterial, shape: new CANNON.Cylinder(rTop, rBottom, h, segments) });
    b.position.set(x, y, z);
    world.addBody(b);
    return b;
  }
  function addStaticBox(x, y, z, hx, hy, hz, yaw = 0) {
    const b = new CANNON.Body({ mass: 0, material: rockMaterial, shape: new CANNON.Box(new CANNON.Vec3(hx, hy, hz)) });
    b.position.set(x, y, z);
    b.quaternion.setFromEuler(0, yaw, 0);
    world.addBody(b);
    return b;
  }

  let accumulator = 0;
  const STEP = 1 / 60;
  function step(dt, before) {
    accumulator += Math.min(dt, 0.1);
    let n = 0;
    while (accumulator >= STEP && n < 4) {
      if (before) before(STEP);
      world.step(STEP);
      accumulator -= STEP;
      n++;
    }
    if (n === 4) accumulator = 0;
    return n;
  }

  return { world, ground, matrix, groundMaterial, rockMaterial, addStaticSphere, addStaticCylinder, addStaticBox, step, STEP };
}
