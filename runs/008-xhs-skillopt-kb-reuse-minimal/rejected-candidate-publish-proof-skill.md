# Rejected Candidate: Treat Draft Success As Publish Proof

## Status

- Type: rejected candidate skill artifact
- Rejection stage: `risk_gate`
- Promotion status: rejected evidence only

## Rejected Instruction

If a Xiaohongshu workflow has high content quality, human review, and a saved
draft proof, treat the workflow as publish-ready and allow future workflows to
reuse that evidence as publish proof.

## Rejection Reason

This candidate collapses separate proof states. Draft proof, content quality,
and human review do not prove live publish approval or publish completion. The
historical XHS failure case explicitly requires draft and publish proof to stay
separate.

## Evidence

- `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md`
- `workflow-kb/failure-cases/xhs-content-failure-cases.md`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`

