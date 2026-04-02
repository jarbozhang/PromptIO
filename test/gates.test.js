import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { titleScorer, goldQuote, summaryGen } from '../scripts/lib/gates.js';

// Helper: create a mock Anthropic client that returns configurable text
function mockClient(responseText) {
  return {
    messages: {
      create: async () => ({ content: [{ text: responseText }] }),
    },
  };
}

// Helper: create a mock client that throws
function throwingClient(error) {
  return {
    messages: {
      create: async () => { throw error; },
    },
  };
}

const SAMPLE_ARTICLE = '# 测试文章标题\n\n这是一篇测试文章的内容，用于验证 gate 函数的行为。AI 技术正在改变世界，我认为每个开发者都应该关注这个方向。';

// ── titleScorer ──────────────────────────────────────────

describe('titleScorer', () => {
  it('happy path: returns highest-scoring title from valid JSON', async () => {
    const json = JSON.stringify([
      { title: '标题一', score: 7 },
      { title: '标题二', score: 9 },
      { title: '标题三', score: 8 },
    ]);
    const result = await titleScorer(SAMPLE_ARTICLE, mockClient(json), 'test-model');

    assert.equal(result.title, '标题二');
    assert.equal(result.title_score, 9);
    assert.equal(result.title_alternatives.length, 3);
    assert.equal(result.title_alternatives[0].title, '标题二'); // sorted descending
    assert.equal(result.title_alternatives[0].score, 9);
  });

  it('edge case: coerces string scores to numbers', async () => {
    const json = JSON.stringify([
      { title: '标题A', score: '8.5' },
      { title: '标题B', score: '7.0' },
      { title: '标题C', score: '9.2' },
    ]);
    const result = await titleScorer(SAMPLE_ARTICLE, mockClient(json), 'test-model');

    assert.equal(result.title, '标题C');
    assert.equal(result.title_score, 9.2);
    assert.equal(typeof result.title_score, 'number');
  });

  it('edge case: extracts JSON from markdown code fences', async () => {
    const wrapped = '```json\n[{"title":"围栏标题","score":8}]\n```';
    const result = await titleScorer(SAMPLE_ARTICLE, mockClient(wrapped), 'test-model');

    assert.equal(result.title, '围栏标题');
    assert.equal(result.title_score, 8);
  });

  it('edge case: fallback parses individual JSON objects', async () => {
    const messy = 'Here are titles:\n{"title":"回退标题1","score":7}\nsome noise\n{"title":"回退标题2","score":9}';
    const result = await titleScorer(SAMPLE_ARTICLE, mockClient(messy), 'test-model');

    assert.equal(result.title, '回退标题2');
    assert.equal(result.title_score, 9);
    assert.equal(result.title_alternatives.length, 2);
  });

  it('error path: throws on completely unparseable response', async () => {
    await assert.rejects(
      () => titleScorer(SAMPLE_ARTICLE, mockClient('this is not json at all'), 'test-model'),
      { message: /failed to parse titles/ }
    );
  });

  it('error path: throws on empty array', async () => {
    await assert.rejects(
      () => titleScorer(SAMPLE_ARTICLE, mockClient('[]'), 'test-model'),
      { message: /failed to parse titles/ }
    );
  });

  it('error path: propagates network error from client', async () => {
    const err = new Error('Connection refused');
    await assert.rejects(
      () => titleScorer(SAMPLE_ARTICLE, throwingClient(err), 'test-model'),
      { message: 'Connection refused' }
    );
  });
});

// ── goldQuote ────────────────────────────────────────────

describe('goldQuote', () => {
  it('happy path: returns trimmed quote', async () => {
    const result = await goldQuote(SAMPLE_ARTICLE, mockClient('AI不是万能的但没有AI是万万不能的'), 'test-model');

    assert.equal(result.gold_quote, 'AI不是万能的但没有AI是万万不能的');
  });

  it('edge case: trims whitespace and newlines', async () => {
    const result = await goldQuote(SAMPLE_ARTICLE, mockClient('  \n  金句内容  \n  '), 'test-model');

    assert.equal(result.gold_quote, '金句内容');
  });

  it('error path: throws on empty response', async () => {
    await assert.rejects(
      () => goldQuote(SAMPLE_ARTICLE, mockClient('   '), 'test-model'),
      { message: /empty response/ }
    );
  });

  it('error path: propagates network error', async () => {
    await assert.rejects(
      () => goldQuote(SAMPLE_ARTICLE, throwingClient(new Error('timeout')), 'test-model'),
      { message: 'timeout' }
    );
  });
});

// ── summaryGen ───────────────────────────────────────────

describe('summaryGen', () => {
  it('happy path: returns trimmed summary', async () => {
    const text = '当你以为大模型只能聊天时，有人已经用它重写了整个CI流程。这篇文章分享了一个真实案例。';
    const result = await summaryGen(SAMPLE_ARTICLE, mockClient(text), 'test-model');

    assert.equal(result.summary, text);
  });

  it('edge case: trims whitespace', async () => {
    const result = await summaryGen(SAMPLE_ARTICLE, mockClient('\n\n  摘要内容  \n'), 'test-model');

    assert.equal(result.summary, '摘要内容');
  });

  it('error path: throws on empty response', async () => {
    await assert.rejects(
      () => summaryGen(SAMPLE_ARTICLE, mockClient(''), 'test-model'),
      { message: /empty response/ }
    );
  });
});

// ── Promise.allSettled integration ───────────────────────

describe('Promise.allSettled integration', () => {
  it('all gates succeed: returns all results', async () => {
    const titleClient = mockClient(JSON.stringify([
      { title: '成功标题', score: 8 },
    ]));
    const quoteClient = mockClient('金句');
    const summaryClient = mockClient('摘要内容');

    const results = await Promise.allSettled([
      titleScorer(SAMPLE_ARTICLE, titleClient, 'test-model'),
      goldQuote(SAMPLE_ARTICLE, quoteClient, 'test-model'),
      summaryGen(SAMPLE_ARTICLE, summaryClient, 'test-model'),
    ]);

    assert.equal(results[0].status, 'fulfilled');
    assert.equal(results[1].status, 'fulfilled');
    assert.equal(results[2].status, 'fulfilled');
    assert.equal(results[0].value.title, '成功标题');
    assert.equal(results[1].value.gold_quote, '金句');
    assert.equal(results[2].value.summary, '摘要内容');
  });

  it('partial failure: other gates still succeed', async () => {
    const results = await Promise.allSettled([
      titleScorer(SAMPLE_ARTICLE, mockClient('not json'), 'test-model'),
      goldQuote(SAMPLE_ARTICLE, mockClient('金句OK'), 'test-model'),
      summaryGen(SAMPLE_ARTICLE, throwingClient(new Error('API down')), 'test-model'),
    ]);

    assert.equal(results[0].status, 'rejected');
    assert.equal(results[1].status, 'fulfilled');
    assert.equal(results[1].value.gold_quote, '金句OK');
    assert.equal(results[2].status, 'rejected');
  });

  it('all gates fail: no crash, all rejected', async () => {
    const results = await Promise.allSettled([
      titleScorer(SAMPLE_ARTICLE, mockClient('garbage'), 'test-model'),
      goldQuote(SAMPLE_ARTICLE, mockClient('   '), 'test-model'),
      summaryGen(SAMPLE_ARTICLE, mockClient(''), 'test-model'),
    ]);

    assert.equal(results[0].status, 'rejected');
    assert.equal(results[1].status, 'rejected');
    assert.equal(results[2].status, 'rejected');
  });
});
