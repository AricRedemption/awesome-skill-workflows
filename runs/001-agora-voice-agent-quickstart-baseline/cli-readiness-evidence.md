# CLI Readiness Evidence

## Purpose

Prove that the local CLI/tooling path required by the official quickstart is
ready before runtime execution begins.

## Required Fields

- checked_at: `TBD`
- official_install_doc_ref: `TBD`
- dependency_install_command_prepared: `TBD`
- dependency_install_command_run: `true | false | TBD`
- build_command_prepared: `TBD`
- build_or_dev_command_prepared: `TBD`
- command_output_redaction_confirmed: `true | false | TBD`
- readiness_verdict: `ready | not_ready | TBD`

## Command Readiness Table

| command role | command | prepared | executed | sanitized output reference | required | promotion blocking if missing |
| --- | --- | --- | --- | --- | --- | --- |
| install | `TBD` | `TBD` | `TBD` | `TBD` | yes | yes |
| build | `TBD` | `TBD` | `TBD` | `TBD` | yes | yes |
| start | `TBD` | `TBD` | `TBD` | `TBD` | yes | yes |
| cleanup | `TBD` | `TBD` | `TBD` | `TBD` | no | no |

## Evidence Rules

- record command shape, not secrets embedded in env vars
- if a command requires `.env`, record only that env injection was required
- if installation was skipped in template mode, mark `executed=false` and
  `readiness_verdict=TBD`

## Promotion Blockers

Cannot promote if any of these are missing:

- official install/source reference
- prepared install/build/start command set
- command redaction confirmation
- final readiness verdict
