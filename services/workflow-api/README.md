# Workflow API

This service is the minimal PaaS-ready shell for the repository's multi-agent
workflow contracts.

It does not own workflow semantics. It exposes repo-owned validators and
readiness checks over HTTP so a deployment target can trigger runs and retrieve
evidence-backed status.

## Current endpoint set

- `GET /health`
- `GET /v1/workflows`
- `POST /v1/workflows/xhs-pi-paas-readiness/execute`

## Current behavior

The first shipped endpoint wraps the Xiaohongshu real-run evidence and the
Pi-backed orchestration review into a **human-reviewed PaaS readiness**
verdict.

It keeps two layers separate:

- technical validation: still `partial` because the fresh visible-session
  recheck was blocked by login reset
- PaaS readiness: `accepted_for_paas` because the real draft-save proof is
  positive, `clicked_publish=false`, and the remaining blocker is isolated

## Run

```bash
node services/workflow-api/server.mjs
```

or from the repository root:

```bash
npm run paas:workflow-api
```
