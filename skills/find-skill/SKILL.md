# Skill: find-skill

Find Skill for this repository's Skill Wiki only.

## Purpose

- Find canonical skill wiki entries relevant to a user request
- Restrict search to `skills/wiki/*.md`
- Return the smallest useful set of wiki matches before composing or reusing a skill

## Data Boundary

- Allowed source: `skills/wiki/*.md`
- Read only the final landed wiki page content itself
- Do not search `workflow-kb/verified-workflows`, `failure-cases`, `runs/`, or external sources
- Do not use `workflow-kb/retrieval-index.json` or `skills/index.json` to enrich search results

## Inputs

- user query
- optional result limit

## Outputs

- ranked skill wiki matches
- matched wiki path
- summary and snippet for each match

## Steps

1. Run `node scripts/find-skill.mjs "<query>"`.
2. Read the top matching `skills/wiki/*.md` page if a detailed answer is required.
3. Reuse only the canonical landed wiki instruction surface, not temporary run notes or process metadata.

## When To Use

- When the task asks for an existing reusable skill rule or skill pattern
- When a workflow should search the Skill Wiki before inventing new instructions
- When the user wants Find Skill behavior constrained to this repository's wiki

## When Not To Use

- When evidence must come from `runs/` or scenario-specific workflow assets
- When the task is about general workflow KB retrieval rather than skill wiki lookup
