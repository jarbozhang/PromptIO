#!/usr/bin/env node
// 抓取 AI 相关 PyPI 包的下载趋势，检测增速异常
// 用法: node scripts/fetch-pypi-trends.js

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from './lib/yaml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const LOG_FILE = path.join(ROOT, 'logs', `${TODAY}.md`);
const SNAPSHOT_FILE = path.join(ROOT, 'data', 'pypi-trends.json');
const SOURCES_PATH = path.join(ROOT, 'config/sources.yaml');

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function loadSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf-8'));
  } catch {
    return { packages: {}, updated_at: null };
  }
}

function saveSnapshot(snapshot) {
  fs.mkdirSync(path.dirname(SNAPSHOT_FILE), { recursive: true });
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2));
}

function getPackageList() {
  try {
    const yaml = fs.readFileSync(SOURCES_PATH, 'utf-8');
    const config = parseYaml(yaml);
    const pypiSource = (config.dev_sources || []).find(s => s.name === 'PyPI AI Package Trends');
    if (pypiSource?.packages) return pypiSource.packages;
  } catch { /* fallback */ }

  // fallback 默认列表
  return [
    'transformers', 'langchain', 'openai', 'anthropic', 'vllm',
    'llama-cpp-python', 'ollama', 'crewai', 'autogen', 'dspy-ai',
  ];
}

async function fetchPackageStats(pkg) {
  // pypistats.org API: recent downloads (last day/week/month)
  const res = await fetch(`https://pypistats.org/api/packages/${pkg}/recent`, {
    headers: { 'User-Agent': 'promptio-pipeline' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  fs.mkdirSync(SOURCES_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

  const packages = getPackageList();
  log(`PyPI Trends: checking ${packages.length} packages...`);

  const snapshot = loadSnapshot();
  const newSnapshot = { packages: {}, updated_at: new Date().toISOString() };
  const results = [];

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    // pypistats.org rate limit: 间隔 3s 避免 429
    if (i > 0) await new Promise(r => setTimeout(r, 3000));
    try {
      const stats = await fetchPackageStats(pkg);
      const recent = stats.data || {};

      const weekDownloads = recent.last_week || 0;
      const monthDownloads = recent.last_month || 0;
      const dayDownloads = recent.last_day || 0;

      // 计算周环比增长
      const prevWeek = snapshot.packages[pkg]?.last_week || 0;
      const growthPct = prevWeek > 0 ? ((weekDownloads - prevWeek) / prevWeek * 100).toFixed(1) : null;

      newSnapshot.packages[pkg] = {
        last_day: dayDownloads,
        last_week: weekDownloads,
        last_month: monthDownloads,
      };

      results.push({
        name: pkg,
        dayDownloads,
        weekDownloads,
        monthDownloads,
        growthPct,
        prevWeek,
      });

      log(`  ✓ ${pkg}: ${weekDownloads.toLocaleString()}/week${growthPct !== null ? ` (${growthPct > 0 ? '+' : ''}${growthPct}%)` : ' (first check)'}`);
    } catch (err) {
      log(`  ✗ ${pkg}: FAILED (${err.message})`);
      // 保留旧数据
      if (snapshot.packages[pkg]) {
        newSnapshot.packages[pkg] = snapshot.packages[pkg];
      }
    }
  }

  // 找出增速异常的包（周增长 > 20% 或新进 top）
  const trending = results.filter(r =>
    r.growthPct !== null && parseFloat(r.growthPct) > 20
  );

  // 所有包的趋势汇总写成一个 source 文件
  if (results.length > 0) {
    const hash = crypto.createHash('md5').update(`pypi-trends-${TODAY}`).digest('hex').slice(0, 8);
    const filename = `pypi-trends-${hash}.md`;
    const filepath = path.join(SOURCES_DIR, filename);

    if (!fs.existsSync(filepath)) {
      const table = results
        .sort((a, b) => b.weekDownloads - a.weekDownloads)
        .map(r => {
          const growth = r.growthPct !== null ? `${r.growthPct > 0 ? '+' : ''}${r.growthPct}%` : 'N/A';
          return `| ${r.name} | ${r.dayDownloads.toLocaleString()} | ${r.weekDownloads.toLocaleString()} | ${r.monthDownloads.toLocaleString()} | ${growth} |`;
        })
        .join('\n');

      const snippet = [
        '| Package | Day | Week | Month | Week Δ |',
        '|---------|-----|------|-------|--------|',
        table,
        '',
        trending.length > 0
          ? `**Trending (>20% growth):** ${trending.map(t => `${t.name} (+${t.growthPct}%)`).join(', ')}`
          : 'No significant growth anomalies detected.',
      ].join('\n');

      const content = matter.stringify(snippet, {
        title: `PyPI AI Package Trends: ${TODAY}`,
        url: 'https://pypistats.org',
        source: 'PyPI Trends',
        source_type: 'pypi-trends',
        language: 'en',
        trending_packages: trending.map(t => t.name),
        published: TODAY,
        fetched_at: new Date().toISOString(),
      });

      fs.writeFileSync(filepath, content);
      log(`  Trends summary saved to ${filename}`);
    }
  }

  // 增速异常的包单独输出
  for (const pkg of trending) {
    const hash = crypto.createHash('md5').update(`pypi-spike-${pkg.name}-${TODAY}`).digest('hex').slice(0, 8);
    const filename = `pypi-spike-${hash}.md`;
    const filepath = path.join(SOURCES_DIR, filename);

    if (fs.existsSync(filepath)) continue;

    const snippet = [
      `${pkg.name} 周下载量从 ${pkg.prevWeek.toLocaleString()} 增长到 ${pkg.weekDownloads.toLocaleString()}，增幅 ${pkg.growthPct}%。`,
      '',
      `Day: ${pkg.dayDownloads.toLocaleString()} | Week: ${pkg.weekDownloads.toLocaleString()} | Month: ${pkg.monthDownloads.toLocaleString()}`,
    ].join('\n');

    const content = matter.stringify(snippet, {
      title: `PyPI Spike: ${pkg.name} +${pkg.growthPct}% weekly downloads`,
      url: `https://pypistats.org/packages/${pkg.name}`,
      source: 'PyPI Trends',
      source_type: 'pypi-spike',
      language: 'en',
      package: pkg.name,
      growth_pct: parseFloat(pkg.growthPct),
      published: TODAY,
      fetched_at: new Date().toISOString(),
    });

    fs.writeFileSync(filepath, content);
  }

  saveSnapshot(newSnapshot);
  log(`PyPI Trends: done. ${trending.length} trending packages detected.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
