# 50 — Quality Bar (The Award Rubric)

**Role:** The self-judgment system: score the site the way an Awwwards jury does, BEFORE shipping. Design 40 / Usability 30 / Creativity 20 / Content 10. Ship gate: weighted ≥ 8.5 with no axis below 7 — juries punish any weak dimension.
**Phase:** 7 (SHIP) — and a mid-point check at design-lock (end of Phase 2).
**Inputs:** the finished site + all _process artifacts. **Outputs:** the scored rubric in SHIP-REPORT.
**Upstream:** everything · **Downstream:** `51` (mechanical twin of this judgment file).

---

## How to self-score honestly (per `04`: try to FAIL it)

Score each axis 1–10 as a SKEPTICAL juror seeing the site cold on their own laptop+phone. Evidence
per score — no axis scored without walking its checklist. Weighted = D×.4 + U×.3 + C×.2 + Co×.1.

### Design (40%) — score against:
- One coherent visual world: palette/type/motif/grade unified across DOM, media, and WebGL (`12`–`16`).
- Display typography treated as illustration (size courage + optical kerning + reveals — `13`).
- Composition: negative space is deliberate; every screen could be a poster (screenshot 6 random scroll positions — are they postable?).
- Craft depth: seams, shadows, grain, imperfections — the 10% details visible only up close.
- Motion design elevates (grammar consistency `32`); nothing moves without a reason.

### Usability (30%) — the eliminator:
- Loads fast (`41` numbers green), reads instantly, navigates obviously.
- Scroll is enhanced, never trapped (skip-ability, keyboard, native semantics — `31`).
- Mobile is a designed experience (`43`); a11y solid (`44`).
- Content findable: a real human can answer "מה זה? כמה עולה? איך משיגים?" in seconds.

### Creativity (20%) — concept-coherence + ONE signature moment:
- The concept is original (anti-clone gate re-run NOW against the finished thing — `10`).
- **The signature moment test:** name the one thing a visitor describes to a friend. If you can't name it in five words, it doesn't exist.
- **The seen-it test:** would a heavy Awwwards browser sigh "another X"? (giant-object-spins-on-scroll, dark-blob-shader-site…) — genuine novelty somewhere is mandatory.
- Cohesion density: every default surface replaced with an on-concept invention (`33` sweep).

### Content (10%) — binary gate first:
- ZERO filler: no lorem, no stock phrases, no machine-translation smell (`14`). Filler = automatic fail regardless of score.
- H1s tell the story alone (`11`); microcopy carries the voice everywhere; real facts present.

## The comparison ritual (bar, not template)

Put the finished site mentally beside the three reference sites and answer in writing:
1. Does it hold the same **confidence** (loads, moves, and speaks like it knows it's good)?
2. Is the **craft density** comparable (details per screen)?
3. Is it **completely different** from them in concept, look, and signature moment? (All three must be YES.)

## Beat-the-reference targets (their measured weaknesses = our floor)

- Accessibility BETTER than 7.4: reduced-motion ships, real text under splits (`44`).
- Performance BETTER than 7.8: compressed textures, honest budgets (`41`,`42`).

## Verdict protocol

- Weighted ≥ 8.5, no axis < 7 → proceed to `51`.
- Any axis < 7 → return to that axis's files; fix the WORK (never re-score sympathetically). Two
  failed rounds on the same axis → the concept itself is weak on that dimension; escalate to a
  Phase-2 revisit (per `00` failure rules).

---

## ✓ Verification

- [ ] All four axes scored with written evidence per checklist line (not gut numbers).
- [ ] Weighted score ≥ 8.5; no axis < 7 — arithmetic shown.
- [ ] Signature moment named in ≤ 5 words.
- [ ] Seen-it + anti-clone tests re-run on the FINISHED site, in writing.
- [ ] Comparison ritual: three YES answers, in writing.
- [ ] Content binary gate passed (zero-filler sweep of every string).
- [ ] Beat-the-reference: reduced-motion works AND textures compressed (spot-proof both).
- [ ] Rubric + evidence recorded in SHIP-REPORT.md.
