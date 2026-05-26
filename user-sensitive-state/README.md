# User Sensitive State

This directory is reserved for local user intermediate state that must not be committed.

Use it for:

- browser profiles,
- platform cookies,
- authenticated screenshots,
- local draft UI dumps,
- temporary handoff scripts that read local credentials,
- account-bound debugging artifacts,
- any platform or user state that should stay machine-local.

Only this README is tracked. All other files in this directory are ignored by git.

Durable, sanitized evidence should still be written to the appropriate project locations, such as `runs/`, `workflow-kb/`, `failed-recipes/`, or `evolution/`.

Before promoting evidence from this directory or from an account-bound run, use
`docs/sensitive-data-policy.md` and run:

```bash
node scripts/validate-sensitive-boundaries.mjs
```
