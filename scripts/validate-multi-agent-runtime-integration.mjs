import fs from 'node:fs';
import path from 'node:path';

import { runMultiAgentWorkflow } from './lib/multi-agent-workflow-runtime.mjs';

const root = process.cwd();
const workflowPath = path.join(
  root,
  'workflows',
  'multi-agent',
  'pi-single-problem-review-gated.workflow.json',
);

const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

let reviewCalls = 0;

const executors = {
  planner: async () => ({
    role_id: 'planner',
    decision: 'planned',
    handoff: { plan: 'bounded plan' },
    evidence: ['plan summary', 'selected skills', 'handoff package'],
  }),
  worker: async ({ state }) => ({
    role_id: 'worker',
    decision: 'implemented',
    handoff: { artifact_version: state.worker_runs + 1 },
    evidence: state.review_requested
      ? ['revised artifacts', 'revision notes']
      : ['primary artifacts', 'execution notes', 'worker handoff'],
  }),
  reviewer: async () => {
    reviewCalls += 1;
    return reviewCalls === 1
      ? {
          role_id: 'reviewer',
          decision: 'revision_required',
          handoff: { findings: ['tighten evidence package'] },
          evidence: ['review report', 'revision decision'],
        }
      : {
          role_id: 'reviewer',
          decision: 'approved',
          handoff: { findings: [] },
          evidence: ['review report', 'revision decision'],
        };
  },
  verifier: async () => ({
    role_id: 'verifier',
    decision: 'passed',
    terminal_state: 'passed',
    handoff: { summary: 'all gates passed' },
    evidence: ['verification report', 'terminal state', 'gate ledger'],
  }),
};

const result = await runMultiAgentWorkflow(workflow, executors);

console.log(JSON.stringify({
  status: result.terminal_state === 'passed' && result.writeback_allowed
    ? 'passed'
    : 'failed',
  workflow_id: result.workflow_id,
  backend_hint: result.backend_hint,
  integration_level: 'contract_runtime_simulation',
  terminal_state: result.terminal_state,
  writeback_allowed: result.writeback_allowed,
  worker_runs: result.state.worker_runs,
  reviewer_passes: result.events.filter((event) => event.role_id === 'reviewer').length,
}, null, 2));

if (result.terminal_state !== 'passed' || !result.writeback_allowed) {
  process.exit(1);
}
