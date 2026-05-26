# Evolution Proposal: Self-Evolution Record Format

- Proposal-ID: evo-2026-05-26-agents-self-evolution-record-format
- Status: approved
- Signature: agents-self-evolution-record-format
- Created-At: 2026-05-26
- Last-Seen-At: 2026-05-26
- Target-File: AGENTS.md
- Trigger-Type: correction
- Confidence: high

## Why This Matters

The user clarified that self-evolution must explicitly record what was done
wrong, what was learned, and what was adjusted. Without this format, future
workflow evolution can become scattered across run records, KB files, and
recipes without a readable learning loop.

## Evidence

- User correction: "自进化就是做错了什么，学到了什么，做了什么调整"
- Source review: `evolution/xhs-ai-agent-save-one-hour-detailed-evolution-review.md`
- Supporting run evidence: `runs/001-xhs-ai-agent-save-one-hour/step-7-self-evolution-result.json`

## Duplicate Check

- Checked: `AGENTS.md`, `docs/self-evolution.md`, `evolution-drafts/pending/`
- Result: Existing docs require evidence-driven evolution, but do not require the explicit three-part review format.
- Decision: create

## Proposed Change

Add this rule under `AGENTS.md` > `Self-Evolution Rules`:

```md
When writing self-evolution records, include a concise learning loop:

- what went wrong,
- what was learned,
- what changed,
- which evidence supports the change,
- which validator or proof confirms the new state,
- what remains unverified.

Do not treat scattered evidence links as a complete self-evolution record.
```

## Apply Plan

1. Insert the proposed rule under `AGENTS.md` > `Self-Evolution Rules`.
2. Keep the wording scenario-agnostic.
3. Moved this draft from `pending/` to `approved/` after user approval.

## Validation Plan

1. Run `node scripts/validate-sensitive-boundaries.mjs`.
2. Run `node scripts/validate-promotion-gates.mjs`.
3. Run `node scripts/validate-mvp-acceptance.mjs`.

## User Approval

- Approved by user request to optimize by priority.
