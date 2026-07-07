# 22 — Texture Generation from the Reference

**Role:** Create every map the model needs — album/label extracted from the user's photo, plus procedurally authored roughness/normal/dust maps — with zero external texture tools. The agent IS the texture artist (sharp + canvas + 20 lines of Sobel).
**Phase:** 3 (3D PRODUCTION).
**Inputs:** `_process/refs/ref-object-*.jpg`, MODELING-SPEC label plan + detail inventory.
**Outputs:** texture files in `assets/models/<slug>/textures/` (build-time PNG → optimized in `42`).
**Upstream:** `02`, `20` · **Downstream:** `21` (maps plug into materials), `24`, `42`.

---

## 1. Label / print extraction (the realism make-or-break)

A blurry or lighting-baked label kills realism faster than any geometry error.

1. **Crop** the print region: `sharp('ref.jpg').extract({left,top,width,height})`.
2. **Un-distort**: frontal cylinder shots are near-flat already; else perspective-correct via canvas `drawImage` quad mapping. Strong wrap distortion → rebuild instead (below).
3. **De-light**: the photo has lighting baked in — normalize levels, remove the specular hotspot (clone from the mirrored side, or brightness-mask). Albedo must be lighting-free; the 3D scene re-lights it.
4. **Rebuild vector-crisp when possible (usually for the hero):** identify fonts/shapes, redraw the label on a high-res canvas (2–4× final resolution, brand type via `ctx.fillText`, logos re-traced as SVG paths). A rebuilt label is crisp at any zoom AND fully art-directable (color variants = re-render). Extraction is the fallback; rebuilding is the standard.
5. **Apply on dedicated geometry:** a thin lathe strip (same profile, radius +0.0005, spanning label top→bottom, clean cylindrical UVs) beats DecalGeometry — accurate, exportable. Decals only for stamps on complex curvature.

## 2. Canvas-authored PBR maps (the workhorse)

All on offscreen canvas (`@napi-rs/canvas` in node — installs clean, no system deps), baked to PNG at build time:

- **Roughness variation** (G channel): base value from `21`'s family ± deltas — fingerprints = large soft ellipses (±0.1), smudge streaks near "touch zones", brushed metal = 1px horizontal noise lines stretched wide, orange peel = fine simplex noise. Even faint variation (±0.05) beats a uniform value.
- **Dust/wear albedo overlay**: scattered low-alpha dots + edge-worn strips, 4–8% opacity.
- **Height → normal** (embossing, threads, knurling, paper grain): draw the relief in grayscale, convert with Sobel:

```js
function heightToNormal(h, W, H, k = 2) {           // h: 0..1 grayscale array
  const out = new Uint8ClampedArray(W * H * 4);
  const at = (x, y) => h[Math.min(H-1, Math.max(0, y)) * W + Math.min(W-1, Math.max(0, x))];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dx = (at(x+1,y) - at(x-1,y)) * k, dy = (at(x,y+1) - at(x,y-1)) * k;
    const len = Math.hypot(dx, dy, 1), i = (y*W+x)*4;
    out[i] = (-dx/len*.5+.5)*255; out[i+1] = (dy/len*.5+.5)*255; out[i+2] = (1/len*.5+.5)*255; out[i+3] = 255;
  }
  return out;
}
```
(three.js expects OpenGL +Y normals — if lighting looks inverted, flip G.)

## 3. Packing & budgets

- **ORM packing** (glTF convention): R=AO, G=roughness, B=metalness → ONE texture instead of three (pack with sharp channel ops before export).
- Sizes: hero label 1024² (2048² only if the label IS the hero and fills the screen); roughness/normal detail 512²; broad noise 256². Never above 2048² for web.
- Color textures → sRGB; ALL data maps (ORM/normal/height) → linear. Mark at load AND after export (re-check in `24`'s cold-load test).
- Final compression (WebP/KTX2) happens in `42` — author in PNG, full quality; compress once at ship.

## 4. Variant systems (flavors/colorways)

If the brand has variants: author label/albedo as a template (canvas re-render per variant palette) →
N texture sets sharing ONE geometry+material rig. Runtime swap pattern (hide the swap inside a fast
rotation/transition beat — `31`) instead of N models. Name textures `label_<variant>.png`; the
variant switch also drives the DOM re-theme (`12`'s data-attribute).

---

## ✓ Verification

- [ ] Label side-by-side vs reference at 2× zoom: crisp, straight, colors correct, no baked hotspot. (If extracted: de-lit. If rebuilt: letterforms match the reference print.)
- [ ] Label sits on its own strip geometry with clean UVs (UV-checker screenshot).
- [ ] Roughness map exists and is visible under raking light (screenshot proof, not assumption).
- [ ] Normal map orientation correct (bumps pop OUT — check against a known light direction).
- [ ] ORM packed; every map's colorSpace correct (list: map→sRGB, orm/normal→linear).
- [ ] Sizes within ladder (1024/512/256); no accidental 4K.
- [ ] Slight deliberate imperfection present (label 1–2° off-axis per `20` — visible in top view).
- [ ] Variant sets (if any) render correctly through one shared rig — screenshot each variant.
