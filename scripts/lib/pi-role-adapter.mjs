import {
  AuthStorage,
  createAgentSession,
  DefaultResourceLoader,
  getAgentDir,
  ModelRegistry,
  SessionManager,
} from '@earendil-works/pi-coding-agent';
import {
  fauxAssistantMessage,
  fauxText,
  registerFauxProvider,
  streamSimple,
} from '@earendil-works/pi-ai';

const DEFAULT_PROVIDER = 'faux';
const DEFAULT_API = 'faux-pi-workflow';
const DEFAULT_MODEL_ID = 'faux-pi-role-model';
const DEFAULT_BASE_URL = 'https://faux.local';

function createModelDefinition(modelId = DEFAULT_MODEL_ID) {
  return {
    id: modelId,
    name: 'Faux Pi Role Model',
    reasoning: false,
    input: ['text'],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 128000,
    maxTokens: 4096,
  };
}

function extractAssistantText(message) {
  if (!message?.content || !Array.isArray(message.content)) return '';
  return message.content
    .filter((item) => item?.type === 'text')
    .map((item) => item.text)
    .join('');
}

export function createPiFauxHarness(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const provider = options.provider ?? DEFAULT_PROVIDER;
  const api = options.api ?? DEFAULT_API;
  const modelId = options.modelId ?? DEFAULT_MODEL_ID;
  const modelDefinition = createModelDefinition(modelId);

  const faux = registerFauxProvider({
    api,
    provider,
    models: [modelDefinition],
  });

  const authStorage = AuthStorage.inMemory();
  authStorage.setRuntimeApiKey(provider, 'dummy');

  const modelRegistry = ModelRegistry.inMemory(authStorage);
  modelRegistry.registerProvider(provider, {
    api,
    apiKey: 'dummy',
    baseUrl: DEFAULT_BASE_URL,
    streamSimple,
    models: [modelDefinition],
  });

  function enqueueTextResponse(text) {
    faux.appendResponses([
      fauxAssistantMessage([fauxText(text)]),
    ]);
  }

  function enqueueJsonResponse(value) {
    enqueueTextResponse(JSON.stringify(value));
  }

  function getModel() {
    return modelRegistry.find(provider, modelId);
  }

  async function runRolePrompt({ systemPrompt, userPrompt, tools = [] }) {
    const loader = new DefaultResourceLoader({
      cwd,
      agentDir: getAgentDir(),
      systemPromptOverride: () => systemPrompt,
      appendSystemPromptOverride: () => [],
    });
    await loader.reload();

    const model = getModel();
    if (!model) {
      throw new Error(`Pi faux harness could not resolve model ${provider}/${modelId}`);
    }

    const { session } = await createAgentSession({
      cwd,
      model,
      authStorage,
      modelRegistry,
      resourceLoader: loader,
      tools,
      sessionManager: SessionManager.inMemory(cwd),
    });

    try {
      await session.prompt(userPrompt);
      const last = session.agent.state.messages.at(-1);
      return {
        message: last,
        text: extractAssistantText(last),
      };
    } finally {
      session.dispose();
    }
  }

  function dispose() {
    faux.unregister();
  }

  return {
    cwd,
    provider,
    api,
    modelId,
    authStorage,
    modelRegistry,
    enqueueTextResponse,
    enqueueJsonResponse,
    runRolePrompt,
    dispose,
  };
}

export function createPiRoleExecutor({ harness, roleId, systemPrompt, taskBuilder, tools = [] }) {
  if (!harness) {
    throw new Error('createPiRoleExecutor requires a harness');
  }

  return async (context) => {
    const userPrompt = typeof taskBuilder === 'function'
      ? taskBuilder(context)
      : String(taskBuilder ?? '');

    const { text } = await harness.runRolePrompt({
      systemPrompt,
      userPrompt,
      tools,
    });

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`Pi role ${roleId} returned non-JSON output: ${text}`);
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error(`Pi role ${roleId} returned invalid JSON payload`);
    }

    return parsed;
  };
}
