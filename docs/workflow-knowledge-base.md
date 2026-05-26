# Workflow Knowledge Base

The workflow knowledge base is the durable memory of this project.

## What Belongs Here

- verified workflows
- scenario recipes
- composition patterns
- evaluation rubrics
- failure cases
- fallback strategies when explicitly verified
- reusable prompts
- failed workflows and failed recipes, but only under explicit failed namespaces

## What Does Not Belong Here

- speculative ideas without evidence
- unreviewed shortcuts
- large unverified prompt dumps
- scenario assumptions that are not reusable
- failed assets stored under verified promotion paths

## Usage

The knowledge base should be queried before a new run and updated after every verified run.

## Success Archive Contract

A successful run is not reusable knowledge until it has a clear evidence chain:

1. source run under `runs/<run-id>/`,
2. gate ledger or equivalent proof,
3. sensitive-data review,
4. reusable conclusion in `workflow-kb/`,
5. retrieval entry in `workflow-kb/retrieval-index.json`,
6. recipe promotion only when the promotion gates pass.

Every reusable KB record should include:

- `source_path`,
- `evidence_refs`,
- `verified_status`,
- `risk_level`,
- `sensitive_data_status`,
- `reusable_for`,
- explicit scope and non-scope in the source asset.

## Sensitive Data Rule

Do not copy private runtime details from `runs/` into reusable knowledge. A KB
entry may record non-sensitive classes such as `automation_profile`,
`user_visible_profile`, or `mcp_cookie_file`, but it must not record cookies,
account names, local profile paths, browser history, private URLs, or personal
identifiers.
