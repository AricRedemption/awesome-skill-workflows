import fs from 'node:fs';
import path from 'node:path';

const outRoot = process.env.SKILLOPT_XHS_SELECTION_OUT ?? '/private/tmp/skillopt-xhs-selection-run';
const acceptanceDir = path.join(process.cwd(), 'runs/008-xhs-skillopt-kb-reuse-minimal/selection_acceptance');
const allowMissing = process.argv.includes('--allow-missing');
const failures = [];

function exists(relativePath) {
  return fs.existsSync(path.join(outRoot, relativePath));
}

if (!fs.existsSync(outRoot)) {
  if (allowMissing) {
    console.log(JSON.stringify({
      status: 'skipped_missing_output',
      out_root: outRoot,
      reason: 'XHS SkillOpt selection evaluation has not run yet.'
    }, null, 2));
    process.exit(0);
  }
  failures.push(`selection output directory does not exist: ${outRoot}`);
}

if (failures.length === 0) {
  for (const file of ['config.json', 'history.json', 'runtime_state.json', 'best_skill.md', 'progress.json']) {
    if (!exists(file)) {
      failures.push(`missing selection output ${file}`);
    }
  }

  if (exists('config.json')) {
    const config = JSON.parse(fs.readFileSync(path.join(outRoot, 'config.json'), 'utf8'));
    if (config.env !== 'xiaohongshu_skill') {
      failures.push('xhs selection config.env must be xiaohongshu_skill');
    }
    if (config.evaluation_mode !== 'selection') {
      failures.push('xhs selection config.evaluation_mode must be selection');
    }
    if (config.selection_gate_required !== true) {
      failures.push('xhs selection config.selection_gate_required must be true');
    }
  }

  if (exists('history.json')) {
    const history = JSON.parse(fs.readFileSync(path.join(outRoot, 'history.json'), 'utf8'));
    if (!Array.isArray(history) || history.length < 1) {
      failures.push('xhs selection history.json must contain at least one entry');
    } else {
      const entry = history[0];
      const gate = entry.selection_gate ?? {};
      if (entry.evaluation_mode !== 'selection') {
        failures.push('xhs selection history[0].evaluation_mode must be selection');
      }
      if (!entry.val_baseline) {
        failures.push('xhs selection history[0] must record val_baseline summary');
      }
      if (gate.applicable !== true) {
        failures.push('xhs selection history[0].selection_gate.applicable must be true');
      }
      if (gate.status !== 'passed') {
        failures.push('xhs selection history[0].selection_gate.status must be passed');
      }
      if ((entry.val_baseline?.score ?? 0) >= (entry.val?.score ?? 0)) {
        failures.push('xhs selection candidate score must exceed baseline score');
      }
    }
  }

  if (exists('progress.json')) {
    const progress = JSON.parse(fs.readFileSync(path.join(outRoot, 'progress.json'), 'utf8'));
    const gate = progress.selection_gate ?? {};
    if (progress.status !== 'complete') {
      failures.push('xhs selection progress.json status must be complete after a finished run');
    }
    if (gate.status !== 'passed') {
      failures.push('xhs selection progress.json selection_gate.status must be passed');
    }
  }

  if (!exists('selection_eval_baseline/summary.json')) {
    failures.push('missing xhs selection baseline summary output');
  }
  if (!exists('selection_eval_candidate/summary.json')) {
    failures.push('missing xhs selection candidate summary output');
  }

  const latestAcceptancePath = path.join(acceptanceDir, 'latest-selection-acceptance.json');
  const acceptanceHistoryPath = path.join(acceptanceDir, 'selection-acceptance-history.jsonl');
  if (!fs.existsSync(latestAcceptancePath)) {
    failures.push('missing xhs selection latest acceptance record');
  }
  if (!fs.existsSync(acceptanceHistoryPath)) {
    failures.push('missing xhs selection acceptance history ledger');
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', out_root: outRoot, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  out_root: outRoot,
  checks: [
    'xhs selection output directory exists',
    'xhs selection config/history/runtime/progress artifacts exist',
    'xhs selection baseline and candidate summaries both exist',
    'xhs selection gate passed with candidate score above baseline',
    'xhs selection acceptance records were persisted'
  ]
}, null, 2));
