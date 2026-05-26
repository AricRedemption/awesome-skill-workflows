# Sensitive Data Policy

This repository keeps reusable workflow knowledge in git, but many workflow runs
touch account-bound or user-private state. Treat privacy and credential safety as
a promotion gate, not as a cleanup task after the fact.

## Data Classes

### Secret State

Examples:

- cookies,
- session tokens,
- authorization headers,
- passwords,
- private keys,
- platform API secrets.

Secret state must stay outside git. Use `user-sensitive-state/` or another
ignored local path. Never reference the secret value in a run record, knowledge
base entry, recipe, report, or evolution note.

### Private Runtime State

Examples:

- browser profiles,
- authenticated screenshots,
- account pages,
- draft boxes that expose private account context,
- raw browser logs,
- local handoff scripts that read credentials.

Private runtime state is machine-local unless it has been reviewed and sanitized.
Screenshots from authenticated pages are private by default.

### Sanitized Evidence

Examples:

- `clicked_publish=false`,
- `human_review=passed`,
- `risk_approval=passed`,
- `account_state=passed`,
- non-sensitive profile class such as `automation_profile`,
- evidence file references,
- timestamps,
- redacted UI-state notes.

Sanitized evidence may be stored in `runs/`, `reports/`, `workflow-kb/`,
`evolution/`, or recipes when it contains no secrets, account identifiers, local
profile paths, or personal data.

### Reusable Knowledge

Examples:

- prevention rules,
- verified workflow shape,
- failure root cause,
- fallback matrix,
- promotion criteria,
- reusable prompt pattern.

Reusable knowledge belongs in `workflow-kb/`, `evolution/`, and promoted recipe
paths only after the supporting evidence has been sanitized.

## Storage Rules

- Put secret and private runtime state in `user-sensitive-state/` or ignored run
  scratch paths.
- Put sanitized run evidence in `runs/<run-id>/`.
- Put reusable conclusions in `workflow-kb/`.
- Put improvement notes in `evolution/`.
- Put promoted recipes in `verified-recipes/` only after human review,
  verification, and sensitive-data review pass.
- Do not put reusable prompts in root `prompts/`; use
  `workflow-kb/reusable-prompts/`.

## Allowed References

Use generic classes instead of sensitive details:

- `automation_profile`, not a local browser profile path.
- `user_visible_profile`, not a Chrome profile directory.
- `mcp_cookie_file`, not a cookie file path or cookie contents.
- `account_state=passed`, not an account display name or phone number.
- `screenshot_redacted=true`, not an unreviewed authenticated screenshot.

## Promotion Gate

Before a workflow, recipe, KB entry, report, or evolution event is promoted, the
promoter must verify:

1. no secret files are tracked,
2. no cookie/session/token values are present,
3. no personal identifiers are required for reuse,
4. no local profile path is used as reusable evidence,
5. screenshots or browser logs are either excluded, redacted, or explicitly
   classified as sanitized evidence,
6. the reusable asset records `sensitive_data_status`.

Run:

```bash
node scripts/validate-sensitive-boundaries.mjs
```

The validator is intentionally conservative for promoted assets. Historical run
records can contain legacy operational details, but new reusable knowledge should
not copy those details forward.
