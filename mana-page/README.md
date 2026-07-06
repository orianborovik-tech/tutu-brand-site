# MANA Melon & Mint — 3D Product Page (pipeline demo)

A fully code-built interactive 3D product hero page, produced end-to-end by Claude Code
following `plans/3d-product-pages-plan.md` — no GUI 3D editor involved.

**What's on the page:** the Melon & Mint can floating at center (gentle idle float +
pointer-driven rotation/tilt), a frosted-glass extruded "MANA" wordmark behind it,
floating label-artwork cutouts (mint leaves, melon, flower, cloud, sky window, sparkles),
airborne water droplets, condensation droplets on the can, soft green studio mood.

## How it was made (the pipeline this demo proves)

| Step | Tool (all free) | Output |
|---|---|---|
| Label + material maps | official flat artwork (see credits) | `build/body_albedo.png`, `build/body_orm.png` |
| Wordmark extraction | potrace vectorization of the label logo | `public/assets/mana-logo.svg` |
| Sprite cutouts | chroma-key + component filtering (OpenCV/scipy) | `public/assets/sprites/*.png` |
| Can model | **Blender 5 headless (`bpy`)** — profile lathe, manual cylindrical UV, PBR + ORM, geometric condensation droplets (KHR_materials_transmission) | `public/assets/mana-can.glb` |
| GLB optimization | `@gltf-transform/cli` (WebP textures: 2.68 MB → 0.79 MB) | same file |
| Page | Vite + three.js r185 + GSAP (`quickTo` parallax, entry timeline, sine idle float) | `src/main.js` |
| Visual QA | Playwright + headless Chromium (SwiftShader WebGL2), screenshot loop | `tools/qa_shot.mjs` |

## Run

```bash
npm install
npx vite          # dev server
npx vite build    # production build to dist/
node tools/qa_shot.mjs 'http://127.0.0.1:8941/?static' shot.png 1440 900   # headless screenshot
```

`?static` renders the final pose without animations (deterministic screenshots).
Reduced-motion users get the static presentation automatically; coarse-pointer
devices get a cheaper glass material and no pointer parallax.

## Asset regeneration

`tools/prep_assets*.py` (runs with pillow/scipy/potracer/cairosvg) rebuild the textures,
wordmark and sprites from `assets-src/`; `tools/build_can.py` rebuilds the GLB with `bpy`.

## Credits & usage note

Label artwork, wordmark and product design © Thé à Boire (MANA, manayerbamate.com);
illustration credited on-pack to Loopkin. Assets are used here **solely as a technical
demo** recreating the look of a public reference site chosen by the project owner —
not for commercial use. Swap `assets-src/` inputs with your own brand artwork to
produce your own product page with the same pipeline.
