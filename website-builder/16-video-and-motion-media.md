# 16 — Video & Motion Media

**Role:** The site's video layer: cinematic loops and clips that behave like living photographs. Defines the project's motion-cinematography language, auto-matches video to beats, authors generation-ready prompts (Seedance/Higgsfield-class — same dialect as `environments.md` in this repo), and enforces web-video engineering standards.
**Phase:** 2 (CONCEPT — language + shot list) and 5 (EXPERIENCE — production + placement).
**Inputs:** CONCEPT.md, beat sheet, photographic language (`15` — video obeys the SAME grade/light world).
**Outputs:** video section of `_process/SHOT-LIST.md` → generated clips → optimized assets.
**Upstream:** `10`, `11`, `15` · **Downstream:** `31` (scroll-synced playback), `34` (poster/loading), `42`, `41`.

---

## 1. Motion-cinematography language (per project)

Video on award sites = **living photographs**: slow, deliberate, loop-perfect. Define:
- **Camera grammar** — 1–2 moves ONLY (slow dolly-in, drift, orbit-arc, static-with-life). Ban the rest for this project. Handheld chaos only if the concept demands raw energy.
- **Speed personality** — dreamy 0.5× / natural / kinetic. One choice, all clips.
- **Light + grade** — inherited from `15` verbatim (one shoot, one grade — including the WebGL world).
- **Loop philosophy** — every ambient video is a seamless loop (end frame ≈ start frame; prompt for it: "seamless loop", cyclic motion like steam/waves/drift, or plan a crossfade).

## 2. What flatters ↔ what to avoid

| מחמיא — always elevates | להתרחק — always cheapens |
|---|---|
| Slow, confident camera moves (one per clip) | Whip-pans, shaky zooms, GoPro energy on a premium brand |
| Macro liquid/texture/steam loops (product physics) | Slow-mo clichés (generic splash on white, spinning-on-turntable) |
| Atmospheric world-building clips (the environment breathes) | Story-less drone footage that could sell anything |
| 6–12s seamless loops, muted, graded like the site | 30s+ clips with cuts — this is a site, not YouTube |
| Motion that continues the 3D scene's physics vocabulary | Video whose motion fights the scroll choreography |
| One video doing a hero's job (background of a full beat) | Many small videos flickering for attention |
| Real-time or 0.5× — deliberate speeds | Sped-up timelapse jitter (unless the concept IS time) |

## 3. Automatic beat→video matching

| Beat type | Video use | Spec pattern |
|---|---|---|
| Hero | usually 3D (live WebGL beats video); video-hero ONLY if concept is cinematic-documentary | 16:9 + 9:16 pair, 8–12s loop |
| Establish / world | full-bleed ambient loop behind copy | slow drift, heavy atmosphere, low detail-contrast where text sits |
| Process / craft | macro loop (pour, stitch, steam, mix) — the strongest video slot | 100mm-macro language, 6–10s, loop-perfect |
| Proof / context | short real-context clip, one human gesture | documentary grammar, one action, no cuts |
| Climax | 3D owns it; video only as texture layer (screens, projections) | — |
| CTA | none, or a calm product loop — never noise near the action | — |
| Footer | optional mood loop at low opacity under type | near-abstract |

Rules: ≤ 3–5 video assets per site; a beat gets video OR a photo series, not both fighting; if a
clip's job can be done by a 30KB shader (gradient drift, particles — `25`), the shader wins.

## 4. Prompt authoring (Seedance/Higgsfield dialect)

Same structure as `environments.md` prompts — one motion sentence, camera-first:

```
[camera move] + [subject/action] + [environment] + [light words] + [grade/mood words] +
[lens/format words: "35mm", "macro", "shallow depth of field"] + [loop hint: "seamless loop"]
--aspect_ratio 16:9|9:16|1:1 --duration 6–12
```

- Write the full prompt set in SHOT-LIST.md now; run through the connected tool when available.
- Consistency lock: same light/grade phrases as the image prompts (`15`) — one world.
- Product accuracy rule: the hero product NEVER gets generated as video (generators mangle labels/
  proportions). Product motion = the verified 3D model animated in WebGL (`31`); generated video is
  for environment, material poetry, and context ONLY.

## 5. Web engineering standards (non-negotiable)

- **Format:** H.264 MP4 (universal) + WebM/AV1 where supported; `<video muted autoplay loop playsinline preload="metadata">` — muted is REQUIRED for autoplay everywhere (iOS included).
- **Budgets:** ambient loop 1080p ≤ 2.5–4MB (CRF 26–30, no audio track at all — strip it); mobile source 720p; total video payload ≤ 8–10MB per page.
- **Poster:** every video ships a poster frame (its own first frame, graded) — no black flash. Poster doubles as the reduced-motion / low-tier / save-data replacement (`41`,`44`).
- **Playback discipline:** play/pause via IntersectionObserver (offscreen videos NEVER play — battery + thermal `41`); scroll-scrubbed video (currentTime driven by ScrollTrigger) only with keyframe-dense encodes (`-g 1` all-intra or keyint ≤ 5, larger files — budget it) and only for ONE hero moment.
- **Placement over video:** text needs a scrim/gradient zone — verify contrast on the BUSIEST frame, not the poster (`44`).
- `prefers-reduced-motion` → poster image instead of autoplay (`44`).

---

## ✓ Verification

- [ ] Motion language defined (camera grammar ×≤2, speed, loop philosophy) and consistent with `15`'s grade.
- [ ] Every planned clip maps to a beat via the matrix; total ≤ 5 clips; no video next to the CTA.
- [ ] Flatter/avoid table applied — each clip justified in one line against it.
- [ ] Prompts written, consistency-locked with image prompts, loop hints included.
- [ ] Hero product appears ONLY as the verified 3D model — zero generated product shots (check every prompt).
- [ ] Loops seamless (watch each loop 3 cycles — no visible jump).
- [ ] Engineering: muted+playsinline+poster on every video; sizes within budget (list them); IO play/pause verified (network tab: offscreen = paused).
- [ ] Text-over-video contrast checked on busiest frame; reduced-motion fallback works.
