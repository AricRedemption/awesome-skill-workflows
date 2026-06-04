import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const reportPath = 'reports/skillopt-official-readiness.json';
const docPath = 'docs/skillopt-integration.md';
const smokeRunner = 'scripts/run-official-skillopt-smoke.mjs';
const smokeValidator = 'scripts/validate-official-skillopt-smoke-output.mjs';
const selectionRunner = 'scripts/run-skillopt-selection-eval.mjs';
const selectionValidator = 'scripts/validate-skillopt-selection-output.mjs';
const envLib = 'scripts/lib/official-skillopt-env.mjs';
const failures = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function requireString(record, field, label = reportPath) {
  if (typeof record[field] !== 'string' || record[field].length === 0) {
    failures.push(`${label} missing string field ${field}`);
  }
}

function requireArray(record, field, minItems = 1, label = reportPath) {
  if (!Array.isArray(record[field]) || record[field].length < minItems) {
    failures.push(`${label} missing non-empty array field ${field}`);
  }
}

for (const relativePath of [
  reportPath,
  docPath,
  smokeRunner,
  smokeValidator,
  selectionRunner,
  selectionValidator,
  envLib,
]) {
  if (!exists(relativePath)) {
    failures.push(`${relativePath} does not exist`);
  }
}

if (failures.length === 0) {
  const report = readJson(reportPath);

  for (const field of ['report_id', 'status', 'checked_at', 'claim_boundary']) {
    requireString(report, field);
  }
  if (report.status !== 'local_runtime_validated_not_official_reproduction_claim') {
    failures.push(`${reportPath} status must record local runtime validation without official reproduction claim`);
  }

  requireArray(report, 'source_refs', 2);
  requireArray(report, 'official_supported_benchmarks_observed', 6);
  requireArray(report, 'readiness_gates', 1);
  requireArray(report, 'next_safe_actions', 1);

  const official = report.official_repository ?? {};
  if (official.url !== 'https://github.com/microsoft/SkillOpt') {
    failures.push(`${reportPath} official_repository.url must point to microsoft/SkillOpt`);
  }
  if (official.required_runtime !== 'Python 3.10+') {
    failures.push(`${reportPath} official_repository.required_runtime must record Python 3.10+`);
  }
  if (official.inspection_status !== 'public_source_structure_recorded') {
    failures.push(`${reportPath} official_repository.inspection_status must record public_source_structure_recorded`);
  }
  const observedPaths = new Set(official.observed_top_level_paths ?? []);
  for (const requiredPath of ['configs/', 'scripts/', 'skillopt/', 'pyproject.toml', 'requirements.txt']) {
    if (!observedPaths.has(requiredPath)) {
      failures.push(`${reportPath} missing observed official path ${requiredPath}`);
    }
  }

  const runtime = report.project_local_runtime ?? {};
  if (runtime.module_root !== 'skillopt/') {
    failures.push(`${reportPath} project_local_runtime.module_root must be skillopt/`);
  }
  for (const ref of [...(runtime.entrypoints ?? []), ...(runtime.configs ?? [])]) {
    if (typeof ref !== 'string' || !exists(ref)) {
      failures.push(`${reportPath} project_local_runtime ref does not exist: ${ref}`);
    }
  }
  if (runtime.smoke_runner !== smokeRunner) {
    failures.push(`${reportPath} project_local_runtime.smoke_runner must be ${smokeRunner}`);
  }
  if (runtime.smoke_validator !== smokeValidator) {
    failures.push(`${reportPath} project_local_runtime.smoke_validator must be ${smokeValidator}`);
  }
  if (runtime.selection_runner !== selectionRunner) {
    failures.push(`${reportPath} project_local_runtime.selection_runner must be ${selectionRunner}`);
  }
  if (runtime.selection_validator !== selectionValidator) {
    failures.push(`${reportPath} project_local_runtime.selection_validator must be ${selectionValidator}`);
  }

  const probe = report.official_entrypoint_probe ?? {};
  if (probe.command !== 'python3 scripts/train.py --help') {
    failures.push(`${reportPath} official_entrypoint_probe.command must record the help probe`);
  }
  if (probe.status !== 'passed') {
    failures.push(`${reportPath} official_entrypoint_probe.status must be passed`);
  }
  if (probe.working_directory !== 'project root') {
    failures.push(`${reportPath} official_entrypoint_probe.working_directory must be project root`);
  }

  const local = report.local_reproduction_status ?? {};
  if (local.mode !== 'project_local_runtime_validated') {
    failures.push(`${reportPath} local_reproduction_status.mode must record project_local_runtime_validated`);
  }
  for (const ref of [local.local_run_record, local.local_training_entrypoint, local.local_validator]) {
    if (typeof ref !== 'string' || !exists(ref)) {
      failures.push(`${reportPath} local reproduction ref does not exist: ${ref}`);
    }
  }
  requireArray(local, 'implemented_locally', 1);
  requireArray(local, 'not_officially_reproduced', 1);

  const splitProbe = report.official_data_split_probe ?? {};
  if (splitProbe.status !== 'loader_check_passed') {
    failures.push(`${reportPath} official_data_split_probe.status must record loader_check_passed`);
  }
  if (splitProbe.loader !== 'skillopt.envs.searchqa.dataloader.SearchQADataLoader') {
    failures.push(`${reportPath} official_data_split_probe.loader must record the project-local SearchQA dataloader`);
  }
  if (typeof splitProbe.split_dir !== 'string' || !exists(splitProbe.split_dir)) {
    failures.push(`${reportPath} official_data_split_probe.split_dir does not exist`);
  }

  const selectionProbe = report.selection_data_split_probe ?? {};
  if (selectionProbe.status !== 'fixture_prepared') {
    failures.push(`${reportPath} selection_data_split_probe.status must be fixture_prepared`);
  }
  for (const ref of [selectionProbe.split_dir, selectionProbe.config]) {
    if (typeof ref !== 'string' || !exists(ref)) {
      failures.push(`${reportPath} selection_data_split_probe ref does not exist: ${ref}`);
    }
  }

  const credentialProbe = report.official_model_credential_probe ?? {};
  if (credentialProbe.status !== 'configured_for_local_runtime') {
    failures.push(`${reportPath} official_model_credential_probe.status must record configured_for_local_runtime`);
  }
  if (credentialProbe.env_file_supported !== true) {
    failures.push(`${reportPath} official_model_credential_probe.env_file_supported must be true`);
  }
  if (!Array.isArray(credentialProbe.available_backends) || credentialProbe.available_backends.length < 1) {
    failures.push(`${reportPath} official_model_credential_probe.available_backends must record at least one backend`);
  }

  const smokePlan = report.official_smoke_train_plan ?? {};
  if (smokePlan.status !== 'executed_and_validated_locally') {
    failures.push(`${reportPath} official_smoke_train_plan.status must be executed_and_validated_locally`);
  }
  if (smokePlan.runner_script !== smokeRunner) {
    failures.push(`${reportPath} official_smoke_train_plan.runner_script must be ${smokeRunner}`);
  }
  if (smokePlan.output_validator !== smokeValidator) {
    failures.push(`${reportPath} official_smoke_train_plan.output_validator must be ${smokeValidator}`);
  }
  requireArray(smokePlan, 'command', 2);
  requireArray(smokePlan, 'expected_output_refs', 4);

  const smokeResult = report.official_smoke_runtime_result ?? {};
  if (smokeResult.status !== 'passed') {
    failures.push(`${reportPath} official_smoke_runtime_result.status must be passed`);
  }
  if (smokeResult.evaluation_mode !== 'smoke') {
    failures.push(`${reportPath} official_smoke_runtime_result.evaluation_mode must be smoke`);
  }
  if (smokeResult.selection_gate_status !== 'not_applicable') {
    failures.push(`${reportPath} official_smoke_runtime_result.selection_gate_status must be not_applicable`);
  }
  if (smokeResult.validator !== smokeValidator) {
    failures.push(`${reportPath} official_smoke_runtime_result.validator must be ${smokeValidator}`);
  }

  const selectionResult = report.selection_runtime_result ?? {};
  if (selectionResult.status !== 'passed') {
    failures.push(`${reportPath} selection_runtime_result.status must be passed`);
  }
  if (selectionResult.evaluation_mode !== 'selection') {
    failures.push(`${reportPath} selection_runtime_result.evaluation_mode must be selection`);
  }
  if (selectionResult.validator !== selectionValidator) {
    failures.push(`${reportPath} selection_runtime_result.validator must be ${selectionValidator}`);
  }
  if (!['passed', 'failed'].includes(selectionResult.selection_gate_status)) {
    failures.push(`${reportPath} selection_runtime_result.selection_gate_status must be passed or failed`);
  }

  const historical = report.historical_blocked_smoke_proof ?? {};
  if (historical.status !== 'historical_pre_integration') {
    failures.push(`${reportPath} historical_blocked_smoke_proof.status must be historical_pre_integration`);
  }
  if (typeof historical.proof_ref !== 'string' || !exists(historical.proof_ref)) {
    failures.push(`${reportPath} historical_blocked_smoke_proof.proof_ref does not exist`);
  }

  const gates = new Map((report.readiness_gates ?? []).map((gate) => [gate.gate_id, gate.status]));
  if (gates.get('local_runtime_modules_integrated') !== 'passed') {
    failures.push(`${reportPath} local_runtime_modules_integrated must be passed`);
  }
  if (gates.get('smoke_runtime_executed') !== 'passed') {
    failures.push(`${reportPath} smoke_runtime_executed must be passed`);
  }
  if (gates.get('smoke_vs_selection_boundary_documented') !== 'passed') {
    failures.push(`${reportPath} smoke_vs_selection_boundary_documented must be passed`);
  }
  if (gates.get('selection_runner_available') !== 'passed') {
    failures.push(`${reportPath} selection_runner_available must be passed once the dedicated runner and validator exist`);
  }
  if (gates.get('protocol_regression_tests_covered') !== 'passed') {
    failures.push(`${reportPath} protocol_regression_tests_covered must be passed once tests are added`);
  }
  if (gates.get('official_paper_reproduction') !== 'missing') {
    failures.push(`${reportPath} official_paper_reproduction must remain missing`);
  }

  const doc = fs.readFileSync(path.join(root, docPath), 'utf8');
  for (const requiredText of [
    reportPath,
    'local_runtime_validated_not_official_reproduction_claim',
    'selection_gate_required: false',
    'configs/searchqa/selection.yaml',
  ]) {
    if (!doc.includes(requiredText)) {
      failures.push(`${docPath} must include ${requiredText}`);
    }
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checked_files: [reportPath, docPath],
  checks: [
    'official reference repository contract is recorded',
    'project-local runtime integration is recorded',
    'smoke runtime execution is recorded as passed',
    'smoke and selection boundaries are documented separately',
    'selection runner and validator are present',
    'protocol regression tests are present',
    'historical blocked proof is retained only as archival evidence',
    'official paper reproduction still remains out of scope'
  ]
}, null, 2));
