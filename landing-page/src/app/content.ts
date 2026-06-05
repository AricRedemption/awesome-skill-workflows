export const links = {
  repository: "https://github.com/AricRedemption/awesome-skill-workflows",
  architecture:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/architecture.md",
  actionVerification:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/action-verification.md",
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
  selfEvolution:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/self-evolution.md",
  paasService:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/paas-ready-workflow-service.md",
  multiAgent:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/docs/multi-agent-workflows.md",
  piAgent: "https://github.com/earendil-works/pi",
  docs:
    "https://github.com/AricRedemption/awesome-skill-workflows/tree/main/docs",
  agentRules:
    "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/AGENTS.md",
  wiki: "/wiki",
} as const;

const skillWikiSummary = {
  skillCount: 145,
  categoryCount: 8,
  categories: {
    research: 33,
    office: 24,
    media: 25,
    automation: 16,
  },
} as const;

export const brand = {
  name: "Runwiser",
  repositoryName: "awesome-skill-workflows",
  logo: "/brand/runwise-logo.png",
  description:
    "Evidence-first AI agent workflow operating layer for verified reusable assets.",
} as const;

export const footer = {
  links: [
    { label: "GitHub", href: links.repository, external: true },
    { label: "Docs", href: links.docs, external: true },
    { label: "Directory", href: links.directoryMap, external: true },
  ],
} as const;

export const sitePages = [
  {
    label: "Home",
    href: "/",
    title: "Run wiser, prove stronger.",
    description:
      "Turn repeated agent runs into verified, reusable workflow assets—with proof, gates, and writeback kept separate.",
  },
  {
    label: "Orchestration",
    href: "/orchestration",
    title: "Plan clearer, gate stronger.",
    description: "Planner, worker, reviewer, verifier—with hard gates between handoffs.",
  },
  {
    label: "Proof",
    href: "/proof",
    title: "Prove clearer, trust stronger.",
    description: "Evidence, gates, and promotion stay in separate lanes.",
  },
  {
    label: "Evolution",
    href: "/evolution",
    title: "Learn tighter, drift lighter.",
    description: "Evidence-backed writeback—no silent prompt drift.",
  },
  {
    label: "Wiki",
    href: links.wiki,
    title: "Keep leaner, trust stronger.",
    description: "Promoted knowledge only—each asset has a home and a bar.",
  },
  {
    label: "Cases",
    href: "/cases",
    title: "Prove deeper, scale cleaner.",
    description: "One deep scenario proof plus a broader structured case surface.",
  },
] as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Orchestration", href: "/orchestration" },
  { label: "Proof", href: "/proof" },
  { label: "Evolution", href: "/evolution" },
  { label: "Wiki", href: links.wiki },
  { label: "Cases", href: "/cases" },
  { label: "Docs", href: links.docs },
] as const;

export const hero = {
  eyebrow: "Evidence-first workflow operating layer",
  title: "Run wiser, prove stronger.",
  description:
    "Turn repeated agent runs into verified, reusable workflow assets—with proof, gates, and writeback kept separate.",
  primaryCta: "Explore the model",
  primaryHref: "/proof",
  secondaryCta: "See proven cases",
  secondaryHref: "/cases",
  secondaryExternal: false,
  consoleSteps: ["Run", "Score", "Review", "Verify", "Write back", "Promote"],
  signals: [
    { label: "Source", value: "real run evidence" },
    { label: "Gate", value: "review + verify + scenario checks" },
    { label: "Output", value: "reusable workflow asset" },
  ],
} as const;

export const problem = {
  eyebrow: "The gap",
  title: "Scatter faster, prove stronger.",
  description: "Agent work ends in chat. What survives is the workflow asset.",
  cards: [
    {
      title: "Scattered",
      body: "Prompts stay in chat, not in the system.",
    },
    {
      title: "Unrepeatable",
      body: "One good output does not prove a reusable workflow.",
    },
    {
      title: "Lost failures",
      body: "The best guardrails die with the transcript.",
    },
  ],
} as const;

export const firstClickPaths = {
  eyebrow: "Start here",
  title: "Start wiser, go deeper.",
  description:
    "Trust, roles, evolution, durability, or scenario fit—start where your question lives.",
  paths: [
    {
      title: "Can I trust it?",
      body: "Proof stack, gate separations, and readiness without relabeling.",
      href: "/proof",
      cta: "Open proof",
    },
    {
      title: "How do roles run?",
      body: "Planner to verifier, with hard review gates between handoffs.",
      href: "/orchestration",
      cta: "See orchestration",
    },
    {
      title: "How does it improve?",
      body: "Bounded writeback from run evidence—not prompt drift.",
      href: "/evolution",
      cta: "See evolution",
    },
    {
      title: "What gets kept?",
      body: "Wiki, workflow-kb, and promotion boundaries for durable assets.",
      href: "/wiki",
      cta: "Browse wiki",
    },
    {
      title: "Where is it proven?",
      body: "Deepest scenario proof plus the broader case map.",
      href: "/cases",
      cta: "See cases",
    },
  ],
} as const;

export const visionValue = {
  eyebrow: "Vision and value",
  title: "Keep better, relearn less.",
  description:
    "The value is simple: useful runs do not disappear. Teams keep the proof, the gate result, and the reusable path.",
  pillars: [
    {
      title: "Immediate value",
      body: "Useful runs stop disappearing into chat. Teams keep the proof, review outcome, and reusable path.",
    },
    {
      title: "Long-term vision",
      body: "Agent workflows become durable assets: reviewable, improvable, retrievable, and eventually serviceable.",
    },
  ],
  gaps: [
    {
      title: "Prompt libraries stop too early",
      body: "They help you start, but they do not preserve whether the run worked, what failed, or what earned reuse.",
    },
    {
      title: "Eval tools stop at scoring",
      body: "They tell you how a run performed, but not what should become durable knowledge or what must stay blocked.",
    },
    {
      title: "Automation layers stop at execution",
      body: "They can run steps, but they rarely keep hard review, proof boundaries, and reusable failure evidence separate.",
    },
  ],
} as const;

export const differentiation = {
  eyebrow: "Where it differs",
  title: "Run deeper, reuse stronger.",
  description: "Not a prompt library, eval tool, wiki, or script—a workflow operating layer.",
  items: [
    {
      title: "Prompt library",
      label: "Useful, but incomplete",
      body: "Prompt collections help you start faster, but they do not preserve run evidence, review outcomes, or promotion state.",
      contrast: "Runwiser keeps the path and the proof, not just the text.",
    },
    {
      title: "Eval harness",
      label: "Necessary, but narrower",
      body: "Evaluation tells you how a run scored. It does not decide what becomes durable, what stays failed, or how future runs retrieve the lesson.",
      contrast: "Scoring is one gate—not the whole writeback loop.",
    },
    {
      title: "Skill wiki",
      label: "Readable, but downstream",
      body: "A wiki is where promoted knowledge ends up. It is not the full system that decides how that knowledge earned promotion.",
      contrast: "Wiki is where promoted knowledge lands—not how it earns promotion.",
    },
    {
      title: "Automation script",
      label: "Fast, but brittle",
      body: "A script can execute steps, but it rarely captures review boundaries, service readiness, or reusable failure evidence.",
      contrast: "Execution without separated review and proof boundaries.",
    },
  ],
} as const;

export const ecosystem = {
  eyebrow: "Agent ecosystem",
  title: "Compatible with the agent stack you already run.",
  description:
    "This layer sits above existing agent tools and gives repeated work a path to proof, review, and reuse.",
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
  eyebrow: "What we prove",
  title: "Proof tighter, trust stronger.",
  description: "What this repo already proves—not what it merely claims.",
  stats: [
    { value: "Evidence", label: "before promotion", detail: "Runs, scores, and proof stay separate." },
    { value: "Gates", label: "before action", detail: "Human review, risk, and proof are explicit." },
    { value: "Writeback", label: "after each run", detail: "Useful lessons move into the right durable layer." },
    { value: "Service", label: "without trust collapse", detail: "HTTP readiness stays separate from technical proof." },
  ],
  spotlight: {
    label: "Operating model",
    scenario: "Proof stack for repeatable agent work",
    problem: "A good output is not enough. The durable asset is the path, the gates, the writeback, and the service boundary.",
    outcome: "Promotion follows evidence and gates. Service status never overwrites technical truth.",
    skills: [
      "skill selection",
      "workflow composition",
      "quality scoring",
      "human review",
      "risk gates",
      "proof verification",
      "KB writeback",
      "readiness modeling",
    ],
    evidence: [
      "run records",
      "gate ledgers",
      "verified and failed recipe boundaries",
      "service readiness status",
    ],
    href: links.architecture,
  },
  cards: [
    {
      title: "Proof stack",
      stat: "Proof before reuse",
      body: "Evidence, review, and promotion never collapse into one badge.",
      proofLabel: "Core",
      proofValue: "action verification",
      href: links.actionVerification,
    },
    {
      title: "Bounded self-evolution",
      stat: "Learn without drift",
      body: "Failures and gaps write back through drafts—not prompt drift.",
      proofLabel: "Evolution",
      proofValue: "self-evolution rules",
      href: links.selfEvolution,
    },
    {
      title: "PaaS-ready workflow service",
      stat: "Ready without lying",
      body: "HTTP readiness stays separate from technical validation.",
      proofLabel: "Service",
      proofValue: "PaaS contract",
      href: links.paasService,
    },
  ],
} as const;

export const proofStackExplainer = {
  eyebrow: "Runwiser proof stack",
  title: "Layer clearer, claim stronger.",
  description: "Six layers, six questions—evidence, contracts, evolution, memory, scenario, and service stay separate.",
  principle: "A good run is not yet a reusable asset. Each layer keeps a different truth.",
  compactCta: {
    label: "Full proof stack",
    href: "/proof",
  },
  layers: [
    {
      label: "Layer 0",
      title: "Run evidence",
      body: "Inputs, outputs, scores, blockers, and proof from one concrete execution.",
      path: "runs/",
      claim: "What actually happened?",
    },
    {
      label: "Layer 1",
      title: "Core contracts",
      body: "Scenario-agnostic schemas, workflows, validators, and action-verification rules.",
      path: "schemas/ + workflows/",
      claim: "What is reusable across scenarios?",
    },
    {
      label: "Layer 2",
      title: "Bounded evolution",
      body: "Evidence-backed notes, candidate edits, and draft rule changes—not silent prompt drift.",
      path: "evolution/ + evolution-drafts/",
      claim: "What should change before the next run?",
    },
    {
      label: "Layer 3",
      title: "Durable knowledge",
      body: "KB entries, failure cases, wiki pages, and retrieval records promoted from verified runs.",
      path: "workflow-kb/ + skills/wiki/",
      claim: "What can future runs retrieve?",
    },
    {
      label: "Layer 4",
      title: "Scenario wrapper",
      body: "Local constraints, risk rules, account boundaries, and human handoff gates for one validation context.",
      path: "scenarios/",
      claim: "Which constraints stay local?",
    },
    {
      label: "Layer 5",
      title: "Service boundary",
      body: "HTTP readiness and status on top of repo-owned evidence—without rewriting technical truth.",
      path: "services/workflow-api/",
      claim: "What can safely become a service?",
    },
  ],
  separations: [
    "Quality score is not human approval.",
    "Action fact is not compliance proof.",
    "A failed run can teach the system without becoming a verified recipe.",
    "Technical validation can stay partial while operational readiness is accepted.",
  ],
} as const;

export const selfEvolutionCaseStudy = {
  eyebrow: "Self-evolution case study",
  title: "The system improves by routing one gap to the smallest durable writeback.",
  description:
    "This is the important distinction: self-evolution does not mean the agent silently rewrites its own instructions. It means evidence finds the narrowest safe place to change future behavior.",
  caseLabel: "Current acceptance path",
  caseTitle: "Positive draft proof plus a login-reset blocker becomes a bounded readiness rule.",
  outcome:
    "The workflow can progress as PaaS-ready because the remaining blocker is operationally isolated, while technical validation still tells the truth: partial.",
  timeline: [
    {
      title: "Evidence arrived",
      body: "Prior run evidence showed compliant draft-save proof with publish disabled and explicit action-verification records.",
      artifact: "runs/003 + action-verification.json",
    },
    {
      title: "Gap appeared",
      body: "A fresh visible-session recheck hit a login reset. That blocks full technical validation, but it does not erase the prior draft proof.",
      artifact: "runs/018",
    },
    {
      title: "Boundary was chosen",
      body: "The gap stayed in the technical lane instead of being hidden behind a broad passed verdict.",
      artifact: "technical_validation.status=partial",
    },
    {
      title: "Writeback stayed bounded",
      body: "Human-reviewed readiness accepted PaaS progression while preserving the exact blocker and evidence references.",
      artifact: "runs/022",
    },
    {
      title: "Future runs improve",
      body: "The next service or validation run can now query the known blocker, readiness decision, and proof requirements.",
      artifact: "workflow-api readiness contract",
    },
  ],
  guardrails: [
    {
      title: "No silent prompt drift",
      body: "Long-lived rule changes go through evolution drafts, not direct mutation from one run.",
    },
    {
      title: "No proof laundering",
      body: "Blocked technical validation remains blocked or partial, even when product readiness is accepted.",
    },
    {
      title: "No scenario leakage",
      body: "Xiaohongshu-specific risk and account rules stay inside the scenario boundary.",
    },
  ],
  artifacts: [
    { label: "Self-evolution doc", href: links.selfEvolution },
    { label: "PaaS service doc", href: links.paasService },
    { label: "Multi-agent contract", href: links.multiAgent },
  ],
} as const;

export const paasReadinessExplainer = {
  eyebrow: "PaaS readiness, without trust collapse",
  title: "Why technical_validation=partial and readiness_level=accepted_for_paas can both be true.",
  description:
    "Runwiser models readiness as two tracks. Technical validation says what the latest orchestration proved. Product readiness says whether the service boundary is safe enough to expose with the known limits.",
  verdicts: [
    {
      label: "Technical track",
      value: "technical_validation=partial",
      tone: "amber",
      body: "A fresh visible-session recheck is still blocked by login reset, so the orchestration cannot honestly claim full technical pass.",
      keeps: ["final_terminal_state=blocked", "blocker preserved", "no relabeling as passed"],
    },
    {
      label: "Readiness track",
      value: "readiness_level=accepted_for_paas",
      tone: "green",
      body: "The service can expose repo-owned validation and readiness because prior draft proof is positive, publish stayed disabled, and the blocker is isolated.",
      keeps: ["human-reviewed acceptance", "evidence references intact", "service scope constrained"],
    },
  ],
  equation: [
    "Positive draft proof",
    "clicked_publish=false",
    "known isolated blocker",
    "human-reviewed readiness",
    "thin HTTP surface",
  ],
  notAllowed: [
    "Do not convert partial technical validation into passed technical validation.",
    "Do not let PaaS readiness imply live publish proof.",
    "Do not move scenario-specific account rules into Layer 1.",
  ],
  href: links.paasService,
} as const;

export const paperReproduction = {
  eyebrow: "Paper reproduction",
  title: "Microsoft SkillOpt, rebuilt as a local workflow-evidence loop.",
  description:
    "The paper is adapted into a local loop: bounded edits, held-out checks, rejected candidates, and explicit export.",
  image: {
    src: "/architecture/skillopt-local-reproduction-gpt-image-2.png",
    alt: "GPT Image 2 architecture illustration of the local SkillOpt reproduction loop",
  },
  claim: "Current status: local architecture reproduction, not official paper benchmark parity.",
  steps: [
    {
      title: "Matched the training contract",
      body: "Mapped the paper into baseline skill, candidate skill, and held-out selection.",
    },
    {
      title: "Kept edits bounded",
      body: "Changes stay bounded instead of turning into free-form rewrites.",
    },
    {
      title: "Verified with local evidence",
      body: "Local runs check score consistency, rejected candidates, and promotion boundaries.",
    },
  ],
  artifacts: [
    { label: "Integration doc", href: links.skilloptIntegration },
    { label: "Readiness report", href: links.skilloptReadiness },
    { label: "Workflow", href: "https://github.com/AricRedemption/awesome-skill-workflows/blob/main/workflows/skill-optimization/skillopt-style-skill-training.workflow.md" },
  ],
} as const;

export const scenarioHeatmap = {
  eyebrow: "Current case surface",
  title: "The case surface is now wider than one validation wrapper.",
  description:
    `The skill wiki now tracks ${skillWikiSummary.skillCount} skills across ${skillWikiSummary.categoryCount} categories. One workflow is the deepest end-to-end proof. The rest show where the system is already structured and reusable.`,
  columns: ["Cataloged", "Structured", "Proven", "Reusable"],
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
      status: "deepest proof",
      title: "Still the strongest end-to-end workflow proof in the system.",
      description:
        "This is still the most complete case: one workflow, one scenario boundary, one reusable proof chain.",
      evidence: [
        "verified recipe and verified workflow records",
        "draft proof with clicked_publish=false",
        "second run reused 8 of 10 base steps",
        "failed publish proof retained as guardrail evidence",
      ],
      boundary: "Verified for compliant draft save. Live publish is explicitly not claimed.",
      assets: ["verified-recipes/", "workflow-kb/verified-workflows/", "workflow-kb/failure-cases/"],
      rows: [
        { skill: "Workflow composition", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Human review and risk gate", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Draft proof boundary", cells: ["verified", "verified", "verified", "partial"] },
        { skill: "Failure writeback", cells: ["verified", "verified", "verified", "verified"] },
        { skill: "Skill optimization follow-up", cells: ["emerging", "emerging", "none", "none"] },
      ],
    },
    {
      key: "research",
      tag: "Research & Data",
      status: `${skillWikiSummary.categories.research} skills`,
      title: "Research is now the largest visible case family in the wiki.",
      description:
        "The wiki now covers search, analysis, medical research, and data-oriented skill seeds well beyond the original content workflow.",
      evidence: [
        "Brave Search skill entries and catalog seeds",
        "OpenClaw and NVIDIA research-facing wiki entries",
        "top-scenario research pages and category hubs",
      ],
      boundary: "Broadly cataloged and structured in the wiki. Not all entries are end-to-end workflow proof.",
      assets: ["skills/wiki/", "skill-wiki-web/data/skills.generated.js", "category-hub-*.md"],
      rows: [
        { skill: "Search and retrieval skills", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Scenario pages and hubs", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Official vendor seeds", cells: ["verified", "verified", "none", "partial"] },
        { skill: "End-to-end workflow proof", cells: ["partial", "partial", "none", "none"] },
      ],
    },
    {
      key: "office",
      tag: "Office & Productivity",
      status: `${skillWikiSummary.categories.office} skills`,
      title: "Office and productivity is now a substantial reusable case family.",
      description:
        "Google Workspace skills, event automation, collaboration entries, and productivity scenario pages now form a clear case surface.",
      evidence: [
        "Google Workspace Docs, Sheets, Drive, and Calendar skills",
        "productivity and collaboration category hubs",
        "office automation and assistant scenario pages",
      ],
      boundary: "Strong wiki coverage and reusable structure. Validation depth still varies by skill family.",
      assets: ["skills/wiki/google-workspace-*.md", "skills/wiki/category-hub-productivity.md", "skills/wiki/top-scenario-*.md"],
      rows: [
        { skill: "Workspace tool skills", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Automation recipes and hubs", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Scenario pages", cells: ["verified", "verified", "none", "partial"] },
        { skill: "End-to-end workflow proof", cells: ["partial", "partial", "none", "none"] },
      ],
    },
    {
      key: "media",
      tag: "Media & Creative",
      status: `${skillWikiSummary.categories.media} skills`,
      title: "Creative and media is now another large structured case surface.",
      description:
        "Creative tooling, image work, prompt authoring, and storytelling entries are now represented as reusable wiki surfaces.",
      evidence: [
        "creative-media category hub",
        "Composio and Skills Hub creative entries",
        "story collaboration and image enhancement skills",
      ],
      boundary: "Clear case coverage in the wiki. Deeper workflow proof still depends on the specific path.",
      assets: ["skills/wiki/category-hub-creative-media.md", "skills/wiki/composio-*.md", "skills/wiki/skillshub-*.md"],
      rows: [
        { skill: "Creative tool skills", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Scenario and hub pages", cells: ["verified", "verified", "none", "partial"] },
        { skill: "Vendor and collection imports", cells: ["verified", "verified", "none", "partial"] },
        { skill: "End-to-end workflow proof", cells: ["partial", "partial", "none", "none"] },
      ],
    },
    {
      key: "automation",
      tag: "Automation & MCP",
      status: `${skillWikiSummary.categories.automation} skills`,
      title: "Automation and MCP tooling is now an active case family, not just a target fit.",
      description:
        "Browser automation, Browserbase entries, MCP scenario pages, and integration hubs now show a broader live surface in the wiki.",
      evidence: [
        "Browserbase skill entries and catalog seeds",
        "integration and MCP tooling scenario pages",
        "productivity automation scenario pages",
      ],
      boundary: "Structured and discoverable in the wiki. End-to-end proof depth still varies by path.",
      assets: ["skills/wiki/hot-scenario-integration-and-mcp-tooling.md", "skills/wiki/browserbase-*.md", "skills/wiki/category-hub-*.md"],
      rows: [
        { skill: "Automation tool skills", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "MCP and integration scenarios", cells: ["verified", "verified", "partial", "partial"] },
        { skill: "Official vendor seeds", cells: ["verified", "verified", "none", "partial"] },
        { skill: "End-to-end workflow proof", cells: ["partial", "partial", "none", "none"] },
      ],
    },
  ],
} as const;

export const useCases = {
  eyebrow: "Where it applies",
  title: "Best when people cannot afford to rediscover the workflow every run.",
  description:
    "This system is strongest when work repeats, carries review or operational risk, and should get better from evidence instead of chat history.",
  items: [
    {
      title: "Research and analysis workflows",
      fit: "Competitor research, market scans, literature reviews, due diligence, and synthesis reports.",
      proof:
        "Capture source choice, review notes, and reusable research patterns.",
    },
    {
      title: "Engineering delivery workflows",
      fit: "Bug triage, PR review, release checks, migration plans, QA loops, and repo onboarding.",
      proof:
        "Preserve commands, failures, validator output, and reviewer feedback.",
    },
    {
      title: "Monitoring and recurring review",
      fit: "Data watchlists, weekly reports, incident review, competitive changes, and operational checkups.",
      proof:
        "Turn recurring observations into KB entries and better future selection.",
    },
    {
      title: "Content and publishing workflows",
      fit: "Draft generation, compliance review, channel-specific packaging, and human-approved handoff.",
      proof:
        "Keep quality, risk, draft proof, and publish boundaries separate.",
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
    "The reusable asset is the path, not just the final output.",
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
    "Quality, review, risk, handoff, and proof stay separate. That is why failure can still teach the system.",
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
    "Each directory has a job. The value is in the boundary between evidence and durable assets.",
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
  body: "The current Xiaohongshu workflow is a validation wrapper. It proves the path from skill discovery to evidence, review, draft proof, and KB writeback.",
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
  title: "Run together, repeat smarter.",
  body: "Shared workflows with proof, review, and writeback—not one-off chat.",
  actions: [
    {
      label: "Open GitHub",
      href: links.repository,
      detail: "Browse the repo, runs, schemas, and promotion evidence.",
      external: true,
    },
    {
      label: "Read architecture",
      href: links.architecture,
      detail: "Five-layer model, core loop, and module boundaries.",
      external: true,
    },
    {
      label: "Browse wiki",
      href: "/wiki",
      detail: "Durable skills, scenario pages, and promoted workflow surfaces.",
    },
    {
      label: "View docs",
      href: links.docs,
      detail: "Self-evolution, action verification, PaaS service, and scenario rules.",
      external: true,
    },
  ],
} as const;

export const orchestrationPage = {
  eyebrow: "Pi multi-agent orchestration",
  title: "Four Pi agents, one review-gated workflow.",
  description:
    "Pi is the execution substrate: planner, worker, reviewer, and verifier each run as a separate Pi agent session. The repository owns the reusable contract—role topology, handoff rules, and hard gates stay portable across backends.",
  substrate: {
    label: "Pi agent substrate",
    title: "Pi runs the roles. The repo owns the contract.",
    body: "Each handoff spawns a specialized Pi agent with role-scoped instructions—not one agent pretending to be four hats. Topology, gate placement, and writeback authority live in the repository, not in Pi runtime memory.",
    chips: ["separate Pi sessions per role", "hard review + verification gates", "repo-owned workflow JSON"],
    github: {
      label: "Pi agent on GitHub",
      repo: "earendil-works/pi",
      href: links.piAgent,
    },
  },
  teamView: {
    label: "Pi agent team",
    title: "Four agents collaborate on one bounded problem.",
    body: "Planner scopes the work, worker executes, reviewer enforces the hard gate, and verifier checks outcome and proof—each as its own Pi role session with explicit handoffs.",
  },
  roles: [
    {
      id: "planner",
      label: "01",
      title: "Planner agent",
      body: "Pi planner session: turns one bounded problem into a workflow path and assigns scoped work to downstream roles.",
      path: "planner",
      color: "amber",
    },
    {
      id: "worker",
      label: "02",
      title: "Worker agent",
      body: "Pi worker session: executes the assigned task, produces candidate output, and preserves execution evidence for review.",
      path: "worker",
      color: "blue",
    },
    {
      id: "reviewer",
      label: "03",
      title: "Reviewer agent",
      body: "Pi reviewer session: applies the hard review gate—output cannot move forward without an explicit pass.",
      path: "reviewer",
      color: "plum",
    },
    {
      id: "verifier",
      label: "04",
      title: "Verifier agent",
      body: "Pi verifier session: checks whether the requested action actually happened and whether proof meets the workflow contract.",
      path: "verifier",
      color: "green",
    },
  ],
  nodes: [
    { title: "spawn", body: "launch one Pi role session" },
    { title: "sequence", body: "ordered agent handoff" },
    { title: "fork", body: "bounded parallel Pi branches" },
    { title: "join", body: "merge branch outputs into one handoff" },
    { title: "loop", body: "bounded rework between worker and reviewer" },
  ],
  rules: [
    "planner, worker, reviewer, and verifier are separate Pi role sessions",
    "review gate mode must stay hard—not advisory",
    "verifier is required before any durable writeback",
    "writeback only after a passed terminal state",
    "Pi executes roles; the repository owns workflow semantics",
  ],
  flow: [
    { title: "Bound one problem", body: "one multi-agent workflow solves one bounded problem" },
    { title: "Spawn Pi role sessions", body: "each role gets its own agent context and scoped instructions" },
    { title: "Gate with review", body: "reviewer agent must pass before verifier or writeback can proceed" },
    { title: "Verify outcome", body: "verifier agent confirms the requested action and proof boundary" },
    { title: "Write back safely", body: "only passed multi-agent runs can promote durable knowledge" },
  ],
  links: [
    { label: "Pi agent (GitHub)", href: links.piAgent },
    { label: "Multi-agent contract", href: links.multiAgent },
    { label: "PaaS service", href: links.paasService },
    { label: "Architecture", href: links.architecture },
  ],
} as const;
