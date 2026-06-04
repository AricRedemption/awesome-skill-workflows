# PaaS-Ready Workflow Service

## Purpose

This document defines the minimal service boundary for exposing repository-owned
workflow validation and readiness checks as a deployable HTTP surface.

The service is intentionally thin:

- workflow semantics stay in Layer 1 assets and validators
- scenario evidence stays in `runs/`
- the service only triggers execution and returns evidence-backed status

## Current Scope

The first PaaS-ready endpoint is:

- `POST /v1/workflows/xhs-pi-paas-readiness/execute`

It wraps three repo-owned layers:

1. the generic Pi-backed multi-agent workflow contract
2. the Xiaohongshu real-run orchestration validation
3. the human-reviewed PaaS readiness acceptance layer

## Status Model

The service keeps technical and operational acceptance separate.

- `technical_validation.status`
  - the current Xiaohongshu orchestration remains `partial`
- `technical_validation.final_terminal_state`
  - the current Xiaohongshu orchestration remains `blocked`
- `readiness_level`
  - the current Xiaohongshu workflow is `accepted_for_paas`

This separation is required because the real draft-save proof is positive while
the fresh visible-session recheck is still blocked by a login reset.

## Endpoint Contract

### `GET /health`

Returns service liveness only.

### `GET /v1/workflows`

Returns the supported workflow catalog, including endpoint path and result
contract.

### `POST /v1/workflows/xhs-pi-paas-readiness/execute`

Body:

```json
{
  "persist": false
}
```

Response shape:

```json
{
  "workflow_id": "xhs-pi-paas-readiness",
  "persisted": false,
  "result": {
    "status": "passed",
    "readiness_level": "accepted_for_paas",
    "human_review_acceptance": {
      "verdict": "accepted_for_paas"
    },
    "technical_validation": {
      "status": "partial",
      "final_terminal_state": "blocked"
    }
  }
}
```

## Evidence Boundary

The current endpoint relies on these evidence sources:

- `runs/017-xhs-pi-live-draft-validation-unique-title/headless-live-session-proof.json`
- `runs/018-xhs-pi-multi-agent-live-validation/result.json`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/`
- `runs/001-xhs-ai-agent-save-one-hour/action-verification.json`

The service must not overwrite or reinterpret those technical records. It may
add new acceptance or execution records, but it cannot relabel a technical
`partial` verdict as a technical `passed` verdict.
