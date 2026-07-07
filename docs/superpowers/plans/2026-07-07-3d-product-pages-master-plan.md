# Tutu Brand — Interactive 3D Product Pages: Research Report & Master Implementation Plan

**Status:** Ready for execution
**Executor:** Claude Code (this plan is written to be executed by Claude Code — any strong model, e.g. Claude Opus 4.8 — phase by phase, with zero conversation context assumed)
**Date:** 2026-07-06 · **Revision:** v1.2 (2026-07-07)
**Branch:** `claude/3d-glasses-model-quality-cl6x97`

> **v1.1 changelog — corrections from the first build review (MANA demo):** two defects
> reached the delivered page and are now blocked by binding rules in **Part 10**:
> (1) the user-supplied background reference image was treated as inspiration and a new
> composition was invented instead of replicating the reference 1:1; (2) extracted sprite
> cutouts shipped with visible straight crop edges (sliced leaf, clipped flower, cut star
> rays). Part 10 rules override any conflicting guidance elsewhere in this plan, and
> Phases 2 and 5 now carry the corresponding checks.

> **v1.2 changelog — corrections from the second build review (Tutu glitter shutter-shade
> glasses):** the first 3D model of the glasses shipped **faceted/"pixelated" geometry**,
> **no glitter**, and **opaque plastic** where the real product is translucent tinted
> plastic with glitter flakes suspended *inside* the material. Root causes: this plan was
> written around cans/bottles (Route A "simple solid + label texture") and had **no route,
> no material rules, and no quality gates** for complex manufactured products. Three known
> failure mechanisms are now each blocked by redundant hard gates, regardless of which one
> produced the defect:
> (1) *faceting* — low-poly budgets, unbeveled primitives, and Blender's glTF exporter
> **not applying modifiers by default** (`export_apply=False` ships the low-poly cage);
> (2) *missing finish* — procedural Blender shader nodes are **silently dropped** by glTF
> export; only image textures survive;
> (3) *missing transparency* — transmission/volume/IOR were never specified.
> New in v1.2: **Part 4.6 (Route D — hard manufactured shapes)**, **Part 11 (binding
> model-quality rules R3–R7 + the glasses worked example)**, rewritten Phase 2, updated
> budgets (Part 6), and new Phase 0 environment checks. Part 11 rules override any
> conflicting guidance elsewhere in this plan.

---

## Executive Summary

This document answers three questions, based on deep research and **hands-on tests executed and verified in this exact working environment**:

1. **How are pages like the reference examples built?**
   The four Spline demos are scenes authored in Spline's GUI editor and played by a proprietary runtime. The Mana Yerba Mate site — the most relevant reference, because it is a real product page — does **not** use Spline at all: it is a Shopify store that loads a small glTF model of the can (modeled in Blender) and animates it with Three.js + GSAP ScrollTrigger + Lenis. Its exact motion recipes were decoded from its production code and are documented in Part 1.

2. **Can Claude Code build such pages by itself, or does it need external tools?**
   **Yes — Claude Code is self-sufficient for the entire pipeline**, using only free tools, and this was proven by live tests in this container:
   - It modeled a drink can procedurally in **Blender 5.0.1 (headless, `bpy` Python module — already installed)** and exported a valid `.glb`.
   - It rendered a PBR 3D scene in **headless Chromium (WebGL2 via SwiftShader)** and took a screenshot of it — meaning it can *see and verify its own 3D pages*.
   - It inspected/optimized glTF assets with **`@gltf-transform/cli`**.
   The only things Claude Code **cannot** do: author Spline scenes (GUI-only, proprietary format, code export paywalled), run large GPU AI models locally (no GPU in this container), and photograph the physical product. None of these block the plan.

3. **How do we get quality 3D models from product photos?**
   For packaged goods with printed labels (cans, bottles, jars, tubes, boxes) the professional route — and the one Mana itself used — is **model the simple shape parametrically in Blender + apply the real label artwork/photo as a texture**. The label is pixel-perfect because it *is* the photo. AI image-to-3D (TRELLIS, Hunyuan3D, Meshy free tier) is reserved for organic/complex shapes, because every current AI model degrades label text and hallucinates the back side. **Complex manufactured products — eyewear, toys, anything with thin features, translucent material, or a sparkle finish — get Route D (Part 4.6): geometry driven by curves extracted from the product photo, image-texture-only materials, PBR transparency authored programmatically, all enforced by the hard quality gates of Part 11.** Full pipeline in Part 4.

**Recommended stack (all free):** `three` (r185) + `gsap@3.15` (100% free since 2025) + `lenis` + `vite`, models built with `bpy` from user photos prepared with `rembg` + OpenCV, lit by CC0 Poly Haven HDRIs, optimized with `gltf-transform`, self-verified with Playwright headless screenshots, deployed to free static hosting or embedded in Shopify exactly the way Mana does it.

---

# PART 1 — Analysis of the Reference Examples

## 1.1 The four Spline demos

All four pages were fetched and analyzed. Delivery mechanism (verified on the NEXBOT page):

- Each `my.spline.design` page is a single HTML file containing **one giant inline `<script type="module">`** (4.7 MB for NEXBOT).
- The script imports `Application` from `@splinetool/runtime@1.12.98` (unpkg CDN) and calls `app.start([212,114,64,149,...])` — the scene is a **MessagePack-encoded binary scene graph inlined as a byte array**. Readable keys observed in the payload: `objects`, `states`, `events`, `position`, `rotation`, `scale`, `physics`, `visible`, `cloner` — i.e. Spline interactions ("look at cursor", hover states) are **data** interpreted by the closed runtime, not code.
- The `.splinecode` format is proprietary and undocumented; there is no API to create scenes programmatically. Scenes exist only if a human builds them in the Spline GUI editor.

What each demo does (the interaction vocabulary we must reproduce in code):

| Demo | Interaction pattern | Three.js equivalent (Part 5 recipe) |
|---|---|---|
| **NEXBOT – robot character concept** | Character's head/eyes continuously track the cursor; smooth eased follow; idle hover motion | Raycast cursor → invisible plane → `lookAt()` on head bone with slerp smoothing (Recipe M1) |
| **Poster 2** | Layered 3D composition with mouse-driven parallax/tilt | Nested-group pointer parallax with `gsap.quickTo` (Recipe M2) |
| **Distorting Typography** | 3D text that bulges/distorts near the cursor | SDF text (`troika-three-text`) + vertex shader displacement driven by a `uMouse` uniform (Recipe M7) |
| **Glass Cursors** | Glass blobs with real refraction following the pointer | `MeshPhysicalMaterial` transmission / `MeshTransmissionMaterial`, position driven by eased cursor (Recipe M6) |

**Spline verdict (important):** Spline's free plan watermarks web exports; code export requires the paid Professional plan; the npm runtime is unlicensed proprietary freeware; and nothing can be authored headlessly. Therefore in this plan **Spline is a reference aesthetic, not a tool**. Every effect above is reproducible with open-source Three.js — as the next section proves a real brand already did.

## 1.2 manayerbamate.com — full teardown (verified from production code)

This is the master reference: a real Shopify product site with a hero 3D can. Every fact below was extracted from the live site's HTML, JS bundle, and 3D assets during this research session.

### Architecture

| Layer | Finding |
|---|---|
| Platform | Shopify store; 3D assets uploaded as **theme assets**, served from the Shopify CDN with `?v=` cache-busting |
| Asset wiring | `<body>` carries data attributes: `data-modele` (the glTF), `data-hdr` (HDRI environment), `data-mure` / `data-trop` / `data-melo` (per-flavor label textures as PNG) |
| Renderer | **Three.js r141**, bundled into the theme's `global.js` (1.1 MB) — `WebGLRenderer`, `GLTFLoader`, `RGBELoader`, `AnimationMixer` |
| Motion | **GSAP + ScrollTrigger** (scroll choreography) + **Lenis** (smooth scroll) + raw `mousemove` (pointer parallax) |
| 2D accents | Lottie JSON animations (out of scope per the analysis brief) |

### The 3D model (`MANA_canettes__v5_WEBGL.gltf`)

Inspected with `gltf-transform inspect`:

- **Authored in Blender** (generator: `Khronos glTF Blender I/O v3.3.27`) — confirming the "parametric shape + label texture" workflow.
- **Two cylinder meshes** (`Cylinder.002`, `Cylinder.003`), **13,990 vertices / ~22.7K triangles total** — a *light* model.
- The body mesh is **skinned to a 2-bone armature** (`Bone`, `Bone.001`) with **baked animation clips** (`can_v2.001`, `ArmatureAction`) — this is how the can does its squash/wiggle: a pre-authored bone animation played through `AnimationMixer` (`action = mixer.clipAction(gltf.animations[1])`).
- **PBR textures:** albedo label (2048px class), combined roughness/metalness map, top normal map for the lid embossing. Extensions: `KHR_materials_specular`, `KHR_materials_ior`.
- **Lighting is entirely image-based:** one 435 KB `.hdr` loaded with `RGBELoader`; the code sets `material.envMapIntensity = 2.02` and max anisotropy on the label texture (crisp text at glancing angles).
- **One model serves all flavors:** the code swaps `mesh.material.map` to the flavor's PNG (`textureMure`, `textureTrop`, `textureMelo`) — no extra geometry per variant.
- **Total payload ≈ 2 MB** (15 KB gltf + 720 KB bin + ~850 KB textures + 435 KB HDR) — inside every recommended budget.

### The movement system (decoded from `global.js`, with actual parameters)

The scene graph uses **nested groups** so motions compose without fighting:
`scene → group (entry + scroll animations) → groupMouse (pointer parallax) → can model`

1. **Entry animation (page load):**
   `gsap.from(group.rotation, { y: 2π, x: 0.3π, z: 0.2π, ease: "power2.out", duration: 1.1, delay: 0.3 })` — the can spins into place.

2. **Pointer parallax (continuous):** `gsap.quickTo` setters on `groupMouse` for `position.x/y` and `rotation.x/y/z`, each `{ duration: 0.6, ease: "power3" }`, fed on `mousemove` with normalized amplitudes like `(e.clientX / width − 0.5) / 10` — a subtle, heavily-damped tilt/drift toward the cursor.

3. **Scroll-driven rotation:** `gsap.to(can.rotation, { y: 2π, ease: "power1.inOut", scrollTrigger: { trigger: ".sectionCercle", start: "top top", end: "+=<distance>", scrub: true } })` — one full 360° turn scrubbed by scroll position. **Desktop only** (`window.innerWidth > 600`); mobile gets the static/simple presentation.

4. **Flavor-switch animation (carousel click):** a timeline that (a) winds up: `rotation.y → 0.3·d·2π, ease "power2.in", 0.3 s`, (b) releases with a spring: `rotation.y → d·2π, ease "elastic.out(0.34, 0.26)", 1.3 s`, while (c) `position.x` does a yoyo side-slide (`0.5 s, yoyo, repeat: 1, power1.inOut`) and the **label texture is swapped mid-spin** — the can appears to spin into being the next flavor.

5. **Baked squash/wiggle:** the armature clip is played via `AnimationMixer` at key moments (the "alive" feeling that pure transforms can't give).

6. **Render loop & hygiene:** rendering hooked into `gsap.ticker`; on teardown the code removes listeners and calls `renderer.dispose()` / `forceContextLoss()` — patterns worth copying.

## 1.3 The extracted motion grammar

Every reference example decomposes into eight primitives — this is the complete vocabulary the implementation must provide:

| # | Primitive | Seen in |
|---|---|---|
| G1 | Entry spin/settle timeline on load | Mana |
| G2 | Idle float / breathing (sine or baked clip) | NEXBOT, Mana |
| G3 | Pointer parallax on a nested group (eased) | Mana, Poster 2 |
| G4 | Look-at-cursor for a character/head | NEXBOT |
| G5 | Scroll-scrubbed transform or camera move | Mana |
| G6 | Springy state-change + texture/material swap | Mana flavor switch |
| G7 | Glass/transmission material effects | Glass Cursors |
| G8 | Shader-based hover distortion (typography/surfaces) | Distorting Typography |

---

# PART 2 — Capability Assessment: What Claude Code Can Do Itself

## 2.1 Verified in this session (evidence, not claims)

| Capability | Evidence (executed in this container) |
|---|---|
| **Procedural 3D modeling + glTF export, headless, CPU-only** | `pip`-installed **`bpy` 5.0.1** (Blender as a Python module) built a 66×150 mm can (64-seg cylinder, smooth shading, metallic PBR material) and exported a valid 11 KB `.glb` in milliseconds. Draco compression lib ships bundled. |
| **Rendering & *seeing* its own 3D pages** | Playwright + headless Chromium (`--use-gl=angle --use-angle=swiftshader`; on newer Chromium also pass `--enable-unsafe-swiftshader`) rendered a Three.js PBR scene via **WebGL2/SwiftShader** — `renderer.info` reported 256 triangles drawn, and the screenshot shows the lit metallic cylinder. This closes the loop: **build → render → screenshot → visually inspect → fix**, fully autonomously. |
| **glTF asset pipeline** | `npx @gltf-transform/cli inspect` ran against the real Mana model and produced full mesh/material/texture reports. `optimize`, `draco`, `meshopt`, `ktx2`, `webp`, `resize` commands available. |
| **Web stack** | `npm install three` (0.185.x) works; Vite, GSAP, Lenis, troika-three-text all MIT/free and installable. |
| **Photo preparation** | `rembg` 2.0.76 (background removal, CPU) and Real-ESRGAN (upscaling) verified pip-installable in this container; OpenCV available for label rectification. |
| **Site forensics** | Fetched and decoded a production site's 3D implementation (Part 1.2) — the same skill will be used for QA-ing our own output. |

## 2.2 What Claude Code cannot do (and why it doesn't matter)

| Limitation | Impact | Mitigation |
|---|---|---|
| Cannot author Spline scenes (GUI-only, proprietary `.splinecode`, code export paywalled, watermarked free tier) | None — Spline is not needed | Reproduce the effects in Three.js (Part 5). If the user *wants* literal Spline, a human builds the scene in the editor and Claude embeds the URL — but this is explicitly not recommended (cost, watermark, 4.7 MB payloads, vendor lock-in). |
| No GPU in this container → cannot run large AI image-to-3D models locally | Only affects Route B (organic shapes) | Use free hosted inference (Hugging Face Spaces via `gradio_client` + free HF token, or the user clicks in a browser), or free Google Colab T4. CPU-runnable fallbacks (TripoSR / Stable Fast 3D) exist but are draft quality. |
| Cannot photograph the product | User supplies photos | Photo spec provided in Part 4.4 — a phone camera is sufficient. |
| Headless SwiftShader gives no real FPS numbers | Perf must be validated on budgets, not headless FPS | Triangle/texture/draw-call budgets (Part 6) + optional one-time check by the user on a real device. |

## 2.3 Verdict

**Claude Code can build these pages under its own control, end-to-end, with zero paid tools.** The primary pipeline (Blender-python modeling + Three.js/GSAP pages + Playwright self-verification) runs entirely inside its own container. External free services enter only as *optional* helpers for organic-shaped products.

---

# PART 3 — The Toolchain (all free) and Where Each Thing Runs

| Tool | Version | License / cost | Role | Runs where | Operated by |
|---|---|---|---|---|---|
| `bpy` (Blender headless) | 5.0.1 | GPL (outputs are yours) | Parametric product modeling, UV mapping, materials, baked bone animations, GLB export | Claude's container (CPU) | Claude |
| `rembg` | 2.0.x | MIT | Cut product/label from photos | Claude's container | Claude |
| OpenCV (`cv2`) + Pillow | current | Apache-2 | Inverse-cylindrical label rectification, texture assembly | Claude's container | Claude |
| Real-ESRGAN | 0.3.x / ncnn binary | BSD-3 | Upscale label photos to 2K texture | Claude's container | Claude |
| `three` | 0.185.x (r185) | MIT | Rendering engine | Browser (shipped) | Claude |
| `gsap` + ScrollTrigger | 3.15 | Free (incl. all plugins since 2025; not OSI but commercial use allowed) | Entry timelines, scroll scrubbing, springy state changes | Browser | Claude |
| `lenis` | 1.3.x | MIT | Smooth scroll (pairs with ScrollTrigger) | Browser | Claude |
| `troika-three-text` | 0.52.x | MIT | Crisp SDF 3D typography (distortion effects) | Browser | Claude |
| `@gltf-transform/cli` | 4.4.x | MIT | Inspect / Draco-or-Meshopt compress / KTX2-WebP textures / resize | Claude's container | Claude |
| Poly Haven HDRIs | — | CC0 | Studio lighting via IBL (self-hosted 1K `.hdr`) | Downloaded once, shipped with site | Claude |
| Vite | 8.x | MIT | Dev server + production bundling (single-file bundle for Shopify) | Claude's container | Claude |
| Playwright + Chromium | preinstalled | Apache-2 | Headless screenshots of the built pages → visual self-QA | Claude's container | Claude |
| GitHub Pages / Cloudflare Pages / Netlify | — | Free tiers (Cloudflare = unlimited bandwidth) | Hosting | Cloud | Claude (push) |
| Shopify theme assets + Liquid section | — | Existing store | Production embed (the Mana pattern) | Shopify CDN | Claude via API/CLI, user approves |
| *(Route B only)* TRELLIS (MIT) / Hunyuan3D / Meshy free tier | — | Free (quotas; license notes in 4.3) | AI image-to-3D for organic shapes | Hugging Face Spaces / Colab / browser | Claude via `gradio_client` (needs user's free HF token) **or** user in browser |

**Explicitly rejected:** Spline paid plans, Meshy/Tripo paid API, any GPU rental — the goal is achievable at $0.

---

# PART 4 — Creating Quality 3D Models from Product Photos

## 4.1 Route A (primary): Parametric model + real label texture — *the Mana method*

Best for: cans, bottles, jars, tubes, boxes, pouches — any product whose body is a simple solid with printed artwork. **Fully autonomous, deterministic, label text is pixel-perfect.**

```
user photos ──► rembg (isolate) ──► label rectification (OpenCV inverse-cylindrical remap)
           ──► Real-ESRGAN upscale to 2048px ──► texture atlas (albedo + roughness/metal masks)
bpy script ──► body from lathe profile / primitives ──► bevels, seams ──► cylindrical/box UV projection
           ──► Principled BSDF (metallic body, glossy label, normal map for embossing)
           ──► optional 2-bone armature + baked wiggle clip (the Mana "alive" trick)
           ──► export .glb ──► gltf-transform optimize (meshopt/draco + ktx2/webp, ≤5 MB)
           ──► turntable render (bpy Cycles CPU or the web viewer) ──► screenshot vs. photo comparison
```

Key implementation notes:
- Bottles/jars: revolve a 2D profile curve (bpy spin/Screw modifier) — the canonical Blender packaging workflow.
- A straight-on label photo recovers ~120–150° of a cylindrical label undistorted; a full 360° label needs 3–4 rotated shots stitched, or the flat print artwork from the user (best case — always ask for the print-ready label file first).
- Target geometry: 10–25K triangles (Mana ships 22.7K), 64+ segments on visible curvature.
- Materials: `metallic ≈ 0.9 / roughness ≈ 0.2–0.35` for bare aluminum; label area masked to `metallic 0 / roughness ~0.4`; tiny normal map for lid/embossing detail.

## 4.2 Route B (organic/complex shapes): AI image-to-3D, then Blender cleanup

Best for: sculpted bottles, character-shaped packaging, non-developable surfaces. Quality ranking from 2026 comparisons, with license notes:

| Option | Quality | Cost | License / caveat | How invoked |
|---|---|---|---|---|
| **TRELLIS / TRELLIS.2** (Microsoft) | Very good; best open PBR (TRELLIS.2) | Free via HF Space | MIT — cleanest choice, EU-safe | `gradio_client` + free HF token (quota-limited), or user clicks in browser |
| **Hunyuan3D 2.x** (Tencent) | Best open textures; multi-view input (up to 4 photos) | Free via HF Space / Colab T4 (2.0/2mini) | Community license: **excluded in EU/UK/South Korea**, attribution required | Same as above |
| **Meshy** free tier | Best-in-class hosted textures | 100 credits/month | Outputs CC BY 4.0 (commercial OK **with attribution**); no API on free tier | User in browser, exports GLB |
| TripoSR / Stable Fast 3D | Draft | Free, runs on CPU locally | MIT / Stability Community | Claude fully autonomous (slow, draft quality) |
| Tripo3D free tier | Good | 200 credits/mo | **Non-commercial only** on free — unusable for a brand site | — |

**Hard rule learned from research:** every current AI model degrades small label text and hallucinates occluded sides. So even on Route B, the label is re-projected in a Blender headless post-pass from the real artwork (hybrid: AI shape + real texture).

## 4.3 Route C (photogrammetry): documented but not recommended

Meshroom needs CUDA (no CPU fallback beyond draft quality); COLMAP+OpenMVS runs on CPU but slowly; and — decisively — **shiny/metallic/glass packaging breaks photogrammetry** (reflections corrupt feature matching and get baked into textures). Only relevant for matte, textured products with a human doing a 30–60 photo capture (KIRI Engine app free tier exports GLB). Skip unless Route A and B both fail.

## 4.4 What the user must send (photo spec)

For each product:
1. **Best:** the print-ready label/packaging artwork file (PDF/PNG/AI export) + one reference photo. This makes Route A perfect.
2. Otherwise: straight-on photos of the label (fill the frame, no angle), one per ~120° of the wrap (3–4 shots), diffuse lighting (near a window / no direct flash), any phone camera.
3. Plus: one top shot, one bottom shot, one 3/4 angle "hero" reference (how it should feel), and physical dimensions (height/diameter in mm).
4. For Route B (organic): 4 views at 0°/90°/180°/270°, plain background.
5. **For Route D (hard manufactured shapes — eyewear etc.):**
   - straight-on **front** photo, shot from ≥1 m with zoom (approximates orthographic — minimal perspective distortion), plain background;
   - straight-on **side** photo (temple/profile) and **top** photo;
   - one 3/4 "hero" reference;
   - a **macro close-up of the material finish** (fills the frame with ~2–3 cm of surface) — used to measure glitter flake size, density, and color (Rule R5);
   - physical dimensions: overall width, height, depth, and material thickness in mm. If the user cannot measure, state the assumption used (e.g. standard party glasses ≈ 148 mm wide) in the deviations note.

## 4.5 Decision matrix

| Product shape | Route |
|---|---|
| Can / bottle / jar / tube / box / pouch | **A** (parametric + real texture) |
| Sculpted or organic form, matte | **B** (TRELLIS/Hunyuan via free Space) + label re-projection |
| Sculpted, shiny | **B** for shape + heavy Blender material work |
| **Eyewear / complex manufactured shape (incl. glitter & translucent plastic)** | **D** (photo-derived curves + procedural build, Part 4.6) — **Routes B/C are prohibited** here |
| Anything with **thin features** (slats, wires, spokes) or **transparent parts** | **D** — AI image-to-3D and photogrammetry both fail on thin/transparent geometry (holes fuse, transparency confuses reconstruction) |
| Anything, if user can't photograph well | A with the print artwork, or B from a single decent photo |

## 4.6 Route D (hard manufactured shapes): photo-derived curves + procedural build — *the eyewear method*

Best for: eyewear, toys, accessories — injection-molded products whose silhouette is complex
but planar-ish (a front view defines most of the shape), especially with thin features,
translucent material, or sparkle finishes. **Fully autonomous and deterministic.** This route
exists because the first glasses build proved that treating such a product like a "can with
extra steps" produces a blocky, opaque, glitterless toy. Route D is governed by the binding
rules in **Part 11** (R3 smooth geometry, R4 textures-not-nodes, R5 glitter, R6 translucency,
R7 silhouette fidelity) and illustrated end-to-end by the worked example in Part 11.6.

```
front photo ──► rembg mask ──► OpenCV contours (outer outline + interior holes)
           ──► resampled curves, mm-scaled (tools/extract_outline.py) ──► outlines.json
macro photo ──► measure flake size/density/color ──► tools/gen_glitter_maps.py
           ──► flake normal + roughness speckle maps (2048², deterministic seed)
bpy script ──► build FROM outlines.json curves (never freehand): extrude, bevel, bend
           ──► shade_auto_smooth ──► image-texture-only Principled BSDF
           ──► export GLB with export_apply=True
gltf-transform post-pass (tools/set_pbr_extensions.mjs) ──► transmission / volume / IOR
           ──► optimize (meshopt; flake maps UASTC or lossless — never ETC1S)
           ──► QA gates: silhouette IoU ≥ 0.92 · sparkle two-angle diff · faceting zoom crops
```

**Step 1 — Extract the silhouette curves from the front photo** (`tools/extract_outline.py`):

```python
"""Front photo -> mm-scaled outline curves for bpy.
Usage: python tools/extract_outline.py front.png --width-mm 148 --out outlines.json"""
import argparse, json
import cv2, numpy as np
from PIL import Image
from rembg import remove

ap = argparse.ArgumentParser()
ap.add_argument("photo"); ap.add_argument("--width-mm", type=float, required=True)
ap.add_argument("--out", default="outlines.json")
args = ap.parse_args()

alpha = np.array(remove(Image.open(args.photo).convert("RGBA")))[:, :, 3]
mask = (alpha > 127).astype(np.uint8) * 255
# RETR_CCOMP: top level = outer outline(s); children = interior holes
# (for shutter shades the holes ARE the slat gaps + nose cutout — they define the slats)
cnts, hier = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
xs = np.concatenate([c[:, 0, 0] for c in cnts])
mm_per_px = args.width_mm / float(xs.max() - xs.min())

def resample(c, n=256):  # uniform arc-length resample -> smooth curves in bpy
    p = c[:, 0, :].astype(float)
    p = np.vstack([p, p[:1]])                       # close the loop
    d = np.cumsum(np.r_[0, np.linalg.norm(np.diff(p, axis=0), axis=1)])
    t = np.linspace(0, d[-1], n, endpoint=False)
    return np.c_[np.interp(t, d, p[:, 0]), np.interp(t, d, p[:, 1])] * mm_per_px

data = {"mm_per_px": mm_per_px, "outer": [], "holes": []}
for i, c in enumerate(cnts):
    if cv2.contourArea(c) < 30:                     # noise specks
        continue
    n = 512 if hier[0][i][3] == -1 else 128         # outer curves denser than holes
    (data["outer"] if hier[0][i][3] == -1 else data["holes"]).append(resample(c, n).tolist())
json.dump(data, open(args.out, "w"))
print(f"outer: {len(data['outer'])}  holes: {len(data['holes'])}  scale: {mm_per_px:.4f} mm/px")
```

**Step 2 — Build the mesh in bpy FROM the curves.** The front face of the product is the
outer contour filled with the holes subtracted, extruded to the measured depth. Details
per product class live in the worked example (Part 11.6). Non-negotiables (Rule R3): every
curved edge ≥ 96 segments; bevel every visible edge (≥ 0.4 mm, ≥ 2 segments);
`bpy.ops.object.shade_auto_smooth(angle=0.6)` on every mesh (Blender 4.1+ API — `mesh.use_auto_smooth`
no longer exists); real-world scale in meters; `export_apply=True` at export.

**Step 3 — Materials are image textures only** (Rule R4), glitter per Rule R5, translucency
per Rule R6 (authored with a `gltf-transform` post-pass, not trusted to the Blender exporter).

**Step 4 — QA gates** (all three must pass before the phase ends):
silhouette IoU vs the photo mask ≥ 0.92 (Rule R7), two-angle sparkle diff (Rule R5.4),
faceting zoom crops (Rule R3.5).

---

# PART 5 — Motion & Interaction Recipe Library

Each recipe maps to the grammar (Part 1.3) and reference examples. These become reusable modules in Phase 4.

- **M1 — Look-at-cursor (NEXBOT):** pointer → NDC; `Raycaster.setFromCamera` against an invisible plane at model depth; `intersectPlane` → world target; per-frame `head.quaternion.slerp(targetQuat, 0.1)` with clamped angles. For rigged models: rotate the head **bone** (`skeleton.getBoneByName`).
- **M2 — Pointer parallax (Mana/Poster 2):** nested `groupMouse`; `gsap.quickTo(groupMouse.position,'x',{duration:.6, ease:'power3'})` (and y, and rotation x/y/z); feed `(clientX/W−.5)/10`-scale values on `mousemove`. Copy Mana's constants as the starting feel.
- **M3 — Entry timeline (Mana):** `gsap.from(group.rotation,{y:Math.PI*2, x:.3*Math.PI, z:.2*Math.PI, ease:'power2.out', duration:1.1, delay:.3})`, gated on GLTFLoader promise; add `gsap.from(group.position,{y:-1})` and a fade.
- **M4 — Idle float:** `pos.y = baseY + sin(t·speed)·amp` + slow `rotation.y += δ·0.2`; or play a baked armature clip via `AnimationMixer` (the Mana wiggle).
- **M5 — Scroll choreography (Mana):** Lenis + ScrollTrigger wiring (`lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t=>lenis.raf(t*1000))`; `lagSmoothing(0)`); then scrubbed tweens: full `rotation.y: 2π` over a pinned section; camera dolly between sections; **scrub baked glTF clips** with `action.paused=true; mixer.setTime(progress·duration)`.
- **M6 — Springy variant switch (Mana flavor swap):** wind-up (`power2.in`, .3 s) → release (`elastic.out(0.34,0.26)`, 1.3 s) on `rotation.y`, parallel `position.x` yoyo, swap `material.map` mid-spin (preload all variant textures; set `colorSpace = SRGBColorSpace`, max anisotropy).
- **M7 — Typography distortion (Distorting Typography):** `troika-three-text` SDF text; vertex displacement by distance-to-`uMouse` uniform (via `onBeforeCompile` or ShaderMaterial); GSAP-ease the uniform for inertia.
- **M8 — Glass (Glass Cursors):** `MeshPhysicalMaterial{ transmission:1, thickness, ior:1.5, roughness:0-0.2, clearcoat }` — requires an environment map; for chromatic-aberration richness use `MeshTransmissionMaterial` (from `@pmndrs/drei-vanilla` in vanilla builds) with `samples:2-4`, small `resolution` on mobile (it costs an extra render pass).
- **Scene hygiene (all pages):** render via `gsap.ticker`; `IntersectionObserver` pauses the loop offscreen; `renderer.setPixelRatio(min(devicePixelRatio,2))`; dispose on teardown (`renderer.dispose()`, `forceContextLoss()` — as Mana does).

**Look & lighting defaults:** self-hosted Poly Haven studio HDRI (1K, CC0) as `scene.environment`; `NeutralToneMapping` for color-accurate product shots (or `ACESFilmic` for drama); `envMapIntensity ≈ 2` (Mana's value); soft contact shadow (baked radial gradient plane or drei-style ContactShadows). **For sparkle/glitter products (Rule R5): the HDRI must contain several small, high-intensity light sources** (studio softbox/lamp HDRIs, e.g. Poly Haven `studio_small_*`) — glints are mirror reflections of small bright emitters; a flat/diffuse environment produces zero sparkle no matter how good the flake maps are.

---

# PART 6 — Architecture, Budgets, and Stack Decision

**Decision: vanilla Three.js + GSAP + Lenis + Vite (TypeScript).** Rationale: single self-contained bundle embeddable in any host — including a Shopify theme asset exactly like Mana (React Three Fiber would drag React 19 into a Shopify theme; keep R3F as an option only if the site becomes a React app). Import maps are flaky in Liquid — **bundle three into the file**.

```
src/
  core/scene.ts        # renderer, camera, IBL, tone mapping, resize, DPR cap, RAF via gsap.ticker
  core/loaders.ts      # GLTFLoader + Draco/Meshopt/KTX2 decoders (self-hosted)
  motion/{m1-look-at, m2-parallax, m3-entry, m4-idle, m5-scroll, m6-switch, m7-text, m8-glass}.ts
  pages/hero-product.ts  # composition: G1+G2+G3+G5+G6 for a product page
  fallback/poster.ts   # static render + reveal-on-interaction for mobile/no-WebGL
assets/  models/*.glb  hdri/*.hdr  posters/*.webp
tools/   prep_label.py  build_can.py  build_bottle.py  optimize.sh  qa_shot.mjs
```

**Performance budgets (from research + Mana's real numbers):**

| Item | Budget |
|---|---|
| Hero model .glb (compressed) | ≤ 5 MB hard, ~2 MB target (Mana ≈ 2 MB) |
| Triangles | 10–50K for simple bodies (can/bottle/box); **60–200K for curved/complex hero products (eyewear class)** — meshopt compresses 150K tris to ~2 MB; smoothness outranks byte-shaving (v1.1's low budget contributed to the faceted glasses) |
| Textures | ≤ 2048 px, KTX2 or WebP. **Flake/glitter maps: exactly 2048, UASTC or lossless WebP only — ETC1S turns speckle noise into mud (Rule R5.5)** |
| HDRI | 1K, ≤ 1 MB |
| JS bundle (three+gsap+app) | ≤ 800 KB gzip |
| Draw calls | < 50 |
| Transmission-material meshes | ≤ 3 per scene (each adds to the transparency render pass); mobile falls back to alpha-blend (Rule R6.4) |
| Mobile | poster-first, reduced effects (Mana disables scroll-rotation < 600 px) |

---

# PART 7 — Phased Implementation Plan (for Claude Code execution)

> Each phase is self-contained, ends with a verification checklist, and lists anti-pattern guards. Execute phases in order; each can run in a fresh session.

### Phase 0 — Environment & documentation verification (½ session)
**Do:** confirm `bpy` imports and exports a GLB; confirm Playwright WebGL screenshot works (`--use-gl=angle --use-angle=swiftshader`, add `--enable-unsafe-swiftshader` on newer Chromium); `npm i three gsap lenis vite`; `npx @gltf-transform/cli --help`; `pip install "rembg[cpu]" opencv-python-headless pillow`; download 1 Poly Haven studio HDRI (1K). Read the current three.js docs pages for `GLTFLoader`, `RGBELoader`, color management (r152+ defaults), and GSAP ScrollTrigger docs — **use only documented APIs**.
**New in v1.2 — also verify the Part 11 toolchain before any modeling:**
- **P0-8 (transmission):** render a `MeshPhysicalMaterial{transmission:1, thickness:0.005, ior:1.5}` sphere in front of a patterned plane in headless Chromium/SwiftShader; the screenshot must show the pattern *through* the sphere (refracted). If SwiftShader cannot render the transmission pass, document the QA fallback (alpha-blend preview + one real-device check) before Phase 2.
- **P0-9 (PBR extensions post-pass):** run a minimal `tools/set_pbr_extensions.mjs` (Rule R6.3, Part 11.4) against the Phase 0 test GLB; `npx @gltf-transform/cli inspect` must show `KHR_materials_transmission`, `KHR_materials_volume`, `KHR_materials_ior` on the target material.
- **P0-10 (flake maps):** run `tools/gen_glitter_maps.py` (Rule R5.2, Part 11.3); confirm 2048² PNGs are produced and that a test render with the flake normal map shows discrete glints under the studio HDRI.
**Verify:** each tool produces real output (a `.glb`, a screenshot PNG, an inspect table, the three P0-8..P0-10 artifacts).
**Guards:** do not assume API names from memory — three.js renamed color/encoding APIs at r152; GSAP plugin registration is `gsap.registerPlugin(ScrollTrigger)`; Blender 4.1+ removed `mesh.use_auto_smooth` (use `bpy.ops.object.shade_auto_smooth`).

### Phase 1 — Asset pipeline tooling (1 session)
**Do:** implement `tools/prep_label.py` (rembg → rectify → upscale → 2048px atlas), `tools/build_can.py` and `tools/build_bottle.py` (parametric bpy: dimensions/profile → UV → PBR → optional 2-bone wiggle armature clip → GLB), `tools/optimize.sh` (gltf-transform: meshopt + ktx2/webp fallback, report sizes), `tools/qa_shot.mjs` (serve + headless screenshot of a viewer page).
**Verify:** run the full chain on a *placeholder* photo (any can image) → optimized GLB ≤ 2 MB → screenshot shows a lit, labeled can.
**Guards:** always set `texture.colorSpace = SRGBColorSpace` on albedo only (not on roughness/normal maps); keep real-world scale in meters (Mana's can is 0.06 × 0.15 m).

### Phase 2 — Model production from the user's photos (1 session per product; 2 for Route D products)
**Do:** apply Phase 1 tools to the user's actual photos (per spec 4.4); choose route via matrix 4.5 — **eyewear-class products are always Route D (4.6) and are built under the binding rules of Part 11**; iterate with the QA loop: turntable screenshots from 4 angles vs. reference photos → adjust proportions/materials → repeat. For Route D, session 1 = geometry until the R7 silhouette gate passes; session 2 = materials until the R5/R6 gates pass.
**Verify (all hard gates — a failed gate means the phase is NOT done):**
- side-by-side screenshot vs. photo approved by the user; `gltf-transform inspect` within budgets; label text readable at 1024px render (Route A);
- **R3 faceting audit:** 4 zoom crops at 300% on curved silhouettes show no polygon corners; triangle count above the class floor (a hero eyewear model under ~40K tris is an automatic red flag);
- **R4 material audit:** every material in the exported glTF that specs a finish carries the expected image textures — a textureless material where glitter/print was spec'd = fail;
- **R5 sparkle gate:** two-angle glint diff passes (pattern changes with view angle) and glint density matches the macro photo within [0.5×, 2×];
- **R6 translucency gate:** parts behind the plastic (e.g. folded temples behind the browbar) are visible through it in the render, as in the photo;
- **R7 silhouette gate:** front-view mask IoU vs the photo ≥ 0.92, overlay diff attached;
- **every extracted sprite passes the Rule R2 edge audit + zoom contact-sheet pass (neutral background)**.
**Guards:** never ship an AI-generated label texture (Route B shapes still get real artwork re-projected); don't exceed texture budget for marginal sharpness; **no sliced/partial cutouts — whole elements, reconstructed, or dropped (Rule R2)**; **never export without `export_apply=True` (Rule R3.4)**; **no procedural shader nodes may remain at export (Rule R4)**; **Routes B/C are prohibited for thin-feature/transparent products (matrix 4.5)**.

### Phase 3 — Web viewer foundation (1 session)
**Do:** Vite project per Part 6 layout; `core/scene.ts` (renderer, DPR cap, `NeutralToneMapping`, sRGB, HDRI environment, resize, visibility pause) and `core/loaders.ts` (self-hosted Draco/Meshopt/KTX2 decoder files copied from `node_modules/three/examples/jsm/libs/`); poster fallback when `getContext('webgl2')` fails; `window.__sceneReady` flag after first render (for QA tooling).
**Verify:** `qa_shot.mjs` screenshot shows the Phase 2 model lit correctly; no console errors; bundle size within budget.
**Guards:** don't hotlink decoder/HDRI CDNs (drei presets and unpkg are not production paths) — self-host everything.

### Phase 4 — Motion library (1–2 sessions)
**Do:** implement recipes M1–M8 as `motion/*` modules with the constants from Part 1.2 as defaults; one demo page per recipe reproducing its reference example (robot-style look-at with any CC0 rigged model, Mana-style scroll page with our product, glass and typography demos).
**Verify:** per recipe, a scripted Playwright run (move mouse to known coordinates / scroll to known offset → screenshot → assert the object visibly moved/rotated — compare pixel diffs between states).
**Guards:** all continuous motion must be eased/damped (`quickTo`, `slerp`) — instant tracking looks broken; everything through `gsap.ticker`, one RAF loop total; kill ScrollTriggers on teardown.

### Phase 5 — Product page assembly (1–2 sessions)
**Do:** compose the Tutu brand product page: hero (G1 entry + G2 idle + G3 parallax) → scroll story sections (G5: rotation scrub, camera dollies, scrubbed wiggle clip) → variant/flavor switcher if applicable (G6) → CTA. Copy pacing from Mana (desktop-only scroll rotation, mobile simplified). Wire brand colors/typography (see `environments.md` visual direction in this repo). **If the user supplied a reference image for the page/background, start with the Rule R1 reference-inventory table and build the composition from it — do not invent a layout.**
**Verify:** full-page Playwright pass: screenshots at scroll 0 / 25 / 50 / 75 / 100 %, at two viewports (1440px, 390px); mobile shows poster/simplified mode; Lighthouse perf ≥ 85 on desktop; **Rule R1 overlay diff vs. the reference image, element-by-element, plus a 200% zoom pass over every floating element (Rule R2)**.
**Guards:** no scroll-jacking without Lenis + ScrollTrigger integration (the documented recipe); text content must remain real HTML for SEO/accessibility — 3D is presentation, not content; **no free composition when a reference exists — deviations require prior user approval (Rule R1)**.

### Phase 6 — Optimization & QA hardening (1 session)
**Do:** `gltf-transform optimize` final pass; KTX2 with WebP fallback; lazy-load the 3D bundle below the fold; `prefers-reduced-motion` → static presentation; WebGL context-loss handler → poster; cross-check budgets table.
**Verify:** budgets table all green; `qa_shot` diff between Draco/Meshopt variants renders identically; reduced-motion mode screenshot verified.
**Guards:** don't chase headless FPS (SwiftShader is software) — budgets are the perf gate; ask the user for one real-device spot check.

### Phase 7 — Deploy & embed (½ session)
**Do:** deploy to free static hosting (Cloudflare Pages preferred: unlimited bandwidth for the GLB/HDR). For Shopify production embed, replicate the verified Mana pattern: upload GLB/HDR/textures + single-file JS bundle as **theme assets**, add a Liquid section with `<canvas>` + `<script type="module" src="{{ 'tutu3d.js' | asset_url }}" data-model="{{ 'tutu-can.glb' | asset_url }}">`; iframe embed as the zero-risk alternative. (This session already has Shopify MCP access — asset upload can be done via API with user approval.)
**Verify:** live URL loads on desktop + mobile; assets served with cache headers; user sign-off.
**Guards:** don't push to a live Shopify theme without explicit user approval — use an unpublished/duplicate theme first.

### Final phase — Verification sweep
Re-run every phase's checklist top to bottom on the deployed URL; grep the codebase for anti-patterns (`unpkg.com`, `presets from CDN`, missing `dispose`, uncapped `setPixelRatio`); confirm all budgets; deliver a summary with screenshots.

---

# PART 8 — Working Methods (who does what, where)

| Activity | Where | Who |
|---|---|---|
| Photo/artwork intake | User sends product photos + label artwork + dimensions (spec 4.4) | **User** |
| Photo prep, modeling, texturing, GLB export | Claude's container (`rembg`/OpenCV/`bpy`) | **Claude, autonomous** |
| AI shape generation (only Route B) | HF Space (`gradio_client` — needs user's free HF token) or user's browser | Claude *or* User (one click) |
| Page code, motion, optimization | Claude's container (Vite/three/GSAP) | **Claude, autonomous** |
| Visual QA loop | Claude's container (Playwright screenshots — Claude *looks* at every render) | **Claude, autonomous** |
| Look approval gates | End of Phase 2 (model vs. photo) and Phase 5 (page feel) — Claude posts screenshots, user says go/adjust | **User** (minutes) |
| Real-device spot check | User's phone/laptop on the preview URL | **User** (once) |
| Deploy | Git push → Pages; Shopify theme assets via API after approval | Claude, with user approval for Shopify |

**The self-verification loop that makes autonomy real:** every visual change ends with a headless screenshot that Claude inspects before proceeding — the same forensic capability used to decode Mana's site is turned on our own output.

---

# PART 9 — Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| AI route hallucinates/degrades labels | Certain (verified) | Route A default; Route B always re-textures with real artwork |
| Free-tier terms drift (Meshy credits, ZeroGPU quotas) | Medium | Re-verify at execution; core pipeline (Route A) has zero external dependencies |
| Hunyuan3D license excludes EU/UK/KR | Fixed term | Default to TRELLIS (MIT) unless user confirms non-excluded territory |
| SwiftShader ≠ real GPU colors/perf | Low visual, real perf | Budgets + one human device check |
| Shopify Liquid/CSP quirks (import maps) | Medium | Single-file bundle; iframe fallback |
| Heavy scene on mobile | Medium | Poster-first mobile, reduced effects (< 600 px, the Mana approach), `prefers-reduced-motion` |
| Transmission pass too heavy on mobile / absent under SwiftShader | Medium | Rule R6.4 alpha-blend fallback; Phase 0 check P0-8; one real-device spot check |
| Texture compression destroys glitter (speckle noise + ETC1S = mud) | Certain if ignored | Rule R5.5: flake maps are UASTC or lossless WebP, never ETC1S, never below 2048 |
| Blender exporter silently drops modifiers / procedural nodes | Certain if ignored (v1.1's "pixelated, no glitter" build) | Rules R3.4 (`export_apply=True`) + R4 (image textures only) + the R4 material audit gate |

---

# PART 10 — Binding Fidelity Rules (v1.1 — added after first build review)

These rules are **mandatory** for every phase and override any conflicting wording
elsewhere in this plan. Both exist because their violation reached a delivered page.

## Rule R1 — A user-supplied reference image is a binding spec, not inspiration

When the user provides a reference image for a page, background, or composition
("use this as the background/reference"), the default is a **1:1 reproduction**.
Creative reinterpretation is a bug, not a feature.

**Required workflow:**
1. **Decompose the reference first.** Before building anything, produce a reference
   inventory table: every visible element, its position (as % of frame width/height),
   relative size, layer order (in front of / behind), and material/finish
   (glass, matte print, gradient). This table is the layout spec.
2. **Build from the table, not from taste.** Element positions, sizes, and layering in
   the scene must come from the measured values. Free placement is allowed only for
   elements that do not exist in the reference — and only after user approval.
3. **Verify by overlay diff.** End-of-phase check: render the built page at the
   reference's aspect ratio and produce a side-by-side + semi-transparent overlay
   against the reference image. Audit element-by-element against the inventory table.
   Any element in the wrong place/size/layer = phase not done.
4. **Deviations need approval.** Any intentional deviation (technical constraint,
   missing asset) is listed in a "deviations" note shown to the user *before* the
   phase is declared complete — never discovered by the user afterwards.

**Anti-pattern (what happened in v1.0):** the key-visual reference was used as a "mood"
while positions, element selection, and the backdrop itself were improvised. Never again:
"inspired by" is only permitted when the user explicitly asks for a variation.

## Rule R2 — Zero crop-artifact policy for extracted assets

No sprite/cutout may ship with a visible straight crop edge, sliced artwork, or a
fragment of a neighboring element. Violations seen in v1.0: a mint leaf with a flat
sliced side, a flower with a cut-off attached leaf, a starburst with amputated rays.

**Required workflow:**
1. **Cut whole elements only.** The crop box must fully contain the element with a
   margin. If the element is partially occluded or overlapped by other artwork in the
   source, do one of: (a) enlarge/move the box to capture it whole; (b) reconstruct the
   missing part (mirror a clean half, redraw the simple vector shape, clone from a
   sibling asset — e.g. another flavor's label); (c) **drop the element entirely**.
   Shipping a sliced element is never an option.
2. **Automated edge audit (hard gate).** For every produced sprite PNG: fail if any
   pixel with alpha > 0 lies within 2 px of the canvas border — that is the signature
   of sliced content (autocrop pads real silhouettes with transparent margin; content
   touching the border means the cut went through artwork). The audit runs in the asset
   pipeline script and blocks the phase on failure.
3. **Human-eye zoom pass.** Before use, render every sprite at 2–4× on a contrasting
   background in a contact sheet and visually inspect silhouettes for straight lines,
   half-shapes, and foreign fragments. (v1.0's contact sheets were green-on-green,
   which hid green-edge defects — use a neutral magenta/checker background.)
4. **In-page audit.** The final page screenshot review explicitly includes zooming into
   every floating element at 200 % — the defects the user caught were visible only at
   zoom.

**Anti-pattern guards (grep-able):** no `crop((` box committed without a following
edge-audit call; no `ship` of a sprite whose bounding silhouette touches the canvas
border; contact sheets must use a non-brand background color.

---

# PART 11 — Binding Model-Quality Rules (v1.2 — added after the glasses build review)

These rules are **mandatory** for every 3D model produced under this plan and override any
conflicting wording elsewhere. They exist because the first glasses build shipped three
defect classes: **faceted/"pixelated" geometry**, **no glitter**, and **opaque plastic**
where the product is translucent. Each rule ends with a hard gate — *a phase that has not
passed its gates is not done, regardless of how good the result "looks" to the builder.*

## 11.1 Rule R3 — No visible faceting: smooth-geometry standard

"Low-poly" is a rendering budget, not a look. The customer must never see a polygon.

1. **Curve resolution floors.** Every curved silhouette edge carries ≥ 96 segments at
   silhouette scale; contour curves imported from photos are resampled to ≥ 256 points
   (outer outlines ≥ 512). Never accept a Blender primitive's default segment count
   (32-segment cylinders are the "pixelated" look) — set counts explicitly.
2. **Bevel every visible edge.** Injection-molded products have no sharp edges. Every
   visible edge gets a bevel of ≥ 0.4 mm with ≥ 2 segments (modifier or edit-mode bevel).
   Raw box/cylinder edges are a defect.
3. **Smooth shading, current API.** Every mesh gets smooth shading with an auto-smooth
   angle of 30–45°: `bpy.ops.object.shade_auto_smooth(angle=0.6)`. **Blender 4.1+ removed
   `mesh.use_auto_smooth`** — code copied from old tutorials will throw or silently ship
   flat shading. Verify normals in the *exported* glTF, not in the Blender viewport.
4. **Apply modifiers at export — the #1 blockiness bug.** Blender's glTF exporter does
   **not** apply modifiers by default: with `export_apply=False` (the default), Subdivision
   Surface, Bevel, and Boolean modifiers are discarded and **the low-poly cage ships**.
   Every export in this project uses:

   ```python
   bpy.ops.export_scene.gltf(
       filepath=out_path,
       export_format='GLB',
       export_apply=True,   # ← without this, subsurf/bevel are dropped and the cage ships
       export_yup=True,
   )
   ```

5. **Verification gate.** (a) `gltf-transform inspect`: triangle count above the class
   floor — a hero eyewear model below ~40K triangles cannot be smooth and is an automatic
   fail; (b) render 4 zoom crops at 300% centered on curved silhouettes (for eyewear: lens
   rim, browbar edge, slat ends, temple curve) and inspect them — any visible polygon
   corner on a spec'd curve = fail.

## 11.2 Rule R4 — glTF ships image textures, not node graphs

glTF export supports **only** an image-texture-driven Principled BSDF. Any procedural
shader nodes (Noise, Voronoi, sparkle setups, mix networks) are **silently dropped** —
the model exports "successfully" and arrives with flat plastic. This is the mechanism
behind "the glitter disappeared."

1. **At export time, every material is a Principled BSDF whose inputs are image textures
   or constants.** Nothing else exists in the node tree.
2. **Produce the images deterministically.** Preferred: generate maps directly with
   NumPy/PIL with a fixed seed (see R5.2) — reproducible and headless-safe. Fallback for
   arbitrary looks: bake Cycles → image textures, then rewire the Principled BSDF to the
   baked images before export.
3. **Material audit gate.** After export, run `npx @gltf-transform/cli inspect model.glb`
   and check the materials table: every material spec'd with a finish must reference its
   expected textures (the glitter material must list a `normalTexture` and a
   roughness texture at minimum). A textureless material where a finish was spec'd = fail.
4. **Color space.** Albedo textures: sRGB. Normal/roughness/metallic maps: linear
   (non-color). Wrong assignment washes out or darkens the finish.

## 11.3 Rule R5 — Glitter standard (view-dependent sparkle, not painted dots)

Physical model: glitter is thousands of micro-mirrors at random orientations suspended in
the plastic. Each flake flashes only when its orientation mirrors a bright light source
into the camera — so the glint pattern **changes as the model or camera moves**. Dots
painted into the albedo are static from every angle: that is paint, not glitter, and the
R5.4 gate exists to catch exactly that.

1. **Measure, don't guess.** From the macro photo crop (spec 4.4 item 5): flake size (mm),
   flake density (flakes/cm²), flake colors (typically silver/white + body-color flakes).
   These numbers parameterize the generator below and the R5.4 density check.
2. **Generate the flake maps** (`tools/gen_glitter_maps.py`, deterministic seed):

   ```python
   """Deterministic glitter texture set — image textures survive glTF export (Rule R4).
   Outputs: flake_normal.png, flake_rough.png (2048x2048, linear/non-color)."""
   import numpy as np
   from PIL import Image

   S = 2048
   N_FLAKES = 90_000        # calibrate against macro-photo density (R5.1)
   RNG = np.random.default_rng(7)

   # Flake normal map: flat base + randomly tilted micro-facets
   nrm = np.zeros((S, S, 3), np.float32); nrm[..., 2] = 1.0
   xy   = RNG.integers(3, S - 8, (N_FLAKES, 2))
   tilt = RNG.uniform(-0.55, 0.55, (N_FLAKES, 2))   # facet orientation spread
   size = RNG.integers(2, 6, N_FLAKES)              # 2–5 px at 2048 ≈ 0.2–0.5 mm flakes
   for (x, y), (tx, ty), s in zip(xy, tilt, size):
       n = np.array([tx, ty, 1.0], np.float32); n /= np.linalg.norm(n)
       nrm[y:y+s, x:x+s] = n
   Image.fromarray(((nrm * 0.5 + 0.5) * 255).astype(np.uint8)).save("flake_normal.png")

   # Roughness map: glossy base, slightly rough flakes (sharp but visible glints)
   rough = np.full((S, S), 0.08, np.float32)
   for (x, y), s in zip(xy, size):
       rough[y:y+s, x:x+s] = 0.30
   Image.fromarray((rough * 255).astype(np.uint8)).save("flake_rough.png")
   ```

3. **Material + lighting values.** Flake normal map with `normalScale` 0.6–1.2; base
   roughness 0.05–0.12 (from the roughness map); `metallic = 0` for plastic (glints come
   from the normal facets, not metalness). The environment must satisfy the Part 5 sparkle
   lighting rule (small bright HDRI emitters, `envMapIntensity ≈ 2`) — flakes without
   point-like lights produce zero sparkle. Optional depth upgrade: a second, inner shell
   (solidify offset −0.5 mm) carrying alpha-masked flakes gives parallax "inside the
   plastic"; ship only if the two-mesh cost fits the Part 6 budgets.
4. **Sparkle gate** (`tools/qa_sparkle.mjs` — hard gate, headless):
   - Render 1024² frames at camera yaw 0° and 3° (same lighting, same distance).
   - `glints(img)` = pixels inside the frame mask with luminance > 240.
   - **PASS iff** (a) glint density is within [0.5×, 2×] of the macro-photo density, and
     (b) `Jaccard(glints_0°, glints_3°) < 0.6` — the pattern must move with the view.
   - Failing (b) means the sparkle is static albedo paint → rebuild per R5.2/R5.3.
5. **Compression rules.** Flake maps are high-frequency noise: **never ETC1S** (KTX2's
   ETC1S mode averages the speckle into mud), never resized below 2048. Use KTX2/UASTC or
   lossless WebP/PNG, and re-run the R5.4 gate *after* `gltf-transform optimize` — the
   gate must pass on the final compressed asset, not the pre-optimization one.

## 11.4 Rule R6 — Translucent tinted plastic standard (transmission, not opacity hacks)

Products like the Tutu glasses are transparent tinted plastic: you can see the folded
temples *through* the browbar in the reference photo. An opaque purple material is a fail.

1. **Target PBR values:** `transmission ≈ 0.95`, `ior ≈ 1.48` (acrylic/polycarbonate),
   base roughness from the R5 map, `baseColorFactor` near-white — **the purple tint comes
   from volume absorption, not from albedo** (`KHR_materials_volume`:
   `thicknessFactor` = the part's physical depth in meters, `attenuationColor` sampled
   from a thick region of the photo, `attenuationDistance` ≈ 6 mm). Thin parts render
   paler, thick parts deeper purple — exactly like real tinted plastic.
2. **Author minimally in Blender, finish programmatically.** In Blender, build the
   material as a plain glossy Principled BSDF with the R5 flake textures. Do **not** fight
   the exporter's transmission/volume node mapping — it is version-fragile.
3. **PBR extensions post-pass** (`tools/set_pbr_extensions.mjs`):

   ```js
   // Author transmission/volume/IOR deterministically on the exported GLB.
   import { NodeIO } from '@gltf-transform/core';
   import {
     KHRMaterialsTransmission, KHRMaterialsVolume, KHRMaterialsIOR,
   } from '@gltf-transform/extensions';

   const io = new NodeIO().registerExtensions([
     KHRMaterialsTransmission, KHRMaterialsVolume, KHRMaterialsIOR,
   ]);
   const doc = await io.read('glasses.glb');
   const [tr, vol, ior] = [
     KHRMaterialsTransmission, KHRMaterialsVolume, KHRMaterialsIOR,
   ].map((E) => doc.createExtension(E));

   for (const mat of doc.getRoot().listMaterials()) {
     if (!mat.getName().startsWith('GlitterPlastic')) continue;
     mat.setBaseColorFactor([1, 1, 1, 1]); // tint via volume attenuation, not albedo
     mat.setExtension('KHR_materials_transmission',
       tr.createTransmission().setTransmissionFactor(0.95));
     mat.setExtension('KHR_materials_volume',
       vol.createVolume()
         .setThicknessFactor(0.005)              // = physical depth in meters
         .setAttenuationColor([0.72, 0.25, 0.8]) // sampled from the photo (R6.1)
         .setAttenuationDistance(0.006));
     mat.setExtension('KHR_materials_ior', ior.createIOR().setIOR(1.48));
   }
   await io.write('glasses.pbr.glb', doc);
   ```

   Three.js `GLTFLoader` maps all three extensions onto `MeshPhysicalMaterial`
   automatically — no custom viewer code needed.
4. **Fallback path.** The transmission pass is the most expensive material feature in
   three.js: on mobile (< 600 px, the Mana breakpoint) and wherever Phase 0 check P0-8
   found SwiftShader lacking, swap to an alpha-blend approximation
   (`transparent: true, opacity ≈ 0.85`, tinted albedo) — visually poorer but honest.
   Keep transmission-material meshes ≤ 3 per scene (Part 6 budget).
5. **Verification gate.** In the QA render from the reference photo's angle, geometry
   behind the plastic (folded temples behind the browbar; slats behind the browbar edge)
   must be visibly *through* the material, as in the photo. Fully opaque = fail.

## 11.5 Rule R7 — Silhouette fidelity: the photo is the blueprint

The same discipline as Rule R1, applied to the product itself. Freehand modeling "in the
spirit of" the product produced the v1.1 toy look.

1. **Build from measured curves.** The front photo is processed by
   `tools/extract_outline.py` (Part 4.6) into mm-scaled outer + hole contours; the bpy
   build consumes those curves. Proportions are never eyeballed; feature counts (e.g.
   number of shutter slats) are **read from the mask's hole count, never invented**.
2. **Geometry-only silhouette render.** For the gate, render the front view with
   `scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })` on a white
   background — transmission would make transparent parts vanish from an alpha mask.
3. **IoU gate ≥ 0.92** (`tools/qa_silhouette.py`):

   ```python
   import cv2, numpy as np

   def bbox_crop(m):
       ys, xs = np.where(m)
       return m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

   render = cv2.imread("render_mask.png", 0) < 128   # black silhouette on white
   photo  = cv2.imread("photo_mask.png", 0) > 127    # rembg mask of the front photo
   a, b = bbox_crop(render), bbox_crop(photo)
   H, W = 1000, int(1000 * b.shape[1] / b.shape[0])
   a = cv2.resize(a.astype(np.uint8), (W, H)) > 0
   b = cv2.resize(b.astype(np.uint8), (W, H)) > 0
   iou = np.logical_and(a, b).sum() / np.logical_or(a, b).sum()
   print(f"IoU = {iou:.3f}")
   assert iou >= 0.92, "silhouette gate FAILED — fix geometry, do not tune the gate"
   ```

   Also write the semi-transparent overlay image (render over photo) for the eye pass and
   the user's approval gate.
4. **Deviations note.** Any intentional deviation (simplified hinge, dropped screw detail)
   is listed and shown to the user *before* the phase is declared complete — Rule R1.4
   applies verbatim.

## 11.6 Worked example — Tutu glitter shutter-shade glasses (the v1.1 failure case)

Product (from the user's reference photo): shutter-shade party glasses, one-piece front,
translucent purple/magenta **glitter** plastic, glossy injection-molded finish.

**Reference inventory (sanity values — R7 re-measures all of them programmatically):**

| Element | Measured from the photo (W = overall width, H = front height) |
|---|---|
| Overall front | H ≈ 0.52·W; assume W = 148 mm unless the user supplies dimensions (state assumption per 4.4 item 5) |
| Browbar | full-width band, ≈ 0.20·H tall, with a center V-notch above the nose bridge; merges into chunky angular end-pieces at the outer corners (visible faceted cut planes) |
| Lens openings | two rounded openings ≈ 0.38·W wide × ≈ 0.60·H tall, nose bridge ≈ 0.09·W between them |
| Shutter slats | **count = number of interior holes in the mask per eye (photo shows 8 gaps/eye)**; slat depth thinner than the browbar (≈ half), rounded profile, gentle forward wrap |
| Rear lenses | clear circular discs faintly visible behind the slats — thin (≈ 1 mm), `transmission 1, roughness 0.02` |
| Temples | wide translucent paddles: narrow at hinge, widest ≈ 70% along, rounded tip with downward ear curve; **visible through the browbar in the photo — this is the R6.5 check** |
| Material | translucent purple plastic (thick-region color ≈ `#B85FC6`), dense fine glitter: silver/white + magenta flakes ≈ 0.2–0.5 mm, suspended in the volume |

**Build recipe (bpy, all under R3/R7):**
1. **Front plate:** outer contour + all interior holes from `outlines.json` → filled face →
   extrude to 5 mm. The silhouette-with-holes *is* the browbar + rims + slats in one piece —
   exactly like the molded original. Then select the slat faces (the strips between
   consecutive gap-holes) and reduce their depth to ≈ 2.5 mm, centered.
2. **Wrap:** Simple Deform (bend, ≈ 12°) around the vertical axis for the face curvature.
3. **Bevel:** 0.6 mm / 3 segments on the whole front plate (R3.2).
4. **Temples:** profile paddle per the inventory row (side photo if supplied, else the
   parametric description), thickness 2.5 mm, bevel 0.5 mm; hinge blocks boolean-united
   with the front end-pieces. Model them **folded-open at ≈ 95°** for the hero pose.
5. **Rear lenses:** inner rim contour → thin disc, 1 mm behind the slats.
6. **Shading/export:** `shade_auto_smooth(angle=0.6)` on every mesh; meters scale
   (W = 0.148); `export_apply=True` (R3.4).
7. **Materials:** one `GlitterPlastic_Purple` (R5 flake maps + R6 post-pass), one
   `Lens_Clear`. No other materials.
8. **Expected budget:** front plate ≈ 60–90K tris after bevels, temples ≈ 15K each,
   lenses ≈ 2K → **≈ 100–130K total** (inside the Part 6 eyewear budget; meshopt → ~2 MB).

**QA for this product:** R7 IoU vs the front photo ≥ 0.92 · R3.5 crops on lens rim /
browbar edge / slat ends / temple curve · R5.4 sparkle diff · R6.5 temples visible through
the browbar · side-by-side hero render vs photo → user approval gate (Part 8).

## 11.7 Anti-pattern guards (grep-able)

- `export_scene.gltf(` without `export_apply=True` in the same call = defect (R3.4).
- `use_auto_smooth` anywhere = dead API, will not run on Blender 4.1+ (R3.3).
- `ShaderNodeTexNoise|ShaderNodeTexVoronoi|ShaderNodeTexMusgrave` present at export time = dropped material (R4).
- `etc1s` applied to any `flake_*` texture = destroyed glitter (R5.5).
- `opacity` used for the plastic body instead of transmission on desktop = fake translucency (R6) — allowed only in the R6.4 fallback path.
- A silhouette IoU assert loosened below 0.92 = gate tampering (R7.3): fix the geometry, never the gate.

---

## Appendix A — Evidence log (this session)

> **v1.2 note:** items 1–7 below were verified live during the original research session.
> The v1.2 additions (Part 4.6, Part 11) are design-verified recipes based on documented
> APIs (Blender glTF exporter options, `@gltf-transform/extensions`, three.js
> `MeshPhysicalMaterial` transmission) — **Phase 0 checks P0-8, P0-9, P0-10 must re-verify
> them in the execution container before any modeling starts.**

1. Fetched all 4 `my.spline.design` pages; NEXBOT page = 4.7 MB single inline script; `@splinetool/runtime@1.12.98`; scene inlined as MessagePack byte array (`app.start([212,114,64,...])`); keys seen: `objects/states/events/position/rotation/scale/physics/cloner`.
2. Fetched `en.manayerbamate.com`: `<body data-modele=... data-hdr=... data-mure/trop/melo=...>`; downloaded `global.js` (1.1 MB): three.js **r141** (`REVISION="141"`), 322 GSAP refs, ScrollTrigger, Lenis, `GLTFLoader`, `RGBELoader`, `AnimationMixer`, `envMapIntensity=2.02`, texture-swap flavor logic, decoded entry/parallax/scroll/elastic-switch parameters (Part 1.2.3).
3. Downloaded + inspected `MANA_canettes__v5_WEBGL.gltf` with `gltf-transform inspect`: Blender exporter v3.3.27, 2 cylinder meshes, 13,990 verts, skinned 2-bone armature, 2 animation clips, PBR texture set, `KHR_materials_specular/ior`, ~2 MB total with textures + 435 KB HDR.
4. **Capability test 1:** `bpy` 5.0.1 headless in this container: cylinder can + metallic PBR + smooth shading → valid 11 KB GLB exported in ~6 ms (Draco lib bundled).
5. **Capability test 2:** Playwright + headless Chromium + SwiftShader: three.js 0.185.1 PBR scene rendered (WebGL2 confirmed, 256 triangles, 1 draw call) and screenshot captured showing the lit metallic cylinder.
6. **Capability test 3:** `npx @gltf-transform/cli inspect` ran successfully against the Mana model.
7. Two parallel research agents produced source-verified reports (npm registry, official pricing/docs pages, GitHub licenses) — key facts embedded throughout; volatile free-tier numbers flagged for re-verification at execution time.

## Appendix B — Key sources

- three.js docs & release notes (color management r152+, NeutralToneMapping) — threejs.org
- GSAP standard license & 3.13 "all plugins free" — gsap.com/community/standard-license, gsap.com/blog/3-13
- Spline pricing & export docs (watermark on free web export; code export = Professional plan) — spline.design/pricing, docs.spline.design
- drei docs (ScrollControls, Float, Environment "presets not for production", MeshTransmissionMaterial) — drei.docs.pmnd.rs
- gltf-transform CLI — gltf-transform.dev/cli
- Poly Haven CC0 license — polyhaven.com/license
- Blender as Python module (`bpy`) — docs.blender.org (info_advanced_blender_as_bpy)
- TripoSR (MIT, CPU fallback) — github.com/VAST-AI-Research/TripoSR; Stable Fast 3D — github.com/Stability-AI/stable-fast-3d
- TRELLIS / TRELLIS.2 (MIT) — github.com/microsoft/TRELLIS
- Hunyuan3D 2.1 + Community License (EU/UK/KR exclusion) — github.com/Tencent-Hunyuan/Hunyuan3D-2.1
- Meshy pricing (100 credits/mo, CC BY 4.0) — meshy.ai/pricing; Tripo3D pricing (free = non-commercial) — tripo3d.ai/pricing
- rembg (MIT) — github.com/danielgatis/rembg; Real-ESRGAN (BSD-3) — github.com/xinntao/Real-ESRGAN
- Headless Chromium SwiftShader flag change — chromestatus.com/feature/5166674414927872
- Mana Yerba Mate production site (teardown target) — en.manayerbamate.com
