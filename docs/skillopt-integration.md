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
5. Generate structured candidate edits:
   - `add`: introduce a missing rule or procedure.
   - `delete`: remove a harmful or obsolete rule.
   - `replace`: tighten an existing rule.
6. Apply a bounded edit budget so a single update cannot rewrite the whole
   skill without explicit approval.
7. Evaluate the candidate on the held-out selection batch.
8. Accept only if the candidate improves the selection score and does not
   violate scenario risk gates or project promotion rules.
9. Store rejected edits with the score drop or failure reason.
10. Export only the best accepted skill artifact for reuse.

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
- `baseline_score`
- `candidate_score`
- `selection_gate`
- `edit_budget`
- `edits`
- `accepted`
- `rejected_reason`
- `evidence_refs`
- `sensitive_data_status`

Acceptance:

- A candidate update cannot validate without evidence references.
- A candidate update cannot validate without baseline and candidate scores.
- A rejected update is first-class evidence, not discarded scratch state.

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
- Fails records that reference sensitive local runtime state directly.

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
- The candidate is generated through bounded edits.
- The selection gate shows improvement.
- Rejected edits, if any, are stored as evidence.
- The final artifact is clearly marked as accepted, rejected, or experimental.

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

Still not implemented:

- Official `microsoft/SkillOpt` code integration.
- External benchmark reproduction.
- Automated optimizer model calls.
- Promotion of the experimental candidate into `workflow-kb/verified-workflows/`
  or `verified-recipes/`.
