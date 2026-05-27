# AgoraIO Skills Raw Discovery

Source: https://github.com/AgoraIO/skills

Discovery date: 2026-05-27

## Discovery Summary

AgoraIO/skills is the official Agora skill pack for AI coding assistants. The
top-level repo README positions it as a fastest-path onboarding pack for
real-time conversational AI applications, voice agents, RTC calling, RTM chat,
recording, token/auth setup, and CLI-driven project initialization.

The actual skill entrypoint is `skills/agora/SKILL.md`. That file does not act
like a monolithic cookbook. It behaves as a route selector:

- choose exactly one primary route first,
- load only the matching product reference first,
- add supporting references only after the primary route is fixed,
- stop at the ConvoAI quickstart path if no working baseline exists,
- use Level 2 doc fetch only when the bundled references are insufficient.

Read source scope covered by this discovery pass:

- root `README.md`
- `skills/agora/SKILL.md`
- `references/conversational-ai/README.md`
- `references/rtc/README.md`
- `references/rtm/README.md`
- `references/cli/README.md`
- `references/server/README.md`
- `references/cloud-recording/README.md`
- `references/integration-patterns.md`

The source is product-specific and execution-oriented. It is useful for
candidate normalization, but it is not reusable verified knowledge for this
repository until an Agora-specific scenario run produces evidence, gate proof,
and human review.

## Integration Boundary

Use this source as an external pending candidate first:

- `source_group`: `P2_EXTERNAL_PENDING`
- `review_status`: `pending-review`
- `can_enter_candidate_pool`: `false`
- `requires_auth`: `true`
- `requires_human_review`: `true`

Do not promote Agora account behavior, credential handling, recording actions,
or live session operations into Layer 1 rules. Account, authorization, recording,
and externally visible behavior must be scoped under an Agora-specific scenario
before execution.

## Raw Capability Surface

Source-grounded capability areas exposed by AgoraIO/skills:

- **ConvoAI / Voice Agent**: official quickstart-first onboarding, baseline
  proof, SDK-vs-REST routing, Studio Agent path, client toolkit path, direct
  REST/API path, provider/vendor lookup boundary.
- **RTC**: calls, livestream, screen share, track lifecycle, event ordering,
  token renewal, cross-platform codec and UID coordination.
- **RTM**: signaling, chat, presence, metadata, transcript delivery, RTM-v2-only
  client patterns, RTC/RTM identity coordination.
- **Cloud Recording**: REST recording lifecycle `acquire -> start -> query ->
  stop`, mode selection, auth model, TTL/error handling.
- **Token/Auth**: server-side token generation, App Certificate boundary, RTC
  and RTM token roles, AccessToken2, no client-side certificate exposure.
- **Agora CLI**: login, project binding, `init`, quickstart env writing,
  readiness checks, doctor flows, introspection, machine-readable automation.
- **Cross-product workflows**: RTC + RTM, RTC + ConvoAI, RTC + RTM + ConvoAI,
  init order, token matrix, channel-name convention, cleanup order.
- **Server Gateway**: top-level route exists in `SKILL.md`, but this discovery
  pass did not inspect its dedicated reference file because it was outside the
  requested source list.

## Route Selection Rules

Top-level routing extracted from `skills/agora/SKILL.md`:

- **RTC first** for human-to-human audio/video, livestream, screen share,
  join/publish/subscribe flows.
- **RTM first** for chat, signaling, presence, metadata, notifications.
- **ConvoAI first** for AI voice agents, voice bots, provider choice, Studio
  Agent ID reuse, agent backend work.
- **CLI first** for local onboarding with `agora`, login, project selection,
  `init`, quickstart binding, env writing, doctor/introspection, MCP serving.
- **Cloud Recording first** for acquire/start/query/stop recording lifecycle.
- **Server first** for token generation, auth server, App Certificate usage.
- **Cross-product coordination first** when the question is mainly about RTC +
  RTM + ConvoAI initialization order, UID strategy, token matrix, or cleanup.

Multi-product routing rules explicitly stated by the source:

- video call + chat -> RTC first, then RTM
- AI voice assistant -> ConvoAI first; RTC client is expected, RTM optional
- AI voice assistant + chat history/transcripts -> ConvoAI first, then RTM and
  integration patterns
- RTC recording -> Cloud Recording first, then RTC if client details matter

Ambiguity rules explicitly carried by the source:

- token server / auth / App Certificate -> Server
- start agent / call ConvoAI API / agent lifecycle -> ConvoAI
- server sends or receives media in channel -> Server Gateway
- choose the product closest to the user goal, not the lowest-level dependency

## Candidate Capability Bundles

- `agora-conversational-ai-quickstart`
- `agora-rtc-integration`
- `agora-rtm-messaging`
- `agora-token-server`
- `agora-cli-project-onboarding`
- `agora-cloud-recording`
- `agora-server-gateway`
- `real-time-voice-agent-integration`

## Guardrails Observed In Source

- **ConvoAI baseline gate**: if there is no proven working baseline, use the
  official quickstart/sample first and do not scaffold custom code from memory.
- **CLI readiness gate**: before mutating CLI commands, verify `agora version`,
  PATH resolution, minimum supported version, and doctor support.
- **Token/security boundary**: never expose App Certificate on clients; token
  generation stays server-side; warn when token auth is disabled or impossible.
- **RTM v2 only**: do not apply RTM v1 APIs or patterns to the current RTM
  module.
- **Runtime proof requirement**: sample startup commands and readiness checks
  are treated as proof gates before declaring success, especially for ConvoAI.
- **Reference discipline**: Agora skill files are the source of truth; do not
  replace them with blog-post or memory-derived integrations.

## Suggested Repository Placement

- raw source capture: `skills/raw-discovery/agora-skills.md`
- normalized pending candidate: `skills/normalized-candidates/agora-real-time-ai-integration.md`
- pending source-review ledger stays in:
  `skills/raw-discovery/pending-review-candidates.md`
  `skills/raw-discovery/pending-review-candidates.json`

Do not place this discovery into:

- `workflow-kb/`
- `verified-recipes/`
- `workflow-kb/verified-workflows/`

until an Agora-specific scenario produces verified evidence.

## Promotion Blockers

This source is not promotion-ready because:

1. no Agora-specific scenario boundary exists yet,
2. no run evidence proves ConvoAI/RTC/RTM/CLI flows in this repository,
3. no human-reviewed credential/token/recording risk gate exists,
4. no runtime proof shows the official baseline works end to end,
5. no promotion evidence exists for reusable workflow knowledge,
6. server-gateway details were not normalized in this pass because its dedicated
   reference file was outside the requested read set.

## Next Validation Scenarios

- `scenarios/agora-voice-agent-baseline/`: official ConvoAI quickstart baseline
  with runtime proof and human-reviewed auth boundary.
- `scenarios/agora-rtc-rtm-chat/`: RTC + RTM dual-client coordination, UID
  strategy, channel-name convention, transcript/event delivery.
- `scenarios/agora-token-server/`: RTC + RTM token issuance and renewal with
  App Certificate boundary proof.
- `scenarios/agora-cloud-recording/`: acquire/start/query/stop flow with
  explicit participant-presence proof and storage config review.
