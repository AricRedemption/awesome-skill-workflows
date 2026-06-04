import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/score-skill-optimization-run.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
const baselinePath = path.join(runDir, 'baseline-skill.md');
const candidatePath = path.join(runDir, 'candidate-skill.md');

if (!fs.existsSync(baselinePath) || !fs.existsSync(candidatePath)) {
  console.error(`missing baseline or candidate skill in runs/${runId}`);
  process.exit(1);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function scoreSkill(text) {
  const normalizedText = text.replace(/\s+/g, ' ');
  const checks = [
    {
      id: 'kb_first_retrieval',
      weight: 15,
      passed: /workflow-kb\/retrieval-index\.json/.test(normalizedText) && /reuse/i.test(normalizedText)
    },
    {
      id: 'failed_publish_negative_evidence',
      weight: 15,
      passed: /failed publish evidence/i.test(normalizedText) && /negative evidence/i.test(normalizedText)
    },
    {
      id: 'account_state_pre_handoff_gate',
      weight: 15,
      passed: /account state/i.test(normalizedText) && /pre-handoff gate/i.test(normalizedText)
    },
    {
      id: 'draft_publish_proof_separation',
      weight: 15,
      passed: /draft.*publish proof|publish proof.*draft/i.test(normalizedText) || /draft and publish proof separate/i.test(normalizedText)
    },
    {
      id: 'held_out_selection_gate',
      weight: 15,
      passed: /held-out evidence/i.test(normalizedText) && /improves the selected metric/i.test(normalizedText)
    },
    {
      id: 'scenario_gate_preservation',
      weight: 15,
      passed: /human review/i.test(normalizedText) && /risk approval/i.test(normalizedText) && /proof verification/i.test(normalizedText)
    },
    {
      id: 'export_boundary',
      weight: 10,
      passed: /does not authorize/i.test(normalizedText) && /recipe promotion/i.test(normalizedText)
    }
  ];

  const value = checks.reduce((total, check) => total + (check.passed ? check.weight : 0), 0);
  return { value, checks };
}

const baselineText = fs.readFileSync(baselinePath, 'utf8');
const candidateText = fs.readFileSync(candidatePath, 'utf8');
const baseline = scoreSkill(baselineText);
const candidate = scoreSkill(candidateText);

const result = {
  run_id: runId,
  scorer: 'scripts/score-skill-optimization-run.mjs',
  metric: 'xhs_kb_reuse_safety_score',
  baseline_score: baseline.value,
  candidate_score: candidate.value,
  improvement: candidate.value - baseline.value,
  baseline_checks: baseline.checks,
  candidate_checks: candidate.checks,
  evidence_refs: [
    `runs/${runId}/baseline-skill.md`,
    `runs/${runId}/candidate-skill.md`,
    'runs/002-xhs-meeting-notes-productivity/run-summary.md',
    'workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md'
  ]
};

fs.writeFileSync(
  path.join(runDir, 'score-result.json'),
  `${JSON.stringify(result, null, 2)}\n`
);
