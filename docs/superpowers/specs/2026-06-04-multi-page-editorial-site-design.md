# Multi-Page Editorial Site Design

## Goal

Refactor the current `landing-page/` experience from a single long homepage
into a small product-style website with a clear editorial front door and a few
focused detail pages.

The goal is not to reduce substance. The goal is to make the substance easier
to understand by giving each major topic its own page-level surface.

## Interpretation

This is a **product-site architecture** change, not a docs-site rewrite.

Chosen direction:

- a homepage that explains the product clearly,
- several independent but connected pages for deeper proof,
- product-style storytelling before raw documentation depth,
- and repository docs still remain the source-of-truth references.

This is explicitly **not**:

- a pure one-page landing page,
- a generic docs portal,
- or a repo browser disguised as a homepage.

## Why The Scope Changed

The project now carries more information than a single scrolling page can hold
comfortably:

- core product explanation,
- proof and promotion gates,
- scenario validation and heatmap status,
- SkillOpt / Layer 2 optimization,
- durable assets versus temporary evidence.

Keeping all of that on one page pushes the homepage back toward a framework
showcase. Splitting the topics into pages creates clearer entry points and
reduces first-pass reading load.

## Site Model

The site should behave like:

- **Homepage as product overview**
- **Detail pages as product evidence surfaces**

The homepage should answer:

1. What is this?
2. Why does it matter?
3. What is different about this system?
4. Where should I go next?

The detail pages should answer:

- Why should I trust it?
- What scenarios are actually validated?
- How does SkillOpt-style optimization fit?
- What assets are durable versus temporary?

## Proposed Routes

### `/`

Purpose:

- product overview,
- why it exists,
- durable asset thesis,
- concise proof summary,
- route-level CTAs into deeper sections.

Primary content:

- hero,
- why this exists,
- what becomes durable,
- compact proof stack summary,
- compact scenario/status preview,
- CTA cards to deeper pages.

### `/proof`

Purpose:

- explain evidence, gates, verification, promotion discipline.

Primary content:

- proof stack,
- quality versus approval separation,
- human/risk/account/proof boundaries,
- promotion discipline,
- links to core evidence docs and validated artifacts.

### `/scenarios`

Purpose:

- show validated and target scenarios clearly.

Primary content:

- Xiaohongshu as strongest current wrapper,
- Agora as emerging scenario,
- research / engineering / ops as target fits,
- scenario heatmap,
- scenario boundary explanation.

### `/skillopt`

Purpose:

- explain Layer 2 optimization and local SkillOpt reproduction.

Primary content:

- what SkillOpt-style optimization means here,
- bounded edits,
- held-out selection,
- rejected-edit preservation,
- local architecture reproduction status,
- promotion into skill wiki.

### `/assets`

Purpose:

- explain durable project surfaces and repository meaning.

Primary content:

- temporary versus durable distinction,
- repository map,
- skill wiki / workflow KB / verified recipes / failed recipes /
  evolution drafts,
- what should and should not be promoted.

## Information Architecture Rules

### Homepage rules

- The homepage should not try to prove everything.
- It should create understanding first, then route the visitor.
- Deep tables, large interactive diagrams, and dense proof blocks should be
  summarized, not fully expanded.

### Detail-page rules

- Each page gets one central question.
- Avoid mixing proof, scenario status, and repository structure on the same
  page unless necessary.
- Each page should end with navigation to the adjacent concepts.

### Narrative order

The site-wide reading path should feel like:

1. product understanding,
2. trust and proof,
3. validated scope,
4. deeper optimization model,
5. durable asset structure.

## Visual Direction

Reading this as: a technical-buyer product site for engineers evaluating a
workflow framework, with a trust-first editorial language and a serious dark
interface.

Design principles:

- keep the existing dark palette family,
- keep the serious tone,
- reduce repeated equal-weight card treatment,
- create stronger page identity between overview and detail routes,
- use layout rhythm and typographic hierarchy instead of decorative excess.

Homepage:

- more editorial,
- more breathing room,
- clearer headline-to-proof path,
- less mini-dashboard density.

Detail pages:

- more structured,
- slightly denser,
- still product-like rather than plain documentation.

## Component Strategy

Prefer reusing and recomposing existing section components where possible.

Likely approach:

- keep current content objects as source modules,
- split route assembly into separate page components,
- refactor shared pieces such as header, footer, CTA navigation, section
  wrappers, and proof cards,
- only rewrite components when their single-page assumptions become limiting.

## Out Of Scope

- Do not rewrite repository facts or validation claims.
- Do not promote new workflow assets or recipes.
- Do not turn the site into a general docs renderer.
- Do not add fake product marketing tropes such as testimonials, inflated
  vanity metrics, or decorative motion without meaning.

## Verification

Implementation verification should include:

- `npm run build` in `landing-page/`
- route-level browser checks for all primary pages
- confirmation that homepage and detail pages have distinct roles
- confirmation that the site still communicates:
  - what the product is,
  - why it matters,
  - what is validated,
  - how SkillOpt fits,
  - what assets are durable

## Expected Outcome

After the rewrite:

- the homepage becomes easier to understand quickly,
- deep information no longer competes for first-viewport attention,
- visitors can choose the proof surface they need,
- and the project feels more like a designed product site than a single long
  framework scroll.
