# 32 — Motion Language

**Role:** The project's motion identity: a SMALL fixed grammar of eases, durations, staggers, and house moves that every animation on the site obeys. Consistency here is what jurors read as craft (Animations 9.20 was the reference's highest score).
**Phase:** 2 (defined with the concept) + applied through 5.
**Inputs:** CONCEPT motion personality + object physics (`01` §3.5). **Outputs:** motion tokens (in `tokens.css` + a `motion.js` twin) + the house-move library.
**Upstream:** `10`, `12` · **Downstream:** every animated thing: `31`, `33`, `34`, `35`.

---

## Principle: one grammar, many sentences

Award-tier motion = a few decisions applied relentlessly, not many clever moments. Define ONCE:

1. **One house ease family** (per motion personality):
   - *Elastic-playful*: anticipation `power2.in` → settle `elastic.out(1, 0.5–0.75)` (jelly physics)
   - *Cinematic-premium*: `expo.out` entrances, `expo.inOut` scene moves
   - *Brutal-instant*: `power4.out` hard arrivals, near-zero durations, steps() accents
   Define one CustomEase as THE brand curve, shared by CSS and JS:
   `CustomEase.create('house', '0.24,1,0.36,1')` + `--ease-house` token — single source.
2. **Duration tokens** — `--dur-micro: 0.15–0.2s` (feedback) · `--dur-ui: 0.3–0.5s` ·
   `--dur-reveal: 0.6–0.9s` · `--dur-hero: 1.2–2.5s` (cinematic only). Nothing off-token.
3. **One stagger unit** — pick ~0.07s (range 0.05–0.15 by personality); chars 0.02–0.05s. Every
   cascade on the site is a multiple of the unit.
4. **The physics constitution** (from the object's personality): does this world overshoot? bounce?
   snap? A jelly product bounces everywhere (buttons too); a granite brand never bounces. ONE answer.

## The house rules (defaults with teeth)

- **Anticipation → action → settle** for every big move (wind-up `power2.in`, then arrival with
  overshoot/settle per personality). Big moves have three acts.
- **Exits are 1.5–2× faster than entrances** (close fast, open with ceremony). Menus/modals: reverse
  is quicker than forward.
- **Entrances decelerate (out-eases); exits accelerate (in-eases).** Linear only inside scrubs.
- **Bounded randomness:** one-shot random tilts ±5°, precomputed layout sets (e.g. 8 blob layouts) —
  alive, never chaotic, deterministic on replay.
- **Overlap, don't queue:** timeline offsets (`'-=0.3'` / position params), elements arrive as one
  choreographed phrase, not a bullet list. Feedback ≤ 150–200ms ALWAYS, whatever else is moving.
- **Hygiene:** `will-change` set just before a tween, `clearProps` after one-shots; transform/opacity
  only for DOM motion (compositor-only — `41`); all loops visibility-gated (`30`).

## The house-move library (build these once, reuse everywhere)

1. **House text reveal** (`13`): double-split masked lines, `yPercent: 100→0` (+ optional 2–6°
   rotate, origin left), stagger = unit ×2, `--dur-reveal`, house-out ease, clearProps. EVERY heading.
2. **House image/media reveal**: motif-mask entrance (`12` shape) — blob/inset/curve clipPath +
   slight scale settle. EVERY image (`15`).
3. **House card/element entrance**: y + opacity + micro-rotate, stagger unit, batch via
   `ScrollTrigger.batch`.
4. **House press** (`33`): the tactile button response (offset-shadow press / squash — per depth style).
5. **House loop**: the idle breathing applied to hero + accents (subtle scale/rotation sine,
   visibility-gated) — nothing on an award site is perfectly still (`25` life rule).

## Scrub vs tween decision (one rule)

Value tied to world/space → scrub (`31` grammar 1). Value tied to a MOMENT (arrival, reveal,
feedback) → tween with house tokens (grammar 2). If unsure: does it feel wrong when the user stops
mid-scroll? → tween.

## motion.js (generated twin of the CSS tokens)

```js
export const MOTION = {
  ease: { house: 'house', in: 'power2.in', settle: 'elastic.out(1, 0.6)' },
  dur:  { micro: 0.18, ui: 0.4, reveal: 0.8, hero: 1.6 },
  stagger: { unit: 0.07, char: 0.03 },
  physics: { overshoot: true, bounce: 'soft' },
};
```
All GSAP calls reference MOTION.* — grep-able consistency (`50` audits it).

---

## ✓ Verification

- [ ] Motion tokens defined and justified by the concept personality in one sentence each.
- [ ] ONE CustomEase shared CSS+JS (grep cubic-bezier literals — only tokens remain).
- [ ] Every gsap call uses MOTION.* tokens (grep raw durations/eases — near zero).
- [ ] House moves built and reused: text reveal on ALL headings, media reveal on ALL images (spot-check 5 of each).
- [ ] Exits measured faster than entrances (read the menu/modal timelines).
- [ ] Feedback latency ≤ 200ms on all interactive elements (screen recording, count frames).
- [ ] Idle life present and visibility-gated; randomness bounded and precomputed.
- [ ] will-change/clearProps hygiene in one-shots (inspect a finished element — no lingering will-change).
