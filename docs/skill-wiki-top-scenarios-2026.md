# Skill Wiki Top Scenarios 2026

## Goal

Use current public skill marketplace data to choose a compact but credible hot
scenario taxonomy for `skills/wiki/`, then map representative popular or
official skills into each scenario.

## Primary Sources

- `https://skills-hub.ai/`
- `https://openagentskills.dev/`

## Data Snapshot

- Skills Hub homepage claims `5,450+` specialists and `23` categories.
- Open Agent Skills homepage shows `2.3k+` indexed skills across `9` task categories and `383+` official skills.
- Open Agent Skills category counts visible on the homepage:
  - Development: `639`
  - Security: `408`
  - Collaboration: `373`
  - Creative and Media: `219`
  - Data and Analysis: `195`
  - Document Processing: `181`
  - Business: `156`
  - Productivity: `72`
  - Communication: `45`
- Skills Hub visible popular or featured skills used as public market anchors:
  - `code-review`
  - `markitdown`
  - `frontend-design`
  - `ui-design-system`
  - `Skill Finder`
  - `design-to-code`
  - `security-review`
  - `research`
  - `data-analyst`
  - `content-creator`
  - `app-builder`
  - `workflow-builder`
  - `daily-standup`

## Backbone Scenarios

1. Development and engineering delivery
2. Office document automation
3. AI agent workflow builder
4. Product management and team collaboration
5. Research and investment analysis
6. Security and risk review
7. Cloud deployment and ops
8. Marketing and content operations
9. Business finance and backoffice
10. Design presentation and UI production

## Extended Hot Scenarios

11. Productivity and office assistant
12. Testing QA and release readiness
13. Documentation and knowledge management
14. Founder prototyping and no-code build
15. Integration and MCP tooling
16. Education and team enablement

## Why This Taxonomy

- It follows visible marketplace supply, not only personal intuition.
- It preserves user-prioritized domains such as finance, office, AI, research,
  development, and product management.
- It can be mapped immediately to already-landed Skill Wiki pages, which keeps
  the enrichment pass honest and fast.

## Output Surface

- Scenario bundle pages are written into `skills/wiki/` so `find-skill` can
  return them directly.
- Individual marketplace-popular skills are also written into `skills/wiki/`
  with explicit import and validation boundaries.
