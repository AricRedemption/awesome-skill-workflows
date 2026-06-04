# Multi-Agent Workflows

## Purpose

This document defines the Layer 1 contract for a **single-problem multi-agent
skill workflow**.

The contract is intentionally generic:

- one workflow solves one bounded problem;
- multiple agent roles collaborate inside that workflow;
- review and verification are explicit workflow nodes;
- durable writeback is allowed only after a passed terminal state.

This is compatible with Pi as an execution substrate, but Pi does not own the
architecture. Pi is a backend option for running the roles and orchestration
nodes defined here.

The current PaaS-ready service shell exposes this contract over HTTP without
moving ownership of node semantics, evidence rules, or promotion gates out of
the repository. See `docs/paas-ready-workflow-service.md`.

## Default Topology

The default workflow topology is:

1. `planner`
2. `worker`
3. `reviewer`
4. `verifier`

Optional role:

- `oracle`: advisory second opinion only when the workflow flags uncertainty

The default reusable workflow asset is:

- `workflows/multi-agent/pi-single-problem-review-gated.workflow.json`

## Node Types

The orchestration contract supports these node types:

- `spawn`: run one specialized role
- `sequence`: ordered sub-steps
- `fork`: bounded parallel branches
- `join`: merge branch outputs into one handoff
- `loop`: bounded rework cycle

The first implementation focuses on `spawn`, `sequence`, and bounded `loop`
because they are enough to express the minimal planner-worker-reviewer-verifier
path.

## Hard-Gate Rule

Multi-agent workflows in this repository must treat review and verification as
hard gates:

- `review_gate.mode` must be `hard`
- a `reviewer` role is required
- a `verifier` role is required
- `writeback.allowed_terminal_states` must contain only `passed`

If review or verification fails, the run may remain useful evidence, but it
must not write reusable knowledge into promoted namespaces.

## Validation

Validate Layer 1 multi-agent workflow assets with:

```bash
node scripts/validate-multi-agent-workflows.mjs
```

This validator rejects:

- missing required roles
- non-hard review gates
- unbounded loop nodes
- writeback on non-passed terminal states

## Self-Evolution Boundary

The first version only allows self-evolution to optimize:

- role instructions
- role-scoped skill instructions
- handoff clarity
- skill selection heuristics

It does not allow automatic mutation of:

- workflow node topology
- role ordering
- gate placement
- writeback authority
