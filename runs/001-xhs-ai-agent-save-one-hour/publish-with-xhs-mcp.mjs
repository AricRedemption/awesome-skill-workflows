import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const packagePath = path.join(runDir, 'xhs-skill-workflow-post-package.json');
const resultPath = path.join(runDir, 'xhs-mcp-publish-result.json');
const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));

const mediaPaths = pkg.media_paths.join(',');
const tags = pkg.tags.join(',');
const args = [
  'xhs-mcp@0.8.13',
  'publish',
  '--type',
  'image',
  '--title',
  pkg.title,
  '--content',
  pkg.content,
  '--media',
  mediaPaths,
  '--tags',
  tags,
];

const startedAt = new Date().toISOString();
try {
  const { stdout, stderr } = await execFileAsync('npx', args, {
    cwd: '/Users/aricredemption/Projects/awesome-skill-workflows',
    timeout: 240_000,
    maxBuffer: 1024 * 1024 * 10,
    env: {
      ...process.env,
      XHS_ENABLE_LOGGING: 'true',
    },
  });
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'command_exited_zero',
    startedAt,
    checkedAt: new Date().toISOString(),
    command: ['npx', ...args],
    stdout,
    stderr,
  }, null, 2));
  console.log(JSON.stringify({ status: 'command_exited_zero', resultPath, stdout, stderr }, null, 2));
} catch (error) {
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'command_failed',
    startedAt,
    checkedAt: new Date().toISOString(),
    command: ['npx', ...args],
    exitCode: error.code,
    signal: error.signal,
    message: error.message,
    stdout: error.stdout,
    stderr: error.stderr,
  }, null, 2));
  console.error(JSON.stringify({
    status: 'command_failed',
    resultPath,
    exitCode: error.code,
    signal: error.signal,
    message: error.message,
    stdout: error.stdout,
    stderr: error.stderr,
  }, null, 2));
  process.exit(1);
}
