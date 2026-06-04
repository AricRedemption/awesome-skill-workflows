import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/export-skill-optimization-artifacts.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
const runRecordPath = path.join(runDir, 'skill-optimization-run.json');

if (!fs.existsSync(runRecordPath)) {
  console.error(`run record not found: runs/${runId}/skill-optimization-run.json`);
  process.exit(1);
}

const run = JSON.parse(fs.readFileSync(runRecordPath, 'utf8'));
const candidatePath = path.join(root, run.candidate_skill_path);
const generatedEditsPath = path.join(runDir, 'generated-edits.json');
const scoreResultPath = path.join(runDir, 'score-result.json');
const rolloutsPath = path.join(runDir, 'rollouts.json');
const reflectionPath = path.join(runDir, 'optimizer-reflection.json');

if (!fs.existsSync(candidatePath) || !fs.existsSync(generatedEditsPath) || !fs.existsSync(scoreResultPath) || !fs.existsSync(rolloutsPath) || !fs.existsSync(reflectionPath)) {
  console.error('candidate, rollouts, reflection, generated edits, and score result must exist before export');
  process.exit(1);
}

const generatedEdits = JSON.parse(fs.readFileSync(generatedEditsPath, 'utf8'));
const scoreResult = JSON.parse(fs.readFileSync(scoreResultPath, 'utf8'));
const reflection = JSON.parse(fs.readFileSync(reflectionPath, 'utf8'));
const bestSkill = fs.readFileSync(candidatePath, 'utf8');

fs.writeFileSync(path.join(runDir, 'best_skill.md'), bestSkill);
fs.mkdirSync(path.join(runDir, 'slow_update', 'epoch_01'), { recursive: true });
fs.mkdirSync(path.join(runDir, 'meta_skill', 'epoch_01'), { recursive: true });

const config = {
  run_id: runId,
  optimizer_mode: run.optimizer_mode,
  num_epochs: 2,
  batch_size: 1,
  workers: 2,
  generator_type: run.edit_generation.generator_type,
  scorer_type: run.score_evaluation.scorer_type,
  source_skill_path: run.source_skill_path,
  candidate_skill_path: run.candidate_skill_path,
  edit_budget: run.edit_budget,
  promotion_target: run.promotion_target
};

const history = {
  run_id: runId,
  training_entrypoint: 'scripts/train-skill-optimization-run.mjs',
  epochs: [
    {
      epoch_id: 'epoch_01',
      batch_id: 'batch_001',
      rollout_ref: 'rollouts.json',
      reflection_ref: 'optimizer-reflection.json',
      train_refs: run.evidence_split.train_refs,
      selection_refs: run.evidence_split.selection_refs,
      accepted: run.accepted,
      exported_best_skill: 'best_skill.md'
    },
    {
      epoch_id: 'epoch_02',
      batch_id: 'batch_001',
      train_refs: run.evidence_split.train_refs,
      selection_refs: run.evidence_split.selection_refs,
      accepted: false,
      status: 'converged_no_update',
      artifact: 'epochs/epoch_02/batch_001/convergence-check.json'
    }
  ],
  steps: [
    {
      step_id: 'step_0001_rollout',
      artifact: 'rollouts.json'
    },
    {
      step_id: 'step_0002_generate_edits',
      artifact: 'generated-edits.json',
      accepted_edit_ids: run.edits.map((edit) => edit.edit_id),
      rejected_candidate_ids: run.rejected_candidates.map((candidate) => candidate.candidate_id)
    },
    {
      step_id: 'step_0003_reflect',
      artifact: 'optimizer-reflection.json',
      recommendation: reflection.recommendation
    },
    {
      step_id: 'step_0004_score_candidate',
      artifact: 'score-result.json',
      baseline_score: scoreResult.baseline_score,
      candidate_score: scoreResult.candidate_score,
      improvement: scoreResult.improvement
    },
    {
      step_id: 'step_0005_export_best_skill',
      artifact: 'best_skill.md',
      status: run.accepted ? 'exported' : 'not_exported'
    }
  ]
};

const runtimeState = {
  run_id: runId,
  status: run.status,
  accepted: run.accepted,
  current_step: history.steps.length,
  best_skill_path: 'best_skill.md',
  can_resume: false,
  resume_reason: 'This project-local reproduction is deterministic and single-pass.'
};

const slowUpdate = `# Slow Update: epoch_01

## Accepted Memory

- Failed publish evidence must remain negative evidence, not compliant publish proof.
- Account state is a pre-handoff gate for draft or publish actions.
- Candidate workflow changes need held-out score improvement and must not weaken scenario gates.

## Rejected Memory

- Reject candidates that collapse draft proof, content quality, and live publish proof.

## Scope

This is a local deterministic equivalent of SkillOpt slow-update memory. It is
not official SkillOpt optimizer memory.
`;

const metaSkill = `# Meta Skill: XHS KB-Reuse Skill Optimization

## Optimization Rule

When optimizing account-bound content workflows, preserve proof boundaries before
optimizing generation quality.

## Generator Guidance

Use train evidence to propose bounded edits. Use rejected candidate memory to
avoid repeating unsafe proof-state collapses. Use selection evidence only for
acceptance.

## Export Rule

Export the accepted candidate as best_skill.md only after the score artifact,
selection gate, risk gate, and sensitive-data checks pass.
`;

fs.writeFileSync(path.join(runDir, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
fs.writeFileSync(path.join(runDir, 'history.json'), `${JSON.stringify(history, null, 2)}\n`);
fs.writeFileSync(path.join(runDir, 'runtime_state.json'), `${JSON.stringify(runtimeState, null, 2)}\n`);
fs.writeFileSync(path.join(runDir, 'slow_update', 'epoch_01', 'summary.md'), slowUpdate);
fs.writeFileSync(path.join(runDir, 'meta_skill', 'epoch_01', 'meta-skill.md'), metaSkill);
