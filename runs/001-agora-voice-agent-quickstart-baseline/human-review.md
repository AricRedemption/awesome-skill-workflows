# Human Review

## Purpose

Record whether a human reviewer agrees that the sanitized evidence package is
accurate, safe, and sufficient for reuse.

## Required Fields

- reviewed_at: `TBD`
- reviewer_role: `TBD`
- review_scope: `evidence_package_only | live_run_and_evidence`
- reviewer_decision: `approved | needs_revision | rejected | TBD`
- runtime_claims_verified: `true | false | TBD`
- sensitive_data_review_passed: `true | false | TBD`
- reusable_as_pattern_candidate: `true | false | TBD`
- promotion_recommendation: `yes | no | TBD`

## Review Checklist

- [ ] `run-summary.md` is internally consistent
- [ ] `environment-check.md` is complete
- [ ] `cli-readiness-evidence.md` matches the official quickstart path
- [ ] `quickstart-source-gate.md` proves official source usage
- [ ] `runtime-proof.md` records all five required runtime facts
- [ ] `clicked_publish=false` is explicit
- [ ] no App Certificate is recorded
- [ ] no Customer Secret is recorded
- [ ] no `.env` content is recorded
- [ ] no cookie/session/browser profile data is committed
- [ ] failure handling is recorded
- [ ] scoring result is reasonable

## Reviewer Comments

- comment_1: `TBD`
- comment_2: `TBD`

## Required Revision Before Promotion

- revision_1: `TBD`
- revision_2: `TBD`

## Promotion Blockers

Cannot promote if any of these are missing:

- `reviewed_at`
- `reviewer_decision`
- `runtime_claims_verified`
- `sensitive_data_review_passed`
- `promotion_recommendation`
