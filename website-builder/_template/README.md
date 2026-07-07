# _template — the engineering starter

**Read `CREATIVITY-CONTRACT.md` first.** This is plumbing with zero design decisions:
the skeleton every award-tier site shares, emitted so the operating model spends its
capacity on concept and craft instead of architecture.

## Use per project

```bash
cp -r website-builder/_template my-project && cd my-project
npm install
npm run dev            # boots immediately: gray placeholder hero, RoomEnvironment, working scroll
npm run lab            # model-lab server (port 5180) for the 20–24 modeling loop
npm run lab:shots      # deterministic screenshots (Playwright, CPU-safe)
npm run lab:compare    # montage / silhouette IoU
npm run build          # FAILS while any TODO_DECIDE marker remains — by design
```

## What's inside vs what you must create

| Included (engineering) | You create per project (creativity) |
|---|---|
| Experience singleton, group rig, single RAF, disposal | the concept (file 10) |
| Lenis+ScrollTrigger bootstrap, two-grammar hooks, section state machine | palette/type/motion tokens (12/13/32) |
| Camera system: pose-to-pose AND spline modes | authored poses / curve + narrative beats (11/31) |
| Honest preloader orchestration + warm-up | the loader ceremony + reveal choreography (34) |
| House-reveal plumbing (SplitText, one-shot grammar) | its parameters + all copy (13/14) |
| Renderer baseline (color mgmt, tiers, governor) | tone-mapping choice, environment, grade (21/23/25/26) |
| model-lab harness (shots, montage, IoU gate) | the actual model from YOUR reference (20–24) |
| Cursor/reveal/theming hooks via data-attributes | whether/what the cursor IS, hovers, delight (33) |

## Wire-up notes

- Assets go in `sources.js`; the preloader progress and reveal sequencing then just work.
- Sections are declared in HTML via `data-section` / `data-camera-state` / `data-theme` /
  `data-pin` — SectionManager and the camera read only these.
- `?debug` → OrbitControls + `window.__logPose()` for authoring camera poses.
- KTX2/Draco decoders: copy from `three/examples/jsm/libs/` into `public/` when used (42).
