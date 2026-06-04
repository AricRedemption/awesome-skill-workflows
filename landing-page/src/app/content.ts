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
  skilloptIntegration:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/skillopt-integration.md",
  skilloptReadiness:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/reports/skillopt-official-readiness.json",
  skillWikiPromotion:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/skill-wiki-promotion.md",
  skillWikiEntry:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/skills/wiki/xhs-kb-reuse-selection-gated-safety.md",
  docs:
    "https://github.com/AricRedemption/awesome-skill-workflows/tree/main/docs",
  agentRules:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/AGENTS.md",
} as const;

export const brand = {
  name: "Runwise",
  repositoryName: "awesome-skill-workflows",
  logo: "/brand/runwise-logo.png",
  description:
    "Evidence-first AI agent workflow memory for verified reusable skills.",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Proof", href: "/proof" },
  { label: "Cases", href: "/cases" },
  { label: "Evolution", href: "/evolution" },
  { label: "Wiki", href: "/wiki" },
] as const;

export const hero = {
  eyebrow: "Workflow evidence system",
  title: "Runwise keeps successful agent work from disappearing into chat history.",
  description:
    "It turns repeatable runs into reusable assets, explicit gates, and durable workflow memory, so teams can keep what worked, learn from what failed, and promote only what evidence supports.",
  primaryCta: "See why it works",
  secondaryCta: "Read docs",
  consoleSteps: ["Run", "Review", "Verify", "Write back"],
  signals: [
    { label: "What it keeps", value: "reusable workflow assets" },
    { label: "What it requires", value: "evidence and explicit gates" },
    { label: "What it avoids", value: "promoting plausible-looking output" },
  ],
  proofStrip: [
    "real run evidence",
    "human and scenario review",
    "durable KB writeback",
  ],
  support: {
    title: "What survives a good run",
    body: "Not just the final answer. The selected skills, execution path, review decisions, proof boundary, and reusable lessons all stay attached to the run.",
  },
} as const;

export const problem = {
  eyebrow: "Why this exists",
  title: "A successful run is useful once. A durable workflow asset is useful again.",
  description:
    "Most agent workflows end as a transcript, a few prompts, and a vague memory that something worked. Runwise treats each run as evidence that can become reusable knowledge or a documented failure boundary.",
  cards: [
    {
      title: "The workflow path gets lost",
      body: "Teams may keep the final output, but not the selected skills, review decisions, or execution path that made the result repeatable.",
    },
    {
      title: "A good output is mistaken for proof",
      body: "One strong answer does not prove the workflow can be selected again, reviewed safely, and promoted as a reusable asset.",
    },
    {
      title: "Failures rarely become guardrails",
      body: "Broken runs often contain the best prevention rules, but those lessons usually vanish instead of becoming reusable failure evidence.",
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
      logo: "/ecosystem/roo-code.png",
      kind: "icon",
      metric: "24.2k",
      metricLabel: "GitHub stars",
      metricValue: 24200,
    },
    {
      id: "cline",
      label: "Cline",
      logo: "/ecosystem/cline.png",
      kind: "icon",
      metric: "61.5k",
      metricLabel: "GitHub stars",
      metricValue: 61500,
    },
    {
      id: "openhands",
      label: "OpenHands",
      logo: "/ecosystem/openhands.png",
      kind: "icon",
      metric: "75k",
      metricLabel: "GitHub stars",
      metricValue: 75000,
    },
    {
      id: "browser-use",
      label: "Browser Use",
      logo: "/ecosystem/browser-use.png",
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
      logo: "/ecosystem/cursor.ico",
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
  eyebrow: "Why it matters",
  title: "The proof stack makes workflow improvement auditable.",
  description:
    "Once the visitor understands what the system preserves, this is the credibility layer: evidence capture, review gates, reusable memory, and promotion discipline.",
  stats: [
    { value: "Evidence", label: "before promotion", detail: "Runs, scores, review records, and proof artifacts are kept separate." },
    { value: "Gates", label: "before action", detail: "Human review, risk state, account state, and proof are explicit states." },
    { value: "Memory", label: "after each run", detail: "Reusable lessons move into KB assets instead of disappearing in chat." },
    { value: "Failures", label: "stay useful", detail: "Broken attempts become guardrails without being mislabeled as success." },
  ],
  spotlight: {
    label: "Operating model",
    scenario: "Proof stack for repeatable agent work",
    problem: "A good agent output is not enough. Runwise records the path that produced it, the checks that accepted it, and the evidence that makes it reusable.",
    outcome: "Promotion only happens after evidence and gates line up.",
    skills: [
      "skill selection",
      "workflow composition",
      "quality scoring",
      "human review",
      "risk gates",
      "proof verification",
      "KB writeback",
    ],
    evidence: [
      "run records",
      "gate ledgers",
      "verified and failed recipe boundaries",
    ],
    href: links.architecture,
  },
  cards: [
    {
      title: "Reusable workflow assets",
      stat: "Not just prompts",
      body: "Skills, workflows, schemas, run evidence, and KB entries form one traceable system for repeating the work.",
      proofLabel: "Core",
      proofValue: "architecture docs",
      href: links.architecture,
    },
    {
      title: "Reviewable promotion",
      stat: "Evidence-gated",
      body: "Quality score, human review, risk approval, proof verification, and promotion approval remain separate.",
      proofLabel: "Gate",
      proofValue: "promotion rules",
      href: links.agentRules,
    },
    {
      title: "Scenario-portable model",
      stat: "One core, many wrappers",
      body: "Scenario details stay local, so the base architecture can support content, research, engineering, and ops workflows.",
      proofLabel: "Boundary",
      proofValue: "directory map",
      href: links.directoryMap,
    },
  ],
} as const;

export const paperReproduction = {
  eyebrow: "Paper reproduction",
  title: "Microsoft SkillOpt, rebuilt as a local workflow-evidence loop.",
  description:
    "The implementation translates the paper architecture into this repository's Layer 2 optimization loop: freeze the target skill, generate bounded edits from run evidence, evaluate candidates on held-out evidence, preserve rejected edits, and export the accepted skill state before any durable promotion.",
  image: {
    src: "/architecture/skillopt-local-reproduction-gpt-image-2.png",
    alt: "GPT Image 2 architecture illustration of the local SkillOpt reproduction loop",
  },
  claim: "Current status: local architecture reproduction, not official paper benchmark parity.",
  steps: [
    {
      title: "Matched the training contract",
      body: "Mapped the official SkillOpt ideas into baseline skill, candidate skill, rollout evidence, held-out selection, and exported artifacts.",
    },
    {
      title: "Kept edits bounded",
      body: "Candidate changes are structured as add, delete, or replace operations instead of free-form prompt rewrites.",
    },
    {
      title: "Verified with local evidence",
      body: "The local run records score consistency, rejected candidates, sensitive-reference checks, and manifest-backed promotion boundaries before anything reaches the durable skill surface.",
    },
  ],
  artifacts: [
    { label: "Integration doc", href: links.skilloptIntegration },
    { label: "Readiness report", href: links.skilloptReadiness },
    { label: "Skill wiki promotion", href: links.skillWikiPromotion },
    { label: "Promoted wiki entry", href: links.skillWikiEntry },
    { label: "Workflow", href: "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/workflows/skill-optimization/skillopt-style-skill-training.workflow.md" },
  ],
} as const;

export const scenarioHeatmap = {
  eyebrow: "Use cases + validated skill heatmap",
  title: "See which workflow skills are actually validated.",
  description:
    "The product is not a loose skill list. Each scenario is graded by evidence, so you can see what has been executed, reviewed, verified, and made reusable.",
  columns: ["Executed", "Reviewed", "Verified", "Reusable"],
  legend: [
    { status: "verified", label: "verified" },
    { status: "partial", label: "partial" },
    { status: "emerging", label: "emerging" },
    { status: "none", label: "not claimed" },
  ],
  scenarios: [
    {
      key: "xiaohongshu",
      tag: "Xiaohongshu Creator",
      status: "verified sample",
      title: "The v0.1 validation wrapper with the strongest evidence chain.",
      description:
        "A topic-to-draft workflow proved that multiple reusable skills can be selected, composed, reviewed, verified, reused, and improved through failure evidence. It is the strongest current wrapper, not the architecture definition.",
      evidence: [
        "verified recipe and verified workflow records",
        "draft proof with clicked_publish=false",
        "second run reused 8 of 10 base steps",
        "failed publish proof retained as guardrail evidence",
      ],
      boundary: "Verified for compliant draft save. Live publish is explicitly not claimed.",
      assets: ["verified-recipes/", "workflow-kb/verified-workflows/", "workflow-kb/failure-cases/"],
      rows: [
        { skill: "Skill discovery and normalization", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Workflow composition", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Content generation and style rewrite", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Quality scoring", cells: ["verified", "verified", "verified", "partial"] },
        { skill: "Human review gate", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Risk and account-state gate", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Draft/proof verification", cells: ["verified", "verified", "verified", "partial"] },
        { skill: "KB writeback", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Failure-to-guardrail", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Skill optimization", cells: ["emerging", "emerging", "none", "none"] },
      ],
    },
    {
      key: "agora",
      tag: "Agora Voice Agent",
      status: "emerging",
      title: "A real-time agent scenario for checking workflow validation beyond content.",
      description:
        "Agora expands the validation surface toward environment checks, runtime proof, CLI readiness, and scenario-owned risk gates without redefining the core architecture.",
      evidence: [
        "scenario boundary and scoring rubric exist",
        "baseline run records environment and runtime proof",
        "reusable patterns remain candidate-level",
      ],
      boundary: "Not promoted as a verified reusable recipe. Evidence is scenario-run level.",
      assets: ["scenarios/agora-voice-agent-demo/", "runs/001-agora-voice-agent-quickstart-baseline/", "skills/agora-e2e-workflow-validation/"],
      rows: [
        { skill: "Skill discovery and normalization", cells: ["partial", "partial", "emerging", "emerging"] },
        { skill: "Workflow composition", cells: ["partial", "partial", "emerging", "none"] },
        { skill: "Environment readiness", cells: ["partial", "partial", "emerging", "none"] },
        { skill: "Runtime proof capture", cells: ["partial", "partial", "emerging", "none"] },
        { skill: "Quality scoring", cells: ["partial", "partial", "none", "none"] },
        { skill: "Risk gate", cells: ["partial", "partial", "none", "none"] },
        { skill: "KB writeback", cells: ["emerging", "none", "none", "none"] },
        { skill: "Verified promotion", cells: ["none", "none", "none", "none"] },
      ],
    },
    {
      key: "skillopt",
      tag: "Skill Optimization",
      status: "local method",
      title: "A generic optimization loop for improving reusable skill documents.",
      description:
        "SkillOpt-style work is treated as Layer 2 skill optimization: bounded edits, split evidence, held-out selection, explicit rejection records, and gated promotion into the skill wiki.",
      evidence: [
        "schema contracts for skill edits and optimization runs",
        "validator checks train/selection evidence split",
        "promotion manifest and durable wiki/registry/retrieval records are enforced",
        "minimal XHS KB-reuse optimization run passes",
      ],
      boundary: "Experimental local architecture only. No official SkillOpt code or external benchmark is claimed.",
      assets: ["docs/skillopt-integration.md", "workflows/skill-optimization/", "runs/008-xhs-skillopt-kb-reuse-minimal/"],
      rows: [
        { skill: "Evidence split", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Bounded skill edits", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Held-out selection gate", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Risk gate compatibility", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Rejected-edit preservation", cells: ["emerging", "none", "none", "none"] },
        { skill: "Official optimizer integration", cells: ["none", "none", "none", "none"] },
      ],
    },
    {
      key: "research",
      tag: "Research / Analysis",
      status: "target",
      title: "A repeatable analysis workflow target, not yet a promoted recipe.",
      description:
        "The framework fits market scans, competitor research, literature review, and due diligence when source selection and review notes need to become reusable evidence.",
      evidence: [
        "supported by the generic workflow model",
        "no dedicated verified research recipe yet",
        "requires scenario rubric before promotion",
      ],
      boundary: "Use-case fit is claimed. Verified workflow status is not claimed.",
      assets: ["docs/architecture.md", "docs/workflow-knowledge-base.md"],
      rows: [
        { skill: "Source selection", cells: ["emerging", "none", "none", "none"] },
        { skill: "Synthesis workflow", cells: ["emerging", "none", "none", "none"] },
        { skill: "Review rubric", cells: ["emerging", "none", "none", "none"] },
        { skill: "KB writeback", cells: ["emerging", "none", "none", "none"] },
        { skill: "Verified promotion", cells: ["none", "none", "none", "none"] },
      ],
    },
    {
      key: "engineering",
      tag: "Engineering Delivery",
      status: "target",
      title: "A natural fit for bug triage, PR review, migrations, and release checks.",
      description:
        "Engineering workflows can preserve commands, failures, verifier output, reviewer feedback, and the exact execution path that worked.",
      evidence: [
        "framework model supports validator-backed runs",
        "no dedicated engineering verified recipe yet",
        "promotion would need repo-specific gates",
      ],
      boundary: "Workflow pattern fit only. No engineering delivery recipe is promoted.",
      assets: ["docs/principles.md", "docs/directory-architecture.md"],
      rows: [
        { skill: "Command capture", cells: ["emerging", "none", "none", "none"] },
        { skill: "Review feedback loop", cells: ["emerging", "none", "none", "none"] },
        { skill: "Validator evidence", cells: ["emerging", "none", "none", "none"] },
        { skill: "Release gate", cells: ["none", "none", "none", "none"] },
        { skill: "Reusable recipe", cells: ["none", "none", "none", "none"] },
      ],
    },
    {
      key: "ops",
      tag: "Monitoring / Ops Review",
      status: "target",
      title: "Recurring review loops can become KB-backed operational memory.",
      description:
        "The same evidence model can support watchlists, incident reviews, weekly reports, competitive changes, and operational checkups.",
      evidence: [
        "recurring-loop fit follows from KB writeback model",
        "no dedicated monitoring verified run yet",
        "needs freshness, source, and review gates",
      ],
      boundary: "Potential application area only. Not verified as a scenario recipe.",
      assets: ["workflow-kb/", "reports/"],
      rows: [
        { skill: "Freshness checks", cells: ["emerging", "none", "none", "none"] },
        { skill: "Recurring evidence capture", cells: ["emerging", "none", "none", "none"] },
        { skill: "Fallback strategy", cells: ["emerging", "none", "none", "none"] },
        { skill: "Human review", cells: ["none", "none", "none", "none"] },
        { skill: "Verified promotion", cells: ["none", "none", "none", "none"] },
      ],
    },
  ],
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
  title: "One loop: assets, evidence, gates, writeback, promotion.",
  description:
    "Reusable assets are selected, concrete runs create evidence, gates decide whether anything can be written back, and promotion remains explicit.",
  flow: ["Assets", "Run evidence", "Review gates", "KB writeback", "Promotion"],
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
  rules: [
    "A quality score is not human approval.",
    "Scenario risk stays inside the scenario boundary.",
    "Failed evidence is reusable, but it stays failed.",
  ],
  visuals: [
    {
      label: "Architecture",
      title: "Five-layer workflow evidence architecture",
      body: "Raw runs, core contracts, optimization, durable knowledge, and scenario validation stay separate.",
      src: "/architecture/workflow-architecture-dark.png",
      alt: "Dark mode workflow evidence architecture diagram",
    },
    {
      label: "Workflow Loop",
      title: "Run once, evolve once loop",
      body: "A useful run becomes durable only after selection, execution, scoring, review, verification, and writeback close the loop.",
      src: "/architecture/workflow-loop-dark.png",
      alt: "Dark mode workflow loop diagram",
    },
    {
      label: "Validation Gates",
      title: "Evidence-first promotion pipeline",
      body: "Quality, human review, risk state, account state, proof verification, and promotion remain separate gates.",
      src: "/architecture/workflow-validation-dark.png",
      alt: "Dark mode workflow validation pipeline diagram",
    },
  ],
  visual: {
    src: "/architecture/workflow-architecture-dark.png",
    alt: "Dark mode workflow evidence architecture diagram",
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
  eyebrow: "Durable assets",
  title: "Runs stay temporary. Durable assets are what survive promotion.",
  description:
    "The point of the framework is not to collect files. It is to separate temporary execution records from the durable surfaces that future runs can actually reuse: skill wiki pages, workflow KB entries, verified recipes, and governed rule drafts.",
  assets: [
    { path: "skills/", label: "Reusable capability definitions and maps" },
    { path: "skills/wiki/", label: "Canonical promoted skill pages backed by manifests, registry records, and retrieval entries" },
    { path: "workflows/", label: "Composable execution paths" },
    { path: "runs/", label: "Evidence records from specific executions" },
    { path: "workflow-kb/", label: "Reusable memory, rubrics, patterns, and failure cases" },
    { path: "verified-recipes/", label: "Promotion-approved workflow recipes" },
    { path: "failed-recipes/", label: "Failed runs with reusable lessons" },
    { path: "evolution-drafts/", label: "Proposed long-lived rule changes" },
  ],
  spotlight: {
    title: "What stays temporary",
    body: "Run records, one-off experiments, draft notes, and incomplete evidence remain execution artifacts. They matter, but they are not durable assets yet.",
    items: ["run transcripts", "raw outputs", "one-off experiments", "incomplete gate evidence"],
  },
  durable: {
    title: "What becomes durable",
    body: "Only the surfaces that future runs can actually rely on should survive promotion.",
    items: ["skill wiki entries", "workflow KB patterns", "verified recipes", "approved evolution drafts"],
  },
} as const;

export const scenario = {
  eyebrow: "Validated scenario",
  title: "Proven through one concrete scenario, designed for many.",
  body: "The current Xiaohongshu workflow is the strongest validation wrapper, not the product identity. It proves that the framework can move from skill discovery to run evidence, review gates, draft proof, KB writeback, and verified recipe promotion while keeping scenario-specific rules local. The same model can support research workflows, report generation, monitoring, and operational review loops.",
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
  title: "Start with the page that answers your question fastest.",
  body: "The homepage gives the overview. The other pages separate trust, validated cases, evolution, and wiki-level durable knowledge so you do not need to read one long scroll to understand the system.",
  actions: [
    {
      label: "Proof",
      href: "/proof",
      detail: "See the evidence, gates, and promotion discipline that make the framework credible.",
      external: false,
    },
    {
      label: "Cases",
      href: "/cases",
      detail: "See where the framework is validated today and where it is only a target fit.",
      external: false,
    },
    {
      label: "Wiki",
      href: "/wiki",
      detail: "See what becomes durable knowledge and how promoted skill wiki pages fit the model.",
      external: false,
    },
  ],
} as const;
