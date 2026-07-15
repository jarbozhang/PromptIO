import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  parseArgs,
  inspectDraftForBrowserPublish,
  assertAllowedWechatUrl,
  buildWechatBrowserHtml,
} from '../scripts/publish-wechat-browser.js';

function makeDraft(frontmatter = '') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'promptio-wechat-browser-'));
  const draftDir = path.join(root, 'drafts', '2099-01-01', 'demo');
  fs.mkdirSync(draftDir, { recursive: true });
  const markdownPath = path.join(draftDir, 'demo.md');
  const qaPass = frontmatter === 'qa_fail' ? 'false' : 'true';
  fs.writeFileSync(markdownPath, [
    '---',
    'title: 测试文章',
    'status: approved',
    'platforms:',
    '  wechat: primary',
    'qa:',
    `  overall_pass: ${qaPass}`,
    'cover:',
    '  status: ready',
    '  path: cover.png',
    ...(frontmatter && frontmatter !== 'qa_fail' ? [frontmatter] : []),
    '---',
    '',
    '# 测试文章',
    '',
    '第一段摘要。',
    '',
    '## 正文',
    '',
    '这里有 **重点** 和 [来源](https://example.com)。',
  ].filter(Boolean).join('\n'));
  fs.writeFileSync(path.join(draftDir, 'cover.png'), Buffer.from('fake-image'));
  return { root, draftDir, markdownPath };
}

describe('safe WeChat browser publisher', () => {
  it('parses a draft ref and defaults to prepare-only', () => {
    const opts = parseArgs(['drafts/2099-01-01/demo']);
    assert.equal(opts.draftRef, 'drafts/2099-01-01/demo');
    assert.equal(opts.submit, false);
    assert.equal(opts.theme, 'grace');
  });

  it('requires approved QA, a WeChat platform gate, and an existing cover', () => {
    const { root, draftDir } = makeDraft();
    try {
      const inspected = inspectDraftForBrowserPublish(draftDir);
      assert.equal(inspected.title, '测试文章');
      assert.equal(inspected.coverPath, path.join(draftDir, 'cover.png'));
      assert.match(inspected.markdown, /第一段摘要/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('rejects a draft without QA approval', () => {
    const { root, draftDir } = makeDraft('qa_fail');
    try {
      assert.throws(() => inspectDraftForBrowserPublish(draftDir), /qa\.overall_pass/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('allows only local files and mp.weixin.qq.com navigation', () => {
    assert.doesNotThrow(() => assertAllowedWechatUrl('https://mp.weixin.qq.com/'));
    assert.doesNotThrow(() => assertAllowedWechatUrl('file:///tmp/article.html'));
    assert.throws(() => assertAllowedWechatUrl('https://api.telegram.org/bot-secret'), /blocked outbound URL/);
    assert.throws(() => assertAllowedWechatUrl('https://evil.example/'), /blocked outbound URL/);
  });

  it('builds self-contained WeChat HTML without remote scripts or secret fields', () => {
    const { root, draftDir } = makeDraft();
    try {
      const draft = inspectDraftForBrowserPublish(draftDir);
      const html = buildWechatBrowserHtml(draft, { theme: 'grace', color: '#2563eb' });
      assert.match(html, /id="output"/);
      assert.match(html, /<strong>重点<\/strong>/);
      assert.doesNotMatch(html, /<script|TELEGRAM|APP_SECRET|ssh/i);
      assert.doesNotMatch(html, /https:\/\/api\.telegram\.org/i);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
