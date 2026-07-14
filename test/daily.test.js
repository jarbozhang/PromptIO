import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseArgs,
  buildSelectionPrompt,
  classifySource,
  normalizeSelection,
  applyTopicMetadata,
  filterPublishableSources,
  normalizeTopicVoice,
  selectSourceSummariesForPrompt,
  sourceRisk,
  recordManifestSelection,
  recordManifestDraftReady,
  recordManifestDraftFailed,
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
  {
    file: 'sources/2026-05-27/c.md',
    title: 'Hermes Agent v0.16 release',
    source: 'GitHub Release',
    url: 'https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5',
    published: '2026-05-27',
    text: 'Hermes Agent release adds desktop app, model picker, and multi-profile sessions.',
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
      '--topics-file', 'topics/2026-05-27.json',
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
    assert.equal(opts.topicsFile, 'topics/2026-05-27.json');
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
    assert.ok(!prompt.includes('sources/2026-05-27/a.md'));
    assert.ok(prompt.includes('只选 REACH >= 7'));
    assert.ok(prompt.includes('同一实体/同一产品线'));
    assert.ok(prompt.includes('quality_tier:'));
    assert.ok(prompt.includes('source_role:'));
    assert.ok(prompt.includes('A 可直接选题'));
    assert.ok(prompt.includes('X/SoPilot 热帖及评论只能提供场景、热度和问题意识'));
    assert.ok(!prompt.includes('正文必须标注信息边界'));
    assert.ok(prompt.includes('sources/2026-05-27/b.md'));
  });

  it('filterPublishableSources: removes sensitive source platforms but keeps GitHub', () => {
    assert.deepEqual(sourceRisk(sources[0]), ['hacker-news']);
    assert.deepEqual(filterPublishableSources(sources).map(item => item.file), [
      'sources/2026-05-27/b.md',
      'sources/2026-05-27/c.md',
    ]);
  });

  it('classifySource: marks publishable sources by quality tier, bucket, and role', () => {
    assert.equal(classifySource(sources[0]).qualityTier, 'D');

    const repo = classifySource({
      file: 'sources/2026-05-27/github-trending-transformers.md',
      title: 'huggingface/transformers',
      source: 'GitHub Trending',
      sourceType: 'github',
      url: 'https://github.com/huggingface/transformers',
      text: 'Transformers is a framework for text, vision, audio, multimodal inference and training. Stars and recent pushes show active maintenance.',
      stars: 160000,
    });
    assert.equal(repo.sourceBucket, 'github-repo');
    assert.equal(repo.sourceRole, 'fact');
    assert.equal(repo.qualityTier, 'A');

    const release = classifySource(sources[2]);
    assert.equal(release.sourceBucket, 'release');
    assert.equal(release.sourceRole, 'version');
    assert.equal(release.qualityTier, 'A');

    const xAccount = classifySource({
      file: 'sources/2026-05-27/x-chenchengpro-abc.md',
      title: 'AI 写代码之后，瓶颈变成 validate diff',
      source: 'X @chenchengpro',
      url: 'https://x.com/chenchengpro/status/1',
      text: 'AI 写代码比人审代码快太多，瓶颈从 produce diff 挪到了 validate diff。这个工具在真实远端前增加本地闸门，跑 review、test、document、lint，再开干净 PR。'.repeat(4),
    });
    assert.equal(xAccount.sourceBucket, 'x-account');
    assert.equal(xAccount.sourceRole, 'angle');
    assert.equal(xAccount.qualityTier, 'A');

    const sopilot = classifySource({
      file: 'sources/2026-05-27/sopilot-hot-123-abc.md',
      title: '中文 AI 热帖与评论',
      source: 'SoPilot Hot Tweets / X @tester',
      sourceType: 'sopilot-hot-tweet',
      url: 'https://x.com/tester/status/123',
      text: '原帖详情与评论对话提供中文用户的真实问题、实测反馈、工作流和验证线索。'.repeat(8),
    });
    assert.equal(sopilot.sourceBucket, 'sopilot-hot');
    assert.equal(sopilot.sourceRole, 'angle');
    assert.notEqual(sopilot.qualityTier, 'D');
  });

  it('selectSourceSummariesForPrompt: keeps source diversity before truncation', () => {
    const manyGithub = Array.from({ length: 8 }, (_, idx) => ({
      file: `sources/2026-05-27/github-${idx}.md`,
      title: `repo ${idx}`,
      source: 'GitHub Trending',
      sourceType: 'github',
      url: `https://github.com/example/repo-${idx}`,
      text: 'A developer tool repo with workflow, agent, local run, API and benchmark details for readers to verify.',
      stars: 10000 + idx,
    }));
    const release = {
      file: 'sources/2026-05-27/vllm-releases-abc.md',
      title: 'vLLM v0.23.0 release',
      source: 'GitHub Release RSS',
      url: 'https://github.com/vllm-project/vllm/releases/tag/v0.23.0',
      text: 'Release notes describe scheduler fixes, inference changes, deployment behavior, and upgrade notes for version v0.23.0.',
    };
    const xAccount = {
      file: 'sources/2026-05-27/x-chenchengpro-abc.md',
      title: 'Validate diff workflow',
      source: 'X @chenchengpro',
      url: 'https://x.com/chenchengpro/status/1',
      text: 'AI coding workflow shifted from produce diff to validate diff. The thread explains review, test, document, lint and PR gates for agent delivery.'.repeat(4),
    };

    const selected = selectSourceSummariesForPrompt([...manyGithub, release, xAccount], 5);
    assert.equal(selected.length, 5);
    assert.ok(selected.some(item => item.file === release.file));
    assert.ok(selected.some(item => item.file === xAccount.file));
    assert.ok(selected.every(item => item.qualityTier !== 'D'));
  });

  it('selectSourceSummariesForPrompt: caps repeated release families before relaxing', () => {
    const repeatedReleases = Array.from({ length: 8 }, (_, idx) => ({
      file: `sources/2026-05-27/anthropic-python-sdk-releases-${idx}.md`,
      title: `v0.10${idx}.0`,
      source: 'Anthropic Python SDK Releases',
      url: `https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.10${idx}.0`,
      text: 'Release note with version changes, SDK fixes, API behavior and migration notes for agent developers.',
    }));
    const repo = {
      file: 'sources/2026-05-27/github-trending-openclaw.md',
      title: 'openclaw/openclaw',
      source: 'GitHub Trending',
      sourceType: 'github',
      url: 'https://github.com/openclaw/openclaw',
      text: 'OpenClaw personal AI assistant with local workflow, agent, GitHub integrations and cross-platform deployment path.',
      stars: 365000,
    };
    const xAccount = {
      file: 'sources/2026-05-27/x-chenchengpro-diff.md',
      title: 'Validate diff workflow',
      source: 'X @chenchengpro',
      url: 'https://x.com/chenchengpro/status/2',
      text: 'The thread explains an agent workflow for validate diff, review gates, tests, docs, lint and clean pull requests.'.repeat(4),
    };

    const selected = selectSourceSummariesForPrompt([...repeatedReleases, repo, xAccount], 6);
    assert.equal(selected.length, 6);
    assert.ok(selected.some(item => item.file === repo.file));
    assert.ok(selected.some(item => item.file === xAccount.file));
    assert.equal(
      selected.filter(item => item.file.includes('anthropic-python-sdk-releases')).length,
      4
    );
  });

  it('normalizeSelection: filters sensitive, unknown, and duplicate files', () => {
    const topics = normalizeSelection({
      topics: [
        { file: 'sources/2026-05-27/a.md', title: 'A', slug: 'models-dev-选型表', angle: '角度 A', reach: 8 },
        { file: 'sources/2026-05-27/a.md', title: 'A dup', angle: '重复', reach: 8 },
        { file: 'sources/2026-05-27/missing.md', title: 'missing', reach: 9 },
        { file: 'sources/2026-05-27/b.md', title: 'B', angle: '角度 B', reach: 7 },
        { file: 'sources/2026-05-27/c.md', title: 'Hermes 新版怎么用', angle: '角度 C', reach: 8 },
      ],
    }, sources, { min: 2, count: 2 });

    assert.equal(topics.length, 2);
    assert.deepEqual(topics.map(item => item.file), [
      'sources/2026-05-27/b.md',
      'sources/2026-05-27/c.md',
    ]);
    assert.equal(topics[0].slug, 'B');
    assert.equal(topics[1].slug, 'Hermes 新版怎么用');
  });

  it('normalizeSelection: rejects selector text that would leak publish-surface terms', () => {
    const topics = normalizeSelection({
      topics: [
        { file: 'sources/2026-05-27/b.md', title: 'OpenRouter 怎么接入', angle: '风险角度', reach: 8 },
        { file: 'sources/2026-05-27/c.md', title: 'Hermes 新版怎么用', angle: '角度 C', reach: 8 },
      ],
    }, sources, { min: 1, count: 1 });

    assert.equal(topics.length, 1);
    assert.equal(topics[0].file, 'sources/2026-05-27/c.md');
  });

  it('normalizeTopicVoice: upgrades workflow tutorials away from flat analytical prose', () => {
    const voice = normalizeTopicVoice({
      title: '不用从零写后端，Dify 的 Agentic Workflow 怎么搭',
      angle: '写清楚 RAG、MCP 和 agent 工作流怎么组合成可交付应用',
      voice: 'analytical',
    }, {
      title: 'Dify workflow release',
      text: 'low-code workflow, RAG, MCP, agent delivery',
    });

    assert.equal(voice, 'first-person');
  });

  it('normalizeSelection: sanitizes internal writing instructions from topic metadata', () => {
    const topics = normalizeSelection({
      topics: [
        {
          file: 'sources/2026-05-27/b.md',
          title: 'Agent 技能发布前怎么检查',
          slug: 'Agent技能发布前检查',
          angle: '写成 Agent 开发者检查清单；源材料摘要较短，正文必须明确标注信息边界，并只基于公开仓库可验证能力。',
          reach: 8,
          reason: '源材料摘要较短，正文必须标注信息边界。',
        },
      ],
    }, sources, { min: 1, count: 1 });

    assert.equal(topics[0].angle, '写成 Agent 开发者检查清单。');
    assert.equal(topics[0].reason, '');
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

describe('daily.js run manifest integration', () => {
  const manifestDate = '2099-01-02';
  const manifestDir = path.join(process.cwd(), 'runs', manifestDate);

  it('records selected topics in the run manifest', () => {
    try {
      recordManifestSelection({
        date: manifestDate,
        sources,
        topics: [{
          file: 'sources/2099-01-02/a.md',
          title: 'Manifest topic',
          slug: 'manifest-topic',
          reach: 8,
          reason: 'test selection',
        }],
      });

      const manifest = JSON.parse(fs.readFileSync(path.join(manifestDir, 'manifest.json'), 'utf8'));
      assert.equal(manifest.source_count, 3);
      assert.equal(manifest.topics.length, 1);
      assert.equal(manifest.topics[0].status, 'topics_selected');
      assert.equal(manifest.topics[0].slug, 'manifest-topic');
    } finally {
      fs.rmSync(manifestDir, { recursive: true, force: true });
    }
  });

  it('records draft-ready and draft-failed topic states', () => {
    try {
      const topic = {
        file: 'sources/2099-01-02/a.md',
        title: 'Manifest topic',
        slug: 'manifest-topic',
      };
      recordManifestSelection({ date: manifestDate, sources, topics: [topic] });
      recordManifestDraftReady({
        date: manifestDate,
        topic,
        result: {
          dir: path.join(process.cwd(), 'drafts/2099-01-02/manifest-topic'),
          meta: path.join(process.cwd(), 'drafts/2099-01-02/manifest-topic/meta.yaml'),
        },
      });
      recordManifestDraftFailed({
        date: manifestDate,
        topic: { file: 'sources/2099-01-02/b.md', slug: 'failed-topic' },
        error: new Error('draft failed'),
      });

      const manifest = JSON.parse(fs.readFileSync(path.join(manifestDir, 'manifest.json'), 'utf8'));
      const ready = manifest.topics.find(item => item.slug === 'manifest-topic');
      const failed = manifest.topics.find(item => item.slug === 'failed-topic');
      assert.equal(ready.status, 'draft_ready');
      assert.equal(ready.draft_dir, 'drafts/2099-01-02/manifest-topic');
      assert.equal(failed.status, 'draft_failed');
      assert.equal(failed.error, 'draft failed');
    } finally {
      fs.rmSync(manifestDir, { recursive: true, force: true });
    }
  });
});
