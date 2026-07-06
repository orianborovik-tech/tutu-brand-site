# Tutu Brand — Interactive 3D Product Pages: Research Report & Master Implementation Plan

**Status:** Ready for execution
**Executor:** Claude Code (this plan is written to be executed by Claude Code, phase by phase)
**Date:** 2026-07-06
**Branch:** `claude/spline-design-concepts-d9bhxs`

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
   For packaged goods with printed labels (cans, bottles, jars, tubes, boxes) the professional route — and the one Mana itself used — is **model the simple shape parametrically in Blender + apply the real label artwork/photo as a texture**. The label is pixel-perfect because it *is* the photo. AI image-to-3D (TRELLIS, Hunyuan3D, Meshy free tier) is reserved for organic/complex shapes, because every current AI model degrades label text and hallucinates the back side. Full pipeline in Part 4.

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

## 4.5 Decision matrix

| Product shape | Route |
|---|---|
| Can / bottle / jar / tube / box / pouch | **A** (parametric + real texture) |
| Sculpted or organic form, matte | **B** (TRELLIS/Hunyuan via free Space) + label re-projection |
| Sculpted, shiny | **B** for shape + heavy Blender material work |
| Anything, if user can't photograph well | A with the print artwork, or B from a single decent photo |

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

**Look & lighting defaults:** self-hosted Poly Haven studio HDRI (1K, CC0) as `scene.environment`; `NeutralToneMapping` for color-accurate product shots (or `ACESFilmic` for drama); `envMapIntensity ≈ 2` (Mana's value); soft contact shadow (baked radial gradient plane or drei-style ContactShadows).

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
| Triangles | 10–50K |
| Textures | ≤ 2048 px, KTX2 or WebP |
| HDRI | 1K, ≤ 1 MB |
| JS bundle (three+gsap+app) | ≤ 800 KB gzip |
| Draw calls | < 50 |
| Mobile | poster-first, reduced effects (Mana disables scroll-rotation < 600 px) |

---

# PART 7 — Phased Implementation Plan (for Claude Code execution)

> Each phase is self-contained, ends with a verification checklist, and lists anti-pattern guards. Execute phases in order; each can run in a fresh session.

### Phase 0 — Environment & documentation verification (½ session)
**Do:** confirm `bpy` imports and exports a GLB; confirm Playwright WebGL screenshot works (`--use-gl=angle --use-angle=swiftshader`, add `--enable-unsafe-swiftshader` on newer Chromium); `npm i three gsap lenis vite`; `npx @gltf-transform/cli --help`; `pip install "rembg[cpu]" opencv-python-headless pillow`; download 1 Poly Haven studio HDRI (1K). Read the current three.js docs pages for `GLTFLoader`, `RGBELoader`, color management (r152+ defaults), and GSAP ScrollTrigger docs — **use only documented APIs**.
**Verify:** each tool produces real output (a `.glb`, a screenshot PNG, an inspect table).
**Guards:** do not assume API names from memory — three.js renamed color/encoding APIs at r152; GSAP plugin registration is `gsap.registerPlugin(ScrollTrigger)`.

### Phase 1 — Asset pipeline tooling (1 session)
**Do:** implement `tools/prep_label.py` (rembg → rectify → upscale → 2048px atlas), `tools/build_can.py` and `tools/build_bottle.py` (parametric bpy: dimensions/profile → UV → PBR → optional 2-bone wiggle armature clip → GLB), `tools/optimize.sh` (gltf-transform: meshopt + ktx2/webp fallback, report sizes), `tools/qa_shot.mjs` (serve + headless screenshot of a viewer page).
**Verify:** run the full chain on a *placeholder* photo (any can image) → optimized GLB ≤ 2 MB → screenshot shows a lit, labeled can.
**Guards:** always set `texture.colorSpace = SRGBColorSpace` on albedo only (not on roughness/normal maps); keep real-world scale in meters (Mana's can is 0.06 × 0.15 m).

### Phase 2 — Model production from the user's photos (1 session per product)
**Do:** apply Phase 1 tools to the user's actual photos (per spec 4.4); choose route via matrix 4.5; iterate with the QA loop: turntable screenshots from 4 angles vs. reference photos → adjust proportions/materials → repeat.
**Verify:** side-by-side screenshot vs. photo approved by the user; `gltf-transform inspect` within budgets; label text readable at 1024px render.
**Guards:** never ship an AI-generated label texture (Route B shapes still get real artwork re-projected); don't exceed texture budget for marginal sharpness.

### Phase 3 — Web viewer foundation (1 session)
**Do:** Vite project per Part 6 layout; `core/scene.ts` (renderer, DPR cap, `NeutralToneMapping`, sRGB, HDRI environment, resize, visibility pause) and `core/loaders.ts` (self-hosted Draco/Meshopt/KTX2 decoder files copied from `node_modules/three/examples/jsm/libs/`); poster fallback when `getContext('webgl2')` fails; `window.__sceneReady` flag after first render (for QA tooling).
**Verify:** `qa_shot.mjs` screenshot shows the Phase 2 model lit correctly; no console errors; bundle size within budget.
**Guards:** don't hotlink decoder/HDRI CDNs (drei presets and unpkg are not production paths) — self-host everything.

### Phase 4 — Motion library (1–2 sessions)
**Do:** implement recipes M1–M8 as `motion/*` modules with the constants from Part 1.2 as defaults; one demo page per recipe reproducing its reference example (robot-style look-at with any CC0 rigged model, Mana-style scroll page with our product, glass and typography demos).
**Verify:** per recipe, a scripted Playwright run (move mouse to known coordinates / scroll to known offset → screenshot → assert the object visibly moved/rotated — compare pixel diffs between states).
**Guards:** all continuous motion must be eased/damped (`quickTo`, `slerp`) — instant tracking looks broken; everything through `gsap.ticker`, one RAF loop total; kill ScrollTriggers on teardown.

### Phase 5 — Product page assembly (1–2 sessions)
**Do:** compose the Tutu brand product page: hero (G1 entry + G2 idle + G3 parallax) → scroll story sections (G5: rotation scrub, camera dollies, scrubbed wiggle clip) → variant/flavor switcher if applicable (G6) → CTA. Copy pacing from Mana (desktop-only scroll rotation, mobile simplified). Wire brand colors/typography (see `environments.md` visual direction in this repo).
**Verify:** full-page Playwright pass: screenshots at scroll 0 / 25 / 50 / 75 / 100 %, at two viewports (1440px, 390px); mobile shows poster/simplified mode; Lighthouse perf ≥ 85 on desktop.
**Guards:** no scroll-jacking without Lenis + ScrollTrigger integration (the documented recipe); text content must remain real HTML for SEO/accessibility — 3D is presentation, not content.

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

---

## Appendix A — Evidence log (this session)

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
