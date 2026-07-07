# Website Builder System — Design Spec

**Date:** 2026-07-07 · **Status:** Approved for implementation (user pre-authorized autonomous execution: "חקור, קבע את המבנה האופטימלי, וצור את כל הקבצים")

## Goal

One root folder — `website-builder/` — containing expertise files that together form a complete
operating system for building award-tier creative websites. Input from the user is ONE sentence
plus reference images (object always; background sometimes). The system makes every creative and
technical decision itself and ships a finished site.

## Requirements (from the user, verbatim intent)

1. One main folder; every file is a distinct domain of expertise / workflow / sub-system; all files work as one system.
2. Reference image → accurate, realistic 3D model (in-browser).
3. Background reference (when given) → exact background recreation + convincing compositing; when absent → invent an original environment.
4. Quality bar: en.manayerbamate.com (primary), dontboardme.com, landonorris.com — **bar, not template**: never copy; generate original concepts per project.
5. User sends one sentence; system decides all creativity autonomously.
6. Critical verification after every action; final problem-check with a ✓ checklist so nothing ships broken.

## Research base

8 research dossiers (in-session, web-sourced: live site source code, Awwwards/FWA records, Codrops,
three.js/GSAP/Lenis docs, VFX compositing literature): 3 site teardowns + image-to-3D, backgrounds &
compositing, scroll/WebGL architecture, award standards, asset pipeline. Key structural findings:

- All three reference sites converge on **vanilla Three.js + GSAP ScrollTrigger + Lenis**, no React — orchestration over architecture.
- MANA proves award-level WebGL runs inside a Shopify theme; its 3D recipe (GLB + single HDR + ACES) is small and reliable.
- dontboardme proves perceived "3D" can be pure motion craft (Lottie puppet) — rendering strategy is a *decision*, not a default.
- landonorris contributes the photo→2.5D displacement + projector-mapped 3D compositing bridge and the data-attribute DOM-as-API contract.
- Procedural code-first modeling with a Playwright screenshot verification loop (silhouette IoU > 0.93, ratio deltas < 3%) is the only image→3D pipeline guaranteed inside a coding session; AI-mesh/Blender are gated accelerators.
- Compositing = the film backplate problem: seven mismatches (perspective, light, shadow, reflection, tone, texture-frequency, grounding), each with a concrete Three.js countermeasure.
- Awwwards math: Design 40 / Usability 30 / Creativity 20 / Content 10; ship gate = weighted ≥ 8.5, no axis < 7.

## Architecture

Flat folder, numbered by pipeline phase (number ranges = phases, so ordering is self-documenting):

- `00–04` Core OS: orchestrator, brief intake, object-reference analysis, background-reference analysis, verification protocol.
- `10–16` Creative: creative direction (the brain), narrative, art direction & tokens, typography, copywriting, photography/images, video (media files added mid-build at the user's request: dedicated image + video parts with automatic beat→media matching and flatter/avoid rules, prompt dialect compatible with the repo's Higgsfield tooling).
- `20–26` 3D production: procedural modeling, PBR materials, texture generation, lighting/environment, model verification loop, background recreation, compositing & grounding.
- `30–36` Experience: scene architecture, scroll choreography, motion language, micro-interactions, loading, page transitions, sound.
- `40–45` Engineering: stack & scaffold, performance & quality tiers, asset pipeline, responsive/mobile, accessibility, deployment (incl. Shopify).
- `50–51` Ship: quality bar rubric, pre-flight ✓ checklist.
- `README.md` — index + how the system works (Hebrew + English).

Conventions binding the files into one system:
- Every file header declares: Role, Phase, Inputs, Outputs, Upstream/Downstream files.
- Every file ends with a `✓ Verification` block — the critical self-check run after applying that file (user requirement #6).
- Artifacts passed between phases are named documents (BRIEF.md, MODELING-SPEC.md, PLATE-SHEET.md, CONCEPT.md, etc.) so each phase has a contract.
- `00-operating-system.md` is the single entry point; CLAUDE.md registers it as the mandatory start for any site-building request.

## Out of scope

Generated-site source code itself (the system *produces* it per project); CMS beyond Shopify notes; native apps.
