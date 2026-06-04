import fs from 'node:fs';

function readText(path) {
  return fs.readFileSync(path, 'utf8');
}

function readJson(path) {
  return JSON.parse(readText(path));
}

function exists(path) {
  return fs.existsSync(path);
}

const checks = [];

function check(name, pass, evidence) {
  checks.push({ name, pass, evidence });
}

const skills = readJson('skills/index.json');
const rawCandidates = readJson('skills/raw-discovery/raw_skill_candidates.json');
const capabilityMap = readText('skills/capability-map.md');
const firstScore = readJson('runs/001-xhs-ai-agent-save-one-hour/quality-score.json');
const secondScore = readJson('runs/002-xhs-meeting-notes-productivity/quality-score.json');
const draftGateLedger = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json');
const draftProof = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json');
const failedActionVerification = readJson('runs/001-xhs-ai-agent-save-one-hour/action-verification.json');
const draftActionVerification = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/action-verification.json');
const kbIndex = readJson('workflow-kb/retrieval-index.json');
const verifiedRecipe = readText('verified-recipes/xhs-ai-agent-save-one-hour.recipe.md');
const report = readText('reports/first-mvp-validation-report.md');

check('Agent can discover XHS skills from public sources', exists('skills/raw-discovery/github-xhs-skills.md'), 'skills/raw-discovery/github-xhs-skills.md');
check('At least 15 raw candidates exist', rawCandidates.length >= 15, rawCandidates.length);
check('At least 15 normalized skills exist', skills.length >= 15, skills.length);
check('skills/index.json exists', exists('skills/index.json'), 'skills/index.json');
check('capability-map.md exists', exists('skills/capability-map.md'), 'skills/capability-map.md');
check('Required capability coverage is 13/13', capabilityMap.includes('xhs v0.1 required semantic capability bundles: 13'), '13 semantic bundles');
check('Workflow composition exists', exists('workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md'), 'workflow file');
check('First generated XHS note exists', exists('runs/001-xhs-ai-agent-save-one-hour/generated-note.md'), 'generated-note.md');
check('Content score >= 80', firstScore.total_score >= 80, firstScore.total_score);
check('Compliance score >= 90', firstScore.compliance_score >= 90, firstScore.compliance_score);
check('XHS style score >= 75', firstScore.xhs_style_fit >= 75, firstScore.xhs_style_fit);
check('Evolution log exists', exists('evolution/xhs-ai-tool-topic-to-post-evolution-log.md'), 'evolution log');
check('Human review passed for draft rerun', draftGateLedger.gates.human_review.status === 'passed', draftGateLedger.gates.human_review);
check('Risk approval passed for draft rerun', draftGateLedger.gates.risk_approval.status === 'passed', draftGateLedger.gates.risk_approval);
check('Account state passed before draft action', draftGateLedger.gates.account_state.status === 'passed', draftGateLedger.gates.account_state);
check('Draft action passed', draftGateLedger.gates.draft_action.status === 'passed', draftGateLedger.gates.draft_action);
check('Draft proof is compliant', draftProof.status === 'draft_saved' && draftProof.compliance_status === 'passed' && draftProof.saved_draft === true, {
  status: draftProof.status,
  compliance_status: draftProof.compliance_status,
  saved_draft: draftProof.saved_draft
});
check('Live publish was not clicked during draft proof', draftProof.clicked_publish === false, draftProof.clicked_publish);
check('Failed live publish is normalized as failed_with_evidence', failedActionVerification.verification_level === 'failed_with_evidence' && failedActionVerification.fact_status === 'fact_verified' && failedActionVerification.compliance_status === 'failed', {
  verification_level: failedActionVerification.verification_level,
  fact_status: failedActionVerification.fact_status,
  compliance_status: failedActionVerification.compliance_status
});
check('Draft rerun is normalized as action_compliance_verified', draftActionVerification.verification_level === 'action_compliance_verified' && draftActionVerification.compliance_status === 'passed', {
  verification_level: draftActionVerification.verification_level,
  compliance_status: draftActionVerification.compliance_status
});
check('Verified scenario recipe exists', verifiedRecipe.includes('Verification level: `draft_verified`'), 'verified-recipes/xhs-ai-agent-save-one-hour.recipe.md');
check('KB contains draft-verified workflow and recipe', kbIndex.records.some((record) => record.id === 'xhs-ai-tool-topic-to-post.v1' && record.verified_status === 'draft_verified') && kbIndex.records.some((record) => record.id === 'xhs-ai-agent-save-one-hour' && record.verified_status === 'draft_verified'), 'workflow and recipe draft_verified');
check('Second run can retrieve and reuse workflow', exists('runs/002-xhs-meeting-notes-productivity/kb-retrieval.md'), 'kb retrieval');
check('Second run reuse >= 60%', secondScore.reuse_ratio >= 0.6, secondScore.reuse_ratio);
check('Second run score >= 80', secondScore.total_score >= 80, secondScore.total_score);
check('Report states scoped MVP pass', report.includes('- MVP: pass.') && report.includes('Pass scope: compliant draft MVP.'), 'reports/first-mvp-validation-report.md');
check('Report includes generic action-verification mapping', report.includes('`failed_with_evidence`') && report.includes('`action_compliance_verified`'), 'reports/first-mvp-validation-report.md');

const failed = checks.filter((item) => !item.pass);

console.log(JSON.stringify({
  overall: failed.length === 0 ? 'PASS' : 'FAIL',
  scope: 'compliant draft MVP; live publish excluded',
  failed_count: failed.length,
  failed,
  checks
}, null, 2));

if (failed.length > 0) {
  process.exit(1);
}
