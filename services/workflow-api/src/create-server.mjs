import http from 'node:http';

import { getWorkflowCatalog } from './catalog.mjs';
import { executeWorkflow } from './workflows.mjs';

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
  });
  response.end(`${JSON.stringify(payload, null, 2)}\n`);
}

export async function dispatchWorkflowApiRequest({
  method,
  url,
  rootDir = process.cwd(),
  body = {},
}) {
  try {
    const parsedUrl = new URL(url, 'http://127.0.0.1');

    if (method === 'GET' && parsedUrl.pathname === '/health') {
      return {
        statusCode: 200,
        payload: {
          status: 'ok',
          service: 'workflow-api',
        },
      };
    }

    if (method === 'GET' && parsedUrl.pathname === '/v1/workflows') {
      return {
        statusCode: 200,
        payload: {
          workflows: getWorkflowCatalog(),
        },
      };
    }

    const executeMatch = parsedUrl.pathname.match(
      /^\/v1\/workflows\/([^/]+)\/execute$/,
    );
    if (method === 'POST' && executeMatch) {
      const workflowId = decodeURIComponent(executeMatch[1]);
      const execution = await executeWorkflow({
        workflowId,
        rootDir,
        persist: body.persist === true,
      });

      return {
        statusCode: 200,
        payload: execution,
      };
    }

    return {
      statusCode: 404,
      payload: {
        error: 'not_found',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      payload: {
        error: 'workflow_api_error',
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createWorkflowApiServer({
  rootDir = process.cwd(),
} = {}) {
  return http.createServer(async (request, response) => {
    const result = await dispatchWorkflowApiRequest({
      method: request.method,
      url: request.url,
      rootDir,
      body: await readJsonBody(request),
    });

    return sendJson(response, result.statusCode, result.payload);
  });
}
