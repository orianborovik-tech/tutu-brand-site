# 30 — Scene Architecture

**Role:** The code skeleton of the WebGL experience: Experience singleton, nested group rig, single RAF, resource manager, resize/DPR plumbing, disposal discipline. Every generated site emits this same shape — orchestration varies, architecture doesn't.
**Phase:** 5 (EXPERIENCE) — scaffolded via `40`.
**Inputs:** approved model + world. **Outputs:** `src/Experience/` of the generated site.
**Upstream:** `24`–`26`, `40` · **Downstream:** `31` (scroll drives it), `41` (budgets police it).

---

## The Experience singleton (corpus-standard skeleton — emit verbatim)

```
src/Experience/
  Experience.js       # singleton (if (instance) return instance); owns canvas, wires everything
  Camera.js           # PerspectiveCamera (+ OrbitControls behind ?debug)
  Renderer.js         # WebGLRenderer per 21 baseline; DPR cap; render()
  sources.js          # asset manifest: [{ name, type, path }]
  Utils/
    Sizes.js          # width/height/DPR; ResizeObserver; emits 'resize'
    Time.js           # bridges gsap.ticker; emits 'tick' with dt (clamped ≤ 1/30)
    Resources.js      # GLTF+Meshopt/Draco+KTX2 loaders, one LoadingManager → 'progress'/'ready'
    EventEmitter.js   # tiny pub/sub
    Debug.js          # lil-gui + stats behind ?debug
  World/
    World.js          # builds contents on resources 'ready'
    Environment.js    # IBL, lights, background, fog (from 23/25)
    <Hero>.js         # the model: load, name-lookup parts, material upgrades, update(dt)
  Scroll/
    ScrollManager.js  # Lenis+ScrollTrigger bootstrap (31)
    SectionManager.js # section state machine (31)
    CameraPath.js     # spline or poses (31)
  Shaders/<effect>/vertex.glsl + fragment.glsl
```

Any class reaches shared state via `new Experience()` — no prop-drilling. Everything per-frame
exposes `update(dt)`; Experience calls camera → world → sections → **renderer last**. Everything
disposable exposes `destroy()`.

## The nested group rig (motion layers that never fight)

```
scene
└─ scrollGroup   ← scroll choreography writes here (31)
   └─ mouseGroup  ← cursor parallax: gsap.quickTo(rotation, 0.6s power3) — ±2–4°
      └─ idleGroup ← idle drift/breathing loop (visibility-gated)
         └─ model  ← the hero (armature/baked personality animations live on it)
```

Each influence owns ONE group — scroll, cursor, and idle compose without overwriting each other.
GSAP is the single animation authority for DOM AND WebGL (tween object properties directly);
mixer-based glTF animations are scrubbed via `mixer.setTime()` inside GSAP tweens at narrative beats.

## Render loop discipline

- **ONE RAF for the whole page**: `gsap.ticker` owns it — Lenis rafs inside it (`31`), Experience
  subscribes to it. Two RAFs = guaranteed judder. (`renderer.setAnimationLoop` only if GSAP absent.)
- Frame-rate independence: all smoothing via `THREE.MathUtils.damp(a, b, lambda, dt)` — never raw
  `lerp(a, b, 0.1)` (FPS-dependent). Clamp dt ≤ 1/30 (tab-switch spikes).
- **Zero allocations in update()**: reuse Vector3/Quaternion temps; no `new`, no
  `getBoundingClientRect` per frame (cache on resize).
- Pause the ticker when `document.hidden`; remove the render from the ticker when the canvas is
  fully offscreen. Every animated loop (Lottie/video/shader) is visibility-gated in all four scroll
  directions — the reference-proven perf secret.

## One canvas, one world

- Never multiple WebGL contexts (browser cap ~8–16). ONE fixed canvas.
- **One continuous scene restaged per section** (visibility, light lerps, background color, fog,
  camera pose — via SectionManager) beats multiple scenes: cheaper, more cinematic, enables morph
  transitions. Scissored viewports only for independent 3D widgets; render-targets for portals/crossfades.
- Global uniforms object (`uTime, uScrollProgress, uSectionProgress, uVelocity`) shared by all
  shader materials — sections write, materials read.

## Resources & warm-up

- `sources.js` manifest + ONE LoadingManager → preloader progress (`34`). Loaders: GLTFLoader with
  MeshoptDecoder (default) / DRACOLoader (if used), KTX2Loader with `.detectSupport(renderer)`.
- After 'ready': `await renderer.compileAsync(scene, camera)` + render 1–2 warm-up frames UNDER the
  preloader — kills the first-scroll shader-compile hitch (`34`).
- Textures: anisotropy `min(8, max)` on ground planes; correct colorSpace (`21`).

## Resize & lifecycle invariants

- ResizeObserver on the container (not window resize) + DPR-change listener
  (`matchMedia('(resolution: …dppx)')`); update camera.aspect, renderer size/DPR, composer size;
  `ScrollTrigger.refresh()` after size settles. `svh/dvh` for full-screen sections; debounce ~150ms
  for expensive reallocation, resize the renderer immediately.
- `webglcontextlost` → preventDefault + reload UI. `history.scrollRestoration = 'manual'`.
- `destroy()`: kill ScrollTriggers, traverse scene (geometry.dispose, material+texture dispose),
  renderer.dispose, lenis.destroy — verified via `renderer.info.memory` returning to baseline.

## Debug rig (always shipped, hidden)

`?debug` URL param → lil-gui panels (per-scene tweakables: light intensities, env rotation, fog,
camera poses), stats.js, OrbitControls toggle, ScrollTrigger markers. The system uses this rig for
its OWN verification loops (`04`, `24`) — generate it first, not last.

---

## ✓ Verification

- [ ] File tree matches the skeleton; Experience is a real singleton (two constructions return same instance).
- [ ] Group rig in place: scroll/mouse/idle each write to their OWN group (inspect the graph).
- [ ] Exactly one RAF owner (search for requestAnimationFrame/setAnimationLoop — one path only).
- [ ] No allocations in update paths (read the update() bodies; temps hoisted).
- [ ] All loops visibility-gated (scroll past each section — offscreen loops actually pause; check with ?debug stats).
- [ ] compileAsync + warm-up frames run before reveal (log order proves it).
- [ ] Resize: 320↔1920 drag + DPR change → no distortion, no stale ScrollTrigger positions.
- [ ] destroy() leaves renderer.info.memory at baseline (run a create→destroy cycle, record numbers).
- [ ] ?debug rig works (screenshot of gui + stats).
