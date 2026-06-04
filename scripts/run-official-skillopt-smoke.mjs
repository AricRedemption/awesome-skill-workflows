import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { credentialStatus, getArgValue, loadEnvFile } from './lib/official-skillopt-env.mjs';

const root = process.cwd();
const outRoot = process.env.OFFICIAL_SKILLOPT_SMOKE_OUT ?? '/private/tmp/skillopt-smoke-run';
const splitDir = path.join(root, 'runs/009-skillopt-official-searchqa-smoke/searchqa_split');
const dryRun = process.argv.includes('--dry-run');
const envFile = getArgValue(process.argv, '--env-file') || process.env.OFFICIAL_SKILLOPT_ENV_FILE || '';
const proofOut = getArgValue(process.argv, '--proof-out') || '';
const envLoad = loadEnvFile(envFile);
const pythonPath = envLoad.env.SKILLOPT_PYTHON || 'python3';
const trainEntrypoint = path.join(root, 'scripts/train.py');
const configPath = path.join(root, 'configs/searchqa/default.yaml');

const args = [
  trainEntrypoint,
  '--config',
  configPath,
  '--split_dir',
  splitDir,
  '--num_epochs',
  '1',
  '--train_size',
  '2',
  '--batch_size',
  '1',
  '--workers',
  '1',
  '--analyst_workers',
  '1',
  '--minibatch_size',
  '1',
  '--merge_batch_size',
  '1',
  '--sel_env_num',
  '1',
  '--test_env_num',
  '1',
  '--out_root',
  outRoot
];

const preflightFailures = [];
for (const requiredPath of [trainEntrypoint, configPath, splitDir]) {
  if (!fs.existsSync(requiredPath)) {
    preflightFailures.push(`missing required path: ${requiredPath}`);
  }
}

if (pythonPath && (path.isAbsolute(pythonPath) || pythonPath.includes(path.sep)) && !fs.existsSync(pythonPath)) {
  preflightFailures.push(`missing required path: ${pythonPath}`);
}

const credentials = credentialStatus(envLoad.env);
const payload = {
  project_root: root,
  python: pythonPath,
  cwd: root,
  argv: [pythonPath, ...args],
  out_root: outRoot,
  split_dir: splitDir,
  env_file_loaded: Boolean(envLoad.loaded_env_file),
  env_file_loaded_keys: envLoad.loaded_keys,
  credential_status: credentials
};

function proofPayload(status, extra = {}) {
  return {
    proof_id: `official-skillopt-smoke-${status}`,
    checked_at: new Date().toISOString(),
    runner: 'scripts/run-official-skillopt-smoke.mjs',
    status,
    ...payload,
    argv_shape: [
      'python',
      'scripts/train.py',
      '--config',
      'configs/searchqa/default.yaml',
      '--split_dir',
      'runs/009-skillopt-official-searchqa-smoke/searchqa_split',
      '--num_epochs',
      '1',
      '--train_size',
      '2',
      '--batch_size',
      '1',
      '--workers',
      '1',
      '--analyst_workers',
      '1',
      '--minibatch_size',
      '1',
      '--merge_batch_size',
      '1',
      '--sel_env_num',
      '1',
      '--test_env_num',
      '1',
      '--out_root',
      outRoot
    ],
    secret_handling: 'Only boolean environment-variable presence and loaded key names are recorded. No credential values are stored.',
    ...extra
  };
}

function writeProof(status, extra = {}) {
  if (!proofOut) return null;
  const proof = proofPayload(status, extra);
  const target = path.resolve(proofOut);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(proof, null, 2)}\n`);
  return target;
}

if (dryRun) {
  const status = preflightFailures.length === 0 ? 'dry_run_ready' : 'dry_run_failed';
  const writtenProof = writeProof(status, {
    preflight_failures: preflightFailures,
    exit_code: preflightFailures.length === 0 ? 0 : 1
  });
  console.log(JSON.stringify({
    status,
    ...payload,
    preflight_failures: preflightFailures,
    proof_out: writtenProof
  }, null, 2));
  process.exit(preflightFailures.length === 0 ? 0 : 1);
}

if (preflightFailures.length > 0) {
  const writtenProof = writeProof('failed_preflight', {
    preflight_failures: preflightFailures,
    exit_code: 1
  });
  console.error(JSON.stringify({
    status: 'failed_preflight',
    ...payload,
    preflight_failures: preflightFailures,
    proof_out: writtenProof
  }, null, 2));
  process.exit(1);
}

if (!credentials.ready_for_training) {
  const writtenProof = writeProof('blocked_missing_credentials', {
    exit_code: 2,
    reason: 'No usable optimizer or target model backend credentials are present in the current shell.'
  });
  console.error(JSON.stringify({
    status: 'blocked_missing_credentials',
    ...payload,
    reason: 'No usable optimizer or target model backend credentials are present in the current shell.',
    proof_out: writtenProof
  }, null, 2));
  process.exit(2);
}

const result = spawnSync(pythonPath, args, {
  cwd: root,
  stdio: 'inherit',
  env: envLoad.env
});

if (result.status !== 0) {
  const writtenProof = writeProof('failed_train', {
    exit_code: result.status ?? 1,
    signal: result.signal
  });
  console.error(JSON.stringify({
    status: 'failed_train',
    ...payload,
    exit_status: result.status,
    signal: result.signal,
    proof_out: writtenProof
  }, null, 2));
  process.exit(result.status ?? 1);
}

const expectedOutputs = [
  'config.json',
  'history.json',
  'runtime_state.json',
  'best_skill.md'
];
const missingOutputs = expectedOutputs.filter((file) => !fs.existsSync(path.join(outRoot, file)));

if (missingOutputs.length > 0) {
  const writtenProof = writeProof('failed_missing_outputs', {
    exit_code: 1,
    missing_outputs: missingOutputs
  });
  console.error(JSON.stringify({
    status: 'failed_missing_outputs',
    ...payload,
    missing_outputs: missingOutputs,
    proof_out: writtenProof
  }, null, 2));
  process.exit(1);
}

const writtenProof = writeProof('passed', {
  exit_code: 0,
  expected_outputs: expectedOutputs.map((file) => path.join(outRoot, file))
});
console.log(JSON.stringify({
  status: 'passed',
  ...payload,
  expected_outputs: expectedOutputs.map((file) => path.join(outRoot, file)),
  proof_out: writtenProof
}, null, 2));
