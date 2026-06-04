import fs from 'node:fs';
import path from 'node:path';

function createRunId(prefix) {
  const now = new Date().toISOString().replaceAll(':', '-');
  return `${prefix}-${now}`;
}

export function persistServiceRun({
  rootDir,
  workflowId,
  payload,
}) {
  const runId = createRunId(`service-${workflowId}`);
  const runDir = path.join(rootDir, 'runs', runId);

  fs.mkdirSync(runDir, { recursive: true });
  fs.writeFileSync(
    path.join(runDir, 'result.json'),
    `${JSON.stringify({ run_id: runId, ...payload }, null, 2)}\n`,
  );

  return {
    runId,
    runDir,
  };
}
