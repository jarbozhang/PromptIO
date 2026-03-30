import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import Parser from 'rss-parser';
import matter from 'gray-matter';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from './lib/yaml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── Config ──────────────────────────────────────────────
const SOURCES_PATH = path.join(ROOT, 'config/sources.yaml');
const SCORING_PROMPT_PATH = path.join(ROOT, 'config/prompts/scoring.md');
const WECHAT_PROMPT_PATH = path.join(ROOT, 'config/prompts/wechat.md');
const LOCK_FILE = path.join(ROOT, 'pipeline.lock');

// ── Directories ─────────────────────────────────────────
const SOURCES_DIR = path.join(ROOT, 'sources', TODAY);
const TOPICS_DIR = path.join(ROOT, 'topics', TODAY);
const DRAFTS_DIR = path.join(ROOT, 'drafts', TODAY);
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
    execSync('git add -A', { cwd: ROOT, stdio: 'pipe' });
    const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf-8' });
    if (!status.trim()) {
      log('git: nothing to commit');
      return;
    }
    execSync(`git commit -m "${message}"`, { cwd: ROOT, stdio: 'pipe' });
    log(`git: committed "${message}"`);
  } catch (err) {
    log(`ERROR: git commit failed: ${err.message}`);
  }
}

// ── Phase 1: Fetch RSS ──────────────────────────────────
async function phaseFetch() {
  if (fs.existsSync(SOURCES_DIR) && fs.readdirSync(SOURCES_DIR).length > 0) {
    log('Phase 1: SKIP (sources already fetched today)');
    return;
  }

  log('Phase 1: Fetching RSS sources...');
  fs.mkdirSync(SOURCES_DIR, { recursive: true });

  const sourcesYaml = fs.readFileSync(SOURCES_PATH, 'utf-8');
  const config = parseYaml(sourcesYaml);
  const parser = new Parser({ timeout: 15000 });

  let totalItems = 0;

  for (const source of config.sources) {
    try {
      log(`  Fetching: ${source.name}`);
      const feed = await parser.parseURL(source.url);
      const items = (feed.items || []).slice(0, 20); // max 20 per source

      for (const item of items) {
        const url = item.link || '';
        if (!url) continue;

        const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
        const filename = `${slugify(source.name)}-${hash}.md`;
        const filepath = path.join(SOURCES_DIR, filename);

        // URL hash dedup
        if (fs.existsSync(filepath)) continue;

        const content = matter.stringify(
          (item.contentSnippet || item.content || '').slice(0, 2000),
          {
            title: (item.title || 'Untitled').slice(0, 200),
            url: url,
            source: source.name,
            language: source.language,
            published: item.isoDate || item.pubDate || '',
            fetched_at: new Date().toISOString(),
          }
        );

        fs.writeFileSync(filepath, content);
        totalItems++;
      }

      log(`  ✓ ${source.name}: ${items.length} items`);
    } catch (err) {
      log(`  ✗ ${source.name}: FAILED (${err.message})`);
    }
  }

  log(`Phase 1: Done. ${totalItems} new items saved.`);

  if (totalItems === 0) {
    log('Phase 1: No new items found. Pipeline ends here.');
    gitCommit(`fetch: ${TODAY} (no new items)`);
    return 'empty';
  }

  gitCommit(`fetch: ${TODAY} (${totalItems} items from ${config.sources.length} sources)`);
  return 'ok';
}

// ── Phase 2: Score & Select Topics ──────────────────────
async function phaseScore() {
  if (fs.existsSync(TOPICS_DIR) && fs.readdirSync(TOPICS_DIR).length > 0) {
    log('Phase 2: SKIP (topics already scored today)');
    return;
  }

  log('Phase 2: Scoring topics...');
  fs.mkdirSync(TOPICS_DIR, { recursive: true });

  // Read all source files from today
  const sourceFiles = fs.readdirSync(SOURCES_DIR).filter(f => f.endsWith('.md'));
  if (sourceFiles.length === 0) {
    log('Phase 2: No source files to score.');
    return 'empty';
  }

  // Build context for scoring
  const articles = sourceFiles.map(f => {
    const raw = fs.readFileSync(path.join(SOURCES_DIR, f), 'utf-8');
    const { data, content } = matter(raw);
    return { file: f, ...data, snippet: content.slice(0, 500) };
  });

  const scoringPrompt = fs.readFileSync(SCORING_PROMPT_PATH, 'utf-8');

  const articlesText = articles.map((a, i) =>
    `[${i + 1}] ${a.title}\n    Source: ${a.source} | URL: ${a.url}\n    ${a.snippet.slice(0, 200)}...`
  ).join('\n\n');

  const anthropic = new Anthropic();

  log(`  Sending ${articles.length} articles to Claude for scoring...`);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `${scoringPrompt}\n\n---\n\nArticles to score:\n\n${articlesText}`
    }]
  });

  const responseText = response.content[0].text;

  // Parse JSON from response
  let scored;
  try {
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/) || responseText.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
    scored = JSON.parse(jsonStr);
  } catch (err) {
    log(`ERROR: Failed to parse scoring response: ${err.message}`);
    log(`  Raw response (first 500 chars): ${responseText.slice(0, 500)}`);
    return 'error';
  }

  // Validate and sort
  if (!Array.isArray(scored)) {
    log('ERROR: Scoring response is not an array');
    return 'error';
  }

  scored.sort((a, b) => (b.score || 0) - (a.score || 0));
  const topN = scored.filter(s => (s.score || 0) >= 5).slice(0, 3);

  if (topN.length === 0) {
    log('Phase 2: No articles scored above threshold.');
    return 'empty';
  }

  // Write topic files
  for (let i = 0; i < topN.length; i++) {
    const topic = topN[i];
    const sourceArticle = articles[topic.index - 1] || {};
    const content = matter.stringify(
      topic.reason || '',
      {
        rank: i + 1,
        title: topic.title || sourceArticle.title || 'Untitled',
        source_url: sourceArticle.url || '',
        source_name: sourceArticle.source || '',
        score: topic.score,
        novelty: topic.novelty || 0,
        heat: topic.heat || 0,
        writability: topic.writability || 0,
        angle: topic.angle || '',
        tags: topic.tags || [],
      }
    );
    const filename = `topic-${i + 1}.md`;
    fs.writeFileSync(path.join(TOPICS_DIR, filename), content);
  }

  log(`Phase 2: Done. ${topN.length} topics selected.`);
  gitCommit(`score: ${TODAY} (${topN.length} topics, top score: ${topN[0].score})`);
  return 'ok';
}

// ── Phase 3: Generate Content ───────────────────────────
async function phaseGenerate() {
  if (fs.existsSync(DRAFTS_DIR) && fs.readdirSync(DRAFTS_DIR).length > 0) {
    log('Phase 3: SKIP (drafts already generated today)');
    return;
  }

  log('Phase 3: Generating content...');

  const topicFiles = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'));
  if (topicFiles.length === 0) {
    log('Phase 3: No topics to generate from.');
    return 'empty';
  }

  const wechatPrompt = fs.readFileSync(WECHAT_PROMPT_PATH, 'utf-8');
  const anthropic = new Anthropic();

  for (const topicFile of topicFiles) {
    const raw = fs.readFileSync(path.join(TOPICS_DIR, topicFile), 'utf-8');
    const { data: topic, content: reason } = matter(raw);

    const slug = slugify(topic.title).slice(0, 60);
    const draftDir = path.join(DRAFTS_DIR, slug);
    fs.mkdirSync(draftDir, { recursive: true });

    log(`  Generating: ${topic.title}`);

    try {
      // Generate article
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{
          role: 'user',
          content: `${wechatPrompt}\n\n---\n\nTopic:\nTitle: ${topic.title}\nSource: ${topic.source_name}\nURL: ${topic.source_url}\nAngle: ${topic.angle}\nScoring reason: ${reason}\nTags: ${(topic.tags || []).join(', ')}`
        }]
      });

      const articleText = response.content[0].text;

      // Write wechat draft
      const draft = matter.stringify(articleText, {
        title: topic.title,
        source_url: topic.source_url,
        score: topic.score,
        scoring_reason: reason.trim(),
        status: 'draft',
        platform: 'wechat',
        tags: topic.tags || [],
        created_at: new Date().toISOString(),
      });

      fs.writeFileSync(path.join(draftDir, 'wechat.md'), draft);
      log(`  ✓ ${topic.title}`);

      // Generate cover image via Gemini
      try {
        await generateCoverImage(topic.title, topic.tags, draftDir);
        log(`  ✓ Cover image generated`);
      } catch (err) {
        log(`  ✗ Cover image failed: ${err.message} (non-blocking)`);
      }
    } catch (err) {
      log(`  ✗ Generation failed for "${topic.title}": ${err.message}`);
    }
  }

  log(`Phase 3: Done.`);
  gitCommit(`generate: ${TODAY} (${topicFiles.length} drafts)`);

  // macOS notification
  notify(`Hamburg: ${topicFiles.length} 篇草稿已生成，请审核 drafts/${TODAY}/`);

  return 'ok';
}

// ── Cover Image Generation ──────────────────────────────
async function generateCoverImage(title, tags, outputDir) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY not set');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Generate a modern, minimalist cover image for a tech article titled "${title}".
Style: clean gradient background, abstract geometric shapes, no text overlay.
Color palette: deep blue, electric purple, white accents.
Mood: professional, forward-looking, tech-focused.
Tags: ${(tags || []).join(', ')}`;

  const result = await model.generateContent(prompt);
  const response = result.response;

  // If image generation is supported, save it
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(path.join(outputDir, 'cover.jpg'), buffer);
        return;
      }
    }
  }

  throw new Error('No image data in response');
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
      execSync(`osascript -e 'display notification "${message}" with title "Hamburg Pipeline"'`);
    } catch { /* non-blocking */ }
  }
}

// ── Main ────────────────────────────────────────────────
async function main() {
  console.log(`\n========== Hamburg Pipeline: ${TODAY} ==========\n`);

  fs.mkdirSync(LOGS_DIR, { recursive: true });
  log(`Pipeline started`);

  acquireLock();

  try {
    // Phase 1: Fetch
    const fetchResult = await phaseFetch();
    if (fetchResult === 'empty') {
      log('Pipeline complete (no new content).');
      return;
    }

    // Phase 2: Score
    const scoreResult = await phaseScore();
    if (scoreResult === 'empty' || scoreResult === 'error') {
      log(`Pipeline stopped at Phase 2 (${scoreResult}).`);
      return;
    }

    // Phase 3: Generate
    await phaseGenerate();

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
