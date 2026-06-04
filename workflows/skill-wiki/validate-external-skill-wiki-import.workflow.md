# Validate External Skill Wiki Import Workflow

## Goal

Validate that an external skill source can be represented in `skills/wiki/`
honestly, searchably, and with clear provenance.

## Steps

1. Select 1 to 2 external skill sources for a bounded scenario.
2. Confirm the repo is public and that the imported wiki page exists.
3. Verify the page contains provenance, summary, use / non-use boundaries, and
   import status.
4. Run `node scripts/find-skill.mjs "<query>"` with at least one natural query
   per source.
5. Record the result under `runs/<run-id>/`.
6. If all gates pass, mark the page `validated_external_import`.

## Terminal States

- `validated_external_import`
- `needs_revision`
- `rejected`
