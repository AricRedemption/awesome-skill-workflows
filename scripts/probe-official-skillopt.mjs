import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { credentialStatus, getArgValue, loadEnvFile } from './lib/official-skillopt-env.mjs';

const root = process.cwd();
const projectPythonEntrypoint = path.join(root, 'scripts/train.py');
const projectEvalEntrypoint = path.join(root, 'scripts/eval_only.py');
const configPath = path.join(root, 'configs/searchqa/default.yaml');
const splitDir = path.join(root, 'runs/009-skillopt-official-searchqa-smoke/searchqa_split');
const failures = [];
const envFile = getArgValue(process.argv, '--env-file') || process.env.OFFICIAL_SKILLOPT_ENV_FILE || '';
const envLoad = loadEnvFile(envFile);
const pythonPath = envLoad.env.SKILLOPT_PYTHON || 'python3';

function exists(absolutePath) {
  return fs.existsSync(absolutePath);
}

function requiresFilesystemPath(command) {
  return path.isAbsolute(command) || command.includes(path.sep);
}

function requireFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!exists(absolutePath)) {
    failures.push(`missing local SkillOpt module file: ${absolutePath}`);
  }
}

function runPython(args, options = {}) {
  return execFileSync(pythonPath, args, {
    cwd: options.cwd ?? root,
    env: envLoad.env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });
}

if (requiresFilesystemPath(pythonPath) && !exists(pythonPath)) {
  failures.push(`configured Python executable not found: ${pythonPath}`);
}

if (!exists(splitDir)) {
  failures.push(`SearchQA smoke split not found: ${splitDir}`);
}

for (const file of [
  'scripts/train.py',
  'scripts/eval_only.py',
  'configs/searchqa/default.yaml',
  'skillopt/engine/trainer.py',
  'skillopt/envs/searchqa/dataloader.py',
  'skillopt/gradient/reflect.py',
  'skillopt/optimizer/slow_update.py',
  'skillopt/optimizer/meta_skill.py',
  'skillopt/evaluation/gate.py',
  'skillopt/model/codex_harness.py'
]) {
  requireFile(file);
}

let helpOutput = '';
if (failures.length === 0) {
  try {
    helpOutput = runPython([projectPythonEntrypoint, '--help']);
  } catch (error) {
    failures.push(`local scripts/train.py --help failed: ${error.stderr || error.message}`);
  }
}

const requiredHelpFlags = [
  '--config',
  '--split_dir',
  '--optimizer_model',
  '--target_model',
  '--num_epochs',
  '--batch_size',
  '--workers',
  '--out_root',
  '--use_slow_update',
  '--use_meta_skill'
];

if (helpOutput) {
  for (const flag of requiredHelpFlags) {
    if (!helpOutput.includes(flag)) {
      failures.push(`scripts/train.py --help missing ${flag}`);
    }
  }
}

let splitCounts = null;
if (failures.length === 0) {
  const code = [
    'import json',
    'from skillopt.envs.searchqa.dataloader import SearchQADataLoader',
    `d = SearchQADataLoader(split_dir=${JSON.stringify(splitDir)}, split_mode="split_dir")`,
    'd.setup({"out_root": "/private/tmp/skillopt-smoke-out", "env": "searchqa"})',
    'print(json.dumps({"train": len(d.train_items), "val": len(d.val_items), "test": len(d.test_items)}))'
  ].join('; ');

  try {
    const output = runPython(['-c', code]);
    const lastLine = output.trim().split('\n').at(-1);
    splitCounts = JSON.parse(lastLine);
  } catch (error) {
    failures.push(`local SearchQA dataloader probe failed: ${error.stderr || error.message}`);
  }
}

if (splitCounts) {
  for (const splitName of ['train', 'val', 'test']) {
    if (!Number.isInteger(splitCounts[splitName]) || splitCounts[splitName] < 1) {
      failures.push(`SearchQA dataloader returned invalid ${splitName} count`);
    }
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({
    status: 'failed',
    project_root: root,
    python: pythonPath,
    split_dir: splitDir,
    failures
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  project_root: root,
  python: pythonPath,
  train_entrypoint: projectPythonEntrypoint,
  eval_entrypoint: projectEvalEntrypoint,
  config_path: configPath,
  split_dir: splitDir,
  env_file_loaded: Boolean(envLoad.loaded_env_file),
  env_file_loaded_keys: envLoad.loaded_keys,
  credential_status: credentialStatus(envLoad.env),
  checks: [
    'project-local SkillOpt module files exist under the main repository structure',
    'scripts/train.py help loads in the configured Python environment',
    'scripts/train.py exposes expected SkillOpt CLI flags',
    'project-local SearchQA dataloader loads the smoke split',
    'model credential presence checked without printing secret values'
  ],
  split_counts: splitCounts
}, null, 2));
