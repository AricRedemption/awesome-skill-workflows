import { evaluateXhsPiPaasReadiness } from '../../../scripts/lib/xhs-pi-paas-readiness.mjs';
import { persistServiceRun } from './run-store.mjs';

export async function executeWorkflow({
  workflowId,
  rootDir,
  persist = false,
}) {
  switch (workflowId) {
    case 'xhs-pi-paas-readiness': {
      const result = await evaluateXhsPiPaasReadiness({ rootDir });

      if (!persist) {
        return {
          workflow_id: workflowId,
          persisted: false,
          result,
        };
      }

      const persistedRun = persistServiceRun({
        rootDir,
        workflowId,
        payload: {
          workflow_id: workflowId,
          persisted: true,
          result,
        },
      });

      return {
        workflow_id: workflowId,
        persisted: true,
        run_id: persistedRun.runId,
        run_dir: persistedRun.runDir,
        result,
      };
    }
    default:
      throw new Error(`unsupported workflow: ${workflowId}`);
  }
}
