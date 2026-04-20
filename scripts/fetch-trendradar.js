#!/usr/bin/env node
// 从 TrendRadar Docker 容器的 SQLite 数据库读取中文平台热点，过滤 AI 相关内容
// 依赖：TrendRadar Docker 容器已运行（/tmp/TrendRadar/output/）
// 用法: node scripts/fetch-trendradar.js

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const LOG_FILE = path.join(ROOT, 'logs', `${TODAY}.md`);
const TRENDRADAR_DB = `/tmp/TrendRadar/output/news/${TODAY}.db`;
const TRENDRADAR_DIR = '/tmp/TrendRadar';

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch {}
}

// AI 相关中英文关键词
const AI_KEYWORDS = [
  // 中文
  '大模型', '人工智能', '智能体', '机器学习', '深度学习',
  '自动驾驶', '机器人', '芯片', '算力', '训练',
  // 产品/品牌
  'DeepSeek', '深度求索', '豆包', 'Kimi', '元宝', '通义',
  'ChatGPT', 'Claude', 'OpenAI', 'Anthropic', 'Gemini',
  'Cursor', 'Copilot', 'Codex',
  // 英文通用
  'AI', 'GPT', 'LLM', 'AGI',
  // 硬件
  '英伟达', 'NVIDIA', '黄仁勋', '昇腾', 'GPU',
  // 开源/技术
  '开源', 'GitHub', 'Ollama', 'llama',
  // 应用场景
  'AI写作', 'AI绘画', 'AI视频', 'AI编程',
];

function matchesAI(title) {
  const t = title.toLowerCase();
  return AI_KEYWORDS.some(kw => t.includes(kw.toLowerCase()));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  log('TrendRadar: starting Chinese platform hot topics fetch...');

  // Step 1: 确保 TrendRadar 有当天数据，如果没有就触发一次抓取
  if (!fs.existsSync(TRENDRADAR_DB)) {
    log('  No DB for today, triggering TrendRadar crawl...');
    try {
      execSync(
        `cd ${TRENDRADAR_DIR}/docker && WEBSERVER_PORT=18080 IMMEDIATE_RUN=true RUN_MODE=once docker compose up -d trendradar`,
        { timeout: 60000 }
      );
      // 等待容器完成抓取
      for (let i = 0; i < 30; i++) {
        if (fs.existsSync(TRENDRADAR_DB)) break;
        execSync('sleep 2');
      }
    } catch (e) {
      log(`  ✗ TrendRadar crawl failed: ${e.message.split('\n')[0]}`);
      return;
    }
  }

  if (!fs.existsSync(TRENDRADAR_DB)) {
    log('  ✗ TrendRadar DB not found after crawl attempt');
    return;
  }

  ensureDir(SOURCES_DIR);

  // Step 2: 从 SQLite 读取热点数据
  let rows;
  try {
    const query = `SELECT n.title, p.name as platform, n.rank, n.url, n.first_crawl_time FROM news_items n JOIN platforms p ON n.platform_id = p.id ORDER BY n.rank ASC`;
    const raw = execSync(`sqlite3 -json "${TRENDRADAR_DB}" "${query}"`, { timeout: 10000 }).toString();
    rows = JSON.parse(raw);
  } catch (e) {
    log(`  ✗ SQLite query failed: ${e.message.split('\n')[0]}`);
    return;
  }

  log(`  Total hot topics from ${new Set(rows.map(r => r.platform)).size} platforms: ${rows.length}`);

  // Step 3: AI 关键词过滤
  const aiRows = rows.filter(r => matchesAI(r.title));
  log(`  AI-related after filtering: ${aiRows.length}`);

  // Step 4: 写入 source markdown 文件
  const existing = new Set(fs.readdirSync(SOURCES_DIR));
  let saved = 0;

  for (const row of aiRows) {
    const hash = crypto.createHash('md5').update(row.title + row.platform).digest('hex').slice(0, 8);
    const platformSlug = row.platform.replace(/\s+/g, '-').toLowerCase();
    const fname = `trendradar-${platformSlug}-${hash}.md`;

    if (existing.has(fname)) continue;

    const title = row.title.replace(/"/g, '\\"');
    const url = row.url || '';
    const md = [
      '---',
      `title: "${title}"`,
      `source: "${row.platform}热榜"`,
      `url: "${url}"`,
      `date: "${row.first_crawl_time || TODAY}"`,
      `rank: ${row.rank}`,
      '---',
      '',
      row.title,
      '',
    ].join('\n');

    fs.writeFileSync(path.join(SOURCES_DIR, fname), md);
    existing.add(fname);
    saved++;
  }

  log(`  ✓ TrendRadar: ${saved} AI-related items saved from Chinese platforms`);
}

main().catch(e => {
  log(`  ✗ TrendRadar fetch error: ${e.message}`);
  process.exit(1);
});
