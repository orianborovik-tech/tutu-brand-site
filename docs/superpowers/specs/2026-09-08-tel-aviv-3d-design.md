# Tel Aviv 3D — Full-City Model — Design

**Date:** 2026-09-08 · **Status:** approved autonomously per Yahali's standing preference
(work independently, no intermediate questions); brainstorming skill applied in
self-directed mode.

## Goal

A complete, micro-detailed, interactive 3D model of all of Tel Aviv–Yafo (plus the
immediate skyline ring: Ramat Gan diamond district, Givatayim edge, Bat Yam edge),
built from real OpenStreetMap data, running in any modern browser with no API keys
and no network dependency.

## Constraints discovered

- Overpass API and Geofabrik are blocked from this environment; `download.openstreetmap.fr`
  and `overpass.openstreetmap.fr` are reachable → pipeline uses the full Israel PBF
  processed locally with pyosmium.
- No real GPU in CI containers → verification via SwiftShader screenshots (slow but exact).
- Google Photorealistic 3D Tiles rejected: needs an API key, dead-on-arrival for sharing.

## Approach (chosen from: photoreal 3D tiles / MapLibre extrusions / custom engine)

Custom Three.js engine over a compact self-contained dataset. Rationale: full control of
micro-detail (procedural windows, rooftop water heaters, traffic), zero keys, works
offline and as a single-file artifact.

## Architecture

```
scripts/extract_telaviv.py   PBF → (extract) pickle → (pack) TLV1 binary → gzip → base64 JS
js/decode.js                 base64 → DecompressionStream → typed arrays
js/citybuild.js              buildings extrusion (earcut, holes, parts, tiles), roads
                             ribbons (miters, bridges), areas, sea closure, foam, meta
js/scenery.js                instanced trees/palms/lamps/signals/rooftops/traffic/boats
js/shaders.js                shared env uniforms; derivative-normal building shader with
                             procedural night windows; flat/sea/foam/sky/halo materials;
                             log-depth injection for all custom shaders
js/controls.js               orbit/pan/zoom-to-cursor/WASD/touch camera + flyTo
js/ui.js                     Hebrew RTL HUD, landmark labels, picking, guided tour
js/main.js                   boot, progress, time-of-day, adaptive resolution
```

Data format `TLV1`: sections (buildings/roads/areas/trees/lamps/signals/sea), delta-encoded
Int16 decimeter coordinates with Int32 escapes, name + colour tables in a JSON meta header.
60,768 buildings → 2.7 MB base64.

## Micro-detail inventory

Real data: footprints, heights/levels, building:part tower shapes (Azrieli circle/triangle/
square, Sarona), names (2,392), building colours, roads by 9 classes with bridges/layers,
parks/beach/water/pools/pitches/cemeteries/plazas/piers, 997 mapped trees, 341 lamps,
1,920 traffic signals, coastline → closed sea polygon.
Procedural (seeded, deterministic): ~95k park/boulevard trees + beach palms, street lamps
along roads, rooftop solar heaters (dud shemesh) + AC units, animated cars/buses with
head/taillights, boats at marina/ports, aviation beacons on 100 m+ towers, per-window
night lighting in-shader.

## Rendering budget

≤ ~120 draw calls: buildings merged per 1.5 km tile (frustum-culled), one mesh per flat
layer, instanced everything else. Log-depth buffer for 30 km scale. Adaptive pixel ratio.

## Verification

Playwright/SwiftShader screenshots: overview, day/sunset/night, Azrieli close-up, Jaffa,
shoreline; FPS counter; console-error capture. Checklist in session log.
