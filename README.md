<div align="center">

<h1>awesome-skill-workflows</h1>

<h3>Validate Agent Workflows Before Promoting Skills</h3>

<p>
  Evidence-first workflows for turning successful AI agent runs into reusable, measurable, and improvable skill assets.
</p>

<p>
  <img alt="Status: MVP validated" src="https://img.shields.io/badge/status-MVP_validated-22c55e">
  <img alt="Scope: agent workflows" src="https://img.shields.io/badge/scope-agent_workflows-3b82f6">
  <img alt="Evidence: required" src="https://img.shields.io/badge/evidence-required-f97316">
  <img alt="Promotion: gated" src="https://img.shields.io/badge/promotion-gated-8b5cf6">
  <a href="./LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/license-Apache--2.0-orange"></a>
</p>

<p>
  <a href="./docs/architecture.md"><strong>Architecture</strong></a> &bull;
  <a href="./docs/directory-architecture.md"><strong>Directory Map</strong></a> &bull;
  <a href="./docs/sensitive-data-policy.md"><strong>Sensitive Data</strong></a> &bull;
  <a href="./docs/workflow-knowledge-base.md"><strong>Workflow KB</strong></a> &bull;
  <a href="./docs/skillopt-integration.md"><strong>Skill Optimization</strong></a> &bull;
  <a href="./docs/paas-ready-workflow-service.md"><strong>PaaS Service</strong></a> &bull;
  <a href="./verified-recipes/xhs-ai-agent-save-one-hour.recipe.md"><strong>Verified Recipe</strong></a> &bull;
  <a href="./reports/first-mvp-validation-report.md"><strong>MVP Report</strong></a> &bull;
  <a href="./TOOLS.md"><strong>Tools</strong></a> &bull;
  <a href="./MEMORY.md"><strong>Memory</strong></a> &bull;
  <a href="./AGENTS.md"><strong>Agent Rules</strong></a>
</p>

</div>

---

`awesome-skill-workflows` is **not** a Xiaohongshu tool.

It is a lightweight framework for turning repeated agent work into reusable,
measurable, and improvable skill/workflow assets.

![Skill workflow validation pipeline](runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-media-en/01-skill-workflow-validation-en.png)

## Why This Exists

Agent teams often collect many isolated skills, prompts, scripts, and tool tricks. That is useful, but it is not enough. A skill only becomes valuable when it can be selected, composed, run, reviewed, verified, and reused.

This repository treats workflows as the durable asset:

- skills are capability units,
- workflows are composed execution paths,
- scenarios are validation wrappers,
- run evidence is the proof layer,
- the workflow knowledge base is the reusable memory,
- self-evolution turns failures and review notes into better future assets.

The SkillOpt-style direction extends that loop by treating reusable skill
documents as candidate artifacts that can be optimized from scored rollout
evidence. Edits should be bounded, evidence-backed, and accepted only through
validation gates rather than promoted because they look plausible. See
`docs/skillopt-integration.md`.

## What This Project Is

This repository is a framework for:

1. Skill Aggregation
2. Skill Self-Evolution
3. Workflow Knowledge Base

The long-term goal is to turn repeatable workflows into reusable, measurable, and improvable skill assets.

## Core Idea

![Workflow evidence architecture overview](runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-media-en/02-skill-workflow-architecture-en.png)

The repository now uses a five-layer model:

- **Layer 0: Raw / evidence**
  - concrete runs, proof, score, gates, and failed evidence
- **Layer 1: Core skill architecture**
  - skill discovery and normalization
  - workflow composition
  - schemas, validators, and generic action-verification contracts
- **Layer 2: Skill evolution / optimization**
  - SkillOpt-style bounded edits
  - train / selection / test evidence split
  - accepted and rejected candidate records
- **Layer 3: Durable knowledge surface**
  - skill wiki
  - workflow KB
  - registry and retrieval index
- **Layer 4: Scenario validation**
  - concrete scenario wrappers
  - scenario-specific risk gates
  - human-reviewed action handoff

A scenario can prove the architecture, but it must not define the architecture.

## Workflow Loop

![Run once, evolve once workflow loop](runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-media-en/03-skill-workflow-loop-en.png)

Every useful run should make the next run better:

1. clarify the task and constraints,
2. select the best matching skill assets,
3. compose and run the workflow,
4. score the result,
5. pass human review for high-risk steps,
6. verify whether the output actually met the target,
7. capture failure cases and reusable evidence,
8. update the knowledge base,
9. start the next run with better assets.

## v0.1 Validation Scenario

Version `v0.1` uses **Xiaohongshu AI tool content publishing** as the validation scenario.

This scenario exists only to validate the platform design:

- the core skill architecture can absorb a real workflow
- the workflow can be reviewed by a human before high-risk actions
- success and failure can be captured into the knowledge base
- the system can reuse prior work in a second scenario

The validation scenario is intentionally concrete, but the architecture is meant to transfer to other repeatable agent workflows such as market research, competitor analysis, report generation, data monitoring, and operational review loops.

## MVP Acceptance Loop

The MVP is considered complete only when the following loop works end to end:

1. define a workflow scenario
2. capture raw discovery
3. structure it into skills, workflows, and recipes
4. run or simulate the workflow
5. record results, failures, and reusable patterns
6. feed the outcome back into the workflow knowledge base
7. use the updated knowledge base in the next run

## Repository Layout

See `docs/directory-architecture.md` for the placement rules and cleanup policy.

Core framework:

- `skills/`: reusable skill assets, wiki pages, raw discovery, indexes, and capability maps
- `workflows/`: workflow definitions and orchestration patterns
- `workflow-kb/`: durable reusable knowledge, retrieval entries, patterns, rubrics, fallback strategies, and failure cases
- `schemas/`: JSON schemas for skills, workflows, scenarios, scoring, gates, recipes, and verification records
- `scripts/`: project validators and promotion gate checks
- `docs/`: architecture, principles, scoring, self-evolution, and directory rules
- `TOOLS.md`: durable tool, command, environment, path, and platform usage notes
- `MEMORY.md`: durable project-local preferences and facts

Scenario and evidence:

- `scenarios/`: scenario-specific validation wrappers, constraints, risk rules, and scoring rubrics
- `runs/`: records from specific workflow runs; evidence, not reusable truth by itself
- `evolution/`: evidence-backed improvement notes and self-evolution outputs
- `evolution-drafts/`: pending, approved, and rejected proposals for long-lived rule updates
- `verified-recipes/`: recipes promoted only after verification, human review, and reuse evidence
- `failed-recipes/`: failed recipes that still produced reusable evidence
- `reports/`: generated summaries and review outputs

## Evidence Map

Use these files to understand the current validated state:

| Question | Primary evidence |
| --- | --- |
| What is the system architecture? | `docs/architecture.md` |
| How are high-risk action facts separated from compliance proof? | `docs/action-verification.md` |
| What principles constrain the project? | `docs/principles.md` |
| How should SkillOpt-style optimization fit? | `docs/skillopt-integration.md` |
| Can this claim official SkillOpt paper reproduction? | `reports/skillopt-official-readiness.json` |
| What is the current scenario? | `scenarios/xiaohongshu-creator/scenario.md` |
| What workflow was validated? | `workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md` |
| What is the generic multi-agent workflow contract? | `docs/multi-agent-workflows.md` |
| What is the PaaS-ready workflow service contract? | `docs/paas-ready-workflow-service.md` |
| What is the current PaaS acceptance record? | `runs/022-xhs-pi-paas-readiness-acceptance/` |
| How do SkillOpt artifacts promote into the skill wiki? | `docs/skill-wiki-promotion.md` |
| What skill wiki entry was promoted? | `skills/wiki/xhs-kb-reuse-selection-gated-safety.md` |
| What run passed draft validation? | `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/` |
| What recipe is verified? | `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md` |
| What failed evidence is preserved? | `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md` |
| What reusable workflow is in the KB? | `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md` |
| How does retrieval find reusable assets? | `workflow-kb/retrieval-index.json` |
| What is the MVP verdict? | `reports/first-mvp-validation-report.md` |

## Current MVP Status

The current MVP scope is **compliant draft validation**, not live publishing.

The validated path proves that the workflow can:

1. discover and normalize skills,
2. compose a scenario workflow,
3. generate and score content,
4. pass human review and risk approval,
5. confirm account state before handoff,
6. save a compliant draft without clicking publish,
7. write reusable success and failure evidence back into the knowledge base,
8. reuse the knowledge base in a second scenario run.

See:

- `reports/first-mvp-validation-report.md`
- `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md`
- `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md`

## Current PaaS-Ready Status

The repository now also exposes a **PaaS-ready multi-agent workflow service
shell**.

Current boundary:

1. the generic Pi-backed multi-agent workflow contract is validated
2. the Xiaohongshu real-run orchestration remains technically `partial`
3. the Xiaohongshu workflow is still **accepted for PaaS progression** by
   human-reviewed readiness logic because the real save-draft proof is positive,
   `clicked_publish=false`, and the remaining blocker is isolated to a fresh
   visible-session login reset

See:

- `docs/paas-ready-workflow-service.md`
- `services/workflow-api/README.md`
- `runs/018-xhs-pi-multi-agent-live-validation/`
- `runs/022-xhs-pi-paas-readiness-acceptance/`

## How To Use This Repository

### Read First

Start with:

1. `AGENTS.md` for agent operating rules.
2. `docs/architecture.md` for the system model.
3. `docs/directory-architecture.md` for placement rules.
4. `docs/sensitive-data-policy.md` before any account-bound run or promotion.
5. `docs/workflow-knowledge-base.md` for KB writeback rules.
6. `docs/skill-wiki-promotion.md` for promoting SkillOpt artifacts into the skill wiki.
7. `scenarios/<scenario>/` for scenario-specific boundaries.
8. `workflow-kb/retrieval-index.json` before starting any new run.

### Run A New Scenario

For a new workflow scenario:

1. Define the scenario boundary in `scenarios/`.
2. Capture raw skill discovery in `skills/raw-discovery/`.
3. Normalize reusable capabilities into `skills/`.
4. Compose the workflow in `workflows/`.
5. Run or simulate the workflow and store evidence in `runs/`.
6. Score the result and record human review or gate evidence.
7. Write reusable outcomes into `workflow-kb/`.
8. Promote only verified recipes into `verified-recipes/`.
9. Store failed but useful evidence in `failed-recipes/` or `workflow-kb/failure-cases/`.

Before starting a new run, query `workflow-kb/retrieval-index.json` and the referenced KB files to avoid rediscovering known patterns.

### Promote An Asset

Before promoting a workflow or recipe:

1. Confirm the run has evidence under `runs/`.
2. Confirm human review and risk gates when required.
3. Confirm proof matches the approved mode.
4. Keep failed evidence under failed namespaces.
5. Update the retrieval index only with reusable assets.
6. Run the promotion validator.
7. Run the sensitive-boundary validator.

### Run The PaaS-Ready Service

```bash
npm run paas:workflow-api
```

Validate the readiness path with:

```bash
npm run validate:xhs-paas-readiness
npm run validate:workflow-api
```

## Promotion Rules

Do not promote a workflow or recipe because it looks useful. Promotion requires evidence.

- Failed recipes do not belong in `verified-recipes/`.
- Failed workflows do not belong in `workflow-kb/verified-workflows/`.
- A quality score is not the same as human review, risk approval, account-state proof, or draft/publish proof.
- Verified assets need explicit evidence references.
- Incomplete or blocked runs should remain as run evidence plus an evolution note or failure case.
- Live publish verification is separate from draft verification.
- Layer 1 uses the generic `action verification` contract; scenario terms such as `draft_verified` stay local and must map into, not replace, the Layer 1 model.

For the current Xiaohongshu scenario, `draft_verified` means human review, risk approval, account-state check, compliant draft proof, and `clicked_publish=false` all passed.

## Safety Boundaries

High-risk actions require human review. This repository should not be used for fully autonomous account actions.

Do not commit:

- local browser profiles,
- cookies or session files,
- `.env` files,
- credentials or private keys,
- scratch plans or local agent progress notes.

The `.gitignore` excludes known local-sensitive paths such as `.gstack/`, `.xhs-creator-profile/`, cookie JSON files, and local team planning files.

Before promoting reusable evidence, run:

```bash
node scripts/validate-sensitive-boundaries.mjs
```

## Validation

Run the validators after changing schemas, workflows, recipes, KB entries, reports, or promotion evidence:

```bash
node scripts/validate-mvp-acceptance.mjs
node scripts/validate-sensitive-boundaries.mjs
node scripts/validate-evolution-drafts.mjs
node scripts/validate-promotion-gates.mjs
```

Expected current result:

- MVP acceptance: `PASS`
- Sensitive boundaries: `passed`
- Evolution drafts: `passed`
- Promotion gates: `passed`

## Development Notes

- The repository intentionally stores both successful and failed evidence.
- Failed evidence is useful, but it must not be stored in verified paths.
- Screenshots and browser proof are run evidence, not source-of-truth architecture.
- High-risk account-bound actions require human review.
- Refactors should be atomic: change one coherent asset boundary, validate it, then commit.

## Agent Rules

Agent behavior is defined in `AGENTS.md`.

Key operating expectations:

- keep Layer 1 scenario-agnostic,
- keep scenario-specific assumptions local to the scenario,
- make refactors and submissions atomic,
- validate before promotion,
- preserve sensitive local files outside git.

## License

Licensed under the Apache License, Version 2.0. See `LICENSE`.
