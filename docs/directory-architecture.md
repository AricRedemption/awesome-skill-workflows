# Directory Architecture

This repository has two kinds of structure:

1. the reusable workflow framework,
2. evidence from concrete scenario runs.

Keep those two structures separate. A scenario can validate the framework, but
run artifacts should not become the framework's shape.

## Primary Layers

### Layer 1: Core Framework

These directories define reusable assets and contracts:

- `skills/`: reusable skill assets, wiki pages, raw discovery, indexes, and capability maps.
- `workflows/`: reusable workflow definitions and orchestration patterns.
- `workflow-kb/`: durable reusable knowledge promoted from evidence.
- `schemas/`: JSON schemas for skills, workflows, scenarios, gates, recipes, and verification records.
- `scripts/`: validators and promotion checks.
- `docs/`: architecture, principles, scoring, self-evolution, and directory rules.
- `TOOLS.md`: durable tool, command, environment, path, and platform usage notes promoted through approved evolution drafts.
- `MEMORY.md`: durable project-local preferences and facts promoted through approved evolution drafts.

Layer 1 must stay scenario-agnostic. Platform names, account assumptions, and
scenario-specific risk rules do not belong here unless they are clearly marked
as examples.

### Layer 2: Scenario Wrappers

These directories adapt the core framework to a concrete validation scenario:

- `scenarios/`: scenario definitions, capability requirements, scoring rubrics, risk boundaries, and verification rules.
- `workflows/<scenario>/`: scenario-specific workflow assembly when the workflow is not yet generic.

Scenario directories may contain platform-specific rules. Those rules should not
be copied into `skills/`, generic `workflows/`, `schemas/`, or root docs as
global behavior.

### Evidence And Promotion

These directories preserve what happened and what was learned:

- `runs/`: immutable run records, gate ledgers, generated outputs, proofs, scripts used for that run, screenshots, and summaries.
- `evolution/`: improvement notes produced from review feedback, failures, and verification gaps.
- `evolution-drafts/`: pending, approved, and rejected proposals for upgrading repeated lessons into long-lived agent rules.
- `verified-recipes/`: promoted recipes with explicit evidence references and review proof.
- `failed-recipes/`: failed recipes that still produced reusable evidence.
- `reports/`: generated acceptance reports, validation reports, and review summaries.

Run records are evidence, not reusable truth by themselves. Reusable lessons move
from `runs/` into `workflow-kb/`, `evolution/`, or a recipe only after the
promotion rules are satisfied.

### Local And Operational State

These paths are not part of the reusable architecture:

- `user-sensitive-state/`: local sensitive-state notes only. Keep real secrets and session data out of git.
- `team_plan.md`, `team_findings.md`, `team_progress.md`: local coordination state, ignored by git.
- `.gstack/`, `temp_images/`, `tmp/`, browser profiles, cookies, and local screenshots from authenticated sessions: local scratch or sensitive state, ignored by git.
- `prompts/`: reserved placeholder. Do not add reusable prompts here while `workflow-kb/reusable-prompts/` is the primary home.

## Placement Rules

- Put reusable skill behavior and canonical skill wiki pages in `skills/`.
- Put workflow composition in `workflows/`.
- Put platform-specific constraints in `scenarios/<scenario>/`.
- Put raw execution evidence in `runs/<run-id>/`.
- Put reusable conclusions from evidence in `workflow-kb/`.
- Put improvement notes in `evolution/`.
- Put long-lived rule proposals in `evolution-drafts/` and wait for user approval before applying them.
- Put passed promotion assets in `verified-recipes/`.
- Put failed but useful assets in `failed-recipes/` or explicit failed KB namespaces.
- Put generated acceptance summaries in `reports/`.
- Put validator contracts in `schemas/` and executable checks in `scripts/`.
- Put durable tool notes in `TOOLS.md` only after an approved evolution draft.
- Put durable project-local preferences and facts in `MEMORY.md` only after an approved evolution draft.

When a file could fit in two places, choose one primary home and link to it.
Duplication makes later promotion checks harder to trust.

## Current Structure Assessment

The top-level architecture is mostly correct: it already separates core assets,
scenario wrappers, run evidence, knowledge-base entries, promotion outputs, and
reports.

The main source of disorder is `runs/`. The first validation run contains
scripts, proofs, generated content, screenshots, media, and publish attempts in
one flat directory. That is acceptable as historical evidence, but future runs
should use a small internal layout:

```text
runs/<run-id>/
  input.json
  run-summary.md
  artifacts/
  evidence/
  scripts/
  media/
  gates/
```

For existing runs, avoid moving files unless a report or validator requires it.
Historical paths are evidence references and may already be linked by recipes,
reports, or the knowledge base.

## Cleanup Priorities

1. Keep `README.md` as the entrypoint and this file as the placement authority.
2. Do not add new root-level directories without updating this file.
3. Stop adding reusable prompts to the empty root `prompts/` placeholder; use `workflow-kb/reusable-prompts/`.
4. For new scenario runs, use the structured `runs/<run-id>/` layout above.
5. Only promote from `runs/` into `workflow-kb/` or `verified-recipes/` with explicit evidence references and required gate proof.
6. Run `node scripts/validate-sensitive-boundaries.mjs` before promotion-sensitive writeback.
