import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseSoPilotDescription,
  rankReplies,
  hotTweetToMarkdown,
  requireNonEmptyFeed,
} from '../scripts/fetch-sopilot.js';

const description = `上下文越长不一定越好。\n\n❤️ 30  🔁 3  💬 5  🔖 42  👀 14649\n预测爆火概率:100%，预测浏览量:178000，预测评论浏览量:2700\n原推链接: https://x.com/FinanceYF5/status/2076916584938189192`;

describe('SoPilot hot tweet source ingestion', () => {
  it('treats an empty feed as degraded instead of a successful 0/0 fetch', () => {
    assert.throws(
      () => requireNonEmptyFeed([], '2026-07-20'),
      /SoPilot feed returned 0 items/
    );
  });

  it('parses the original X URL and SoPilot trend metrics', () => {
    const parsed = parseSoPilotDescription(description);
    assert.equal(parsed.originalUrl, 'https://x.com/FinanceYF5/status/2076916584938189192');
    assert.equal(parsed.tweetId, '2076916584938189192');
    assert.equal(parsed.text, '上下文越长不一定越好。');
    assert.deepEqual(parsed.metrics, {
      likes: 30,
      reposts: 3,
      replies: 5,
      bookmarks: 42,
      views: 14649,
      viralProbability: 100,
      predictedViews: 178000,
      predictedReplyViews: 2700,
    });
  });

  it('keeps informative comments ahead of empty reactions', () => {
    const replies = rankReplies([
      { id: '1', text: '@a 哈哈', likeCount: 20, replyCount: 0, author: { username: 'noise', name: 'Noise' } },
      { id: '2', text: '@a 实测一百万上下文后，跨文档检索准确率明显下降，拆分任务反而更稳定。', likeCount: 3, replyCount: 2, author: { username: 'tester', name: 'Tester' } },
      { id: '3', text: 'https://t.co/source', likeCount: 10, replyCount: 0, author: { username: 'author', name: 'Author' } },
    ], { authorHandle: 'FinanceYF5', limit: 2 });
    assert.deepEqual(replies.map(item => item.id), ['2', '3']);
  });

  it('writes a source with original detail, comments, and angle-only provenance', () => {
    const output = hotTweetToMarkdown({
      rssItem: { title: 'AI Will (@FinanceYF5)', pubDate: 'Tue, 14 Jul 2026 06:27:55 GMT', link: 'https://sopilot.net/hot-tweets?tweetId=2076916584938189192' },
      parsed: parseSoPilotDescription(description),
      tweet: { id: '2076916584938189192', text: '原帖完整正文', createdAt: 'Tue Jul 14 06:27:55 +0000 2026', likeCount: 35, retweetCount: 4, replyCount: 6, author: { username: 'FinanceYF5', name: 'AI Will' } },
      replies: [{ id: '2', text: '一条有信息量的实测评论', likeCount: 3, replyCount: 1, author: { username: 'tester', name: 'Tester' } }],
      fetchedAt: '2026-07-14T09:00:00.000Z',
    });
    assert.match(output, /source_type: sopilot-hot-tweet/);
    assert.match(output, /source_role: angle/);
    assert.match(output, /url: ['"]?https:\/\/x.com\/FinanceYF5\/status\/2076916584938189192['"]?/);
    assert.match(output, /原帖完整正文/);
    assert.match(output, /一条有信息量的实测评论/);
    assert.match(output, /predicted_views: 178000/);
  });
});
