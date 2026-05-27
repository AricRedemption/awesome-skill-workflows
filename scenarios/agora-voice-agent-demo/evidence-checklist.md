# Agora Voice Agent Demo Evidence Checklist

## Purpose

Use this checklist before marking the scenario as passed, failed, blocked, or
promotion-ready.

## Required Evidence

- scenario identifier and run identifier
- run mode: `live_run`, `simulated_run`, `failed_run`, or `design_only`
- exact quickstart source reference used for the run
- workflow summary that maps source to execution steps
- runtime prerequisites and any missing dependency notes
- gate ledger or equivalent notes for risk decisions
- proof artifact references or explicit blocked/failure evidence
- sensitive-data review result
- outcome summary with pass/fail status

## Live Run Proof Checklist

- browser demo URL or launch target is recorded
- build or startup result is recorded
- browser-visible runtime state is captured
- agent response path or session behavior is evidenced
- proof artifact is tied to the same run being summarized
- no live-success claim depends only on unverified assistant narration

## Simulation Or Failure Checklist

- the reason for simulation or failure is explicit
- missing account, project, or credential dependency is named clearly
- the run does not claim live success
- failure evidence is preserved in a reusable form when possible
- next-step recommendation is scoped to the actual blocker

## Secret Safety Checklist

- no credentials are committed
- no `.env` files are committed
- no token or API key values appear in evidence
- no private account screenshots are stored without sanitization
- evidence uses sanitized classes instead of sensitive values

## Promotion Checklist

- failed or blocked runs stay out of `verified-recipes/`
- simulated-only runs stay out of `verified-recipes/`
- proof references are explicit
- risk gates are passed or clearly marked as blocking
- reusable lessons are separated from raw run artifacts

## Pass / Fail State Definitions

### Pass

All of the following are true:

- quickstart source gate passed,
- no risk gate failed,
- required evidence exists,
- secret safety passed,
- scenario score passed,
- runtime proof exists if the run claims `live_run`.

### Fail

Any of the following is true:

- a risk gate failed,
- quickstart source gate was skipped,
- live success was claimed without runtime proof,
- secrets or `.env` content were committed,
- the run was placed in a verified namespace without meeting promotion rules.

### Blocked

Use `blocked` when the main barrier is missing approval, missing credentials,
missing project access, or missing environment prerequisites, and the scenario
rule was not violated.

### Revision Required

Use `revision_required` when the workflow is recoverable but needs better
evidence, clearer scope, or a corrected setup before it can be judged again.
