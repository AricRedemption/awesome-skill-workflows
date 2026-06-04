import test from 'node:test';
import assert from 'node:assert/strict';

import { dispatchWorkflowApiRequest } from '../services/workflow-api/src/create-server.mjs';

test('workflow api exposes health, catalog, and XHS readiness execution', async () => {
  const health = await dispatchWorkflowApiRequest({
    method: 'GET',
    url: '/health',
    rootDir: process.cwd(),
  });
  assert.equal(health.statusCode, 200);
  assert.equal(health.payload.status, 'ok');

  const workflows = await dispatchWorkflowApiRequest({
    method: 'GET',
    url: '/v1/workflows',
    rootDir: process.cwd(),
  });
  assert.equal(workflows.payload.workflows[0].id, 'xhs-pi-paas-readiness');

  const execution = await dispatchWorkflowApiRequest({
    method: 'POST',
    url: '/v1/workflows/xhs-pi-paas-readiness/execute',
    rootDir: process.cwd(),
    body: { persist: false },
  });

  assert.equal(execution.statusCode, 200);
  assert.equal(execution.payload.workflow_id, 'xhs-pi-paas-readiness');
  assert.equal(execution.payload.persisted, false);
  assert.equal(execution.payload.result.status, 'passed');
  assert.equal(
    execution.payload.result.readiness_level,
    'accepted_for_paas',
  );
  assert.equal(
    execution.payload.result.technical_validation.status,
    'partial',
  );
});
