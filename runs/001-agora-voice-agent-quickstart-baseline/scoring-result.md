# Scoring Result

## Purpose

Score whether the baseline run produced enough evidence quality to support later
reuse or promotion. This is an evidence-quality rubric, not a product UX score.

## Required Fields

- scored_at: `TBD`
- scorer_type: `human | agent | human_and_agent`
- rubric_name: `agora-voice-agent-baseline-evidence-rubric-v1`
- total_score: `TBD`
- thresholds_recorded: `true | false | TBD`
- scoring_verdict: `pass | fail | TBD`
- handoff_note: `score does not replace runtime proof, human review, or sensitive-data review`

## Suggested Rubric

| dimension | max | score | required threshold | required | promotion blocking if missing |
| --- | --- | --- | --- | --- | --- |
| source fidelity | 20 | `TBD` | `>=16` | yes | yes |
| environment completeness | 15 | `TBD` | `>=12` | yes | yes |
| CLI readiness completeness | 15 | `TBD` | `>=12` | yes | yes |
| runtime proof completeness | 25 | `TBD` | `>=25` | yes | yes |
| sensitive data hygiene | 15 | `TBD` | `>=15` | yes | yes |
| human review clarity | 10 | `TBD` | `>=8` | yes | yes |

## Threshold Summary

- total_score_gte_88: `TBD`
- runtime_proof_full: `TBD`
- sensitive_data_hygiene_full: `TBD`
- human_review_present: `TBD`

## Promotion Blockers

Cannot promote if any of these are missing or below threshold:

- every rubric dimension score
- total score
- threshold summary
- scoring verdict
