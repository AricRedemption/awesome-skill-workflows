# Action Verification

## Purpose

This project needs a generic way to describe high-risk action outcomes without
collapsing:

- requested mode,
- approved mode,
- observed action fact,
- compliance proof,
- and promotion eligibility.

The first concrete scenario is Xiaohongshu draft/publish handoff, but the model
must remain reusable for other account-bound or irreversible workflow actions.

## Generic Verification Levels

Use these generic verification levels for any high-risk action:

- `action_blocked`
  - A required gate failed before the action should start.
- `action_attempted`
  - The action was attempted, but no verified action fact exists yet.
- `action_fact_verified`
  - The action fact is verified, but compliance proof is incomplete or still
    under review.
- `action_compliance_verified`
  - The action fact and the required gate/proof chain are both verified for the
    approved mode.
- `failed_with_evidence`
  - The action produced useful evidence, but it must not be treated as
    compliance-verified success.

## Generic States

Separate these dimensions in every action-verification record:

- `requested_mode`
  - What the run asked to do.
- `approved_mode`
  - What a reviewer actually approved.
- `allowed_action`
  - The exact action that may be executed under the approved mode.
- `fact_status`
  - What was observed on the platform or target system.
- `compliance_status`
  - Whether the ordering and proof chain satisfy the policy.
- `promotion_status`
  - Whether the result is promotable for the current scope.

## Generic Gate Order

These gate names are scenario-agnostic and should remain stable:

1. `human_review`
2. `risk_approval`
3. `state_precheck`
4. `mode_approval`
5. `action_handoff`
6. `action_execution`
7. `proof_verification`
8. `promotion_approval`

Scenarios may add local evidence fields, but they should map to this gate
sequence rather than inventing a new status language.

## Xiaohongshu Mapping

The current Xiaohongshu scenario maps into the generic model like this:

- `save_draft_only` with compliant proof:
  - `verification_level: action_compliance_verified`
- published note with missing pre-publish ordering proof:
  - `verification_level: failed_with_evidence`
- published note plus complete approved-mode ordering proof:
  - `verification_level: action_compliance_verified`

Scenario-specific strings such as `draft_verified`, `publish_fact_verified`, or
`compliant_publish_verified` remain useful for product-facing summaries, but
they should be derived from the generic model rather than acting as the primary
contract.

## Current Records

The first normalized records live here:

- `runs/001-xhs-ai-agent-save-one-hour/action-verification.json`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/action-verification.json`

These records do not replace the original `gate-ledger.json`, `draft-proof.json`,
or `publish-proof.md` files. They provide a Layer 1 action-verification view
over the same evidence.
