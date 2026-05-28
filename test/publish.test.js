import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  parseArgs,
  resolveDraftDir,
  readDraft,
  markdownToWechatHtml,
  buildWechatArticle,
  buildXhsPackage,
  run,
} from '../scripts/publish.js';

function makeDraft() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'promptio-publish-'));
  const draftDir = path.join(root, 'drafts', '2026-05-26', 'demo-slug');
  fs.mkdirSync(draftDir, { recursive: true });
  fs.writeFileSync(path.join(draftDir, 'meta.yaml'), [
    'title: 测试标题',
    'status: draft',
    'source_url: https://example.com/source',
    'tags:',
    '  - OpenAI',
    '  - AI 编程',
    'xhs_title: 小红书发布标题可以比较完整',
    'draft_files:',
    '  wechat: demo-slug.md',
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(draftDir, 'demo-slug.md'), [
    '# 微信标题',
    '',
    '第一段摘要，说明这篇文章讲什么。',
    '',
    '## 小标题',
    '',
    '- 要点一',
    '- 要点二含 `code`',
    '',
    '[来源](https://example.com)',
    '',
  ].join('\n'));
  return { root, draftDir };
}

function cleanup(filepath) {
  fs.rmSync(filepath, { recursive: true, force: true });
}

describe('publish.js CLI parsing', () => {
  it('parseArgs: supports platform publish options', () => {
    const opts = parseArgs([
      '2026-05-26/demo-slug',
      '--platform', 'wechat',
      '--dry-run',
      '--out-dir', '/tmp/out',
      '--overwrite',
      '--wechat-action', 'publish',
      '--wechat-thumb-media-id', 'media123',
      '--wechat-author', '作者',
      '--wechat-source-url', 'https://example.com',
    ]);

    assert.equal(opts.draftRef, '2026-05-26/demo-slug');
    assert.equal(opts.platform, 'wechat');
    assert.equal(opts.dryRun, true);
    assert.equal(opts.outDir, '/tmp/out');
    assert.equal(opts.overwrite, true);
    assert.equal(opts.wechatAction, 'publish');
    assert.equal(opts.wechatThumbMediaId, 'media123');
    assert.equal(opts.wechatAuthor, '作者');
    assert.equal(opts.wechatSourceUrl, 'https://example.com');
  });

  it('parseArgs: rejects unsupported platform', () => {
    assert.throws(
      () => parseArgs(['drafts/2026-05-26/demo-slug', '--platform', 'douyin']),
      /--platform must be wechat, xhs, or all/
    );
  });
});

describe('publish.js draft handling', () => {
  it('readDraft: reads meta and platform draft files', () => {
    const { root, draftDir } = makeDraft();
    try {
      const draft = readDraft(draftDir);
      assert.equal(draft.slug, 'demo-slug');
      assert.equal(draft.meta.title, '测试标题');
      assert.ok(draft.wechatMarkdown.includes('# 微信标题'));
      assert.equal(draft.xhsPath, draft.wechatPath);
      assert.ok(draft.xhsMarkdown.includes('# 微信标题'));
    } finally {
      cleanup(root);
    }
  });

  it('resolveDraftDir: accepts absolute draft directory', () => {
    const { root, draftDir } = makeDraft();
    try {
      assert.equal(resolveDraftDir(draftDir), draftDir);
    } finally {
      cleanup(root);
    }
  });
});

describe('publish.js payload builders', () => {
  it('markdownToWechatHtml: converts common markdown blocks', () => {
    const html = markdownToWechatHtml('# 标题\n\n正文 **重点**\n\n- 列表 `code`\n');
    assert.ok(html.includes('<h1>标题</h1>'));
    assert.ok(html.includes('<p>正文 <strong>重点</strong></p>'));
    assert.ok(html.includes('<ul><li>列表 <code>code</code></li></ul>'));
  });

  it('buildWechatArticle: builds WeChat draft payload article', () => {
    const { root, draftDir } = makeDraft();
    try {
      const draft = readDraft(draftDir);
      const article = buildWechatArticle(draft, {
        wechatAuthor: 'PromptIO',
        wechatSourceUrl: '',
      }, 'thumb123');

      assert.equal(article.title, '测试标题');
      assert.equal(article.author, 'PromptIO');
      assert.equal(article.thumb_media_id, 'thumb123');
      assert.equal(article.content_source_url, 'https://example.com/source');
      assert.ok(article.content.includes('<h1>微信标题</h1>'));
      assert.ok(article.digest.includes('第一段摘要'));
    } finally {
      cleanup(root);
    }
  });

  it('buildXhsPackage: creates title body and tags for manual publishing', () => {
    const { root, draftDir } = makeDraft();
    try {
      const pack = buildXhsPackage(readDraft(draftDir));
      assert.equal(pack.title, '小红书发布标题可以比较完整');
      assert.ok(pack.body.includes('第一段摘要'));
      assert.deepEqual(pack.tags, ['#OpenAI', '#AI编程']);
      assert.deepEqual(pack.warnings, []);
    } finally {
      cleanup(root);
    }
  });
});

describe('publish.js dry-run', () => {
  it('run: writes WeChat and XHS artifacts without mutating meta', async () => {
    const { root, draftDir } = makeDraft();
    try {
      const before = fs.readFileSync(path.join(draftDir, 'meta.yaml'), 'utf8');
      const result = await run(parseArgs([draftDir, '--dry-run', '--overwrite']));

      assert.equal(result.wechat.status, 'dry_run');
      assert.equal(result.xhs.status, 'dry_run');
      assert.ok(fs.existsSync(path.join(draftDir, 'publish', 'wechat-draft-payload.json')));
      assert.ok(fs.existsSync(path.join(draftDir, 'publish', 'xhs-publish.md')));
      assert.equal(fs.readFileSync(path.join(draftDir, 'meta.yaml'), 'utf8'), before);
    } finally {
      cleanup(root);
    }
  });
});
