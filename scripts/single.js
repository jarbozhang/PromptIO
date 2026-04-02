#!/usr/bin/env node
/**
 * Single article generator — manual curation mode.
 * Usage: node scripts/single.js <content-file> [--angle '写作角度']
 *
 * content-file: plain text file with 1-2 articles (separated by ---)
 * --angle: optional writing angle/instruction
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import Anthropic from '@anthropic-ai/sdk';
import { titleScorer, goldQuote, summaryGen } from './lib/gates.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const DRAFTS_DIR = path.join(ROOT, 'drafts', TODAY);
const WECHAT_PROMPT_PATH = path.join(ROOT, 'config/prompts/wechat.md');

// ── Load .env ───────────────────────────────────────────
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

loadEnv(path.join(ROOT, '.env'));

const LLM_MODEL = process.env.LLM_MODEL || 'claude-sonnet-4-20250514';
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL;

function createAnthropicClient() {
  const opts = {};
  if (ANTHROPIC_BASE_URL) opts.baseURL = ANTHROPIC_BASE_URL;
  return new Anthropic(opts);
}

function slugify(text) {
  return (text || 'untitled')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// ── Parse CLI args ──────────────────────────────────────
function parseArgs(argv) {
  const args = argv.slice(2);
  let contentFile = null;
  let angle = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--angle' && i + 1 < args.length) {
      angle = args[++i];
    } else if (!contentFile) {
      contentFile = args[i];
    }
  }

  return { contentFile, angle };
}

// ── Main ────────────────────────────────────────────────
async function main() {
  const { contentFile, angle } = parseArgs(process.argv);

  if (!contentFile) {
    console.error('Usage: node scripts/single.js <content-file> [--angle "写作角度"]');
    process.exit(1);
  }

  if (!fs.existsSync(contentFile)) {
    console.error(`Error: file not found: ${contentFile}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(contentFile, 'utf-8').trim();
  if (!rawContent) {
    console.error('Error: content file is empty');
    process.exit(1);
  }

  // Split multiple articles by ---
  const articles = rawContent.split(/\n---\n/).map(a => a.trim()).filter(Boolean);
  console.log(`\n========== Hamburg Single: ${TODAY} ==========\n`);
  console.log(`  Articles: ${articles.length}`);
  if (angle) console.log(`  Angle: ${angle}`);
  console.log(`  LLM: ${LLM_MODEL} via ${ANTHROPIC_BASE_URL || 'api.anthropic.com'}\n`);

  // Build LLM prompt
  const wechatPrompt = fs.readFileSync(WECHAT_PROMPT_PATH, 'utf-8');

  let topicContext = 'Topic:\nSource: manual\n';
  if (articles.length === 1) {
    topicContext += `Content:\n${articles[0]}`;
  } else {
    topicContext += articles.map((a, i) => `Article ${i + 1}:\n${a}`).join('\n\n');
    topicContext += '\n\nInstruction: Synthesize the above articles into one cohesive article.';
  }
  if (angle) {
    topicContext += `\nWriting angle: ${angle}`;
  }

  const anthropic = createAnthropicClient();

  // Generate article
  console.log('  Generating article...');
  const response = await anthropic.messages.create({
    model: LLM_MODEL,
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: `${wechatPrompt}\n\n---\n\n${topicContext}`
    }]
  });

  const articleText = response.content?.[0]?.text;
  if (!articleText) {
    console.error('Error: LLM returned empty response');
    process.exit(1);
  }

  // Word count check
  const chineseChars = (articleText.match(/[\u4e00-\u9fff]/g) || []).length;
  if (chineseChars < 800 || chineseChars > 2200) {
    console.log(`  ⚠ Word count outside target range: ${chineseChars} Chinese chars (target: 1000-1800)`);
  } else {
    console.log(`  ✓ Word count: ${chineseChars} Chinese chars`);
  }

  // Run gates in parallel
  console.log('  Running gates...');
  const gateResults = await Promise.allSettled([
    titleScorer(articleText, anthropic, LLM_MODEL),
    goldQuote(articleText, anthropic, LLM_MODEL),
    summaryGen(articleText, anthropic, LLM_MODEL),
  ]);

  const gateFields = {};
  const gateNames = ['titleScorer', 'goldQuote', 'summaryGen'];

  for (let i = 0; i < gateResults.length; i++) {
    const result = gateResults[i];
    if (result.status === 'fulfilled') {
      Object.assign(gateFields, result.value);
      console.log(`  ✓ Gate ${gateNames[i]} succeeded`);
    } else {
      console.log(`  ✗ Gate ${gateNames[i]} failed: ${result.reason?.message || result.reason}`);
    }
  }

  // Build frontmatter
  const title = gateFields.title || 'Untitled';
  const frontmatter = {
    title,
    source: 'manual',
    score: null,
    scoring_reason: 'manual',
    status: 'draft',
    platform: 'wechat',
    tags: [],
    created_at: new Date().toISOString(),
  };

  if (gateFields.title) frontmatter.original_title = null;
  if (gateFields.title_score !== undefined) frontmatter.title_score = gateFields.title_score;
  if (gateFields.title_alternatives) frontmatter.title_alternatives = gateFields.title_alternatives;
  if (gateFields.gold_quote) frontmatter.gold_quote = gateFields.gold_quote;
  if (gateFields.summary) frontmatter.summary = gateFields.summary;
  if (angle) frontmatter.angle = angle;

  // Write draft
  const slug = slugify(title).slice(0, 60);
  const draftDir = path.join(DRAFTS_DIR, slug);
  fs.mkdirSync(draftDir, { recursive: true });

  const draft = matter.stringify(articleText, frontmatter);
  const draftPath = path.join(draftDir, 'wechat.md');
  fs.writeFileSync(draftPath, draft);

  console.log(`\n  ✓ Draft saved: ${path.relative(ROOT, draftPath)}`);
  console.log(`  Title: ${title}`);
  if (gateFields.gold_quote) console.log(`  Gold quote: ${gateFields.gold_quote}`);
  if (gateFields.summary) console.log(`  Summary: ${gateFields.summary}`);
  console.log('\nDone.');
}

main().catch(err => {
  console.error(`\nFatal: ${err.message}`);
  process.exit(1);
});
