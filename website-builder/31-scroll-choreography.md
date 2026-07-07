# 31 — Scroll Choreography

**Role:** The scroll system: Lenis + ScrollTrigger bootstrap (the one true setup), the two-grammar rule, pinned narrative sections, scroll-driven cameras, the section state machine, and DOM↔WebGL sync. Scroll IS the storytelling instrument.
**Phase:** 5 (EXPERIENCE).
**Inputs:** beat sheet world-states (`11`), scene (`30`), motion tokens (`32`).
**Outputs:** the site's complete scroll behavior.
**Upstream:** `11`, `30` · **Downstream:** `32` (parameters), `34` (refresh timing), `43` (mobile forks).

---

## The one true bootstrap (once per site, before any ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ anchors: true });         // autoRaf stays false — gsap.ticker owns RAF
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
history.scrollRestoration = 'manual';                // + scroll to top on load
```

- Lenis animates NATIVE scrollTop → no scrollerProxy, anchors/a11y/keyboard keep working (why it won).
- `lerp: 0.05–0.08` for heavy cinematic feel, default 0.1 otherwise. `syncTouch: false` (mobile native).
- `data-lenis-prevent` on modals/nested scrollers. Import `lenis/dist/lenis.css`.
- Reduced motion → don't instantiate Lenis; scrubs become instant states (`44`).
- Never combine with `ScrollTrigger.normalizeScroll` — Lenis owns that domain.
- `ScrollTrigger.refresh()` after: fonts ready, preloader out, any lazy content (`34` sequences it).

## The two-grammar rule (mixed, never uniform)

1. **Scrub grammar** — environment & world: `scrub: true` for WebGL-bound values (camera, model
   rotation, seam morphs), `scrub: 0.5–1` for DOM (numeric scrub hides scroll-step quantization).
   Tween durations inside scrubbed timelines are PROPORTIONS of scroll distance; `ease:'none'` on
   anything tracking scroll linearly.
2. **One-shot grammar** — content: entrances with `start: 'top 85–97%'`, once, eased (`32`'s house
   reveal), never scrubbed. Content should not wiggle with the thumb.

World reacts to scroll; content arrives on cue; the hero object can also LIVE on time (idle loop)
— "character reacts to time, world reacts to scroll" reads alive even when scrolling stops.

## Pinned narrative sections (the transformation beats)

```js
gsap.timeline({ scrollTrigger: {
  trigger: '#beat-3', start: 'top top', end: '+=2500',   // scroll DISTANCE = pacing
  scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
}})
.to(model.rotation, { y: Math.PI * 2, ease: 'none' }, 0)
.to(camera.position, { z: 4, ease: 'none' }, 0)
.fromTo('.beat-3 .headline', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1 }, 0.2);
```

- Pin distances 150–300% viewport per major beat; NEVER animate the pinned element itself (children only).
- Pinning is a spice: climax + 1–2 transformation beats. Reference sites win SOTD with light pinning — restraint reads as confidence.
- Snapping (`snap: 'labels'` / Lenis snap) only for chaptered experiences; skip when flow feels organic.
- `gsap.matchMedia()` forks: shorter pins or none on mobile (`43`).
- Velocity as material: `self.getVelocity()` → `uVelocity` uniform (lerped to 0) for speed-reactive distortion/marquees.

## Scroll-driven cameras (pick per concept)

**A — Spline fly-through** (one world, camera on rails):
```js
const path = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
// one full-page ScrollTrigger writes target = self.progress; in update():
current = THREE.MathUtils.damp(current, target, 4, dt);
camera.position.copy(path.getPointAt(current));                    // getPointAt = arc-length (constant speed)
camera.lookAt(focus ?? path.getPointAt(Math.min(current + 0.02, 1))); // look-ahead .001 tight → .04–.06 smooth
```
**B — Pose-to-pose** (sections teleport between authored poses): sections ≥ 80vh carry
`data-camera-state`; tween `camera.position` + **quaternion** (compute target quat via temp camera
lookAt; NEVER tween Euler — gimbal). Author poses with `?debug` OrbitControls, log & paste.
**C — Theatre.js scrubbed sequence** — only for hand-keyframed hero choreography; heaviest.

## Section state machine

Sections register `{ enter(dir), leave(dir), update(progress, dt) }` via ScrollTriggers
(`start:'top 50%', end:'bottom 50%'`, onToggle → setActive). enter/leave lerp: visibility sets,
light targets, background Color tween, fog density, post intensity — the environment ARC follows
the story (`25`). SectionManager.update() runs from the render loop, not per-event.

## Seams & chrome (the personality carriers)

- Section seams are designed (`12`): SVG arc dividers scaleY-scrubbed, path morphs, color-world
  flips at exact scroll lines. The seam animation belongs to the scrub grammar.
- Scroll-aware chrome: nav/logo invert per section (`data-theme` triggers), hide-on-scroll-down
  header, progress indicator if the concept wants one.
- DOM↔WebGL sync: fixed canvas + Lenis = zero drift (default). Mirroring DOM rects in GL: 1 world
  unit = 1 px via `camera.position.z = (h/2)/tan(fov/2)`; cache rects on resize, position per frame
  from the lerped scroll. 3D→DOM labels: `project(camera)` → screen px, hide when z > 1.

---

## ✓ Verification

- [ ] Bootstrap exact (single RAF, scrollRestoration manual, refresh sequenced after fonts+preloader).
- [ ] Two grammars audited: every ScrollTrigger is deliberately scrub OR one-shot (list them; no accidental scrubbed content).
- [ ] Pins: ≤ 3 pinned beats, anticipatePin set, children-only animation, distances tuned (scroll-feel pass).
- [ ] Camera: damped, arc-length parameterized (A) / quaternion pose tweens ≥80vh sections (B); no Euler tweens anywhere (grep rotation tweens on camera).
- [ ] Full scroll pass at 60fps (recorded frame times, desktop) and no white gaps on fast mobile flicks.
- [ ] Resize mid-scroll: pins don't desync (drag-resize at 3 scroll depths).
- [ ] Refresh mid-page lands correctly; keyboard scrolling + anchor links work.
- [ ] Section enter/leave states fire in both directions (scroll up AND down through every seam).
- [ ] Reduced motion: page fully readable with Lenis off and scrubs as instant states.
