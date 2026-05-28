import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseArgs,
  buildSelectionPrompt,
  normalizeSelection,
} from '../scripts/daily.js';

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
    assert.ok(prompt.includes('sources/2026-05-27/a.md'));
    assert.ok(prompt.includes('只选 REACH >= 7'));
  });

  it('normalizeSelection: filters unknown and duplicate files', () => {
    const topics = normalizeSelection({
      topics: [
        { file: 'sources/2026-05-27/a.md', title: 'A', angle: '角度 A', reach: 8 },
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
  });

  it('normalizeSelection: rejects too few usable topics', () => {
    assert.throws(
      () => normalizeSelection({ topics: [] }, sources, { min: 1, count: 1 }),
      /expected at least 1/
    );
  });
});
