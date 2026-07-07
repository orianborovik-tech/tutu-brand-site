# 13 — Typography

**Role:** The type system: pairing, fluid scale, display-as-illustration techniques, kinetic type, and loading discipline. On award-tier sites type IS a primary visual actor, not a text carrier.
**Phase:** 2 (CONCEPT), applied through 5.
**Inputs:** CONCEPT.md (type personality). **Outputs:** type tokens + @font-face setup + reveal patterns.
**Upstream:** `10`, `12` · **Downstream:** `14` (copy lengths), `31`/`32` (reveals), `42` (subsetting), `44`.

---

## Pairing formula (two faces, never more)

1. **One display face with a strong opinion** — condensed/ultra-wide/serif-with-attitude; often a
   SINGLE weight is enough (dontboardme: Bayon one weight; MANA: one family, 3 weights total).
   The display face carries the concept's personality — choose it FOR the concept, not from habit.
2. **One neutral workhorse** — a grotesque/sans for body, labels, UI (Neue-Montreal-class). If
   variable (wght+wdth in one file), one file serves every register.
3. Optional **mono label layer** — tiny uppercase mono for data/labels adds a technical register
   (use only if the concept has a technical/documentary streak).

Licensing: use open/free faces (Fontshare, Google, Uncut.wtf, Collletttivo) or self-host owned
fonts. Always self-host (woff2, subset per `42` — including Hebrew subsets when the site is Hebrew).

## Scale — display is a different animal

Two scales, not one:
- **Display scale** — headline sizes in rem on the fluid vw-rem system (`12`), hero up to 12–23vw.
  At these sizes: **line-height 0.78–0.9**, letter-spacing −1% to −3%, ALL CAPS works with condensed
  faces. Build h0–h6 steps (h0 = the hero monster size).
- **Text scale** — body 1–1.125rem, line-height 1.5–1.7, comfortable measure (45–75ch). Labels
  0.75rem uppercase +5–10% tracking.

Register contrast (giant display vs tiny labels) is itself the look — keep middle sizes rare.

## Display-as-illustration techniques

- **Optical kerning at hero sizes:** auto-kerning fails at 15vw. Split letters into spans and
  hand-kern problem pairs with adjacent-sibling CSS (`.l-a + .l-v { margin-left: -0.14em }`).
  Check every hero headline pair at full size.
- **Masked line reveals (the house entrance):** double-split (line wrappers with `overflow:hidden`
  + inner lines), animate inner `yPercent: 100 → 0`, optional slight rotate (2–6°, transformOrigin
  left), stagger 0.08–0.15s/line, 0.6–0.9s, expo/power4.out, `clearProps` after. Define ONCE
  (`32`), reuse for every heading — consistency reads as identity.
- **Per-letter entrances** (playful concepts): elastic per-letter pops, stagger 0.02–0.05s/char.
  Letters can also react to hover (rotate/bounce) if the motion personality allows.
- **Kinetic/scrubbed type:** oversized lines translating on scroll velocity (marquees that speed
  with scroll), scrubbed weight/width on variable fonts, text on curved SVG paths. Inside WebGL,
  text uses MSDF atlases of the SAME two faces — brand type must not change inside the canvas.
- Splitting discipline: split for animation, but keep the REAL text intact for AT (aria-label on
  the container, spans aria-hidden — `44`); re-split on resize/font-load; never split Hebrew niqqud
  apart from its base letter.

## Loading discipline (type must never flash-reflow the hero)

- `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two critical files only.
- `font-display: block` for the display face (short block beats FOUT on a hero), `swap` for body.
- Metric-matched fallback (size-adjust/ascent-override) so CLS ≈ 0 if swap happens.
- Fire `document.fonts.ready` → then `ScrollTrigger.refresh()` + allow hero reveal (`34` gates on it).
- Weight budget: ≤ 60KB per woff2 after subsetting (`42` — Hebrew range U+0590-05FF etc.).

## RTL (Hebrew-first sites)

`dir="rtl"` on html; logical CSS properties only (margin-inline-start, inset-inline); mirror
directional animations (entrances come from the reading side); condensed ALL-CAPS tricks don't
apply — Hebrew display power comes from weight + size + tight leading; check every split-text
animation against RTL shaping (split by word, not letter, unless verified).

---

## ✓ Verification

- [ ] Exactly 2 faces (+ optional mono); display face justifiable by the concept in one sentence.
- [ ] Fonts self-hosted, woff2, subset, each ≤ 60KB; preload + font-display set; fonts.ready wired to refresh.
- [ ] h0 headline screenshot at 1440 and 375: leading/kerning inspected at full size, problem pairs hand-kerned.
- [ ] House reveal defined once and used by every heading (grep for rogue one-off text animations).
- [ ] Real text preserved under all splits (screen-reader spot check); re-split on resize verified.
- [ ] Hebrew/RTL: direction, logical properties, mirrored entrances, no broken shaping (visual check).
- [ ] CLS from fonts ≈ 0 (Lighthouse or manual reload with cold cache).
