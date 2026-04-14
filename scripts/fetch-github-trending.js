#!/usr/bin/env node
// 抓取 GitHub Trending 页面（Python/全语言），提取每日热门 AI 相关 repo
// 用法: node scripts/fetch-github-trending.js

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const LOG_FILE = path.join(ROOT, 'logs', `${TODAY}.md`);

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

// AI 相关关键词，用于过滤 trending repo
const AI_KEYWORDS = [
  'llm', 'gpt', 'claude', 'gemini', 'transformer', 'diffusion',
  'machine-learning', 'deep-learning', 'neural', 'ai', 'ml',
  'langchain', 'rag', 'agent', 'embedding', 'fine-tun', 'lora',
  'whisper', 'stable-diffusion', 'ollama', 'vllm', 'inference',
  'chatbot', 'copilot', 'openai', 'anthropic', 'huggingface',
];

function isAIRelated(repo) {
  const text = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();
  return AI_KEYWORDS.some(kw => text.includes(kw));
}

// 从 GitHub trending HTML 中提取 repo 信息
function parseTrendingHTML(html) {
  const repos = [];
  // 每个 repo 在 <article class="Box-row"> 中
  const articles = html.split(/class="Box-row"/).slice(1);

  for (const article of articles) {
    try {
      // repo 全名: /<owner>/<name>
      const nameMatch = article.match(/href="\/([^"]+?)"\s/);
      if (!nameMatch) continue;
      const fullName = nameMatch[1].replace(/\s/g, '');

      // 描述
      const descMatch = article.match(/<p[^>]*>([^<]*)<\/p>/);
      const description = descMatch ? descMatch[1].trim() : '';

      // 语言
      const langMatch = article.match(/itemprop="programmingLanguage">([^<]+)/);
      const language = langMatch ? langMatch[1].trim() : '';

      // 今日 star 增量
      const starsMatch = article.match(/([\d,]+)\s+stars\s+today/);
      const starsToday = starsMatch ? parseInt(starsMatch[1].replace(/,/g, ''), 10) : 0;

      // 总 star
      const totalStarsMatch = article.match(/\/stargazers"[^>]*>\s*([\d,]+)\s*<\/a>/);
      const totalStars = totalStarsMatch ? parseInt(totalStarsMatch[1].replace(/,/g, ''), 10) : 0;

      repos.push({
        name: fullName,
        description,
        language,
        starsToday,
        totalStars,
        url: `https://github.com/${fullName}`,
        topics: [], // trending page 不展示 topics，后续可用 API 补充
      });
    } catch {
      // skip malformed entry
    }
  }
  return repos;
}

// 用 GitHub API 补充 topics（可选，受 rate limit 限制）
async function enrichTopics(repos) {
  for (const repo of repos.slice(0, 15)) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo.name}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'promptio-pipeline',
        },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        repo.topics = data.topics || [];
      }
    } catch {
      // skip, topics are optional
    }
  }
}

async function fetchTrendingPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  fs.mkdirSync(SOURCES_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

  log('GitHub Trending: fetching daily trending repos...');
  let count = 0;

  const pages = [
    'https://github.com/trending?since=daily',
    'https://github.com/trending/python?since=daily',
    'https://github.com/trending/jupyter-notebook?since=daily',
  ];

  const allRepos = new Map(); // dedup by name

  for (const pageUrl of pages) {
    try {
      const html = await fetchTrendingPage(pageUrl);
      const repos = parseTrendingHTML(html);
      for (const repo of repos) {
        if (!allRepos.has(repo.name)) allRepos.set(repo.name, repo);
      }
      log(`  ✓ ${pageUrl.split('?')[0].split('/').pop() || 'all'}: ${repos.length} repos`);
    } catch (err) {
      log(`  ✗ ${pageUrl}: FAILED (${err.message})`);
    }
  }

  // 用 API 补充 topics 以便更好地过滤 AI 相关
  const repos = [...allRepos.values()];
  await enrichTopics(repos);

  // 过滤 AI 相关 repo
  const aiRepos = repos.filter(r => isAIRelated(r));
  log(`  Filtered: ${aiRepos.length}/${repos.length} AI-related repos`);

  for (const repo of aiRepos) {
    const hash = crypto.createHash('md5').update(repo.url).digest('hex').slice(0, 8);
    const filename = `github-trending-${hash}.md`;
    const filepath = path.join(SOURCES_DIR, filename);

    if (fs.existsSync(filepath)) continue;

    const snippet = [
      repo.description || '',
      '',
      `Stars: ${repo.totalStars} | Today: +${repo.starsToday} | Language: ${repo.language || 'unknown'}`,
      repo.topics.length ? `Topics: ${repo.topics.join(', ')}` : '',
    ].filter(Boolean).join('\n');

    const content = matter.stringify(snippet, {
      title: `${repo.name}: ${(repo.description || '').slice(0, 150)}`,
      url: repo.url,
      source: 'GitHub Trending',
      source_type: 'github-trending',
      language: 'en',
      stars: repo.totalStars,
      stars_today: repo.starsToday,
      published: TODAY,
      fetched_at: new Date().toISOString(),
    });

    fs.writeFileSync(filepath, content);
    count++;
  }

  log(`GitHub Trending: done, ${count} new AI repos saved.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
