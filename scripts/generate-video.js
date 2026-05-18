#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HYPERFRAMES_VERSION = '0.6.16';
const TEMPLATE_DIR = path.join(ROOT, 'templates/video');
const PROMPT_REL = 'config/prompts/video-script.md';
const EDGE_TTS_BIN = path.join(ROOT, '.venv/bin/edge-tts');
const TTS_VOICE = process.env.PROMPTIO_TTS_VOICE || 'zh-CN-XiaoxiaoNeural';

function usage() {
  console.error('Usage: node scripts/generate-video.js <date>/<slug>[,<date>/<slug>...]');
  console.error('Example:');
  console.error('  node scripts/generate-video.js 2026-05-16/clawdmeter-claude-code用量桌面小挂件-openclaw生态新成员');
  process.exit(1);
}

function log(file, msg) {
  const ts = new Date().toISOString();
  fs.appendFileSync(file, `[${ts}] ${msg}\n`);
}

function fillTemplate(html, data) {
  for (const [k, v] of Object.entries(data)) {
    html = html.split(`{{${k}}}`).join(String(v));
  }
  return html;
}

function validateScript(script) {
  if (!script || typeof script !== 'object') return 'not an object';
  if (script.error) return `signals error: ${script.error} - ${script.reason || ''}`;
  if (!Array.isArray(script.scenes) || script.scenes.length !== 6) return 'scenes must be array of 6';
  const kinds = ['hook', 'event', 'data', 'opinion', 'action', 'outro'];
  for (let i = 0; i < 6; i++) {
    const s = script.scenes[i];
    if (!s || s.kind !== kinds[i]) return `scene ${i + 1} kind mismatch`;
  }
  if (!script.scenes[2].numbers || script.scenes[2].numbers.length !== 2) return 'data scene must have 2 numbers';
  if (!script.scenes[4].bullets || script.scenes[4].bullets.length !== 3) return 'action scene must have 3 bullets';
  return null;
}

function hasNarration(script) {
  return script.scenes.every((s) => typeof s.narration === 'string' && s.narration.trim().length > 0);
}

function ttsForScene(text, outFile) {
  execSync(
    `${JSON.stringify(EDGE_TTS_BIN)} --voice ${TTS_VOICE} --text ${JSON.stringify(text)} --write-media ${JSON.stringify(outFile)}`,
    { stdio: ['ignore', 'pipe', 'pipe'], timeout: 60_000 }
  );
}

function buildNarrationTrack(script, workDir, totalDuration) {
  if (!fs.existsSync(EDGE_TTS_BIN)) {
    throw new Error(`edge-tts not installed at ${EDGE_TTS_BIN}. run: uv venv .venv --python 3.12 && uv pip install --python .venv/bin/python edge-tts`);
  }
  const ttsDir = path.join(workDir, 'narration-parts');
  fs.mkdirSync(ttsDir, { recursive: true });
  const parts = [];
  for (const s of script.scenes) {
    const partPath = path.join(ttsDir, `s${s.id}.mp3`);
    ttsForScene(s.narration.trim(), partPath);
    parts.push({ path: partPath, startMs: Math.round(s.start * 1000) });
  }
  const inputArgs = parts.map((p) => `-i ${JSON.stringify(p.path)}`).join(' ');
  const filterParts = parts
    .map((p, i) => `[${i}]adelay=${p.startMs}|${p.startMs}[a${i}]`)
    .join(';');
  const mixInputs = parts.map((_, i) => `[a${i}]`).join('');
  const filter = `${filterParts};${mixInputs}amix=inputs=${parts.length}:dropout_transition=0:normalize=0,apad=whole_dur=${totalDuration}`;
  const outFile = path.join(workDir, 'narration.mp3');
  execSync(
    `ffmpeg -y ${inputArgs} -filter_complex ${JSON.stringify(filter)} -t ${totalDuration} -ar 44100 -ac 2 -b:a 128k ${JSON.stringify(outFile)}`,
    { stdio: ['ignore', 'pipe', 'pipe'], timeout: 120_000 }
  );
  return outFile;
}

function extractData(script) {
  const s = script.scenes;
  return {
    scene1_headline: s[0].headline,
    scene1_subline: s[0].subline,
    scene2_headline: s[1].headline,
    scene2_body: s[1].body,
    scene3_num1_value: s[2].numbers[0].value,
    scene3_num1_label: s[2].numbers[0].label,
    scene3_num2_value: s[2].numbers[1].value,
    scene3_num2_label: s[2].numbers[1].label,
    scene4_quote: s[3].quote,
    scene5_bullet1: s[4].bullets[0],
    scene5_bullet2: s[4].bullets[1],
    scene5_bullet3: s[4].bullets[2],
    scene6_brand_line: s[5].brand_line || 'PROMPTIO',
    bgm_file: script.bgm || 'lofi-calm.mp3',
  };
}

function renderOne(date, slug) {
  const draftDir = path.join(ROOT, 'drafts', date, slug);
  if (!fs.existsSync(draftDir)) {
    console.error(`[fail] draft dir not found: ${draftDir}`);
    return 1;
  }
  const mdPath = path.join(draftDir, `${slug}.md`);
  if (!fs.existsSync(mdPath)) {
    console.error(`[fail] draft markdown not found: ${mdPath}`);
    return 1;
  }

  const videoDir = path.join(draftDir, 'video');
  fs.mkdirSync(videoDir, { recursive: true });
  const renderLog = path.join(videoDir, 'render.log');
  log(renderLog, `command=render slug=${date}/${slug}`);

  const scriptPath = path.join(videoDir, 'script.json');
  if (!fs.existsSync(scriptPath)) {
    const mdRel = path.relative(ROOT, mdPath);
    const scriptRel = path.relative(ROOT, scriptPath);
    console.error('');
    console.error(`[need-input] script.json missing for ${date}/${slug}`);
    console.error('');
    console.error('请在 Claude Code 会话里运行：');
    console.error(`  按 ${PROMPT_REL} 处理 ${mdRel}，输出严格 JSON 写入 ${scriptRel}`);
    console.error('');
    log(renderLog, 'exit=2 reason=script_json_missing');
    return 2;
  }

  let script;
  try {
    script = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
  } catch (e) {
    console.error(`[fail] script.json parse error: ${e.message}`);
    log(renderLog, `exit=3 reason=script_parse_error msg="${e.message.replace(/\n/g, ' ')}"`);
    return 3;
  }

  const validationErr = validateScript(script);
  if (validationErr) {
    console.error(`[fail] script.json invalid: ${validationErr}`);
    log(renderLog, `exit=3 reason=schema_invalid msg="${validationErr}"`);
    return 3;
  }

  let data;
  try {
    data = extractData(script);
    for (const [k, v] of Object.entries(data)) {
      if (v == null || v === '') throw new Error(`missing or empty value: ${k}`);
    }
  } catch (e) {
    console.error(`[fail] script.json data extraction: ${e.message}`);
    log(renderLog, `exit=3 reason=data_extract msg="${e.message}"`);
    return 3;
  }

  const bgmPath = path.join(TEMPLATE_DIR, 'assets/bgm', data.bgm_file);
  if (!fs.existsSync(bgmPath)) {
    console.error(`[fail] bgm not found: ${data.bgm_file}`);
    log(renderLog, `exit=1 reason=bgm_missing file=${data.bgm_file}`);
    return 1;
  }

  const compDir = path.join(videoDir, 'composition');
  if (fs.existsSync(compDir)) fs.rmSync(compDir, { recursive: true });
  fs.mkdirSync(compDir, { recursive: true });

  for (const f of ['hyperframes.json', 'package.json', 'meta.json']) {
    fs.copyFileSync(path.join(TEMPLATE_DIR, f), path.join(compDir, f));
  }
  fs.symlinkSync(path.join(TEMPLATE_DIR, 'assets'), path.join(compDir, 'assets'));

  const narrationEnabled = hasNarration(script);
  if (narrationEnabled) {
    log(renderLog, 'tts_started');
    try {
      const narrationMp3 = buildNarrationTrack(script, videoDir, script.duration || 60);
      fs.copyFileSync(narrationMp3, path.join(compDir, 'narration.mp3'));
      data.narration_src = './narration.mp3';
      data.bgm_volume = '0.12';
      log(renderLog, 'tts_finished');
    } catch (e) {
      log(renderLog, `tts_failed msg="${(e.message || '').slice(0, 200).replace(/\n/g, ' ')}"`);
      console.error(`[fail] TTS step failed: ${e.message}`);
      return 1;
    }
  } else {
    data.narration_src = '';
    data.bgm_volume = '0.3';
  }

  const tplHtml = fs.readFileSync(path.join(TEMPLATE_DIR, 'xhs-9-16.html'), 'utf8');
  fs.writeFileSync(path.join(compDir, 'index.html'), fillTemplate(tplHtml, data));

  log(renderLog, 'render_started');
  const start = Date.now();
  try {
    execSync(`npx --yes hyperframes@${HYPERFRAMES_VERSION} render -o output.mp4`, {
      cwd: compDir,
      stdio: 'inherit',
      timeout: 900_000,
    });
  } catch (e) {
    log(renderLog, `render_failed exit=${e.status || 1} msg="${(e.message || '').slice(0, 200).replace(/\n/g, ' ')}"`);
    console.error(`[fail] render failed: ${e.message}`);
    return 1;
  }

  const outputMp4 = path.join(videoDir, 'output.mp4');
  const renderedMp4 = path.join(compDir, 'output.mp4');
  if (!fs.existsSync(renderedMp4)) {
    log(renderLog, 'exit=1 reason=render_produced_no_file');
    console.error(`[fail] render finished but no mp4 found at ${renderedMp4}`);
    return 1;
  }
  fs.renameSync(renderedMp4, outputMp4);

  const sec = Math.round((Date.now() - start) / 1000);
  const sizeMb = (fs.statSync(outputMp4).size / 1024 / 1024).toFixed(2);
  log(renderLog, `render_finished exit=0 duration_sec=${sec} output_size_mb=${sizeMb}`);
  console.log(`\n[ok] ${date}/${slug}: ${path.relative(ROOT, outputMp4)} (${sizeMb}MB, ${sec}s)`);
  return 0;
}

function main() {
  const arg = process.argv[2];
  if (!arg) usage();
  const targets = arg.split(',').map((s) => s.trim()).filter(Boolean);
  if (targets.length === 0) usage();

  let worstCode = 0;
  for (const t of targets) {
    const slashIdx = t.indexOf('/');
    if (slashIdx <= 0) {
      console.error(`[fail] invalid target: "${t}" (expected <date>/<slug>)`);
      worstCode = Math.max(worstCode, 1);
      continue;
    }
    const date = t.slice(0, slashIdx);
    const slug = t.slice(slashIdx + 1);
    const code = renderOne(date, slug);
    worstCode = Math.max(worstCode, code);
  }
  process.exit(worstCode);
}

main();
