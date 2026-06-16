import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  loadManifest,
  saveManifest,
  upsertSelectedTopic,
  markDraftReady,
  markDraftFailed,
  manifestPathFor,
} from '../scripts/lib/run-manifest.js';

function tempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'promptio-manifest-'));
}

function cleanup(root) {
  fs.rmSync(root, { recursive: true, force: true });
}

describe('run manifest helper', () => {
  it('initializes an empty manifest for a date', () => {
    const root = tempRoot();
    try {
      const manifest = loadManifest('2026-06-14', { root });
      assert.equal(manifest.schema_version, 1);
      assert.equal(manifest.date, '2026-06-14');
      assert.equal(manifest.source_count, 0);
      assert.deepEqual(manifest.topics, []);
      assert.deepEqual(manifest.events, []);
    } finally {
      cleanup(root);
    }
  });

  it('saves deterministic JSON to runs/date/manifest.json', () => {
    const root = tempRoot();
    try {
      const manifest = loadManifest('2026-06-14', { root });
      const filepath = saveManifest(manifest, { root });
      assert.equal(filepath, manifestPathFor('2026-06-14', root));
      assert.ok(fs.existsSync(filepath));
      assert.match(fs.readFileSync(filepath, 'utf8'), /"schema_version": 1/);
    } finally {
      cleanup(root);
    }
  });

  it('upserts the same selected topic without duplication', () => {
    const root = tempRoot();
    try {
      upsertSelectedTopic('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
        title: 'Demo',
        reach: 8,
      }, { root });
      const manifest = upsertSelectedTopic('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
        title: 'Demo updated',
        reach: 9,
      }, { root });

      assert.equal(manifest.topics.length, 1);
      assert.equal(manifest.topics[0].title, 'Demo updated');
      assert.equal(manifest.topics[0].reach, 9);
      assert.equal(manifest.topics[0].status, 'topics_selected');
    } finally {
      cleanup(root);
    }
  });

  it('marks a topic draft-ready with repo-relative paths', () => {
    const root = tempRoot();
    try {
      const draftDir = path.join(root, 'drafts', '2026-06-14', 'demo');
      const metaPath = path.join(draftDir, 'meta.yaml');
      const manifest = markDraftReady('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, {
        dir: draftDir,
        meta: metaPath,
      }, { root });

      assert.equal(manifest.topics[0].status, 'draft_ready');
      assert.equal(manifest.topics[0].draft_dir, 'drafts/2026-06-14/demo');
      assert.equal(manifest.topics[0].meta_path, 'drafts/2026-06-14/demo/meta.yaml');
    } finally {
      cleanup(root);
    }
  });

  it('records draft failures', () => {
    const root = tempRoot();
    try {
      const manifest = markDraftFailed('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, new Error('LLM failed'), { root });

      assert.equal(manifest.topics[0].status, 'draft_failed');
      assert.equal(manifest.topics[0].error, 'LLM failed');
    } finally {
      cleanup(root);
    }
  });

  it('redacts blocked publish-surface details from draft failure logs', () => {
    const root = tempRoot();
    try {
      const manifest = markDraftFailed('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, new Error('generated markdown contains blocked publish-surface terms: instruction_leak:这篇不写, domestic_foreign_framing:外网'), { root });

      assert.equal(manifest.topics[0].status, 'draft_failed');
      assert.equal(manifest.topics[0].error, 'generated markdown contains blocked publish-surface terms');
      assert.equal(manifest.events.at(-1).error, 'generated markdown contains blocked publish-surface terms');
    } finally {
      cleanup(root);
    }
  });

  it('does not downgrade draft-ready to selected on rerun', () => {
    const root = tempRoot();
    try {
      markDraftReady('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, {
        dir: path.join(root, 'drafts/2026-06-14/demo'),
        meta: path.join(root, 'drafts/2026-06-14/demo/meta.yaml'),
      }, { root });
      const manifest = upsertSelectedTopic('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
        title: 'Demo rerun',
      }, { root });

      assert.equal(manifest.topics[0].status, 'draft_ready');
      assert.equal(manifest.topics[0].draft_dir, 'drafts/2026-06-14/demo');
    } finally {
      cleanup(root);
    }
  });

  it('preserves draft-ready status when a later failure occurs after draft generation', () => {
    const root = tempRoot();
    try {
      markDraftReady('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, {
        dir: path.join(root, 'drafts/2026-06-14/demo'),
        meta: path.join(root, 'drafts/2026-06-14/demo/meta.yaml'),
      }, { root });
      const manifest = markDraftFailed('2026-06-14', {
        file: 'sources/2026-06-14/a.md',
        slug: 'demo',
      }, new Error('publish preview failed'), { root });

      assert.equal(manifest.topics[0].status, 'draft_ready');
      assert.equal(manifest.topics[0].draft_dir, 'drafts/2026-06-14/demo');
      assert.equal(manifest.topics[0].error, '');
      assert.equal(manifest.events.at(-1).type, 'draft_failed');
      assert.equal(manifest.events.at(-1).error, 'publish preview failed');
    } finally {
      cleanup(root);
    }
  });

  it('rejects invalid dates', () => {
    assert.throws(() => loadManifest('20260614'), /YYYY-MM-DD/);
  });
});
