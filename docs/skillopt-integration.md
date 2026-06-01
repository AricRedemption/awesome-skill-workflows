# SkillOpt-Style Skill Optimization Integration

## Purpose

This document records how this project should absorb the SkillOpt idea without
turning the repository into a clone of the external paper implementation.

SkillOpt is relevant because it treats a natural-language skill document as the
trainable external state of a frozen agent. The target model and execution
harness stay fixed; scored rollouts produce evidence; an optimizer proposes
bounded text edits; and a held-out validation gate decides whether the candidate
skill is accepted.

For this project, the useful idea is not the exact benchmark suite. The useful
idea is a stricter Layer 1 self-evolution loop for improving reusable skills
from run evidence.

Sources:

- Paper: <https://arxiv.org/abs/2605.23904>
- Project page: <https://microsoft.github.io/SkillOpt/>
- Code: <https://github.com/microsoft/SkillOpt>

## Fit With This Repository

This repository already has the core ingredients:

- `runs/` stores workflow trajectories and evidence.
- `schemas/` defines machine-checkable asset contracts.
- `workflow-kb/` stores reusable patterns, rubrics, and failure cases.
- `evolution/` stores evidence-backed improvement notes.
- `evolution-drafts/` routes long-lived rule changes through review.
- `verified-recipes/` and `failed-recipes/` separate promotion outcomes.

SkillOpt adds a missing discipline: skill edits should be treated as
candidate updates, not unconditional rewrites. A candidate skill should only
be promoted when it has evidence, a score delta, and a selection gate that
proves the edit improved the target workflow under the same harness.

## Layer Boundary

SkillOpt-style optimization belongs in Layer 1.

It must stay scenario-agnostic:

- Do not encode Xiaohongshu, Agora, account-state, publishing, or platform
  assumptions into generic optimization rules.
- Scenario files may provide task batches, scoring rubrics, and risk gates.
- The generic optimizer contract should only know about skills, rollouts,
  edits, scores, gates, rejected edits, and accepted artifacts.

## Target Architecture

The project-local version should use this loop:

1. Select a skill document or managed skill asset as `current_skill`.
2. Build a training batch from prior or new `runs/` evidence.
3. Build a held-out selection batch that is not used to propose the edit.
4. Score the baseline skill with the same workflow harness.
5. Run a local training entrypoint that records per-step artifacts.
6. Generate structured candidate edits:
   - `add`: introduce a missing rule or procedure.
   - `delete`: remove a harmful or obsolete rule.
   - `replace`: tighten an existing rule.
7. Apply a bounded edit budget so a single update cannot rewrite the whole
   skill without explicit approval.
8. Evaluate the baseline and candidate with a repeatable scorer or external
   harness on the held-out selection batch.
9. Accept only if the candidate improves the selection score and does not
   violate scenario risk gates or project promotion rules.
10. Store generated edits and rejected candidates with the score drop, rejection
   stage, and failure reason.
11. Export only the best accepted skill artifact for reuse, plus run-state
    artifacts such as history, runtime state, and config.

## Proposed Assets

Use the following implementation order. Each step should remain useful even if
later steps are deferred.

### Step 1: Planning And Contract Documentation

Create durable documentation before adding code.

Files:

- `docs/skillopt-integration.md`
- `README.md`
- `AGENTS.md`

Acceptance:

- The README explains why SkillOpt-style optimization matters to this project.
- Agent rules keep SkillOpt-style optimization scenario-agnostic.
- The doc names non-goals and promotion constraints.

### Step 2: Schema Contracts

Add machine-readable contracts for optimization runs and edits.

Files:

- `schemas/skill-optimization-run.schema.json`
- `schemas/skill-edit.schema.json`

Minimum fields:

- `source_skill_path`
- `training_entrypoint`
- `baseline_score`
- `candidate_score`
- `edit_generation`
- `score_evaluation`
- `selection_gate`
- `edit_budget`
- `edits`
- `rejected_candidates`
- `exported_artifacts`
- `accepted`
- `rejected_reason`
- `evidence_refs`
- `sensitive_data_status`

Acceptance:

- A candidate update cannot validate without evidence references.
- A local training run must record its entrypoint and per-step artifacts.
- A candidate update cannot validate without baseline and candidate scores.
- Recorded scores must match a repeatable score artifact.
- A rejected update is first-class evidence, not discarded scratch state.
- Generated edits must be recorded before accepted edits are validated.

### Step 3: Layer 1 Workflow Asset

Add a generic workflow for optimizing one skill from scored evidence.

File:

- `workflows/skill-optimization/skillopt-style-skill-training.workflow.md`

Acceptance:

- The workflow describes train, selection, and optional test evidence splits.
- The workflow separates optimizer-side memory from the exported skill.
- The workflow states that scenario risk gates remain local to scenarios.

### Step 4: Validator

Add a narrow validator for skill optimization records.

File:

- `scripts/validate-skill-optimization.mjs`

Acceptance:

- Fails candidate promotions without held-out selection evidence.
- Fails accepted candidates when `candidate_score <= baseline_score`.
- Fails records when scores do not match `score-result.json`.
- Fails records that reference sensitive local runtime state directly.
- Fails records where accepted edits are missing from `generated-edits.json`.
- Validates rejected candidate buffer entries.
- Validates `best_skill.md`, `history.json`, `runtime_state.json`, and
  `config.json` exports.

### Step 5: Minimal Reproduction Run

Run one small project-local optimization loop before claiming this is working.

First target:

- Optimize a workflow-kb retrieval/reuse skill from existing run evidence.

Why:

- It is Layer 1 aligned.
- It avoids account-bound platform actions.
- It can be scored with existing run summaries, KB reuse ratio, and review
  evidence.

Acceptance:

- There is a baseline skill.
- There is a candidate skill.
- There is a reproducible local training entrypoint.
- The candidate is generated through bounded edits.
- The baseline and candidate are scored by a deterministic scorer.
- The selection gate shows improvement.
- Rejected edits are stored as evidence.
- `best_skill.md` and local run-state artifacts are exported.
- The final artifact is clearly marked as accepted, rejected, or experimental.

### Step 6: Skill Wiki Promotion

Define how an accepted SkillOpt artifact becomes a durable skill wiki entry and
how that entry is indexed for future agents.

File:

- `docs/skill-wiki-promotion.md`

Acceptance:

- The promotion spec names the canonical wiki page contract.
- The promotion spec requires the wiki page, registry entry, and retrieval
  entry to be updated together.
- The promotion spec keeps rejected or partial candidates out of the wiki.

## Non-Goals

- Do not vendor the external `microsoft/SkillOpt` repository into this project
  without a separate dependency and license review.
- Do not reproduce all paper benchmarks before adding the project-local
  contract. The paper benchmark suite is external validation, not this
  repository's first acceptance gate.
- Do not promote optimizer-generated skills into `verified-recipes/` or
  `workflow-kb/verified-workflows/` without the same human review, risk, and
  evidence gates required by this project.
- Do not treat a quality score as proof of human approval, risk approval,
  account-state proof, or platform handoff proof.

## Current Status

Status: minimal project-local validation implemented.

Implemented now:

- The SkillOpt-style integration idea is documented.
- README and agent rules point to this document.
- Schema contracts exist for skill edits and optimization runs.
- A Layer 1 optimization workflow asset exists.
- A validator checks accepted and rejected skill optimization records.
- A minimal Xiaohongshu KB-reuse validation run exists at
  `runs/008-xhs-skillopt-kb-reuse-minimal/`.
- Deterministic generated edits are recorded in
  `runs/008-xhs-skillopt-kb-reuse-minimal/generated-edits.json`.
- The skill wiki promotion spec exists at `docs/skill-wiki-promotion.md`.
- Per-step local training artifacts are recorded under
  `runs/008-xhs-skillopt-kb-reuse-minimal/steps/`.
- Multi-epoch local training artifacts are recorded under
  `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/`.
- Deterministic rollout workers record baseline and candidate behavior in
  `runs/008-xhs-skillopt-kb-reuse-minimal/rollouts.json`.
- Deterministic optimizer-side reflection records the accept/reject decision in
  `runs/008-xhs-skillopt-kb-reuse-minimal/optimizer-reflection.json`.
- A rejected candidate buffer sample exists for a proof-boundary regression.
- Deterministic score evidence is recorded in
  `runs/008-xhs-skillopt-kb-reuse-minimal/score-result.json`.
- Local equivalents of `best_skill.md`, `history.json`, `runtime_state.json`,
  and `config.json` are exported for the minimal run.
- Local equivalents of `slow_update/epoch_01/` and `meta_skill/epoch_01/` are
  exported for the minimal run.

Still not implemented:

- Official `microsoft/SkillOpt` code integration.
- External benchmark reproduction.
- Automated optimizer model calls.
- Parallel rollout workers.
- Official benchmark dataloaders and external task execution harnesses.
- Promotion of the experimental candidate into `workflow-kb/verified-workflows/`
  or `verified-recipes/`.

Official reproduction readiness report:

- `reports/skillopt-official-readiness.json`
- Current readiness status: `not_ready_for_official_reproduction_claim`
- Official code has been inspected through an isolated external checkout, but
  it is not vendored into this repository and no official training command has
  been executed.
- A no-data entrypoint probe passed after installing official core dependencies
  in an isolated environment: `python3 scripts/train.py --help`.
- A tiny SearchQA-style split exists for smoke validation at
  `runs/009-skillopt-official-searchqa-smoke/searchqa_split/` and loads through
  the official SearchQA dataloader. This is only a dataloader/entrypoint
  fixture, not official benchmark data.
- The current shell has no usable official optimizer or target model credential
  backend configured. The readiness report records only boolean environment
  presence and never stores credential values.
- The readiness report includes an official smoke train command plan. It must
  not be executed until model credentials are configured.

## Reproduction Self-Audit

Current conclusion: this repository has a strong project-local reproduction of
the SkillOpt architecture, but it is not a full official paper reproduction.

Implemented with executable local evidence:

- Frozen-skill setup: the run optimizes one baseline skill into one candidate
  skill without changing the surrounding scenario rules.
- Train/selection/test split: the run separates evidence used for edit
  generation from held-out evidence used for acceptance.
- Bounded edits: generated edits are structured as `add`, `delete`, or
  `replace` and clipped by `edit_budget`.
- Rollout evidence: deterministic local workers record baseline and candidate
  behavior under the same harness.
- Optimizer-side reflection: a local reflector turns rollout and edit evidence
  into an accept/reject recommendation.
- Held-out selection gate: accepted candidates must improve the recorded
  selection score.
- Rejected-edit buffer: an unsafe proof-boundary candidate is retained as
  negative evidence.
- Exported run state: `best_skill.md`, `history.json`, `runtime_state.json`,
  `config.json`, slow update, and meta-skill artifacts exist for the minimal
  run.
- Validator coverage: `scripts/validate-skill-optimization.mjs` checks the
  record, artifacts, score consistency, rejected candidates, sensitive refs, and
  direct-promotion boundaries.

Partially reproduced:

- Textual optimizer: represented by deterministic scripts, not a frontier
  optimizer model proposing edits from free-form trajectories.
- Rollout workers: represented by deterministic local workers, not parallel
  target-agent executions over external tasks.
- Slow/meta update: exported as local epoch artifacts, not learned from a broad
  epoch-wise optimizer-model reflection over many sampled tasks.
- Benchmark harness: represented by Xiaohongshu KB-reuse evidence, not the
  paper's six-benchmark, seven-model, three-harness evaluation grid.

Not reproduced:

- Official `microsoft/SkillOpt` training code and configs.
- Official benchmark dataloaders, task runners, and evaluation metrics.
- Real optimizer-model calls, merge/rank/clip over multiple reflection
  minibatches, and paper-scale learning-rate schedules.
- Cross-model, cross-harness, cross-benchmark transfer experiments.
- Paper ablations against no-skill, human-skill, one-shot skill, Trace2Skill,
  TextGrad, GEPA, and EvoSkill baselines.

Practical status for this project: the architecture is sufficient for a local
v0.1 SkillOpt-style workflow-validation loop. It should be described as
`manual_skillopt_style` or deterministic local reproduction until official code,
external harnesses, and model-driven optimizer calls are connected.

Before claiming official SkillOpt paper reproduction, validate the readiness
report:

```bash
node scripts/probe-official-skillopt.mjs
node scripts/validate-skillopt-official-readiness.mjs
node scripts/run-official-skillopt-smoke.mjs --dry-run
node scripts/validate-official-skillopt-smoke-output.mjs --allow-missing
```

If credentials are stored outside the repository, pass them explicitly without
printing values:

```bash
node scripts/probe-official-skillopt.mjs --env-file /path/to/local.env
node scripts/run-official-skillopt-smoke.mjs --env-file /path/to/local.env
```

Without credentials, the non-dry-run smoke runner must stop before training and
record `blocked_missing_credentials` evidence under
`runs/009-skillopt-official-searchqa-smoke/blocked-smoke-proof.json`.

Regenerate that proof with:

```bash
node scripts/run-official-skillopt-smoke.mjs \
  --proof-out runs/009-skillopt-official-searchqa-smoke/blocked-smoke-proof.json
```
