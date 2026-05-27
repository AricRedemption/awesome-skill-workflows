# Agora Voice Agent Demo Risk Gates

## Purpose

This file defines the scenario-specific risk gates for validating an Agora
browser AI voice agent demo. These gates constrain execution inside the scenario
wrapper only. They do not define Layer 1 behavior.

## Gate Summary

| gate | trigger | required action | fail state |
| --- | --- | --- | --- |
| quickstart source gate | workflow claims to follow Agora quickstart | record the exact official or explicitly approved source before execution | run cannot claim official-path validation |
| CLI mutating commands | command creates, installs, deletes, rewrites, deploys, or changes runtime state | human approval or explicit scenario authorization before execution | pause or downgrade to design/simulated mode |
| account login gate | workflow needs Agora console or account login | confirm login is user-approved and no credentials are stored in git | stop before login or stay in simulation |
| project creation gate | workflow creates an Agora project, app ID, or related cloud resource | require human approval and record who created it and when | no project-creation claim allowed |
| secret handling gate | workflow needs app ID, token, API key, or `.env` values | keep secrets local-only, redact evidence, and verify nothing sensitive is committed | run fails sensitive-data review |
| external provider credentials gate | workflow needs third-party LLM, STT, TTS, or API credentials | explicit approval, local-only storage, and source attribution in evidence | block live run |
| runtime proof gate | workflow claims live success | capture runtime proof tied to the executed demo | downgrade to unverified |
| promotion gate | workflow attempts promotion to reusable assets | ensure failed or unverified runs stay out of verified namespaces | promotion rejected |

## Detailed Gates

### 1. Quickstart Source Gate

- The agent must identify the exact quickstart source before claiming alignment
  with official Agora guidance.
- Allowed sources are the official Agora quickstart or another source explicitly
  approved in the run record.
- If the source is missing, indirect, or inferred from memory, the run may
  continue only as exploration and cannot claim official quickstart validation.

### 2. CLI Mutating Commands Gate

Mutating commands include, but are not limited to:

- package installation,
- scaffold generation,
- file rewrites outside review-only mode,
- local server startup that changes project state,
- deployment commands,
- cleanup or delete commands,
- commands that create or modify cloud resources.

Requirements:

- classify the command before execution,
- prefer the smallest command needed for the current step,
- obtain human approval when the command changes external state or uses paid or
  account-bound resources,
- record the executed command class in run evidence.

### 3. Agora Account Login Gate

- Do not autonomously log into Agora accounts without user approval.
- Do not capture passwords, MFA codes, session cookies, or raw auth headers in
  repository evidence.
- Login state may be recorded only as sanitized evidence such as
  `agora_account_state=passed`.
- If login is required but approval is absent, the run must stay in
  `simulated_run` or `design_only`.

### 4. Project Creation Gate

- Creating a new Agora project, application, token service, or billable
  resource requires human approval before the action starts.
- Record whether the project was pre-existing or newly created.
- If the workflow depends on project creation but approval is absent, the run
  cannot claim end-to-end live validation.

### 5. Secret Handling Gate

- `.env`, `.env.local`, secret JSON, token dumps, and credential screenshots are
  never valid committed evidence.
- Secret values must remain in ignored local paths or injected runtime state.
- Evidence may reference secret classes such as `agora_app_id_present=true`
  without exposing the value.
- If a secret appears in tracked files or unsanitized evidence, the run fails
  immediately and must not be promoted.

### 6. External API Or LLM Provider Credentials Gate

- If the demo depends on third-party model providers, STT/TTS services, or
  external APIs, record the provider class and whether credentials were
  available.
- Do not imply Agora-only success when the critical path actually depended on a
  separate provider unless that dependency is stated clearly.
- Missing provider credentials require either `simulated_run` status or a
  scenario-approved local mock path labeled as non-live.

### 7. Runtime Proof Gate

- Live success requires proof that the browser demo actually reached the
  intended runtime state.
- Proof should show the concrete demo outcome, such as the served app, active
  session state, agent response path, or browser interaction result.
- Terminal logs alone are insufficient when they do not prove the browser demo
  reached usable runtime state.

### 8. Promotion Gate

- Failed, blocked, simulated-only, or proof-missing runs must remain in `runs/`,
  `failed-recipes/`, or `workflow-kb/failure-cases/` as appropriate.
- `verified-recipes/` is allowed only after live verification, gate pass, human
  review where required, and sanitized evidence review.
- A high score cannot override a failed risk gate.

## Gate Outcomes

- `passed`: the gate evidence is present and the step may proceed.
- `revision_required`: the workflow may continue only after a fix or evidence
  update.
- `blocked`: required approval, source, or secret-safe execution path is
  missing.
- `failed`: the workflow violated a scenario rule and cannot be promoted from
  this run state.
