# 11 — Narrative Structure

**Role:** Turn the committed concept into the site's story: acts, beats, sections, pacing — the skeleton scroll choreography (`31`) will animate and copy (`14`) will voice.
**Phase:** 2 (CONCEPT).
**Inputs:** CONCEPT.md. **Outputs:** the Narrative section of CONCEPT.md (beat sheet).
**Upstream:** `10` · **Downstream:** `14`, `31`, `34`, `45`.

---

## The shape of a scroll story

A one-page narrative site is a film the visitor plays with their thumb. Structure it in acts:

1. **COLD OPEN (loader→hero)** — the loader is beat zero (`34`), not a utility; its exit and the
   hero entrance are ONE choreographed timeline. The hero states the concept in ≤ 8 words + one
   image/scene. No explaining. Confidence is the message.
2. **ACT I — establish (1–2 beats)** — the world and the subject. What is this, where are we.
3. **ACT II — deepen (2–3 beats)** — process, benefits, variations, story. Each beat = ONE idea.
   This is where the structural tension gets exercised (swing between its poles).
4. **CLIMAX — the signature moment** — placed at ~60–75% of scroll depth: deep enough to be earned,
   early enough that everyone reaches it. The one thing people describe to a friend.
5. **RESOLUTION + CTA** — tension resolves; the action goal (BRIEF) gets its moment: clear, single,
   unmissable. Commerce surfaces behave conventionally here (people buy from interfaces they trust).
6. **FOOTER — the encore** — award-tier footers reward finishing: a toy, a game, a wink (`33`).
   Ending flat is a wasted judged surface.

## Beat sheet rules

- **5–8 beats total.** Fewer = thin; more = fatigue. Every beat earns its scroll or dies.
- **One idea per beat.** If a section says two things, split or cut.
- **Tension/release pacing** — alternate dense↔airy, loud↔quiet, motion↔still. Two loud beats in a
  row deafen; two quiet ones bore. Sketch the intensity curve (1–10 per beat) — it should look like
  a mountain range rising to the climax, not a plateau.
- **The read-the-H1s test:** write each beat's headline; read ONLY the headlines top to bottom.
  They must tell the whole story alone (jurors skim exactly like this).
- **Every beat gets:** name · one-line purpose · headline draft · what the 3D world does
  (camera/object/environment state — feeds `31`'s section state machine) · intensity score.

## Mapping story to scroll mechanics (contract with `31`)

- Establishing/reading beats → normal scroll flow, one-shot entrance animations.
- Transformation beats (object changes, world shifts) → pinned sections with scrubbed timelines.
- The climax → usually pinned + the scene's biggest state change; consider breaking the established
  grammar ONCE here (the pattern-break is what makes it land).
- Between-beat seams are designed, not default: morphing dividers, color-world flips, camera cuts
  (`31` §seams). The seam is part of the story.

## Beat sheet template (goes in CONCEPT.md)

```markdown
## Narrative
Logline: …
| # | beat | purpose | headline | world state | mechanic | intensity |
| 0 | loader | … | (microcopy) | assets warm | overlay | 2 |
| 1 | hero | … | "…" | pose HERO | entrance tl | 7 |
| 2 | … |
Climax = beat N · CTA = beat N+1 · Encore = footer toy: …
```

---

## ✓ Verification

- [ ] 5–8 beats; each has exactly one idea (state it in one line to prove it).
- [ ] Intensity curve sketched; no two adjacent beats within 1 point of each other; peak = climax.
- [ ] Read-the-H1s test passed: headlines alone tell the story.
- [ ] Signature moment sits at 60–75% depth and has its own beat.
- [ ] Every beat has a defined world state (camera + object + environment) for `31`.
- [ ] CTA beat exists, single action, matches BRIEF's action goal.
- [ ] Footer encore is designed, on-concept.
