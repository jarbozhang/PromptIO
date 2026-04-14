#!/usr/bin/env node
// 监控 OpenRouter 新增模型，对比上次快照输出差异
// 用法: node scripts/fetch-openrouter-models.js

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const LOG_FILE = path.join(ROOT, 'logs', `${TODAY}.md`);
const SNAPSHOT_FILE = path.join(ROOT, 'data', 'openrouter-models.json');

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function loadSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf-8'));
  } catch {
    return { models: {}, updated_at: null };
  }
}

function saveSnapshot(snapshot) {
  fs.mkdirSync(path.dirname(SNAPSHOT_FILE), { recursive: true });
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2));
}

async function main() {
  fs.mkdirSync(SOURCES_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

  log('OpenRouter: fetching model list...');

  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { 'User-Agent': 'promptio-pipeline' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const models = data.data || [];

  // 加载上次快照
  const snapshot = loadSnapshot();
  const oldModelIds = new Set(Object.keys(snapshot.models));

  // 找新增模型
  const newModels = models.filter(m => !oldModelIds.has(m.id));
  log(`  Total models: ${models.length}, New since last check: ${newModels.length}`);

  let count = 0;

  for (const model of newModels) {
    const hash = crypto.createHash('md5').update(model.id).digest('hex').slice(0, 8);
    const filename = `openrouter-new-model-${hash}.md`;
    const filepath = path.join(SOURCES_DIR, filename);

    if (fs.existsSync(filepath)) continue;

    const pricing = model.pricing || {};
    const snippet = [
      model.description || '',
      '',
      `Model ID: ${model.id}`,
      `Context: ${model.context_length || 'unknown'} tokens`,
      `Pricing: $${pricing.prompt || '?'}/1K prompt, $${pricing.completion || '?'}/1K completion`,
      model.architecture ? `Architecture: ${JSON.stringify(model.architecture)}` : '',
    ].filter(Boolean).join('\n');

    const content = matter.stringify(snippet, {
      title: `New on OpenRouter: ${model.name || model.id}`,
      url: `https://openrouter.ai/models/${model.id}`,
      source: 'OpenRouter',
      source_type: 'openrouter',
      language: 'en',
      model_id: model.id,
      context_length: model.context_length || null,
      published: TODAY,
      fetched_at: new Date().toISOString(),
    });

    fs.writeFileSync(filepath, content);
    count++;
  }

  // 更新快照
  const newSnapshot = {
    models: {},
    updated_at: new Date().toISOString(),
  };
  for (const m of models) {
    newSnapshot.models[m.id] = { name: m.name, context_length: m.context_length };
  }
  saveSnapshot(newSnapshot);

  log(`OpenRouter: done, ${count} new models saved. Snapshot updated.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
