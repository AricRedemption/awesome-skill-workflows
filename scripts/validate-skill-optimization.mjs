import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const warnings = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function listJsonFiles(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];

  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) return listJsonFiles(child);
    return entry.isFile() && entry.name.endsWith('.json') ? [child] : [];
  });
}

function requireString(record, field, file) {
  if (typeof record[field] !== 'string' || record[field].length === 0) {
    failures.push(`${file} missing string field ${field}`);
  }
}

function requireArray(record, field, file, minItems = 1) {
  if (!Array.isArray(record[field]) || record[field].length < minItems) {
    failures.push(`${file} missing non-empty array field ${field}`);
  }
}

function checkRefs(refs, file, field) {
  if (!Array.isArray(refs) || refs.length === 0) {
    failures.push(`${file} missing evidence refs for ${field}`);
    return;
  }

  for (const ref of refs) {
    if (typeof ref !== 'string' || ref.length === 0) {
      failures.push(`${file} has invalid evidence ref in ${field}`);
      continue;
    }

    if (/\/Users\/|cookies?\.json|token|authorization/i.test(ref)) {
      failures.push(`${file} ${field} contains sensitive or local ref ${ref}`);
    }

    if (!exists(ref)) {
      warnings.push(`${file} ${field} references missing path ${ref}`);
    }
  }
}

function checkScore(score, file, field) {
  if (!score || typeof score !== 'object') {
    failures.push(`${file} missing score object ${field}`);
    return;
  }

  requireString(score, 'metric', file);
  if (typeof score.value !== 'number') {
    failures.push(`${file} ${field}.value must be a number`);
  }
  checkRefs(score.evidence_refs, file, `${field}.evidence_refs`);
}

function checkRun(file) {
  const run = readJson(file);

  for (const field of [
    'run_id',
    'status',
    'scenario_id',
    'source_skill_path',
    'candidate_skill_path',
    'optimizer_mode',
    'promotion_target',
    'sensitive_data_status'
  ]) {
    requireString(run, field, file);
  }

  if (!['experimental', 'accepted_candidate', 'rejected_candidate', 'blocked'].includes(run.status)) {
    failures.push(`${file} has invalid status ${run.status}`);
  }

  if (!['manual_skillopt_style', 'external_skillopt', 'hybrid'].includes(run.optimizer_mode)) {
    failures.push(`${file} has invalid optimizer_mode ${run.optimizer_mode}`);
  }

  if (!exists(run.source_skill_path)) {
    failures.push(`${file} source_skill_path does not exist: ${run.source_skill_path}`);
  }

  if (!exists(run.candidate_skill_path)) {
    failures.push(`${file} candidate_skill_path does not exist: ${run.candidate_skill_path}`);
  }

  if (!Number.isInteger(run.edit_budget) || run.edit_budget < 1) {
    failures.push(`${file} edit_budget must be a positive integer`);
  }

  requireArray(run, 'edits', file);
  if (Array.isArray(run.edits) && Number.isInteger(run.edit_budget) && run.edits.length > run.edit_budget) {
    failures.push(`${file} has ${run.edits.length} edits but edit_budget is ${run.edit_budget}`);
  }

  for (const edit of run.edits ?? []) {
    for (const field of ['edit_id', 'operation', 'target_section', 'rationale', 'risk_impact']) {
      requireString(edit, field, file);
    }
    if (!['add', 'delete', 'replace'].includes(edit.operation)) {
      failures.push(`${file} edit ${edit.edit_id ?? '<unknown>'} has invalid operation ${edit.operation}`);
    }
    if (!['none', 'reduces_risk', 'increases_risk', 'unknown'].includes(edit.risk_impact)) {
      failures.push(`${file} edit ${edit.edit_id ?? '<unknown>'} has invalid risk_impact ${edit.risk_impact}`);
    }
    checkRefs(edit.evidence_refs, file, `edit ${edit.edit_id ?? '<unknown>'}.evidence_refs`);
  }

  const split = run.evidence_split;
  if (!split || typeof split !== 'object') {
    failures.push(`${file} missing evidence_split`);
  } else {
    checkRefs(split.train_refs, file, 'evidence_split.train_refs');
    checkRefs(split.selection_refs, file, 'evidence_split.selection_refs');
    if (Array.isArray(split.test_refs) && split.test_refs.length > 0) {
      checkRefs(split.test_refs, file, 'evidence_split.test_refs');
    }

    for (const trainRef of split.train_refs ?? []) {
      if ((split.selection_refs ?? []).includes(trainRef)) {
        failures.push(`${file} train and selection split share ${trainRef}`);
      }
    }
  }

  checkScore(run.baseline_score, file, 'baseline_score');
  checkScore(run.candidate_score, file, 'candidate_score');

  const gate = run.selection_gate;
  if (!gate || typeof gate !== 'object') {
    failures.push(`${file} missing selection_gate`);
  } else {
    if (!['passed', 'failed', 'blocked'].includes(gate.status)) {
      failures.push(`${file} has invalid selection_gate.status ${gate.status}`);
    }
    if (typeof gate.baseline_score !== 'number' || typeof gate.candidate_score !== 'number' || typeof gate.improvement !== 'number') {
      failures.push(`${file} selection_gate scores must be numbers`);
    } else {
      const expectedImprovement = Number((gate.candidate_score - gate.baseline_score).toFixed(6));
      const recordedImprovement = Number(gate.improvement.toFixed(6));
      if (expectedImprovement !== recordedImprovement) {
        failures.push(`${file} selection_gate.improvement must equal candidate_score - baseline_score`);
      }
    }
    checkRefs(gate.evidence_refs, file, 'selection_gate.evidence_refs');
  }

  const riskGate = run.risk_gate;
  if (!riskGate || typeof riskGate !== 'object') {
    failures.push(`${file} missing risk_gate`);
  } else {
    if (!['passed', 'failed', 'blocked'].includes(riskGate.status)) {
      failures.push(`${file} has invalid risk_gate.status ${riskGate.status}`);
    }
    checkRefs(riskGate.evidence_refs, file, 'risk_gate.evidence_refs');
  }

  checkRefs(run.evidence_refs, file, 'evidence_refs');

  if (run.sensitive_data_status !== 'sanitized') {
    failures.push(`${file} sensitive_data_status must be sanitized before validation can pass`);
  }

  if (run.accepted === true) {
    if (run.selection_gate?.status !== 'passed') {
      failures.push(`${file} accepted candidate requires passed selection_gate`);
    }
    if (run.risk_gate?.status !== 'passed') {
      failures.push(`${file} accepted candidate requires passed risk_gate`);
    }
    if (typeof run.candidate_score?.value === 'number' && typeof run.baseline_score?.value === 'number' && run.candidate_score.value <= run.baseline_score.value) {
      failures.push(`${file} accepted candidate must improve candidate_score.value over baseline_score.value`);
    }
    if (run.rejected_reason !== '') {
      failures.push(`${file} accepted candidate must use empty rejected_reason`);
    }
  } else if (typeof run.rejected_reason !== 'string' || run.rejected_reason.length === 0) {
    failures.push(`${file} rejected or experimental candidate must include rejected_reason`);
  }

  if (run.promotion_target === 'verified-recipes') {
    failures.push(`${file} skill optimization runs cannot promote directly to verified-recipes`);
  }
}

const runFiles = listJsonFiles('runs').filter((file) => file.endsWith('skill-optimization-run.json'));

if (runFiles.length === 0) {
  failures.push('no skill optimization run records found under runs/**/skill-optimization-run.json');
}

for (const file of runFiles) {
  checkRun(file);
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures, warnings }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checked_files: runFiles,
  checks: [
    'skill optimization run records exist',
    'source and candidate skill artifacts exist',
    'train and selection evidence refs are separate',
    'edit budget bounds candidate edits',
    'baseline and candidate scores are present',
    'selection gate improvement is consistent',
    'accepted candidates improve score and pass risk gate',
    'sensitive refs are blocked from evidence fields',
    'direct verified-recipes promotion is blocked'
  ],
  warning_count: warnings.length,
  warnings
}, null, 2));
