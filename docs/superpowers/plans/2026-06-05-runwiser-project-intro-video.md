# Runwiser Project Intro Video Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a polished English `16:9` introduction video for Runwiser in under two minutes, combining landing page, skill wiki, repo/docs proof, lightweight motion inserts, Xiaomi MiMo `Mia` voiceover, and English captions.

**Architecture:** The production flow is chapter-first and narration-driven. We will treat `video/script.md` as the timing source, `video/storyboard.md` as the shot contract, raw screen recordings as source evidence, Xiaomi MiMo segmented TTS as the audio layer, and a small set of motion overlays as the explanatory layer that clarifies proof-first execution and PI-agent orchestration.

**Tech Stack:** Local screen recording, Xiaomi MiMo TTS, markdown production assets under `video/`, shell/Node scripts under `scripts/`, and final stitching through a simple editing/render pipeline.

---

## File Map

### Existing files used by this plan

- `video/script.md`
  Purpose: final English narration source
- `video/storyboard.md`
  Purpose: shot order, scene timing, visual direction, animation placement
- `docs/superpowers/specs/2026-06-05-runwiser-project-intro-video-design.md`
  Purpose: approved creative direction and constraints
- `README.md`
  Purpose: proof-first positioning and repo overview visuals
- `docs/architecture.md`
  Purpose: five-layer architecture visuals and narration support

### Files to create during execution

- `video/recording-checklist.md`
  Purpose: exact capture order, page targets, and recording instructions
- `video/tts/`
  Purpose: segmented MiMo output audio files
- `video/captions/intro.en.srt`
  Purpose: English captions aligned to final timing
- `video/edl.md`
  Purpose: edit decision list with per-scene in/out timing
- `scripts/mimo-tts.mjs`
  Purpose: generate segmented TTS audio from the approved script
- `video/renders/`
  Purpose: review exports and final MP4

### Optional files if motion overlays are built as standalone assets

- `video/overlays/pi-agent-flow.md`
  Purpose: content contract for the orchestration animation
- `video/overlays/proof-promotion-flow.md`
  Purpose: content contract for run -> review -> verification -> promotion animation

## Chunk 1: Lock Production Assets

### Task 1: Create a concrete recording checklist

**Files:**
- Create: `video/recording-checklist.md`
- Reference: `video/storyboard.md`

- [ ] **Step 1: List exact surfaces to capture**

Include:
- landing page hero
- landing page positioning section
- README top positioning blocks
- wiki home or skill-list surface
- one strong wiki page or category page
- `docs/architecture.md`
- repo tree showing `runs/`, `workflows/`, `workflow-kb/`, `scenarios/`

- [ ] **Step 2: Turn scenes into recording tasks**

For each scene, document:
- source page
- capture duration target
- whether to scroll
- whether to zoom/crop in post
- whether overlay text is needed

- [ ] **Step 3: Add recording rules**

Add rules such as:
- record in short segments, not one continuous take
- stop after clean cursor motion
- avoid long reading scrolls
- leave `0.5-1.0s` lead-in and tail room for each clip

- [ ] **Step 4: Save the checklist**

Expected artifact:
- `video/recording-checklist.md`

### Task 2: Confirm final chapter timing envelope

**Files:**
- Modify: `video/storyboard.md`
- Reference: `video/script.md`

- [ ] **Step 1: Read the full script aloud once**

Expected result:
- rough runtime estimate confirms the script fits within `95-105s`

- [ ] **Step 2: Adjust scene durations if needed**

Keep the total under `120s`.

- [ ] **Step 3: Preserve emphasis on PI Agent Orchestration**

Ensure Scene 4 stays one of the longest and clearest scenes.

## Chunk 2: Record Visual Source Material

### Task 3: Capture landing page clips

**Files:**
- Input: `video/recording-checklist.md`
- Output: `video/assets/raw/landing/`

- [ ] **Step 1: Start the landing page locally**

Run:
```bash
npm --prefix landing-page run dev
```

Expected:
- landing page available on local Vite dev URL

- [ ] **Step 2: Record hero segment**

Capture:
- title
- tagline
- gentle pointer movement only

- [ ] **Step 3: Record positioning segment**

Capture:
- one short scroll to the section that best explains what Runwiser is

- [ ] **Step 4: Save clean clip names**

Example filenames:
- `video/assets/raw/landing/scene-01-hero.mov`
- `video/assets/raw/landing/scene-02-positioning.mov`

### Task 4: Capture skill wiki clips

**Files:**
- Input: `video/recording-checklist.md`
- Output: `video/assets/raw/wiki/`

- [ ] **Step 1: Start the wiki locally**

Run:
```bash
PORT=4179 node skill-wiki-web/dev-server.mjs
```

Expected:
- wiki available at `http://127.0.0.1:4179`

- [ ] **Step 2: Record wiki browseability**

Capture:
- homepage or listing page
- one strong skill or category page

- [ ] **Step 3: Keep motion purposeful**

Avoid:
- long scrolls
- clicking many pages

Prefer:
- one page reveal
- one scroll
- one focus pause

### Task 5: Capture repo and docs proof clips

**Files:**
- Input: `video/recording-checklist.md`
- Output: `video/assets/raw/repo/`

- [ ] **Step 1: Record README proof-first section**

Capture:
- top positioning
- proof-related lines

- [ ] **Step 2: Record architecture doc**

Capture:
- five-layer diagram
- surrounding explanatory text only if readable

- [ ] **Step 3: Record repo tree proof**

Capture:
- `runs/`
- `workflows/`
- `workflow-kb/`
- `scenarios/`

- [ ] **Step 4: Record one representative proof path**

Capture one example each from:
- run evidence
- workflow asset
- KB asset

## Chunk 3: Generate Audio

### Task 6: Build the MiMo TTS script

**Files:**
- Create: `scripts/mimo-tts.mjs`
- Input: `.env.local`
- Input: `video/script.md`
- Output: `video/tts/`

- [ ] **Step 1: Parse `.env.local` for MiMo values**

Required keys:
- `MIMO_API_KEY`
- `MIMO_TTS_BASE_URL`
- `MIMO_TTS_MODEL`
- `MIMO_TTS_VOICE`
- `MIMO_TTS_FORMAT`

- [ ] **Step 2: Split the narration into chapter segments**

Expected segments:
- `scene-01-hook`
- `scene-02-what-runwiser-is`
- `scene-03-why-proof-comes-first`
- `scene-04-pi-agent-orchestration`
- `scene-05-skill-wiki-surface`
- `scene-06-repo-architecture`
- `scene-07-proof-in-practice`
- `scene-08-close`

- [ ] **Step 3: Call MiMo TTS using the validated pattern**

Use:
- `POST ${MIMO_TTS_BASE_URL}/chat/completions`
- header `api-key`
- `assistant` role message
- `audio.voice = Mia`

- [ ] **Step 4: Save one audio file per scene**

Example output:
- `video/tts/scene-01-hook.wav`
- `video/tts/scene-02-what-runwiser-is.wav`

- [ ] **Step 5: Save a generation summary**

Create:
- `video/tts/voiceover-proof.json`

Contents:
- model
- voice
- per-scene file path
- transcript
- byte size

### Task 7: Review and tighten narration performance

**Files:**
- Modify: `video/script.md`
- Re-run: `scripts/mimo-tts.mjs`

- [ ] **Step 1: Listen to all eight scene files**

Check:
- warmth
- clarity
- pacing
- whether wording sounds too written

- [ ] **Step 2: Revise lines that sound stiff**

Guideline:
- shorten clauses
- reduce stacked abstractions
- keep PI-agent section especially clear

- [ ] **Step 3: Re-generate changed scenes only**

Expected:
- voice remains consistent
- total runtime still stays below `120s`

## Chunk 4: Add Captions And Motion Notes

### Task 8: Build the caption file

**Files:**
- Create: `video/captions/intro.en.srt`
- Input: `video/script.md`
- Input: `video/tts/`

- [ ] **Step 1: Measure final per-scene audio durations**

Use any local duration measurement available in the editing toolchain.

- [ ] **Step 2: Create one to three caption blocks per scene**

Rules:
- keep lines short
- do not mirror long narration verbatim if readability suffers

- [ ] **Step 3: Save as SRT**

Expected artifact:
- `video/captions/intro.en.srt`

### Task 9: Specify animation inserts precisely

**Files:**
- Create: `video/edl.md`
- Optional create: `video/overlays/pi-agent-flow.md`
- Optional create: `video/overlays/proof-promotion-flow.md`

- [ ] **Step 1: Mark where animation replaces raw screen capture**

Required animation beats:
- run -> review -> verification -> promotion
- PI agent gated handoff
- repo directory path emphasis

- [ ] **Step 2: Describe each motion insert in editor-friendly language**

Include:
- in point
- out point
- on-screen labels
- transition in/out style

## Chunk 5: Edit The First Cut

### Task 10: Assemble the rough cut

**Files:**
- Input: `video/assets/raw/`
- Input: `video/tts/`
- Input: `video/captions/intro.en.srt`
- Create: `video/renders/runwiser-intro-roughcut.mp4`

- [ ] **Step 1: Place scene clips in storyboard order**

Order:
1. hook
2. what Runwiser is
3. why proof comes first
4. PI agent orchestration
5. skill wiki surface
6. repo architecture
7. proof in practice
8. close

- [ ] **Step 2: Use voiceover as the master timeline**

Trim visuals to narration, not the reverse.

- [ ] **Step 3: Add overlays and motion inserts**

Keep the density moderate.

- [ ] **Step 4: Add captions**

Ensure captions do not cover the most important UI regions.

### Task 11: Tighten to final runtime

**Files:**
- Modify: `video/renders/runwiser-intro-roughcut.mp4`
- Output: `video/renders/runwiser-intro-v1.mp4`

- [ ] **Step 1: Cut dead space aggressively**

Remove:
- idle cursor time
- slow scroll recovery
- repeated proof surfaces

- [ ] **Step 2: Protect the key ideas**

Do not cut away:
- proof-first distinction
- PI agent orchestration explanation
- repo evidence layer proof

- [ ] **Step 3: Export first complete review build**

Expected artifact:
- `video/renders/runwiser-intro-v1.mp4`

## Chunk 6: Review And Finalize

### Task 12: Run a final content review pass

**Files:**
- Input: `video/renders/runwiser-intro-v1.mp4`
- Reference: `video/script.md`
- Reference: `video/storyboard.md`

- [ ] **Step 1: Watch without pausing**

Check:
- story clarity
- whether PI-agent architecture lands clearly
- whether wiki feels connected instead of random

- [ ] **Step 2: Watch once more for technical quality**

Check:
- audio loudness consistency
- caption readability
- no scene overstays
- no animation that feels decorative instead of explanatory

- [ ] **Step 3: Log fixes**

Save notes in:
- `video/edl.md`

### Task 13: Export final delivery

**Files:**
- Output: `video/renders/runwiser-intro-final.mp4`

- [ ] **Step 1: Apply final trim fixes**

- [ ] **Step 2: Export final `16:9` MP4**

- [ ] **Step 3: Confirm final acceptance criteria**

Acceptance criteria:
- English only
- under two minutes
- `landing page`, `wiki`, and `repo/docs` all appear
- PI-agent orchestration is clearly explained
- voice feels natural and technical
- visuals feel clean and intentional

## Recommended Execution Order

1. create `video/recording-checklist.md`
2. record all raw clips
3. build `scripts/mimo-tts.mjs`
4. generate segmented `Mia` narration
5. create captions
6. assemble rough cut
7. add animation overlays
8. tighten to final runtime
9. review and export final MP4

## Definition Of Done

The work is done when:

- all planned scenes have approved visual source clips,
- the `Mia` narration is generated and sounds natural,
- the video remains under `120s`,
- PI-agent orchestration is understandable on first watch,
- and a final `16:9` English MP4 exists under `video/renders/`.

