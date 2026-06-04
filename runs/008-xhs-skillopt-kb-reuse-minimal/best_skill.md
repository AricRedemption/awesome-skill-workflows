# Candidate Skill: XHS KB Reuse With Selection-Gated Safety Rules

## Status

- Type: candidate skill artifact for SkillOpt-style validation
- Source evidence: existing XHS failure, draft rerun, and KB reuse evidence
- Promotion status: accepted candidate for experimental run only

## Instruction

Before creating a new Xiaohongshu content workflow, query
`workflow-kb/retrieval-index.json` and reuse any matching verified workflow,
composition pattern, evaluation rubric, or failure case.

Apply these selection-gated rules before accepting a reused or edited workflow:

1. Reuse `draft_verified` XHS workflows for draft-safe content generation, gate
   design, and proof-chain structure only.
2. Reuse failed publish evidence as negative evidence. It may improve content
   generation and risk prevention, but it must not be treated as compliant
   publish proof.
3. Keep account state as a hard pre-handoff gate. If account state is unknown,
   stop before draft or publish action.
4. Keep draft and publish proof separate. A quality score, human review, or
   draft save is not publish proof.
5. Accept a candidate workflow change only when held-out evidence improves the
   selected metric and does not weaken human review, risk approval,
   account-state, mode, platform handoff, proof verification, or promotion
   gates.

## Export Boundary

This candidate does not authorize browser automation, draft creation, live
publish, or recipe promotion. It only tightens the KB-first reuse behavior for
future XHS content workflow composition.
