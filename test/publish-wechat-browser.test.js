import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import {
  parseArgs,
  inspectDraftForBrowserPublish,
  assertAllowedWechatUrl,
  buildWechatBrowserHtml,
  findRunningChromeCdp,
  isWechatLoggedInSnapshot,
  buildWechatHomeUrl,
  findNewWechatEditorTarget,
  buildWechatEditorUrl,
  hasWechatCover,
  resolveWechatMediaAssets,
  verifyWechatBodyImages,
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

  it('reuses the CDP port of an existing Chrome process for the same profile', () => {
    const profile = '/Users/demo/Library/Application Support/PromptIO/wechat-chrome-profile';
    const processes = [
      `123 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --remote-debugging-port=61121 --user-data-dir=${profile} --start-maximized`,
      '456 unrelated process',
    ].join('\n');
    assert.deepEqual(findRunningChromeCdp(processes, profile), { port: 61121 });
    assert.equal(findRunningChromeCdp(processes, '/tmp/other-profile'), null);
  });

  it('requires a valid token and rejects the re-login page as logged out', () => {
    assert.equal(isWechatLoggedInSnapshot({ href: 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&token=123', body: '首页 新的创作' }), true);
    assert.equal(isWechatLoggedInSnapshot({ href: 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index', body: '请重新登录' }), false);
  });

  it('preserves the active WeChat token when navigating home', () => {
    assert.equal(buildWechatHomeUrl('https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=420100578'), 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=420100578');
    assert.throws(() => buildWechatHomeUrl('https://mp.weixin.qq.com/cgi-bin/home?t=home/index'), /active token/);
  });

  it('detects a WeChat editor even when Chrome reuses a pre-existing blank tab', () => {
    const initial = new Map([
      ['home', 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&token=1'],
      ['blank', 'about:blank'],
    ]);
    const targets = [
      { targetId: 'home', type: 'page', url: 'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&token=1' },
      { targetId: 'blank', type: 'page', url: 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&token=1' },
    ];
    assert.equal(findNewWechatEditorTarget(targets, initial)?.targetId, 'blank');
  });

  it('builds a same-origin editor URL with the active token', () => {
    assert.equal(buildWechatEditorUrl('https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=420100578'), 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&createType=0&token=420100578&lang=zh_CN');
  });

  it('does not treat a generic editor image upload as a configured cover', () => {
    assert.equal(hasWechatCover({ backgroundImage: 'none', emptyLabelDisplay: 'block' }), false);
    assert.equal(hasWechatCover({ backgroundImage: 'url("https://mmbiz.qpic.cn/cover.jpg")', emptyLabelDisplay: 'block' }), true);
  });

  it('requires a dedicated WeChat cover and keeps body images separate', () => {
    const { root, draftDir } = makeDraft([
      'wechat_cover:',
      '  status: approved',
      '  path: wechat-cover.png',
      'body_images:',
      '  - path: body-1.png',
      '    after_heading: 正文',
      '  - path: body-2.png',
      '    after_heading: 结论',
    ].join('\n'));
    try {
      fs.writeFileSync(path.join(draftDir, 'wechat-cover.png'), Buffer.from('cover'));
      fs.writeFileSync(path.join(draftDir, 'body-1.png'), Buffer.from('body1'));
      fs.writeFileSync(path.join(draftDir, 'body-2.png'), Buffer.from('body2'));
      const parsed = matter(fs.readFileSync(path.join(draftDir, 'demo.md'), 'utf8'));
      const media = resolveWechatMediaAssets(draftDir, parsed.data);
      assert.equal(media.coverPath, path.join(draftDir, 'wechat-cover.png'));
      assert.deepEqual(media.bodyImages.map(x => x.path), [path.join(draftDir, 'body-1.png'), path.join(draftDir, 'body-2.png')]);
      assert.notEqual(media.coverPath, media.bodyImages[0].path);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('rejects reusing the cover as an in-article image', () => {
    const { root, draftDir } = makeDraft([
      'wechat_cover:',
      '  status: approved',
      '  path: cover.png',
      'body_images:',
      '  - path: cover.png',
      '    after_heading: 正文',
    ].join('\n'));
    try {
      const parsed = matter(fs.readFileSync(path.join(draftDir, 'demo.md'), 'utf8'));
      assert.throws(() => resolveWechatMediaAssets(draftDir, parsed.data), /must be separate/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('verifies every configured body image exists remotely at its heading', () => {
    const expected = [
      { after_heading: '十个版本为什么越选越平' },
      { after_heading: '把模型停在编辑席' },
    ];
    const remote = [
      { src: 'https://mmbiz.qpic.cn/a.png', width: 1080, height: 720, previousHeading: '十个版本为什么越选越平' },
      { src: 'https://mmbiz.qpic.cn/b.png', width: 1080, height: 720, previousHeading: '把模型停在编辑席' },
    ];
    assert.deepEqual(verifyWechatBodyImages(expected, remote), { verified: true, count: 2 });
    assert.throws(() => verifyWechatBodyImages(expected, remote.slice(0, 1)), /body image verification failed/);
    assert.throws(() => verifyWechatBodyImages(expected, [{ ...remote[0], src: 'data:image/png;base64,abc' }, remote[1]]), /body image verification failed/);
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
