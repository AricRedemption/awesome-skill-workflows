import fs from 'node:fs';
import path from 'node:path';

export const credentialKeys = [
  'AZURE_OPENAI_ENDPOINT',
  'AZURE_OPENAI_API_KEY',
  'AZURE_OPENAI_AUTH_MODE',
  'OPENAI_BASE_URL',
  'OPENAI_API_KEY',
  'ANTHROPIC_BASE_URL',
  'ANTHROPIC_API_KEY',
  'QWEN_CHAT_BASE_URL',
  'QWEN_CHAT_MODEL'
];

export function credentialStatus(env = process.env) {
  const vars = Object.fromEntries(credentialKeys.map((key) => [key, Boolean(env[key])]));
  const availableBackends = [];
  if (vars.AZURE_OPENAI_ENDPOINT && (vars.AZURE_OPENAI_API_KEY || vars.AZURE_OPENAI_AUTH_MODE)) {
    availableBackends.push('azure_openai');
  }
  if (vars.OPENAI_API_KEY) {
    availableBackends.push('openai_chat');
  }
  if (vars.ANTHROPIC_API_KEY) {
    availableBackends.push('claude_chat');
  }
  if (vars.QWEN_CHAT_BASE_URL && vars.QWEN_CHAT_MODEL) {
    availableBackends.push('qwen_chat');
  }
  return {
    safe_env_presence: vars,
    available_backends: availableBackends,
    ready_for_training: availableBackends.length > 0
  };
}

export function getArgValue(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return '';
  return argv[index + 1] ?? '';
}

export function loadEnvFile(envFilePath, baseEnv = process.env) {
  if (!envFilePath) {
    return {
      env: { ...baseEnv },
      loaded_env_file: '',
      loaded_keys: []
    };
  }

  const absolutePath = path.resolve(envFilePath);
  const text = fs.readFileSync(absolutePath, 'utf8');
  const nextEnv = { ...baseEnv };
  const loadedKeys = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const withoutExport = line.startsWith('export ') ? line.slice('export '.length).trim() : line;
    const equalsIndex = withoutExport.indexOf('=');
    if (equalsIndex <= 0) continue;

    const key = withoutExport.slice(0, equalsIndex).trim();
    let value = withoutExport.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    nextEnv[key] = value;
    loadedKeys.push(key);
  }

  return {
    env: nextEnv,
    loaded_env_file: absolutePath,
    loaded_keys: loadedKeys
  };
}
