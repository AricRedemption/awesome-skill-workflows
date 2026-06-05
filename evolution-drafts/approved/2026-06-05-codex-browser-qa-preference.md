- Proposal-ID: 2026-06-05-codex-browser-qa-preference
- Status: approved
- Signature: codex-browser-qa-preference
- Target-File: AGENTS.md
- Trigger-Type: user-correction
- Confidence: high

## Why This Matters

Frontend and browser QA tasks in this repository can drift into ad-hoc local
Chrome command usage when the intent is really to use Codex-provided browser
capabilities. That creates inconsistent behavior, weaker repeatability, and a
gap between the user's stated workflow preference and the agent's execution.

## Evidence

- User correction on 2026-06-05: "注意 chrome 要走 codex 的 chrome方案 写到 AGENTS.md 规则里面去"
- Current task context: local frontend QA for `skill-wiki-web/` required browser
  verification after a product-style homepage rewrite.
- Failure signal: an ad-hoc command-line Chrome path was attempted before the
  user clarified the preferred durable rule.

## Duplicate Check

- Checked `AGENTS.md`: no existing rule explicitly said browser or Chrome QA
  must prefer Codex-provided browser capabilities before this proposal.
- Checked `TOOLS.md`: no equivalent durable tool note found.
- Checked `evolution-drafts/`: no matching pending, approved, or rejected draft
  with this signature existed before this proposal.
- Checked `docs/skill-wiki-web.md`: no project-level execution rule existed
  before this proposal.

## Proposed Change

Add a durable execution rule to `AGENTS.md` under the execution/tooling area:

> When browser or Chrome-based QA is needed, prefer Codex-provided Browser or
> Chrome capabilities first. Do not default to ad-hoc command-line Chrome
> flows unless Codex browser capabilities are unavailable and the fallback is
> explicitly justified by the task.

## Apply Plan

1. Add the approved rule to `AGENTS.md` in the execution/tooling rules area.
2. Move this draft from `evolution-drafts/pending/` to
   `evolution-drafts/approved/`.
3. Run `node scripts/validate-evolution-drafts.mjs`.
4. Run `node scripts/validate-promotion-gates.mjs` because `AGENTS.md` is a
   promotion-sensitive rule surface.
5. Include both validation results in the completion report.

## Validation Plan

- Validate draft structure with `node scripts/validate-evolution-drafts.mjs`.
- Validate promotion-sensitive rule changes with
  `node scripts/validate-promotion-gates.mjs`.
- Inspect the resulting `AGENTS.md` diff to confirm the rule appears once and
  in the correct section.
