# xhs-ai-tool-topic-to-post

```json
{
  "id": "xhs-ai-tool-topic-to-post",
  "scenario_id": "xiaohongshu-creator",
  "goal": "Automatically or semi-automatically compose the first Xiaohongshu content production workflow for an AI tools / efficiency account, with human review before any draft or publish handoff.",
    "risk_boundary": {
    "no_auto_publish_without_human_review": true,
    "no_draft_or_publish_without_account_state_check": true,
    "no_policy_violation_content": true,
    "no_kb_writeback_without_verified_run": true,
    "mock_steps": [
      "workflow-composer",
      "human-review-gate",
      "verified-recipe-generator"
    ],
    "high_risk_steps": [
      "xhs-note-writer",
      "compliance-risk-checker",
      "human-review-gate",
      "account-state-check",
      "xhs-publish-or-draft",
      "post-publish-verifier",
      "workflow-kb-writer"
    ]
  },
  "success_criteria": [
    "All 22 required steps are present in the correct order and each step has input, output, fallback, and evaluation fields.",
    "The workflow covers the scenario requirements from reference discovery through post-publish verification and self-evolution.",
    "Human review is placed before any publish or draft creation action.",
    "Account state is checked before any publish or draft creation action.",
    "Compliance and quality checks gate the handoff to publish or draft creation.",
    "Verified evidence is written back into the workflow knowledge base before a verified recipe is generated."
  ],
  "steps": [
    {
      "step_id": "skill-discoverer",
      "capability_required": "skill-discovery",
      "candidate_skills": [
        "skill-discovery",
        "source-intake-and-discovery"
      ],
      "selected_skill": "skill-discovery",
      "input": [
        "skills/index.json",
        "scenarios/xiaohongshu-creator/capability-requirements.md",
        "goal prompt"
      ],
      "output": [
        "candidate skill shortlist",
        "discovery notes",
        "selection rationale"
      ],
      "fallback": "If the discovery pass is incomplete, fall back to source-intake-and-discovery and mark unresolved capabilities for manual review.",
      "evaluation": [
        "The shortlist references only skills that exist in skills/index.json.",
        "The shortlist covers the xhs scenario's required semantic bundles or explicitly marks gaps."
      ]
    },
    {
      "step_id": "skill-normalizer",
      "capability_required": "skill-normalization",
      "candidate_skills": [
        "source-intake-and-discovery"
      ],
      "selected_skill": "source-intake-and-discovery",
      "input": [
        "candidate skill shortlist",
        "raw skill metadata",
        "source whitelist"
      ],
      "output": [
        "normalized skill records",
        "bounded source list",
        "pending-review ledger"
      ],
      "fallback": "If normalization cannot be completed, keep the raw discovery shortlist and require manual normalization before composition.",
      "evaluation": [
        "Each selected skill has a stable id, risk level, and capability note.",
        "All records use the same field conventions as the repo's discovery assets."
      ]
    },
    {
      "step_id": "capability-mapper",
      "capability_required": "capability-mapping",
      "candidate_skills": [
        "source-intake-and-discovery"
      ],
      "selected_skill": "source-intake-and-discovery",
      "input": [
        "normalized skill records",
        "scenario capability requirements",
        "skills/index.json"
      ],
      "output": [
        "capability-to-skill matrix",
        "coverage map",
        "gap list"
      ],
      "fallback": "If the capability map is incomplete, use the minimum workflow path from the scenario document and manually annotate each missing capability.",
      "evaluation": [
        "Every required xhs semantic capability has a mapped skill or an explicit gap note.",
        "The map identifies which capabilities are bundled versus standalone."
      ]
    },
    {
      "step_id": "workflow-composer",
      "capability_required": "workflow-composition",
      "candidate_skills": [
        "workflow-improvement",
        "quality-scoring"
      ],
      "selected_skill": "workflow-improvement",
      "input": [
        "capability-to-skill matrix",
        "gap list",
        "scenario constraints"
      ],
      "output": [
        "draft workflow spec",
        "dependency order",
        "mock step notes"
      ],
      "fallback": "If composition logic fails, fall back to the scenario's minimum workflow path and annotate synthetic steps as orchestrator-managed.",
      "evaluation": [
        "The workflow contains exactly 22 ordered steps.",
        "The step order matches the scenario's minimum path and preserves risk gates before publish handoff."
      ]
    },
    {
      "step_id": "xhs-topic-generator",
      "capability_required": "topic-angle-generation",
      "candidate_skills": [
        "topic-generation",
        "audience-painpoint-extraction"
      ],
      "selected_skill": "topic-generation",
      "input": [
        "account direction",
        "target users",
        "topic seed"
      ],
      "output": [
        "topic angle shortlist",
        "primary topic candidate",
        "topic rationale"
      ],
      "fallback": "If topic generation fails, reuse the provided topic seed and keep the workflow focused on one clear angle.",
      "evaluation": [
        "The generated angle fits AI tools and efficiency positioning.",
        "The angle is relevant to the stated target users."
      ]
    },
    {
      "step_id": "audience-painpoint-extractor",
      "capability_required": "audience-painpoint-extraction",
      "candidate_skills": [
        "audience-painpoint-extraction",
        "content-research"
      ],
      "selected_skill": "audience-painpoint-extraction",
      "input": [
        "target users",
        "topic",
        "platform context"
      ],
      "output": [
        "painpoint map",
        "need-state summary",
        "hook candidates"
      ],
      "fallback": "If platform signals are unavailable, derive pain points directly from target user roles and the account direction.",
      "evaluation": [
        "At least one pain point is mapped for each target user group.",
        "Pain points are written in a form usable by title, hook, and note generation."
      ]
    },
    {
      "step_id": "title-cover-copy-generator",
      "capability_required": "title-cover-copy-generation",
      "candidate_skills": [
        "title-generation",
        "cover-copy-generation"
      ],
      "selected_skill": "title-generation + cover-copy-generation",
      "input": [
        "painpoint map",
        "topic candidate",
        "tone constraints",
        "cover constraints"
      ],
      "output": [
        "title variants",
        "cover copy variants",
        "winning title-cover pair"
      ],
      "fallback": "If the pair cannot be aligned, use one conservative benefit-led title and one direct cover line that share the same hook.",
      "evaluation": [
        "The title and cover communicate the same promise.",
        "The pair is specific enough to support the later note body."
      ]
    },
    {
      "step_id": "xhs-note-writer",
      "capability_required": "xhs-note-writing",
      "candidate_skills": [
        "note-writing"
      ],
      "selected_skill": "note-writing",
      "input": [
        "winning title-cover pair",
        "painpoint map",
        "topic",
        "style constraints"
      ],
      "output": [
        "draft note body",
        "generated-note.md",
        "title/body package",
        "revision notes"
      ],
      "fallback": "If draft quality is weak, stop at outline level and require human rewrite before style or publish steps.",
      "evaluation": [
        "The draft body is coherent, structured, and aligned to the selected hook.",
        "The draft avoids unsupported claims and unnecessary filler."
      ]
    },
    {
      "step_id": "xhs-style-rewriter",
      "capability_required": "xhs-style-checking",
      "candidate_skills": [
        "platform-style-rewrite"
      ],
      "selected_skill": "platform-style-rewrite",
      "input": [
        "draft note body",
        "persona notes",
        "platform constraints"
      ],
      "output": [
        "rewritten draft",
        "voice notes"
      ],
      "fallback": "If style adaptation does not improve the draft, keep the original draft and record the style gap for later improvement.",
      "evaluation": [
        "The rewrite sounds native to Xiaohongshu rather than generic marketing copy.",
        "The rewrite preserves the original intent and hook."
      ]
    },
    {
      "step_id": "hashtag-generator",
      "capability_required": "hashtag-generation",
      "candidate_skills": [
        "hashtag-generation"
      ],
      "selected_skill": "hashtag-generation",
      "input": [
        "rewritten draft",
        "topic",
        "target users"
      ],
      "output": [
        "hashtag set",
        "tag rationale"
      ],
      "fallback": "If tag generation is uncertain, use a conservative mix of broad and niche tags derived from the topic and target users.",
      "evaluation": [
        "The tag set is relevant to both discovery and topic specificity.",
        "The tags do not introduce unrelated keywords."
      ]
    },
    {
      "step_id": "engagement-hook-generator",
      "capability_required": "engagement-hook-generation",
      "candidate_skills": [
        "engagement-hook-generation"
      ],
      "selected_skill": "engagement-hook-generation",
      "input": [
        "painpoint map",
        "topic",
        "tone constraints"
      ],
      "output": [
        "hook variants",
        "comment prompts"
      ],
      "fallback": "If no strong hook emerges, use a direct question hook that names the audience pain point explicitly.",
      "evaluation": [
        "The hook creates curiosity without overselling.",
        "The hook is aligned to a specific audience pain point."
      ]
    },
    {
      "step_id": "compliance-risk-checker",
      "capability_required": "compliance-risk-checking",
      "candidate_skills": [
        "compliance-checker"
      ],
      "selected_skill": "compliance-checker",
      "input": [
        "rewritten draft",
        "content plan",
        "policy file"
      ],
      "output": [
        "violations",
        "warnings",
        "remediation notes"
      ],
      "fallback": "If any high-severity issue remains unresolved, block the workflow and require manual policy review before continuing.",
      "evaluation": [
        "No unresolved high-severity policy or safety issues remain.",
        "Any warning has a concrete remediation note."
      ]
    },
    {
      "step_id": "quality-scorer",
      "capability_required": "quality-scoring",
      "candidate_skills": [
        "quality-scoring"
      ],
      "selected_skill": "quality-scoring",
      "input": [
        "rewritten draft",
        "compliance result",
        "workflow draft"
      ],
      "output": [
        "scorecard",
        "pass/fail recommendation",
        "promotion notes"
      ],
      "fallback": "If the score does not clear the threshold, route back to workflow-improver and then rewriting instead of advancing to review or publish handoff.",
      "evaluation": [
        "The scorecard covers usefulness, repeatability, human review burden, failure severity, and reuse potential.",
        "The workflow only advances when the recommendation is pass."
      ]
    },
    {
      "step_id": "workflow-improver",
      "capability_required": "workflow-improvement",
      "candidate_skills": [
        "workflow-improvement"
      ],
      "selected_skill": "workflow-improvement",
      "input": [
        "scorecard",
        "friction list",
        "gap list"
      ],
      "output": [
        "improvement candidates",
        "refactor notes",
        "test suggestions"
      ],
      "fallback": "If no improvement is clearly supported by evidence, freeze the workflow and record the friction for a later revision run.",
      "evaluation": [
        "Any proposed change reduces risk or improves reuse.",
        "The improvement notes are evidence-based rather than speculative."
      ]
    },
    {
      "step_id": "human-review-gate",
      "capability_required": "human-review-gate",
      "candidate_skills": [
        "publish-draft-creation",
        "compliance-checker"
      ],
      "selected_skill": "mock: human-review-gate",
      "input": [
        "draft package",
        "scorecard",
        "compliance findings"
      ],
      "output": [
        "approval decision",
        "change requests",
        "hold decision"
      ],
      "fallback": "If no human reviewer is available, halt the workflow and keep the content in draft-only state.",
      "evaluation": [
        "Human review happens before any publish or draft creation action.",
        "Review comments are captured for the evolution record."
      ]
    },
    {
      "step_id": "human-feedback-intake",
      "capability_required": "human-feedback-intake",
      "candidate_skills": [
        "evolution-recording"
      ],
      "selected_skill": "evolution-recording",
      "input": [
        "approval decision",
        "change requests",
        "hold decision",
        "review comments"
      ],
      "output": [
        "structured review notes",
        "feedback evidence",
        "evolution candidates"
      ],
      "fallback": "If reviewer feedback cannot be normalized, halt the handoff and preserve the raw comments as run evidence.",
      "evaluation": [
        "Approval, change requests, and hold decisions are represented as structured evidence.",
        "The workflow does not rely on free-text review comments alone for later self-evolution."
      ]
    },
    {
      "step_id": "account-state-check",
      "capability_required": "account-state-check",
      "candidate_skills": [
        "post-verification"
      ],
      "selected_skill": "post-verification",
      "input": [
        "reviewed draft",
        "structured review notes",
        "account context",
        "publish mode"
      ],
      "output": [
        "login status",
        "authorization status",
        "handoff decision"
      ],
      "fallback": "If the account is not logged in or not authorized, halt the handoff and keep the content in draft-only state until the account state is resolved.",
      "evaluation": [
        "The workflow does not hand off to draft or publish creation before account state is confirmed.",
        "The returned decision clearly distinguishes not logged in, not authorized, and ready states."
      ]
    },
    {
      "step_id": "xhs-publish-or-draft",
      "capability_required": "publish / draft creation",
      "candidate_skills": [
        "publish-draft-creation"
      ],
      "selected_skill": "publish-draft-creation",
      "input": [
        "reviewed draft",
        "account state result",
        "publish mode",
        "platform metadata"
      ],
      "output": [
        "draft box entry",
        "publish package",
        "status result"
      ],
      "fallback": "If publish is blocked, create a draft-only package and preserve the reviewed content for later manual action.",
      "evaluation": [
        "No live publish occurs without a positive human review result and confirmed account state.",
        "The returned status clearly identifies whether the run produced a draft or a publish package."
      ]
    },
    {
      "step_id": "post-publish-verifier",
      "capability_required": "post-publish-verification",
      "candidate_skills": [
        "post-verification"
      ],
      "selected_skill": "post-verification",
      "input": [
        "publish result",
        "platform",
        "verification target"
      ],
      "output": [
        "verification status",
        "feed snapshot",
        "follow-up notes"
      ],
      "fallback": "If the platform probe is unavailable, record a manual verification note and defer knowledge-base writeback until confirmation exists.",
      "evaluation": [
        "The resulting state matches the action that was taken.",
        "The verification evidence is sufficient to support a later recipe entry."
      ]
    },
    {
      "step_id": "evolution-recorder",
      "capability_required": "workflow-evolution-recording",
      "candidate_skills": [
        "evolution-recording",
        "knowledge-base-writeback"
      ],
      "selected_skill": "evolution-recording",
      "input": [
        "run evidence",
        "review comments",
        "failure cases",
        "reusable patterns"
      ],
      "output": [
        "evolution notes",
        "kb entry candidates",
        "retrieval updates"
      ],
      "fallback": "If the evidence set is incomplete, keep a raw run log and delay promotion until verification is complete.",
      "evaluation": [
        "Only evidence-backed learnings are recorded.",
        "The notes identify what should change in the next run."
      ]
    },
    {
      "step_id": "workflow-kb-writer",
      "capability_required": "knowledge-base-writeback",
      "candidate_skills": [
        "knowledge-base-writeback",
        "evolution-recording"
      ],
      "selected_skill": "knowledge-base-writeback",
      "input": [
        "evolution notes",
        "verified patterns",
        "verification result"
      ],
      "output": [
        "kb entry",
        "retrieval update",
        "memory export"
      ],
      "fallback": "If verification is missing, skip the writeback and keep the item as an unpublished evolution note.",
      "evaluation": [
        "The knowledge base only receives verified reusable assets.",
        "The writeback includes enough context for later retrieval."
      ]
    },
    {
      "step_id": "verified-recipe-generator",
      "capability_required": "verified-recipe-generation",
      "candidate_skills": [
        "quality-scoring",
        "knowledge-base-writeback"
      ],
      "selected_skill": "quality-scoring",
      "input": [
        "workflow trace",
        "scorecard",
        "human review",
        "publish verification"
      ],
      "output": [
        "verified recipe entry",
        "reproduction steps",
        "status"
      ],
      "fallback": "If the run has not been fully verified, keep the recipe in draft form and do not promote it to the verified set.",
      "evaluation": [
        "The recipe can be reproduced from the stored steps and evidence.",
        "The recipe is only promoted after human review and verification both pass."
      ]
    }
  ]
}
```
