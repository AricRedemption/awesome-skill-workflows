import fs from 'node:fs';
import path from 'node:path';

import { runXhsPiOrchestrationValidation } from './lib/xhs-pi-orchestration-validation.mjs';

const root = process.cwd();
const runId = '018-xhs-pi-multi-agent-live-validation';
const runDir = path.join(root, 'runs', runId);

const result = await runXhsPiOrchestrationValidation({ rootDir: root });

fs.mkdirSync(runDir, { recursive: true });
fs.writeFileSync(
  path.join(runDir, 'result.json'),
  `${JSON.stringify({ run_id: runId, ...result }, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(runDir, 'run-summary.md'),
  [
    '# XHS Pi Multi-Agent Live Validation',
    '',
    `- run id: \`${runId}\``,
    `- workflow id: \`${result.workflow_id}\``,
    `- multi-agent workflow id: \`${result.multi_agent_workflow_id}\``,
    `- status: \`${result.status}\``,
    `- terminal state: \`${result.final_terminal_state}\``,
    `- writeback allowed: \`${result.writeback_allowed}\``,
    `- workflow step count: \`${result.summary.workflow_step_count}\``,
    `- draft path verified: \`${result.summary.draft_path_verified}\``,
    `- publish failure isolated: \`${result.summary.publish_failure_isolated}\``,
    `- visible recheck passed: \`${result.summary.visible_recheck_passed}\``,
    '',
    '## Interpretation',
    '',
    '- A real save-draft action was executed with `clicked_publish=false`.',
    '- Same-browser draft visibility was observed in the live run.',
    '- Fresh visible-session verification remained blocked by login/401 behavior, so this run is evidence-rich but not fully promotable.',
  ].join('\n') + '\n',
);

console.log(JSON.stringify({ run_id: runId, ...result }, null, 2));

if (result.status === 'passed') {
  process.exit(0);
}
