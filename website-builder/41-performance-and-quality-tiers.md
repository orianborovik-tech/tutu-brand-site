# 41 — Performance & Quality Tiers

**Role:** The hard numbers (budgets that are contracts, not aspirations), the two-layer adaptive quality system, and frame-budget engineering. Usability is the award ELIMINATOR — beautiful sites that jank get rejected.
**Phase:** 6 (HARDEN) — but budgets are written into the project BEFORE assets are created.
**Inputs:** everything built. **Outputs:** a green budget table + tier system.
**Upstream:** `30`–`36`, `42` · **Downstream:** `51` (preflight reads the numbers).

---

## The budget table (copy into every project; fill with ACTUAL numbers at HARDEN)

| Metric | Budget | Actual | ✓ |
|---|---|---|---|
| LCP (DOM headline, never canvas) | < 1.5s | | |
| CLS | < 0.05 | | |
| INP | < 100ms | | |
| Initial critical path (to first reveal) | ≤ 2.5MB | | |
| JS bundle gzip (three+gsap+lenis+app) | ≤ 200KB gz (styled after ~300KB max) | | |
| Total 3D payload | ≤ 2–4MB | | |
| Hero model GLB | ≤ 1.5–3MB, 30–80k tris (15–25k mobile LOD) | | |
| Scene triangles | ≤ 300k desktop / 150k mobile | | |
| Draw calls | ≤ 150 desktop / 75 mobile (check renderer.info) | | |
| Dynamic lights | ≤ 2 (IBL carries the rest) | | |
| Textures | 1024 default, 2048 hero-only, 4096 never | | |
| Fonts | ≤ 60KB per woff2, ≤ 2 preloaded | | |
| Video payload | ≤ 8–10MB total (`16`) | | |
| FPS | 60 target sustained; 30 floor tier-1 | | |
| Frame budget @60 | ≤ 3ms app JS + ≤ 3ms three CPU + ≤ 8ms GPU | | |

## Two-layer adaptive quality

**Layer 1 — startup tier (detect-gpu):**

| Tier | Meaning | Settings |
|---|---|---|
| 0 | blocklisted/<15fps | **static fallback page** (designed! poster imagery + full content — a judged surface, not an apology) |
| 1 | ≥15fps | DPR 1, no post, no shadows, baked/IBL light only |
| 2 | ≥30fps | DPR ≤1.5, single merged EffectPass, 1024 shadow map or none |
| 3 | ≥60fps | DPR ≤2, full chain |

**Layer 2 — runtime governor:** rolling 60-frame median; if < 45fps for 2s → step down a fixed
ladder: postFX off → DPR −20–25% → shadows off → lock 30fps. **Never step back up** in-session
(oscillation). Phones throttle 30–50% after 2–5 min of WebGL and don't recover while hot — the
governor is not optional.

## The knobs that actually matter

- **DPR is quadratic:** capping iPhone DPR 3→2 is visually identical and ~2.2× faster; every post
  pass costs a fullscreen render × DPR². DPR is degradation knob #1.
- **Draw calls:** merge same-material geometry (`20`), InstancedMesh for repeats, share materials
  (each unique material = program switches). Audit `renderer.info.render.calls` per section.
- **Compositor-only DOM animation:** transform/opacity ONLY; never animate layout properties.
- **Memory discipline:** `scene.remove()` frees NOTHING — recursive dispose helper (geometry,
  material, textures, `texture.source.data.close()` for ImageBitmaps, render targets, loader worker
  pools). Leak detector: `renderer.info.memory` across a full journey must return to baseline.
  iOS Safari kills tabs near 1–1.5GB.
- **Antialias off when SMAA lives in the composer;** `powerPreference:'high-performance'`;
  `stencil:false`. HalfFloat framebuffer for banding-free bloom.
- **Post budget:** ≤ 3–4ms GPU mid-tier; one merged EffectPass (`26` stack); DoF/SSAO/motion-blur
  are tier-3-only (or faked).
- **Loops pause when unseen** (`30`); IO-gated media playback (`16`); render loop off when canvas
  offscreen.

## Measurement protocol (evidence, per `04`)

- **Headless caveat:** headless Chrome renders via SwiftShader (CPU) — its FPS numbers are
  MEANINGLESS. Headless = structure checks (bytes, CLS, draw-call counts via injected
  renderer.info logging). Frame rate = real devices (an old iPhone Safari + a mid-tier Android) or
  at minimum DevTools 4–6× CPU throttle.
- Lighthouse floors: Performance ≥ 80–90 (WebGL-adjusted), A11y ≥ 90 (`44`). Canvas-as-LCP,
  unsized-canvas CLS, and main-thread GLB parse are the three predictable WebGL failure modes
  (fixes: DOM headline paints first `34`; explicit canvas dimensions; decoders + parse off the
  critical path).
- Record: full-scroll frame-time trace (median + worst 1%), renderer.info snapshot per section,
  the filled budget table. These go into SHIP-REPORT.

---

## ✓ Verification

- [ ] Budget table filled with ACTUAL numbers — every row green (or a written, user-visible exception).
- [ ] Tier system live: force tiers via query param — each tier renders correctly incl. the DESIGNED tier-0 static page.
- [ ] Governor tested: CPU-throttle until it fires — ladder steps in order, never steps up.
- [ ] Full-journey leak test: renderer.info.memory baseline → journey → baseline (numbers recorded).
- [ ] Draw calls per section audited (list per section).
- [ ] Real-device pass: mid-tier phone, 3-minute session (thermal) — no death spiral.
- [ ] Lighthouse floors met (report saved); LCP is DOM, CLS < 0.05 verified.
- [ ] No layout-property animations (DevTools paint flashing during a full scroll).
