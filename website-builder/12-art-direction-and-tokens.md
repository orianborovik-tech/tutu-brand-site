# 12 — Art Direction & Design Tokens

**Role:** Convert the concept's palette stance into a complete, tokenized visual system: colors, spacing, radii, shadows, fluid layout scaling, per-section theming. One source of truth consumed by CSS, JS, and WebGL alike.
**Phase:** 2 (CONCEPT).
**Inputs:** CONCEPT.md, PLATE-SHEET.md palette (if any), object reference swatches.
**Outputs:** `src/styles/tokens.css` + Art Direction section of CONCEPT.md.
**Upstream:** `10` · **Downstream:** `13`, `25`, `26` (grade must match palette), `30` (GL reads tokens), `43`.

---

## Palette derivation (original every time)

Start from what is REAL in this project: the object's own colors + the plate's 5 swatches.
Then build with the proven award-tier formula:

1. **Tonal family (3–4 steps)** — one hue that owns the site (from object/plate/brand), as a family:
   deep base, mid, tint. Not gray + brand-color; a *family* (landonorris: dark-green + 2 tints).
2. **Grounds (2)** — background colors. NEVER pure white (#FFF) or pure black (#000); warm/cool
   off-tones (e.g. #F6F6ED cream, #101812 near-black-green). Choose light-world, dark-world, or
   chaptered (worlds flip per act — strong with a structural tension).
3. **One electric accent** — the shock color (e.g. #D2FF00 / #FFF500 family). Used at < 5% coverage:
   CTAs, hovers, live data, the signature moment. Its rarity is its power.
4. **Optional heritage accent** — a second warm accent for depth (used even more sparingly).
5. **Functional derivatives** — shadow tint (NEVER black — sample from plate or deep tonal step),
   scrim colors, transparent endpoints of gradients (same hue at alpha 0, or gradients band).

Contrast duty: body text ≥ 4.5:1 on its actual worst-case background (verify with a checker, over
screenshots if text sits on WebGL — `44`).

**Cohesion rule:** the 3D world (`23` lighting, `25` environment, `26` grade) and the DOM share this
palette. Fog color, GL clear color, environment tint — all come from tokens. Two color worlds on
one page = amateur tell.

## Token architecture (`src/styles/tokens.css`)

```css
:root {
  /* color families: --c-<name>-<step> */
  --c-moss-900: #101812;  --c-moss-600: #2A4A32;  --c-moss-300: #9BC4A4;
  --c-ground-light: #F2EFE6;  --c-ground-dark: #101812;
  --c-accent: #D8FF3E;  --c-shadow-tint: #2E3B2F;
  /* motion (values set by 32) */
  --ease-house: cubic-bezier(.24,1,.36,1);  --dur-fast:.3s; --dur-med:.5s; --dur-slow:.8s;
  /* space & shape */
  --space-unit: .8rem;  --radius-s: .6rem; --radius-m: 1.6rem;
  --z-canvas: 0; --z-content: 10; --z-nav: 100; --z-transition: 900; --z-loader: 1000;
}
```

- Names are semantic-ish but honest (family+step), ~25–35 tokens total. Every color in CSS, JS,
  and GLSL uniforms references a token (JS reads via `getComputedStyle` once at boot, or a generated
  `tokens.js` twin).
- **Per-section theming:** sections declare their world via `data-theme="dark"` /
  `body[data-chapter]`; components use custom-property fallback chains
  (`--self-bg: var(--section-accent, var(--c-accent))`) so ONE component re-skins per section
  with zero variants. Nav/logo invert via the same mechanism (scroll-aware, `31`).

## Fluid layout — the vector-artboard technique

Design on two canvases: **1440** (desktop) and **375** (mobile). Then:

```css
html { font-size: 1.1111vw; }                 /* 16 ÷ 1440 × 100 */
@media (max-width: 809px) { html { font-size: 4.2667vw; } }  /* 16 ÷ 375 × 100 */
@media (min-width: 1920px) { html { font-size: 21.33px; } }   /* clamp the scale-up */
```

Everything is sized in **rem** → the whole design scales like vector art between breakpoints;
zero per-element media queries. ONE behavior fork (layout changes, not sizes) at ~810–1024px via
CSS and `gsap.matchMedia` (`43`).

## Beyond color: the physical identity

Decide once, tokenize, repeat everywhere:
- **Shape language** — radius scale, blob vs sharp, the ONE recurring motif shape (mask shape,
  button silhouette, section seam profile) that stamps the brand on every surface.
- **Depth style** — hard offset shadows (tactile/playful) vs soft ambient (premium/cinematic) vs
  none (flat/brutal). Never mix two depth styles.
- **Texture** — grain overlay (0.04–0.10 opacity, shared with WebGL grade `26`), paper, none.
- **Seams** — how sections meet: straight, curved SVG arcs (scaleY-scrubbed), morphing dividers,
  color flips. Seam style is part of the identity (`31` animates it).

---

## ✓ Verification

- [ ] Palette derived from THIS project's object/plate (point to the source of each family) — not a default scheme.
- [ ] No pure #FFF/#000 grounds; shadow tint is not black; accent coverage < 5% (eyeball the mocks).
- [ ] tokens.css exists; CSS/JS/GL all read from it (grep for hex literals outside tokens.css — should be ~zero).
- [ ] Fluid rem scaling in place; page renders correctly at 320, 375, 768, 1440, 1920 (screenshots).
- [ ] Body text contrast ≥ 4.5:1 verified on worst-case real background.
- [ ] One motif shape + one depth style chosen and used consistently.
- [ ] The 3D scene's fog/clear/env colors reference the same palette (visual check: screenshot GL next to DOM).
