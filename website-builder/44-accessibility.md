# 44 — Accessibility

**Role:** Award-tier a11y on a WebGL-heavy site: three-level reduced motion, semantic DOM behind the canvas, designed keyboard nav, contrast over live pixels. The reference sites score 7.4 here — this system ships better BY DEFAULT (it's also what the Developer Award jury scores).
**Phase:** 6 (HARDEN) — with hooks planted from Phase 5.
**Inputs:** the built site. **Outputs:** an accessible experience without losing the show.
**Upstream:** `13` (split-text discipline), `31`, `33`, `34` · **Downstream:** `51`.

---

## prefers-reduced-motion — THREE levels (all required)

1. **CSS:** `@media (prefers-reduced-motion: reduce)` — transitions/animations to minimal; smooth-scroll off.
2. **JS/GSAP:** gate at boot (`40` invariant #2): don't instantiate Lenis; one-shot entrances become
   instant end-states (`gsap.set`); scrubbed narrative timelines jump to final states per section
   (content order intact); SplitText reveals render as plain visible text; preloader = simple fade (`34`).
3. **WebGL:** camera cuts instead of flights; idle/breathing loops frozen or minimal; particles
   static or removed; autoplaying video → posters (`16`).

The reduced experience is a DESIGNED calm version — complete content, correct layout, zero motion
sickness triggers — not a broken one. Test it as its own deliverable.

## Semantic DOM behind the canvas

- Real HTML document under the visuals: one `h1` (the real headline text, even if displayed via
  WebGL/split letters), logical heading order, `<main>/<nav>/<section>/<footer>` landmarks.
- Canvas: `aria-hidden="true"` + all decorative layers likewise; every split-text container keeps
  the REAL string (`aria-label` on container, spans `aria-hidden` — `13`); WebGL-replaced text has
  its visually-hidden DOM twin (SEO + AT — the reference-class pattern: sr-only real h1/h2 behind
  the visual hero).
- Images: meaningful `alt` (in-voice but informative); decorative → `alt=""`.
- The loader announces progress (`role="status" aria-live="polite"` — `34`); state changes
  (menu open, variant switch) announced via aria-expanded/live regions.

## Keyboard

- EVERYTHING interactive reachable and operable by keyboard; DOM order = visual order.
- `:focus-visible` DESIGNED with the same care as hover (`33`) — on-concept ring/underline/fill,
  never `outline: none` without a designed replacement.
- Skip link ("דלג לתוכן") first in DOM, visible on focus. Menus/modals: focus trap + Escape +
  focus return. Scroll-jacked moments must be escapable — keyboard scrolling works throughout
  (Lenis native-scroll benefit, `31`).
- Sound toggle keyboard-operable (`36`); easter eggs never trap focus.

## Contrast over live pixels

- Body text ≥ 4.5:1, large display ≥ 3:1 — measured against the WORST-CASE frame behind it
  (screenshot mid-animation, busiest video frame `16`), not the mockup.
- Guarantee with designed scrims/gradient zones where text sits over WebGL/video — a scrim is an
  art-direction element (`12`), not a patch.
- Never color-only signals (add icon/label/underline).

## RTL & language (Hebrew sites)

`dir="rtl"` + `lang="he"` correct throughout (mixed-language spans get their own `lang`);
logical properties (`13`); focus order follows RTL reading order; screen-reader pass in Hebrew
(VoiceOver reads niqqud text correctly post-subsetting — `42`).

---

## ✓ Verification

- [ ] Reduced-motion run (emulate + real OS setting): all three levels active — screenshots per section, zero motion.
- [ ] Keyboard-only full journey: reach and operate everything; focus always visible and designed; no traps (recording).
- [ ] Screen-reader pass (VoiceOver/NVDA): headline story reads in order; canvas silent; split text reads as words, not letters.
- [ ] Landmarks + heading outline valid (one h1; axe/Lighthouse A11y ≥ 90, report saved).
- [ ] Contrast measured over worst-case frames (list the 3 riskiest text placements + their ratios).
- [ ] Skip link works; modals trap and return focus; Escape closes.
- [ ] alt-text audit (every img listed with its alt).
- [ ] RTL: direction, focus order, mixed-language spans, niqqud rendering — all verified visually.
