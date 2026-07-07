# 14 — Copywriting

**Role:** All words on the site: headlines as narrative beats, in-world microcopy, CTA voice. Copy is 10% of the award score but a binary gate (filler disqualifies) — and motion design DEPENDS on final copy, so copy is written before choreography.
**Phase:** 2 (CONCEPT) — after narrative, before any motion work.
**Inputs:** CONCEPT.md (voice, beats), BRIEF.md (language, facts). **Outputs:** `_process/COPY.md` (final, exact strings).
**Upstream:** `10`, `11` · **Downstream:** `13` (sizes depend on lengths), `31`–`34` (choreography animates these exact strings), `45` (meta copy).

---

## The iron rule: copy before motion

Kinetic type is choreographed per line/word/char count. Changing a headline after choreography
breaks stagger rhythm, line masks, and layout. COPY.md freezes the exact strings first. (Placeholder
text in a built section = the system failed this file.)

## Voice

Derive from the concept constitution (voice decision) + essence-word. Define in COPY.md:
- **3 voice pillars** (e.g., deadpan · precise · warm) — every line must pass all three.
- **Person & tense** — first person ("I/we") is intimate and strong for personal/brand stories;
  imperative for action-driven; present tense default.
- **Language** — per BRIEF. Hebrew: write native Hebrew (not translated-English); mind gendered
  verbs; keep display lines short (Hebrew words run long); RTL punctuation discipline.

## Registers (three, distinct)

1. **Display statements** — hero + beat headlines. 2–8 words. Written to be read alone in sequence
   (the read-the-H1s test, `11`). Concrete beats abstract: "grown in volcanic shade" > "quality you
   can trust". No category clichés (ban-list from `10`).
2. **Body/support** — 1–3 short sentences per beat max. One idea, one proof (real fact from BRIEF
   research). If a paragraph needs scrolling, it's a different site.
3. **Label layer** — tiny uppercase system labels (section numbers, coordinates, data readouts,
   "SCROLL"). This is where the world-building leaks into the UI. In-world always: a space concept
   labels sections as "ORBIT 01", a kitchen concept as "COURSE 01".

## In-world microcopy (judged surfaces)

Write designed copy for EVERY default surface — this density of voice is what jurors read as
craft: loader lines (beat zero — a joke, a countdown, a ritual phrase); nav items; buttons
(never "Submit" — "Take it home", "פתחו את הקופסה"); form errors (in-voice, kind); empty states;
404 (a destination, not an apology — on-concept scene + one line); cookie/consent (branded, honest);
footer sign-off; OG/meta description (`45`); `<title>` (with a wink if voice allows).

## CTA discipline

ONE primary action sitewide (from BRIEF's action goal). Its label is specific and physical
("הוסיפו לסל — ₪49" beats "לרכישה"). Secondary actions are visually quieter and rarer. At the CTA
beat, voice turns clear and conventional — people act on clarity, not cleverness (delight lives at
low-intent moments, not on the buy button).

## COPY.md format (the contract)

```markdown
Voice pillars: … · Person: … · Language: he (RTL)
| beat | element | string (FINAL) | max-lines @375 | notes for motion |
| 1 | h0 | "…" | 2 | split by word, mask reveal |
| 1 | label | "01 · שורש" | 1 | type-on |
…
Microcopy: loader[3 rotating lines] · 404 · buttons · errors · meta/OG · footer
```

Every string carries its `max-lines @375` — the copy is not final until it fits the mobile canvas
(check the longest word at display size).

---

## ✓ Verification

- [ ] COPY.md complete: every beat + every microcopy surface has a FINAL string (zero placeholders anywhere in the build).
- [ ] Read-the-H1s test passes with the actual final headlines.
- [ ] Every line passes the 3 voice pillars (spot-check 10 random strings).
- [ ] Display lines 2–8 words; at least 3 real, specific facts used; zero category clichés (check against ban-list).
- [ ] Hebrew copy is native-grade: read it aloud; check gender agreement, RTL punctuation.
- [ ] Each string fits its `max-lines @375` (render or measure the worst ones).
- [ ] CTA: one primary action, physical label, conventional clarity at the CTA beat.
