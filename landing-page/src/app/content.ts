export const links = {
  repository: "https://github.com/AricRedemption/awesome-skill-workflows",
  architecture:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/architecture.md",
  directoryMap:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/directory-architecture.md",
  workflowKb:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/workflow-knowledge-base.md",
  verifiedRecipe:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/verified-recipes/xhs-ai-agent-save-one-hour.recipe.md",
  verifiedWorkflow:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md",
  reuseRun:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/runs/002-xhs-meeting-notes-productivity/run-summary.md",
  failureRun:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/runs/001-xhs-ai-agent-save-one-hour/run-summary.md",
  mvpReport:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/reports/first-mvp-validation-report.md",
  agentRules:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/AGENTS.md",
} as const;

export const navItems = [
  { label: "Validated", href: "#validated" },
  { label: "Problem", href: "#problem" },
  { label: "Model", href: "#model" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Evidence", href: "#evidence" },
  { label: "Use cases", href: "#use-cases" },
] as const;

export const hero = {
  eyebrow: "Workflow evidence system",
  title: "Build reusable agent workflows from verified runs.",
  description:
    "awesome-skill-workflows turns one-off agent execution into durable skills, workflows, recipes, and knowledge-base entries. Nothing is promoted until the run evidence, review state, and verification gates are explicit.",
  primaryCta: "Explore the model",
  secondaryCta: "Inspect verified recipe",
  consoleSteps: ["Run", "Score", "Review", "Verify", "Write back", "Promote"],
  signals: [
    { label: "Source", value: "real run evidence" },
    { label: "Gate", value: "human + risk review" },
    { label: "Output", value: "verified workflow asset" },
  ],
} as const;

export const problem = {
  eyebrow: "The gap",
  title: "Agent work disappears after each successful run.",
  description:
    "Most agent workflows leave behind a chat transcript, a few prompts, and no durable path for reuse. This project treats every run as evidence that can either become reusable knowledge or a documented failure.",
  cards: [
    {
      title: "Skills stay scattered",
      body: "Useful prompts, tools, and tactics remain buried in conversations instead of becoming selectable skill assets.",
    },
    {
      title: "Success is not repeatability",
      body: "One good output does not prove that the workflow can be selected, composed, reviewed, and reused.",
    },
    {
      title: "Failures get lost",
      body: "Failed runs often contain the best prevention rules, but they rarely make it into a reusable knowledge base.",
    },
  ],
} as const;

export const ecosystem = {
  eyebrow: "Agent ecosystem",
  title: "Compatible with the agent stack you already run.",
  description:
    "This layer is additive. It sits above existing agent tools and gives repeated work a promotion path: evidence, review gates, reusable workflow assets, and writeback.",
  logos: [
    {
      id: "roo-code",
      label: "Roo Code",
      logo: "https://github.com/RooCodeInc.png",
      kind: "icon",
      metric: "24.2k",
      metricLabel: "GitHub stars",
      metricValue: 24200,
    },
    {
      id: "cline",
      label: "Cline",
      logo: "https://github.com/cline.png",
      kind: "icon",
      metric: "61.5k",
      metricLabel: "GitHub stars",
      metricValue: 61500,
    },
    {
      id: "openhands",
      label: "OpenHands",
      logo: "https://github.com/All-Hands-AI.png",
      kind: "icon",
      metric: "75k",
      metricLabel: "GitHub stars",
      metricValue: 75000,
    },
    {
      id: "browser-use",
      label: "Browser Use",
      logo: "https://github.com/browser-use.png",
      kind: "icon",
      metric: "92.7k",
      metricLabel: "GitHub stars",
      metricValue: 92700,
    },
    {
      id: "codex",
      label: "Codex",
      logo: "/ecosystem/codex.svg",
      kind: "lockup",
      metric: "135.6k",
      metricLabel: "weekly npm downloads",
      metricValue: 135603,
    },
    {
      id: "hermes-agent",
      label: "Hermes Agent",
      logo: "/ecosystem/hermes-agent.png",
      kind: "lockup",
      metric: "143k",
      metricLabel: "GitHub stars",
      metricValue: 143000,
    },
    {
      id: "openclaw",
      label: "OpenClaw",
      logo: "/ecosystem/openclaw.svg",
      kind: "lockup",
      metric: "369k",
      metricLabel: "GitHub stars",
      metricValue: 369000,
    },
    {
      id: "claude-code",
      label: "Claude Code",
      logo: "/ecosystem/claude-code.svg",
      kind: "lockup",
      metric: "4.2M",
      metricLabel: "weekly npm downloads",
      metricValue: 4206160,
    },
    {
      id: "cursor",
      label: "Cursor",
      logo: "https://cursor.com/favicon.ico",
      kind: "icon",
      metric: "N/A",
      metricLabel: "public total not disclosed",
      metricValue: 999999999,
    },
  ],
  lanes: [
    {
      title: "Sorted by latest public adoption signal",
      items: ["GitHub stars", "weekly npm downloads", "public metrics only", "Cursor shown but not ranked by total usage"],
    },
  ],
} as const;

export const validatedProof = {
  eyebrow: "Validated in the wild",
  title: "One concrete workflow already proves what kinds of skills this system can validate.",
  description:
    "The strongest proof is not a generic use-case list. It is that a real skill chain has already been verified, reused, and improved through failure evidence.",
  stats: [
    { value: "1", label: "verified recipe", detail: "promoted with draft proof, gate ledger, and review ordering" },
    { value: "1", label: "verified workflow", detail: "scenario workflow promoted into reusable workflow shape" },
    { value: "80%", label: "reuse ratio", detail: "second run reused 8 of 10 base workflow steps" },
    { value: "95", label: "quality score", detail: "second scenario passed threshold without rediscovery from zero" },
    { value: "3", label: "passed gates", detail: "human review, risk approval, and account-state check ordered before handoff" },
    { value: "1", label: "failure chain", detail: "invalid publish proof converted into reusable guardrails instead of promotion" },
  ],
  spotlight: {
    label: "Verified now",
    scenario: "Xiaohongshu creator draft workflow",
    problem: "Turn a topic-to-post workflow into a compliant, human-reviewed draft-save path instead of a one-off agent output.",
    outcome: "Verified for draft save. Not claimed for live publish.",
    skills: [
      "topic generation",
      "note writing",
      "platform style rewrite",
      "quality scoring",
      "human review gate",
      "draft handoff and post verification",
      "knowledge-base writeback",
    ],
    evidence: [
      "verified workflow record",
      "verified recipe",
      "draft proof and gate ledger",
    ],
    href: links.verifiedWorkflow,
  },
  cards: [
    {
      title: "Verified workflow asset",
      stat: "13-step draft-safe workflow",
      body: "The repo has already validated a full workflow shape for Xiaohongshu draft handoff, including review ordering, account-state checks, proof separation, and KB writeback.",
      proofLabel: "Evidence",
      proofValue: "verified recipe + verified workflow",
      href: links.verifiedRecipe,
    },
    {
      title: "Reuse on a second scenario",
      stat: "80% reuse ratio, 95 score",
      body: "A second run reused the same workflow for a workplace AI meeting-notes scenario without restarting discovery from zero. Only the topic angle, confidentiality risk, and copy changed.",
      proofLabel: "Evidence",
      proofValue: "run 002 reuse summary",
      href: links.reuseRun,
    },
    {
      title: "Failure became a guardrail",
      stat: "Publish proof failed, rule got stronger",
      body: "The earlier live-publish attempt did not qualify for promotion. Instead of hiding it, the repo converted that failure into account-state and approval-ordering guardrails for future runs.",
      proofLabel: "Evidence",
      proofValue: "run 001 failure chain",
      href: links.failureRun,
    },
  ],
  heatmap: {
    eyebrow: "Validated skill heatmap",
    title: "What has actually been validated so far",
    rows: [
      {
        skill: "Skill discovery and normalization",
        cells: [
          { label: "creator workflow", level: 3 },
          { label: "meeting-notes reuse", level: 2 },
          { label: "live publish safety", level: 1 },
        ],
      },
      {
        skill: "Workflow composition",
        cells: [
          { label: "topic-to-post flow", level: 3 },
          { label: "reuse without zero restart", level: 3 },
          { label: "approval ordering repair", level: 2 },
        ],
      },
      {
        skill: "Content generation and style rewrite",
        cells: [
          { label: "xhs draft asset", level: 3 },
          { label: "meeting-notes scenario", level: 3 },
          { label: "publish-safe adaptation", level: 1 },
        ],
      },
      {
        skill: "Quality scoring and review gates",
        cells: [
          { label: "draft verification", level: 3 },
          { label: "content-package scoring", level: 3 },
          { label: "failed publish rejection", level: 3 },
        ],
      },
      {
        skill: "Account-state and handoff control",
        cells: [
          { label: "draft-only mode", level: 3 },
          { label: "confidentiality boundary", level: 2 },
          { label: "publish proof boundary", level: 3 },
        ],
      },
      {
        skill: "KB writeback and self-evolution",
        cells: [
          { label: "verified recipe promotion", level: 3 },
          { label: "reuse memory retrieval", level: 3 },
          { label: "failure to guardrail", level: 3 },
        ],
      },
    ],
    columns: ["Scenario fit", "Reuse proof", "Risk boundary"],
    legend: [
      { label: "strong", level: 3 },
      { label: "partial", level: 2 },
      { label: "emerging", level: 1 },
    ],
  },
} as const;

export const useCases = {
  eyebrow: "Where it applies",
  title: "Best when repeated agent work needs proof, review, and memory.",
  description:
    "The framework is strongest when a workflow keeps recurring, carries risk or review boundaries, and should improve from run evidence instead of being rediscovered in chat.",
  items: [
    {
      title: "Research and analysis workflows",
      fit: "Competitor research, market scans, literature reviews, due diligence, and synthesis reports.",
      proof:
        "Capture source selection, prompt strategy, scoring notes, review comments, and reusable research patterns.",
    },
    {
      title: "Engineering delivery workflows",
      fit: "Bug triage, PR review, release checks, migration plans, QA loops, and repo onboarding.",
      proof:
        "Preserve commands, failures, validator output, reviewer feedback, and the exact workflow path that worked.",
    },
    {
      title: "Monitoring and recurring review",
      fit: "Data watchlists, weekly reports, incident review, competitive changes, and operational checkups.",
      proof:
        "Turn recurring observations into KB entries, fallback strategies, and improved future run selection.",
    },
    {
      title: "Content and publishing workflows",
      fit: "Draft generation, compliance review, channel-specific packaging, and human-approved handoff.",
      proof:
        "Keep quality score, risk approval, account-state checks, draft proof, and publish boundaries separate.",
    },
  ],
} as const;

export const coreModel = {
  eyebrow: "Core model",
  title: "Separate assets, proof, and promotion.",
  description:
    "The framework is built around three things that should not be mixed: reusable workflow assets, evidence from concrete runs, and the gates that decide whether evidence can be promoted.",
  pillars: [
    {
      title: "Skill assets",
      subtitle: "Reusable capabilities",
      body: "Capability maps, skill definitions, workflow steps, and schemas that can be selected again.",
      paths: ["skills/", "workflows/", "schemas/"],
    },
    {
      title: "Run evidence",
      subtitle: "Proof from execution",
      body: "Inputs, selected skills, outputs, quality scores, review records, and proof artifacts from a specific run.",
      paths: ["runs/", "reports/", "human-review.json"],
    },
    {
      title: "Promotion rules",
      subtitle: "What becomes durable",
      body: "Verified recipes, failed recipes, reusable KB entries, and evolution drafts are separated by evidence state.",
      paths: ["verified-recipes/", "failed-recipes/", "evolution-drafts/"],
    },
  ],
  visual: {
    src: "/architecture/workflow-architecture-dark.png",
    alt: "Dark mode three-layer skill workflow architecture diagram",
  },
} as const;

export const lifecycle = {
  eyebrow: "Workflow lifecycle",
  title: "One run becomes reusable only after the loop closes.",
  description:
    "The reusable asset is not the final output. It is the whole path: how skills were selected, how the workflow ran, how the result was scored, what review found, and what was written back.",
  visual: {
    src: "/architecture/workflow-loop-dark.png",
    alt: "Dark mode workflow loop diagram",
  },
  steps: [
    {
      title: "Discover",
      body: "Capture raw skill candidates and relevant prior knowledge.",
      path: "skills/raw-discovery/",
    },
    {
      title: "Compose",
      body: "Turn selected capabilities into an explicit workflow path.",
      path: "workflows/",
    },
    {
      title: "Execute",
      body: "Run or simulate the workflow and preserve the evidence.",
      path: "runs/",
    },
    {
      title: "Score",
      body: "Evaluate output quality with explicit rubrics and thresholds.",
      path: "quality-score.json",
    },
    {
      title: "Review",
      body: "Separate content quality from human, risk, and account-state approval.",
      path: "human-review.json",
    },
    {
      title: "Write back",
      body: "Promote verified lessons or archive reusable failure evidence.",
      path: "workflow-kb/",
    },
  ],
} as const;

export const gates = {
  eyebrow: "Evidence gates",
  title: "A recipe is not verified because it worked once.",
  description:
    "The project keeps quality, review, risk, account state, platform handoff, and proof verification as separate states. That is why a failed run can teach the system without being promoted as success.",
  visual: {
    src: "/architecture/workflow-validation-dark.png",
    alt: "Dark mode workflow validation pipeline diagram",
  },
  cards: [
    {
      title: "Quality score is not approval",
      body: "A high score can pass content quality while publish or promotion remains blocked.",
    },
    {
      title: "Human review is separate",
      body: "Externally visible or account-bound actions require explicit human review before handoff.",
    },
    {
      title: "Risk state is scenario-owned",
      body: "Scenario-specific risk rules stay in the scenario boundary instead of becoming global assumptions.",
    },
    {
      title: "Failed evidence stays failed",
      body: "Failed recipes and failure cases are preserved, but never placed in verified namespaces.",
    },
  ],
} as const;

export const repositoryMap = {
  eyebrow: "Repository map",
  title: "The repository is a workflow system, not a file dump.",
  description:
    "Each directory has a job in the evidence lifecycle. The value is in the boundary between temporary run records and durable reusable assets.",
  assets: [
    { path: "skills/", label: "Reusable capability definitions and maps" },
    { path: "workflows/", label: "Composable execution paths" },
    { path: "runs/", label: "Evidence records from specific executions" },
    { path: "workflow-kb/", label: "Reusable memory, rubrics, patterns, and failure cases" },
    { path: "verified-recipes/", label: "Promotion-approved workflow recipes" },
    { path: "failed-recipes/", label: "Failed runs with reusable lessons" },
    { path: "evolution-drafts/", label: "Proposed long-lived rule changes" },
  ],
} as const;

export const scenario = {
  eyebrow: "Validated scenario",
  title: "Proven through one concrete scenario, designed for many.",
  body: "The current Xiaohongshu workflow is a validation wrapper. It proves that the framework can move from skill discovery to run evidence, review gates, draft proof, KB writeback, and verified recipe promotion. The same model can support research workflows, report generation, monitoring, and operational review loops.",
  validates: [
    "Skill discovery can be normalized into reusable workflow assets.",
    "High-risk steps can stay behind explicit human and scenario review.",
    "Success and failure both write back into durable reusable memory.",
  ],
  doesNotClaim: [
    "The scenario is the product identity.",
    "One successful run is enough for promotion.",
    "Scenario-specific risk rules belong in the core architecture.",
  ],
  examples: ["Research workflows", "Engineering QA loops", "Report generation", "Data monitoring", "Operational review"],
} as const;

export const finalCta = {
  title: "Choose the path that matches your intent.",
  body: "Start with the architecture if you want the model, inspect the verified recipe if you want proof, or use the directory guide if you want to add a new workflow.",
  actions: [
    {
      label: "Understand the model",
      href: links.architecture,
      detail: "Read the architecture before changing skills, workflows, or promotion logic.",
    },
    {
      label: "Inspect verified run",
      href: links.verifiedRecipe,
      detail: "See what evidence-backed promotion looks like in one concrete scenario.",
    },
    {
      label: "Add a workflow",
      href: links.directoryMap,
      detail: "Use the directory map when you need to place a new scenario, run, or KB artifact.",
    },
  ],
} as const;
