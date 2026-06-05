#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const workDir = path.join(root, "video", "renders", "final-work");
const assetDir = path.join(workDir, "overlays");
const graphicDir = path.join(workDir, "graphics");
const outDir = path.join(root, "video", "renders");
const ttsDir = path.join(root, "video", "tts-final");
const proofPath = path.join(ttsDir, "voiceover-proof.json");

fs.mkdirSync(workDir, { recursive: true });
fs.mkdirSync(assetDir, { recursive: true });
fs.mkdirSync(graphicDir, { recursive: true });

const sourceA = "/Users/aricredemption/Desktop/录屏2026-06-05 20.44.51.mov";
const sourceB = "/Users/aricredemption/Desktop/录屏2026-06-05 20.55.04.mov";
const sourceWiki = "/Users/aricredemption/Desktop/录屏2026-06-05 21.41.11.mov";
const piFigureOne = path.join(graphicDir, "pi-agent-figure-1.png");
const architectureSlide = path.join(graphicDir, "architecture-slide.png");
const architectureLayers = path.join(graphicDir, "architecture-layers.png");
const repoProofSlide = path.join(graphicDir, "repo-proof-slide.png");

const voiceoverProof = JSON.parse(fs.readFileSync(proofPath, "utf8"));
const durationsBySceneId = new Map(
  voiceoverProof.scenes.map((scene) => [scene.scene_id, Number(scene.duration_seconds ?? 0)])
);

function durationFor(sceneId) {
  const duration = durationsBySceneId.get(sceneId);
  if (!duration) {
    throw new Error(`Missing duration for ${sceneId} in ${proofPath}`);
  }
  return duration;
}

function ensureRepoProofSlide() {
  const python = `
from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080
img = Image.new("RGB", (W, H), (9, 14, 12))
draw = ImageDraw.Draw(img)

gold = (233, 214, 168)
white = (244, 240, 231)
muted = (188, 192, 183)
panel_fill = (16, 26, 22)
panel_border = (87, 108, 95)

title_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Times New Roman.ttf", 60)
sub_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
label_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
body_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)

draw.text((90, 72), "Proof Lives In The Repo", font=title_font, fill=white)
draw.text((92, 152), "Different asset types live in different places for different jobs.", font=sub_font, fill=gold)

cards = [
  ("runs/", "Raw evidence", "Real run records, proofs, scores, gates, failures."),
  ("skills/ + workflows/", "Core contracts", "Reusable skills, orchestration patterns, schemas, scripts."),
  ("workflow-kb/", "Durable knowledge", "Promoted patterns, retrieval entries, reusable references."),
  ("scenarios/", "Local validation", "Scenario wrappers, risk boundaries, scenario-specific authority."),
  ("verified-recipes/", "Promotion only after proof", "Only assets with passed evidence gates move here."),
]

positions = [
  (90, 260, 820, 170),
  (1010, 260, 820, 170),
  (90, 470, 820, 170),
  (1010, 470, 820, 170),
  (300, 690, 1320, 190),
]

for (card, box) in zip(cards, positions):
  x, y, w, h = box
  draw.rounded_rectangle((x, y, x + w, y + h), radius=28, fill=panel_fill, outline=panel_border, width=2)
  draw.text((x + 34, y + 28), card[0], font=label_font, fill=gold)
  draw.text((x + 34, y + 72), card[1], font=label_font, fill=white)
  draw.text((x + 34, y + 118), card[2], font=body_font, fill=muted)

draw.rounded_rectangle((90, 940, 1830, 1026), radius=22, fill=(14, 20, 17), outline=panel_border, width=2)
draw.text((118, 966), "The structure makes evidence, reusable architecture, durable knowledge, and scenario validation visibly separate.", font=small_font, fill=muted)

img.save(${pyQuote(repoProofSlide)})
`;

  run("python3", ["-c", python]);
}

ensureRepoProofSlide();

const scenes = [
  {
    id: "scene-01-hook",
    title: "RUNWISER",
    kicker: "Proof-first workflow assets",
    source: sourceB,
    start: 0.0,
    motion: 5.0,
  },
  {
    id: "scene-02-proof-first",
    title: "PROOF FIRST",
    kicker: "Evidence before promotion",
    source: sourceA,
    start: 0.2,
    motion: 10.72,
  },
  {
    id: "scene-03-pi-agent-orchestration",
    title: "PI ORCHESTRATION",
    kicker: "Bounded multi-agent handoffs",
    sourceImage: piFigureOne,
  },
  {
    id: "scene-04-live-wiki-service",
    title: "LIVE WIKI",
    kicker: "Catalog to detail flow",
    source: sourceWiki,
    start: 0.2,
    motion: 11.04,
  },
  {
    id: "scene-05-architecture-overview",
    title: "ARCHITECTURE",
    kicker: "Five layers, one promotion loop",
    sourceImage: architectureSlide,
  },
  {
    id: "scene-06-architecture-boundary",
    title: "BOUNDARY",
    kicker: "Scenario validates, not defines",
    sourceImage: architectureLayers,
  },
  {
    id: "scene-07-proof-in-the-repo",
    title: "REPO PROOF",
    kicker: "Different assets, different jobs",
    sourceImage: repoProofSlide,
  },
  {
    id: "scene-08-close",
    title: "CLOSE",
    kicker: "Reusable, measurable, improvable",
    source: sourceB,
    start: 0.0,
    motion: 5.0,
  },
].map((scene) => ({
  ...scene,
  duration: durationFor(scene.id),
}));

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function pyQuote(value) {
  return JSON.stringify(value);
}

function makeOverlay(scene) {
  const out = path.join(assetDir, `${scene.id}.png`);
  const python = `
from PIL import Image, ImageDraw, ImageFont

W, H = 1920, 1080
img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
gold = (230, 214, 168, 255)
white = (255, 255, 255, 255)
chip = (8, 17, 15, 165)
line = (230, 214, 168, 255)

font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
font_kicker = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 36)

draw.rounded_rectangle((58, 54, 426, 118), radius=12, fill=chip)
draw.text((82, 72), ${pyQuote(scene.title)}, font=font_title, fill=gold)
draw.rectangle((82, 136, 274, 140), fill=line)
draw.text((82, 152), ${pyQuote(scene.kicker)}, font=font_kicker, fill=white)

img.save(${pyQuote(out)})
`;

  run("python3", ["-c", python]);
  return out;
}

function makeSceneClip(scene, overlayPath) {
  const out = path.join(workDir, `${scene.id}.mp4`);
  const stopDuration = Math.max(0, scene.duration - scene.motion).toFixed(3);
  const filter = [
    "[0:v]scale=1920:1080:force_original_aspect_ratio=cover,crop=1920:1080,fps=30,tpad=stop_mode=clone:stop_duration=" + stopDuration + "[base]",
    "[1:v]format=rgba,fade=t=in:st=0:d=0.18:alpha=1,fade=t=out:st=2.0:d=0.25:alpha=1[overlay]",
    "[base][overlay]overlay=0:0",
  ].join(";");

  run("ffmpeg", [
    "-y",
    "-ss",
    String(scene.start),
    "-t",
    String(scene.motion),
    "-i",
    scene.source,
    "-loop",
    "1",
    "-t",
    String(scene.duration),
    "-i",
    overlayPath,
    "-an",
    "-filter_complex",
    filter,
    "-map",
    "[v]",
  ]);

  return out;
}

function buildSceneClip(scene, overlayPath) {
  const out = path.join(workDir, `${scene.id}.mp4`);

  if (scene.sourceImages) {
    const perImage = scene.duration / scene.sourceImages.length;
    const clipFiles = scene.sourceImages.map((imagePath, index) => {
      const clipPath = path.join(workDir, `${scene.id}-image-${index + 1}.mp4`);
      run("ffmpeg", [
        "-y",
        "-loop",
        "1",
        "-t",
        String(perImage),
        "-i",
        imagePath,
        "-an",
        "-vf",
        "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,format=yuv420p",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        clipPath,
      ]);
      return clipPath;
    });
    const listPath = path.join(workDir, `${scene.id}-images.txt`);
    fs.writeFileSync(listPath, `${clipFiles.map((file) => `file '${file.replace(/'/g, "'\\''")}'`).join("\n")}\n`, "utf8");
    run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", out]);
    return out;
  }

  if (scene.sourceImage) {
    run("ffmpeg", [
      "-y",
      "-loop",
      "1",
      "-t",
      String(scene.duration),
      "-i",
      scene.sourceImage,
      "-an",
      "-vf",
      "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,format=yuv420p",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      out,
    ]);
    return out;
  }

  const stopDuration = Math.max(0, scene.duration - scene.motion).toFixed(3);
  const filter = [
    `[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,tpad=stop_mode=clone:stop_duration=${stopDuration}[base]`,
    "[1:v]format=rgba,fade=t=in:st=0:d=0.18:alpha=1,fade=t=out:st=2.0:d=0.25:alpha=1[card]",
    "[base][card]overlay=0:0[v]",
  ].join(";");

  run("ffmpeg", [
    "-y",
    "-ss",
    String(scene.start),
    "-t",
    String(scene.motion),
    "-i",
    scene.source,
    "-loop",
    "1",
    "-t",
    String(scene.duration),
    "-i",
    overlayPath,
    "-an",
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    out,
  ]);

  return out;
}

function concatScenes(sceneFiles) {
  const list = path.join(workDir, "video-scenes.txt");
  fs.writeFileSync(list, `${sceneFiles.map((file) => `file '${file.replace(/'/g, "'\\''")}'`).join("\n")}\n`, "utf8");
  const out = path.join(workDir, "video-silent.mp4");
  run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", out]);
  return out;
}

function concatAudio() {
  const list = path.join(workDir, "audio-scenes.txt");
  fs.writeFileSync(
    list,
    `${scenes.map((scene) => `file '${path.join(ttsDir, `${scene.id}.wav`).replace(/'/g, "'\\''")}'`).join("\n")}\n`,
    "utf8",
  );
  const out = path.join(workDir, "voiceover.wav");
  run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c:a", "pcm_s16le", out]);
  return out;
}

function mux(videoPath, audioPath) {
  const out = path.join(outDir, "runwiser-intro-final.mp4");
  run("ffmpeg", [
    "-y",
    "-i",
    videoPath,
    "-i",
    audioPath,
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-shortest",
    out,
  ]);
  return out;
}

const sceneFiles = scenes.map((scene) => {
  const overlay = makeOverlay(scene);
  return buildSceneClip(scene, overlay);
});

const silentVideo = concatScenes(sceneFiles);
const audio = concatAudio();
const finalVideo = mux(silentVideo, audio);

console.log(`Rendered ${finalVideo}`);
