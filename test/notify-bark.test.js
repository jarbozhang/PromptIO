import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBarkUrl,
  notifyBark,
  parseArgs,
} from '../scripts/notify-bark.js';

function okResponse(status = 200, text = 'ok') {
  return {
    ok: status >= 200 && status < 300,
    status,
    async text() {
      return text;
    },
  };
}

describe('notify-bark', () => {
  it('builds a Bark path URL with encoded Chinese title and body', () => {
    const url = buildBarkUrl('https://bark.example.com/key', {
      title: '推送标题',
      body: '完成验证',
    });

    const parsed = new URL(url);
    assert.equal(parsed.origin, 'https://bark.example.com');
    assert.equal(decodeURIComponent(parsed.pathname), '/key/推送标题/完成验证');
  });

  it('supports URL templates and the sample Chinese placeholders', () => {
    const url = buildBarkUrl('https://bark.example.com/key/推送标题/这里改成你自己的推送内容', {
      title: 'PromptIO 完成',
      body: '测试通过',
    });

    assert.equal(
      decodeURIComponent(new URL(url).pathname),
      '/key/PromptIO 完成/测试通过',
    );
    assert.ok(!url.includes('%25'));
  });

  it('skips cleanly when BARK_NOTIFY_URL is not set', async () => {
    const result = await notifyBark({
      url: '',
      title: 'PromptIO 完成',
      body: '测试通过',
      fetchImpl: async () => okResponse(),
    });

    assert.equal(result.ok, true);
    assert.equal(result.skipped, true);
  });

  it('dry-runs without calling fetch', async () => {
    let called = false;
    const result = await notifyBark({
      url: 'https://bark.example.com/key',
      title: 'PromptIO 完成',
      body: '测试通过',
      dryRun: true,
      fetchImpl: async () => {
        called = true;
        return okResponse();
      },
    });

    assert.equal(result.dryRun, true);
    assert.equal(called, false);
    assert.match(result.url, /^https:\/\/bark\.example\.com\/key\//);
  });

  it('sends the notification URL through fetch', async () => {
    let target = '';
    const result = await notifyBark({
      url: 'https://bark.example.com/key',
      title: 'PromptIO 完成',
      body: '测试通过',
      fetchImpl: async (url) => {
        target = url;
        return okResponse(200, 'sent');
      },
    });

    assert.equal(result.sent, true);
    assert.equal(decodeURIComponent(new URL(target).pathname), '/key/PromptIO 完成/测试通过');
    assert.ok(!target.includes('%25'));
  });

  it('throws on non-2xx Bark responses', async () => {
    await assert.rejects(
      notifyBark({
        url: 'https://bark.example.com/key',
        title: 'PromptIO 完成',
        body: '测试通过',
        fetchImpl: async () => okResponse(500, 'server error'),
      }),
      /Bark notify failed HTTP 500/,
    );
  });

  it('parses cli arguments', () => {
    const parsed = parseArgs([
      '--url',
      'https://bark.example.com/key',
      '--title',
      'PromptIO 完成',
      '--body',
      '测试通过',
      '--dry-run',
      '--soft-fail',
    ]);

    assert.equal(parsed.url, 'https://bark.example.com/key');
    assert.equal(parsed.title, 'PromptIO 完成');
    assert.equal(parsed.body, '测试通过');
    assert.equal(parsed.dryRun, true);
    assert.equal(parsed.softFail, true);
  });
});
