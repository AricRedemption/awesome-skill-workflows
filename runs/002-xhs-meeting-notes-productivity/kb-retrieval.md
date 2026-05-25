# KB Retrieval

## Query

- Source queried first: `workflow-kb/retrieval-index.json`
- Query intent: `xiaohongshu AI productivity post workflow meeting notes reduce overtime reusable workflow`
- Required target entries: `xhs-ai-tool-topic-to-post.v1` or `content-platform-posting-pattern`

## Matched KB Entries

1. `xhs-ai-tool-topic-to-post.v1`
   - Type: `failed_workflow`
   - Source: `workflow-kb/failed-workflows/xhs-ai-tool-topic-to-post.v1.md`
   - Match reason: It already defines the end-to-end Xiaohongshu AI tools topic-to-post workflow, including topic angle, pain point extraction, title/cover, note writing, scoring, human review, account-state gate, verification, and KB writeback.
   - Caveat: Its status is `failed`, so it can be reused for content generation and gate design, but not as proof of compliant publishing.

2. `content-platform-posting-pattern`
   - Type: `composition_pattern`
   - Source: `workflow-kb/composition-patterns/content-platform-posting-pattern.md`
   - Match reason: It generalizes account-bound content production into intake, platform fit, content package generation, save-worthiness check, scoring, human review, account-state precheck, handoff, verification, and writeback.

3. `xhs-content-rubric`
   - Type: `evaluation_rubric`
   - Source: `workflow-kb/evaluation-rubrics/xhs-content-rubric.md`
   - Match reason: It supplies the scoring dimensions and threshold logic for Xiaohongshu AI tools/productivity content.

4. `xhs-content-failure-cases`
   - Type: `failure_case`
   - Source: `workflow-kb/failure-cases/xhs-content-failure-cases.md`
   - Match reason: It prevents repeating the first run's mistake of treating content score or publish fact as compliant publish approval.

## Selected Workflow / Pattern

- Primary selected workflow: `xhs-ai-tool-topic-to-post.v1`
- Supporting pattern: `content-platform-posting-pattern`
- Supporting rubric: `xhs-content-rubric`

## Why Reusable

The second task has the same platform, account direction, audience class, and content format as the first task. The topic changed from saving one hour with AI Agent to reducing overtime with AI meeting-note automation, but the workflow skeleton is unchanged: identify reader pain, shape an AI productivity angle, generate a Xiaohongshu-native content package, score it, keep human review as a gate, and write back reusable evidence.

## Reused Steps

Reused from the 10-step reusable workflow shape in `xhs-ai-tool-topic-to-post.v1`:

1. Discover and normalize candidate skills.
2. Map scenario capabilities to concrete skills.
3. Compose the workflow with explicit gates and fallbacks.
4. Generate topic angle, audience pain points, title, cover copy, body, hashtags, and comment hook.
5. Run compliance and quality scoring.
6. Require human review before draft or publish handoff.
7. Check account login and authorization before platform handoff.
8. Save draft or publish only within the approved mode.
10. Record evolution, KB entries, and recipe status.

Step 9 was retained as a rule but not executed because this run is `content_package_only`, not draft or publish handoff.

## Modified Steps

1. Step 1 was shortened from broad discovery to KB retrieval because the required workflow already existed.
2. Step 4 was topic-adapted from AI Agent time saving to AI meeting-note automation and overtime reduction.
3. Step 8 was narrowed to content package only; no account-bound platform action was attempted.
4. Step 10 writes reuse evidence instead of verified publish promotion.

## Reuse Ratio

- Base workflow steps counted: 10
- Reused steps: 8
- Modified steps: 2
- Omitted publish verification execution: 1 retained as non-executed rule
- Reuse ratio: `8 / 10 = 80%`

This passes the required minimum reuse ratio of `60%`.

## Avoided Discovery Cost

Avoided from-zero discovery work:

- No new platform workflow discovery.
- No new skill marketplace search.
- No new Xiaohongshu structure research.
- No new rubric design.
- No new publish-risk model design.

The run reused existing workflow, pattern, rubric, and known failure cases, then adapted only topic-specific copy and scoring.

## Risks

- `xhs-ai-tool-topic-to-post.v1` is not a verified successful publish workflow; it is reusable only for content and gates.
- Meeting notes may involve sensitive workplace information, so the content must warn users to remove names, client data, confidential numbers, and internal decisions before using AI tools.
- High numeric score does not authorize publish or draft handoff.
- Because this run does not perform account-bound handoff, publish verification remains out of scope.
