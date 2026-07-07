# 40 — Stack & Scaffold

**Role:** The fixed default stack (pinned, proven) and the exact project skeleton every generated site starts from. The quality bar is stack-agnostic — Lenis + GSAP + vanilla Three.js is the one constant across all reference sites; orchestration, not architecture, is where the art goes.
**Phase:** 5 (EXPERIENCE) — scaffolded at the start of the build.
**Inputs:** deliverable type (BRIEF), CONCEPT.
**Outputs:** the scaffolded project.
**Upstream:** `00` · **Downstream:** `30`, `31`, `45` (deploy targets shape config).

---

## The default stack (pin these; deviate only with written justification)

| Layer | Choice | Why |
|---|---|---|
| 3D | **three** (vanilla WebGLRenderer) | no framework indirection; plain stack traces; the largest example corpus; what the reference sites actually ship |
| Animation | **gsap** (ALL plugins now free: ScrollTrigger, SplitText, MorphSVG, DrawSVG, CustomEase, Flip, ScrambleText) | one animation authority for DOM + WebGL |
| Smooth scroll | **lenis** | native-scroll based (anchors/a11y work), first-class GSAP sync, ~4KB |
| Build | **vite** static site (MPA at most) | zero-config, `vite-plugin-glsl`, deploys anywhere incl. Shopify assets |
| Post | **postprocessing** (pmndrs) | merges effects into single fullscreen passes — far cheaper than stock EffectComposer |
| GPU tiers | **detect-gpu** | benchmark-DB tier 0–3 → quality ladder (`41`) |
| Optional | @theatre/core (hand-keyframed hero choreography) · troika-three-text (SDF text in GL) · howler (`36`) | only when the concept needs them |

**Explicitly NOT default:** React Three Fiber / Next.js / Nuxt — a reactive layer between the
agent and WebGL state multiplies failure modes (re-renders, hydration, stale closures) with zero
payoff for a stateless brand site. Choose them ONLY if the deliverable must live inside an existing
React app. WebGPU/TSL: opt-in future tier, not default.

Install current stable versions at scaffold time (`npm i three gsap lenis postprocessing detect-gpu`,
dev: `vite vite-plugin-glsl`), record the resolved versions in the project README.

## Project skeleton (emit exactly)

```
project/
  index.html            # inline critical CSS, preloader shell, canvas, semantic sections
  vite.config.js
  package.json
  public/
    models/  *.glb      # meshopt/draco compressed (42)
    textures/ *.ktx2|.webp|.hdr
    draco/  basis/      # decoders (copy from three/examples/jsm/libs)
    fonts/  *.woff2     # subset (42)
    favicon.svg  og.jpg
  src/
    main.js             # boot order: reduced-motion gate → tier detect → Experience → ScrollManager → Preloader
    styles/tokens.css   # 12
    style.css
    motion.js           # 32
    Experience/…        # 30 skeleton
    ui/ Preloader.js Cursor.js Navigation.js TextReveals.js
```

```js
// vite.config.js
import glsl from 'vite-plugin-glsl';
export default {
  base: './',                                   // works on GH Pages AND Shopify CDN
  plugins: [glsl()],
  build: { target: 'es2022', assetsInlineLimit: 0 },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.ktx2'],
};
```

## Boot invariants (every site, in this order)

1. `history.scrollRestoration = 'manual'` + scroll to 0.
2. `prefers-reduced-motion` gate BEFORE instantiating Lenis/WebGL (`44` — reduced path boots simpler).
3. detect-gpu tier → DPR cap + feature flags; tier 0 → static fallback page (`41`).
4. Single RAF wiring (`31` bootstrap). 5. LoadingManager preloader (`34`).
6. `ScrollTrigger.refresh()` after fonts + preloader + lazy content.
7. ResizeObserver + DPR-change listener (`30`). 8. `webglcontextlost` handler; visibility-change pauses ticker.
9. destroy() paths exist from day one (HMR in dev exercises them constantly — free leak testing).

## The DOM-as-API contract

All behavior binds through data-attributes — content and behavior evolve independently:
`data-section`, `data-camera-state`, `data-theme`, `data-anim="reveal, delayMs"`, `data-lenis-prevent`,
`data-cursor="grow|label"`. CMS/Liquid injects dynamic values via `<script type="application/json">`
blobs + asset URLs as data-attributes on `<body>` (the Liquid→JS bridge — `45`). The JS engine stays
fully asset-agnostic.

## Dev affordances (always scaffolded)

`?debug` → lil-gui + OrbitControls + stats + ScrollTrigger markers (`30`). `npm run shots` →
the Playwright screenshot harness (`24`-style) wired to THIS project for the verification loops.

---

## ✓ Verification

- [ ] Stack = the table (any deviation has a written justification in ASSUMPTIONS.md).
- [ ] `npm run dev` boots clean; `npm run build` emits dist/ with hashed assets; zero console errors/warnings.
- [ ] Boot order matches the invariants list (read main.js top to bottom).
- [ ] Resolved dependency versions recorded in project README.
- [ ] Data-attribute contract used for all section/behavior wiring (grep for querySelector-by-class behavior bindings — should be rare).
- [ ] ?debug rig and shots harness both work (screenshots as proof).
- [ ] vite base './' verified: dist opens from a file path / subfolder without 404s.
