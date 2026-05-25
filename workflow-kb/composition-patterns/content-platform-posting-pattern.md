# Content Platform Posting Pattern

## Purpose

A reusable composition pattern for turning a topic into a platform-ready post package without hard-coding one platform. It applies to Xiaohongshu, LinkedIn, Twitter/X, newsletters, community forums, and other account-bound content platforms.

## Pattern

1. Scenario intake: capture audience, platform, topic, risk boundary, and requested handoff mode.
2. Platform fit research: identify tone, structure, media, metadata, and engagement norms.
3. Content package generation: produce title or hook, cover or first-line copy, body, tags, and comment or reply hook.
4. Save-worthiness or action-worthiness check: ensure the post gives the reader a reusable template, checklist, example, or concrete next action.
5. Quality and compliance scoring: score platform fit, usefulness, clarity, risk, and policy constraints.
6. Human review gate: require explicit review before any irreversible or account-bound action.
7. Account-state precheck: verify login, authorization, and correct account context before draft or publish handoff.
8. Handoff execution: save draft or publish only in the approved mode.
9. Verification: record draft/publish identifiers, screenshots, logs, timestamps, and gate ordering proof.
10. Knowledge writeback: store reusable workflow, recipe, rubric, failure case, fallback, and prompts.

## Why It Generalizes

- A platform-specific style layer can change without changing the gate structure.
- Draft and publish are both account-bound operations, so account-state checks are generic.
- Human review protects all platforms where publication affects reputation, compliance, or account state.
- Verification always needs two layers: action fact and compliant proof.

## Required Fallbacks

- If platform style research is unavailable, use the topic and known audience pains to produce a conservative draft.
- If content score fails, return to content generation or workflow improvement.
- If human review fails, revise or stop at draft package.
- If account state fails, stop before platform handoff.
- If publish fails, save draft-only when allowed; otherwise output a draft package and failure reason.

## Do Not Do

- Do not treat one successful publish fact as proof of a verified workflow.
- Do not publish when the requested mode is draft-only.
- Do not bypass human review because numeric score is high.
- Do not hide platform-specific risks inside generic content scoring.
