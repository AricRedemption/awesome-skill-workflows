import fs from 'node:fs';
import path from 'node:path';

import { evaluateXhsPiPaasReadiness } from './lib/xhs-pi-paas-readiness.mjs';

const root = process.cwd();
const runId = '022-xhs-pi-paas-readiness-acceptance';
const runDir = path.join(root, 'runs', runId);

const result = await evaluateXhsPiPaasReadiness({ rootDir: root });

fs.mkdirSync(runDir, { recursive: true });
fs.writeFileSync(
  path.join(runDir, 'result.json'),
  `${JSON.stringify({ run_id: runId, ...result }, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(runDir, 'run-summary.md'),
  [
    '# XHS Pi PaaS Readiness Acceptance',
    '',
    `- run id: \`${runId}\``,
    `- workflow id: \`${result.workflow_id}\``,
    `- multi-agent workflow id: \`${result.multi_agent_workflow_id}\``,
    `- status: \`${result.status}\``,
    `- readiness level: \`${result.readiness_level}\``,
    `- human review verdict: \`${result.human_review_acceptance.verdict}\``,
    `- technical validation status: \`${result.technical_validation.status}\``,
    `- technical terminal state: \`${result.technical_validation.final_terminal_state}\``,
    '',
    '## Acceptance boundary',
    '',
    '- This run does not relabel the technical orchestration verdict as `passed`.',
    '- It accepts the workflow for PaaS progression because the real save-draft proof is positive, `clicked_publish=false`, and the remaining failure is isolated to a fresh visible-session login reset.',
    '',
    '## Checks',
    '',
    ...Object.entries(result.checks).map(
      ([checkName, passed]) => `- ${checkName}: \`${passed}\``,
    ),
  ].join('\n') + '\n',
);

console.log(JSON.stringify({ run_id: runId, ...result }, null, 2));

if (result.status !== 'passed') {
  process.exit(1);
}
