# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a verified, isolated landing page for `awesome-skill-workflows`.

**Architecture:** Create a self-contained Vite + React workspace under `landing-page/`, modeled after the Starfirelandingpage structure. Keep all landing copy in `src/app/content.ts`, compose sections in `App.tsx`, and keep scenario-specific claims out of generic framework positioning.

**Tech Stack:** Vite, React 18, TypeScript, CSS modules via plain CSS imports.

---

## Chunk 1: Landing Workspace

### Task 1: Scaffold Buildable Vite React App

**Files:**
- Create: `landing-page/package.json`
- Create: `landing-page/index.html`
- Create: `landing-page/tsconfig.json`
- Create: `landing-page/tsconfig.node.json`
- Create: `landing-page/vite.config.ts`
- Create: `landing-page/src/main.tsx`
- Create: `landing-page/src/app/App.tsx`
- Create: `landing-page/src/app/content.ts`
- Create: `landing-page/src/app/components/*.tsx`
- Create: `landing-page/src/styles/index.css`
- Modify: `.gitignore`

- [x] Add project metadata and scripts.
- [x] Add Vite and TypeScript config.
- [x] Add centralized content based on existing README and architecture docs.
- [x] Add section components matching the approved design.
- [x] Add responsive CSS.
- [x] Run `npm install` in `landing-page/`.
- [x] Run `npm run build`.
- [x] Start dev server and run browser smoke check.

## Chunk 2: Verification And Review

### Task 2: Validate Goal Fit

**Files:**
- Read: `docs/superpowers/specs/2026-05-27-landing-page-design.md`
- Read: `landing-page/src/app/content.ts`
- Read: `landing-page/src/app/App.tsx`

- [x] Confirm no promotion-sensitive assets were modified.
- [x] Confirm the page does not make Xiaohongshu a global product identity.
- [x] Confirm Starfirelandingpage was used as architecture reference, not copied product content.
- [x] Inspect final diff.
- [x] Report build and browser evidence.
