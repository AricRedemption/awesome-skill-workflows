# Landing Page Design

## Goal

Build an isolated landing page for `awesome-skill-workflows` that follows the
architecture pattern of `ZhanlinCui/Starfirelandingpage`: a self-contained Vite
and React workspace with page assembly, section components, centralized content,
and local styles.

## Scope

The landing page presents this repository as an evidence-first framework for
turning repeatable AI agent work into reusable, measurable, and improvable skill
workflow assets.

In scope:

- Create a new `landing-page/` workspace.
- Use Vite, React, and TypeScript.
- Keep copy centralized in `src/app/content.ts`.
- Split visible page sections into focused components.
- Link to existing repository evidence and docs.
- Verify the app with a production build and browser smoke check.

Out of scope:

- Do not change core workflow assets under `skills/`, `workflows/`,
  `workflow-kb/`, `verified-recipes/`, `failed-recipes/`, `runs/`, or
  `scenarios/`.
- Do not promote new recipes or workflow knowledge.
- Do not deploy or publish the page.
- Do not present Xiaohongshu as the product identity; it remains a v0.1
  validation scenario.

## Architecture

The new workspace lives under `landing-page/` so the frontend can evolve without
changing the framework's reusable skill, workflow, evidence, or promotion
assets.

```text
landing-page/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ src/
   ├─ main.tsx
   ├─ app/
   │  ├─ App.tsx
   │  ├─ content.ts
   │  └─ components/
   └─ styles/
      └─ index.css
```

The page follows a simple one-way data shape:

1. `content.ts` owns copy, links, stats, and section data.
2. `App.tsx` assembles the landing sections.
3. Components render presentation-only UI from the content module.
4. Styles stay local to the landing workspace.

## Page Sections

- Header: project name, section navigation, GitHub link.
- Hero: framework positioning, primary docs link, repository link.
- Architecture: Layer 1 core skill architecture and Layer 2 scenario validation.
- Workflow Loop: run, score, review, verify, write back, evolve.
- Evidence Gates: human review, risk approval, proof verification, failed
  evidence separation.
- Knowledge Base: workflow KB, verified recipes, failed recipes, evolution
  drafts.
- Scenario Boundary: Xiaohongshu as the current validation wrapper only.
- Final CTA: read architecture, inspect verified recipe, run validators.
- Footer: concise repository map.

## Visual Direction

The interface should feel like a serious workflow operations framework: dense
enough for engineers, but readable for first-time visitors. It should avoid a
generic SaaS hero and instead use an evidence-led layout: process rail, layer
map, gate ledger, and linked artifacts.

Use a restrained light interface with dark ink, muted green/blue accents, and
clear panels. Cards should be used for repeated items only.

## Verification

- `npm run build` from `landing-page/` must pass.
- A local dev server must render a non-empty homepage.
- Browser smoke check must confirm the main heading, section navigation, and
  evidence sections are visible.
