# Run Summary

## Purpose

Baseline run record template for verifying an Agora Voice Agent Demo quickstart
workflow without storing secrets or private runtime state. This file is the
top-level verdict and promotion gate summary for the run.

## Required Fields

- run_id: `001-agora-voice-agent-quickstart-baseline`
- scenario_name: `agora-voice-agent-demo`
- workflow_name: `agora-voice-agent-quickstart-baseline`
- run_mode: `planned_template_only | live_run`
- run_status: `not_started | passed | failed | blocked`
- operator_type: `human | agent | human_and_agent`
- baseline_goal: `verify official quickstart can be prepared and executed with sanitized evidence`
- evidence_package_version: `v1`
- started_at: `TBD`
- finished_at: `TBD`
- final_verdict: `TBD`
- promotion_status: `not_promotable | promotable_after_completion | promoted`
- sensitive_data_status: `pending_review | sanitized | failed`

## Linked Evidence

- environment check: [environment-check.md](./environment-check.md)
- CLI readiness: [cli-readiness-evidence.md](./cli-readiness-evidence.md)
- quickstart source gate: [quickstart-source-gate.md](./quickstart-source-gate.md)
- runtime proof: [runtime-proof.md](./runtime-proof.md)
- failure log: [failure-log.md](./failure-log.md)
- scoring result: [scoring-result.md](./scoring-result.md)
- human review: [human-review.md](./human-review.md)
- reusable patterns candidate: [reusable-patterns-candidate.md](./reusable-patterns-candidate.md)
- sensitive data check: [sensitive-data-check.md](./sensitive-data-check.md)

## Gate Snapshot

| gate | required | status | evidence | promotion blocking if missing |
| --- | --- | --- | --- | --- |
| environment prepared | yes | `TBD` | `environment-check.md` | yes |
| CLI readiness confirmed | yes | `TBD` | `cli-readiness-evidence.md` | yes |
| official quickstart source verified | yes | `TBD` | `quickstart-source-gate.md` | yes |
| runtime proof complete | yes | `TBD` | `runtime-proof.md` | yes |
| sensitive data review passed | yes | `TBD` | `sensitive-data-check.md` | yes |
| human review completed | yes | `TBD` | `human-review.md` | yes |
| scoring recorded | yes | `TBD` | `scoring-result.md` | yes |
| reusable pattern extraction reviewed | no | `TBD` | `reusable-patterns-candidate.md` | no |

## Required Runtime Verdict Fields

- quickstart_repo_cloned: `TBD`
- official_start_command_run: `TBD`
- agent_join_verified: `TBD`
- rtc_client_connected: `TBD`
- voice_roundtrip_verified: `TBD`
- clicked_publish: `false`
- high_risk_external_action: `not_applicable`

## Promotion Blockers

Promotion is blocked if any of the following are true:

- `run_mode` is still `planned_template_only`
- any required field above is `TBD`
- `runtime-proof.md` does not prove all five required runtime facts
- `clicked_publish` is not explicitly `false`
- `sensitive_data_status` is not `sanitized`
- `human-review.md` does not record a reviewer verdict
- `failure-log.md` is missing even when the run passed

## Notes

- This baseline template is allowed to exist before a real run.
- A real run must replace `TBD` values with timestamps, sanitized identifiers,
  and evidence references.
