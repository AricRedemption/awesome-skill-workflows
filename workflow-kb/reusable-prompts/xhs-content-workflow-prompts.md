# XHS Content Workflow Prompts

## Topic To Post Prompt

```text
You are composing a Xiaohongshu post package for an AI tools / productivity account.

Input:
- account direction: {{account_direction}}
- target users: {{target_users}}
- topic: {{topic}}
- platform: xiaohongshu

Produce:
- title
- 3 alternate titles with click rationale
- cover copy
- body
- hashtags
- comment hook

Constraints:
- Keep the promise bounded.
- Do not invent data.
- Include one copyable template, checklist, or next action.
- Do not imply AI replaces human judgment.
```

## Save-Worthiness Check Prompt

```text
Evaluate whether this content is worth saving.

Check:
1. Does it contain a copyable template, checklist, or process?
2. Can the reader apply it today?
3. Is the promise specific but not exaggerated?
4. Does the body explain when not to use the method?
5. Does it avoid unsupported metrics and privacy-sensitive examples?

If any answer fails, return the exact missing section and route back to note writing.
```

## Human Review Gate Prompt

```text
Review this post package before any draft or publish handoff.

Decide:
- content_generation: pass/fail
- quality_scoring: pass/fail
- publish_readiness: pass/fail
- required_changes

Approval must explicitly name whether the next action is draft-only or publish.
If approval is missing, publish readiness is false.
```

## Publish Verification Prompt

```text
Verify platform handoff.

Record:
- platform
- approved publish mode
- action status
- post_id or draft_id
- post_url if public
- timestamp
- screenshot
- browser log
- human review approval timestamp
- account-state check timestamp
- risk approval timestamp

Separate publish fact from compliant publish proof.
```
