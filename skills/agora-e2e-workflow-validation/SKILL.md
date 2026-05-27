---
name: agora-e2e-workflow-validation
description: >
  Use this skill when validating AgoraIO/skills through a complete end-to-end
  business workflow. The goal is not only to build an Agora demo, but to
  produce reusable workflow knowledge, run evidence, failure cases, and
  promotion-ready workflow assets for awesome-skill-workflows.
---

# Agora E2E Workflow Validation Skill

## Purpose

This skill validates whether an agent can use `AgoraIO/skills` to complete a
full business scenario and convert the result into reusable workflow assets.

The output is not just working code. The output must include:

1. scenario definition
2. selected Agora skill routes
3. workflow plan
4. implementation or simulation steps
5. runtime proof checklist
6. sensitive boundary review
7. run evidence
8. failure cases
9. reusable workflow skill draft
10. promotion decision

## Source of Truth

For Agora integration details, use:

- `https://github.com/AgoraIO/skills`
- especially `skills/agora/SKILL.md`

Do not invent Agora API usage, CLI commands, token flows, RTM behavior, or
ConvoAI request payloads from memory.

## Required Flow

For every scenario:

1. Understand the business outcome.
2. Select the primary Agora route:
   - ConvoAI
   - RTC
   - RTM
   - CLI
   - Server/Auth
   - Cloud Recording
   - Cross-product coordination
3. Load only the relevant Agora references.
4. Design the end-to-end workflow.
5. Identify runtime proof.
6. Identify sensitive data and human approval gates.
7. Implement or simulate the workflow.
8. Record run evidence.
9. Capture reusable patterns.
10. Capture failures.
11. Decide whether the workflow can be promoted.
12. Draft or update a reusable workflow skill.

## Non-Negotiable Rules

- Do not commit `.env`.
- Do not expose App Certificate, Customer Secret, LLM API keys, tokens,
  cookies, or browser sessions.
- Do not claim live success without runtime proof.
- Do not promote failed runs into verified recipes.
- For ConvoAI, use the official quickstart as source of truth before custom
  implementation.
- For CLI, perform readiness checks before mutating commands.
- For RTM, use v2 only.
- For Cloud Recording, server-side REST only.
- For production token flows, token generation must happen server-side.

## Required Evidence

Every run must produce:

- `scenario.md`
- `workflow.md`
- `route-selection.md`
- `implementation-plan.md`
- `runtime-proof.md`
- `sensitive-boundary-review.md`
- `failure-log.md`
- `reusable-patterns.md`
- `promotion-decision.md`
- `workflow-skill-draft.md`

## Promotion Rule

A workflow can only be promoted if:

1. the scenario scope is clear
2. the selected Agora route is correct
3. all required runtime proof is present
4. sensitive boundary review passes
5. failure cases are recorded
6. human review passes when needed
7. the reusable workflow is generalizable
