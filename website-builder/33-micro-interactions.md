# 33 — Micro-Interactions & Delight

**Role:** Replace every default UI surface with an on-concept invention: cursors, buttons, hovers, 404, easter eggs. Brand-cohesion density is what wins the Creativity axis — and delight placement discipline is what keeps Usability safe.
**Phase:** 5 (EXPERIENCE).
**Inputs:** CONCEPT delight plan, motion tokens (`32`), depth style (`12`).
**Outputs:** the interaction layer of the site.
**Upstream:** `10`, `32` · **Downstream:** `44` (touch/keyboard parity), `50` (judged surfaces).

---

## Doctrine: every default surface is a judged surface

Jurors notice the surfaces most sites leave stock. The completeness list — ALL designed, ALL on-concept:
cursor · buttons · link hovers · nav/menu · form fields + errors · 404 · favicon · OG image ·
selection color (`::selection`) · scrollbar (if styled, subtle) · cookie/consent · loader (`34`) · footer.

## Delight placement (the discipline that protects usability)

**Delight lives at LOW-INTENT moments:** loader (a joke/game/ritual), footer (a playable toy, a
reward for finishing), 404 (a fidget destination), hidden easter eggs (konami, logo long-press,
time-of-day states). **Conversion surfaces stay conventional:** cart, checkout, forms, the CTA —
people act on clarity ("funtional": fun where it's free, functional where it counts).

## Canonical physics (parameters that read as craft)

- **Cursor follower:** rAF-lerped (factor 0.1–0.2 — NEVER raw mousemove), hides on touch, grows/
  morphs contextually per hover target, `mix-blend-mode: difference` where palettes allow. Scoped
  contextual cursors (a special cursor inside ONE section) beat one global gimmick. Native cursor
  stays visible unless the replacement is flawless.
- **Magnetic buttons:** attraction strength 0.2–0.5 of element size, `gsap.quickTo` x/y, release
  snap-back `elastic.out(1, 0.3)`. Desktop only (pointer: fine).
- **House press** (`32`): per depth style — hard-offset-shadow buttons physically press in
  (translate = shadow offset); soft-depth worlds compress with a scale dip. Active state ≤ 100ms.
- **Hover response ≤ 150–200ms** with a designed hover for EVERY interactive element: label roll-ups
  (letter/word swap), fill wipes, icon micro-moves, dot-swaps. One hover grammar sitewide (`32`).
- **Mousemove parallax** (scene + decor): section-scoped — listeners attached on ScrollTrigger
  onEnter, REMOVED on onLeave (never global); depth-staggered amounts (±2–6px DOM, ±2–4° GL rig `30`).
- **Text interactions:** per-letter hover reactions (rotate/bounce with the house physics) on display
  type only; velocity-reactive marquees (scroll speed → skew/speed via `uVelocity`).

## Touch & keyboard parity (non-negotiable, `44`)

Every hover-revealed content has a touch path (tap-to-toggle or always-visible-on-touch) and a
keyboard path (`:focus-visible` designed with the same care as hover — not the blue default ring).
`@media (pointer: coarse)` disables magnetic/cursor systems cleanly.

## Easter eggs (1–2 per site, never more)

On-concept only: a hidden clickable that spawns something, a time-of-day variant, a console
message for the curious, a playable footer toy. An egg must never block content or cost
performance when un-found (lazy-init on first trigger).

## The 404 (a destination, not an apology)

On-concept scene (can reuse the hero model in an unexpected state), one in-voice line (`14`), one
way home. Must return real HTTP 404 (`45`). This page gets screenshotted by juries — budget an hour
for it.

---

## ✓ Verification

- [ ] Judged-surface sweep: walk the completeness list — zero stock surfaces remain (screenshot each).
- [ ] Delight map: every delight sits at a low-intent moment; CTA/cart/forms are conventional (list where delight lives).
- [ ] Cursor: lerped, contextual, hidden on touch; native cursor logic correct.
- [ ] Magnetic/hover physics within canonical ranges; hover latency ≤ 200ms (recording).
- [ ] Parallax listeners section-scoped (scroll away → listeners actually removed; verify via getEventListeners or logs).
- [ ] Touch pass on a real narrow viewport: all hover content reachable; coarse-pointer disables desktop-only systems.
- [ ] Keyboard pass: tab through the page — every interactive element has a designed :focus-visible.
- [ ] 404 designed, in-voice, returns real 404 status (curl -I proof).
- [ ] Easter eggs ≤ 2, lazy-initialized, on-concept.
