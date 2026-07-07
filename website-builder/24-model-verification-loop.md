# 24 — Model Verification Loop

**Role:** The closed-loop convergence engine: render → compare to the reference → measure → fix → repeat, until the model provably matches. This is what turns "I modeled something like it" into "this IS the object in the photo". The user's accuracy guarantee lives here.
**Phase:** 3 (3D PRODUCTION) — the gatekeeper of the phase.
**Inputs:** the model (from `20`–`23`), MODELING-SPEC, reference images.
**Outputs:** approved model + golden shots + iteration log; exported GLB + model folder.
**Upstream:** `20`–`23` · **Downstream:** `26` (same harness verifies composites), `42` (export), `51`.

---

## Harness

```
model-lab/
  index.html     # bare page: renderer(21 baseline) + model + URL-param camera
  model.js       # THE source (declarative params on top)
  shots.mjs      # Playwright: N angles → PNG
  compare.mjs    # montage + metrics
  ref/  out/     # references · shots+montages (the agent READS out/)
```

- Static server (`npx vite`) + Playwright headless Chromium.
- **Headless WebGL flags:** `chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })` — CPU SwiftShader, correct output, 0.1–2s/frame (fine for stills). Never screenshot before `await page.waitForFunction(() => window.__renderedOnce)` — set that flag after the first render **with all textures/env loaded**, or you capture black.
- Camera from URL params: `?az=30&el=10&fov=35&dist=2.5` → deterministic angles. Extra modes: `?matcap=1` (neutral gray — isolates form from materials), `?silhouette=1` (black unlit on white — for IoU), `?wireframe=1`.

## Shot protocol (per iteration, 1024×1024)

1. **Reference-matched view** — camera posed like the reference photo (fov from `02`'s camera note; product shots ≈ fov 25–40°). The money shot.
2. Front pseudo-ortho (fov 15°, far) — proportions without perspective lies.
3. 3/4 view — form + material together.
4. Silhouette mode of #2 — for the objective metrics.
5. (Later rounds) close-up of the detail currently in work.

## Comparison — two channels, both required

**Subjective (primary): my own vision.** Build a side-by-side montage (sharp composite: reference
left, render right, same height) and READ it. Critique part-by-part against MODELING-SPEC:
silhouette → proportions → part placement → materials (highlight shape/size, reflection sharpness,
color under light) → details present/missing → grounding.

**Objective (secondary, silhouette+ratios only):**
- **Silhouette IoU** — intersection-over-union of thresholded silhouette render vs thresholded
  reference (same height, centered). **Gate: > 0.93.** The single best scalar for "proportions are right".
- **Ratio-table re-measure** — run the same row-scan (`20`) on the render; diff vs MODELING-SPEC.
  **Gate: every landmark |Δ| < 3%.**
- pixelmatch/SSIM ONLY silhouette-vs-silhouette (shaded-render-vs-photo pixel diff is meaningless — lighting never matches pixel-wise).

## Iteration protocol — strict order, one category per round

1. **Silhouette & proportions** (matcap + silhouette shots ONLY; ignore materials) → edit control points → repeat until IoU > 0.93. Typical 2–4 rounds.
2. **Part placement & details** (seams, label bounds, ridges vs detail inventory). 1–3 rounds.
3. **Materials & lighting** (reference-matched view; PBR params `21`, env rotation + exposure `23`). 2–4 rounds.
4. **Grounding** (shadow quality, contact). 1–2 rounds.

Rules: never fix materials while silhouette is wrong (wasted work); log EVERY round in
`iterations.md` (what changed → observed effect) so the loop can't oscillate; expected total 6–12
cycles, 15–45 min for a hero model — normal, budgeted, worth it.

## Failure-mode lookup (critique cheat sheet)

| Symptom | Cause → fix |
|---|---|
| Too-perfect/CGI feel | add noise displacement (`20`), roughness variation (`22`) |
| Black/dead reflections | env missing / colorSpace wrong / metal without env (`23`,`21`) |
| Washed-out colors | texture not sRGB, or double tone mapping |
| Glass looks like plastic | no thickness/attenuation; or transparent:true misuse |
| Floating object | no contact shadow; ground plane misaligned |
| Faceted silhouette | radial segments too low |
| Invisible edges | missing bevels/fillets |
| Looks miniature/toy | reflection detail scale mismatch or fov too wide |

## Exit: export + the model folder

On approval:
1. Export GLB — `GLTFExporter` in the lab page ({ binary:true }), driven by Playwright; or `node-three-gltf` in node.
2. Optimize + validate per `42` (meshopt, textures, inspect table into MODEL.md).
3. Commit the convention folder — **the GLB is a build artifact; `model.js` + params are the truth:**

```
assets/models/<slug>/
  source/model.js + params.json   # regenerable truth (tuned values)
  ref/                            # reference images used
  <slug>.glb                      # optimized shipped artifact
  shots/                          # golden renders = regression baselines
  MODEL.md                        # spec, measured tables, iteration log, inspect output
```

4. Golden shots guard regressions: when the model enters the full site (different renderer settings
   can silently change its look), `expect(page).toHaveScreenshot()` with `maxDiffPixelRatio: 0.02`
   against the goldens.

---

## ✓ Verification (the phase gate itself)

- [ ] IoU > 0.93 — number recorded in MODEL.md.
- [ ] All ratio deltas < 3% — table recorded.
- [ ] Vision critique on final side-by-side: silhouette ✓ proportions ✓ materials ✓ every detail-inventory item visible ✓ grounding ✓.
- [ ] iterations.md complete — every round logged with observed effect.
- [ ] Cold-load test: exported GLB opened fresh in the lab looks identical (screenshot diff vs pre-export).
- [ ] Golden shots saved; model folder complete (source, params, refs, MODEL.md).
- [ ] No threshold was weakened to pass (re-read `04` — the thresholds stand).
