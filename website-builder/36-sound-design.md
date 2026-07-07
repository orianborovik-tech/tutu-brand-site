# 36 — Sound Design

**Role:** Audio as a creativity multiplier — strictly mute-first. Sound deepens the world for the 20% who turn it on and must cost NOTHING for the 80% who don't.
**Phase:** 5 (EXPERIENCE) — optional layer; include only when the concept gains from it.
**Inputs:** CONCEPT (does this world have a sound?), motion tokens (`32` — audio follows the same physics).
**Outputs:** the audio system + assets.
**Upstream:** `10`, `32` · **Downstream:** `44` (toggle a11y), `41` (lazy loading).

---

## The iron rules

1. **Off by default. Always.** Autoplaying audio is an instant usability kill (and browsers block it anyway).
2. **The site must be 100% coherent muted.** Sound rewards; it never carries information alone.
3. **One persistent, always-visible, keyboard-operable toggle** — designed as a judged surface
   (`33`): an animated equalizer icon, an in-voice label ("קול / שקט"). State persists
   (localStorage) and is respected on revisit.
4. First gesture unlocks WebAudio (`AudioContext.resume()` inside the toggle click) — never fight
   the autoplay policy.

## The three layers

| Layer | Content | Rules |
|---|---|---|
| **Ambient bed** | one loop that IS the world (room tone, wind, hum) | −24 to −18 LUFS-ish quiet; 30–60s seamless loop; fades in 1–2s on enable |
| **Interaction SFX** | hovers, clicks, toggles | ≤ 150ms samples; **frequency-softness law**: the more often a sound fires, the shorter/softer/warmer it must be; micro pitch/gain randomization (±3–5%) so repeats don't machine-gun |
| **Moment hits** | signature moment, section arrivals, loader complete | one designed hit per narrative peak; sidechain-duck the ambient under it |

Audio follows the motion physics (`32`): a jelly world sounds soft and bouncy; a granite world
sounds dry and low. Sounds and their animations share attack/decay envelopes.

## Engineering

- **Howler.js** (or plain WebAudio): sprite sheet for SFX (one file, offset map) — one network
  request, sample-accurate triggering.
- Lazy: NO audio bytes load until the toggle is first enabled (dynamic import + fetch on demand).
  Budget: SFX sprite ≤ 200KB, ambient loop ≤ 500KB (mono where possible, 44.1kHz, ~96–128kbps).
- Tab blur → duck to silence (0.3s); tab focus → restore (1s). Reduced-motion users: keep sound
  available but never auto-suggest it (`44`).
- Scroll-reactive audio (filter frequency / gain following `uVelocity`) is a premium touch — apply
  subtly (±20% range), never a wobble machine.

## When to skip sound entirely

No concept-native sound idea → skip the layer completely (a generic whoosh library makes a site
WORSE). Log the decision in ASSUMPTIONS.md. Silence is a valid, confident choice.

---

## ✓ Verification

- [ ] Site fully coherent muted (walk the whole page with sound off — nothing missing).
- [ ] Off by default; toggle visible, keyboard-operable, state persists (test all three).
- [ ] No audio bytes on the wire before first enable (network tab proof).
- [ ] Frequency-softness law: the most-fired sound is the shortest/softest (list sounds by fire-rate).
- [ ] Repeat variation works (click 10× — no machine-gun).
- [ ] Ambient loop seamless over 3 cycles; ducking under moment hits works.
- [ ] Tab blur/focus fades verified.
- [ ] Budgets: sprite ≤ 200KB, ambient ≤ 500KB (sizes listed).
