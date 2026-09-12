// Keyboard, touch and gamepad input → a normalised control state.
export function createInput(root) {
  const state = { throttle: 0, steer: 0, brake: false, any: false };
  const keys = new Set();
  const handlers = { reset: [], mute: [], camera: [], any: [], pause: [] };
  const on = (name, fn) => handlers[name].push(fn);
  const fire = (name) => handlers[name].forEach((f) => f());

  const keyMap = {
    KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down',
    KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right', Space: 'brake', ShiftLeft: 'brake',
  };
  window.addEventListener('keydown', (e) => {
    if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    const k = keyMap[e.code];
    if (k) { keys.add(k); e.preventDefault(); }
    if (!e.repeat) {
      if (e.code === 'KeyR') fire('reset');
      if (e.code === 'KeyM') fire('mute');
      if (e.code === 'KeyC') fire('camera');
      if (e.code === 'Escape') fire('pause');
      if (k || e.code === 'Enter') fire('any'); // driving keys / Enter start the run
    }
  });
  window.addEventListener('keyup', (e) => { const k = keyMap[e.code]; if (k) keys.delete(k); });
  window.addEventListener('blur', () => keys.clear());

  // touch / pointer buttons
  const touch = new Set();
  root.querySelectorAll('[data-hold]').forEach((el) => {
    const act = el.dataset.hold;
    const down = (e) => { touch.add(act); el.classList.add('is-down'); el.setPointerCapture?.(e.pointerId); e.preventDefault(); fire('any'); };
    const up = () => { touch.delete(act); el.classList.remove('is-down'); };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
  root.querySelectorAll('[data-tap]').forEach((el) => {
    el.addEventListener('click', () => fire(el.dataset.tap));
  });

  let padSteer = 0, padThrottle = 0, padBrake = false, padPrev = {};
  function pollGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = pads && [...pads].find((p) => p && p.connected);
    padSteer = 0; padThrottle = 0; padBrake = false;
    if (!gp) return;
    const dz = (v) => (Math.abs(v) < 0.12 ? 0 : v);
    padSteer = -dz(gp.axes[0] || 0);
    const rt = gp.buttons[7]?.value || 0, lt = gp.buttons[6]?.value || 0;
    padThrottle = rt - lt;
    if (gp.axes[1] && Math.abs(gp.axes[1]) > 0.3 && !padThrottle) padThrottle = -dz(gp.axes[1]);
    padBrake = !!gp.buttons[0]?.pressed;
    const edge = (i, name) => { const p = !!gp.buttons[i]?.pressed; if (p && !padPrev[i]) fire(name); padPrev[i] = p; };
    edge(3, 'reset'); edge(2, 'camera'); edge(9, 'pause');
    if (gp.buttons.some((b) => b.pressed)) fire('any');
  }

  function update() {
    pollGamepad();
    const up = keys.has('up') || touch.has('up');
    const down = keys.has('down') || touch.has('down');
    const left = keys.has('left') || touch.has('left');
    const right = keys.has('right') || touch.has('right');
    let throttle = (up ? 1 : 0) - (down ? 1 : 0);
    let steer = (left ? 1 : 0) - (right ? 1 : 0);
    if (!throttle) throttle = padThrottle;
    if (!steer) steer = padSteer;
    state.throttle = Math.max(-1, Math.min(1, throttle));
    state.steer = Math.max(-1, Math.min(1, steer));
    state.brake = keys.has('brake') || touch.has('brake') || padBrake;
    return state;
  }

  return { state, update, on };
}
