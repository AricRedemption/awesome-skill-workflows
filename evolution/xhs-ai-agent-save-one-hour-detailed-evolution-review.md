# XHS AI Agent Save One Hour: Detailed Evolution Review

## Status

- Scenario: `xiaohongshu-creator v0.1`
- Topic: `How ordinary users can save one hour per day with AI agents`
- Source failed run: `runs/001-xhs-ai-agent-save-one-hour`
- Verified rerun: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun`
- Current verified status: `draft_verified`
- Live publish status: not verified
- Sensitive runtime artifacts: archived under `user-sensitive-state/archive/runs/`

## Executive Summary

The first run produced usable content, but the workflow confused content quality,
publish fact, and compliant proof. The system evolved by turning those failures
into hard gates: human review, risk approval, account-state check, fixed draft
mode, and proof that `clicked_publish=false`.

The final verified outcome is a compliant Xiaohongshu draft save, not a live
publish.

## What Went Wrong

### 1. Content Quality Was Treated As Too Close To Publish Readiness

The content score passed, but a high score only proved content quality. It did
not prove human approval, risk approval, account readiness, or permission to act
on the platform.

Evidence:

- `runs/001-xhs-ai-agent-save-one-hour/quality-score.json`
- `runs/001-xhs-ai-agent-save-one-hour/gate-ledger.json`

### 2. Account State Was Not A Hard Pre-Handoff Gate

The initial workflow treated login and authorization as a publishing note rather
than a blocking gate before draft or publish action.

Evidence:

- `runs/001-xhs-ai-agent-save-one-hour/step-7-self-evolution-result.json`
- `evolution/001-xhs-ai-agent-save-one-hour-login-gap.md`
- `workflow-kb/failure-cases/xhs-account-state-precheck-missing.md`

### 3. Draft Mode Was Allowed To Drift Toward Publish Evidence

The requested mode was `human_review_then_draft`, but later evidence included a
publish fact. The workflow did not have enough proof that any publish escalation
was approved before the action started.

Evidence:

- `runs/001-xhs-ai-agent-save-one-hour/gate-ledger.json`
- `workflow-kb/failure-cases/xhs-content-failure-cases.md`
- `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md`

### 4. Publish Fact Was Mistaken For Compliant Proof

A platform action can happen without satisfying the project promotion contract.
The historical publish fact was therefore stored as failure evidence, not as a
verified recipe.

Evidence:

- `runs/001-xhs-ai-agent-save-one-hour/publish-proof.md`
- `workflow-kb/failure-cases/xhs-content-failure-cases.md`

### 5. Later Draft Runs Exposed Browser-Profile And Proof-Strength Gaps

Later draft attempts showed that a saved draft can be browser-profile-local, and
that editor-filled state is not enough proof of draft save. A valid proof needs
draft-box evidence, target title, save timestamp, and the relevant profile class.

Evidence:

- `evolution/006-xhs-local-draft-profile-proof-gap.md`
- `workflow-kb/failure-cases/xhs-local-draft-profile-and-proof-gap.md`
- `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md`

## What Was Learned

1. Content quality, human approval, risk approval, account state, platform
   action, proof verification, and recipe promotion are separate states.
2. A successful-looking platform action is not enough for verified promotion.
3. Handoff mode must be immutable unless a human approval record changes it
   before the action starts.
4. Account-state check must pass before any account-bound platform action.
5. Draft proof must prove saved draft state, not only filled editor state.
6. Browser profile class is part of the proof contract for Xiaohongshu drafts.
7. Sensitive runtime artifacts should stay in local ignored storage; reusable
   assets should cite sanitized proof only.

## What Changed

### Run And Gate Evidence

- Added/kept gate ledger evidence for the failed first run:
  `runs/001-xhs-ai-agent-save-one-hour/gate-ledger.json`.
- Added successful draft rerun proof:
  `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`.
- Added successful draft rerun gate ledger:
  `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json`.
- Added sensitive artifact migration notes:
  - `runs/001-xhs-ai-agent-save-one-hour/sensitive-artifacts.md`
  - `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/sensitive-artifacts.md`

### Knowledge Base

- Added account-state failure case:
  `workflow-kb/failure-cases/xhs-account-state-precheck-missing.md`.
- Added content and proof failure cases:
  `workflow-kb/failure-cases/xhs-content-failure-cases.md`.
- Added browser-profile and proof-strength failure case:
  `workflow-kb/failure-cases/xhs-local-draft-profile-and-proof-gap.md`.
- Added draft execution checklist:
  `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md`.
- Updated retrieval metadata in `workflow-kb/retrieval-index.json`.

### Verified Assets

- Promoted only the compliant draft path:
  `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md`.
- Kept live publish out of verified scope:
  `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md`.
- Preserved failed publish evidence under:
  `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md`.

### Safety And Promotion Controls

- Added sensitive data policy:
  `docs/sensitive-data-policy.md`.
- Added sensitive evidence schema:
  `schemas/sanitized-evidence.schema.json`.
- Added sensitive-boundary validator:
  `scripts/validate-sensitive-boundaries.mjs`.
- Wired sensitive-boundary validation into promotion checks:
  `scripts/validate-promotion-gates.mjs`.

## Before And After

| Area | Before | After |
| --- | --- | --- |
| Content quality | High score could look close to readiness | Score is only one gate |
| Account state | Late note | Blocking pre-handoff gate |
| Handoff mode | Could drift from draft toward publish evidence | Mode must be explicitly approved before action |
| Publish fact | Risked being read as success | Stored as failed evidence unless compliant proof exists |
| Draft proof | Editor/page state could look sufficient | Draft box, title, timestamp, `clicked_publish=false` required |
| Browser profile | Not modeled | Profile class must be recorded without sensitive path |
| Sensitive artifacts | Mixed into run evidence | Archived under ignored local state |

## Final Verified Path

The verified rerun succeeded because these gates passed in order:

1. human review passed,
2. risk approval passed,
3. account-state check passed,
4. draft action started,
5. draft action finished,
6. proof showed `saved_draft=true`,
7. proof showed `clicked_publish=false`.

Evidence:

- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.md`

## Remaining Limits

- Live publish is not verified.
- Headless draft save remains experimental unless persistence after restart is
  proven.
- Future runs must still retrieve the draft execution checklist before platform
  handoff.

## Follow-Up Actions

| Action | Target | Status |
| --- | --- | --- |
| Keep live publish outside verified scope | `verified-recipes/` and KB | done |
| Require account-state precheck | workflow and KB failure case | done |
| Separate content score from publish readiness | failure case and gate ledger | done |
| Archive private runtime artifacts | `user-sensitive-state/archive/runs/` | done |
| Add sensitive-boundary validator | `scripts/validate-sensitive-boundaries.mjs` | done |
| Record this detailed evolution review | `evolution/` | done |
