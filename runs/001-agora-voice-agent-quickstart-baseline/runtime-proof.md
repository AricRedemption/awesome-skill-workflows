# Runtime Proof

## Purpose

Capture the minimal sanitized proof chain for a real Agora Voice Agent Demo
quickstart execution.

## Required Fields

- proof_recorded_at: `TBD`
- runtime_mode: `template_only | local_live_run`
- quickstart_repo_cloned: `true | false | TBD`
- official_start_command_run: `true | false | TBD`
- agent_join_verified: `true | false | TBD`
- rtc_client_connected: `true | false | TBD`
- voice_roundtrip_verified: `true | false | TBD`
- clicked_publish: `false`
- high_risk_external_action: `not_applicable`
- runtime_verdict: `passed | failed | blocked | TBD`

## Runtime Proof Table

| field | required | value | minimum acceptable sanitized evidence | promotion blocking if missing |
| --- | --- | --- | --- | --- |
| quickstart_repo_cloned | yes | `TBD` | repo path plus clone/source summary | yes |
| official_start_command_run | yes | `TBD` | command summary plus timestamp | yes |
| agent_join_verified | yes | `TBD` | log line summary or UI state summary | yes |
| rtc_client_connected | yes | `TBD` | connection state summary or sanitized event log | yes |
| voice_roundtrip_verified | yes | `TBD` | redacted operator note plus event/log summary | yes |
| clicked_publish | yes | `false` | explicit false statement | yes |
| high_risk_external_action | yes | `not_applicable` | explicit N/A statement | yes |

## Suggested Evidence Slots

- runtime stdout/stderr summary: `evidence/runtime-log-redacted.md`
- UI or terminal event summary: `evidence/connection-proof-redacted.md`
- operator verification note: `artifacts/voice-roundtrip-checklist.md`

## Failure Notes

- start_command_failure: `TBD`
- join_failure: `TBD`
- rtc_failure: `TBD`
- roundtrip_failure: `TBD`

## Promotion Blockers

Cannot promote if any of these are missing or false:

- `quickstart_repo_cloned=true`
- `official_start_command_run=true`
- `agent_join_verified=true`
- `rtc_client_connected=true`
- `voice_roundtrip_verified=true`
- `clicked_publish=false`
- `high_risk_external_action=not_applicable`
