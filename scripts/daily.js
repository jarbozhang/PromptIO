import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import {
  callTextLLM,
  extractJson,
  slugify,
  run as generateSingle,
} from './single.js';
import {
  updateSourceCount,
  upsertSelectedTopic,
  markDraftReady,
  markDraftFailed,
} from './lib/run-manifest.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SCORING_PROMPT_PATH = path.join(ROOT, 'config/prompts/scoring.md');

export function usage() {
  return [
    'Usage:',
    '  node scripts/daily.js [--date YYYY-MM-DD] [options]',
    '',
    'Options:',
    '  --count <n>                  Number of drafts to generate. Default: 7',
    '  --min <n>                    Minimum accepted topic count. Default: 6',
    '  --max <n>                    Maximum accepted topic count. Default: 10',
    '  --llm-provider <anthropic|codex>',
    '  --text-model <model>',
    '  --codex-bin <path>',
    '  --codex-profile <profile>',
    '  --no-cover                   Skip cover generation for all drafts',
    '  --require-cover              Fail if any cover generation fails',
    '  --overwrite                  Pass overwrite to single-article generation',
    '  --dry-run                    Select topics only, do not generate drafts',
    '  --publish-dry-run            Generate local publish payloads after each draft',
    '  --sources-limit <n>          Max source summaries sent to selector. Default: 160',
  ].join('\n');
}

export function parseArgs(argv) {
  const args = [...argv];
  const opts = {
    date: TODAY,
    count: Number(process.env.DAILY_DRAFT_COUNT || 7),
    min: Number(process.env.DAILY_DRAFT_MIN || 6),
    max: Number(process.env.DAILY_DRAFT_MAX || 10),
    sourcesLimit: Number(process.env.DAILY_SOURCES_LIMIT || 160),
    llmProvider: process.env.LLM_PROVIDER || 'anthropic',
    textModel: '',
    codexBin: process.env.CODEX_BIN || 'codex',
    codexProfile: process.env.CODEX_PROFILE || '',
    noCover: false,
    requireCover: false,
    overwrite: false,
    dryRun: false,
    publishDryRun: false,
  };

  while (args.length) {
    const arg = args.shift();
    if (!arg) continue;

    switch (arg) {
      case '--date':
        opts.date = requireValue(args, arg);
        break;
      case '--count':
        opts.count = Number(requireValue(args, arg));
        break;
      case '--min':
        opts.min = Number(requireValue(args, arg));
        break;
      case '--max':
        opts.max = Number(requireValue(args, arg));
        break;
      case '--sources-limit':
        opts.sourcesLimit = Number(requireValue(args, arg));
        break;
      case '--llm-provider':
        opts.llmProvider = requireValue(args, arg);
        break;
      case '--text-model':
        opts.textModel = requireValue(args, arg);
        break;
      case '--codex-bin':
        opts.codexBin = requireValue(args, arg);
        break;
      case '--codex-profile':
        opts.codexProfile = requireValue(args, arg);
        break;
      case '--no-cover':
      case '--skip-cover':
        opts.noCover = true;
        break;
      case '--require-cover':
        opts.requireCover = true;
        break;
      case '--overwrite':
        opts.overwrite = true;
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--publish-dry-run':
        opts.publishDryRun = true;
        break;
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }

  validateOptions(opts);
  return opts;
}

function requireValue(args, flag) {
  const value = args.shift();
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

function validateOptions(opts) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) throw new Error('--date must be YYYY-MM-DD');
  if (!Number.isInteger(opts.count) || opts.count < 1) throw new Error('--count must be a positive integer');
  if (!Number.isInteger(opts.min) || opts.min < 1) throw new Error('--min must be a positive integer');
  if (!Number.isInteger(opts.max) || opts.max < opts.min) throw new Error('--max must be >= --min');
  if (opts.count < opts.min || opts.count > opts.max) throw new Error('--count must be between --min and --max');
  if (!Number.isInteger(opts.sourcesLimit) || opts.sourcesLimit < opts.count) {
    throw new Error('--sources-limit must be an integer >= --count');
  }

  opts.llmProvider = String(opts.llmProvider || '').toLowerCase();
  if (!['anthropic', 'codex'].includes(opts.llmProvider)) {
    throw new Error('--llm-provider must be anthropic or codex');
  }
  if (!opts.textModel && opts.llmProvider === 'codex') {
    opts.textModel = process.env.CODEX_MODEL || '';
  }
  if (!opts.textModel && opts.llmProvider === 'anthropic') {
    opts.textModel = process.env.LLM_MODEL || 'claude-sonnet-4-20250514';
  }
}

export function collectSourceSummaries(date, limit) {
  const sourceDir = path.join(ROOT, 'sources', date);
  if (!fs.existsSync(sourceDir)) throw new Error(`sources directory not found: ${sourceDir}`);

  const files = fs.readdirSync(sourceDir)
    .filter(name => name.endsWith('.md'))
    .sort()
    .map(name => path.join(sourceDir, name));

  const summaries = files
    .map(readSourceSummary)
    .filter(item => item.title && item.text)
    .sort((a, b) => sourcePriority(b) - sourcePriority(a))
    .slice(0, limit);

  if (!summaries.length) throw new Error(`no usable sources found in ${sourceDir}`);
  return summaries;
}

function readSourceSummary(filepath) {
  const raw = fs.readFileSync(filepath, 'utf8');
  const parsed = matter(raw);
  const text = parsed.content
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 900);

  return {
    file: path.relative(ROOT, filepath),
    title: String(parsed.data.title || '').trim(),
    source: String(parsed.data.source || '').trim(),
    url: String(parsed.data.url || parsed.data.link || '').trim(),
    published: String(parsed.data.published || '').trim(),
    text,
    stars: Number(parsed.data.stars || 0) || 0,
  };
}

function sourcePriority(item) {
  let score = 0;
  const haystack = `${item.file} ${item.title} ${item.source} ${item.text}`.toLowerCase();
  if (/openclaw|clawhub|clawdbot|moltbot|hermes|nousresearch/.test(haystack)) score += 60;
  if (/openai|anthropic|google|deepmind|github|hacker-news|simon|interconnects|replicate/.test(haystack)) score += 20;
  if (/codex|agent|model|llm|api|pricing|open source|developer|tool|cost|benchmark/.test(haystack)) score += 12;
  if (/github-trending|hacker-news/.test(item.file)) score += Math.min(20, Math.log10(Math.max(item.stars, 1)) * 8);
  if (/product-hunt|release/.test(item.file)) score -= 8;
  if (item.text.length < 80) score -= 10;
  return score;
}

export function buildSelectionPrompt({ date, count, min, max, sources }) {
  const scoringPrompt = fs.existsSync(SCORING_PROMPT_PATH)
    ? fs.readFileSync(SCORING_PROMPT_PATH, 'utf8')
    : '';
  const sourceText = sources.map((item, idx) => [
    `### ${idx + 1}. ${item.title}`,
    `file: ${item.file}`,
    `source: ${item.source || 'unknown'}`,
    `url: ${item.url || 'none'}`,
    `published: ${item.published || 'unknown'}`,
    '',
    item.text,
  ].join('\n')).join('\n\n');

  return [
    '你是 PromptIO 的每日选题编辑。请从当天 sources 里选出最适合生成公众号和小红书草稿的题目。',
    '',
    `日期: ${date}`,
    `目标篇数: ${count}。必须返回 ${min}-${max} 个候选，优先返回刚好 ${count} 个。`,
    '',
    '只返回 JSON，不要解释，不要 markdown code fence。',
    '',
    'JSON schema:',
    '{',
    '  "topics": [',
    '    {',
    '      "file": "sources/YYYY-MM-DD/example.md",',
    '      "title": "建议公众号标题",',
    '      "slug": "稳定文件名，中文字符和英文品牌混合的 kebab-case，不要纯拼音",',
    '      "angle": "中文写作角度，必须具体说明读者为什么要关心",',
    '      "voice": "first-person|narrative|analytical|retro",',
    '      "reach": 7,',
    '      "reach_note": "品牌/利益点/可操作的判断",',
    '      "reason": "入选理由"',
    '    }',
    '  ]',
    '}',
    '',
    '硬性规则:',
    '- 只选 REACH >= 7 的题目。',
    '- 去重，不要选同一个事实的重复来源。',
    '- 不要选玄学、境外软件访问教程、纯拉踩标题、账号自动化违规运营教程。',
    '- 优先中国 AI 用户能立刻动手的东西，尤其是工具、模型、API、省钱、开发者工作流、国产生态、openclaw/NousResearch 生态。',
    '- 如果源材料过短但主题重要，angle 里必须要求文章明确标注信息边界。',
    '- file 必须逐字使用 source 列表里的 file。',
    '- slug 是后续 drafts/{date}/{slug}/{slug}.md 的文件名，必须稳定、可读、短于 80 字符，生成后不要在写作阶段改名。',
    '',
    '--- scoring guide ---',
    scoringPrompt,
    '',
    '--- sources ---',
    sourceText,
  ].join('\n');
}

export function normalizeSelection(selection, sources, opts) {
  const byFile = new Map(sources.map(item => [item.file, item]));
  const seen = new Set();
  const topics = [];

  for (const item of selection.topics || []) {
    const file = String(item.file || '').trim();
    if (!byFile.has(file) || seen.has(file)) continue;
    seen.add(file);
    topics.push({
      file,
      title: String(item.title || byFile.get(file).title || '').trim(),
      slug: slugify(String(item.slug || item.title || byFile.get(file).title || '').trim()),
      angle: String(item.angle || '').trim(),
      voice: String(item.voice || '').trim(),
      reach: Number(item.reach || 0) || null,
      reach_note: String(item.reach_note || '').trim(),
      reason: String(item.reason || '').trim(),
    });
  }

  if (topics.length < opts.min) {
    throw new Error(`selector returned ${topics.length} usable topics, expected at least ${opts.min}`);
  }
  return topics.slice(0, opts.count);
}

function writeTopicsFile({ date, topics }) {
  fs.mkdirSync(path.join(ROOT, 'topics'), { recursive: true });
  const outPath = path.join(ROOT, 'topics', `${date}.json`);
  fs.writeFileSync(outPath, JSON.stringify({
    date,
    generated_at: new Date().toISOString(),
    topics,
  }, null, 2) + '\n');
  return outPath;
}

function appendDailyLog(date, message) {
  const logDir = path.join(ROOT, 'logs');
  fs.mkdirSync(logDir, { recursive: true });
  const ts = new Date().toISOString().slice(11, 19);
  fs.appendFileSync(path.join(logDir, `${date}.md`), `[${ts}] ${message}\n`);
}

export function recordManifestSelection({ date, sources, topics }) {
  updateSourceCount(date, sources.length);
  for (const topic of topics) upsertSelectedTopic(date, topic);
}

export function recordManifestDraftReady({ date, topic, result }) {
  markDraftReady(date, topic, result);
}

export function recordManifestDraftFailed({ date, topic, error }) {
  markDraftFailed(date, topic, error);
}

export function applyTopicMetadata(metaPath, topic) {
  const current = yaml.load(fs.readFileSync(metaPath, 'utf8')) || {};
  const next = {
    ...current,
    reach: Number(topic.reach || 0) || current.reach || null,
    reach_note: topic.reach_note || current.reach_note || '',
    selection_reason: topic.reason || current.selection_reason || '',
  };

  fs.writeFileSync(metaPath, yaml.dump(next, {
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  }));
  return next;
}

export async function run(opts) {
  const sources = collectSourceSummaries(opts.date, opts.sourcesLimit);
  const selectionRaw = await callTextLLM(buildSelectionPrompt({
    date: opts.date,
    count: opts.count,
    min: opts.min,
    max: opts.max,
    sources,
  }), opts);
  const topics = normalizeSelection(extractJson(selectionRaw), sources, opts);
  const topicsPath = writeTopicsFile({ date: opts.date, topics });
  recordManifestSelection({ date: opts.date, sources, topics });

  if (opts.dryRun) {
    appendDailyLog(opts.date, `Daily generation dry-run selected ${topics.length} topics.`);
    return { topics, topicsPath, drafts: [] };
  }

  const drafts = [];
  for (const topic of topics) {
    let result;
    try {
      result = await generateSingle({
        contentFile: path.join(ROOT, topic.file),
        angle: topic.angle,
        title: topic.title,
        slug: topic.slug,
        voice: topic.voice,
        date: opts.date,
        llmProvider: opts.llmProvider,
        textModel: opts.textModel,
        codexBin: opts.codexBin,
        codexProfile: opts.codexProfile,
        coverModel: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2',
        noCover: opts.noCover,
        requireCover: opts.requireCover,
        overwrite: opts.overwrite,
      });
      applyTopicMetadata(result.meta, topic);
    } catch (err) {
      recordManifestDraftFailed({ date: opts.date, topic, error: err });
      throw err;
    }

    recordManifestDraftReady({ date: opts.date, topic, result });
    drafts.push({ topic, ...result });

    if (opts.publishDryRun) {
      const { run: publishRun, parseArgs: parsePublishArgs } = await import('./publish.js');
      await publishRun(parsePublishArgs([result.dir, '--dry-run', '--overwrite']));
    }
  }

  appendDailyLog(opts.date, `Daily generation complete: ${drafts.length} drafts, ${path.relative(ROOT, topicsPath)}.`);
  return { topics, topicsPath, drafts };
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(usage());
    console.error(`\nERROR: ${err.message}`);
    process.exit(1);
  }

  try {
    const result = await run(opts);
    console.log(`Topics selected: ${result.topics.length} (${path.relative(ROOT, result.topicsPath)})`);
    for (const topic of result.topics) {
      console.log(`- ${topic.file} | REACH ${topic.reach || '?'} | ${topic.title}`);
    }
    if (opts.dryRun) return;

    console.log(`Drafts generated: ${result.drafts.length}`);
    for (const draft of result.drafts) {
      console.log(`- ${path.relative(ROOT, draft.dir)}`);
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
