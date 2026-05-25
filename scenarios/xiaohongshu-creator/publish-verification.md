# Publish Verification Contract

## Scope

This scenario supports two MVP publish modes:

- `human_review_then_draft`
- `human_review_then_publish`

Both modes require a positive human review gate before any real draft save or live publish action.

The proof must establish ordering, not only final state. A published note ID or screenshot is insufficient unless the run also proves that human review, risk approval, mode approval, and account-state check happened before the draft/save or publish command started.

## Required Schema

Each run must produce a publish proof that separates the platform fact from the compliance verdict:

```json
{
  "platform": "xiaohongshu",
  "publish_mode": "human_review_then_publish",
  "status": "failed",
  "publish_fact_status": "published",
  "compliance_status": "failed",
  "post_id": "6a139f0d0000000037035783",
  "post_url": "https://www.xiaohongshu.com/explore/6a139f0d0000000037035783",
  "published_at": "2026-05-25T09:00:07+08:00",
  "title": "别再囤Skill了",
  "human_review_passed": false,
  "risk_check_passed": false,
  "evidence": {
    "screenshot": "runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-diagnose-publish.png",
    "browser_log": "runs/001-xhs-ai-agent-save-one-hour/xhs-mcp-publish-result.json",
    "manual_note": "Publish fact exists, but compliant proof failed because pre-publish gate ordering is incomplete."
  }
}
```

The canonical machine schema is `schemas/publish-verification.schema.json`.

`status` is the compliance proof status. `publish_fact_status` is the observed platform result. A run may therefore have `publish_fact_status: published` and `status: failed` when a post exists but the pre-publish gate evidence is incomplete.

## Human Review Gate

The human review record must include:

- reviewer decision: `approved`, `rejected`, or `needs_revision`
- comments
- risk approval
- final publish mode
- timestamp
- reviewed content version
- reviewer checklist

If the decision is `rejected` or `needs_revision`, the workflow must return to content revision or workflow improvement before any draft or publish action.

The final approval timestamp must be earlier than the publish or draft-save command start time. A review that cites publish output, post URL, note ID, or post-publish screenshot as accepted evidence cannot be used as pre-publish gate evidence.

## Mode Change Approval

If a run starts as `human_review_then_draft`, it cannot be upgraded to `human_review_then_publish` without an explicit human approval record created before the publish command starts.

The approval record must include:

- original publish mode
- requested publish mode
- reviewer decision
- timestamp
- reviewed content version
- risk approval

## Draft-Saved Requirements

When `status` is `draft_saved`:

- `post_id` and `post_url` may be `N/A`.
- `human_review_passed` must be `true`.
- screenshot evidence or a manual proof note is required.
- copyable publish content must be preserved.
- no live publish proof may be claimed.

## Published Requirements

When `publish_fact_status` is `published`:

- a URL or note ID is required.
- `published_at` is required.
- screenshot evidence or publish log evidence is required.

When `status` is `published` or `compliance_status` is `passed`:

- `human_review_passed` must be `true`.
- `risk_check_passed` must be `true`.
- final human approval must be timestamped before the publish command starts.
- account-state check pass must be timestamped before the publish command starts.
- any draft-to-publish mode change must be approved before the publish command starts.

If the post was published but any of these ordering requirements are missing, set `publish_fact_status` to `published`, set `status` to `failed`, set `compliance_status` to `failed`, and do not promote the run to a verified recipe.

## Failure Fallback

When publish fails after approval:

- set `status` to `failed` for the failed publish attempt.
- preserve the failure evidence.
- fallback to draft-only output.
- keep the reviewed copyable content in the run directory.
- do not retry into live publish without a fresh human review decision if content, account state, or risk state changes.

## Prohibited Actions

The workflow must not perform:

- automatic likes
- automatic comments
- automatic follows
- account-warming behavior
- any account-state-changing action that bypasses human review
