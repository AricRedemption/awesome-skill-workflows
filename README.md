# awesome-skill-workflows

`awesome-skill-workflows` is **not** a Xiaohongshu tool.

## What This Project Is

This repository is a framework for:

1. Skill Aggregation
2. Skill Self-Evolution
3. Workflow Knowledge Base

The long-term goal is to turn repeatable workflows into reusable, measurable, and improvable skill assets.

## v0.1 Validation Scenario

Version `v0.1` uses **Xiaohongshu AI tool content publishing** as the validation scenario.

This scenario exists only to validate the platform design:

- the core skill architecture can absorb a real workflow
- the workflow can be reviewed by a human before high-risk actions
- success and failure can be captured into the knowledge base
- the system can reuse prior work in a second scenario

## MVP Acceptance Loop

The MVP is considered complete only when the following loop works end to end:

1. define a workflow scenario
2. capture raw discovery
3. structure it into skills, workflows, and recipes
4. run or simulate the workflow
5. record results, failures, and reusable patterns
6. feed the outcome back into the workflow knowledge base
7. use the updated knowledge base in the next run

## Repository Layout

- `docs/`: architecture, principles, scoring, and scenario boundaries
- `skills/`: reusable skill assets
- `workflows/`: workflow definitions and orchestration layer
- `scenarios/`: scenario-specific validation wrappers
- `workflow-kb/`: knowledge assets and retrieval index, including verified assets and explicitly failed evidence
- `runs/`: scenario run records
- `evolution/`: self-evolution outputs and refinement artifacts
- `verified-recipes/`: proven reusable recipes
- `failed-recipes/`: recipes that produced reusable evidence but failed promotion gates
- `reports/`: generated summaries and review outputs
