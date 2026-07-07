# 26 — Compositing & Grounding

**Role:** Fuse the 3D model and the background into ONE image. This is the film-VFX backplate problem: every failed composite is one of SEVEN mismatches, each with a concrete countermeasure. Plus the landonorris-class photo↔3D bridge techniques.
**Phase:** 4 (WORLD) — after model (`24` approved) and environment (`25` built).
**Inputs:** approved model, environment, PLATE-SHEET.
**Outputs:** the fused scene + compositing QA pass.
**Upstream:** `23`, `24`, `25` · **Downstream:** `31` (choreography moves through the fused world), `51`.

---

## The seven mismatches (memorize; QA checks all seven)

1 perspective/lens · 2 light direction · 3 shadows · 4 reflections · 5 tone · 6 texture-frequency · 7 scale/grounding

## #1 Perspective & lens

- **fov from PLATE-SHEET** (EXIF exact, else estimate). Product plates = 50–100mm equiv → **camera.fov 15–30**. The three.js default ~50–75 over a telephoto plate NEVER fuses — the most common compositing failure anywhere.
- **Horizon lock:** plate horizon at fraction `f` from bottom → `pitch = (f − 0.5) · fovRadians`. CG ground vanishing line lands exactly on the plate horizon. Lock it and never break it while compositing.
- Placement obeys the horizon: below it = seen from above, above it = from below. Camera height semantics: tabletop 0.2–0.5m, standing 1.6m, hero-from-below 0.5–1m under subject center.

## #2 Light direction — the plate-matched rig

```js
scene.environment = plateEnvMap;                      // ← #4, below
const key = new THREE.DirectionalLight(plateHighlightColor, 2.5);
key.position.setFromSphericalCoords(10, Math.PI/2 - elevation, azimuth);  // FROM PLATE-SHEET
key.castShadow = true;
const r = modelBoundingRadius * 1.5;                  // TIGHT shadow frustum
key.shadow.camera.left = -r; /* right/top/bottom ±r */ key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0001; key.shadow.normalBias = 0.03; key.shadow.radius = plateShadowSoftness;
const fill = new THREE.HemisphereLight(plateSkyColor, plateGroundColor, 0.4);
```
Key:fill ratio from plate contrast (sun ≈ 4:1–8:1, overcast ≈ 1.5:1). Hard shadow edges → radius 1–3; soft → 8–25 or AccumulativeShadows.

## #3 Shadows & #7 grounding — layered, never one trick

1. **Shadow catcher** on the plate's actual surface plane (position + perspective from PLATE-SHEET):
   `ShadowMaterial({ color: plateShadowColor, opacity: 0.3–0.5, transparent: true })` — **tint = the plate's sampled shadow color, NEVER black** (real shadows lift toward ambient).
2. **Contact/AO blob** at the touch point: ContactShadows-style top-down bake (frames:1 → free), or a radial-gradient canvas blob (crude but never wrong).
3. **AccumulativeShadows** (temporal bake 60–100 frames, then zero cost) for the premium soft look on static heroes.
4. **N8AO half-res** for inter-part occlusion (aoRadius 0.2–0.5 of model scale).

Physics check: darkest exactly at contact; penumbra grows with distance; direction/length agree with #2; the shadow falls along the PLATE's floor perspective (a shadow sliding uphill kills the shot).

## #4 Reflections — IBL from the plate (the highest-leverage trick)

A normal photo covers ~40–70° of the sphere — build a **synthetic equirect**:

```
canvas 1024×512:
  draw plate center-front · mirror-copy to the sides (seams self-match)
  top band = plate sky average · bottom band = plate ground average
  blur 60px (two passes) · optional saturate 110–120%
→ CanvasTexture (sRGB, EquirectangularReflectionMapping) → scene.environment
```

PMREM blurs the fakery away; what survives is the plate's color distribution + directionality —
ambient, reflection tint, and light feel match automatically. **LDR fix:** JPEGs have no >1.0 values
so metals go dull → `envMapIntensity 1.2–2.0` on reflective materials, pseudo-HDR boost of bright
pixels before PMREM (`L' = L·(1+2·smoothstep(.7,1,L))`), and ALWAYS keep the analytic key (env maps
cast no crisp shadows).

## #5 Tone & #6 texture-frequency — the shared grade

Post stack (pmndrs postprocessing, in order): `Render → N8AO(half-res) → Bloom(mipmap, threshold ≥.8,
intensity .2–.6) → [DoF only if the plate has it] → LUT/grade → ChromaticAberration(.0005–.0015) →
Vignette(.2–.45) → Grain(.04–.10) → SMAA`. Budget ≤ 3–4ms GPU mid-tier; mobile: no DoF, half AO.

- **Grain over EVERYTHING = the #1 layer-fuser.** One shared animated grain across photo + render
  (DOM-hybrid architecture → grain must be a CSS/SVG overlay spanning both).
- **Black/white point match:** plate blacks are ~RGB 18–30 with a hue, never 0,0,0. The render's range
  must sit INSIDE the plate's — deeper CG blacks read as a sticker.
- **Temperature/saturation:** mix the plate's average color into the render at 5–12% (shader color-mix — the compositor's "average color layer" trick).
- **Tone mapping:** the photo stays `toneMapped:false`; pick AgX (robust) / Neutral (brand-color-true) for the 3D; final unified look in the LUT.
- **DoF logic:** plate already blurred → do NOT re-blur it; keep hero tack-sharp, edge sharpness ≈ plate's sharpest region. Want separation on a deep-focus plate → pre-blur the backdrop image itself (canvas 2–6px), not a runtime DoF pass.
- **Edge integration:** slight bloom halation + a fresnel rim tinted with the backdrop color behind the object (intensity 0.3–0.8) = poor-man's light wrap, disproportionately effective. Match the plate's vignette/CA — shared flaws are shared DNA.

## The photo↔3D bridge (signature-grade techniques)

- **2.5D displacement hero:** decompose a photo into diffuse+depth(+alpha/normal/roughness at build time), render as a 128×128-seg displacement plane (small scale ~0.25) → a photograph that breathes in 3D.
- **Projector mapping:** render the live 3D model to a RenderTarget and project it INTO the 2.5D photo plane's shader → the model exists "inside the photograph".
- **Reveal masks:** cursor-trail fluid mask (step threshold on a trail texture) revealing the 3D layer through the photo — reference-class signature interaction. Use for the signature moment if the concept calls for it (anti-clone gate still applies to the specific execution).

---

## ✓ Verification (compositing QA — the seven, plus zoom)

- [ ] Perspective: horizon aligned (overlay screenshot on plate — lines coincide); fov matches lens class; verticals converge like the plate.
- [ ] Light: key azimuth/elevation match shadow evidence; softness matches; key:fill ratio matches plate contrast.
- [ ] Shadows: tinted (sample them — not black); darkest at contact; direction/length/perspective agree with plate.
- [ ] Reflections: glossy parts reflect the PLATE's colors (zoom a reflective part — no alien studio).
- [ ] Tone: render blacks/whites inside plate range (histogram or eyedropper both layers); plate not double-tone-mapped.
- [ ] Texture: one shared grain layer; edge sharpness matched; DoF consistent; lens artifacts consistent.
- [ ] Grounding: 4× zoom on the contact silhouette — no float, no halo.
- [ ] Life: something breathes; 60fps WITH the post stack (frame numbers recorded); mobile fallbacks in place.
