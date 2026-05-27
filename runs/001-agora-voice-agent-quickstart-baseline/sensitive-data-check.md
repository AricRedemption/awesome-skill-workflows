# Sensitive Data Check

## Purpose

Prove that the evidence package is sanitized and does not leak secrets, account
state, or machine-local private runtime data.

## Required Fields

- checked_at: `TBD`
- checked_by: `TBD`
- sensitive_data_status: `sanitized | failed | TBD`
- app_certificate_recorded: `false`
- customer_secret_recorded: `false`
- env_contents_recorded: `false`
- cookie_or_session_recorded: `false`
- browser_profile_recorded: `false`
- authenticated_screenshot_committed: `false`
- validator_run: `true | false | TBD`
- validator_command: `node scripts/validate-sensitive-boundaries.mjs`
- validator_result: `passed | failed | not_run | TBD`

## Redaction Checklist

| item | allowed in run record | status | required | promotion blocking if missing |
| --- | --- | --- | --- | --- |
| App Certificate | no | `false` | yes | yes |
| Customer Secret | no | `false` | yes | yes |
| `.env` content | no | `false` | yes | yes |
| cookie/session values | no | `false` | yes | yes |
| browser profile path or archive | no | `false` | yes | yes |
| authenticated screenshots | only if redacted and approved | `TBD` | yes | yes |

## Sanitized Evidence References

- allowed_ref_1: `TBD`
- allowed_ref_2: `TBD`

## Promotion Blockers

Cannot promote if any of these are missing or not false:

- `app_certificate_recorded=false`
- `customer_secret_recorded=false`
- `env_contents_recorded=false`
- `cookie_or_session_recorded=false`
- `browser_profile_recorded=false`
- `sensitive_data_status=sanitized`
