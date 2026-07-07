# 20 — Procedural Modeling (Photo → Mesh)

**Role:** Build the 3D geometry from MODELING-SPEC in code — the pipeline that always works in a coding session (no Blender GUI, no guaranteed AI services). Produces clean, small, art-directable meshes where every fix is a one-line parameter edit.
**Phase:** 3 (3D PRODUCTION).
**Inputs:** `_process/MODELING-SPEC.md`, `_process/refs/ref-object-*.jpg`.
**Outputs:** `model-lab/model.js` (+ params) → verified via `24` → exported GLB.
**Upstream:** `02` · **Downstream:** `21`, `22`, `24`, `42`.

---

## Pipeline decision tree

| Rank | Pipeline | When |
|---|---|---|
| 1 | **Procedural (this file)** — DEFAULT | Anything decomposable into primitives/profiles: bottles, cans, boxes, packaging, devices, furniture, food, toys |
| 2 | Hosted AI image-to-3D (Meshy/Tripo) | Organic/sculptural (plush, sneaker, croissant) AND an API key exists in env — see §Fallbacks |
| 3 | Blender headless (`pip install bpy`) | Only for robust booleans / UV unwrap / AO baking — attempt install once, cache verdict, never depend on it |
| — | Photogrammetry | Never (needs 30+ photos; we have one reference) |

Procedural is the heart: deterministic, tiny output, and the verification loop (`24`) can fix
*specific* errors ("neck 8% too wide") instead of re-rolling a black box.

## Authoring rules

- **Declarative params on top.** All measured ratios/control points live as JSON-ish literals at the top of `model.js` (or `params.json`). The loop edits arrays, not scattered magic numbers.
- **Units:** meters, real-world scale (glTF convention). Origin at **base-center** (y=0 at bottom), +Z = the reference photo's front, +Y up.
- **Names persist:** parts as named meshes under one Group (`Body`, `Cap`, `Label`, `Liquid`), materials `MAT_glass`, `MAT_label` — site code targets these by name for per-part animation and material upgrades.

## The primitive vocabulary

**LatheGeometry — the workhorse.** Profile from the ratio table (or automated row-scan below):

```js
const pts = params.profile.map(([y, r]) => new THREE.Vector2(r, y)); // bottom→top, start/end at r=0 for watertight
const smooth = new THREE.SplineCurve(pts).getPoints(64);
const geo = new THREE.LatheGeometry(smooth, 96); // 96 radial segs for hero close-ups; 48 mid; <32 visibly facets
```
- Hard creases: doubled profile points (breaks smoothing) or small 3-point fillet arcs (radius ≈1% of height — a manufactured fillet that catches light).
- Designed curves (bottle shoulders): 2 bezier segments beat 12 spline points.

**Automated silhouette extraction** (light background photos) — lathe-ready `[y, halfWidth]` pairs:

```js
import sharp from 'sharp';
const { data, info } = await sharp('ref.png').greyscale().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info; const profile = [];
for (let y = 0; y < H; y += Math.max(1, Math.round(H / 64))) {
  let l = -1, r = -1;
  for (let x = 0; x < W; x++) { if (data[y*W+x] < 128) { if (l < 0) l = x; r = x; } }
  if (l >= 0) profile.push([1 - y/H, (r-l)/2/H]);
}
// smooth with small moving average, resample to 20–40 control points
```

**Shape + ExtrudeGeometry** — flat things with real edges. **Always bevel** (2–5%: `bevelThickness/bevelSize ≈ 0.004` at unit scale, `bevelSegments: 4`) — edge highlights are the #1 cheap realism win; zero-bevel extrusion reads fake instantly. SVG outlines (potrace or hand-authored) → `SVGLoader.createShapes()`. Extrude UVs are messy — box-project manually if textured.

**TubeGeometry** — handles/cables/straws: `CatmullRomCurve3(pts, false, 'centripetal')` (avoids kinks), `TubeGeometry(path, 128, r, 16)`. Varying radius → manual frames (`computeFrenetFrames`) into BufferGeometry.

**RoundedBoxGeometry** (addon) for anything boxy — never raw BoxGeometry for products; real objects have no zero-radius edges. Cylinder with `radiusTop !== radiusBottom` = tapers/frustums. Capsule/Torus for sub-parts.

**CSG — three-bvh-csg** (`three-bvh-csg@0.0.x` + `three-mesh-bvh`; nothing else — 100× faster than BSP libs):
```js
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
const result = new Evaluator().evaluate(new Brush(bodyGeo), holeBrush, SUBTRACTION);
```
- Brushes must be watertight two-manifold (closed lathe = OK; open cylinder = not).
- Run CSG **offline at build time**, never at page runtime.
- Cut edges are razor-sharp — fine for engravings; for visible hero edges add a smoothing pass.
- Threads/knurling: usually a **normal map fakes them better** than geometry at 1/100 the cost (`22`).

**Hand-written BufferGeometry** when parametric-but-not-builtin (varying-radius tube, twisted extrusion, exact label UVs): nested (u,v) loop → positions, index grid, `computeVertexNormals()`. Always `setIndex` (halves memory), `computeBoundingSphere()` at the end.

## Imperfection displacement (top-3 realism trick)

Perfect procedural surfaces scream CGI. Bake 0.1–0.3% noise into the geometry at build time:

```js
import { createNoise3D } from 'simplex-noise';
const n3 = createNoise3D();
const pos = geo.attributes.position, nor = geo.attributes.normal;
for (let i = 0; i < pos.count; i++) {
  const d = 0.002 * n3(pos.getX(i)*40, pos.getY(i)*40, pos.getZ(i)*40);
  pos.setXYZ(i, pos.getX(i)+nor.getX(i)*d, pos.getY(i)+nor.getY(i)*d, pos.getZ(i)+nor.getZ(i)*d);
}
geo.computeVertexNormals();
```

Displacement maps only for large-scale undulation on dense geometry (~4 verts per feature); normal maps for everything smaller.

## Assembly & budgets

- Merge same-material parts: `BufferGeometryUtils.mergeGeometries` after `applyMatrix4` — one draw call per material. Different materials stay separate named meshes in the Group.
- Slight asymmetry ON PURPOSE: label rotated 1–2° off-axis, cap tilted 0.3°, one axis scaled 0.5–1% — perfect alignment is the CGI tell.
- Budgets: hero 30k–120k tris (96-seg lathe ≈ 12k — headroom is normal); secondary 2k–15k; scene total ≤ 300k desktop (`41`).

## §Fallbacks (gated accelerators)

- **Meshy / Tripo API** (if `MESHY_API_KEY`/`TRIPO_API_KEY` in env): POST image → poll → GLB, ~$0.2–0.4, 1–5 min, `enable_pbr:true`. Reality: front-facing shape 80–95%, backs hallucinated, lighting baked into albedo, 100k–500k-tri soup. MANDATORY cleanup: `gltf-transform simplify` to budget, usually replace materials with hand-tuned `21` values keeping only the mesh. Then the SAME verification loop (`24`). Use only for organic forms.
- **bpy** (`pip install bpy`, needs the exact matching Python, ~300MB, CPU-ok for geometry): adds exact booleans, bevel/subsurf modifiers, Smart UV Project, AO baking; export `bpy.ops.export_scene.gltf`. Attempt once per environment, cache the verdict in ASSUMPTIONS.md.

---

## ✓ Verification

- [ ] Every part built with the strategy named in MODELING-SPEC (diff spec vs code).
- [ ] Params are declarative at the top — I can change any landmark ratio in one line.
- [ ] Origin at base-center, meters, +Z front (load in lab, check axes helper).
- [ ] All visible edges have bevels/fillets (grazing-angle screenshot — edges catch light).
- [ ] Noise displacement applied (zoom screenshot: surface not mathematically perfect).
- [ ] Watertight where CSG was used; no z-fighting between parts (turntable shots clean).
- [ ] Tri count within budget (`renderer.info` or gltf-transform inspect) — number recorded.
- [ ] Part/material names correct in the exported Group (traverse and print).
- [ ] → Proceed to `24` and do NOT self-approve: the loop decides when the model is done.
