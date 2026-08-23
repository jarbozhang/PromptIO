import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { parse as parseYaml } from './lib/yaml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCES_PATH = path.join(ROOT, 'config/sources.yaml');

function parseArgs(argv = process.argv.slice(2)) {
  const opts = {
    date: new Date().toISOString().slice(0, 10),
    days: 14,
    minLikes: 50,
    tweetsPerAccount: 12,
    limitAccounts: 0,
    maxSaved: 250,
    timeoutMs: 30000,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    if (arg === '--date') opts.date = next();
    else if (arg === '--days') opts.days = Number(next());
    else if (arg === '--min-likes') opts.minLikes = Number(next());
    else if (arg === '--tweets-per-account') opts.tweetsPerAccount = Number(next());
    else if (arg === '--limit-accounts') opts.limitAccounts = Number(next());
    else if (arg === '--max-saved') opts.maxSaved = Number(next());
    else if (arg === '--timeout-ms') opts.timeoutMs = Number(next());
    else if (arg === '--help') {
      console.log([
        'Usage: node scripts/fetch-x.js [options]',
        '',
        'Options:',
        '  --date YYYY-MM-DD',
        '  --days N',
        '  --min-likes N',
        '  --tweets-per-account N',
        '  --limit-accounts N',
        '  --max-saved N',
        '  --timeout-ms N',
      ].join('\n'));
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) throw new Error('--date must be YYYY-MM-DD');
  for (const key of ['days', 'minLikes', 'tweetsPerAccount', 'limitAccounts', 'maxSaved', 'timeoutMs']) {
    if (!Number.isFinite(opts[key]) || opts[key] < 0) throw new Error(`--${key} must be a non-negative number`);
  }
  return opts;
}

function loadAccounts(limitAccounts) {
  const config = parseYaml(fs.readFileSync(SOURCES_PATH, 'utf8'));
  const accounts = Array.isArray(config.x_accounts) ? config.x_accounts : [];
  return limitAccounts > 0 ? accounts.slice(0, limitAccounts) : accounts;
}

function extractJsonArray(output) {
  const start = output.indexOf('[');
  const end = output.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return [];
  return JSON.parse(output.slice(start, end + 1));
}

function sourceRiskText(tweet) {
  return `${tweet.text || ''} ${tweet.id || ''}`.toLowerCase();
}

function isBlocked(tweet) {
  const text = sourceRiskText(tweet);
  return /reddit|hacker news|openrouter|news\.ycombinator|\bycombinator\b|\bhn\b/i.test(text);
}

function isRecent(createdAt, days) {
  const ts = Date.parse(createdAt || '');
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts <= days * 24 * 60 * 60 * 1000;
}

function cleanTitle(text) {
  return (text || 'Untitled')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

function slugHandle(handle) {
  return String(handle || 'unknown').replace(/[^A-Za-z0-9_]+/g, '-');
}

function tweetUrl(handle, id) {
  return `https://x.com/${handle}/status/${id}`;
}

function tweetToMarkdown(tweet, account, fetchedAt) {
  const handle = account.handle || tweet.author?.username || 'unknown';
  const url = tweetUrl(handle, tweet.id);
  return matter.stringify((tweet.text || '').trim(), {
    title: cleanTitle(tweet.text),
    source: `X @${handle}`,
    url,
    date: tweet.createdAt || '',
    likes: Number(tweet.likeCount || 0),
    reposts: Number(tweet.retweetCount || 0),
    replies: Number(tweet.replyCount || 0),
    source_type: 'x',
    language: /[\u4e00-\u9fff]/.test(tweet.text || '') ? 'zh' : 'en',
    account_name: account.name || tweet.author?.name || '',
    fetched_at: fetchedAt,
  });
}

function writeTweet(tweet, account, sourcesDir, fetchedAt) {
  const handle = account.handle || tweet.author?.username || 'unknown';
  const url = tweetUrl(handle, tweet.id);
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  const filepath = path.join(sourcesDir, `x-${slugHandle(handle)}-${hash}.md`);
  if (fs.existsSync(filepath)) return false;
  fs.writeFileSync(filepath, tweetToMarkdown(tweet, account, fetchedAt));
  return true;
}

function fetchAccount(account, opts) {
  const handle = account.handle;
  const output = execFileSync('bird', [
    'user-tweets',
    `@${handle}`,
    '-n',
    String(opts.tweetsPerAccount),
    '--json',
    '--plain',
  ], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: opts.timeoutMs,
    maxBuffer: 10 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return extractJsonArray(output);
}

function usableTweet(tweet, opts) {
  const text = (tweet.text || '').trim();
  if (!tweet.id || !text) return false;
  if (text.startsWith('RT @') || text.startsWith('@')) return false;
  if (!isRecent(tweet.createdAt, opts.days)) return false;
  if (Number(tweet.likeCount || 0) < opts.minLikes) return false;
  if (isBlocked(tweet)) return false;
  return true;
}

function appendLog(date, message) {
  const logsDir = path.join(ROOT, 'logs');
  fs.mkdirSync(logsDir, { recursive: true });
  const ts = new Date().toISOString().slice(11, 19);
  fs.appendFileSync(path.join(logsDir, `${date}.md`), `[${ts}] ${message}\n`);
}

async function main() {
  const opts = parseArgs();
  const sourcesDir = path.join(ROOT, 'sources', opts.date);
  fs.mkdirSync(sourcesDir, { recursive: true });

  const accounts = loadAccounts(opts.limitAccounts);
  const fetchedAt = new Date().toISOString();
  let saved = 0;
  let seen = 0;
  let failed = 0;

  console.log(`X: fetching ${accounts.length} accounts into sources/${opts.date}`);
  appendLog(opts.date, `X: fetching ${accounts.length} configured accounts with bird...`);

  for (const account of accounts) {
    if (saved >= opts.maxSaved) break;
    try {
      const tweets = fetchAccount(account, opts);
      const usable = tweets.filter(tweet => usableTweet(tweet, opts));
      seen += tweets.length;
      let accountSaved = 0;
      for (const tweet of usable) {
        if (saved >= opts.maxSaved) break;
        if (writeTweet(tweet, account, sourcesDir, fetchedAt)) {
          saved++;
          accountSaved++;
        }
      }
      console.log(`  ok @${account.handle}: ${accountSaved}/${tweets.length} saved`);
    } catch (err) {
      failed++;
      console.log(`  fail @${account.handle}: ${err.message}`);
    }
  }

  const summary = `X: saved ${saved} tweets from ${accounts.length} accounts (${seen} seen, ${failed} failures)`;
  console.log(summary);
  appendLog(opts.date, summary);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
