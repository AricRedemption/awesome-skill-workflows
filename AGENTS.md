# Agent Guide

This project is an AI agent skill workflow framework. It is not a single-scenario tool and not a business application. Keep all work aligned with the core goal: turn repeatable workflows into reusable, measurable, and improvable skill assets.

## Project Identity

- Layer 0 is raw evidence: concrete runs, proof, scores, gates, failures, and optimizer artifacts.
- Layer 1 is the core skill architecture: reusable skills, workflow composition, schemas, validators, scoring contracts, and generic action-verification rules.
- Layer 2 is skill evolution and optimization: bounded candidate edits, held-out selection, and accepted/rejected candidate evidence.
- Layer 3 is the durable knowledge surface: skill wiki pages, workflow-KB assets, registry entries, and retrieval records.
- Layer 4 is the scenario layer: each scenario is a replaceable validation wrapper around the core architecture.
- Do not let any scenario define the base architecture. Scenario-specific assumptions must stay under that scenario's files in `scenarios/`, scenario-specific `runs/`, or scenario-specific workflow assets.
- Xiaohongshu is only the current v0.1 scenario, not a global rule source.

## Directory Boundaries

- `skills/`: reusable skill assets, wiki pages, and capability maps.
- `workflows/`: workflow definitions and orchestration patterns.
- `scenarios/`: scenario-specific validation wrappers, constraints, risk rules, and scoring rubrics.
- `workflow-kb/`: durable reusable knowledge, retrieval entries, patterns, rubrics, fallback strategies, and failure cases.
- `runs/`: records from specific workflow runs. Treat run records as evidence, not reusable truth by themselves.
- `evolution/`: evidence-backed improvement notes and self-evolution outputs.
- `evolution-drafts/`: pending, approved, and rejected proposals for upgrading repeated lessons into long-lived agent rules.
- `verified-recipes/`: recipes promoted only after verification, human review, and reuse evidence.
- `failed-recipes/`: failed recipes that still produced reusable evidence.
- `docs/`: architecture, principles, scoring, self-evolution, and scenario boundary documentation.
- `reports/`: generated summaries and review outputs.
- `schemas/`: JSON schemas for workflow, skill, scoring, gate, recipe, and verification records.
- `TOOLS.md`: durable tool, command, environment, path, and platform usage notes promoted through approved evolution drafts.
- `MEMORY.md`: durable project-local preferences and facts promoted through approved evolution drafts.

## Operating Rules

- Start from `README.md`, `SKILL.md`, and the directly relevant docs before changing assets.
- Keep Layer 1 scenario-agnostic. Do not hard-code any platform, account behavior, or scenario-specific constraint into generic skill or workflow rules.
- When a task touches a scenario, read that scenario's own files first and keep its rules local to that scenario.
- Use evidence from `runs/`, human review, scoring output, or verified failures before promoting a pattern.
- Do not promote speculative ideas, unreviewed shortcuts, or large unverified prompt dumps into `workflow-kb/` or `verified-recipes/`.
- Store failed evidence only under explicit failed locations such as `failed-recipes/` or `workflow-kb/failure-cases/`.
- Keep every reusable knowledge item in one primary home. Link to it instead of duplicating it across many files.

## Skill Optimization Rules

This project may use SkillOpt-style optimization as a Layer 2 method for
improving reusable skill documents from scored rollout evidence. See
`docs/skillopt-integration.md`.

- Treat SkillOpt-style work as generic skill optimization, not as a Xiaohongshu, Agora, or platform-specific scenario rule.
- Keep the target agent, harness, scoring method, and evidence split explicit before proposing edits to a skill.
- Prefer bounded `add`, `delete`, and `replace` edits over full rewrites. A full rewrite needs an explicit reason and validation plan.
- Accept a candidate skill only when held-out selection evidence improves over the baseline and required scenario risk gates still pass.
- Preserve rejected edits with their score drop or failure reason when they provide reusable negative evidence.
- Do not export optimizer-side memory, rejected-edit buffers, or slow/meta notes as deployed skill instructions unless they pass the normal promotion gates.
- Do not vendor external SkillOpt code, benchmark data, or generated prompt dumps into this repository without a separate dependency, license, and evidence review.

## Execution Discipline

These rules adapt general LLM coding guardrails to this workflow framework. They bias toward clear, small, evidence-backed changes.

- State important assumptions before changing architecture, schemas, workflows, recipes, or promotion rules. If the task has multiple plausible meanings, name the interpretation you are using instead of silently choosing.
- Do not hide uncertainty. If required evidence, approval state, scenario authority, or success criteria are missing, say what is missing and pause or route the work to the smallest safe evidence-gathering step.
- Prefer the smallest asset change that satisfies the requested workflow outcome. Do not add speculative framework features, configurability, fallback paths, or abstractions unless current evidence requires them.
- Prefer a simpler workflow, skill boundary, or evidence path when it meets the goal. If rejecting a simpler path, record the concrete evidence or constraint that makes the larger design necessary.
- Do not add defensive handling for states that the workflow contract says are impossible. Fix the contract, validator, or evidence source instead of masking contract confusion with extra branches.
- Keep edits surgical. Every changed line should trace to the user's request, a validator failure, review feedback, or captured run evidence.
- Match existing file structure, naming, and style. Mention unrelated cleanup opportunities instead of applying them opportunistically.
- When you discover unrelated risk, weak design, stale evidence, dead assets, or validator gaps, report it as a finding with file/evidence context. Do not refactor, delete, migrate, or promote assets to fix it unless the user asks or the risk directly blocks the current task.
- Clean up only artifacts made obsolete by the current change. Do not delete pre-existing dead, duplicate, or weak assets unless the task explicitly includes that cleanup.
- Convert broad requests into verifiable goals before execution, such as a specific schema check, promotion-gate validation, acceptance report, or run-evidence update.
- For multi-step changes, pair each step with the narrowest relevant verification before moving on. Weak goals like "make the workflow better" are not enough for promotion-sensitive work.
- Before reporting completion, inspect the final diff and validation output. If the diff contains unrelated changes, speculative assets, or unverified promotion-sensitive edits, remove them or report the remaining issue clearly.
- When browser or Chrome-based QA is needed, prefer Codex-provided Browser or Chrome capabilities first. Do not default to ad-hoc command-line Chrome flows unless Codex browser capabilities are unavailable and the fallback is explicitly justified by the task.

## Scenario And Risk Rules

- Root rules define only general safety boundaries. Scenario files define scenario-specific risk gates.
- High-risk operations require human review before execution.
- Irreversible or externally visible actions must not be fully autonomous unless a scenario explicitly defines and approves that behavior.
- Account-state, authorization, compliance, and platform-fit checks belong in the relevant scenario boundary, not in Layer 1.
- Do not automate platform manipulation, account farming, large-scale scraping, or privacy data collection as generic workflow behavior.
- If a scenario risk gate fails, move the run into revision or a scenario-approved fallback path.
- For the current Xiaohongshu scenario, use `scenarios/xiaohongshu-creator/scenario.md` and `scenarios/xiaohongshu-creator/risk-boundary.md` as the scenario-specific authority.

## Knowledge Base Rules

- Query `workflow-kb/` before starting a new run when prior knowledge may apply.
- After a verified run, write back the outcome, review feedback, reusable pattern, or failure case at the smallest durable level supported by evidence.
- `workflow-kb/retrieval-index.json` should point to reusable knowledge assets, not temporary run notes.
- A workflow is not verified until the run outcome and review feedback are captured in the knowledge base.
- Research or raw discovery is evidence. It becomes reusable workflow knowledge only after validation or explicit promotion.
- SkillOpt-style artifacts may be promoted into the skill wiki only through `docs/skill-wiki-promotion.md`; the promotion must update the wiki page, registry entry, and retrieval entry together.

## Submission And Promotion Rules

This project does not currently define a conventional git commit-message policy, and this directory may be used outside a git repository. The important rule is asset promotion: do not place an asset in a verified namespace unless the evidence gates support it.

- Do not store failed recipes under `verified-recipes/`.
- Do not store failed workflows under `workflow-kb/verified-workflows/`.
- Store failed but useful evidence under `failed-recipes/`, `workflow-kb/failed-workflows/`, or `workflow-kb/failure-cases/`.
- A promoted recipe or workflow must have explicit evidence references, not only a successful-looking final artifact.
- A quality score is not human approval, risk approval, account-state proof, or publish/draft proof.
- For account-bound workflows, keep these states separate: content quality passed, human review passed, risk approval passed, account state passed, mode approval passed, platform handoff happened, proof verification passed, recipe promotion approved.
- For Xiaohongshu draft validation, verified promotion requires passed human review, passed risk approval, passed account-state check, compliant draft proof, and `clicked_publish=false`.
- Live publish promotion requires explicit `human_review_then_publish` approval before the publish command starts. A publish fact without ordering proof is failure evidence, not verified publish proof.
- If a run is incomplete, blocked, or missing gate evidence, keep it in `runs/` and write only an `evolution/` note or failure case. Do not promote it.
- Do not publish SkillOpt outputs into the skill wiki unless they satisfy `docs/skill-wiki-promotion.md` and have a stable registry and retrieval record.
- When changing promotion-sensitive files, run `node scripts/validate-promotion-gates.mjs` before reporting completion.

## Git Commit Rules

When this project is inside a git repository and the user asks to commit, use these rules:

- Check the working tree before staging. Do not stage unrelated user changes.
- Make the transformation itself atomic. Split a larger change into the smallest meaningful steps before editing, such as schema change, validator change, workflow asset update, KB writeback, report update, and rule update.
- Do not finish a multi-part refactor or workflow evolution and then submit it as one large commit. Each finished step should be independently understandable, reviewable, and revertible.
- Keep commits atomic by topic and intent. Do not bundle unrelated workflow, schema, report, run-record, KB, and rule changes unless they are inseparable parts of the same verified unit.
- Close each atomic step as `edit -> relevant validation -> commit` before starting the next step, unless the user explicitly asks not to commit yet.
- If an atomic step cannot pass validation alone because it depends on the next step, state that dependency and keep the combined commit as small as possible.
- Use one concise English Conventional Commit message per atomic change, such as `docs: add workflow promotion rules` or `test: tighten promotion gate validation`.
- Use normal `git commit` so hooks remain the primary gate. Do not use `--no-verify` unless the user explicitly authorizes it and equivalent validation has already passed.
- If hooks or checks ask for verification evidence, answer them with the actual commands and results.
- Do not commit temporary execution plans, scratch notes, raw browser logs, local cookies, local credentials, or one-off verification dumps.
- Commit durable evidence only when it belongs to the project model: run records under `runs/`, evolution notes under `evolution/`, reusable KB assets under `workflow-kb/`, verified recipes under `verified-recipes/`, failed recipes under `failed-recipes/`, and reports under `reports/`.
- Before committing promotion-sensitive assets, run `node scripts/validate-promotion-gates.mjs`.
- Before committing MVP acceptance changes, run `node scripts/validate-mvp-acceptance.mjs`.
- If validation cannot be run, do not present the commit as fully verified; state the blocker clearly.

## Self-Evolution Rules

Trigger self-evolution when evidence shows:

- a required quality, compliance, or platform-fit threshold failed,
- human feedback identifies a missing gate, unsafe ordering, unclear handoff, or wrong assumption,
- verification shows the workflow result does not match the requested action,
- a run produces a reusable failure case or prevention rule.

Use the smallest correct writeback:

- `evolution/` for run-specific improvement notes,
- `workflow-kb/failure-cases/` for reusable failures and prevention rules,
- `workflow-kb/retrieval-index.json` for searchable reusable assets,
- `verified-recipes/` only after verification, human review, and reuse evidence are complete.

Use `evolution-drafts/` when a run-level lesson should become a long-lived rule
in `AGENTS.md`, `TOOLS.md`, `MEMORY.md`, or a managed `SKILL.md`. Draft first
and wait for user approval; do not directly rewrite those target files from a
single run.

When writing self-evolution records, include the learning loop: what went wrong,
what was learned, what changed, evidence references, validation performed, and
what remains unverified.

## Validation Commands

- MVP acceptance: `node scripts/validate-mvp-acceptance.mjs`
- Evolution drafts: `node scripts/validate-evolution-drafts.mjs`
- Sensitive boundaries: `node scripts/validate-sensitive-boundaries.mjs`
- Skill optimization: `node scripts/validate-skill-optimization.mjs`
- Official SkillOpt probe: `node scripts/probe-official-skillopt.mjs`
- Official SkillOpt readiness: `node scripts/validate-skillopt-official-readiness.mjs`
- Official SkillOpt smoke dry-run: `node scripts/run-official-skillopt-smoke.mjs --dry-run`
- Official SkillOpt smoke output: `node scripts/validate-official-skillopt-smoke-output.mjs --allow-missing`
- Promotion gates: `node scripts/validate-promotion-gates.mjs`

Run the narrowest relevant validator after changing schemas, recipes, workflow KB entries, or promotion evidence.

## Completion Standard

Before saying work is complete, report:

- what changed,
- which files were touched,
- what evidence or validator was used,
- and whether anything still needs human review or future verification.
