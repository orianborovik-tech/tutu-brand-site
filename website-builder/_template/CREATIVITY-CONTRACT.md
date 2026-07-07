# CREATIVITY CONTRACT — read before writing a single line

This template is **plumbing, not design**. It contains the engineering every award-tier site
shares (render loop, scroll sync, loading, disposal, verification lab) and **zero** visual,
narrative, or motion decisions. The three reference sites run on this exact skeleton and look
nothing alike — the skeleton is invisible; the concept is everything.

## The deal

1. **Every project starts at `website-builder/00-operating-system.md`** and produces a FRESH
   concept via file `10` (five divergent directions, anti-clone gate). The template is picked up
   only in Phase 5, after CONCEPT / COPY / SHOT-LIST exist.
2. **Every `TODO_DECIDE(nn)` marker in this codebase is a creative decision YOU must make**,
   guided by the system file whose number is in the parentheses — derived from THIS project's
   references and concept, never from defaults, never from the reference sites, never from a
   previous project. `npm run build` FAILS while any marker remains — shipping an undecided
   site is mechanically impossible.
3. **Placeholder content is scaffolding, not suggestion.** The demo sections in `index.html`,
   the neutral hero mesh in `World/Hero.js`, the gray boot background — all exist only so the
   engine runs before your content lands. Replace all of it. If any placeholder survives to
   production, file `51` blocks the ship.
4. **What you may NOT do:** reuse a palette/typeface/motion-personality combo from a previous
   project; transplant a signature moment from the reference sites; keep the demo copy; pick
   "safe defaults" instead of deciding. What you MUST do: decide, log the reasoning in
   `_process/CONCEPT.md`, and make this site unmistakably itself.

## The decision map (what the code exposes → which file governs it)

| Marker location | Decision | Governed by |
|---|---|---|
| `src/styles/tokens.css` | full palette, grounds, accent, shadow tint, radii, motif | `12` |
| `src/styles/tokens.css` (type block) | two faces, display scale, leading/tracking | `13` |
| `src/motion.js` | house ease, duration tokens, stagger unit, physics | `32` |
| `index.html` sections | beat structure, headlines, copy | `11`, `14` |
| `src/Experience/sources.js` | the project's actual assets (model, env, textures, media) | `24`, `42`, `15`, `16` |
| `src/Experience/World/Hero.js` | the verified model + its baked personality animation | `20`–`24` |
| `src/Experience/World/Environment.js` | recreated background or invented archetype | `23`, `25`, `26` |
| `src/Experience/Scroll/CameraPath.js` | camera pattern (spline/poses) + authored poses | `31` |
| `src/ui/Preloader.js` reveal timeline | loader-as-beat-zero + hero entrance choreography | `34` |
| `src/ui/Cursor.js` + CSS hooks | cursor concept (or removal), hover grammar | `33` |

## Why this exists

A strong model given a blank file writes generic architecture AND generic design. A model given
finished plumbing spends its entire capacity on the only thing that matters: an original concept,
executed with craft. That is the template's single purpose.
