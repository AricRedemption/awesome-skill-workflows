import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const warnings = [];

const requiredGateOrder = [
  'human_review',
  'risk_approval',
  'state_precheck',
  'mode_approval',
  'action_handoff',
  'action_execution',
  'proof_verification',
  'promotion_approval'
];

const verificationLevels = new Set([
  'action_blocked',
  'action_attempted',
  'action_fact_verified',
  'action_compliance_verified',
  'failed_with_evidence'
]);
const factStatuses = new Set(['not_attempted', 'attempted', 'fact_observed', 'fact_verified']);
const complianceStatuses = new Set(['not_applicable', 'failed', 'passed']);
const promotionStatuses = new Set(['not_promotable', 'promotable_for_scope', 'promoted']);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function findActionVerificationRecords(currentDir) {
  const records = [];
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const absolutePath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      records.push(...findActionVerificationRecords(absolutePath));
      continue;
    }
    if (entry.isFile() && entry.name === 'action-verification.json') {
      records.push(path.relative(root, absolutePath));
    }
  }
  return records.sort();
}

const records = findActionVerificationRecords(path.join(root, 'runs'));
if (records.length === 0) {
  failures.push('no action-verification.json records were found under runs/');
}

for (const relativePath of records) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing action verification record: ${relativePath}`);
    continue;
  }
  const record = readJson(relativePath);
  for (const field of [
    'run_id',
    'scenario_id',
    'action_type',
    'requested_mode',
    'approved_mode',
    'allowed_action',
    'target_artifact',
    'verification_level',
    'fact_status',
    'compliance_status',
    'promotion_status',
    'gate_order',
    'gates',
    'evidence_refs'
  ]) {
    if (!(field in record)) {
      failures.push(`${relativePath} missing field ${field}`);
    }
  }
  if (!verificationLevels.has(record.verification_level)) {
    failures.push(`${relativePath} has invalid verification_level ${record.verification_level}`);
  }
  if (!factStatuses.has(record.fact_status)) {
    failures.push(`${relativePath} has invalid fact_status ${record.fact_status}`);
  }
  if (!complianceStatuses.has(record.compliance_status)) {
    failures.push(`${relativePath} has invalid compliance_status ${record.compliance_status}`);
  }
  if (!promotionStatuses.has(record.promotion_status)) {
    failures.push(`${relativePath} has invalid promotion_status ${record.promotion_status}`);
  }
  if (JSON.stringify(record.gate_order) !== JSON.stringify(requiredGateOrder)) {
    failures.push(`${relativePath} gate_order must match the generic action-verification order`);
  }
  if (!Array.isArray(record.evidence_refs) || record.evidence_refs.length === 0) {
    failures.push(`${relativePath} must include at least one evidence_ref`);
  }
  for (const gateName of requiredGateOrder) {
    if (!record.gates?.[gateName]) {
      failures.push(`${relativePath} missing gate ${gateName}`);
      continue;
    }
    for (const field of ['status', 'checked_at', 'evidence_ref', 'notes']) {
      if (!(field in record.gates[gateName])) {
        failures.push(`${relativePath} gate ${gateName} missing field ${field}`);
      }
    }
  }

  if (record.run_id && !relativePath.includes(record.run_id)) {
    warnings.push(`${relativePath} run_id does not match its run directory name`);
  }
}

const failedPublish = readJson('runs/001-xhs-ai-agent-save-one-hour/action-verification.json');
if (failedPublish.verification_level !== 'failed_with_evidence') {
  failures.push('run 001 must map to failed_with_evidence');
}
if (failedPublish.fact_status !== 'fact_verified') {
  failures.push('run 001 must keep publish fact separate from failed compliance proof');
}
if (failedPublish.compliance_status !== 'failed') {
  failures.push('run 001 compliance_status must remain failed');
}
if (failedPublish.gates.action_execution.status !== 'passed') {
  failures.push('run 001 action_execution should record that the action fact occurred');
}
if (failedPublish.gates.proof_verification.status !== 'failed') {
  failures.push('run 001 proof_verification must remain failed');
}

const draftVerified = readJson('runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/action-verification.json');
if (draftVerified.verification_level !== 'action_compliance_verified') {
  failures.push('run 003 must map to action_compliance_verified');
}
if (draftVerified.fact_status !== 'fact_verified') {
  failures.push('run 003 fact_status must be fact_verified');
}
if (draftVerified.compliance_status !== 'passed') {
  failures.push('run 003 compliance_status must be passed');
}
if (draftVerified.gates.mode_approval.status !== 'passed') {
  failures.push('run 003 mode_approval must pass');
}
if (draftVerified.gates.proof_verification.status !== 'passed') {
  failures.push('run 003 proof_verification must pass');
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures, warnings }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  records,
  checks: [
    'all action verification records under runs/ are discovered and validated',
    'generic verification levels separate action facts from compliance proof',
    'the failed publish run remains not promotable despite a verified action fact',
    'the verified draft run maps to action_compliance_verified for draft scope'
  ],
  warning_count: warnings.length,
  warnings
}, null, 2));
