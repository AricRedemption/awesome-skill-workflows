import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, '.env.local');
const SCRIPT_PATH = process.argv[2]
  ? path.resolve(ROOT, process.argv[2])
  : path.join(ROOT, 'video', 'script.md');
const OUTPUT_DIR = process.argv[3]
  ? path.resolve(ROOT, process.argv[3])
  : path.join(ROOT, 'video', 'tts');
const PROOF_PATH = path.join(OUTPUT_DIR, 'voiceover-proof.json');

function loadEnvFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const withoutExport = line.startsWith('export ') ? line.slice('export '.length).trim() : line;
    const equalsIndex = withoutExport.indexOf('=');
    if (equalsIndex <= 0) continue;
    env[withoutExport.slice(0, equalsIndex).trim()] = withoutExport.slice(equalsIndex + 1).trim();
  }
  return env;
}

function assertRequiredEnv(env, keys) {
  const missing = keys.filter((key) => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env keys: ${missing.join(', ')}`);
  }
}

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseScriptScenes(markdown) {
  const lines = markdown.split(/\r?\n/);
  const scenes = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const headingMatch = line.match(/^###\s+(\d+)\.\s+(.+)$/);
    if (headingMatch) {
      if (current) {
        current.text = current.textParts.join(' ').replace(/\s+/g, ' ').trim();
        delete current.textParts;
        scenes.push(current);
      }
      const number = headingMatch[1];
      const title = headingMatch[2].trim();
      current = {
        scene_number: Number(number),
        scene_id: `scene-${number.padStart(2, '0')}-${toSlug(title)}`,
        title,
        textParts: []
      };
      continue;
    }

    if (!current) continue;
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    current.textParts.push(trimmed.replace(/\s{2,}/g, ' '));
  }

  if (current) {
    current.text = current.textParts.join(' ').replace(/\s+/g, ' ').trim();
    delete current.textParts;
    scenes.push(current);
  }

  return scenes.filter((scene) => scene.text);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseWaveDurationSeconds(buffer) {
  if (buffer.length < 44) return null;
  const riff = buffer.toString('ascii', 0, 4);
  const wave = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || wave !== 'WAVE') return null;

  let offset = 12;
  let sampleRate = 0;
  let byteRate = 0;
  let dataBytes = 0;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;

    if (chunkId === 'fmt ') {
      sampleRate = buffer.readUInt32LE(chunkStart + 4);
      byteRate = buffer.readUInt32LE(chunkStart + 8);
    } else if (chunkId === 'data') {
      dataBytes = chunkSize;
      break;
    }

    offset = chunkStart + chunkSize + (chunkSize % 2);
  }

  if (!byteRate || !dataBytes || !sampleRate) return null;
  return dataBytes / byteRate;
}

async function synthesizeScene(env, scene) {
  const response = await fetch(`${env.MIMO_TTS_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'api-key': env.MIMO_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: env.MIMO_TTS_MODEL,
      messages: [
        {
          role: 'assistant',
          content: scene.text
        }
      ],
      audio: {
        voice: env.MIMO_TTS_VOICE,
        format: env.MIMO_TTS_FORMAT
      }
    })
  });

  const responseText = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`Scene ${scene.scene_id} returned non-JSON response with HTTP ${response.status}`);
  }

  if (!response.ok || parsed?.error) {
    throw new Error(
      `Scene ${scene.scene_id} failed: HTTP ${response.status} ${parsed?.error?.message ?? 'unknown error'}`
    );
  }

  const audioData = parsed?.choices?.[0]?.message?.audio?.data;
  if (!audioData) {
    throw new Error(`Scene ${scene.scene_id} returned no audio data`);
  }

  const transcript = parsed?.choices?.[0]?.message?.audio?.transcript ?? null;
  const audioBuffer = Buffer.from(audioData, 'base64');
  return {
    transcript,
    audioBuffer,
    raw: parsed
  };
}

async function main() {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(`Missing env file: ${ENV_PATH}`);
  }
  if (!fs.existsSync(SCRIPT_PATH)) {
    throw new Error(`Missing script file: ${SCRIPT_PATH}`);
  }

  const env = loadEnvFile(ENV_PATH);
  assertRequiredEnv(env, [
    'MIMO_API_KEY',
    'MIMO_TTS_BASE_URL',
    'MIMO_TTS_MODEL',
    'MIMO_TTS_VOICE',
    'MIMO_TTS_FORMAT'
  ]);

  const scriptText = fs.readFileSync(SCRIPT_PATH, 'utf8');
  const scenes = parseScriptScenes(scriptText);
  if (scenes.length === 0) {
    throw new Error(`No scenes found in script file: ${SCRIPT_PATH}`);
  }

  ensureDir(OUTPUT_DIR);

  const proof = {
    engine: 'xiaomi-mimo',
    model: env.MIMO_TTS_MODEL,
    voice: env.MIMO_TTS_VOICE,
    format: env.MIMO_TTS_FORMAT,
    generated_at: new Date().toISOString(),
    scenes: []
  };

  for (const scene of scenes) {
    const result = await synthesizeScene(env, scene);
    const fileName = `${scene.scene_id}.${env.MIMO_TTS_FORMAT}`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, result.audioBuffer);
    const durationSeconds =
      env.MIMO_TTS_FORMAT.toLowerCase() === 'wav'
        ? parseWaveDurationSeconds(result.audioBuffer)
        : null;

    proof.scenes.push({
      scene_number: scene.scene_number,
      scene_id: scene.scene_id,
      title: scene.title,
      transcript: result.transcript,
      text: scene.text,
      file_path: filePath,
      bytes: result.audioBuffer.length,
      duration_seconds: durationSeconds
    });
  }

  fs.writeFileSync(PROOF_PATH, JSON.stringify(proof, null, 2));
  console.log(
    JSON.stringify(
      {
        scenes_generated: proof.scenes.length,
        output_dir: OUTPUT_DIR,
        proof_path: PROOF_PATH,
        voice: proof.voice,
        model: proof.model
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
