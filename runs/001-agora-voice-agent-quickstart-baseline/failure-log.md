# Failure Log

## Purpose

Record failures, blockers, retries, and unresolved gaps in a machine-reviewable
way. This file is required even for passing runs so that future reuse can
distinguish "no failure observed" from "no failure record captured".

## Required Fields

- last_updated_at: `TBD`
- overall_failure_state: `no_failure_observed | failed | blocked | TBD`
- retry_count: `0`
- unresolved_issues_count: `0`
- failure_reviewed_for_reuse: `true | false | TBD`

## Entries

### Entry Template

- failure_id: `TBD`
- stage: `environment | install | build | start | join | rtc | audio | review`
- timestamp: `TBD`
- symptom: `TBD`
- suspected_root_cause: `TBD`
- evidence_ref: `TBD`
- remediation_attempted: `TBD`
- remediation_result: `passed | failed | not_attempted | TBD`
- reusable_failure_candidate: `yes | no | TBD`

## No-Failure Template

If the run passes cleanly, keep this explicit record:

- failure_id: `none`
- stage: `all`
- timestamp: `TBD`
- symptom: `no_failure_observed`
- suspected_root_cause: `not_applicable`
- evidence_ref: `runtime-proof.md`
- remediation_attempted: `not_applicable`
- remediation_result: `not_applicable`
- reusable_failure_candidate: `no`

## Promotion Blockers

Cannot promote if any of these are missing:

- `overall_failure_state`
- at least one explicit entry, including `none` for clean runs
- `failure_reviewed_for_reuse`
