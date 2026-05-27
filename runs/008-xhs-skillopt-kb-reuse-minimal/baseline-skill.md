# Baseline Skill: XHS KB Reuse Before New Content Workflow

## Status

- Type: baseline skill artifact for SkillOpt-style validation
- Source evidence: existing XHS workflow and Step 10 reuse run
- Promotion status: experimental baseline only

## Instruction

Before creating a new Xiaohongshu content workflow, query
`workflow-kb/retrieval-index.json` and reuse any matching verified workflow,
composition pattern, evaluation rubric, or failure case.

Generate a content package, score it with the Xiaohongshu rubric, and write back
new reusable lessons after the run.

## Known Gap

This baseline says to reuse KB entries, but it does not make the safety-critical
selection rules explicit:

- draft/publish proof must not be inferred from content quality,
- account-state evidence must stay a pre-handoff gate,
- failed publish evidence can be reused for content generation and risk design
  but not as compliant publish proof,
- candidate workflow changes should be accepted only when held-out evidence
  improves over the baseline.
