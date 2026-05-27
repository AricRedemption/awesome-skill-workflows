# Environment Check

## Purpose

Capture the machine and dependency preconditions required to run the official
Agora Voice Agent Demo quickstart, using sanitized evidence only.

## Required Fields

- checked_at: `TBD`
- checked_by: `TBD`
- os_family: `TBD`
- shell: `TBD`
- node_available: `true | false | TBD`
- package_manager_available: `true | false | TBD`
- git_available: `true | false | TBD`
- ffmpeg_or_audio_dependency_status: `present | missing | not_required | TBD`
- microphone_access_status: `granted | denied | not_checked | TBD`
- speaker_output_status: `available | unavailable | not_checked | TBD`
- env_file_present_without_contents_logged: `true | false | TBD`
- local_ports_checked: `true | false | TBD`
- blockers_found: `none | present | TBD`

## Evidence Template

| check | result | sanitized evidence | required | promotion blocking if missing |
| --- | --- | --- | --- | --- |
| OS and shell detected | `TBD` | command output summary only | yes | yes |
| Git available | `TBD` | version string or exit code summary | yes | yes |
| Node/runtime available | `TBD` | version string or exit code summary | yes | yes |
| Package manager available | `TBD` | version string or exit code summary | yes | yes |
| Audio dependency readiness | `TBD` | package name only, no local secrets | yes | yes |
| Microphone permission checked | `TBD` | redacted yes/no result | yes | yes |
| Speaker path checked | `TBD` | redacted yes/no result | yes | yes |
| `.env` presence checked without dumping content | `TBD` | file existence only | yes | yes |

## Blockers

- blocker_1: `TBD`
- blocker_2: `TBD`

## Promotion Blockers

Cannot promote if any of these fields are missing:

- `checked_at`
- `node_available`
- `package_manager_available`
- `git_available`
- `microphone_access_status`
- `env_file_present_without_contents_logged`
- `blockers_found`
