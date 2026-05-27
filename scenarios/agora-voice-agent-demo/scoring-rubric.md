# Agora Voice Agent Demo Scoring Rubric

## Purpose

This rubric evaluates whether an Agora browser AI voice agent demo run produced
enough implementation quality, verification quality, and reusable evidence to
count as a successful scenario validation.

## Total

- Maximum score: 100
- Scenario pass threshold: `total_score >= 80`
- Mandatory minimums:
  - `quickstart_grounding >= 15/20`
  - `runtime_verification >= 15/20` for `live_run`
  - `secret_safety >= 10/10`
  - no failed risk gate
- Promotion note:
  - a passing score alone does not authorize `verified-recipes/` promotion

## Dimensions

### 1. Quickstart Grounding: 20

- 18-20: The run identifies the exact official or approved source, follows it
  coherently, and records source-to-step mapping.
- 13-17: The source is present but mapping is incomplete or partially inferred.
- 0-12: The source path is unclear, skipped, or contradicted by the run.

### 2. Workflow Design Quality: 15

- 13-15: The workflow is clear, minimal, scenario-local, and does not pollute
  Layer 1.
- 9-12: The workflow is mostly usable but has ambiguous steps or minor scope
  leakage.
- 0-8: The workflow is unclear, overbuilt, or mixes scenario rules into core
  architecture.

### 3. Environment And Setup Discipline: 10

- 9-10: Runtime prerequisites, local assumptions, and setup limits are explicit.
- 6-8: Setup is mostly usable but misses some prerequisites or labels.
- 0-5: Setup state is unclear or unsafe.

### 4. Runtime Verification Quality: 20

- 18-20: Runtime proof clearly shows the browser voice demo reached the intended
  state.
- 13-17: The demo likely ran, but proof is partial or indirect.
- 0-12: There is no credible runtime proof, or the run is only simulated.

### 5. Evidence Quality And Traceability: 15

- 13-15: Evidence is well scoped, sanitized, and traceable from source to run
  outcome.
- 9-12: Evidence is usable but some links, labels, or proof references are weak.
- 0-8: Evidence is incomplete, ambiguous, or not reusable.

### 6. Secret Safety And Boundary Discipline: 10

- 10: No secrets committed, no `.env` leakage, and scenario boundaries are kept
  local.
- 6-9: Minor evidence hygiene issues need cleanup, but no secret leaked.
- 0-5: Secret handling or boundary discipline failed.

### 7. Reuse Potential: 10

- 9-10: The run captures reusable lessons, failure cases, or validation
  patterns without overclaiming.
- 6-8: Some useful lessons exist, but reuse value is limited.
- 0-5: The run yields little reusable knowledge.

## Scoring Rules

- `live_run` may receive full runtime-verification points.
- `simulated_run` or `design_only` cannot score above `10/20` on runtime
  verification and cannot enter live-success status.
- Any secret-handling violation sets `secret_safety=0`.
- Any failed risk gate forces overall scenario result to `fail` regardless of
  total score.
- A run that lacks quickstart source attribution cannot pass the scenario.

## Human Review Notes

- Review whether the workflow stayed scenario-local and did not redefine Layer 1.
- Review whether claimed live results match the proof artifact.
- Review whether external provider dependencies were disclosed clearly.
- Review whether any reusable conclusions are supported by sanitized evidence.
