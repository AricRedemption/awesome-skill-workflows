<div align="center">

<h1>Runwiser / awesome-skill-workflows</h1>

<h3>Turn Agent Runs Into Verified, Reusable, Self-Improving Workflow Assets</h3>

<p>
  An evidence-first operating layer for turning repeated AI agent runs into reusable, auditable, and promotable workflow assets.
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

`Runwiser` is the product direction.

`awesome-skill-workflows` is the open repository that proves and packages that
direction.

This project is **not** a Xiaohongshu tool.

It is an evidence-first workflow operating layer for turning repeated agent
work into verified, reusable, self-improving, and eventually serviceable
workflow assets.

![Skill workflow validation pipeline](runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-media-en/01-skill-workflow-validation-en.png)

## What This Is

Most teams already have prompts, scripts, tools, and agent runs.

What they usually do **not** have is a reliable system that answers:

- which workflow actually worked,
- what proof was preserved,
- which gates passed or failed,
- what became reusable,
- what should evolve before the next run,
- and what can be exposed safely as a service surface.

Runwiser treats the workflow, its evidence, and its upgrade path as the durable
asset.

## Why This Exists

Agent teams often collect many isolated skills, prompts, scripts, and tool tricks. That is useful, but it is not enough. A skill only becomes valuable when it can be selected, composed, run, reviewed, verified, and reused.

This repository treats workflows as the durable asset:

- skills are capability units,
- workflows are composed execution paths,
- scenarios are validation wrappers,
- run evidence is the proof layer,
- the workflow knowledge base is the reusable memory,
- self-evolution turns failures, review notes, and verification gaps into better future assets.

## What Makes It Different

### 1. Proof Before Reuse

A run is not reusable because it looked good once.

Reusable assets only emerge after explicit evidence, review, verification, and
promotion boundaries line up.

- run evidence stays in `runs/`
- durable knowledge stays in `workflow-kb/`
- promoted assets stay in `verified-recipes/`
- failed but useful lessons stay in failed namespaces

### 2. Self-Evolution With Boundaries

This project does not treat self-evolution as free-form prompt drift.

Self-evolution is evidence-driven writeback:

- failures can become reusable guardrails,
- human review can trigger workflow upgrades,
- verification mismatches can force a correction path,
- long-lived rule changes are drafted before they are promoted.

See `docs/self-evolution.md` and `evolution-drafts/`.

### 3. PaaS-Ready Workflow Service

This repository is not only a documentation surface.

It already defines a thin HTTP service boundary that exposes repo-owned
workflow validation and readiness checks while preserving evidence semantics.

The key distinction is deliberate:

- technical validation can remain `partial`
- readiness can still be `accepted_for_paas`

Those states are not collapsed into a vague "passed" badge.

See `docs/paas-ready-workflow-service.md`.

## What This Project Is

This repository is a framework for:

1. workflow evidence and proof preservation
2. bounded self-evolution from run evidence
3. reusable workflow memory and promotion
4. scenario-portable workflow validation
5. service-ready workflow execution boundaries

The long-term goal is to turn repeatable workflows into reusable, measurable,
improvable, and serviceable workflow assets.

## Core Loop

Every useful run should make the next run better:

1. clarify the task and constraints
2. select the best matching skill assets
3. compose and run the workflow
4. score the result
5. pass human review for high-risk steps
6. verify whether the output actually met the target
7. capture failure cases and reusable evidence
8. write back the right lesson at the right layer
9. promote only what passed the required gates

The reusable asset is the path, not just the final output.

## Current Proof Surfaces

The repository currently proves three distinct things:

1. **Workflow proof stack**
   - evidence, gates, verification, and promotion remain separate
2. **Bounded self-evolution**
   - runs can improve future assets without silently rewriting core rules
3. **PaaS-ready workflow service**
   - repo-owned workflow validation can be exposed over HTTP with explicit
     readiness semantics

The current deepest end-to-end scenario is still Xiaohongshu draft validation,
but that scenario is a proof wrapper, not the product identity.

## Runwiser Proof Stack

Runwiser is easiest to understand as a proof stack, not as a single success
badge.

Each layer answers a different question:

| Layer | Question | Primary home |
| --- | --- | --- |
| Run evidence | What actually happened in a concrete execution? | `runs/` |
| Generic contracts | What is reusable across scenarios? | `schemas/`, `workflows/`, `docs/action-verification.md` |
| Bounded evolution | What should change before the next run? | `evolution/`, `evolution-drafts/`, `docs/self-evolution.md` |
| Durable knowledge | What can future runs retrieve and reuse? | `workflow-kb/`, `skills/wiki/` |
| Scenario wrapper | Which local constraints proved or blocked the run? | `scenarios/` |
| Service boundary | What can safely become an HTTP workflow surface? | `services/workflow-api/`, `docs/paas-ready-workflow-service.md` |

This separation is the core trust model:

- a quality score is not human approval,
- an action fact is not compliance proof,
- failed evidence can become a reusable guardrail without becoming a verified recipe,
- service readiness can be accepted without relabeling partial technical validation.

## Self-Evolution Case Study

The current PaaS-readiness path is the clearest example of bounded
self-evolution.

The system has positive draft-save proof from prior run evidence, including a
compliant draft boundary and `clicked_publish=false`. A later fresh
visible-session recheck hit a login-reset blocker. Instead of hiding that
blocker behind a vague "passed" label, the repository split the result:

1. keep the orchestration's technical validation as `partial`,
2. preserve the final technical terminal state as `blocked`,
3. record the blocker as evidence,
4. allow human-reviewed PaaS progression because the service boundary is thin,
   repo-owned, and constrained to readiness checks,
5. keep the exact evidence references available for future validation runs.

That is what "self-evolution" means here: the workflow gets a better future
boundary from evidence, but the technical record is not rewritten.

See:

- `docs/self-evolution.md`
- `docs/paas-ready-workflow-service.md`
- `runs/022-xhs-pi-paas-readiness-acceptance/`

## Why `partial` And `accepted_for_paas` Can Both Be True

The PaaS readiness status uses two tracks:

| Track | Current status | Meaning |
| --- | --- | --- |
| Technical validation | `technical_validation.status=partial` | The latest orchestration did not fully pass because the fresh visible-session recheck is still blocked. |
| Product readiness | `readiness_level=accepted_for_paas` | The workflow can progress as a service surface because the blocker is isolated, prior draft proof is positive, publish stayed disabled, and human-reviewed readiness accepted the bounded service scope. |

The accepted readiness verdict does **not** mean:

- the technical validation passed,
- live publish proof exists,
- the login-reset blocker disappeared,
- scenario-specific account rules moved into the generic architecture.

It means the repository can expose an evidence-backed readiness service without
collapsing technical truth, human acceptance, and product progression into one
ambiguous state.

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
