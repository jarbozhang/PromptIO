import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseArgs,
  buildSelectionPrompt,
  normalizeSelection,
  applyTopicMetadata,
} from '../scripts/daily.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const sources = [
  {
    file: 'sources/2026-05-27/a.md',
    title: 'A model pricing database',
    source: 'Hacker News',
    url: 'https://example.com/a',
    published: '2026-05-27',
    text: 'A useful model pricing and capabilities database.',
  },
  {
    file: 'sources/2026-05-27/b.md',
    title: 'A coding agent release',
    source: 'OpenAI Blog',
    url: 'https://example.com/b',
    published: '2026-05-27',
    text: 'A coding agent workflow release for developers.',
  },
];

describe('daily.js CLI', () => {
  it('parseArgs: supports daily generation options', () => {
    const opts = parseArgs([
      '--date', '2026-05-27',
      '--count', '6',
      '--min', '6',
      '--max', '10',
      '--sources-limit', '80',
      '--llm-provider', 'codex',
      '--text-model', 'gpt-test',
      '--codex-bin', 'codex-test',
      '--codex-profile', 'local',
      '--no-cover',
      '--publish-dry-run',
      '--dry-run',
    ]);

    assert.equal(opts.date, '2026-05-27');
    assert.equal(opts.count, 6);
    assert.equal(opts.min, 6);
    assert.equal(opts.max, 10);
    assert.equal(opts.sourcesLimit, 80);
    assert.equal(opts.llmProvider, 'codex');
    assert.equal(opts.textModel, 'gpt-test');
    assert.equal(opts.codexBin, 'codex-test');
    assert.equal(opts.codexProfile, 'local');
    assert.equal(opts.noCover, true);
    assert.equal(opts.publishDryRun, true);
    assert.equal(opts.dryRun, true);
  });

  it('parseArgs: requires count within min and max', () => {
    assert.throws(
      () => parseArgs(['--count', '5', '--min', '6']),
      /--count must be between --min and --max/
    );
  });
});

describe('daily.js topic selection', () => {
  it('buildSelectionPrompt: includes JSON contract and source files', () => {
    const prompt = buildSelectionPrompt({
      date: '2026-05-27',
      count: 6,
      min: 6,
      max: 10,
      sources,
    });

    assert.ok(prompt.includes('"topics"'));
    assert.ok(prompt.includes('"slug"'));
    assert.ok(prompt.includes('drafts/{date}/{slug}/{slug}.md'));
    assert.ok(prompt.includes('sources/2026-05-27/a.md'));
    assert.ok(prompt.includes('只选 REACH >= 7'));
  });

  it('normalizeSelection: filters unknown and duplicate files', () => {
    const topics = normalizeSelection({
      topics: [
        { file: 'sources/2026-05-27/a.md', title: 'A', slug: 'models-dev-选型表', angle: '角度 A', reach: 8 },
        { file: 'sources/2026-05-27/a.md', title: 'A dup', angle: '重复', reach: 8 },
        { file: 'sources/2026-05-27/missing.md', title: 'missing', reach: 9 },
        { file: 'sources/2026-05-27/b.md', title: 'B', angle: '角度 B', reach: 7 },
      ],
    }, sources, { min: 2, count: 2 });

    assert.equal(topics.length, 2);
    assert.deepEqual(topics.map(item => item.file), [
      'sources/2026-05-27/a.md',
      'sources/2026-05-27/b.md',
    ]);
    assert.equal(topics[0].slug, 'models-dev-选型表');
    assert.equal(topics[1].slug, 'b');
  });

  it('normalizeSelection: rejects too few usable topics', () => {
    assert.throws(
      () => normalizeSelection({ topics: [] }, sources, { min: 1, count: 1 }),
      /expected at least 1/
    );
  });
});

describe('daily.js draft metadata', () => {
  it('applyTopicMetadata: keeps selector reach and reason on generated draft meta', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'promptio-daily-meta-'));
    const metaPath = path.join(root, 'meta.yaml');
    fs.writeFileSync(metaPath, [
      'title: 测试文章',
      'reach: 1',
      'tags:',
      '  - AI',
      '',
    ].join('\n'));

    try {
      const meta = applyTopicMetadata(metaPath, {
        reach: 9,
        reach_note: '品牌强，可操作',
        reason: '适合今天发布',
      });

      assert.equal(meta.reach, 9);
      assert.equal(meta.reach_note, '品牌强，可操作');
      assert.equal(meta.selection_reason, '适合今天发布');
      assert.match(fs.readFileSync(metaPath, 'utf8'), /reach: 9/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
