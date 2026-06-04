import fs from 'node:fs';
import path from 'node:path';

const outRoot = process.env.SKILLOPT_SELECTION_OUT ?? '/private/tmp/skillopt-selection-run';
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
      reason: 'SkillOpt selection evaluation has not run yet.'
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
    if (config.evaluation_mode !== 'selection') {
      failures.push('selection config.evaluation_mode must be selection');
    }
    if (config.selection_gate_required !== true) {
      failures.push('selection config.selection_gate_required must be true');
    }
  }

  if (exists('history.json')) {
    const history = JSON.parse(fs.readFileSync(path.join(outRoot, 'history.json'), 'utf8'));
    if (!Array.isArray(history) || history.length < 1) {
      failures.push('selection history.json must contain at least one entry');
    } else {
      const gate = history[0].selection_gate ?? {};
      if (history[0].evaluation_mode !== 'selection') {
        failures.push('selection history[0].evaluation_mode must be selection');
      }
      if (!history[0].val_baseline) {
        failures.push('selection history[0] must record val_baseline summary');
      }
      if (gate.applicable !== true) {
        failures.push('selection history[0].selection_gate.applicable must be true');
      }
      if (!['passed', 'failed'].includes(gate.status)) {
        failures.push('selection history[0].selection_gate.status must be passed or failed');
      }
    }
  }

  if (exists('progress.json')) {
    const progress = JSON.parse(fs.readFileSync(path.join(outRoot, 'progress.json'), 'utf8'));
    const gate = progress.selection_gate ?? {};
    if (progress.status !== 'complete') {
      failures.push('selection progress.json status must be complete after a finished run');
    }
    if (gate.applicable !== true) {
      failures.push('selection progress.json selection_gate.applicable must be true');
    }
  }

  if (!exists('selection_eval_baseline/summary.json')) {
    failures.push('missing selection baseline summary output');
  }
  if (!exists('selection_eval_candidate/summary.json')) {
    failures.push('missing selection candidate summary output');
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
    'selection output directory exists',
    'selection config/history/runtime/progress artifacts exist',
    'selection baseline and candidate summaries both exist',
    'selection mode keeps selection gating applicable',
    'selection output remains structurally distinct from smoke output'
  ]
}, null, 2));
