# 21 — Materials & PBR Realism

**Role:** Make the model's surfaces read as the real materials in the reference photo. Renderer color baseline + MeshPhysicalMaterial starting values per material family + the anti-CGI imperfection rules.
**Phase:** 3 (3D PRODUCTION).
**Inputs:** MODELING-SPEC material map. **Outputs:** tuned materials on the model (export-safe).
**Upstream:** `02`, `20` · **Downstream:** `22` (maps), `23` (materials are only as good as the environment), `24` (tuning loop), `42` (export).

---

## Renderer baseline — set once, never improvise

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;        // explicit, always
renderer.toneMapping = THREE.ACESFilmicToneMapping;      // see choice table below
renderer.toneMappingExposure = 1.0;                      // tune 0.6–1.6 in the 24 loop
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

| Tone mapping | Use when |
|---|---|
| ACESFilmic | filmic/punchy default — but skews saturated reds/oranges |
| AgX | saturated brand colors must stay true (best hue preservation) |
| Neutral (Khronos) | e-commerce color accuracy is contractual (product = the pixel) |

Color spaces: `map`/emissive textures → `SRGBColorSpace`; normal/roughness/metalness/AO → linear
(`NoColorSpace`). **Wrong colorSpace is the #1 "why does it look wrong" bug** — washed-out or
crushed colors mean this, check it first.

## MeshPhysicalMaterial — starting values by family

(Then tune in `24`'s materials pass — these get you to 80% instantly. All params survive glTF
export as KHR extensions: transmission/volume/ior/clearcoat/sheen/iridescence/specular/anisotropy/dispersion.)

| Family | Starting values |
|---|---|
| Clear glass | `transmission:1, thickness:0.2–1.0 (world units!), roughness:0.02–0.08, ior:1.5, metalness:0, attenuationColor:<tint>, attenuationDistance:0.5–2`; `dispersion:0.02–0.05` for prism edges |
| Frosted glass / soft plastic | `transmission:1, roughness:0.25–0.5, thickness:0.3` |
| Liquid inside glass | SEPARATE inner mesh: `transmission:1, roughness:0.05, ior:1.33, attenuationColor:<liquid>, attenuationDistance:0.05–0.3` (smaller = denser color) |
| Glossy plastic (PET, toys) | `roughness:0.12–0.25, clearcoat:0.4–1, clearcoatRoughness:0.05–0.2` |
| Matte plastic / rubber | `roughness:0.55–0.8, specularIntensity:0.6` |
| Brushed metal | `metalness:1, roughness:0.25–0.4, anisotropy:0.6–1`, anisotropyRotation along brush direction |
| Polished metal / chrome | `metalness:1, roughness:0.03–0.1` — realism is ~90% the env map (`23`), not the material |
| Car paint | `clearcoat:1, clearcoatRoughness:0.03, metalness:0.6–0.9, roughness:0.35` |
| Fabric / velvet / plush | `roughness:0.8–1, sheen:1, sheenRoughness:0.3–0.6, sheenColor:` lighter tint of base |
| Paper label / cardboard | `roughness:0.7–0.9, specularIntensity:0.3` + faint paper-grain normal map |
| Ceramic | `roughness:0.05–0.15, clearcoat:0.6, clearcoatRoughness:0.1` |
| Soap bubble / oil sheen / CD | `iridescence:1, iridescenceIOR:1.3, iridescenceThicknessRange:[100,400]` |

Gotchas:
- `transmission` ignores `transparent:true` — never combine them.
- `thickness` is world units — must match real model scale or refraction lies.
- Built-in transmission = fast, good. Premium hero glass only: `three-mesh-transmission-material`
  (drei port) adds distortion/chromatic aberration at the cost of rendering the scene twice — hero object only.
- Metals with no environment = black. If a metal looks dead → `23` first, material second.

## The anti-CGI rules (mandatory, every model)

1. Per-pixel variation beats parameter perfection: even a faint roughnessMap (fingerprints, smudges — `22`) outsells any uniform value.
2. Never `roughness` exactly 0 or 1; never `metalness: 0.5` (nothing is half-metal); never pure #FFFFFF/#000000 albedo (real white ≈ 0.9, real black ≈ 0.02–0.05 linear).
3. Edge wear: raise roughness / lighten albedo on high-curvature edges (worn strips hand-placed on known edges is fine).
4. Dust/fingerprints at 4–8% opacity on upward-facing / touched surfaces.
5. Grazing-angle check in the `24` loop: if rims look dead, specularIntensity or env is wrong (Fresnel should visibly rim-light).
6. Sample albedo hex FROM the reference (under neutral assumptions), not from memory of the brand.

## Export discipline

Three-only shader hacks (onBeforeCompile chunks, MeshTransmissionMaterial) do NOT export — keep
them as site-side upgrades re-applied after GLB load, keyed by material name (`MAT_glass` →
upgrade function). The GLB must still look correct with plain exported materials (fallback truth).

---

## ✓ Verification

- [ ] Renderer baseline exact (read the 6 lines in code); tone mapping chosen BY TABLE with reason logged.
- [ ] Every texture's colorSpace audited (color→sRGB, data→linear) — list them.
- [ ] Each part's material starts from the family table; deviations justified in MODEL.md.
- [ ] No 0/1 roughness, no 0.5 metalness, no pure white/black albedo anywhere (grep the params).
- [ ] Roughness variation map present on hero surfaces (screenshot under raking light shows it).
- [ ] Transmission parts: thickness sane vs world scale; transparent:true absent.
- [ ] Grazing-angle rim screenshot approved; metals reflect a real environment.
- [ ] GLB re-import test: materials still correct WITHOUT site-side upgrades (load exported file cold in the lab).
