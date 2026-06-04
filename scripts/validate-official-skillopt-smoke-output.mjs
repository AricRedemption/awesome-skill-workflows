import fs from 'node:fs';
import path from 'node:path';

const outRoot = process.env.OFFICIAL_SKILLOPT_SMOKE_OUT ?? '/private/tmp/skillopt-smoke-run';
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
      reason: 'SkillOpt smoke training has not run yet.'
    }, null, 2));
    process.exit(0);
  }
  failures.push(`smoke output directory does not exist: ${outRoot}`);
}

if (failures.length === 0) {
  for (const file of ['config.json', 'history.json', 'runtime_state.json', 'best_skill.md', 'progress.json']) {
    if (!exists(file)) {
      failures.push(`missing smoke output ${file}`);
    }
  }

  if (exists('config.json')) {
    const config = JSON.parse(fs.readFileSync(path.join(outRoot, 'config.json'), 'utf8'));
    if (config.env !== 'searchqa') {
      failures.push('smoke config.env must be searchqa');
    }
    if (config.evaluation_mode !== 'smoke') {
      failures.push('smoke config.evaluation_mode must be smoke');
    }
    if (config.selection_gate_required !== false) {
      failures.push('smoke config.selection_gate_required must be false');
    }
    if (config.train_size !== 2) {
      failures.push('smoke config.train_size must be 2 for the project smoke split');
    }
  }

  if (exists('history.json')) {
    const history = JSON.parse(fs.readFileSync(path.join(outRoot, 'history.json'), 'utf8'));
    if (!Array.isArray(history)) {
      failures.push('smoke history.json must be an array');
    } else if (history.length < 1) {
      failures.push('smoke history.json must contain at least one entry');
    } else {
      const first = history[0];
      if (first.evaluation_mode !== 'smoke') {
        failures.push('smoke history[0].evaluation_mode must be smoke');
      }
      if (first.selection_gate?.status !== 'not_applicable') {
        failures.push('smoke history[0].selection_gate.status must be not_applicable');
      }
    }
  }

  if (exists('runtime_state.json')) {
    const state = JSON.parse(fs.readFileSync(path.join(outRoot, 'runtime_state.json'), 'utf8'));
    if (typeof state !== 'object' || state === null) {
      failures.push('smoke runtime_state.json must be an object');
    } else if (state.evaluation_mode !== 'smoke') {
      failures.push('smoke runtime_state.evaluation_mode must be smoke');
    }
  }

  if (exists('progress.json')) {
    const progress = JSON.parse(fs.readFileSync(path.join(outRoot, 'progress.json'), 'utf8'));
    if (progress.status !== 'complete') {
      failures.push('smoke progress.json status must be complete after a finished run');
    }
    if (progress.selection_gate?.status !== 'not_applicable') {
      failures.push('smoke progress.json selection_gate.status must be not_applicable');
    }
  }

  if (exists('best_skill.md')) {
    const bestSkill = fs.readFileSync(path.join(outRoot, 'best_skill.md'), 'utf8');
    if (bestSkill.trim().length === 0) {
      failures.push('smoke best_skill.md must not be empty');
    }
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({
    status: 'failed',
    out_root: outRoot,
    failures
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
    status: 'passed',
    out_root: outRoot,
    checks: [
      'smoke output directory exists',
      'config/history/runtime/progress/best_skill artifacts exist',
      'config marks this run as smoke-only',
      'smoke output does not treat selection gating as a success criterion',
      'config matches SearchQA smoke split',
      'best_skill.md is non-empty'
  ]
}, null, 2));
