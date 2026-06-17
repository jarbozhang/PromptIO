import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SCHEMA_VERSION = 1;
const TOPIC_STATUSES = new Set(['topics_selected', 'draft_ready', 'draft_failed', 'superseded']);
const TERMINALISH_STATUSES = new Set(['draft_ready']);

export function manifestPathFor(date, root = ROOT) {
  assertDate(date);
  return path.join(root, 'runs', date, 'manifest.json');
}

export function loadManifest(date, { root = ROOT } = {}) {
  const filepath = manifestPathFor(date, root);
  if (!fs.existsSync(filepath)) return createEmptyManifest(date);
  const manifest = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  return normalizeManifest(manifest, date);
}

export function saveManifest(manifest, { root = ROOT } = {}) {
  assertDate(manifest.date);
  const filepath = manifestPathFor(manifest.date, root);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  const normalized = normalizeManifest(manifest, manifest.date);
  fs.writeFileSync(filepath, `${JSON.stringify(normalized, null, 2)}\n`);
  return filepath;
}

export function updateSourceCount(date, sourceCount, { root = ROOT } = {}) {
  const manifest = loadManifest(date, { root });
  manifest.source_count = Number(sourceCount || 0);
  manifest.updated_at = nowIso();
  appendEvent(manifest, 'sources_seen', { source_count: manifest.source_count });
  saveManifest(manifest, { root });
  return manifest;
}

export function replaceSelectedTopics(date, topics, { root = ROOT } = {}) {
  const manifest = loadManifest(date, { root });
  const keepIds = new Set(topics.map(topicId));

  for (const topic of manifest.topics) {
    if (!keepIds.has(topic.id) && topic.status === 'topics_selected') {
      topic.status = 'superseded';
      topic.updated_at = nowIso();
    }
  }

  manifest.updated_at = nowIso();
  appendEvent(manifest, 'topics_replaced', { topic_count: topics.length });
  saveManifest(manifest, { root });

  for (const topic of topics) upsertSelectedTopic(date, topic, { root });
  return loadManifest(date, { root });
}

export function upsertSelectedTopic(date, topic, { root = ROOT } = {}) {
  const manifest = loadManifest(date, { root });
  const id = topicId(topic);
  const existing = manifest.topics.find(item => item.id === id);
  const next = compactObject({
    id,
    file: normalizePath(topic.file, root),
    slug: topic.slug || existing?.slug || '',
    title: topic.title || existing?.title || '',
    status: mergeStatus(existing?.status, 'topics_selected'),
    reach: Number(topic.reach || 0) || existing?.reach || null,
    reach_note: topic.reach_note || existing?.reach_note || '',
    selection_reason: topic.reason || topic.selection_reason || existing?.selection_reason || '',
    selected_at: existing?.selected_at || nowIso(),
    updated_at: nowIso(),
    draft_dir: existing?.draft_dir || '',
    meta_path: existing?.meta_path || '',
    error: existing?.error || '',
  });

  if (existing) {
    Object.assign(existing, next);
  } else {
    manifest.topics.push(next);
  }
  manifest.updated_at = nowIso();
  appendEvent(manifest, 'topic_selected', { topic_id: id, slug: next.slug });
  saveManifest(manifest, { root });
  return manifest;
}

export function markDraftReady(date, topic, draft, { root = ROOT } = {}) {
  return updateTopicStatus(date, topic, 'draft_ready', {
    draft_dir: normalizePath(draft.dir || draft.draftDir, root),
    meta_path: normalizePath(draft.meta || draft.metaPath, root),
    error: '',
    draft_ready_at: nowIso(),
    draft_failed_at: '',
  }, { root });
}

export function markDraftFailed(date, topic, error, { root = ROOT } = {}) {
  return updateTopicStatus(date, topic, 'draft_failed', {
    error: safeErrorMessage(error),
    draft_failed_at: nowIso(),
  }, { root });
}

export function updateTopicStatus(date, topic, status, fields = {}, { root = ROOT } = {}) {
  assertStatus(status);
  const manifest = loadManifest(date, { root });
  const id = topicId(topic);
  let record = manifest.topics.find(item => item.id === id);
  if (!record) {
    record = compactObject({
      id,
      file: normalizePath(topic.file, root),
      slug: topic.slug || '',
      title: topic.title || '',
      status: 'topics_selected',
      selected_at: nowIso(),
    });
    manifest.topics.push(record);
  }

  if (TERMINALISH_STATUSES.has(record.status) && !TERMINALISH_STATUSES.has(status)) {
    record.updated_at = nowIso();
  } else {
    Object.assign(record, compactObject({
      ...fields,
      status,
      updated_at: nowIso(),
    }));
  }
  manifest.updated_at = nowIso();
  appendEvent(manifest, status, {
    topic_id: id,
    slug: record.slug || '',
    error: fields.error,
  });
  saveManifest(manifest, { root });
  return manifest;
}

function createEmptyManifest(date) {
  assertDate(date);
  const ts = nowIso();
  return {
    schema_version: SCHEMA_VERSION,
    date,
    created_at: ts,
    updated_at: ts,
    source_count: 0,
    topics: [],
    events: [],
  };
}

function normalizeManifest(manifest, date) {
  return {
    schema_version: manifest.schema_version || SCHEMA_VERSION,
    date: manifest.date || date,
    created_at: manifest.created_at || nowIso(),
    updated_at: manifest.updated_at || manifest.created_at || nowIso(),
    source_count: Number(manifest.source_count || 0),
    topics: Array.isArray(manifest.topics) ? manifest.topics.map(normalizeTopic) : [],
    events: Array.isArray(manifest.events) ? manifest.events : [],
  };
}

function normalizeTopic(topic) {
  return compactObject({
    id: topic.id,
    file: topic.file || '',
    slug: topic.slug || '',
    title: topic.title || '',
    status: topic.status || 'topics_selected',
    reach: topic.reach ?? null,
    reach_note: topic.reach_note || '',
    selection_reason: topic.selection_reason || '',
    selected_at: topic.selected_at || '',
    updated_at: topic.updated_at || '',
    draft_ready_at: topic.draft_ready_at || '',
    draft_failed_at: topic.draft_failed_at || '',
    draft_dir: topic.draft_dir || '',
    meta_path: topic.meta_path || '',
    error: topic.error || '',
  });
}

function appendEvent(manifest, type, data) {
  manifest.events.push(compactObject({
    type,
    at: nowIso(),
    ...data,
  }));
}

function topicId(topic) {
  const file = String(topic.file || '').trim();
  const slug = String(topic.slug || '').trim();
  const id = String(topic.id || file || slug).trim();
  if (!id) throw new Error('topic requires id, file, or slug');
  return id;
}

function mergeStatus(current, incoming) {
  if (TERMINALISH_STATUSES.has(current) && incoming === 'topics_selected') return current;
  if (current === 'superseded' && incoming === 'topics_selected') return 'topics_selected';
  return incoming;
}

function normalizePath(filepath, root) {
  if (!filepath) return '';
  const normalized = path.isAbsolute(filepath) ? path.relative(root, filepath) : filepath;
  return normalized.split(path.sep).join('/');
}

function assertDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) throw new Error('manifest date must be YYYY-MM-DD');
}

function assertStatus(status) {
  if (!TOPIC_STATUSES.has(status)) throw new Error(`unknown manifest topic status: ${status}`);
}

function compactObject(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
}

function safeErrorMessage(error) {
  const raw = error instanceof Error ? error.message : String(error || 'unknown error');
  return raw
    .replace(/contains blocked publish-surface terms:.*$/i, 'contains blocked publish-surface terms')
    .replace(/Reddit|reddit|Hacker News|Hacker-News|Show HN|Ask HN|\bHN\b|news\.ycombinator\.com|OpenRouter|openrouter|外网|国内|国外|境外|海外|这篇只按|这篇不写|我这篇不写成|我没有把[^。；;\n]*(?:写成|全部跑一遍)|先说明边界|只按公开[^。；;\n]*确认的信息写|不补实测结果|不编安装参数|不替仓库脑补|源材料摘要较短|正文必须|必须明确标注|不要写成连续说明文|本文只基于公开/gi, '[redacted]');
}

function nowIso() {
  return new Date().toISOString();
}
