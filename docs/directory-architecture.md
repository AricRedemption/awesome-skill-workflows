# Directory Architecture

This repository has two structures that must stay separate:

1. the reusable workflow evidence and skill-evolution framework,
2. evidence from concrete scenario runs.

A scenario can validate the framework, but run artifacts should not become the
framework's shape. A useful run becomes durable knowledge only after promotion
rules, evidence references, and sensitive-data gates are satisfied.

## Five-Layer Directory Model

### Layer 0: Raw / Evidence

Primary homes:

- `runs/`
- `failed-recipes/`
- run-local proof, score, review, gate, failure, and optimizer artifacts

Purpose:

- preserve what happened in one execution;
- keep successful and failed evidence available for later learning;
- make every future promotion traceable back to source evidence.

Placement rules:

- Put concrete run records in `runs/<run-id>/`.
- Put failed but useful recipe evidence in `failed-recipes/` or explicit KB
  failure namespaces.
- Keep historical paths stable. Do not move existing run files unless a
  validator or report requires it.
- A run artifact is not reusable truth by itself.

Recommended layout for new runs:

```text
runs/<run-id>/
  input.json
  run-summary.md
  skill-optimization-run.json      # when the run is optimization-related
  promotion-manifest.json          # only when artifacts are promoted
  artifacts/
  evidence/
  scripts/
  media/
  gates/
```

### Layer 1: Core Skill Architecture

Primary homes:

- `skills/`
- `workflows/`
- `schemas/`
- `scripts/`
- `docs/`
- `AGENTS.md`
- `TOOLS.md`
- `MEMORY.md`

Purpose:

- define reusable skill, workflow, scoring, gate, promotion, and retrieval
  contracts;
- keep validators and schemas as gatekeepers;
- keep generic architecture scenario-agnostic.

Placement rules:

- Put reusable skill behavior and canonical skill wiki pages in `skills/`.
- Put workflow composition in `workflows/`.
- Put validator contracts in `schemas/` and executable checks in `scripts/`.
- Put architecture and policy in `docs/`.
- Put durable tool notes in `TOOLS.md` only after an approved evolution draft.
- Put durable project-local preferences and facts in `MEMORY.md` only after an
  approved evolution draft.

Boundary:

- Platform names, account assumptions, credential handling, and scenario risk
  rules do not belong in generic Layer 1 assets unless they are explicitly
  framed as examples.

### Layer 2: Skill Evolution / Optimization

Primary homes:

- `runs/<run-id>/skill-optimization-run.json`
- `runs/<run-id>/generated-edits.json`
- `runs/<run-id>/candidate-skill.md`
- `runs/<run-id>/best_skill.md`
- run-local optimizer history, runtime state, slow/meta notes, and rejected
  candidate buffers

Purpose:

- use scored run evidence to propose bounded skill edits;
- separate train evidence from held-out selection evidence;
- accept only improvements that pass selection, risk, and sensitive-data gates;
- preserve rejected candidates as negative evidence.

Placement rules:

- Store optimizer-side artifacts under the source run.
- Do not put optimizer history, runtime state, rejected buffers, or slow/meta
  notes into `skills/wiki/`.
- Do not promote `best_skill.md` directly as a wiki page. Normalize it first.

### Layer 3: Durable Knowledge Surface

Primary homes:

- `skills/wiki/`
- `skills/index.json`
- `workflow-kb/`
- `workflow-kb/retrieval-index.json`
- `verified-recipes/`

Purpose:

- expose reusable, promoted knowledge to future agents;
- provide canonical skill pages, verified workflows, composition patterns,
  rubrics, failure cases, fallback strategies, reusable prompts, and retrieval
  hooks;
- let future runs start from durable knowledge rather than rediscovering the
  same evidence.

Placement rules:

- Put promoted canonical skill pages in `skills/wiki/`.
- Keep `skills/index.json` machine-readable and concise; do not store long-form
  skill bodies there.
- Put durable workflow memory in `workflow-kb/`.
- Point `workflow-kb/retrieval-index.json` only to reusable assets, not temporary
  training artifacts.
- Put recipes in `verified-recipes/` only after verification, human review, and
  required promotion gates.

Boundary:

- Failed evidence can be reusable, but it must stay in failure namespaces and
  must not be represented as verified success.

### Layer 4: Scenario Validation

Primary homes:

- `scenarios/`
- `workflows/<scenario>/`
- scenario-specific run evidence under `runs/`

Purpose:

- validate the generic framework in concrete workflows;
- define scenario-local scoring rubrics, risk boundaries, and verification
  rules;
- keep platform-specific assumptions local.

Placement rules:

- Put platform-specific constraints in `scenarios/<scenario>/`.
- Put scenario-specific workflow assembly in `workflows/<scenario>/` until a
  workflow is proven generic.
- Keep scenario rules from leaking into generic skills, schemas, scripts, or root
  docs.

## Promotion Placement Rules

Promotion is a cross-layer event:

```text
Layer 0 evidence
  -> Layer 2 optimization candidate
  -> selection/risk/sensitive gates
  -> Layer 3 durable asset
```

When a SkillOpt-style artifact is promoted to the skill wiki:

1. Keep the source artifact under `runs/<run-id>/`.
2. Add `runs/<run-id>/promotion-manifest.json`.
3. Write the normalized canonical skill page in `skills/wiki/<skill-id>.md`.
4. Update `skills/index.json` with a matching registry record.
5. Update `workflow-kb/retrieval-index.json` with a matching retrieval record.
6. Run the skill optimization validator, skill wiki promotion validator, and
   sensitive-boundary validator.

## Local And Operational State

These paths are not part of the reusable architecture:

- `user-sensitive-state/`: local sensitive-state notes only. Keep real secrets
  and session data out of git.
- `team_plan.md`, `team_findings.md`, `team_progress.md`: local coordination
  state, ignored by git.
- `.gstack/`, `temp_images/`, `tmp/`, browser profiles, cookies, and local
  screenshots from authenticated sessions: local scratch or sensitive state,
  ignored by git.
- `prompts/`: reserved placeholder. Do not add reusable prompts here while
  `workflow-kb/reusable-prompts/` is the primary home.

## Cleanup Priorities

1. Keep `README.md` as the entrypoint and this file as the placement authority.
2. Keep the five-layer boundary explicit in architecture docs and validator
   rules.
3. Add promotion manifests for promoted SkillOpt-style artifacts.
4. Do not add new root-level directories without updating this file.
5. Stop adding reusable prompts to the empty root `prompts/` placeholder; use
   `workflow-kb/reusable-prompts/`.
6. For new scenario runs, use the structured `runs/<run-id>/` layout above.
7. Only promote from `runs/` into durable surfaces with explicit evidence
   references, required gate proof, and sanitized sensitive-data status.
8. Run `node scripts/validate-sensitive-boundaries.mjs` before any
   promotion-sensitive writeback.
