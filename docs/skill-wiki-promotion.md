# Skill Wiki Promotion

## Purpose

This document defines how a SkillOpt-style artifact becomes a durable skill wiki
entry and how that entry is made discoverable to other agents.

The promotion goal is not to copy raw training output into a wiki. The goal is
to turn a validated candidate skill into a stable, searchable, reusable wiki
page with a registry record and retrieval hooks.

## Terms

- **SkillOpt artifact**: the accepted candidate output from a skill optimization
  run, typically centered on `best_skill.md` plus the run-state and score
  artifacts.
- **Skill wiki entry**: the human-readable canonical skill page that explains
  what the skill does, when to use it, when not to use it, and what evidence
  supports it.
- **Registry entry**: the machine-readable record used by other agents to find
  the wiki page quickly.
- **Retrieval entry**: the cross-knowledge-base index record used to discover
  reusable assets during future runs.

## Canonical Flow

1. Start from an accepted SkillOpt artifact under `runs/<run-id>/`.
2. Confirm the run passed the selection gate and any required scenario risk
   gates.
3. Extract the reusable instruction, scope, non-scope, evidence references, and
   failure boundaries.
4. Write or update the canonical wiki page at `skills/wiki/<skill-id>.md`.
5. Write or update the skill registry record in `skills/index.json`.
6. Write or update the retrieval record in `workflow-kb/retrieval-index.json`
   when the wiki page is meant to be discoverable in future runs.
7. If the run also produced a reusable workflow pattern, failure case, rubric,
   or fallback strategy, store that derivative asset in `workflow-kb/` rather
   than duplicating the same content in the wiki page.

## Promotion Gates

A SkillOpt artifact may become a skill wiki entry only when all of the following
are true:

- the run has a valid evidence chain under `runs/<run-id>/`
- the baseline and candidate scores are recorded and consistent with the score
  artifact
- the selected candidate passed the held-out selection gate
- all required scenario risk gates passed
- the candidate does not rely on sensitive local runtime state
- the extracted skill page includes explicit scope and non-scope boundaries
- the registry entry points to the wiki page
- the retrieval entry points to the reusable asset and not to temporary run
  notes

If any gate fails, keep the artifact in `runs/` and write the lesson to
`evolution/` or a failed namespace instead of promoting it to the wiki.

## Wiki Page Contract

Every promoted wiki page should include:

- `id`
- `name`
- `source_run`
- `source_skill_path`
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

The page should stay concise enough for retrieval, but complete enough that a
future agent can decide whether the skill applies without opening the full run
history.

## Registry Contract

The registry record should be the indexable surface, not the source of truth.
It should point to the wiki page and carry only the fields that help other
agents find and filter the skill.

Recommended registry fields:

- `id`
- `title`
- `type`
- `summary`
- `tags`
- `source_path`
- `reusable_for`
- `risk_level`
- `verified_status`
- `evidence_refs`
- `scope`
- `non_scope`
- `updated_at`

## Retrieval Contract

The retrieval index should point to reusable assets only. It should never point
to a temporary training artifact unless that artifact has been promoted into a
durable wiki page or KB entry.

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

## Non-Goals

- Do not promote raw `best_skill.md` output without normalization.
- Do not duplicate the same knowledge in the wiki page, registry, and KB if one
  primary home is sufficient.
- Do not publish sensitive runtime details, account identifiers, cookies,
  browser history, or other private state.
- Do not treat the wiki page as a substitute for scenario risk gating.
- Do not promote failed or partial candidates into the wiki just because the
  text looks useful.

## Minimal Decision Rule

If a SkillOpt artifact is accepted and reusable:

- normalize it into a wiki page,
- register the page,
- index the page,
- and keep the evidence chain intact.

If it is not reusable, keep it as run evidence or failed evidence instead.
