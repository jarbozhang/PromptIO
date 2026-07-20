import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Parser from 'rss-parser';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FEED_URL = 'https://sopilot.net/rss/hottweets';

function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseArgs(argv = process.argv.slice(2)) {
  const opts = {
    date: localDateString(),
    limit: 0,
    comments: 8,
    timeoutMs: 45000,
    feedUrl: FEED_URL,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    if (arg === '--date') opts.date = next();
    else if (arg === '--limit') opts.limit = Number(next());
    else if (arg === '--comments') opts.comments = Number(next());
    else if (arg === '--timeout-ms') opts.timeoutMs = Number(next());
    else if (arg === '--feed-url') opts.feedUrl = next();
    else if (arg === '--help') {
      console.log('Usage: node scripts/fetch-sopilot.js [--date YYYY-MM-DD] [--limit N] [--comments N] [--timeout-ms N]');
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) throw new Error('--date must be YYYY-MM-DD');
  for (const key of ['limit', 'comments', 'timeoutMs']) {
    if (!Number.isFinite(opts[key]) || opts[key] < 0) throw new Error(`${key} must be a non-negative number`);
  }
  return opts;
}

function numeric(text, pattern) {
  const match = String(text || '').match(pattern);
  return match ? Number(match[1].replaceAll(',', '')) : 0;
}

export function parseSoPilotDescription(description) {
  const raw = String(description || '').replace(/\r/g, '').trim();
  const originalUrl = raw.match(/原推链接:\s*(https:\/\/x\.com\/[^\s]+\/status\/(\d+))/i)?.[1] || '';
  const tweetId = originalUrl.match(/status\/(\d+)/)?.[1] || '';
  const metricsStart = raw.search(/(?:^|\n)❤️\s*[\d,]+/u);
  const text = (metricsStart >= 0 ? raw.slice(0, metricsStart) : raw)
    .replace(/原推链接:[^\n]+/g, '')
    .trim();
  return {
    text,
    originalUrl,
    tweetId,
    metrics: {
      likes: numeric(raw, /❤️\s*([\d,]+)/u),
      reposts: numeric(raw, /🔁\s*([\d,]+)/u),
      replies: numeric(raw, /💬\s*([\d,]+)/u),
      bookmarks: numeric(raw, /🔖\s*([\d,]+)/u),
      views: numeric(raw, /👀\s*([\d,]+)/u),
      viralProbability: numeric(raw, /预测爆火概率:\s*([\d,]+)%/u),
      predictedViews: numeric(raw, /预测浏览量:\s*([\d,]+)/u),
      predictedReplyViews: numeric(raw, /预测评论浏览量:\s*([\d,]+)/u),
    },
  };
}

function replyInformationScore(reply, authorHandle = '') {
  const text = String(reply.text || '').replace(/^@\w+\s*/u, '').trim();
  const onlyLink = /^(https?:\/\/\S+|https:\/\/t\.co\/\S+)$/i.test(text);
  let score = Math.min(text.length, 220) / 10;
  score += Number(reply.likeCount || 0) * 2;
  score += Number(reply.replyCount || 0) * 3;
  if (onlyLink) score += String(reply.author?.username || '').toLowerCase() === authorHandle.toLowerCase() ? 35 : -20;
  if (text.length < 8 && !onlyLink) score -= 65;
  if (/实测|原因|因为|但是|建议|数据|来源|项目|github|性能|风险|准确|链接|文档|验证/i.test(text)) score += 20;
  return score;
}

export function rankReplies(replies, { authorHandle = '', limit = 8 } = {}) {
  return [...(replies || [])]
    .filter(reply => reply?.id && String(reply.text || '').trim())
    .sort((a, b) => replyInformationScore(b, authorHandle) - replyInformationScore(a, authorHandle))
    .slice(0, limit);
}

function cleanTitle(title) {
  return String(title || 'SoPilot 热帖').replace(/\s+/g, ' ').trim().slice(0, 180);
}

export function hotTweetToMarkdown({ rssItem, parsed, tweet, replies, fetchedAt }) {
  const author = tweet?.author || {};
  const handle = author.username || rssItem.title?.match(/@([^)]+)/)?.[1] || 'unknown';
  const originalUrl = parsed.originalUrl || `https://x.com/${handle}/status/${tweet?.id || parsed.tweetId}`;
  const body = [
    '## 原帖详情',
    '',
    String(tweet?.text || parsed.text || '').trim(),
    '',
    `- 作者：${author.name || rssItem.title || ''} (@${handle})`,
    `- 原帖互动：${Number(tweet?.likeCount ?? parsed.metrics.likes)} 赞 / ${Number(tweet?.retweetCount ?? parsed.metrics.reposts)} 转发 / ${Number(tweet?.replyCount ?? parsed.metrics.replies)} 评论`,
    `- SoPilot 信号：${parsed.metrics.viralProbability}% 起爆概率 / 预测 ${parsed.metrics.predictedViews} 浏览`,
    '',
    '## 评论与对话线索',
    '',
    ...(replies.length ? replies.flatMap(reply => [
      `- **${reply.author?.name || reply.author?.username || 'X 用户'} (@${reply.author?.username || 'unknown'})**：${String(reply.text || '').trim()}`,
      `  - ${Number(reply.likeCount || 0)} 赞 / ${Number(reply.replyCount || 0)} 回复 · https://x.com/${reply.author?.username || handle}/status/${reply.id}`,
    ]) : ['- 本次未能获取到可用评论；生成文章前应补充官方或一手事实来源。']),
    '',
    '## 使用边界',
    '',
    '这是一条中文社交平台热度与讨论角度来源，只用于发现问题、用户反馈和选题线索；涉及版本、产品能力、数据和结论时，需要再用官方文档、发布记录、论文或项目仓库交叉验证。',
  ].join('\n');

  return matter.stringify(body, {
    title: cleanTitle(tweet?.text || parsed.text || rssItem.title),
    source: `SoPilot Hot Tweets / X @${handle}`,
    source_type: 'sopilot-hot-tweet',
    source_role: 'angle',
    language: /[\u4e00-\u9fff]/.test(tweet?.text || parsed.text || '') ? 'zh' : 'en',
    url: originalUrl,
    sopilot_url: rssItem.link || '',
    tweet_id: tweet?.id || parsed.tweetId,
    account_name: author.name || '',
    account_handle: handle,
    published: tweet?.createdAt || rssItem.pubDate || '',
    likes: Number(tweet?.likeCount ?? parsed.metrics.likes),
    reposts: Number(tweet?.retweetCount ?? parsed.metrics.reposts),
    replies: Number(tweet?.replyCount ?? parsed.metrics.replies),
    bookmarks: parsed.metrics.bookmarks,
    views: parsed.metrics.views,
    viral_probability: parsed.metrics.viralProbability,
    predicted_views: parsed.metrics.predictedViews,
    predicted_reply_views: parsed.metrics.predictedReplyViews,
    comments_collected: replies.length,
    fetched_at: fetchedAt,
  });
}

export function requireNonEmptyFeed(items, date = '') {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(`SoPilot feed returned 0 items${date ? ` for ${date}` : ''}; refusing to report a successful 0/0 fetch`);
  }
  return items;
}

function birdJson(args, timeoutMs) {
  const output = execFileSync('bird', [...args, '--json', '--plain'], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: timeoutMs,
    maxBuffer: 20 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const start = Math.min(...['{', '['].map(char => {
    const idx = output.indexOf(char);
    return idx < 0 ? Number.POSITIVE_INFINITY : idx;
  }));
  if (!Number.isFinite(start)) throw new Error('bird returned no JSON');
  return JSON.parse(output.slice(start));
}

function appendLog(date, message) {
  const dir = path.join(ROOT, 'logs');
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(path.join(dir, `${date}.md`), `[${new Date().toISOString().slice(11, 19)}] ${message}\n`);
}

export async function run(opts) {
  const parser = new Parser({ timeout: 30000 });
  const feed = await parser.parseURL(opts.feedUrl);
  const items = opts.limit > 0 ? (feed.items || []).slice(0, opts.limit) : (feed.items || []);
  requireNonEmptyFeed(items, opts.date);
  const sourcesDir = path.join(ROOT, 'sources', opts.date);
  fs.mkdirSync(sourcesDir, { recursive: true });
  const fetchedAt = new Date().toISOString();
  let saved = 0;
  let failed = 0;

  console.log(`SoPilot: inspecting ${items.length} hot tweets with detail and comments`);
  appendLog(opts.date, `SoPilot: inspecting ${items.length} hot tweets with X detail and comments...`);

  for (const item of items) {
    const parsed = parseSoPilotDescription(item.contentSnippet || item.content || '');
    if (!parsed.originalUrl || !parsed.tweetId) {
      failed++;
      console.log(`  skip ${item.title}: original X URL missing`);
      continue;
    }
    try {
      const tweet = birdJson(['read', parsed.originalUrl], opts.timeoutMs);
      let rawReplies = [];
      try {
        const result = birdJson(['replies', parsed.originalUrl, '--max-pages', '1'], opts.timeoutMs);
        rawReplies = Array.isArray(result) ? result : (result.tweets || []);
      } catch (err) {
        console.log(`  warn ${parsed.tweetId}: comments unavailable (${err.message})`);
      }
      const replies = rankReplies(rawReplies, { authorHandle: tweet.author?.username || '', limit: opts.comments });
      const hash = crypto.createHash('md5').update(parsed.originalUrl).digest('hex').slice(0, 8);
      const filepath = path.join(sourcesDir, `sopilot-hot-${parsed.tweetId}-${hash}.md`);
      fs.writeFileSync(filepath, hotTweetToMarkdown({ rssItem: item, parsed, tweet, replies, fetchedAt }));
      saved++;
      console.log(`  ok @${tweet.author?.username || 'unknown'}: ${replies.length} comments -> ${path.basename(filepath)}`);
    } catch (err) {
      failed++;
      console.log(`  fail ${parsed.originalUrl}: ${err.message}`);
    }
  }

  const summary = `SoPilot: saved ${saved}/${items.length} hot tweets (${failed} failures)`;
  console.log(summary);
  appendLog(opts.date, summary);
  return { seen: items.length, saved, failed };
}

async function main() {
  try {
    await run(parseArgs());
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
