# Ubiquitous Language

## Framework model

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Core Skill Architecture** | The scenario-agnostic system for composing, validating, and evolving reusable skill workflows. | Product flow, Xiaohongshu system |
| **Scenario** | A concrete validation context with its own constraints, risk rules, and scoring logic. | Product, global rule |
| **Validation Wrapper** | The scenario-specific layer used to prove the core architecture without redefining it. | Core model, framework |
| **Run Evidence** | The records, artifacts, scores, and review outputs produced by one specific workflow execution. | Output, result |
| **Promotion Gate** | The explicit rule boundary that decides whether run evidence can become a durable asset. | Success check, final score |
| **Verified Recipe** | A workflow recipe promoted only after evidence, review, and verification requirements are satisfied. | Successful run, draft recipe |
| **Workflow Knowledge Base** | The durable reusable store of patterns, failure cases, rubrics, and retrieval entries. | Notes, archive |

## Landing page language

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Landing Page** | The standalone frontend that explains the framework and links to its evidence. | App, dashboard |
| **Hero** | The opening section that establishes positioning, key action paths, and the first mental model. | Banner, intro block |
| **Evidence-led Layout** | A page structure that explains the system through proof, process, and artifact boundaries rather than generic marketing claims. | SaaS layout, promo page |
| **Section Navigation** | The header-level anchor links that jump to the major explanatory sections of the page. | Menu, tabs |

## Relationships

- A **Scenario** acts as a **Validation Wrapper** around the **Core Skill Architecture**.
- A **Run Evidence** set is evaluated by one or more **Promotion Gates**.
- A passed **Promotion Gate** can allow evidence to become a **Verified Recipe** or a **Workflow Knowledge Base** entry.
- The **Landing Page** should present the **Evidence-led Layout** of the framework, not collapse the framework into one **Scenario**.

## Example dialogue

> **Dev:** "Is the Xiaohongshu flow the product this page is selling?"
>
> **Domain expert:** "No. That flow is a **Scenario** and specifically a **Validation Wrapper** for the **Core Skill Architecture**."
>
> **Dev:** "So the page should lead with the framework, then show proof from **Run Evidence** and the **Verified Recipe**?"
>
> **Domain expert:** "Exactly. The **Landing Page** should use an **Evidence-led Layout** so visitors understand the architecture first and the scenario second."

## Flagged ambiguities

- "scenario" and "framework" are easy to blur together. Use **Scenario** only for the concrete validation context, and **Core Skill Architecture** for the reusable system.
- "result", "proof", and "evidence" were close in meaning. Prefer **Run Evidence** when referring to execution artifacts and **Promotion Gate** when referring to the decision boundary.
- "page", "app", and "dashboard" can imply different products. Prefer **Landing Page** because this frontend explains the framework rather than operating it.
