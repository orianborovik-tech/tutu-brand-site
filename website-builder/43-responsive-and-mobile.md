# 43 — Responsive & Mobile

**Role:** Mobile as a first-class DESIGNED experience — not a shrunken desktop. Jurors judge on their phones first; most rejections are mobile rejections. Dual-canvas design, touch parity, viewport reality, thermal reality.
**Phase:** 6 (HARDEN) — but the dual canvas is designed in Phase 2 (`12`).
**Inputs:** the built site. **Outputs:** a mobile experience that stands alone.
**Upstream:** `12` (fluid system), `31`, `41` · **Downstream:** `51`.

---

## The dual-canvas doctrine (from `12`)

Design exists on TWO artboards: 1440 and 375. The vw-rem scaling handles everything between;
**one behavior fork** at ~810–1024px via `gsap.matchMedia()` + CSS — layouts change, not just sizes:

```js
const mm = gsap.matchMedia();
mm.add('(min-width: 810px)', () => { /* desktop pins, camera paths, cursor systems */ });
mm.add('(max-width: 809px)', () => { /* mobile: shorter/no pins, simplified choreography */ });
// matchMedia auto-reverts everything created inside on breakpoint change — build ALL scroll code inside these
```

## Mobile re-choreography (not reduction)

- **Pins:** shorten to ≤ 150% or replace with one-shot reveals — thumb-scrolling through a 300%
  pin is a chore on touch. The CLIMAX keeps its moment, restaged for portrait.
- **Camera:** portrait recomposition — the hero must be composed FOR 9:16 (closer, different pose),
  not center-cropped. Every `data-camera-state` gets a mobile pose variant.
- **Type:** the 375 canvas h0 (display scale drops from ~23vw-class to fit portrait); line counts
  re-checked against COPY.md `max-lines @375` (`14`).
- **Media:** mobile crop anchors from SHOT-LIST (`15`); 720p video sources (`16`); images from the
  srcset ladder (`42`).

## Touch parity (`33` enforced)

- ALL hover-revealed content: tap-to-toggle or always-visible on `pointer: coarse`.
- Cursor/magnetic systems cleanly disabled on coarse pointers.
- Tap targets ≥ 44×44px. Swipeable elements (carousels) get real touch physics (inertia), and
  NEVER hijack vertical scroll — horizontal gestures only within clearly-bounded components.
- `touch-action` set deliberately where gestures live; no 300ms-delay relics; no double-tap-zoom
  traps on interactive elements.

## Viewport reality (iOS especially)

- `100svh` for full-screen sections (`dvh` for elements that should track the URL bar);
  NEVER bare `100vh` (iOS overflow bug).
- URL-bar show/hide fires resize storms: resize the renderer immediately, debounce ~150ms for
  expensive reallocation (`30`); pins must survive it (`invalidateOnRefresh`).
- Safe areas: `env(safe-area-inset-*)` on fixed chrome (nav, toggle, cookie bar).
- Landscape phones: design a real state for it — a designed "rotate" interstitial is acceptable
  ONLY if portrait genuinely can't work; otherwise support it simply.
- `syncTouch: false` in Lenis (native touch scroll — `31`); fast-flick test: no white gaps, no
  drifted fixed elements.

## Mobile performance & thermal reality (`41` applied)

DPR cap 2 (never 3); tier-appropriate features (post off/reduced, shadows 512–1024 or none);
`precision mediump` where safe (~2× fragment throughput); mobile LOD for the hero (15–25k tris);
IO-gated video; the runtime governor is MANDATORY on mobile — 3-minute session test (thermal
throttling hits 30–50% and doesn't recover while hot).

## The mobile test matrix (real, not emulated-only)

320 / 375 / 390 / 428 widths · portrait + landscape · iOS Safari (the strictest — dvh, audio
unlock, memory kills near 1–1.5GB) + Android Chrome mid-tier · slow-3G first load · fast-flick
scroll · rotate mid-scroll · background-return (tab switch, screen lock → context restore).

---

## ✓ Verification

- [ ] All scroll/motion code lives inside gsap.matchMedia blocks (grep ScrollTriggers created outside — zero).
- [ ] 375px walkthrough: every beat re-choreographed (screenshots per beat, portrait) — nothing is a shrunken desktop.
- [ ] Hero composed for 9:16 (screenshot 390×844 — model framed deliberately).
- [ ] Copy line counts hold at 375 (COPY.md max-lines audit).
- [ ] Touch parity sweep: every hover feature reachable by tap; coarse-pointer disables desktop systems.
- [ ] svh/dvh audit (grep 100vh — zero bare uses); URL-bar resize survives mid-scroll pins.
- [ ] Safe-area insets on all fixed chrome (notch-device screenshot).
- [ ] Real-device matrix run and logged (device, OS, results) — including the 3-minute thermal session.
- [ ] Fast-flick: no white gaps, no drift (slow-mo recording).
