# 3D realism pipeline

`realism_pipeline.py` takes the Meshy export (`panda.glb`) and writes `panda_realistic.glb`:

- roughness map per material zone (soft-touch tube / glossy PP cap / paper label / raised ink)
- micro-surface normal map (plastic grain, paper fibre, raised print, label edge step)
- KHR_materials_clearcoat mask (cap glossy, tube faint sheen, label none)
- 1x subdivision + feature-aware Taubin smoothing, smooth normals, tangents
- baked per-vertex ambient occlusion (COLOR_0)
- sharpened, de-flattened base colour

`render.html` + `shot.mjs` render a GLB headlessly with three.js (serve the folder with `python3 -m http.server 8765`).
