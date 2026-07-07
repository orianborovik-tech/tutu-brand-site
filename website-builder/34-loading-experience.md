# 34 — Loading Experience

**Role:** The preloader as beat zero of the story — honest (real progress), branded (in-voice), fast, and exiting into the hero as ONE choreographed timeline. The exit IS the first impression.
**Phase:** 5 (EXPERIENCE) — built early; every asset decision feeds it.
**Inputs:** narrative beat 0 (`11`), voice (`14`), asset manifest (`30`).
**Outputs:** the preloader + reveal system.
**Upstream:** `11`, `30` · **Downstream:** `31` (refresh timing), `41` (perceived performance), `44`.

---

## The sequence (all award-tier sites follow this shape)

1. **Instant shell** — preloader markup + critical CSS inlined in `index.html`, visible BEFORE JS;
   background = the site's base token color set in HTML (no white flash, `theme-color` meta matches).
   Scroll locked (`lenis.stop()` / overflow hidden).
2. **Real progress** — ONE LoadingManager for all loaders → `loaded/total` drives the display.
   NEVER fake-random progress. DO smooth it: tween the displayed value toward real progress
   (`gsap.to(display, { value: real, duration: 0.6 })`) and enforce a **minimum display of
   1.2–2.0s** (brand moment reads even on fast connections) and a **maximum of ~2.5s** perceived
   wait before something meaningful moves.
   Byte-accurate variant (heavy sites): build-time byte manifest + ReadableStream accumulation —
   Content-Length lies under brotli/chunked (`42`).
3. **Warm-up under the overlay** — on load complete: `await renderer.compileAsync(scene, camera)`
   → render 1–2 frames → `await document.fonts.ready`. "Ready" = bytes + compile + one rAF. This
   kills the first-scroll shader hitch that separates amateur from award-tier feel.
4. **The reveal — ONE timeline** — counter completes → loader elements exit (mask wipe from the
   motif shape `12`, or click-origin cover) → camera dollies from authored `intro` pose to `hero`
   pose → hero materializes → headline house-reveal (`32`) → `lenis.start()` +
   `ScrollTrigger.refresh()` ONLY after the reveal ends. Loader exit and hero entrance are one
   phrase, never two events.
5. **Orchestration flags** — global state (`data-loader-state` on html/body) gates all page
   entrances: nothing animates while the loader owns the screen; everything queued fires on release.
   A complete contract, not ad-hoc timeouts.

## Loader as brand moment (beat zero)

The loader carries voice (`14` microcopy — rotating lines, a countdown ritual, a joke) or play
(an interactive beat: bounce the ball, hold to charge — if the concept supports it and it never
gates longer than the real load). Revisits within the session SKIP the ceremony (sessionStorage
flag → quick fade).

## Progressive load order (feel-fast choreography, `42`)

DOM shell + subset fonts (this is the LCP — a real DOM headline, not the canvas) → renderer boot →
tiny env map (lighting exists) → hero GLB (byte-tracked, decoders parallel) → compile+warm-up →
reveal → THEN secondary assets via IntersectionObserver at rootMargin 200%. The user must see a
designed screen < 1s even on 3G — the loader is that screen.

## Accessibility & edge paths

- `prefers-reduced-motion` → skip the ceremony: simple fade to loaded state (`44`).
- Load FAILURE path: any asset erroring → graceful degrade (retry once → static-fallback tier `41`),
  never an infinite branded spinner.
- The loader itself is semantic: `role="status"`, `aria-live="polite"` progress announced.

---

## ✓ Verification

- [ ] Shell paints before JS on a throttled 3G run (filmstrip proof); no white flash (theme-color + bg set in HTML).
- [ ] Progress is REAL (throttle network — the number tracks actual bytes/items, smoothed not faked).
- [ ] Min 1.2s / ceremony ≤ 2.5s on fast connection; revisit skips (sessionStorage verified).
- [ ] compileAsync + warm-up frames complete BEFORE reveal (console order log).
- [ ] Reveal is one timeline: loader exit → camera → hero → headline (read the timeline; no orphan tweens).
- [ ] lenis.start() + ScrollTrigger.refresh() fire only post-reveal; first scroll is hitch-free (frame recording of the first scroll).
- [ ] LCP is a DOM element, not the canvas (Lighthouse confirms); LCP < 1.5s target (`41`).
- [ ] Reduced-motion path: fade only. Failure path: unplug an asset — page degrades gracefully.
