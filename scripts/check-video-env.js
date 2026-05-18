#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MIN_NODE_MAJOR = 22;
const HYPERFRAMES_VERSION = '0.6.16';
const EDGE_TTS_BIN = path.join(ROOT, '.venv/bin/edge-tts');

let ok = true;

function check(name, fn) {
  try {
    const detail = fn();
    console.log(`[ok] ${name}${detail ? ': ' + detail : ''}`);
  } catch (err) {
    ok = false;
    console.error(`[fail] ${name}: ${err.message}`);
  }
}

check('node version', () => {
  const major = parseInt(process.versions.node.split('.')[0], 10);
  if (major < MIN_NODE_MAJOR) {
    throw new Error(`need Node >= ${MIN_NODE_MAJOR}, got ${process.version}`);
  }
  return process.version;
});

check('ffmpeg', () => {
  const out = execSync('ffmpeg -version', { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
  return out.split('\n')[0].trim();
});

check('ffprobe', () => {
  execSync('ffprobe -version', { stdio: ['ignore', 'pipe', 'pipe'] });
  return 'available';
});

check(`hyperframes@${HYPERFRAMES_VERSION}`, () => {
  const out = execSync(
    `npx --yes hyperframes@${HYPERFRAMES_VERSION} --version`,
    { stdio: ['ignore', 'pipe', 'pipe'], timeout: 120_000 }
  ).toString().trim();
  return out;
});

check('edge-tts (.venv)', () => {
  if (!fs.existsSync(EDGE_TTS_BIN)) {
    throw new Error(`not found at ${EDGE_TTS_BIN}. run: uv venv .venv --python 3.12 && uv pip install --python .venv/bin/python edge-tts`);
  }
  const out = execSync(`${EDGE_TTS_BIN} --help`, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30_000 }).toString();
  return out.split('\n')[0].trim().slice(0, 60);
});

if (!ok) {
  console.error('\nvideo env not ready. fix the above and rerun.');
  process.exit(1);
}
console.log('\n[ok] video env ready');
