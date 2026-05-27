# Agora Real-Time AI Integration Candidate

Status: normalized candidate only
Source: `https://github.com/AgoraIO/skills`
Authority files:

- `README.md`
- `skills/agora/SKILL.md`
- `skills/agora/references/conversational-ai/README.md`
- `skills/agora/references/rtc/README.md`
- `skills/agora/references/rtm/README.md`
- `skills/agora/references/cli/README.md`
- `skills/agora/references/server/README.md`
- `skills/agora/references/cloud-recording/README.md`
- `skills/agora/references/integration-patterns.md`

This file is a normalization artifact for candidate review. It is not a
verified recipe, verified workflow, or reusable KB entry.

## Discovery Summary

AgoraIO/skills is an official, route-driven product skill pack for building
real-time AI voice and communication applications. It is strongest around
ConvoAI-first onboarding, but it also spans RTC, RTM, cloud recording, token
servers, CLI-driven setup, and RTC/RTM/ConvoAI coordination.

The pack is not a generic reusable architecture source. Its rules are product
specific, credential sensitive, and often runtime-bound. The correct use inside
`awesome-skill-workflows` is to treat it as an external pending candidate that
can seed an Agora-specific scenario, not as a Layer 1 truth source.

## Capability Map

### ConvoAI / Voice Agent

- primary route for AI assistant, voice bot, agent demo, provider choice, Studio
  Agent ID reuse, agent backend lifecycle
- hard quickstart-first baseline gate
- official sample source inspection before custom implementation
- SDK-vs-direct-REST routing by backend language
- client toolkit and transcript/state delivery path
- runtime proof expectation: real RTC join and one end-to-end conversation

Inputs:

- user goal
- baseline status
- target stack
- backend language
- project/app context

Outputs:

- route mode: `quickstart`, `integration`, `backend-implementation`,
  `client-customization`, `studio-agent`, `advanced-feature`, `architecture`
- official baseline path
- integration checklist
- runtime proof expectation

### RTC

- voice/video calls, live streaming, screen sharing
- event ordering requirement before join
- separate publish events for audio/video
- track cleanup contract
- production token renewal
- audience subscriber-role anti-stream-bombing rule
- codec and UID interop rules across Web/iOS/Android

### RTM

- chat, signaling, presence, metadata, transcript transport
- message-channel vs stream-channel split
- login-before-operations rule
- subscribe-before-presence rule
- string UID boundary
- explicit RTC/RTM namespace separation
- RTM v2 only

### Cloud Recording

- REST-only lifecycle: `acquire -> start -> [query] -> stop`
- `resourceId` TTL is 5 minutes
- mode routing: `individual`, `mix`, `web`
- active-participant dependency before start
- Basic Auth and storage-config boundary

### Token/Auth

- production token requirement for RTC/RTM
- server-side generation only
- App Certificate never on client
- warn if token auth disabled in development
- warn if no App Certificate exists
- AccessToken2 supports combined RTC + RTM privileges
- token subject must match actual runtime identity

### Agora CLI

- login/session bootstrap
- project create/select/show
- `agora init`
- quickstart create/bind/env write
- doctor/readiness/introspection
- CLI version/PATH/config readiness gate before mutating commands
- machine-readable automation via `--json` and `agora introspect --json`

### Cross-product workflows

- RTC-only
- RTC + RTM
- RTC + ConvoAI
- RTC + RTM + ConvoAI
- shared channel-name convention
- init-order variants depending on UID strategy
- three-token model for ConvoAI sessions
- cleanup order across RTC, RTM, and agent lifecycle

## Risk & Guardrail Map

### Route rules

- choose one primary route first
- load only the primary route reference first
- add the minimum supporting references only after route selection
- prefer the product closest to the user goal rather than the lowest-level
  dependency

### ConvoAI quickstart gate

- no working baseline means no custom scaffolding
- official sample repo and sample README commands are the first-success source
  of truth
- a cloned repo or env vars do not count as a working baseline
- integration mode still starts from official quickstart source alignment

### CLI readiness gate

- before any mutating CLI command, probe version and PATH
- minimum supported CLI is `>=0.1.7`
- upgrade before continuing if missing, too old, shadowed, or schema-mismatched
- `agora doctor --json` is part of readiness only when supported by installed
  version

### Token/security boundary

- never expose App Certificate on client
- generate RTC/RTM tokens on server only
- warn when token auth is disabled or impossible
- RTM token subject and RTM login identity must match exactly
- RTC token UID must match RTC join UID

### RTM v2 only

- no v1 APIs such as `AgoraRTM.createInstance()` or `.createChannel()`
- all platform guidance in the current source assumes RTM v2

### Evidence/runtime proof requirements

- ConvoAI success requires end-to-end runtime proof, not config presence
- CLI health does not prove ConvoAI baseline by itself
- control-plane enablement may lag runtime availability; bounded wait/retry is
  allowed for RTM readiness
- Cloud Recording start requires an active RTC channel with participants

## Suggested Repository Placement

- raw discovery: `skills/raw-discovery/agora-skills.md`
- normalized candidate: `skills/normalized-candidates/agora-real-time-ai-integration.md`
- pending review ledger: `skills/raw-discovery/pending-review-candidates.md`
- existing capability/index summary may reference this candidate, but it should
  remain `pending-review` and `P2_EXTERNAL_PENDING`

Do not place this candidate in:

- `workflow-kb/`
- `verified-recipes/`
- `workflow-kb/verified-workflows/`
- scenario-independent Layer 1 rules

## Promotion Blockers

1. No Agora-specific scenario boundary or risk policy exists yet.
2. No run evidence proves the official ConvoAI quickstart or RTC/RTM flows in
   this repository.
3. No human-reviewed approval chain exists for login, project creation,
   credentials, token generation, or recording.
4. No sanitized runtime proof exists for transcript delivery, token renewal, or
   recording lifecycle.
5. Server Gateway route is referenced by the top-level skill, but its dedicated
   file was not part of this requested normalization pass.

## Next Validation Scenarios

1. Agora ConvoAI baseline:
   prove official quickstart startup, RTC join, and one end-to-end
   conversation.
2. Agora RTC + RTM coordination:
   verify UID mapping, channel-name convention, transcript/event delivery, and
   RTM-v2 client flow.
3. Agora token server:
   verify server-side RTC/RTM token generation, renewal, and App Certificate
   handling.
4. Agora Cloud Recording:
   verify `acquire -> start -> query -> stop`, participant presence, and stop
   cleanup.
5. Existing-app ConvoAI integration:
   prove copy-map adaptation from official quickstart into a real app after the
   baseline is already known-good.
