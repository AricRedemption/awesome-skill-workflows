# Quickstart Source Gate

## Purpose

Verify that the run used the official Agora Voice Agent Demo quickstart source,
not an unreviewed fork or undocumented command path.

## Required Fields

- checked_at: `TBD`
- source_type: `official_repo | official_docs | official_sample | other`
- source_url: `TBD`
- source_version_ref: `TBD`
- clone_command_planned: `TBD`
- repo_or_archive_identity_verified: `true | false | TBD`
- local_modifications_before_run: `none | present | TBD`
- source_gate_verdict: `passed | failed | TBD`

## Verification Checklist

| check | result | evidence | required | promotion blocking if missing |
| --- | --- | --- | --- | --- |
| official source URL recorded | `TBD` | link or repo slug | yes | yes |
| version/commit/tag recorded | `TBD` | tag, branch, or commit summary | yes | yes |
| clone command defined | `TBD` | sanitized command | yes | yes |
| local modifications assessed | `TBD` | git status summary or N/A | yes | yes |
| source identity verified | `TBD` | repo name/path summary | yes | yes |

## Promotion Blockers

Cannot promote if any of these are missing:

- official source URL
- source version reference
- source identity verification
- source gate verdict
