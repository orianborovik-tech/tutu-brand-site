# 23 — Lighting & Environment (IBL)

**Role:** Light the model so realism actually happens — PBR materials are only as good as what they reflect. Environment strategy, matching the reference photo's light, and studio grounding shadows.
**Phase:** 3 (3D PRODUCTION) — and re-tuned in Phase 4 when the world exists.
**Inputs:** MODELING-SPEC camera/light notes, PLATE-SHEET (case B), CONCEPT palette.
**Outputs:** environment + lights setup in the lab and site scenes.
**Upstream:** `21` · **Downstream:** `24` (light tuning pass), `25` (environment = the world), `26` (light-matching for composites).

---

## IBL priority order

1. **HDRI + PMREM** — `RGBELoader` → `PMREMGenerator` → `scene.environment`. Poly Haven (CC0);
   **1k HDR (~1–2MB) is enough for reflections** (PMREM prefilters anyway); 2k+ only if the env is
   also the visible background. Studio HDRIs for products; outdoor HDRIs matched to outdoor plates.
   Budget alternative: gainmap JPEG (`@monogrid/gainmap-js`) turns 4–6MB .hdr into 150–500KB (`42`).
2. **RoomEnvironment** (three addon) — procedural studio PMREM'd at runtime, ZERO bytes, neutral
   default when no HDRI fits.
3. **Procedural custom environment — the award move.** Build a tiny scene of emissive planes/
   gradients in the art direction's palette (softbox rectangles = long specular streaks, exactly how
   studio product photography works) and PMREM it; or `pmremGenerator.fromScene(worldScene)` /
   CubeCamera inside the ACTUAL invented environment (`25`) so the model literally reflects its
   world. A 512×256 canvas equirect (brand gradient + white light-bar strokes) is often all it takes.
4. **Analytic lights supplement, never replace IBL:** ONE `DirectionalLight` (intensity 2–6,
   physical units) as key — because env maps cast no crisp shadows and the shadow catcher needs one.
   Ambient ~0.4 only if shadows crush. ≤ 2 dynamic lights total (`41`).

`scene.environmentIntensity` scales IBL globally (typical 1.0–2.0 for hero pop);
`scene.backgroundBlurriness` softens a visible env background.

## Matching the reference photo's light (cases A/B)

Read from the reference (numbers from `02`/`03` analysis):
1. **Key direction** — from shadow directions + specular highlight positions.
2. **Elevation** — `atan(objectHeight / shadowLength)`.
3. **Color temperature** — sample lit vs shadow sides.
4. **Contrast ratio** — hard sun vs soft overcast (penumbra width).

Then **rotate the environment** — `scene.environmentRotation` — so the main highlight lands where
the reference has it, and aim the key DirectionalLight to agree. This single alignment makes the
model read as "photographed in the same place" — it's the heart of compositing (`26` extends this
with plate-derived equirects).

## Studio grounding (model-lab stage; composite grounding lives in `26`)

Nothing floats — options ranked:

1. **Accumulative/progressive shadows** — jitter a light over 40–100 frames, accumulate into a
   plane texture → raytraced-looking contact shadow, freeze after accumulation, zero ongoing cost.
   Best for stills/product scenes.
2. **ContactShadows technique** — depth from an orthographic camera below, blurred, as plane alpha.
   Cheap; right for objects that move/rotate.
3. **Standard shadow map** — key light with `shadow.mapSize 2048`, TIGHT shadow camera frustum
   around the object, `radius 4–8`, `bias -0.0001` (kills acne).
4. **Baked AO ellipse** — radial-gradient canvas plane; 0 cost, convincing for stills; skew the
   ellipse along key-light direction.

Shadow color is never black — tint toward the environment's ambient (`12` shadow-tint token).

## Exposure & white balance discipline

`toneMappingExposure` tuned in the `24` loop (0.6–1.6) against the reference-matched view — AFTER
env rotation, BEFORE material micro-tuning. If everything looks uniformly wrong (too flat/too hot),
it's exposure or env intensity — not fifteen material edits.

---

## ✓ Verification

- [ ] An environment exists and is PMREM'd (metals are alive; no black reflections).
- [ ] Env source matches the strategy (HDRI/Room/procedural-from-world) and its bytes are within budget (`42`).
- [ ] Env rotated so the key highlight matches the reference position (side-by-side proof).
- [ ] Exactly one key DirectionalLight; total dynamic lights ≤ 2; intensities in physical range.
- [ ] Ground shadow present via a ranked technique; shadow is TINTED, not black.
- [ ] Shadow camera frustum tight (visualize with CameraHelper once — no giant blurry waste).
- [ ] Exposure tuned against reference-matched view; brand colors still true (check vs swatches from `12`).
- [ ] In the invented-world case: model reflections contain the WORLD (fromScene env) — zoom a reflective part and confirm.
