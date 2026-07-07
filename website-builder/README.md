# Website Builder System · מערכת בניית האתרים

> תיקייה אחת. 34 קבצי מומחיות. מערכת הפעלה שלמה לבניית אתרים ברמת פרסים —
> ממשפט אחד ותמונת רפרנס ועד אתר חי, בלי שאלות.

---

## 🇮🇱 איך זה עובד (למשתמש)

**את/ה שולח/ת:** משפט אחד + תמונת רפרנס של אובייקט (ולפעמים גם תמונת רפרנס לרקע).

**המערכת עושה את כל השאר:**
1. מנתחת את התמונות במדידות פיקסלים (לא בהערכות).
2. ממציאה קונספט מקורי — הדוגמאות (MANA, dontboardme, landonorris) הן רף איכות, אף פעם לא תבנית.
3. בונה מודל תלת־ממד מדויק ופוטוריאליסטי של האובייקט בקוד (Three.js), ומאמתת אותו מול הרפרנס
   בלולאת צילומי־מסך עד התאמה מדודה (חפיפת צללית > 93%, סטיות פרופורציה < 3%).
4. משחזרת את הרקע בדיוק (אם נשלח) ומלחימה את המודל לתוכו בכלים של קומפוזיטינג קולנועי —
   או ממציאה סביבה מקורית (אם לא נשלח).
5. בוחרת אוטומטית אילו תמונות וסרטונים מחמיאים לכל קטע — וממה להתרחק.
6. בונה את האתר: נרטיב, סקרול, מושן, טיפוגרפיה, קופי, טעינה, סאונד, ביצועים, נגישות, דיפלוי (כולל Shopify).
7. **מאמתת בביקורתיות אחרי כל פעולה** ומסיימת ברשימת ✓ מלאה עם ראיות (SHIP-REPORT) — זה החוזה.

**נקודת הכניסה היחידה:** `00-operating-system.md` — הסוכן מתחיל שם כל פרויקט, תמיד.

---

## 🇬🇧 For the operating agent

You received one sentence + reference image(s). Open `00-operating-system.md` and follow the
pipeline to the end. The five laws: **Autonomy** (zero questions) · **Originality** (references
are a level, never a look) · **Accuracy** (measured fidelity to reference images) ·
**Verification after every action** (evidence, not vibes — `04`) · **Craft everywhere**.

## The pipeline at a glance

```
INTAKE → ANALYSIS → CONCEPT → 3D PRODUCTION → WORLD → EXPERIENCE → HARDEN → SHIP
  01      02·03     10–16       20–24         25·26     30–36      41–44    45·50·51
                                       (loops through 24's verification gate)
```

## File map

| # | File | Domain |
|---|------|--------|
| **Core OS** | | |
| 00 | operating-system | mission, doctrine, pipeline, gates — THE entry point |
| 01 | brief-intake | one sentence + images → BRIEF |
| 02 | object-reference-analysis | photo → measured MODELING-SPEC |
| 03 | background-reference-analysis | photo → PLATE-SHEET (VFX-style plate reading) |
| 04 | verification-protocol | critical check after EVERY action; evidence standards |
| **Creative** | | |
| 10 | creative-direction | concept engine: 5 lenses, scoring, anti-clone gate |
| 11 | narrative-structure | beats, acts, intensity curve, signature-moment placement |
| 12 | art-direction-and-tokens | original palettes, design tokens, fluid vw-rem layout |
| 13 | typography | pairing, display-as-illustration, kinetic type, RTL |
| 14 | copywriting | voice, registers, in-world microcopy, copy-before-motion |
| 15 | photography-and-images | photographic language, beat→image matrix, prompts, flatter/avoid |
| 16 | video-and-motion-media | living-photo loops, beat→video matrix, web-video engineering |
| **3D Production** | | |
| 20 | procedural-modeling | photo → mesh in code; primitives, CSG, imperfection noise |
| 21 | materials-pbr | realism cheat sheet per material family; renderer baseline |
| 22 | texture-generation | labels from the reference; canvas PBR maps; Sobel normals |
| 23 | lighting-and-environment | IBL, HDRI/procedural env, matching reference light |
| 24 | model-verification-loop | screenshot loop, IoU > 0.93, iteration order — the gate |
| 25 | background-recreation | 3 backdrop strategies + 13 invented-environment archetypes |
| 26 | compositing-and-grounding | the seven mismatches; shadow catchers; shared grade |
| **Experience** | | |
| 30 | scene-architecture | Experience singleton, group rig, single RAF, disposal |
| 31 | scroll-choreography | Lenis+ScrollTrigger, two grammars, cameras, state machine |
| 32 | motion-language | ease/duration/stagger tokens; house moves; one grammar |
| 33 | micro-interactions | cursors, magnetic buttons, delight placement, 404 |
| 34 | loading-experience | honest preloader, compile warm-up, one-timeline reveal |
| 35 | page-transitions | persistent-canvas SPA, click-origin covers, leak discipline |
| 36 | sound-design | mute-first three-layer audio |
| **Engineering** | | |
| 40 | stack-and-scaffold | pinned stack (three+gsap+lenis+vite), skeleton, boot invariants |
| 41 | performance-and-quality-tiers | budget tables, GPU tiers, runtime governor |
| 42 | asset-pipeline | gltf-transform, meshopt/KTX2, fonts incl. Hebrew subsetting |
| 43 | responsive-and-mobile | dual canvas, touch parity, iOS reality, thermal reality |
| 44 | accessibility | 3-level reduced motion, semantic DOM, contrast over pixels |
| 45 | deployment-and-shopify | static deploys, 3 Shopify paths, meta/OG/SEO |
| **Ship** | | |
| 50 | quality-bar | Awwwards rubric (D40/U30/C20/Co10), ship gate ≥ 8.5 |
| 51 | preflight-checklist | the final ✓ list with evidence → SHIP-REPORT to the user |

## Conventions that make 30 files one system

- **Contracts between phases:** named artifacts in `_process/` — BRIEF → MODELING-SPEC / PLATE-SHEET
  → CONCEPT / COPY / SHOT-LIST → MODEL.md → WORKLOG → SHIP-REPORT.
- **Every file header:** Role · Phase · Inputs · Outputs · Upstream/Downstream.
- **Every file ends with `✓ Verification`** — run honestly after that file's work (`04` defines the discipline).
- **Cross-references by number** (`24`, `42`…) — files assume each other; none stands alone.
- Media generation prompts (15/16) speak the same dialect as `environments.md` and the
  `higgsfield-generate` skill in this repo — plug-and-play when the user connects the tools.

## Design rationale

Built from in-session web research (2026-07): live source teardowns of the three reference sites,
Awwwards/FWA standards, Three.js/GSAP/Lenis current docs, VFX compositing literature, and the
asset-pipeline/performance state of the art. Full spec: `docs/superpowers/specs/2026-07-07-website-builder-system-design.md`.
