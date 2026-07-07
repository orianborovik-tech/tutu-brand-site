# 35 — Page Transitions

**Role:** Route changes as designed moments — while keeping the WebGL context, loaded assets, and 60fps alive. Also: when NOT to have pages at all.
**Phase:** 5 (EXPERIENCE) — only if the deliverable is multi-page.
**Inputs:** deliverable type (BRIEF), IA (`11`).
**Outputs:** the transition engine + per-page lifecycle.
**Upstream:** `30` (persistent canvas), `32` (motion tokens) · **Downstream:** `41` (leak discipline), `45` (Shopify pages).

---

## Rule 1: default is ONE page

Narrative brand sites rarely need routes — anchors + the section state machine (`31`) cover
"pages". Add routes only for: shop/catalog (`45`), legal, genuinely separate content. The
cross-document View Transitions API tears down WebGL contexts — it CANNOT provide canvas
persistence (fine for content-page → content-page, never for the experience shell).

## The persistent-canvas SPA pattern (Taxi.js / Barba-class, or hand-rolled)

- The canvas and Experience live OUTSIDE the swapped container — WebGL context, compiled shaders,
  and loaded assets persist across navigation. 3D loads ONCE per session.
- Interception → `leave` animation → fetch + DOM swap (`main`, body class, title) → `enter`
  animation. A hand-rolled engine is ~100 lines: XHR + DOMParser + history handling — no dependency
  needed if routes are few.
- **Per-page controller classes** with `constructor()` / `kill()` lifecycle:
  - `kill()` MUST: kill this page's ScrollTriggers, unregister listeners, dispose page-specific
    geometries/materials/textures (GPU leaks across transitions are THE classic bug — verify
    `renderer.info.memory` returns to baseline after a nav cycle).
  - Keep an explicit tween registry per page — everything created gets killed.
- After swap: `lenis.scrollTo(0, { immediate: true })` → rebuild page controller →
  `ScrollTrigger.refresh()` → enter animation.

## Transition design (on-concept, tiny, fast)

- **The cover** emanates from the CLICK POINT (circle/motif shape scaling from exact cursor
  coordinates) or is a full-screen wipe in the motif shape (`12`). Sub-2KB is achievable (a tiny
  Lottie blob or one SVG path) — the transition asset must never cost more than it hides.
- Timing: leave ≤ 0.5s, enter ≤ 0.8s, and remember exits-faster-than-entrances (`32`). The old page
  leaves fast; the new one arrives with ceremony.
- Keep the transition shell an ISOLATED tiny bundle (loads before everything, owns z-index
  `--z-transition`) so route feedback is instant even mid-load.
- During transition: scroll locked, pointer-events none, focus moved to the new page's h1
  (a11y — `44`), scroll position reset deliberately (back-button restores via history state).
- Nav links to the CURRENT page: no-op with a designed micro-response, never a reload.

## State across pages

- Scene state machine gets a `route` dimension: each page declares its scene mood (camera pose,
  world state) via data-attributes on `<main>` — the persistent world RE-STAGES per route
  (`30`/`31` mechanics) instead of rebuilding.
- Shared element continuity (product card → product hero) when routes are commerce (`45`): FLIP
  the DOM element + tween the 3D model between poses simultaneously.

---

## ✓ Verification

- [ ] Single-page default challenged: every route justified in writing, or removed.
- [ ] Canvas + Experience OUTSIDE the swap container (navigate: context id stable, no re-load of GLB — network tab proof).
- [ ] kill() completeness: nav A→B→A ×5 — renderer.info.memory and ScrollTrigger.getAll().length back to baseline (numbers recorded).
- [ ] Cover emanates from click point / motif wipe; transition assets ≤ a few KB (list sizes).
- [ ] Leave ≤ 0.5s, enter ≤ 0.8s; scroll locked during; focus lands on new h1.
- [ ] Back/forward buttons behave (history state + scroll positions correct).
- [ ] Current-page links no-op gracefully.
- [ ] Transition shell isolated and instant even on cold cache (throttled run).
