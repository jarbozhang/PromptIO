import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync, execFileSync } from 'child_process';
import Parser from 'rss-parser';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from './lib/yaml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── Config ──────────────────────────────────────────────
const SOURCES_PATH = path.join(ROOT, 'config/sources.yaml');
const LOCK_FILE = path.join(ROOT, 'pipeline.lock');

// ── Load .env ───────────────────────────────────────────
loadEnv(path.join(ROOT, '.env'));

function loadEnv(filepath) {
  if (!fs.existsSync(filepath)) return;
  const lines = fs.readFileSync(filepath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── Directories ─────────────────────────────────────────
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const LOGS_DIR = path.join(ROOT, 'logs');

// ── Logging ─────────────────────────────────────────────
const LOG_FILE = path.join(LOGS_DIR, `${TODAY}.md`);

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

// ── Lock ────────────────────────────────────────────────
function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) {
    const content = fs.readFileSync(LOCK_FILE, 'utf-8');
    const pid = parseInt(content.trim(), 10);
    // Check if process is still running
    try {
      process.kill(pid, 0);
      log(`ERROR: pipeline already running (pid ${pid}). Exiting.`);
      process.exit(1);
    } catch {
      log(`WARN: stale lock found (pid ${pid}). Removing.`);
      fs.unlinkSync(LOCK_FILE);
    }
  }
  fs.writeFileSync(LOCK_FILE, String(process.pid));
}

function releaseLock() {
  if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
}

// ── Git helpers ─────────────────────────────────────────
function gitCommit(message) {
  try {
    execFileSync('git', ['add', '-A'], { cwd: ROOT, stdio: 'pipe' });
    const status = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf-8' });
    if (!status.trim()) {
      log('git: nothing to commit');
      return;
    }
    execFileSync('git', ['commit', '-m', message], { cwd: ROOT, stdio: 'pipe' });
    log(`git: committed "${message}"`);
  } catch (err) {
    log(`ERROR: git commit failed: ${err.message}`);
  }
}

// ── Phase 1: Fetch All Sources ──────────────────────────
async function phaseFetch() {
  if (fs.existsSync(SOURCES_DIR) && fs.readdirSync(SOURCES_DIR).length > 0) {
    log('Phase 1: SKIP (sources already fetched today)');
    return;
  }

  log('Phase 1: Fetching all sources...');
  fs.mkdirSync(SOURCES_DIR, { recursive: true });

  let totalItems = 0;

  // 1) RSS feeds
  totalItems += await fetchRSS();

  // 2) GitHub Trending AI repos
  totalItems += await fetchGitHubTrending();

  // 3) arXiv AI papers
  totalItems += await fetchArxiv();

  log(`Phase 1: Done. ${totalItems} new items saved.`);

  if (totalItems === 0) {
    log('Phase 1: No new items found. Pipeline ends here.');
    gitCommit(`fetch: ${TODAY} (no new items)`);
    return 'empty';
  }

  gitCommit(`fetch: ${TODAY} (${totalItems} items)`);
  return 'ok';
}

// ── Fetch: RSS ──────────────────────────────────────────
async function fetchRSS() {
  const sourcesYaml = fs.readFileSync(SOURCES_PATH, 'utf-8');
  const config = parseYaml(sourcesYaml);
  const parser = new Parser({ timeout: 15000 });
  let count = 0;

  for (const source of config.sources) {
    try {
      log(`  RSS: ${source.name}`);
      const feed = await parser.parseURL(source.url);
      const items = (feed.items || []).slice(0, 20);

      for (const item of items) {
        const url = item.link || '';
        if (!url) continue;

        const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
        const filename = `${slugify(source.name)}-${hash}.md`;
        const filepath = path.join(SOURCES_DIR, filename);

        if (fs.existsSync(filepath)) continue;

        const content = matter.stringify(
          (item.contentSnippet || item.content || '').slice(0, 2000),
          {
            title: (item.title || 'Untitled').slice(0, 200),
            url: url,
            source: source.name,
            source_type: 'rss',
            language: source.language,
            published: item.isoDate || item.pubDate || '',
            fetched_at: new Date().toISOString(),
          }
        );

        fs.writeFileSync(filepath, content);
        count++;
      }

      log(`  ✓ ${source.name}: ${items.length} items`);
    } catch (err) {
      log(`  ✗ ${source.name}: FAILED (${err.message})`);
    }
  }

  return count;
}

// ── Fetch: GitHub Trending ──────────────────────────────
async function fetchGitHubTrending() {
  log('  GitHub: Trending AI repos...');
  let count = 0;

  try {
    // Search repos created/pushed recently with AI-related topics
    const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const queries = [
      `topic:llm pushed:>${since} stars:>50`,
      `topic:ai pushed:>${since} stars:>100`,
      `topic:machine-learning pushed:>${since} stars:>100`,
    ];

    for (const q of queries) {
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=10`;
      const res = await fetchJSON(url, {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'hamburg-pipeline' }
      });

      if (!res?.items) continue;

      for (const repo of res.items) {
        const hash = crypto.createHash('md5').update(repo.html_url).digest('hex').slice(0, 8);
        const filename = `github-trending-${hash}.md`;
        const filepath = path.join(SOURCES_DIR, filename);

        if (fs.existsSync(filepath)) continue;

        const snippet = [
          repo.description || '',
          '',
          `Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count} | Language: ${repo.language || 'unknown'}`,
          `Created: ${repo.created_at?.slice(0, 10)} | Last push: ${repo.pushed_at?.slice(0, 10)}`,
          `Topics: ${(repo.topics || []).join(', ')}`,
        ].join('\n');

        const content = matter.stringify(snippet, {
          title: `${repo.full_name}: ${(repo.description || '').slice(0, 150)}`,
          url: repo.html_url,
          source: 'GitHub Trending',
          source_type: 'github',
          language: 'en',
          stars: repo.stargazers_count,
          published: repo.pushed_at || '',
          fetched_at: new Date().toISOString(),
        });

        fs.writeFileSync(filepath, content);
        count++;
      }
    }

    log(`  ✓ GitHub Trending: ${count} repos`);
  } catch (err) {
    log(`  ✗ GitHub Trending: FAILED (${err.message})`);
  }

  return count;
}

// ── Fetch: arXiv ────────────────────────────────────────
async function fetchArxiv() {
  log('  arXiv: Recent AI papers...');
  let count = 0;

  try {
    // arXiv API: search for recent AI/ML/CL papers, sorted by submission date
    const categories = 'cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG';
    const url = `http://export.arxiv.org/api/query?search_query=${categories}&sortBy=submittedDate&sortOrder=descending&max_results=20`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    // Simple XML parsing for arXiv Atom feed
    const entries = xml.split('<entry>').slice(1); // skip header

    for (const entry of entries) {
      const title = extractXML(entry, 'title')?.replace(/\s+/g, ' ').trim();
      const summary = extractXML(entry, 'summary')?.replace(/\s+/g, ' ').trim();
      const arxivId = extractXML(entry, 'id');
      const published = extractXML(entry, 'published');

      // Extract authors
      const authorMatches = entry.match(/<name>([^<]+)<\/name>/g) || [];
      const authors = authorMatches.map(m => m.replace(/<\/?name>/g, '')).slice(0, 5);

      // Extract categories
      const catMatches = entry.match(/term="([^"]+)"/g) || [];
      const cats = catMatches.map(m => m.match(/term="([^"]+)"/)?.[1]).filter(Boolean);

      if (!title || !arxivId) continue;

      const paperUrl = arxivId.replace('http://', 'https://');
      const hash = crypto.createHash('md5').update(paperUrl).digest('hex').slice(0, 8);
      const filename = `arxiv-${hash}.md`;
      const filepath = path.join(SOURCES_DIR, filename);

      if (fs.existsSync(filepath)) continue;

      const snippet = [
        summary?.slice(0, 1500) || '',
        '',
        `Authors: ${authors.join(', ')}`,
        `Categories: ${cats.join(', ')}`,
      ].join('\n');

      const content = matter.stringify(snippet, {
        title: title.slice(0, 200),
        url: paperUrl,
        source: 'arXiv',
        source_type: 'arxiv',
        language: 'en',
        authors: authors,
        categories: cats,
        published: published || '',
        fetched_at: new Date().toISOString(),
      });

      fs.writeFileSync(filepath, content);
      count++;
    }

    log(`  ✓ arXiv: ${count} papers`);
  } catch (err) {
    log(`  ✗ arXiv: FAILED (${err.message})`);
  }

  return count;
}

// ── HTTP helpers ────────────────────────────────────────
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function extractXML(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
}

// ── Utilities ───────────────────────────────────────────
function slugify(text) {
  return (text || 'untitled')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function notify(message) {
  if (process.platform === 'darwin') {
    try {
      execFileSync('osascript', ['-e', `display notification "${message.replace(/"/g, '\\"')}" with title "Hamburg Pipeline"`]);
    } catch { /* non-blocking */ }
  }
}

// ── Main ────────────────────────────────────────────────
async function main() {
  console.log(`\n========== Hamburg Pipeline: ${TODAY} ==========\n`);

  fs.mkdirSync(LOGS_DIR, { recursive: true });
  log(`Pipeline started (fetch-only, scoring/generation handled by Claude Code)`);

  acquireLock();

  try {
    await phaseFetch();
    log('Pipeline complete.');
  } catch (err) {
    log(`FATAL: ${err.message}`);
    log(err.stack);
    notify(`Hamburg Pipeline ERROR: ${err.message}`);
    throw err;
  } finally {
    releaseLock();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
