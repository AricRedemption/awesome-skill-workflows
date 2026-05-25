import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function listMarkdownFiles(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];
  return fs
    .readdirSync(absolutePath)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(relativePath, name));
}

const failures = [];

for (const file of listMarkdownFiles('verified-recipes')) {
  const text = readText(file);
  if (/status:\s*failed\b/.test(text) || /human_review:\s*\n\s+passed:\s*false/.test(text)) {
    failures.push(`${file} contains failed or unapproved recipe evidence`);
  }
}

for (const file of listMarkdownFiles('workflow-kb/verified-workflows')) {
  const text = readText(file);
  if (/Verified status:\s*`failed`/.test(text) || /verified_status["']?\s*:\s*["']failed/.test(text)) {
    failures.push(`${file} contains failed workflow evidence`);
  }
}

const failedGateLedger = readJson('runs/001-xhs-ai-agent-save-one-hour/gate-ledger.json');
const draftGateLedger = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json');
const draftProof = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json');
const requiredGateNames = [
  'quality_score',
  'human_review',
  'risk_approval',
  'account_state',
  'mode_approval',
  'platform_handoff',
  'proof_verification',
  'recipe_promotion',
];

for (const gateName of requiredGateNames) {
  if (!failedGateLedger.gates[gateName]) {
    failures.push(`historical gate-ledger.json missing gate ${gateName}`);
  }
}

if (failedGateLedger.final_verdict !== 'failed') {
  failures.push('historical run 001 must remain failed until a new compliant draft/publish proof exists');
}

for (const gateName of ['human_review', 'risk_approval', 'account_state', 'draft_action']) {
  if (draftGateLedger.gates?.[gateName]?.status !== 'passed') {
    failures.push(`draft rerun gate ${gateName} must pass before promotion`);
  }
}

if (draftGateLedger.final_status !== 'passed') {
  failures.push('draft rerun gate ledger must have final_status passed');
}

if (draftProof.status !== 'draft_saved' || draftProof.compliance_status !== 'passed' || draftProof.saved_draft !== true) {
  failures.push('draft proof must prove a compliant saved draft');
}

if (draftProof.clicked_publish !== false) {
  failures.push('draft proof must prove clicked_publish=false');
}

const report = readText('reports/first-mvp-validation-report.md');
if (!report.includes('- MVP: pass.') || !report.includes('Pass scope: compliant draft MVP.')) {
  failures.push('final report must state MVP pass scoped to compliant draft MVP');
}

if (!fs.existsSync(path.join(root, 'failed-recipes/xhs-ai-agent-save-one-hour.recipe.md'))) {
  failures.push('failed recipe must be stored under failed-recipes');
}

if (!fs.existsSync(path.join(root, 'workflow-kb/failed-workflows/xhs-ai-tool-topic-to-post.v1.md'))) {
  failures.push('failed workflow must be stored under workflow-kb/failed-workflows');
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checks: [
    'no failed recipe is stored under verified-recipes',
    'no failed workflow is stored under workflow-kb/verified-workflows',
    'historical failed run has explicit gate ledger',
    'draft rerun gates passed',
    'draft proof is compliant and did not publish',
    'final report states scoped compliant draft MVP pass',
    'failed recipe is isolated under failed-recipes',
    'failed workflow is isolated under workflow-kb/failed-workflows'
  ]
}, null, 2));
