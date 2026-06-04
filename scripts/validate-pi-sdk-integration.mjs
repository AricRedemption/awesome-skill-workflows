import fs from 'node:fs';
import path from 'node:path';

import { runMultiAgentWorkflow } from './lib/multi-agent-workflow-runtime.mjs';
import { createPiFauxHarness, createPiRoleExecutor } from './lib/pi-role-adapter.mjs';

const root = process.cwd();
const workflowPath = path.join(
  root,
  'workflows',
  'multi-agent',
  'pi-single-problem-review-gated.workflow.json',
);
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

const harness = createPiFauxHarness({ cwd: root });

try {
  harness.enqueueJsonResponse({
    role_id: 'planner',
    decision: 'planned',
    handoff: { plan: 'bounded plan' },
    evidence: ['plan summary', 'selected skills', 'handoff package'],
  });
  harness.enqueueJsonResponse({
    role_id: 'worker',
    decision: 'implemented',
    handoff: { artifact_version: 1 },
    evidence: ['primary artifacts', 'execution notes', 'worker handoff'],
  });
  harness.enqueueJsonResponse({
    role_id: 'reviewer',
    decision: 'revision_required',
    handoff: { findings: ['tighten evidence package'] },
    evidence: ['review report', 'revision decision'],
  });
  harness.enqueueJsonResponse({
    role_id: 'worker',
    decision: 'implemented',
    handoff: { artifact_version: 2 },
    evidence: ['revised artifacts', 'revision notes'],
  });
  harness.enqueueJsonResponse({
    role_id: 'reviewer',
    decision: 'approved',
    handoff: { findings: [] },
    evidence: ['review report', 'revision decision'],
  });
  harness.enqueueJsonResponse({
    role_id: 'verifier',
    decision: 'passed',
    terminal_state: 'passed',
    handoff: { summary: 'gates passed' },
    evidence: ['verification report', 'terminal state', 'gate ledger'],
  });

  const executors = {
    planner: createPiRoleExecutor({
      harness,
      roleId: 'planner',
      systemPrompt: 'You are the planner role for a bounded skill workflow.',
      taskBuilder: () => 'Produce the planning handoff package as JSON.',
    }),
    worker: createPiRoleExecutor({
      harness,
      roleId: 'worker',
      systemPrompt: 'You are the worker role for a bounded skill workflow.',
      taskBuilder: ({ state }) => `Execute the worker step. worker_runs=${state.worker_runs}. Return JSON only.`,
    }),
    reviewer: createPiRoleExecutor({
      harness,
      roleId: 'reviewer',
      systemPrompt: 'You are the reviewer role. Decide if revision is required.',
      taskBuilder: ({ state }) => `Review the latest artifact. review_requested=${state.review_requested}. Return JSON only.`,
    }),
    verifier: createPiRoleExecutor({
      harness,
      roleId: 'verifier',
      systemPrompt: 'You are the verifier role. Decide the terminal state.',
      taskBuilder: () => 'Verify the run and return terminal_state JSON only.',
    }),
  };

  const result = await runMultiAgentWorkflow(workflow, executors);

  console.log(JSON.stringify({
    status: result.terminal_state === 'passed' && result.writeback_allowed
      ? 'passed'
      : 'failed',
    integration_level: 'pi_sdk_faux_provider',
    workflow_id: result.workflow_id,
    backend_hint: result.backend_hint,
    terminal_state: result.terminal_state,
    writeback_allowed: result.writeback_allowed,
    worker_runs: result.state.worker_runs,
    reviewer_passes: result.events.filter((event) => event.role_id === 'reviewer').length,
  }, null, 2));

  if (result.terminal_state !== 'passed' || !result.writeback_allowed) {
    process.exit(1);
  }
} finally {
  harness.dispose();
}
