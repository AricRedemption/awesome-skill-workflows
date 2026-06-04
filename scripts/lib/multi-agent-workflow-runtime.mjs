import { validateMultiAgentWorkflow } from './multi-agent-workflow-validation.mjs';

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function createInitialState() {
  return {
    review_requested: false,
    worker_runs: 0,
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createContext(node, state, events) {
  return {
    node,
    state,
    events,
  };
}

function normalizeResult(result, node, roleId) {
  if (!result || typeof result !== 'object' || Array.isArray(result)) {
    throw new Error(`executor for ${roleId} must return an object`);
  }

  if (!Array.isArray(result.evidence) || result.evidence.length === 0) {
    throw new Error(`executor for ${roleId} must return non-empty evidence`);
  }

  return {
    node_id: node.node_id,
    role_id: roleId,
    decision: result.decision ?? 'completed',
    terminal_state: result.terminal_state ?? null,
    handoff: result.handoff ?? {},
    evidence: result.evidence,
  };
}

async function runSpawnNode(node, executors, state, events) {
  if (node.gate_effect === 'rework_only' && !state.review_requested) {
    events.push({
      node_id: node.node_id,
      role_id: node.role_id,
      decision: 'skipped',
      terminal_state: null,
      handoff: {},
      evidence: [],
    });
    return {
      node_id: node.node_id,
      role_id: node.role_id,
      decision: 'skipped',
      terminal_state: null,
      handoff: {},
      evidence: [],
    };
  }

  const executor = executors[node.role_id];
  if (typeof executor !== 'function') {
    throw new Error(`missing executor for role ${node.role_id}`);
  }

  const result = normalizeResult(
    await executor(createContext(node, state, events)),
    node,
    node.role_id,
  );

  if (node.role_id === 'worker') {
    state.worker_runs += 1;
  }

  if (node.role_id === 'reviewer') {
    state.review_requested = result.decision === 'revision_required';
  }

  if (node.role_id === 'verifier' && !isNonEmptyString(result.terminal_state)) {
    throw new Error('verifier executor must return terminal_state');
  }

  events.push(result);
  return result;
}

async function runNode(node, executors, state, events) {
  switch (node.node_type) {
    case 'spawn':
      return runSpawnNode(node, executors, state, events);
    case 'sequence': {
      let lastResult = null;
      for (const step of node.steps) {
        lastResult = await runNode(step, executors, state, events);
      }
      return lastResult;
    }
    case 'loop': {
      for (let iteration = 0; iteration < node.loop_cap; iteration += 1) {
        await runNode(node.body, executors, state, events);
        if (!state.review_requested) {
          return {
            node_id: node.node_id,
            decision: 'loop_completed',
          };
        }
      }
      throw new Error(`loop cap reached for ${node.node_id}`);
    }
    case 'fork':
      return Promise.all(
        node.branches.map((branch) => runNode(branch, executors, state, events)),
      );
    case 'join':
      return {
        node_id: node.node_id,
        decision: 'joined',
        evidence: node.evidence_required,
      };
    default:
      throw new Error(`unsupported node type ${node.node_type}`);
  }
}

export async function runMultiAgentWorkflow(workflow, executors) {
  const validation = validateMultiAgentWorkflow(workflow, '(runtime)');
  if (!validation.ok) {
    throw new Error(validation.errors.join('\n'));
  }

  const state = createInitialState();
  const events = [];

  for (const node of workflow.nodes) {
    await runNode(node, executors, state, events);
  }

  const verifierEvent = events.findLast((event) => event.role_id === 'verifier');
  if (!verifierEvent) {
    throw new Error('workflow did not produce a verifier event');
  }

  const writebackAllowed = workflow.writeback.allowed_terminal_states.includes(
    verifierEvent.terminal_state,
  );

  return {
    workflow_id: workflow.id,
    backend_hint: workflow.backend_hint ?? null,
    terminal_state: verifierEvent.terminal_state,
    writeback_allowed: writebackAllowed,
    events: clone(events),
    state: clone(state),
  };
}
