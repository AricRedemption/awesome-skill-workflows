import { createWorkflowApiServer } from './src/create-server.mjs';

const port = Number(process.env.PORT ?? '4217');
const rootDir = process.env.WORKFLOW_API_ROOT_DIR ?? process.cwd();

const server = createWorkflowApiServer({ rootDir });

server.listen(port, '127.0.0.1', () => {
  console.log(
    JSON.stringify(
      {
        status: 'listening',
        service: 'workflow-api',
        port,
        root_dir: rootDir,
      },
      null,
      2,
    ),
  );
});
