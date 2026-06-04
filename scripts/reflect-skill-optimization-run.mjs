import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/reflect-skill-optimization-run.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
const rolloutsPath = path.join(runDir, 'rollouts.json');
const generatedEditsPath = path.join(runDir, 'generated-edits.json');

if (!fs.existsSync(rolloutsPath) || !fs.existsSync(generatedEditsPath)) {
  console.error('rollouts.json and generated-edits.json must exist before reflection');
  process.exit(1);
}

const rollouts = JSON.parse(fs.readFileSync(rolloutsPath, 'utf8'));
const generatedEdits = JSON.parse(fs.readFileSync(generatedEditsPath, 'utf8'));
const baselineWorker = rollouts.workers.find((worker) => worker.target === 'baseline');
const candidateWorker = rollouts.workers.find((worker) => worker.target === 'candidate');
const baselineMissing = baselineWorker.results.flatMap((result) => result.missing_signals);
const candidateMissing = candidateWorker.results.flatMap((result) => result.missing_signals);

const reflection = {
  run_id: runId,
  reflector: 'scripts/reflect-skill-optimization-run.mjs',
  rollout_ref: `runs/${runId}/rollouts.json`,
  generated_edits_ref: `runs/${runId}/generated-edits.json`,
  baseline_failures: baselineWorker.results.filter((result) => !result.passed),
  candidate_failures: candidateWorker.results.filter((result) => !result.passed),
  reflection_summary: [
    `Baseline missed ${new Set(baselineMissing).size} unique required signals.`,
    `Candidate missed ${new Set(candidateMissing).size} unique required signals.`,
    `Generated ${generatedEdits.edits.length} bounded edits from rollout and failure evidence.`
  ],
  recommendation: candidateMissing.length === 0 ? 'accept_candidate' : 'reject_candidate',
  notes: 'This is deterministic local optimizer-side reflection, not an LLM optimizer model call.'
};

fs.writeFileSync(
  path.join(runDir, 'optimizer-reflection.json'),
  `${JSON.stringify(reflection, null, 2)}\n`
);
