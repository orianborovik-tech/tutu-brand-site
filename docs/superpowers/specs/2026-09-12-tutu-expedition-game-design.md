# Tutu Expedition — game design spec (2026-09-12)

## What
A browser open-world driving game set on the Tutu planet. The player pilots a six-wheel survey
rover across a 480 m × 480 m procedurally generated alien world built from the brand's
environment library (Nested Crater, Hexfield, Fracture Ground, Spire City, Smoke Array,
Cosmic Seam salt flat, Gilded Canyon, The Compound). Objective: recover 8 mineral samples,
then return to The Compound. Third-person chase camera, radar minimap, telemetry HUD.

Brief from Yahali: "super realistic and professional, GTA 6 level". Literal GTA 6 fidelity is
not reachable in a dependency-free browser page; the design pushes every realism lever the
browser offers instead: physically based rendering, real-time shadows, HDR bloom, ACES tone
mapping, environment reflections, rigid-body vehicle physics with independent suspension,
procedural audio, a day/night cycle with the brand aurora, dust and smoke simulation.

## Stack
- three.js 0.170 (ES modules via import map, jsdelivr) + addons: EffectComposer, UnrealBloomPass,
  ShaderPass, OutputPass, RoundedBoxGeometry.
- cannon-es 0.20 for physics (Heightfield terrain, RaycastVehicle with 6 wheels, static
  bodies for boulders, spires, the Compound).
- No build step. Static files under `game/`. Published as a multi-file artifact too.

## Modules (`game/js/`)
| File | Responsibility |
|------|----------------|
| `noise.js` | Seeded 2D simplex noise + fbm (pure JS, node-testable). |
| `terrain-math.js` | World constants, regions, `heightAt(x,z)`, masks, hex cell math, cannon height matrix, sample sites. Pure; single source of truth for render + physics + radar. |
| `mission.js` | Pure mission state machine: collect → return → complete; nearest objective bearing. |
| `terrain.js` | Terrain mesh (vertex colours + custom PBR shader chunks: hex seams, lava cracks, crater core glow, salt-flat gloss, grain), procedural normal map. |
| `sky.js` | Sky dome shader (gradient, stars, nebula, animated aurora curtains, sun), sun/hemisphere lights, fog, day cycle, environment map refresh. |
| `vehicle.js` | cannon world, heightfield, rover chassis + 6-wheel raycast vehicle, procedural rover mesh with articulating suspension arms, headlights, drive model (torque curve, 4-wheel steering, brakes, reset). |
| `world.js` | Boulders (instanced), spires, the Compound, sample crystals with beacons, smoke columns, steam vents, physics for large obstacles. |
| `particles.js` | Wheel dust, smoke/steam columns, sample sparkle. |
| `effects.js` | Post chain: render → bloom → lens pass (vignette, chromatic aberration, grain) → output. |
| `audio.js` | Procedural Web Audio: motor whine, rolling noise, wind, skid, suspension thumps, ambience, SFX. |
| `hud.js` | Telemetry DOM, objective compass, radar canvas, toasts, start/end screens. |
| `input.js` | Keyboard (WASD/arrows, space, R, M) + touch controls. |
| `main.js` | Boot, loop (fixed-step physics, variable render), camera, state machine. |

## Design tokens
Colour: void `#070a08`, aurora `#5cf58a`, gold `#e8b643`, ember `#ff6a1f`, dust `#d9cfb0`, stone `#8f948c`.
Type: Big Shoulders Display (display), IBM Plex Mono (telemetry), IBM Plex Sans (body).
Layout: full-viewport canvas; HUD pinned to corners as thin telemetry strips; start screen is a
left-aligned mission brief, not a centred splash.

## Acceptance checklist (verified item by item before delivery)
1. World contains the brand environments: crater with glowing core, hex field with glowing seams, lava fissures, spires, smoke columns, salt flat, canyon, the Compound.
2. Rendering: PBR materials, real-time shadows, fog, ACES tone mapping, HDR bloom, environment reflections on the rover.
3. Sky: stars, nebula, animated aurora, sun disc, day/night cycle; headlights auto at night.
4. Physics: rover driven by a raycast vehicle with independent suspension; it rests on the terrain, accelerates, steers, brakes, and `R` rights it.
5. Audio: motor, rolling, wind, skid, thumps, pickup/complete SFX; starts on user gesture; mute toggle.
6. Gameplay: 8 samples collected by proximity, HUD counter, return objective, completion screen with time/top speed/distance, restart works.
7. HUD: speed, samples, timer, objective bearing + distance, radar with rover/objective blips.
8. Controls: keyboard and touch; start screen explains them.
9. No console errors on load or during play; smoke-tested with Playwright (desktop + 400 px wide).
10. Committed and pushed to `claude/affectionate-bohr-nmfuvw`; published as an artifact.
