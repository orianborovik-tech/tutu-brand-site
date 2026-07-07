# 15 — Photography & Images

**Role:** The site's photographic layer: define an original photographic language per project, auto-match the right image to every narrative beat, author generation-ready prompts (for the image tools the user connects — e.g. Higgsfield; see `.agents/skills/higgsfield-generate` and `environments.md` in this repo), and hold every image to reference-site craft standards.
**Phase:** 2 (CONCEPT — language + shot list) and 5 (EXPERIENCE — production + placement).
**Inputs:** CONCEPT.md, COPY.md beat sheet, tokens (`12`).
**Outputs:** `_process/SHOT-LIST.md` (per-beat image specs + prompts) → generated/sourced images → optimized assets (`42`).
**Upstream:** `10`, `11`, `12` · **Downstream:** `25` (images as backdrops), `33`/`31` (reveals), `42`, `45` (OG image).

---

## 1. The photographic language (one per project, derived from the concept)

Award-tier sites shoot everything as if ONE photographer with ONE brief shot it. Define in SHOT-LIST.md:

- **Lens & distance personality** — macro-intimate (product pores) / 35mm-documentary / 85mm-compressed-hero / aerial-epic. Pick 1–2, ban the rest.
- **Light** — one lighting world consistent with the 3D scene (`23`) and plate (`03`): golden-hard, overcast-soft, studio-softbox, neon-night…
- **Grade** — from the token palette (`12`): lifted blacks? warm highlights? desaturated mids? Write it as 3–5 grading rules; the SAME grade applies to photos, video (`16`) and the WebGL post stack (`26`) — one world, one grade.
- **Texture & imperfection** — grain amount, halation, film-stock feel. Must match the site's shared grain overlay.
- **Composition codes** — negative-space bias (copy lives there — `03` §14), horizon discipline, subject-scale rules.
- **Banned-image list** — generic stock poses, sterile white-box product shots, watermark-style renders, anything that could appear on a template site. (Anti-clone applies to photography too: study MANA-class craft — playful staged realism; dontboardme-class — in-world illustration/photo fusion; landonorris-class — cinematic dark texture. NEVER copy their actual imagery.)

## 1b. What flatters ↔ what to avoid (hard rules)

| מחמיא — always elevates | להתרחק — always cheapens |
|---|---|
| Macro texture of the REAL material (condensation, fibers, grain of the product) | Sterile white-box stock shots, generic catalog angles |
| One consistent grade + grain across every image | Mixed grades / obviously-different sources on one page |
| Directional, motivated light (same world as the 3D scene) | Flat on-camera-flash look, over-saturated HDR |
| Negative space that gives copy room to breathe | Busy frames fighting the headline |
| Real context and imperfection (hands, steam, dust, motion blur at edges) | Posed fake-smile stock people, obvious AI-artifact hands/text |
| Product slightly larger-than-life (hero scale, low angle) | Product small/lost in frame, top-down apathy |
| Series shot as ONE session (same angle/light per variant) | Variant images that each look like a different brand |
| Restraint: 6–14 images, each with one job | Image-dump galleries, decorative filler |

## 2. Automatic beat→image matching (the decision matrix)

For each beat in the beat sheet (`11`), the system decides media type and shot spec — no user input:

| Beat type | Default media | Shot spec pattern |
|---|---|---|
| Hero / cold open | 3D scene (the model) — photography only as backdrop/plate | environment plate per `25` |
| Establish (what/where) | ONE wide establishing image or full-bleed plate | wide lens personality, heavy negative space for H1 |
| Process / craft beat | macro detail image(s), 2–3 as a rhythm | macro personality, shallow DoF, texture-forward |
| Proof / benefits | real-context image (product in use, hands, place) | documentary personality, candid framing |
| Variations / range | consistent series — SAME angle/light per variant | studio personality, art-directed repetition |
| Human / testimonial | portrait with the light world of the site | subject gaze + negative space toward copy |
| Climax | usually 3D signature moment; images only as texture | — |
| CTA / commerce | clean product cutouts (transparent) + one lifestyle | catalog clarity, brand grade still applied |
| Footer / encore | one atmospheric wide OR none (type-led) | lowest information, highest mood |

Rules: every image must earn its beat (one job each); 6–14 images per site is the healthy range;
two adjacent beats never share the same shot type (rhythm — `11`'s intensity curve applies to media too).

## 3. Prompt authoring (generation-ready, tool-agnostic)

Until the user connects the generation tools, WRITE the prompts and file them in SHOT-LIST.md; when
tools are connected (Higgsfield etc.), these run as-is. Prompt formula (same discipline as
`environments.md` in this repo):

```
[subject + action] · [environment/context] · [lens: e.g. 100mm macro / 24mm wide] ·
[light: direction+quality+color] · [grade keywords from the project's grading rules] ·
[texture: grain/haze] · [composition: negative space position, crop] · [mood adjectives ×2–3]
+ negative: watermark, text, logo distortions, extra fingers, sterile stock look
+ params: --aspect_ratio per placement (see §4)
```

- One prompt per shot, plus 1–2 variation prompts (different angle, same language).
- Consistency lock: reuse the exact light/grade phrases across ALL prompts of a project — this is
  what makes generated images feel like one shoot.
- If the reference object must appear in photos: prefer rendering the verified 3D model (`24`) into
  the shot (composite per `26`) over generating a lookalike — accuracy beats convenience.

## 4. Technical & placement specs

- Aspect ratios by placement: full-bleed 16:9 (desktop) + a 4:5/9:16 crop-plan for mobile (define
  the crop anchor per image NOW); inline cards 4:5 or 1:1; OG image 1200×630 (`45`).
- Delivery: AVIF/WebP via sharp, srcset ladder, LQIP/blur-up placeholder, explicit width/height
  (CLS=0), lazy below the fold, `fetchpriority=high` only on the LCP image (`42`).
- Treatment hooks: images enter through the site's reveal system (`32` house reveal, blob/inset
  masks per `12` motif) — never browser-default pop-in. Hover states on interactive images (`33`).
- File naming: `img/<beat>-<slug>-<variant>.<ext>` — beat-addressable, so choreography code reads the manifest.

---

## ✓ Verification

- [ ] Photographic language defined (lens/light/grade/texture/composition/ban-list) and consistent with tokens + 3D world.
- [ ] Every beat has a media decision from the matrix; no two adjacent beats share shot type.
- [ ] SHOT-LIST.md complete: spec + ready-to-run prompt (+variations) per image, aspect ratios + mobile crop anchors included.
- [ ] Consistency lock: identical light/grade phrases across all prompts (grep them).
- [ ] Generated/placed images pass the one-shoot squint test (thumbnail contact sheet — do they look like one photographer?).
- [ ] All images optimized per `42` (formats, srcset, dimensions, LQIP) — numbers recorded.
- [ ] The product in any photo is THE verified model or the real reference — never a lookalike generation.
