# Agora Voice Agent Demo Scenario

## Scenario

- scenario name: `agora-voice-agent-demo v0.1`
- platform: `agora browser voice agent demo`
- validation target: `agent can use AgoraIO/skills to assemble and verify a browser AI Voice Agent demo from zero to one`
- demo direction: `official quickstart grounded browser voice interaction`
- primary outcome: `validated demo run with evidence, or a failed run with preserved failure evidence`

## Purpose

This scenario validates whether the core skill-workflow architecture can support
a real build-and-verify developer workflow around an Agora browser voice agent
demo without letting Agora-specific assumptions become the architecture itself.

This scenario is only a validation wrapper. It does not define Layer 1 skill
contracts, workflow composition rules, scoring architecture, promotion logic, or
knowledge-base structure.

## Scenario Boundary

- Agora-specific setup, account constraints, quickstart checks, runtime proof,
  and secret-handling rules stay inside this scenario and its run evidence.
- Generic skill discovery, workflow composition, scoring mechanics, evidence
  capture structure, and knowledge writeback remain Layer 1 concerns.
- This scenario may require AgoraIO/skills as an input source, but it must not
  redefine generic skill packaging rules for other scenarios.
- A successful Agora run proves that the architecture can validate this
  developer workflow. It does not prove that Agora patterns are reusable across
  all scenarios.

## Allowed Behavior

1. Read and analyze `AgoraIO/skills` or other explicitly approved official
   Agora quickstart sources as scenario inputs.
2. Design a scenario-local workflow that maps available skills into a browser AI
   voice agent demo path.
3. Run the official quickstart, or simulate it when runtime prerequisites are
   missing, as long as the run mode is recorded clearly.
4. Inspect build logs, browser logs, local runtime output, screenshots, or
   other non-secret proof artifacts needed to verify the demo state.
5. Record run evidence, gate decisions, blocked states, and reusable
   observations in the approved evidence locations.
6. Write failed-but-useful evidence into `runs/`, `failed-recipes/`, or
   `workflow-kb/failure-cases/` when the promotion rules permit it.

## Prohibited Behavior

- Do not commit credentials, access tokens, API keys, `.env` files, or secret
  runtime dumps.
- Do not skip the quickstart source gate. If the workflow claims to follow an
  official quickstart path, the source used must be identified in evidence.
- Do not place failed, blocked, simulated-only, or unverified runs into
  `verified-recipes/`.
- Do not claim live success without runtime proof from a real local or hosted
  execution path.
- Do not present mocked screenshots, speculative success summaries, or
  unverified assistant claims as runtime proof.
- Do not promote Agora-specific constraints into Layer 1 docs, schemas,
  reusable workflows, or global rules from this scenario alone.

## Required Capabilities

1. discover and read approved Agora source materials,
2. map scenario capabilities and constraints,
3. compose a browser voice agent workflow,
4. prepare local environment assumptions and secret boundaries,
5. execute or explicitly simulate the quickstart path,
6. verify runtime behavior with proof artifacts,
7. score implementation and evidence quality,
8. record review and risk-gate outcomes,
9. preserve failure evidence when verification fails,
10. write sanitized reusable conclusions back to the knowledge base only after
    the promotion rules are satisfied.

## Minimum Workflow Path

1. identify the exact Agora source path to use,
2. confirm quickstart source gate status,
3. inspect required skills and runtime prerequisites,
4. compose the scenario-local workflow,
5. classify the run mode as `live_run` or `simulated_run`,
6. execute or simulate the build-and-run path,
7. collect runtime proof or explicit failure evidence,
8. score the outcome,
9. evaluate risk gates and human-review requirements,
10. write sanitized evidence to the correct evidence namespace.

## Run Modes

- `live_run`: the demo was actually built and reached a verifiable runtime
  state with proof.
- `simulated_run`: the workflow was designed and partially exercised, but a
  required runtime dependency, account permission, or secret was unavailable.
- `failed_run`: the agent attempted the path and captured failure evidence.
- `design_only`: workflow design exists, but no execution or simulation
  evidence was produced.

`simulated_run`, `failed_run`, and `design_only` are not live-success states.

## Verification Claim Rules

- A claim of `live_success` requires runtime proof tied to the exact demo path.
- Acceptable runtime proof may include sanitized terminal output, browser
  screenshots, served URL evidence, audio/session logs, or explicit verification
  notes that show the demo reached the expected state.
- A build success without a runnable browser demo is not enough to claim
  end-to-end success.
- A scenario pass requires both outcome quality and evidence quality. A working
  demo with missing proof is still a failed verification state.

## Evidence Writeback Rule

The scenario is not verified until the run outcome, review notes, gate results,
and proof references are captured in the approved evidence path. Reusable
knowledge extracted from the run must stay sanitized and must not include
credentials, secret values, or private account state.
