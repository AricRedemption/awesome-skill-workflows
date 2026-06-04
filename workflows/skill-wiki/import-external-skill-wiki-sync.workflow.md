# External Skill Wiki Sync Workflow

## Goal

Import external skill-library references into `skills/wiki/` as searchable
landing pages without mislabeling them as locally verified canonical skills.

## Terminal States

- `imported_unverified`
- `needs_review`
- `rejected`

## Steps

1. Discover external sources from GitHub, marketplaces, or prior repo ledgers.
2. Record the source repo, source URL, visibility signal, and intended scope.
3. Write a wiki page under `skills/wiki/` with `imported_external_unverified`
   status.
4. Keep the page limited to source summary, usage boundary, notable included
   skills, and failure boundaries.
5. Do not add a retrieval record in `workflow-kb/retrieval-index.json` unless
   the source later passes local validation and promotion rules.
6. Validate searchability through `node scripts/find-skill.mjs "<query>"`.
7. If a source should become canonical later, route it through a dedicated
   validation run and skill-wiki promotion flow.

## Verification

- `node scripts/find-skill.mjs "<source or capability query>"`
- Confirm the result path resolves to the expected `skills/wiki/*.md` page

## Non-Scope

- local scenario proof
- promotion-gate satisfaction
- workflow-kb durable promotion
