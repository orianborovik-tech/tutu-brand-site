# 25 — Background Recreation & Invented Environments

**Role:** Build the world. Case B: recreate the user's background reference EXACTLY. Case A/C: invent an original environment from the concept. Three construction strategies + a 13-archetype vocabulary.
**Phase:** 4 (WORLD).
**Inputs:** PLATE-SHEET.md (case B) or CONCEPT.md environment stance (case A/C).
**Outputs:** the environment layer of the scene, ready for compositing (`26`).
**Upstream:** `03`, `10`, `23` · **Downstream:** `26`, `31` (environment responds to scroll), `41`.

---

## Strategy decision (from PLATE-SHEET; tree in `03`)

**1 · Image backdrop** (plate is photographic; camera static/subtle parallax) — most exact, cheapest.
**2 · Full 3D rebuild** (camera moves freely; or plate is simple/abstract: sky, gradient, few planes).
**3 · Hybrid 2.5D** (photo far layer + 3D midground + parallax) — usually the winner for scroll sites.

## Strategy 1 — the plate itself as backdrop

**Preferred: textured backdrop plane** (not scene.background) — it lives in the scene, so parallax,
post-processing, and horizon alignment all work:

```js
const d = 50;  // camera→backdrop distance
const h = 2 * d * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
plane.scale.set(h * camera.aspect * 1.15, h * 1.15, 1);   // 15% overscan — drift never reveals edges
// material: map (SRGBColorSpace!), depthWrite:false, toneMapped:false, fog:false
```

- **`toneMapped: false` is mandatory** — a photo is already display-referred; tone mapping it again
  washes it out (top-3 compositing bug). Unified look comes from the shared LUT pass (`26`).
- Keep plane aspect = image aspect, scale to cover, NEVER stretch. On resize re-fit (cover math);
  crop-anchor from PLATE-SHEET (keep the horizon/subject visible on 9:16 phones — decide the anchor now).
- `scene.background` texture variant (screen-locked, zero parallax) only when the camera truly never
  moves; requires manual cover math via `tex.matrix.setUvTransform`.
- DOM-hybrid variant (photo in CSS under a transparent canvas): use when the site is DOM-first;
  remember WebGL post won't cover the photo — grain/vignette must be a shared CSS/SVG overlay (`26`).

## Strategy 2 — rebuild in 3D (the vocabulary)

- **Gradient sky shader** (workhorse): 2–4 stops lerped by view-direction Y. **ALWAYS dither**
  (`color += (rand(gl_FragCoord.xy)-.5)/255.`) or it bands on 8-bit screens. Recreate the plate's
  exact stop colors — never ship a JPEG of a gradient (shader = 0KB, banding-free, animatable).
- **Physical sky**: three `Sky` addon (turbidity 2–21, rayleigh 0–4, sun from elevation/azimuth).
  Killer combo: `pmremGenerator.fromScene(skyScene)` → `scene.environment` — the model is LIT by the
  sky you invented. Re-bake when the sun moves.
- **GroundedSkybox** (equirect sources): projects the HDRI floor so the model STANDS in the world
  (height ≈ capture height ~15, radius 70–100).
- **Fog as architecture**: `FogExp2` density 0.015–0.03 subtle / 0.04–0.06 present / 0.08+ world-defining.
  **Cardinal rule: fog color === background color at the horizon** (sample the plate's horizon band) —
  otherwise a visible "gas wall" seam.
- **Terrain**: 128–256-seg plane displaced by FBM (vertex shader or baked); ground shader that fades
  to background color with distance = cheap infinite floor.
- **Nebula/atmosphere walls**: domain-warped FBM `fbm(p + fbm(p + fbm(p)))`, 4–6 octaves, cosine
  palette (`a + b·cos(2π(c·t+d))`) — infinite ORIGINAL brand-matched atmospheres. Animate slow (t×0.02–0.05).
- **Cheap volumetrics** (in cost order): 3–6 fog-card planes with animated noise alpha → billboarded
  soft particles for ground mist → height-fog via onBeforeCompile fog-chunk patch → GodRays from a
  sun mesh. True raymarching: almost never worth the budget.

## Strategy 3 — hybrid layering (+ 2.5D)

```
[photo backdrop, far, toneMapped:false]
 ← fog tinted to plate horizon color (melts 3D into photo)
  ← 3D midground props in plate palette
   ← dust/pollen particles (500–3000 Points, curl-noise drift)
    ← HERO MODEL + shadow catcher (26)
     ← foreground occluder: big, dark, blurred shape crossing frame edge — instantly filmic
```

Mouse parallax ±1–3° + scroll dolly makes flat layers slide — sells depth cheaply.
**2.5D upgrade:** depth map from the plate (Depth Anything V2 small — run ONCE at build time in node,
ship a 1024px 8-bit PNG, 50–150KB) → either displace a 128–256-seg plane (true parallax, keep drift
≤ ±2° or edges smear) or fragment-shader fake-3D (`uv += (depth-.5)·offset`, offset ≤ 0.02–0.04 UV).

## Invented environments (cases A/C) — original every time

Process: derive the environment concept from the PRODUCT (materials/colors/era) + CONCEPT constitution.
The environment is a supporting actor — the hero owns either the highest value-contrast or the most
saturated hue on screen, never the backdrop (60-30-10 rule). Then pick an archetype and build:

| Archetype | Construction core |
|---|---|
| Infinite studio / cyclorama | floor sweeping to gradient bg; fog = bg color; AccumulativeShadows |
| Gradient atmosphere | backdrop shader, slow hue drift, dither |
| Physical sky world | Sky addon + fromScene PMREM; sun elevation = mood dial |
| Fog world | dense FogExp2 + silhouetted midground layers |
| Particle field | 1k–10k Points, soft sprites, curl drift (dust/stars/snow/fireflies) |
| Nebula / domain-warp wall | FBM warp + cosine palette |
| Reflective floor stage | MeshReflectorMaterial-class blur reflector — THE glossy award look |
| Lightformer studio | black void + emissive shapes visible only in reflections (chrome/glass/car-paint) |
| Architectural set | 3–7 primitives (plinth/arch/columns), one material family, heavy AO |
| Abstract terrain | noise-displaced plane, wireframe/contour shader, scroll flyover |
| Water plane | Water addon / scrolling-normal reflector + Sky |
| Cloth backdrop | layered sine/noise vertex displacement, sheen material, breathing |
| Duotone poster world | everything through a 2-color LUT; typography-led |

The archetype table is a **vocabulary, not a menu** — combine, mutate, rename per concept. Anti-clone
gate (`10`) applies to environments too.

## Life & narrative (award standard)

- Nothing perfectly static: gradient hue drifts, particles float, fog breathes — tiny amplitudes,
  periods 8–30s. Stillness reads as unfinished demo.
- The environment ARC mirrors the story: scroll progress remaps sun elevation / fog density / palette
  stops (`31` wires it).
- The model's reflections must contain THIS world: `pmremGenerator.fromScene(environmentScene)` even
  for pure-shader worlds (`23`).
- No pure #000/#fff fields (lift to ~#0a0a0f / #f6f4ef); no default-blue fog against a warm scene.

---

## ✓ Verification

- [ ] Strategy matches PLATE-SHEET decision (or archetype matches CONCEPT) — stated in WORKLOG.
- [ ] Case B: side-by-side screenshot — recreated background vs reference plate: colors, horizon, mood match.
- [ ] Photo backdrop: toneMapped:false, sRGB, cover-fit at 16:9 AND 9:16 (screenshots), 15% overscan.
- [ ] Fog color sampled from horizon band — zoom the ground-sky seam: NO gas wall.
- [ ] All gradients dithered (fullscreen screenshot on a dark section — no banding).
- [ ] Something breathes (record 10s — visible life; amplitudes subtle).
- [ ] Environment bytes within budget (`42`): backdrop ≤ 500KB, depth PNG ≤ 150KB, shaders preferred over images.
- [ ] Hero owns the contrast (squint test on a full screenshot: the eye lands on the model).
