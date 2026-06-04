# Run Summary: Official SkillOpt SearchQA Smoke And Selection Fixtures

## Status

- Run id: `009-skillopt-official-searchqa-smoke`
- Scope: official SkillOpt readiness evidence
- Status: local full smoke executed; selection fixture prepared separately
- Official benchmark target: `SearchQA`
- Promotion target: `none`
- Blocked proof: `blocked-smoke-proof.json`

## Purpose

Create a small durable SearchQA-style smoke split that can be passed to the
project-local SkillOpt `scripts/train.py --split_dir` contract after model
credentials are configured, without confusing runtime validation with
skill-improvement validation.

This run is not a paper benchmark reproduction. The smoke split is for
checking the runtime and dataloader contract. The separate selection split is
for future held-out comparison design, not runtime wiring.

## Smoke Split

- `searchqa_split/train/items.json`
- `searchqa_split/val/items.json`
- `searchqa_split/test/items.json`

Use this split only to answer: can the configured backend, harness, trainer,
and output pipeline run end to end?

## Selection Split

- `searchqa_selection_split/train/items.json`
- `searchqa_selection_split/val/items.json`
- `searchqa_selection_split/test/items.json`

Use this split only to answer: can a future baseline-vs-candidate setup show
held-out separation without conflating that question with runtime health?

Each item has the fields used by the official SearchQA rollout:

- `id`
- `question`
- `context`
- `answers`

## Boundary

This run does not:

- execute official `scripts/train.py`,
- call optimizer or target models,
- claim SearchQA benchmark validity,
- claim paper result parity,
- promote any generated skill.

## Runtime Meaning

The smoke split is allowed to finish with perfect scores while still marking
selection gating as `not_applicable`.

That is intentional:

- smoke validates runtime wiring only,
- smoke does not prove one skill variant beats another,
- selection proof needs a separate split and separate baseline/candidate setup.

## Earlier Blocked Attempt

`scripts/run-official-skillopt-smoke.mjs` was executed without `--dry-run` and
returned `blocked_missing_credentials` with exit code `2`.

Evidence:

- `blocked-smoke-proof.json`

The attempt did not call a model because no usable optimizer or target backend
credentials were present in the shell. The proof records only boolean
environment-variable presence, not credential values.

## Current Local Full Smoke

With the local OpenAI-compatible endpoint configured, the current smoke command
now runs end to end and writes incremental progress to `progress.json`.

## Next Gate

Use the smoke split for runtime checks only. Use the selection split only after
there is a real baseline-vs-candidate comparison path.

For runtime smoke:

```bash
python scripts/train.py \
  --config configs/searchqa/default.yaml \
  --split_dir runs/009-skillopt-official-searchqa-smoke/searchqa_split \
  --num_epochs 1 \
  --batch_size 1 \
  --workers 1 \
  --sel_env_num 1 \
  --test_env_num 1
```

For future selection evaluation design:

```bash
python scripts/train.py \
  --config configs/searchqa/selection.yaml \
  --split_dir runs/009-skillopt-official-searchqa-smoke/searchqa_selection_split \
  --num_epochs 1 \
  --batch_size 1 \
  --workers 1 \
  --sel_env_num 1 \
  --test_env_num 1
```
