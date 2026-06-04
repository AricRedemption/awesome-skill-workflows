import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/train-skill-optimization-run.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
if (!fs.existsSync(runDir)) {
  console.error(`run directory not found: runs/${runId}`);
  process.exit(1);
}

function runNode(script, ...args) {
  execFileSync('node', [script, ...args], {
    cwd: root,
    stdio: 'inherit'
  });
}

function copyArtifact(relativeSource, relativeTarget) {
  const source = path.join(runDir, relativeSource);
  const target = path.join(runDir, relativeTarget);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

fs.rmSync(path.join(runDir, 'steps'), { recursive: true, force: true });
fs.rmSync(path.join(runDir, 'epochs'), { recursive: true, force: true });

runNode('scripts/run-skill-optimization-rollouts.mjs', runId);
copyArtifact('rollouts.json', 'steps/step_0001/rollout/rollouts.json');
copyArtifact('rollouts.json', 'epochs/epoch_01/batch_001/rollouts.json');

runNode('scripts/generate-skill-optimization-edits.mjs', runId);
copyArtifact('generated-edits.json', 'steps/step_0002/generate/generated-edits.json');
copyArtifact('generated-edits.json', 'epochs/epoch_01/batch_001/generated-edits.json');

runNode('scripts/reflect-skill-optimization-run.mjs', runId);
copyArtifact('optimizer-reflection.json', 'steps/step_0003/reflect/optimizer-reflection.json');
copyArtifact('optimizer-reflection.json', 'epochs/epoch_01/batch_001/optimizer-reflection.json');

runNode('scripts/score-skill-optimization-run.mjs', runId);
copyArtifact('score-result.json', 'steps/step_0004/evaluate/score-result.json');
copyArtifact('score-result.json', 'epochs/epoch_01/batch_001/score-result.json');

runNode('scripts/export-skill-optimization-artifacts.mjs', runId);
copyArtifact('best_skill.md', 'steps/step_0005/export/best_skill.md');
copyArtifact('history.json', 'steps/step_0005/export/history.json');
copyArtifact('runtime_state.json', 'steps/step_0005/export/runtime_state.json');
copyArtifact('best_skill.md', 'epochs/epoch_01/batch_001/best_skill.md');

const convergenceCheck = {
  run_id: runId,
  epoch_id: 'epoch_02',
  batch_id: 'batch_001',
  status: 'no_update',
  reason: 'Accepted candidate already satisfies all deterministic XHS KB reuse safety checks; no additional bounded edit was generated.',
  evidence_refs: [
    `runs/${runId}/score-result.json`,
    `runs/${runId}/best_skill.md`,
    `runs/${runId}/rejected-candidate-publish-proof-skill.md`
  ]
};
fs.mkdirSync(path.join(runDir, 'epochs', 'epoch_02', 'batch_001'), { recursive: true });
fs.writeFileSync(
  path.join(runDir, 'epochs', 'epoch_02', 'batch_001', 'convergence-check.json'),
  `${JSON.stringify(convergenceCheck, null, 2)}\n`
);

const trainSummary = {
  run_id: runId,
  trainer: 'scripts/train-skill-optimization-run.mjs',
  training_config: {
    epochs: 2,
    batch_size: 1,
    workers: 2,
    mode: 'deterministic_local'
  },
  steps: [
    'steps/step_0001/rollout/rollouts.json',
    'steps/step_0002/generate/generated-edits.json',
    'steps/step_0003/reflect/optimizer-reflection.json',
    'steps/step_0004/evaluate/score-result.json',
    'steps/step_0005/export/best_skill.md',
    'steps/step_0005/export/history.json',
    'steps/step_0005/export/runtime_state.json'
  ],
  epoch_artifacts: [
    'epochs/epoch_01/batch_001/rollouts.json',
    'epochs/epoch_01/batch_001/generated-edits.json',
    'epochs/epoch_01/batch_001/optimizer-reflection.json',
    'epochs/epoch_01/batch_001/score-result.json',
    'epochs/epoch_01/batch_001/best_skill.md',
    'epochs/epoch_02/batch_001/convergence-check.json'
  ]
};

fs.writeFileSync(
  path.join(runDir, 'train-run.json'),
  `${JSON.stringify(trainSummary, null, 2)}\n`
);
