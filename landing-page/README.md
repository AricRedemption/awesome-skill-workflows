# Landing Page

This app is the public documentation and discovery surface for
`awesome-skill-workflows`.

## Product boundary

The landing page should communicate three things clearly:

1. the repository stores canonical skill and workflow knowledge
2. promoted assets are evidence-backed rather than marketing-only claims
3. execution status comes from validators and preserved run evidence, not from a
   separate CMS truth layer

## Current public surfaces

- homepage and repository positioning
- skill wiki discovery and detail browsing
- repository proof and architecture links
- PaaS-ready workflow service documentation entry points

## Current workflow-service message

The website must keep these claims separate:

- technical Xiaohongshu orchestration verdict: `partial`
- human-reviewed PaaS readiness verdict: `accepted_for_paas`

Do not collapse those two states into a generic "passed" badge.

## Build

```bash
npm run build
```

Wiki is bundled into the landing app at `/wiki` (static assets under `/wiki-app/`).
Copy step runs automatically via `predev` / `prebuild`.
