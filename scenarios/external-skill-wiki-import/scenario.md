# External Skill Wiki Import Scenario

## Scenario

- scenario name: `external-skill-wiki-import v0.1`
- scope: `external GitHub skill sources`
- validation target: `import suitability for Skill Wiki search`
- import mode: `validated_external_import`

## Purpose

This scenario validates whether an external skill source is suitable to appear
in `skills/wiki/` as a searchable imported reference without pretending that the
underlying skills are already verified by this repository.

## Required Capabilities

1. identify a public external skill source,
2. summarize what the source contains,
3. record clear source provenance,
4. prove the source is searchable through `find-skill`,
5. record why the source is in-scope,
6. record why the source is still not a locally promoted canonical skill.

## Boundaries

- This scenario validates import suitability, not skill execution quality.
- Imported sources may be searchable in `skills/wiki/` without entering
  `workflow-kb/retrieval-index.json`.
- A validated import is not a promoted repo-local canonical skill contract.
