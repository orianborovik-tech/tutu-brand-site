# 01 — Brief Intake

**Role:** Turn one sentence + attached images into a complete working brief — without asking anything.
**Phase:** 0 (INTAKE).
**Inputs:** The user's sentence (usually Hebrew), attached reference image(s).
**Outputs:** `_process/BRIEF.md`.
**Upstream:** `00-operating-system.md` · **Downstream:** `02`, `03`, `10`.

---

## 1. Parse the sentence

Extract exactly these fields (infer aggressively; never ask):

| Field | How to infer when absent |
|---|---|
| **Subject** | What is the site about? (product / person / brand / event) — usually explicit. |
| **Deliverable** | Default: single-page scroll-narrative site. Multi-page only if the sentence demands it (shop, catalog). |
| **Action goal** | What should a visitor DO? Buy → commerce patterns (`45`); know → story; feel → pure experience. Default: brand impression + one CTA. |
| **Language(s)** | Sentence in Hebrew → site copy Hebrew-first with RTL discipline, unless the brand context is clearly international (then bilingual or English). Log the choice. |
| **Constraints** | Anything the user *did* specify (color, mood, "like X") is a HARD constraint. Everything else is yours. |

The sentence is short by design. Treat every word as intentional: "יוקרתי" (premium) sets motion
personality; "מצחיק" (funny) sets voice; a brand name sets research direction.

## 2. Read the images before any tool touches them

Attached images are the richest part of the brief. Classify each:

- **Object reference** — a product/thing to be modeled in 3D. Signals: single subject, product-photo framing. → goes to `02`.
- **Background reference** — an environment/scene. Signals: no single hero subject, landscape/interior/atmosphere. → goes to `03`.
- **Style reference** — a screenshot of a site/poster/artwork. It informs mood ONLY. Never copy its layout or concept (Doctrine law 2).
- Ambiguous (an object *in* an environment)? It is BOTH: crop mentally; the object goes to `02`, the scene to `03`.

## 3. Extract brand DNA from the images (10 minutes, no external tools)

Look at the object reference and write down:

1. **Materials** — glass/metal/fabric/liquid… (drives environment + lighting later).
2. **Color anchors** — 3–5 swatches with approximate hex, sampled from the image (drives `12`).
3. **Era & register** — vintage/clinical/artisanal/techy; premium/playful/raw.
4. **One-word essence** — the single adjective the site must radiate. Write it. Everything downstream must agree with it.
5. **Physical personality** — is this object heavy, bouncy, fragile, fizzy, soft? This becomes the motion personality (`32`) and the model's "baked-in" animation character (MANA's can is jelly — squish armature scrubbed at a narrative beat; the principle transfers: objects have physics personalities, decide this one's).

## 4. Research the subject (web, 15–30 minutes)

- If a real brand/person: fetch their existing presence, competitors, category codes — so the concept can BREAK the category codes deliberately.
- If unbranded product: understand what it is, how it's used, its cultural context.
- Note 2–3 facts that could become narrative material (origin, process, numbers). Real specifics beat generic claims (`14`).

## 5. Write `_process/BRIEF.md`

```markdown
# BRIEF — <project>
Sentence (verbatim): "<original>"
Input case: A / B / C            # per 00-operating-system.md
Subject · Deliverable · Action goal · Language(s)
Hard constraints (user's explicit words only): …
Brand DNA: materials / color anchors / era & register / essence-word / physical personality
Subject research notes: …
Images: ref-object-01.jpg → 02 · ref-bg-01.jpg → 03 · …
```

Copy the reference images into `_process/refs/` with those canonical names. Every downstream file
refers to them by this name — never re-guess which image was which.

---

## ✓ Verification

- [ ] BRIEF.md exists and every field is filled (no "TBD").
- [ ] Input case A/B/C stated explicitly.
- [ ] Each image classified and copied to `_process/refs/` with canonical name.
- [ ] Essence-word chosen — one word, written down.
- [ ] Hard constraints list contains ONLY things the user actually said (re-read the sentence to confirm).
- [ ] Zero questions were sent to the user.
