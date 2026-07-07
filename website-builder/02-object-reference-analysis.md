# 02 — Object Reference Analysis

**Role:** Convert the object reference photo into a written, measured MODELING SPEC — the contract that `20` builds against and `24` verifies against. The quality of the final 3D model is decided HERE, before any code.
**Phase:** 1 (ANALYSIS).
**Inputs:** `_process/refs/ref-object-*.jpg`, BRIEF.md.
**Outputs:** `_process/MODELING-SPEC.md`.
**Upstream:** `01` · **Downstream:** `20`, `21`, `22`, `24`.

---

## Principle

Never start modeling from a mental image. Write the spec first: numbers measured from pixels.
Feedback later ("neck 8% too wide") must map to a one-line parameter edit — that only works if the
spec is quantitative from the start.

## Step 1 — Primitive decomposition

Look at the object and split it into parts. For each part choose ONE build strategy:

| Shape family | Strategy (implemented in `20`) |
|---|---|
| Revolved (bottle, can, cup, vase, lamp base) | **LatheGeometry** from a measured 2D profile — the workhorse |
| Flat with thickness (logo, badge, keycap, chocolate bar) | **Shape + ExtrudeGeometry** with mandatory bevel |
| Pipe/cable/handle | **TubeGeometry** on a CatmullRom curve (centripetal) |
| Boxy (packaging, device) | **RoundedBoxGeometry** — never a raw Box; nothing real has zero-radius edges |
| Holes/cuts/slots | base primitive + **CSG subtraction** (offline, three-bvh-csg) |
| Organic/sculptural | flag for AI-mesh fallback consideration (`20` §fallbacks), else displaced sphere/parametric patches |

Name each part (`body`, `cap`, `label`, `handle`…). These names persist through code, exports, and verification.

## Step 2 — The ratio table (the heart of the spec)

Measure in PIXELS on the reference (open the image, note coordinates), then convert to ratios of
total height. Minimum **8 landmarks**; for lathe profiles sample the **half-width every ~5% of
height** (≈ 20 samples) — this array becomes the lathe profile in `20` almost verbatim.

```markdown
Total height in image: 1240 px  (= 1.000)
| landmark            | y (px) | y ratio | half-width (px) | w ratio |
| base                |   1210 |  0.976  |   180           | 0.145   |
| body widest         |    820 |  0.661  |   260           | 0.210   |
| shoulder            |    410 |  0.331  |   240           | 0.194   |
| neck                |    300 |  0.242  |    90           | 0.073   |
| cap top             |     60 |  0.048  |   110           | 0.089   |
…
```

Also record: overall aspect (height:width), stance (does it lean?), symmetry axis, and real-world
size if known (a can = 66mm ⌀ — set world units in meters: 1 unit = 1 m).

**Perspective caution:** if the photo is not orthographic (visible top ellipse on a can = camera
above center), widths near top/bottom are distorted. Correct: measure widths at mid-height bands
where distortion is minimal, or mentally rectify. Note the photo's approximate camera height for `24`'s
reference-matched verification angle.

## Step 3 — Material family map

Per part, one material family + evidence (see `21` for the starting-value tables):

```markdown
| part  | family                  | evidence in photo                          |
| body  | glass (green, tinted)   | see-through edges, bright specular streak  |
| label | matte paper             | no specular, slight texture                |
| cap   | brushed aluminum        | anisotropic elongated highlight            |
```

Note specular shapes: sharp small highlight = smooth/hard; stretched = anisotropic/brushed;
broad soft = rough. Transmission evidence: background visible through it. Metal evidence:
reflections are TINTED by the object's color; dielectrics reflect white.

## Step 4 — Detail inventory

List every detail that makes the object THIS object, each tagged with its implementation route:

- **GEO** — must be geometry (silhouette-affecting: flutes, ridges ≥ 2% of width).
- **NORMAL** — normal/bump map (fine relief: embossing, knurling, threads).
- **TEXTURE** — albedo/roughness map (print, label art, scratches, fingerprints).
- Ignore-list: details invisible at final on-screen size. Write them down anyway (so the choice is deliberate).

## Step 5 — Label/print capture plan

If the object has printed graphics: plan the extraction (`22`) — which photo region, expected
distortion (cylindrical wrap?), whether text must be rebuilt vector-crisp (usually yes for the
hero: a blurry label kills realism faster than any geometry error).

## Write `_process/MODELING-SPEC.md`

Sections: Decomposition table · Ratio table · Material map · Detail inventory · Label plan ·
Reference camera note (approx. focal length + height for the verification angle) · Real-world size.

---

## ✓ Verification

- [ ] Every part has a named build strategy from the table above.
- [ ] Ratio table has ≥ 8 landmarks; lathe parts have ~20 profile samples.
- [ ] All numbers came from pixel measurements (I can point to the pixels), none were guessed.
- [ ] Every material claim cites visible evidence in the photo.
- [ ] Detail inventory: each item tagged GEO / NORMAL / TEXTURE / ignored-deliberately.
- [ ] The spec alone (without the photo) is sufficient to model the object — read it back and check.
