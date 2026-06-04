import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/run-skill-optimization-rollouts.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
const baselinePath = path.join(runDir, 'baseline-skill.md');
const candidatePath = path.join(runDir, 'candidate-skill.md');

if (!fs.existsSync(baselinePath) || !fs.existsSync(candidatePath)) {
  console.error(`missing baseline or candidate skill in runs/${runId}`);
  process.exit(1);
}

const baseline = fs.readFileSync(baselinePath, 'utf8');
const candidate = fs.readFileSync(candidatePath, 'utf8');

function evaluateSkill(skillText, item) {
  const normalized = skillText.replace(/\s+/g, ' ');
  const missing = item.required_signals.filter((signal) => !new RegExp(signal, 'i').test(normalized));
  return {
    item_id: item.item_id,
    passed: missing.length === 0,
    missing_signals: missing
  };
}

const items = [
  {
    item_id: 'selection-xhs-kb-reuse-safety',
    split: 'selection',
    evidence_ref: 'runs/002-xhs-meeting-notes-productivity/run-summary.md',
    required_signals: [
      'workflow-kb/retrieval-index\\.json',
      'held-out evidence',
      'proof verification'
    ]
  },
  {
    item_id: 'selection-xhs-proof-boundary',
    split: 'selection',
    evidence_ref: 'workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md',
    required_signals: [
      'failed publish evidence',
      'account state',
      'draft and publish proof separate'
    ]
  }
];

const rollouts = {
  run_id: runId,
  runner: 'scripts/run-skill-optimization-rollouts.mjs',
  workers: [
    {
      worker_id: 'worker_001',
      target: 'baseline',
      artifact: 'baseline-skill.md',
      results: items.map((item) => evaluateSkill(baseline, item))
    },
    {
      worker_id: 'worker_002',
      target: 'candidate',
      artifact: 'candidate-skill.md',
      results: items.map((item) => evaluateSkill(candidate, item))
    }
  ],
  items
};

fs.writeFileSync(path.join(runDir, 'rollouts.json'), `${JSON.stringify(rollouts, null, 2)}\n`);
