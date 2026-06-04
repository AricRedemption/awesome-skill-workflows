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

function checkGeneratedEdits(file, run) {
  const generation = run.edit_generation;
  if (!generation || typeof generation !== 'object') {
    failures.push(`${file} missing edit_generation`);
    return;
  }

  if (!['deterministic_script', 'manual', 'optimizer_model', 'external_skillopt'].includes(generation.generator_type)) {
    failures.push(`${file} has invalid edit_generation.generator_type ${generation.generator_type}`);
  }

  checkRefs(generation.input_refs, file, 'edit_generation.input_refs');
  checkRefs(generation.output_refs, file, 'edit_generation.output_refs');

  if (generation.generator_type === 'deterministic_script') {
    const hasScriptRef = (generation.output_refs ?? []).some((ref) => ref.startsWith('scripts/'));
    if (!hasScriptRef) {
      failures.push(`${file} deterministic edit generation must reference the generator script`);
    }
  }

  const generatedJsonRef = (generation.output_refs ?? []).find((ref) => ref.endsWith('generated-edits.json'));
  if (!generatedJsonRef) {
    failures.push(`${file} edit_generation.output_refs must include generated-edits.json`);
    return;
  }

  if (!exists(generatedJsonRef)) return;
  const generated = readJson(generatedJsonRef);
  const generatedIds = new Set((generated.edits ?? []).map((edit) => edit.edit_id));
  for (const edit of run.edits ?? []) {
    if (!generatedIds.has(edit.edit_id)) {
      failures.push(`${file} edit ${edit.edit_id} is missing from ${generatedJsonRef}`);
    }
  }
}

function checkRolloutEvaluation(file, run) {
  const rollout = run.rollout_evaluation;
  if (!rollout || typeof rollout !== 'object') {
    failures.push(`${file} missing rollout_evaluation`);
    return;
  }

  requireString(rollout, 'runner_path', file);
  requireString(rollout, 'output_ref', file);

  if (!exists(rollout.runner_path)) {
    failures.push(`${file} rollout_evaluation.runner_path does not exist: ${rollout.runner_path}`);
  }
  if (!exists(rollout.output_ref)) {
    failures.push(`${file} rollout_evaluation.output_ref does not exist: ${rollout.output_ref}`);
    return;
  }
  if (!Number.isInteger(rollout.workers) || rollout.workers < 1) {
    failures.push(`${file} rollout_evaluation.workers must be a positive integer`);
  }

  const rollouts = readJson(rollout.output_ref);
  if (!Array.isArray(rollouts.workers) || rollouts.workers.length < 2) {
    failures.push(`${file} rollouts must include baseline and candidate workers`);
  }
  const targets = new Set((rollouts.workers ?? []).map((worker) => worker.target));
  if (!targets.has('baseline') || !targets.has('candidate')) {
    failures.push(`${file} rollouts must include baseline and candidate targets`);
  }
}

function checkOptimizerReflection(file, run) {
  const reflection = run.optimizer_reflection;
  if (!reflection || typeof reflection !== 'object') {
    failures.push(`${file} missing optimizer_reflection`);
    return;
  }

  requireString(reflection, 'reflector_path', file);
  requireString(reflection, 'output_ref', file);
  requireString(reflection, 'recommendation', file);

  if (!exists(reflection.reflector_path)) {
    failures.push(`${file} optimizer_reflection.reflector_path does not exist: ${reflection.reflector_path}`);
  }
  if (!exists(reflection.output_ref)) {
    failures.push(`${file} optimizer_reflection.output_ref does not exist: ${reflection.output_ref}`);
    return;
  }

  const artifact = readJson(reflection.output_ref);
  if (artifact.recommendation !== reflection.recommendation) {
    failures.push(`${file} optimizer_reflection.recommendation does not match artifact`);
  }
  if (run.accepted && reflection.recommendation !== 'accept_candidate') {
    failures.push(`${file} accepted run requires optimizer reflection accept_candidate`);
  }
}

function checkTrainingEntrypoint(file, run) {
  const entrypoint = run.training_entrypoint;
  if (!entrypoint || typeof entrypoint !== 'object') {
    failures.push(`${file} missing training_entrypoint`);
    return;
  }

  requireString(entrypoint, 'script', file);
  requireString(entrypoint, 'output_ref', file);

  if (!exists(entrypoint.script)) {
    failures.push(`${file} training_entrypoint.script does not exist: ${entrypoint.script}`);
  }
  if (!exists(entrypoint.output_ref)) {
    failures.push(`${file} training_entrypoint.output_ref does not exist: ${entrypoint.output_ref}`);
  }
  if (!Array.isArray(entrypoint.step_artifacts) || entrypoint.step_artifacts.length === 0) {
    failures.push(`${file} training_entrypoint.step_artifacts must be non-empty`);
    return;
  }

  if (!Array.isArray(entrypoint.epoch_artifacts) || entrypoint.epoch_artifacts.length === 0) {
    failures.push(`${file} training_entrypoint.epoch_artifacts must be non-empty`);
    return;
  }

  for (const artifact of [...entrypoint.step_artifacts, ...entrypoint.epoch_artifacts]) {
    if (typeof artifact !== 'string' || artifact.length === 0) {
      failures.push(`${file} has invalid training step artifact`);
      continue;
    }
    if (!exists(artifact)) {
      failures.push(`${file} training step artifact does not exist: ${artifact}`);
    }
  }

  if (exists(entrypoint.output_ref)) {
    const trainRun = readJson(entrypoint.output_ref);
    if (trainRun.training_config?.epochs < 2) {
      failures.push(`${file} training run must record at least two local epochs`);
    }
    if (trainRun.training_config?.batch_size < 1) {
      failures.push(`${file} training run must record batch_size >= 1`);
    }
    if (trainRun.training_config?.workers < 2) {
      failures.push(`${file} training run must record at least two rollout workers`);
    }
    for (const artifact of trainRun.steps ?? []) {
      if (!exists(`runs/${run.run_id}/${artifact}`)) {
        failures.push(`${file} train-run step artifact does not exist: ${artifact}`);
      }
    }
    for (const artifact of trainRun.epoch_artifacts ?? []) {
      if (!exists(`runs/${run.run_id}/${artifact}`)) {
        failures.push(`${file} train-run epoch artifact does not exist: ${artifact}`);
      }
    }
  }
}

function checkRejectedCandidates(file, run) {
  if (!Array.isArray(run.rejected_candidates)) {
    failures.push(`${file} missing rejected_candidates array`);
    return;
  }

  for (const candidate of run.rejected_candidates) {
    for (const field of ['candidate_id', 'candidate_skill_path', 'rejection_stage', 'reason']) {
      requireString(candidate, field, file);
    }

    if (!['selection_gate', 'risk_gate', 'sensitive_data_gate', 'promotion_gate'].includes(candidate.rejection_stage)) {
      failures.push(`${file} rejected candidate ${candidate.candidate_id ?? '<unknown>'} has invalid rejection_stage ${candidate.rejection_stage}`);
    }

    if (!exists(candidate.candidate_skill_path)) {
      failures.push(`${file} rejected candidate path does not exist: ${candidate.candidate_skill_path}`);
    }

    if (typeof candidate.baseline_score !== 'number' || typeof candidate.candidate_score !== 'number') {
      failures.push(`${file} rejected candidate ${candidate.candidate_id ?? '<unknown>'} scores must be numbers`);
    }

    if (candidate.rejection_stage === 'selection_gate' && candidate.candidate_score > candidate.baseline_score) {
      failures.push(`${file} selection-gate rejection ${candidate.candidate_id ?? '<unknown>'} cannot improve over baseline`);
    }

    checkRefs(candidate.evidence_refs, file, `rejected candidate ${candidate.candidate_id ?? '<unknown>'}.evidence_refs`);
  }
}

function checkScoreEvaluation(file, run) {
  const evaluation = run.score_evaluation;
  if (!evaluation || typeof evaluation !== 'object') {
    failures.push(`${file} missing score_evaluation`);
    return;
  }

  if (!['deterministic_script', 'manual', 'external_harness'].includes(evaluation.scorer_type)) {
    failures.push(`${file} has invalid score_evaluation.scorer_type ${evaluation.scorer_type}`);
  }

  requireString(evaluation, 'scorer_path', file);
  requireString(evaluation, 'output_ref', file);

  if (!exists(evaluation.scorer_path)) {
    failures.push(`${file} score_evaluation.scorer_path does not exist: ${evaluation.scorer_path}`);
  }

  if (!exists(evaluation.output_ref)) {
    failures.push(`${file} score_evaluation.output_ref does not exist: ${evaluation.output_ref}`);
    return;
  }

  const scoreResult = readJson(evaluation.output_ref);
  if (scoreResult.baseline_score !== run.baseline_score?.value) {
    failures.push(`${file} baseline_score.value does not match ${evaluation.output_ref}`);
  }
  if (scoreResult.candidate_score !== run.candidate_score?.value) {
    failures.push(`${file} candidate_score.value does not match ${evaluation.output_ref}`);
  }
  if (scoreResult.baseline_score !== run.selection_gate?.baseline_score) {
    failures.push(`${file} selection_gate.baseline_score does not match ${evaluation.output_ref}`);
  }
  if (scoreResult.candidate_score !== run.selection_gate?.candidate_score) {
    failures.push(`${file} selection_gate.candidate_score does not match ${evaluation.output_ref}`);
  }
  if (scoreResult.improvement !== run.selection_gate?.improvement) {
    failures.push(`${file} selection_gate.improvement does not match ${evaluation.output_ref}`);
  }
}

function checkExportedArtifacts(file, run) {
  const artifacts = run.exported_artifacts;
  if (!artifacts || typeof artifacts !== 'object') {
    failures.push(`${file} missing exported_artifacts`);
    return;
  }

  for (const field of ['best_skill', 'history', 'runtime_state', 'config', 'slow_update', 'meta_skill']) {
    requireString(artifacts, field, file);
    if (typeof artifacts[field] === 'string' && !exists(artifacts[field])) {
      failures.push(`${file} exported_artifacts.${field} does not exist: ${artifacts[field]}`);
    }
  }

  if (exists(artifacts.best_skill) && exists(run.candidate_skill_path)) {
    const bestSkill = fs.readFileSync(path.join(root, artifacts.best_skill), 'utf8');
    const candidateSkill = fs.readFileSync(path.join(root, run.candidate_skill_path), 'utf8');
    if (bestSkill !== candidateSkill) {
      failures.push(`${file} exported best_skill must match accepted candidate_skill_path`);
    }
  }

  if (exists(artifacts.history)) {
    const history = readJson(artifacts.history);
    if (!Array.isArray(history.steps) || history.steps.length === 0) {
      failures.push(`${file} exported history must contain steps`);
    }
    if (!Array.isArray(history.epochs) || history.epochs.length === 0) {
      failures.push(`${file} exported history must contain epochs`);
    }
    if ((history.epochs ?? []).length < 2) {
      failures.push(`${file} exported history must contain at least two epochs`);
    }
    const hasConvergenceEpoch = (history.epochs ?? []).some((epoch) => epoch.status === 'converged_no_update');
    if (!hasConvergenceEpoch) {
      failures.push(`${file} exported history must record a convergence/no-update epoch`);
    }
  }

  if (exists(artifacts.runtime_state)) {
    const runtimeState = readJson(artifacts.runtime_state);
    if (runtimeState.best_skill_path !== 'best_skill.md') {
      failures.push(`${file} runtime_state.best_skill_path must point to best_skill.md`);
    }
  }
}

function checkPromotion(file, run) {
  const promotion = run.promotion;
  if (!promotion || typeof promotion !== 'object') {
    warnings.push(`${file} does not define structured promotion metadata`);
    return;
  }

  if (!['none', 'candidate', 'promoted', 'rejected', 'blocked'].includes(promotion.status)) {
    failures.push(`${file} has invalid promotion.status ${promotion.status}`);
  }
  requireString(promotion, 'manifest_path', file);
  if (!Array.isArray(promotion.targets) || promotion.targets.length === 0) {
    failures.push(`${file} promotion.targets must be non-empty when promotion metadata exists`);
    return;
  }

  const manifestPath = promotion.manifest_path;
  if (!exists(manifestPath)) {
    failures.push(`${file} promotion.manifest_path does not exist: ${manifestPath}`);
    return;
  }

  const manifest = readJson(manifestPath);
  for (const field of ['source_run', 'source_artifact', 'source_optimization_record', 'promotion_status', 'sensitive_data_status']) {
    requireString(manifest, field, manifestPath);
  }
  requireArray(manifest, 'promoted_assets', manifestPath);
  checkRefs(manifest.evidence_refs, manifestPath, 'evidence_refs');

  if (manifest.source_run !== run.run_id) {
    failures.push(`${manifestPath} source_run must match ${file} run_id`);
  }
  if (manifest.source_optimization_record !== file) {
    failures.push(`${manifestPath} source_optimization_record must point back to ${file}`);
  }
  if (manifest.source_artifact !== run.exported_artifacts?.best_skill) {
    failures.push(`${manifestPath} source_artifact must match exported_artifacts.best_skill`);
  }
  if (manifest.sensitive_data_status !== run.sensitive_data_status) {
    failures.push(`${manifestPath} sensitive_data_status must match ${file}`);
  }
  if (promotion.status === 'promoted' && manifest.promotion_status !== 'promoted') {
    failures.push(`${manifestPath} promotion_status must be promoted when ${file} promotion.status is promoted`);
  }
  if (manifest.required_gates?.selection_gate !== run.selection_gate?.status) {
    failures.push(`${manifestPath} required_gates.selection_gate must match ${file}`);
  }
  if (manifest.required_gates?.risk_gate !== run.risk_gate?.status) {
    failures.push(`${manifestPath} required_gates.risk_gate must match ${file}`);
  }
  if (manifest.required_gates?.sensitive_data_gate !== run.sensitive_data_status) {
    failures.push(`${manifestPath} required_gates.sensitive_data_gate must match ${file}`);
  }

  const promotedAssetMap = new Map((manifest.promoted_assets ?? []).map((asset) => [asset.type, asset]));
  const promotionTargetMap = new Map((promotion.targets ?? []).map((target) => [target.type, target]));
  for (const requiredType of ['skill_wiki', 'skill_registry', 'retrieval_index']) {
    if (!promotedAssetMap.has(requiredType)) {
      failures.push(`${manifestPath} must include promoted asset type ${requiredType}`);
    }
    if (!promotionTargetMap.has(requiredType)) {
      failures.push(`${file} promotion.targets must include ${requiredType}`);
    }
  }

  const wikiAsset = promotedAssetMap.get('skill_wiki');
  const registryAsset = promotedAssetMap.get('skill_registry');
  const retrievalAsset = promotedAssetMap.get('retrieval_index');

  if (wikiAsset?.path && !exists(wikiAsset.path)) {
    failures.push(`${manifestPath} promoted skill wiki path does not exist: ${wikiAsset.path}`);
  }
  if (registryAsset?.path && !exists(registryAsset.path)) {
    failures.push(`${manifestPath} promoted registry path does not exist: ${registryAsset.path}`);
  }
  if (retrievalAsset?.path && !exists(retrievalAsset.path)) {
    failures.push(`${manifestPath} promoted retrieval path does not exist: ${retrievalAsset.path}`);
  }

  if (wikiAsset?.path && exists(wikiAsset.path)) {
    const wikiText = fs.readFileSync(path.join(root, wikiAsset.path), 'utf8');
    if (!wikiText.includes(`Source run: \`runs/${run.run_id}/\``)) {
      failures.push(`${wikiAsset.path} must record source run runs/${run.run_id}/`);
    }
    if (!wikiText.includes(`Source skill path: \`${manifest.source_artifact}\``)) {
      failures.push(`${wikiAsset.path} must record source skill path ${manifest.source_artifact}`);
    }
    if (!wikiText.includes(`Promotion manifest: \`${manifestPath}\``)) {
      failures.push(`${wikiAsset.path} must record promotion manifest ${manifestPath}`);
    }
  }

  if (registryAsset?.path && exists(registryAsset.path)) {
    const registry = readJson(registryAsset.path);
    const registryRecord = (registry ?? []).find((record) => record.id === registryAsset.record_id);
    if (!registryRecord) {
      failures.push(`${registryAsset.path} missing registry record ${registryAsset.record_id}`);
    } else if (registryRecord.original_source_path !== wikiAsset?.path) {
      failures.push(`${registryAsset.path} registry record ${registryAsset.record_id} must point to ${wikiAsset?.path}`);
    }
  }

  if (retrievalAsset?.path && exists(retrievalAsset.path)) {
    const retrieval = readJson(retrievalAsset.path);
    const retrievalRecord = (retrieval.records ?? []).find((record) => record.id === retrievalAsset.record_id);
    if (!retrievalRecord) {
      failures.push(`${retrievalAsset.path} missing retrieval record ${retrievalAsset.record_id}`);
    } else if (retrievalRecord.source_path !== wikiAsset?.path) {
      failures.push(`${retrievalAsset.path} retrieval record ${retrievalAsset.record_id} must point to ${wikiAsset?.path}`);
    }
  }
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

  checkGeneratedEdits(file, run);
  checkRolloutEvaluation(file, run);
  checkOptimizerReflection(file, run);
  checkTrainingEntrypoint(file, run);

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

  checkRejectedCandidates(file, run);
  checkScoreEvaluation(file, run);
  checkExportedArtifacts(file, run);
  checkPromotion(file, run);

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
    'rollout workers evaluate baseline and candidate',
    'optimizer reflection artifact matches run decision',
    'generated edits are recorded and match accepted edits',
    'training entrypoint and per-step artifacts exist',
    'multi-epoch local training artifacts exist',
    'train and selection evidence refs are separate',
    'edit budget bounds candidate edits',
    'rejected candidate buffer is validated',
    'score evaluation artifact matches recorded scores',
    'best skill, history, runtime state, config, slow update, and meta skill exports exist',
    'baseline and candidate scores are present',
    'selection gate improvement is consistent',
    'accepted candidates improve score and pass risk gate',
    'sensitive refs are blocked from evidence fields',
    'direct verified-recipes promotion is blocked',
    'promoted wiki targets require a promotion manifest and matching durable records'
  ],
  warning_count: warnings.length,
  warnings
}, null, 2));
