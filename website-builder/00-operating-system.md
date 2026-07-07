# 00 — Operating System (Master Orchestrator)

**Role:** The single entry point of the website-builder system. Defines the mission, the doctrine, the full pipeline from a one-sentence brief to a shipped site, and which expertise file governs each phase.
**Phase:** Always — read this FIRST on every project, then follow it to the end.
**Inputs:** One sentence from the user + reference image(s).
**Outputs:** A shipped, verified, award-tier website.

---

## Mission

The user sends **one sentence** and reference images. Nothing else. This system does everything:
concept, art direction, 3D modeling from the reference image, background recreation or invention,
narrative, motion, code, performance, QA, deployment. The user makes **zero** creative decisions.

The quality bar is Awwwards SOTD / FWA tier — proven reachable for any subject (a dog-walking
business won SOTD). The bar is set by en.manayerbamate.com, dontboardme.com, landonorris.com.

## Doctrine — the five laws

1. **Autonomy.** Never ask the user a creative question. Decide, log the decision in `ASSUMPTIONS.md`, move on. If something is truly ambiguous, pick the stronger creative option.
2. **Originality.** The reference sites define the LEVEL, never the LOOK. Every project gets a concept that exists nowhere else. Before committing to any concept, run the anti-clone test in `50-quality-bar.md`. Copying a reference site's concept, palette, mascot idea, or signature moment is a hard failure.
3. **Accuracy to reference images.** A user's object reference must become a 3D model that matches silhouette, proportions, materials, and colors (measured, not eyeballed — see `24-model-verification-loop.md`). A user's background reference must be recreated exactly and the model composited into it convincingly (see `26-compositing-and-grounding.md`).
4. **Verification after every action.** Every phase ends with its file's `✓ Verification` block, executed honestly with evidence (screenshots, measurements, numbers — not "looks fine"). The discipline is defined in `04-verification-protocol.md`. No phase gate passes without it.
5. **Craft everywhere.** Every default surface (cursor, buttons, 404, loader, favicon, OG image) is a designed, on-concept surface. Usability is the award eliminator: the site must also be fast, legible, and usable.

## The Pipeline

Phases run in order. Each phase names its governing files, its output artifact, and its gate.
Artifacts live in the project folder under `_process/` (they are working documents, not shipped).

### Phase 0 — INTAKE
- Read: `01-brief-intake.md`
- Do: parse the sentence + images; classify inputs (object ref? background ref? neither?); extract brand DNA from the images themselves.
- Artifact: `_process/BRIEF.md`
- Gate ✓: brief complete, input case identified (A: object only · B: object+background · C: no references).

### Phase 1 — ANALYSIS
- Read: `02-object-reference-analysis.md` (case A/B), `03-background-reference-analysis.md` (case B)
- Do: produce the modeling spec (primitive decomposition, measured ratio table, material map, detail inventory) and, if a background exists, the plate sheet (fov, horizon, key light, palette, fog color, strategy).
- Artifacts: `_process/MODELING-SPEC.md`, `_process/PLATE-SHEET.md`
- Gate ✓: every number in the specs is measured from pixels, not guessed.

### Phase 2 — CONCEPT
- Read: `10-creative-direction.md`, then `11-narrative-structure.md`, `12-art-direction-and-tokens.md`, `13-typography.md`, `14-copywriting.md`, `15-photography-and-images.md`, `16-video-and-motion-media.md`
- Do: generate 3–5 divergent concept directions, score them, commit to one; derive narrative beats, tokens, type system; write ALL copy (copy before motion); build the media shot list (auto-matched images/video per beat + generation prompts).
- Artifacts: `_process/CONCEPT.md`, `_process/COPY.md`, `_process/SHOT-LIST.md`, `src/styles/tokens.css`
- Gate ✓: concept passes the anti-clone test and has ONE nameable signature moment; H1s alone read as a story; every beat has its media decision.

### Phase 3 — 3D PRODUCTION
- Read: `20-procedural-modeling.md`, `21-materials-pbr.md`, `22-texture-generation.md`, `23-lighting-and-environment.md`, then loop with `24-model-verification-loop.md`
- Do: build the model procedurally from MODELING-SPEC; texture it from the reference; light it; iterate the screenshot-vs-reference loop until silhouette IoU > 0.93 and ratio deltas < 3%.
- Artifact: `assets/models/<name>/` (source + params + golden shots + MODEL.md) → optimized GLB
- Gate ✓: side-by-side montage approved against reference; budgets met (`41`, `42`).

### Phase 4 — WORLD
- Read: `25-background-recreation.md` (case B: exact recreation · case A/C: invent via archetypes), `26-compositing-and-grounding.md`
- Do: build the environment; composite the model (lens match, light match, shadow catcher, IBL from plate, shared grade).
- Artifact: working scene with model grounded in world
- Gate ✓: compositing QA — the seven-mismatch checklist passes; nothing floats; nothing reads as a sticker.

### Phase 5 — EXPERIENCE
- Read: `30-scene-architecture.md`, `31-scroll-choreography.md`, `32-motion-language.md`, `33-micro-interactions.md`, `34-loading-experience.md`, `35-page-transitions.md`, `36-sound-design.md`
- Do: scaffold the site (`40-stack-and-scaffold.md`), build sections per narrative beats, choreograph scroll + motion per the project's motion tokens, craft loader/cursor/hovers/404.
- Gate ✓: 60fps during full scroll on desktop; motion grammar consistent (one ease family, one stagger unit); signature moment lands.

### Phase 6 — HARDEN
- Read: `41-performance-and-quality-tiers.md`, `42-asset-pipeline.md`, `43-responsive-and-mobile.md`, `44-accessibility.md`
- Do: compress everything, enforce budgets, quality tiers + degradation ladder, mobile pass, reduced-motion + semantic DOM pass.
- Gate ✓: budget table green; mobile real-width (390px/320px) pass; reduced-motion path exists and works.

### Phase 7 — SHIP
- Read: `50-quality-bar.md`, `51-preflight-checklist.md`, `45-deployment-and-shopify.md`
- Do: self-score on the Awwwards rubric (gate: weighted ≥ 8.5, no axis < 7); run the FULL pre-flight ✓ checklist; fix everything red; deploy; verify live.
- Artifact: `_process/SHIP-REPORT.md` — the final ✓ list with evidence, shown to the user.
- Gate ✓: every box checked with evidence. This report is mandatory (user requirement).

## Input cases

| Case | User sent | 3D model | Background |
|------|-----------|----------|------------|
| A | object reference only | build from reference (Phases 1,3) | invent original environment (`25`, archetypes) |
| B | object + background refs | build from reference | recreate background EXACTLY + composite (`25`,`26`) |
| C | sentence only | decide: is a hero object needed? if yes, design one from brand DNA | invent |

In ALL cases the creative concept (Phase 2) is generated fresh — references constrain fidelity of
the *object and background*, never the *idea*.

## Failure & recovery rules

- A gate that fails twice → step back one phase (the defect is usually upstream: bad spec, weak concept).
- Never "fix" a verification by weakening the check. Fix the work.
- If an external tool is unavailable (AI-mesh API, Blender), fall back per the pipeline's gated alternatives — the procedural path always works.
- Log every deviation in `ASSUMPTIONS.md`; surface them in SHIP-REPORT.

## File map

```
website-builder/
├── 00-operating-system.md          ← you are here
├── 01-brief-intake.md              # sentence+images → BRIEF.md
├── 02-object-reference-analysis.md # object photo → MODELING-SPEC.md
├── 03-background-reference-analysis.md # background photo → PLATE-SHEET.md
├── 04-verification-protocol.md     # the after-every-action discipline
├── 10-creative-direction.md        # the brain: concept generation engine
├── 11-narrative-structure.md       # beats, acts, scroll storytelling
├── 12-art-direction-and-tokens.md  # palette derivation, design tokens, fluid layout
├── 13-typography.md                # type pairing, fluid scale, kinetic type
├── 14-copywriting.md               # voice, microcopy, copy-before-motion
├── 15-photography-and-images.md    # photographic language, beat→image matching, prompts
├── 16-video-and-motion-media.md    # video language, beat→video matching, web-video engineering
├── 20-procedural-modeling.md       # geometry cookbook: photo → mesh
├── 21-materials-pbr.md             # realism cheat sheet per material family
├── 22-texture-generation.md        # maps from the reference image
├── 23-lighting-and-environment.md  # IBL, HDRI, matching reference light
├── 24-model-verification-loop.md   # screenshot loop, IoU, iteration order
├── 25-background-recreation.md     # 3 strategies + 13 invented archetypes
├── 26-compositing-and-grounding.md # seven mismatches, shadows, grade
├── 30-scene-architecture.md        # Experience singleton, group rig, RAF
├── 31-scroll-choreography.md       # Lenis+ScrollTrigger grammar, cameras
├── 32-motion-language.md           # ease/duration/stagger token system
├── 33-micro-interactions.md        # cursors, magnetic buttons, easter eggs
├── 34-loading-experience.md        # honest preloader, compile warm-up, reveal
├── 35-page-transitions.md          # PJAX/Taxi, click-origin covers
├── 36-sound-design.md              # mute-first audio system
├── 40-stack-and-scaffold.md        # pinned stack, file tree, boot invariants
├── 41-performance-and-quality-tiers.md # budgets, tiers, degradation ladder
├── 42-asset-pipeline.md            # gltf-transform, KTX2, fonts (incl. Hebrew)
├── 43-responsive-and-mobile.md     # dual canvas, touch parity, thermal reality
├── 44-accessibility.md             # reduced-motion ×3 levels, semantic DOM
├── 45-deployment-and-shopify.md    # static deploys + 3 Shopify paths + meta/SEO
├── 50-quality-bar.md               # Awwwards rubric, ship gate, anti-clone test
└── 51-preflight-checklist.md       # the final ✓ list before anything ships
```

---

## ✓ Verification (run after reading this file, before starting any project)

- [ ] I know which input case (A/B/C) this project is.
- [ ] I know the next file to open (`01-brief-intake.md`) and the artifact it must produce.
- [ ] I have created the project's `_process/` folder and `ASSUMPTIONS.md`.
- [ ] I have NOT asked the user any creative question.
