import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const runId = process.argv[2];

if (!runId) {
  console.error('usage: node scripts/generate-skill-optimization-edits.mjs <run-id>');
  process.exit(1);
}

const runDir = path.join(root, 'runs', runId);
if (!fs.existsSync(runDir)) {
  console.error(`run directory not found: runs/${runId}`);
  process.exit(1);
}

function readIfExists(relativePath) {
  const absolutePath = path.join(root, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : '';
}

const evidence = {
  step7: readIfExists('runs/001-xhs-ai-agent-save-one-hour/step-7-self-evolution-result.json'),
  accountState: readIfExists('workflow-kb/failure-cases/xhs-account-state-precheck-missing.md'),
  contentFailures: readIfExists('workflow-kb/failure-cases/xhs-content-failure-cases.md'),
  selectionRun: readIfExists('runs/002-xhs-meeting-notes-productivity/run-summary.md'),
  verifiedWorkflow: readIfExists('workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md'),
  rejectedCandidate: readIfExists(`runs/${runId}/rejected-candidate-publish-proof-skill.md`)
};

const evidenceText = Object.values(evidence).join('\n').replace(/\s+/g, ' ');
const edits = [];

if (/publish proof|publish.*evidence|clicked_publish|draft.*publish/i.test(evidenceText)) {
  edits.push({
    edit_id: 'edit-001-add-failed-proof-boundary',
    operation: 'add',
    target_section: 'Instruction',
    rationale: 'Historical XHS evidence separates publish facts, draft facts, content score, and compliant proof.',
    before: 'Reuse matching workflow-KB entries before composing a new XHS content workflow.',
    after: 'Reuse failed publish evidence as negative evidence only; do not treat it as compliant publish proof.',
    evidence_refs: [
      'runs/001-xhs-ai-agent-save-one-hour/step-7-self-evolution-result.json',
      'workflow-kb/failure-cases/xhs-content-failure-cases.md'
    ],
    risk_impact: 'reduces_risk'
  });
}

if (/account state|login|authorization|pre-handoff/i.test(evidenceText)) {
  edits.push({
    edit_id: 'edit-002-add-account-state-gate',
    operation: 'add',
    target_section: 'Instruction',
    rationale: 'Human review identified account login and authorization as a pre-handoff gate.',
    before: 'Generate and score the content package before writeback.',
    after: 'Keep account state as a hard pre-handoff gate; stop before draft or publish if account state is unknown.',
    evidence_refs: [
      'workflow-kb/failure-cases/xhs-account-state-precheck-missing.md'
    ],
    risk_impact: 'reduces_risk'
  });
}

if (/reuse ratio|verified workflow|held-out|selection|draft_verified/i.test(evidenceText)) {
  edits.push({
    edit_id: 'edit-003-add-selection-gate',
    operation: 'add',
    target_section: 'Instruction',
    rationale: 'SkillOpt-style candidate changes need held-out selection evidence before acceptance.',
    before: 'Write back new reusable lessons after the run.',
    after: 'Accept candidate workflow changes only when held-out evidence improves the selected metric and required scenario gates remain intact.',
    evidence_refs: [
      'runs/002-xhs-meeting-notes-productivity/run-summary.md',
      'workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md'
    ],
    risk_impact: 'reduces_risk'
  });
}

const generated = {
  run_id: runId,
  generator_type: 'deterministic_script',
  source: 'scripts/generate-skill-optimization-edits.mjs',
  strategy: 'Read XHS run evidence and rejected candidate memory, then map detected proof-chain and selection-gate signals into bounded add edits for KB-first workflow reuse.',
  input_signal_summary: {
    has_publish_proof_boundary_signal: /publish proof|publish.*evidence|clicked_publish|draft.*publish/i.test(evidenceText),
    has_account_state_signal: /account state|login|authorization|pre-handoff/i.test(evidenceText),
    has_selection_gate_signal: /reuse ratio|verified workflow|held-out|selection|draft_verified/i.test(evidenceText),
    used_rejected_candidate_memory: evidence.rejectedCandidate.length > 0
  },
  edits
};

fs.writeFileSync(
  path.join(runDir, 'generated-edits.json'),
  `${JSON.stringify(generated, null, 2)}\n`
);
