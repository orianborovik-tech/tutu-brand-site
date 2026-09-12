// The survey rover: cannon-es raycast vehicle (6 wheels) + procedural PBR mesh
// with articulating suspension struts, headlights and telemetry.
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { heightAt } from './terrain-math.js';

export const ROVER = {
  mass: 900,
  wheelRadius: 0.5,
  wheelWidth: 0.42,
  wheelX: [1.25, 0, -1.25],
  wheelZ: 1.05,
  maxSpeed: 19.5,     // m/s (~70 km/h)
  maxReverse: 6,
  maxForce: 5600,     // N, total across wheels
  brake: 34,
  regen: 1.1,
};

const MAT = {
  ceramic: new THREE.MeshStandardMaterial({ color: '#dcdad2', roughness: 0.58, metalness: 0.05 }),
  foil: new THREE.MeshStandardMaterial({ color: '#c9a24a', roughness: 0.3, metalness: 1.0 }),
  dark: new THREE.MeshStandardMaterial({ color: '#33363a', roughness: 0.5, metalness: 0.85 }),
  alu: new THREE.MeshStandardMaterial({ color: '#9aa0a6', roughness: 0.48, metalness: 0.9 }),
  lug: new THREE.MeshStandardMaterial({ color: '#4a4d50', roughness: 0.9, metalness: 0.3 }),
  panel: new THREE.MeshPhysicalMaterial({ color: '#0d1633', roughness: 0.18, metalness: 0.4, clearcoat: 1, clearcoatRoughness: 0.08 }),
  led: new THREE.MeshStandardMaterial({ color: '#0a2a14', emissive: '#5cf58a', emissiveIntensity: 2.5, roughness: 0.4 }),
  tail: new THREE.MeshStandardMaterial({ color: '#3a0d05', emissive: '#ff4a1f', emissiveIntensity: 0.6, roughness: 0.4 }),
  lens: new THREE.MeshStandardMaterial({ color: '#c8d8e0', emissive: '#ffe6b0', emissiveIntensity: 0.0, roughness: 0.15, metalness: 0.2 }),
  glass: new THREE.MeshPhysicalMaterial({ color: '#111820', roughness: 0.1, metalness: 0.2, clearcoat: 1 }),
};

function makeDecalTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 160;
  const g = c.getContext('2d');
  function draw() {
    g.clearRect(0, 0, 512, 160);
    // split emblem: green / orange
    g.beginPath(); g.arc(80, 80, 52, Math.PI / 2, -Math.PI / 2); g.closePath();
    g.fillStyle = '#5cf58a'; g.fill();
    g.beginPath(); g.arc(80, 80, 52, -Math.PI / 2, Math.PI / 2); g.closePath();
    g.fillStyle = '#ff6a1f'; g.fill();
    g.fillStyle = '#0d0f0e';
    g.beginPath(); g.arc(80, 80, 20, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#111';
    g.font = '900 78px "Big Shoulders Display", "Arial Narrow", sans-serif';
    g.textBaseline = 'middle';
    g.fillText('TUTU', 160, 66);
    g.font = '500 26px "IBM Plex Mono", monospace';
    g.fillStyle = '#2a2a2a';
    g.fillText('SURVEY UNIT 07', 162, 122);
    g.fillStyle = '#ff6a1f';
    g.fillRect(400, 108, 90, 26);
    g.fillStyle = '#111';
    g.font = '700 20px "IBM Plex Mono", monospace';
    g.fillText('EXP-1', 412, 121);
    tex.needsUpdate = true;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  draw();
  if (document.fonts?.ready) document.fonts.ready.then(draw);
  return tex;
}

function makePanelTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#0f1a3a'; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = '#8c96a8'; g.lineWidth = 3;
  for (let i = 0; i <= 256; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.stroke(); }
  g.strokeStyle = '#2b3d6e'; g.lineWidth = 1;
  for (let i = 16; i < 256; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke(); }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}

function makeWheelMesh(side) {
  const r = ROVER.wheelRadius, w = ROVER.wheelWidth;
  const parts = [];
  const rim = new THREE.CylinderGeometry(r, r, w, 28, 1, false);
  rim.rotateX(Math.PI / 2);
  parts.push(rim);
  const lugCount = 14;
  for (let i = 0; i < lugCount; i++) {
    const a = (i / lugCount) * Math.PI * 2;
    const lug = new THREE.BoxGeometry(0.09, 0.05, w + 0.02);
    lug.translate(0, r + 0.02, 0);
    lug.rotateZ(a);
    parts.push(lug);
  }
  const tyre = BufferGeometryUtils.mergeGeometries(parts.slice(1));
  const wheel = new THREE.Group();
  const rimMesh = new THREE.Mesh(rim, MAT.alu);
  rimMesh.castShadow = true;
  wheel.add(rimMesh);
  const lugMesh = new THREE.Mesh(tyre, MAT.lug);
  lugMesh.castShadow = true;
  wheel.add(lugMesh);
  // hub + spokes on the outer face
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, w + 0.06, 16).rotateX(Math.PI / 2), MAT.alu);
  wheel.add(hub);
  const spokeGeo = [];
  for (let i = 0; i < 6; i++) {
    const s = new THREE.BoxGeometry(0.06, r * 0.86, 0.04);
    s.translate(0, r * 0.45, side * (w / 2 + 0.01));
    s.rotateZ((i / 6) * Math.PI * 2);
    spokeGeo.push(s);
  }
  const spokes = new THREE.Mesh(BufferGeometryUtils.mergeGeometries(spokeGeo), MAT.alu);
  wheel.add(spokes);
  return wheel;
}

function buildRoverMesh() {
  const g = new THREE.Group();
  const cast = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };

  const body = cast(new THREE.Mesh(new RoundedBoxGeometry(2.7, 0.5, 1.7, 4, 0.08), MAT.ceramic));
  body.position.y = 0.42; g.add(body);
  const deck = cast(new THREE.Mesh(new RoundedBoxGeometry(2.95, 0.22, 1.9, 3, 0.05), MAT.foil));
  deck.position.y = 0.12; g.add(deck);

  // solar array
  const panelMat = MAT.panel.clone(); panelMat.map = makePanelTexture();
  const panel = cast(new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.04, 1.45), panelMat));
  panel.position.y = 0.69; g.add(panel);

  // front sensor bar + headlights
  const bar = cast(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 1.55), MAT.dark));
  bar.position.set(1.45, 0.36, 0); g.add(bar);
  const lensMat = MAT.lens.clone();
  const lensGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.06, 16).rotateZ(Math.PI / 2);
  const lenses = [];
  for (const z of [-0.6, 0.6]) {
    const l = new THREE.Mesh(lensGeo, lensMat); l.position.set(1.54, 0.36, z); g.add(l); lenses.push(l);
  }
  // tail unit with fins + tail lights
  const tail = cast(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.62), MAT.dark));
  tail.position.set(-1.55, 0.5, 0); g.add(tail);
  for (let i = 0; i < 5; i++) {
    const fin = cast(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.9), MAT.alu));
    fin.position.set(-1.55, 0.36 + i * 0.07, 0); g.add(fin);
  }
  const tailMat = MAT.tail.clone();
  for (const z of [-0.72, 0.72]) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.22), tailMat);
    t.position.set(-1.47, 0.3, z); g.add(t);
  }
  // mast + camera head
  const mast = cast(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.5, 10), MAT.alu));
  mast.position.set(0.9, 1.4, -0.45); g.add(mast);
  const head = cast(new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.22, 0.5, 2, 0.03), MAT.ceramic));
  head.position.set(0.9, 2.2, -0.45); g.add(head);
  for (const z of [-0.6, -0.3]) {
    const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.08, 12).rotateZ(Math.PI / 2), MAT.glass);
    eye.position.set(1.08, 2.2, z); g.add(eye);
  }
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.46), MAT.led);
  led.position.set(0.9, 2.08, -0.45); g.add(led);
  // high-gain antenna
  const aMast = cast(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.9, 8), MAT.alu));
  aMast.position.set(-0.95, 1.1, 0.5); g.add(aMast);
  const dishPts = [];
  for (let i = 0; i <= 10; i++) { const r = (i / 10) * 0.42; dishPts.push(new THREE.Vector2(r, r * r * 1.1)); }
  const dish = cast(new THREE.Mesh(new THREE.LatheGeometry(dishPts, 24), new THREE.MeshStandardMaterial({ color: '#e8e6dd', roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide })));
  dish.position.set(-0.95, 1.58, 0.5);
  dish.rotation.set(-0.5, 0, -0.25); g.add(dish);
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3, 6), MAT.dark);
  feed.position.set(-0.95, 1.7, 0.5); feed.rotation.copy(dish.rotation); g.add(feed);
  // side decals
  const decal = makeDecalTexture();
  const decalMat = new THREE.MeshStandardMaterial({ map: decal, transparent: true, roughness: 0.6, metalness: 0.05, polygonOffset: true, polygonOffsetFactor: -1 });
  for (const s of [-1, 1]) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.4), decalMat);
    d.position.set(0.1, 0.42, s * 0.86);
    d.rotation.y = s > 0 ? 0 : Math.PI;
    d.scale.x = s > 0 ? 1 : 1; g.add(d);
  }
  // suspension frame beams
  for (const s of [-1, 1]) {
    const beam = cast(new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.1, 0.1), MAT.dark));
    beam.position.set(0, 0.02, s * 0.92); g.add(beam);
  }
  // headlights (spot lights)
  const lights = [];
  for (const z of [-0.6, 0.6]) {
    const sl = new THREE.SpotLight('#ffe9c4', 0, 75, 0.5, 0.55, 1.4);
    sl.position.set(1.5, 0.4, z);
    sl.target.position.set(14, -1.6, z * 1.6);
    g.add(sl); g.add(sl.target);
    lights.push(sl);
  }
  // struts (one per wheel), oriented each frame
  const strutGeo = new THREE.CylinderGeometry(0.055, 0.055, 1, 10).rotateX(Math.PI / 2);
  const struts = [];
  for (let i = 0; i < 6; i++) {
    const s = cast(new THREE.Mesh(strutGeo, MAT.alu));
    g.add(s); struts.push(s);
  }
  return { group: g, lenses, lensMat, tailMat, lights, struts };
}

export function createVehicle(scene, physics, spawn) {
  const { world } = physics;
  const chassisShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.3, 0.98));
  const chassisBody = new CANNON.Body({ mass: ROVER.mass, material: physics.rockMaterial });
  chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.3, 0));
  chassisBody.angularDamping = 0.35;
  chassisBody.linearDamping = 0.03;
  chassisBody.allowSleep = false;

  const vehicle = new CANNON.RaycastVehicle({ chassisBody, indexRightAxis: 2, indexUpAxis: 1, indexForwardAxis: 0 });
  const wheelOpts = {
    radius: ROVER.wheelRadius,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 26,
    suspensionRestLength: 0.42,
    frictionSlip: 1.7,
    dampingRelaxation: 3.0,
    dampingCompression: 4.4,
    maxSuspensionForce: 60000,
    rollInfluence: 0.06,
    axleLocal: new CANNON.Vec3(0, 0, 1),
    chassisConnectionPointLocal: new CANNON.Vec3(),
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };
  const wheelSides = [];
  for (const x of ROVER.wheelX) {
    for (const s of [-1, 1]) {
      wheelOpts.chassisConnectionPointLocal.set(x, -0.02, s * ROVER.wheelZ);
      vehicle.addWheel(wheelOpts);
      wheelSides.push(s);
    }
  }
  vehicle.addToWorld(world);

  const mesh = buildRoverMesh();
  scene.add(mesh.group);
  const wheelMeshes = wheelSides.map((s) => { const w = makeWheelMesh(s); scene.add(w); return w; });

  const telemetry = {
    speed: 0, speedSigned: 0, rpm01: 0, slip: 0, onGround: 1, airborne: false,
    suspensionImpulse: 0, steering: 0, throttle: 0, brake: 0, impact: 0, heading: 0,
  };
  const contacts = wheelSides.map(() => ({ hit: false, point: new THREE.Vector3(), speed: 0 }));

  const forward = new THREE.Vector3(1, 0, 0);
  const position = new THREE.Vector3();
  const velocity = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const tmpV = new THREE.Vector3();
  const tmpV2 = new THREE.Vector3();
  const prevSusp = new Float32Array(6).fill(0.42);
  const strutDir = new THREE.Vector3();
  const Z_AXIS = new THREE.Vector3(0, 0, 1);
  let steer = 0;
  let impactPending = 0;

  chassisBody.addEventListener('collide', (e) => {
    const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
    if (v > 1.5) impactPending = Math.max(impactPending, Math.min(1, v / 12));
  });

  function place(x, z, yaw) {
    const y = heightAt(x, z) + 1.6;
    chassisBody.position.set(x, y, z);
    chassisBody.quaternion.setFromEuler(0, yaw, 0);
    chassisBody.velocity.set(0, 0, 0);
    chassisBody.angularVelocity.set(0, 0, 0);
    for (const w of vehicle.wheelInfos) { w.suspensionLength = w.suspensionRestLength; w.rotation = 0; }
    steer = 0;
  }
  place(spawn.x, spawn.z, spawn.yaw ?? Math.PI / 2);

  function curve(u) { u = Math.min(1, Math.max(0, u)); return Math.max(0, 1 - Math.pow(u, 1.6)); }

  // Called before each physics step with the current input.
  function drive(input, dt) {
    quat.set(chassisBody.quaternion.x, chassisBody.quaternion.y, chassisBody.quaternion.z, chassisBody.quaternion.w);
    forward.set(1, 0, 0).applyQuaternion(quat);
    velocity.set(chassisBody.velocity.x, chassisBody.velocity.y, chassisBody.velocity.z);
    const vFwd = velocity.dot(forward);
    const speed = velocity.length();

    const maxSteer = THREE.MathUtils.lerp(0.62, 0.2, Math.min(1, speed / 18));
    const target = input.steer * maxSteer;
    const rate = 3.4 * dt;
    steer += THREE.MathUtils.clamp(target - steer, -rate, rate);
    vehicle.setSteeringValue(steer, 0);
    vehicle.setSteeringValue(steer, 1);
    vehicle.setSteeringValue(-steer * 0.75, 4);
    vehicle.setSteeringValue(-steer * 0.75, 5);

    let engine = 0, brake = ROVER.regen;
    if (input.throttle > 0.01) {
      if (vFwd < -0.6) brake = ROVER.brake;
      else { engine = (ROVER.maxForce / 6) * curve(vFwd / ROVER.maxSpeed) * input.throttle; brake = 0; }
    } else if (input.throttle < -0.01) {
      if (vFwd > 0.6) brake = ROVER.brake;
      else { engine = -(ROVER.maxForce / 6) * 0.65 * curve(-vFwd / ROVER.maxReverse) * -input.throttle; brake = 0; }
    }
    if (input.brake) brake = ROVER.brake * 1.5;
    for (let i = 0; i < 6; i++) {
      vehicle.applyEngineForce(engine, i);
      vehicle.setBrake(brake, i);
    }
    telemetry.throttle = input.throttle;
    telemetry.brake = input.brake ? 1 : 0;
  }

  // Called after the physics step(s): sync meshes and telemetry.
  function sync(dt) {
    position.set(chassisBody.position.x, chassisBody.position.y, chassisBody.position.z);
    quat.set(chassisBody.quaternion.x, chassisBody.quaternion.y, chassisBody.quaternion.z, chassisBody.quaternion.w);
    mesh.group.position.copy(position);
    mesh.group.quaternion.copy(quat);
    mesh.group.updateMatrixWorld(true);
    forward.set(1, 0, 0).applyQuaternion(quat);
    velocity.set(chassisBody.velocity.x, chassisBody.velocity.y, chassisBody.velocity.z);

    let grounded = 0, slipSum = 0, impulse = 0;
    for (let i = 0; i < 6; i++) {
      vehicle.updateWheelTransform(i);
      const w = vehicle.wheelInfos[i];
      const t = w.worldTransform;
      const wm = wheelMeshes[i];
      wm.position.set(t.position.x, t.position.y, t.position.z);
      wm.quaternion.set(t.quaternion.x, t.quaternion.y, t.quaternion.z, t.quaternion.w);
      const c = contacts[i];
      c.hit = !!w.raycastResult.hasHit;
      if (c.hit) {
        grounded++;
        c.point.set(w.raycastResult.hitPointWorld.x, w.raycastResult.hitPointWorld.y, w.raycastResult.hitPointWorld.z);
        slipSum += 1 - Math.min(1, Math.max(0, w.skidInfo));
      }
      const ds = Math.abs(w.suspensionLength - prevSusp[i]) / Math.max(dt, 1e-3);
      impulse = Math.max(impulse, ds / 5);
      prevSusp[i] = w.suspensionLength;
      // strut: from a frame anchor to the wheel hub (chassis-local)
      const strut = mesh.struts[i];
      const s = wheelSides[i];
      tmpV.set(ROVER.wheelX[Math.floor(i / 2)], 0.02, s * 0.92);           // anchor (local)
      tmpV2.copy(wm.position); mesh.group.worldToLocal(tmpV2);              // hub (local)
      strut.position.copy(tmpV).lerp(tmpV2, 0.5);
      strutDir.copy(tmpV2).sub(tmpV);
      strut.scale.z = Math.max(0.05, strutDir.length());
      strut.quaternion.setFromUnitVectors(Z_AXIS, strutDir.normalize());
    }
    telemetry.speed = velocity.length();
    telemetry.speedSigned = velocity.dot(forward);
    telemetry.onGround = grounded / 6;
    telemetry.airborne = grounded === 0;
    telemetry.slip = grounded ? slipSum / grounded : 0;
    telemetry.rpm01 = Math.min(1, Math.abs(vehicle.wheelInfos[2].deltaRotation) / (dt || 1 / 60) / (ROVER.maxSpeed / ROVER.wheelRadius));
    telemetry.suspensionImpulse = Math.min(1, impulse);
    telemetry.steering = steer / 0.62;
    telemetry.heading = Math.atan2(forward.x, -forward.z);
    telemetry.impact = impactPending; impactPending = 0;
    telemetry.upright = tmpV.set(0, 1, 0).applyQuaternion(quat).y;
  }

  function setNight(n01) {
    const on = THREE.MathUtils.smoothstep(n01, 0.25, 0.6);
    for (const l of mesh.lights) l.intensity = on * 170;
    mesh.lensMat.emissiveIntensity = on * 2.4;
    mesh.tailMat.emissiveIntensity = 0.6 + on * 1.6 + telemetry.brake * 1.5;
  }

  function reset() {
    const yaw = Math.atan2(-forward.z, forward.x);
    place(position.x, position.z, Number.isFinite(yaw) ? yaw : Math.PI / 2);
  }
  function teleport(x, z, yaw = Math.PI / 2) { place(x, z, yaw); }

  return {
    chassisBody, vehicle, group: mesh.group, wheelMeshes, telemetry, contacts,
    position, forward, velocity, drive, sync, setNight, reset, teleport,
  };
}
