# Skill Wiki Promotion

## Purpose

This document defines how a SkillOpt-style artifact becomes a durable skill wiki
entry and how that entry is made discoverable to future agents.

The promotion goal is not to copy raw training output into a wiki. The goal is
to turn a validated candidate skill into a normalized, searchable, reusable, and
auditable wiki page with a registry record, retrieval hook, and source-run
promotion manifest.

## Core Principle

```text
SkillOpt-style optimization = produce candidate skill edits.
Skill Wiki = store validated canonical skill contracts.
```

Therefore:

- do not treat `runs/<run-id>/best_skill.md` as a wiki page;
- do not copy optimizer history, runtime state, slow/meta notes, or rejected
  buffers into `skills/wiki/`;
- do not let a score replace human review, risk approval, proof, account-state
  checks, or sensitive-data review;
- do not index temporary run notes as durable retrieval assets.

## Terms

- **SkillOpt artifact**: the accepted candidate output from a skill optimization
  run, usually centered on `candidate-skill.md` or `best_skill.md` plus score and
  gate evidence.
- **Promotion manifest**: `runs/<run-id>/promotion-manifest.json`, the source-run
  record that states whether an artifact was promoted, where it was promoted,
  which gates were required, and which files must be read together.
- **Skill wiki entry**: the human-readable canonical skill page explaining what
  the skill does, when to use it, when not to use it, inputs, outputs, steps,
  failure boundaries, and evidence.
- **Registry entry**: the machine-readable record in `skills/index.json` used to
  find and filter a skill.
- **Retrieval entry**: the cross-knowledge-base record in
  `workflow-kb/retrieval-index.json` used by future runs to discover reusable
  assets.

## Canonical Flow

```text
raw discovery / prior KB / run evidence
  -> SkillOpt-style optimization
  -> runs/<run-id>/skill-optimization-run.json
  -> selection gate + risk gate + sensitive gate
  -> promotion decision
  -> runs/<run-id>/promotion-manifest.json
  -> skills/wiki/<skill-id>.md
  -> skills/index.json
  -> workflow-kb/retrieval-index.json
  -> future agent retrieval
```

Detailed steps:

1. Start from an accepted SkillOpt artifact under `runs/<run-id>/`.
2. Confirm the run passed held-out selection, risk, and sensitive-data gates.
3. Record the promotion decision in `skill-optimization-run.json` with a
   `promotion` object.
4. Add `runs/<run-id>/promotion-manifest.json`.
5. Extract the reusable instruction, scope, non-scope, evidence references, and
   failure boundaries.
6. Write or update the canonical wiki page at `skills/wiki/<skill-id>.md`.
7. Write or update the skill registry record in `skills/index.json`.
8. Write or update the retrieval record in `workflow-kb/retrieval-index.json`
   when the wiki page is meant to be discoverable in future runs.
9. If the run also produced a reusable workflow pattern, failure case, rubric, or
   fallback strategy, store that derivative asset in `workflow-kb/` rather than
   duplicating it in the wiki page.

## Promotion Object Contract

`skill-optimization-run.json` should keep the historical `promotion_target`
field for compatibility, but new records should use a structured `promotion`
object:

```json
{
  "promotion_target": "skill-wiki",
  "promotion": {
    "status": "promoted",
    "manifest_path": "runs/<run-id>/promotion-manifest.json",
    "targets": [
      {
        "type": "skill_wiki",
        "path": "skills/wiki/<skill-id>.md"
      },
      {
        "type": "skill_registry",
        "path": "skills/index.json",
        "record_id": "<skill-id>"
      },
      {
        "type": "retrieval_index",
        "path": "workflow-kb/retrieval-index.json",
        "record_id": "<skill-id>"
      }
    ]
  }
}
```

Allowed promotion statuses:

- `none`: no durable promotion happened;
- `candidate`: a candidate exists but was not promoted;
- `promoted`: the artifact was promoted and linked to durable targets;
- `rejected`: promotion was considered and rejected;
- `blocked`: promotion cannot proceed until a missing gate or evidence gap is
  resolved.

## Promotion Manifest Contract

Every promoted SkillOpt-style wiki entry must have a source-run manifest:

```json
{
  "source_run": "008-xhs-skillopt-kb-reuse-minimal",
  "source_artifact": "runs/008-xhs-skillopt-kb-reuse-minimal/best_skill.md",
  "source_optimization_record": "runs/008-xhs-skillopt-kb-reuse-minimal/skill-optimization-run.json",
  "promotion_status": "promoted",
  "promoted_assets": [
    {
      "type": "skill_wiki",
      "path": "skills/wiki/xhs-kb-reuse-selection-gated-safety.md",
      "id": "xhs-kb-reuse-selection-gated-safety"
    },
    {
      "type": "skill_registry",
      "path": "skills/index.json",
      "record_id": "xhs-kb-reuse-selection-gated-safety"
    },
    {
      "type": "retrieval_index",
      "path": "workflow-kb/retrieval-index.json",
      "record_id": "xhs-kb-reuse-selection-gated-safety"
    }
  ],
  "required_gates": {
    "selection_gate": "passed",
    "risk_gate": "passed",
    "sensitive_data_gate": "sanitized"
  },
  "evidence_refs": [
    "runs/008-xhs-skillopt-kb-reuse-minimal/skill-optimization-run.json",
    "runs/008-xhs-skillopt-kb-reuse-minimal/score-result.json",
    "runs/008-xhs-skillopt-kb-reuse-minimal/best_skill.md"
  ],
  "sensitive_data_status": "sanitized"
}
```

The manifest lets a future agent start from a run and answer:

- was this artifact promoted;
- where was it promoted;
- which registry and retrieval records should match it;
- which gates were required;
- which evidence files must be inspected together;
- whether sensitive data was sanitized before durable writeback.

## Promotion Gates

A SkillOpt artifact may become a skill wiki entry only when all of the following
are true:

- the run has a valid evidence chain under `runs/<run-id>/`;
- baseline and candidate scores are recorded and consistent with the score
  artifact;
- the selected candidate passed the held-out selection gate;
- required scenario risk gates passed;
- the candidate does not rely on sensitive local runtime state;
- `sensitive_data_status` is `sanitized`;
- rejected or partial candidates stay outside `skills/wiki/`;
- the extracted skill page includes explicit scope and non-scope boundaries;
- the registry entry points to the wiki page;
- the retrieval entry points to the reusable asset and not temporary run notes;
- the source run has a promotion manifest linking all durable targets.

If any gate fails, keep the artifact in `runs/` and write the lesson to
`evolution/`, `workflow-kb/failure-cases/`, or another failed namespace instead
of promoting it to the wiki.

## Wiki Page Contract

Every promoted wiki page should include:

- `id`
- `name`
- `source_run`
- `source_skill_path`
- `promotion_status`
- `promotion_manifest`
- `summary`
- `when_to_use`
- `when_not_to_use`
- `inputs`
- `outputs`
- `steps`
- `failure_modes`
- `evidence_refs`
- `related_skills`
- `tags`
- `risk_level`
- `scope`
- `non_scope`
- `updated_at`

Markdown pages may express these fields as sections. Future schema work may add
frontmatter, but the validator should remain able to read the current Markdown
contract.

## Registry Contract

The registry record is the indexable surface, not the source of truth. It should
point to the wiki page and carry only the fields that help future agents find and
filter the skill.

Recommended registry fields:

- `id`
- `title` or `name`
- `type`
- `summary` or `description`
- `tags` or `capabilities`
- `source_path` or `original_source_path`
- `reusable_for` or `candidate_workflows`
- `risk_level`
- `verified_status` or `metadata.review_status`
- `evidence_refs` when available
- `scope`
- `non_scope`
- `updated_at`

Registry entries should avoid absolute local paths such as `file:///Users/...`.
Use repository-relative paths whenever possible.

## Retrieval Contract

The retrieval index should point to reusable assets only. It should never point
to a temporary training artifact unless that artifact has been promoted into a
durable wiki page or KB entry and is listed in a promotion manifest.

Recommended retrieval fields:

- `id`
- `type`
- `title`
- `summary`
- `tags`
- `source_path`
- `reusable_for`
- `risk_level`
- `verified_status`
- `evidence_refs`
- `sensitive_data_status`

## Validator Requirements

Run the wiki promotion validator after adding or changing a promoted skill wiki
entry:

```bash
node scripts/validate-skill-wiki-promotion.mjs
```

The validator should fail when:

- a promoted SkillOpt artifact has no promotion manifest;
- the manifest points to a missing wiki page, registry record, or retrieval
  record;
- wiki `source_run` and manifest `source_run` disagree;
- `source_skill_path` or `source_artifact` is missing;
- evidence refs are missing or point to sensitive local paths;
- `sensitive_data_status` is not `sanitized`;
- rejected or partial candidates appear in `skills/wiki/`;
- registry or retrieval entries point to temporary optimizer artifacts such as
  `history.json`, `runtime_state.json`, `optimizer-reflection.json`,
  `slow_update/`, or `meta_skill/`.

## Migration Rule For Existing Runs

Do not rewrite historical evidence just to make promotion metadata cleaner.
For existing promoted artifacts:

1. keep original run evidence stable;
2. add a `promotion` object to the optimization record;
3. add `promotion-manifest.json` under the source run;
4. add missing durable evidence files only when they summarize already-recorded
   information;
5. update wiki, registry, and retrieval records to point to the manifest;
6. document the change as traceability metadata, not a new run result.

## Non-Goals

- Do not promote raw `best_skill.md` output without normalization.
- Do not duplicate the same knowledge in the wiki page, registry, and KB if one
  primary home is sufficient.
- Do not publish sensitive runtime details, account identifiers, cookies,
  browser history, or other private state.
- Do not treat the wiki page as a substitute for scenario risk gating.
- Do not promote failed or partial candidates into the wiki just because the
  text looks useful.
- Do not let SkillOpt-style optimization bypass human review, account-state
  gates, risk gates, or proof requirements.

## Minimal Decision Rule

If a SkillOpt artifact is accepted and reusable:

- normalize it into a wiki page,
- register the page,
- index the page,
- write a source-run promotion manifest,
- and keep the evidence chain intact.

If it is not reusable, keep it as run evidence or failed evidence instead.
