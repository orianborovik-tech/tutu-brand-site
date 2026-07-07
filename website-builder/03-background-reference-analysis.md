# 03 — Background Reference Analysis (Plate Sheet)

**Role:** Analyze the background reference image the way a VFX supervisor analyzes a backplate. Produces the PLATE SHEET — the numeric contract that `25` (recreation) and `26` (compositing) consume. Skipped only when no background reference exists (input case A/C).
**Phase:** 1 (ANALYSIS).
**Inputs:** `_process/refs/ref-bg-*.jpg`, BRIEF.md.
**Outputs:** `_process/PLATE-SHEET.md`.
**Upstream:** `01` · **Downstream:** `25`, `26`, `23`, `12`.

---

## Why this exists

Every failed composite traces back to a mismatch that was measurable in the plate up front.
Analyze once, mechanically, and all downstream scene code reads the same numbers.

## The 14-point plate checklist

Run all 14. Write every answer down — "unknown" is an allowed answer, guessing is not.

1. **EXIF** — try `exifr` on the original file: `FocalLengthIn35mmFormat` gives the exact camera fov (fov = 2·atan(18/f35)·180/π vertically for landscape). If EXIF exists, this ends all lens debates.
2. **Focal-length estimate (no EXIF)** — perspective strength: strong convergence/wide view = 24–35mm (fov 40–55°); flattened, compressed product plate = 50–100mm (**fov 15–30°** — most product backgrounds live here; the Three.js default 50–75 is almost always WRONG for them).
3. **Horizon fraction** — where does the horizon (or implied eye-level line) sit? `f = horizonY / imageHeight`. Camera pitch to replicate: `(f − 0.5) · fov`. If the horizon is hidden, extend perspective lines from any straight edges to find the vanishing line.
4. **Vantage** — eye-level / low hero angle / top-down / aerial. Affects ground-plane visibility and how much floor the shadow catcher needs.
5. **Light direction (azimuth)** — from cast shadows' 2D direction; from shading gradients on round objects if no shadows visible.
6. **Light elevation** — `atan(objectHeight / shadowLength)` on anything in the plate that casts a visible shadow.
7. **Light quality** — shadow edge: crisp = hard small source (sun/spot); wide penumbra = soft/overcast/softbox.
8. **Light color & ambient color** — sample the lit side vs the shadow side of a neutral-ish surface. Shadow color is NEVER black — record its actual hue (it becomes the ShadowMaterial tint in `26`).
9. **5-swatch palette** — dominant, secondary, sky/upper, ground/lower, accent. Feeds `12` (the site palette must be coherent with the plate).
10. **Horizon-band color** — the exact color where ground meets sky (becomes `scene.fog` color in `25` — a mismatch here creates a visible "gas wall" seam).
11. **Depth structure** — foreground / midground / background layers; is there atmospheric haze (value/saturation falloff with distance)? Parallax potential for 2.5D.
12. **Hero surface** — WHERE will the model stand/float? Identify the exact plane (position, normal) and its material (matte dust? glossy floor? water?) — reflections/shadows depend on it.
13. **Grain & artifacts** — film grain amount, JPEG noise, chromatic aberration, vignette. The render must MATCH these (a cleaner-than-plate render reads as a sticker; `26`).
14. **Mood & negative space** — one-line mood description + where the empty areas are (layout/copy will live there; feeds `11`/`12`).

## Choose the recreation strategy (decision tree — full recipes in `25`)

- Camera essentially static / subtle parallax only → **Strategy 1: image backdrop** (frustum-fitted plane or scene.background with cover math). Cheapest, most exact.
- Scroll/orbit moves the camera beyond ~15–20° → flat backdrop breaks → **Strategy 2: rebuild in 3D** (sky/gradient shaders, terrain, fog) or **Strategy 3: hybrid 2.5D** (depth-layered plate + 3D midground; depth map via Depth Anything V2 at build time).
- Abstract/gradient/atmosphere plate → ALWAYS rebuild as shaders (banding-free, animatable, 0KB) — recreate its exact colors, never ship the JPEG.

Record the chosen strategy + why.

## Write `_process/PLATE-SHEET.md`

```markdown
# PLATE SHEET — ref-bg-01.jpg
fov: 22° (EXIF 85mm) · horizon f: 0.58 → pitch −1.8° · vantage: eye-level
key light: azimuth 310°, elevation 35°, hard, color #FFE8C4 · ambient #9BB4C8 · shadow tint #4A5568
palette: [#…×5] · horizon-band/fog: #C8D4DC
depth: fg rocks / mg dunes / bg haze (strong) · hero surface: cracked clay, matte, y=0 plane
grain: medium film grain, slight vignette · mood: "ancient stillness"
negative space: upper third · strategy: hybrid 2.5D (scroll pans ±10°)
```

---

## ✓ Verification

- [ ] All 14 points answered (with "unknown" only where genuinely unmeasurable).
- [ ] fov / horizon / pitch are NUMBERS derived from measurement or EXIF, not vibes.
- [ ] Light direction+elevation+color justified by visible evidence (I can point to it).
- [ ] Fog/horizon-band color sampled with a color picker, hex recorded.
- [ ] Strategy chosen via the decision tree and the camera-motion plan of the concept.
- [ ] PLATE-SHEET.md is machine-readable — downstream code can consume every value directly.
