# 04 — Verification Protocol

**Role:** The cross-cutting discipline of the whole system: critical verification after EVERY action, evidence before claims, and the ✓-checklist culture. Every other file's `✓ Verification` block is an instance of this protocol.
**Phase:** ALL — applies inside every phase and at every gate.
**Inputs:** Any action just performed. **Outputs:** Evidence-backed pass/fail + fixes.
**Upstream:** `00` · **Downstream:** every file; final aggregation in `51-preflight-checklist.md`.

---

## The rule

> **No claim without evidence. No phase gate without its ✓ block. No ✓ without honestly trying to fail it.**

"It should work", "looks right", "probably fine" are banned phrases. Each ✓ item is checked by
LOOKING at output: a screenshot, a measured number, a command's stdout, a diff.

## The after-every-action loop

After every meaningful action (wrote a module, built a model iteration, added a section,
changed a shader, ran a build):

1. **Predict** — before checking, state what you expect to see if it worked.
2. **Observe** — run/render/measure. Take the screenshot. Read the actual numbers.
3. **Compare** — expectation vs observation. Any gap = a finding, even if it "still looks OK".
4. **Attack** — spend 60 seconds trying to break it: resize the window, scroll fast, reload mid-animation, throttle CPU ×4, check the console. The bug you find now costs minutes; found at SHIP it costs hours.
5. **Record** — one line in `_process/WORKLOG.md`: action → evidence → verdict. (This log builds SHIP-REPORT for free.)

## Evidence standards by claim type

| Claim | Required evidence |
|---|---|
| "The model matches the reference" | Side-by-side montage + silhouette IoU ≥ 0.93 + ratio deltas < 3% (`24`) |
| "The composite is convincing" | Seven-mismatch checklist pass + 4× zoom on the contact silhouette (`26`) |
| "It's 60fps" | Recorded frame times during a FULL scroll pass, not a still frame; median + worst 1% |
| "It's responsive" | Screenshots at 320 / 390 / 768 / 1440 / 1920 px, portrait AND landscape on mobile widths |
| "Assets are within budget" | The actual budget table (`41`) with actual numbers filled in, red/green per row |
| "No console errors" | The console output itself after a full user journey |
| "Reduced motion works" | A run with `prefers-reduced-motion: reduce` emulated, screenshot per section |
| "It's deployed" | Fetch of the LIVE url returning 200 + visual check of the live page |

## Self-review triggers (step back and re-check the whole phase)

- Any ✓ item failed twice in a row → the defect is upstream; return one phase (per `00`).
- You feel the urge to weaken a threshold to pass → forbidden. The threshold stands; fix the work.
- Two "small fixes" in the same area within an hour → stop patching; find the root cause (systematic debugging: reproduce → isolate → understand → fix once).
- Anything surprising during Attack → do not ship past it; surprising now = broken for a user later.

## The ✓-checklist culture

- Every expertise file ends with `✓ Verification` — run it at the end of that file's work, literally checking boxes in WORKLOG.
- Phase gates (`00`) aggregate those blocks.
- `51-preflight-checklist.md` is the terminal, full-system ✓ list — nothing ships with an unchecked box.
- The final message to the user always includes the ✓ list with evidence (SHIP-REPORT). The user asked for exactly this: אימות ביקורתי אחרי כל פעולה, ובסוף רשימת וי — זה החוזה.

## Honesty clauses

- A checklist filled retroactively without evidence is worse than no checklist — it hides risk. If evidence is missing, the box stays open and the work continues.
- Failures are reported as failures ("X is broken, here is the output"), never dressed as successes.
- Skipped steps are reported as skipped, with the reason.

---

## ✓ Verification (meta — run when adopting this protocol on a project)

- [ ] `_process/WORKLOG.md` created; first entry written.
- [ ] I can name the evidence standard for the claim I'm about to make next.
- [ ] No banned phrase ("should work", "looks fine") appears in my last three log entries.
