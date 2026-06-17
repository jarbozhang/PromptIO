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
  assertPublishSurfaceSafe,
  sanitizeInternalInstructions,
  scanPublishSurface,
} from './lib/l1-replace.js';
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

const SENSITIVE_SOURCE_RULES = [
  {
    name: 'reddit',
    re: /\breddit\b|reddit\.com|\/r\/[a-z0-9_]+|reddit-r-/i,
  },
  {
    name: 'hacker-news',
    re: /\bhacker news\b|\bhacker-news\b|news\.ycombinator\.com|\bshow hn\b|\bask hn\b|\bhn\b/i,
  },
  {
    name: 'openrouter',
    re: /\bopenrouter\b|openrouter\.ai|openrouter-new-model/i,
  },
];

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
    .filter(isPublishableSource)
    .map(item => ({
      ...item,
      ...classifySource(item),
    }));

  const selected = selectSourceSummariesForPrompt(summaries, limit);

  if (!selected.length) throw new Error(`no publishable sources found in ${sourceDir}`);
  return selected;
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
    sourceType: String(parsed.data.source_type || parsed.data.type || '').trim(),
    url: String(parsed.data.url || parsed.data.link || '').trim(),
    published: String(parsed.data.published || '').trim(),
    text,
    stars: Number(parsed.data.stars || 0) || 0,
  };
}

export function sourceRisk(item) {
  const haystack = [
    item.file,
    item.title,
    item.source,
    item.sourceType,
    item.url,
    item.text,
    item.angle,
    item.reason,
    item.reach_note,
  ].filter(Boolean).join(' ');

  return SENSITIVE_SOURCE_RULES
    .filter(rule => rule.re.test(haystack))
    .map(rule => rule.name);
}

export function isPublishableSource(item) {
  return sourceRisk(item).length === 0;
}

export function filterPublishableSources(sources) {
  return sources.filter(isPublishableSource);
}

export function classifySource(item) {
  const risks = sourceRisk(item);
  const textLength = String(item.text || '').trim().length;
  const haystack = sourceHaystack(item);
  const bucket = sourceBucket(item);
  const role = sourceRole(bucket);
  const qualityScore = sourceQualityScore(item, { bucket, textLength, haystack, risks });
  const reasons = [];

  if (risks.length) reasons.push(`blocked:${risks.join(',')}`);
  if (textLength < 80) reasons.push('thin_summary');
  if (bucket === 'release') reasons.push('version_signal');
  if (bucket === 'github-repo') reasons.push('repo_signal');
  if (bucket === 'x-account') reasons.push('human_signal');
  if (bucket === 'research') reasons.push('research_depth');
  if (/openclaw|hermes|nousresearch/i.test(haystack)) reasons.push('priority_ecosystem');

  let tier = 'C';
  if (risks.length) {
    tier = 'D';
  } else if (isDirectTopicSource({ item, bucket, textLength, haystack, qualityScore })) {
    tier = 'A';
  } else if (isEvidenceSource({ bucket, textLength, haystack, qualityScore })) {
    tier = 'B';
  }

  return {
    qualityTier: tier,
    sourceBucket: bucket,
    sourceRole: role,
    qualityScore,
    qualityReasons: reasons,
  };
}

export function selectSourceSummariesForPrompt(sources, limit) {
  const annotated = sources
    .map(item => item.qualityTier ? item : { ...item, ...classifySource(item) })
    .filter(item => item.qualityTier !== 'D');

  const selected = [];
  const seen = new Set();
  const familyCounts = new Map();
  const take = (items, count, { relaxed = false } = {}) => {
    for (const item of items) {
      if (selected.length >= limit || count <= 0) break;
      if (seen.has(item.file)) continue;
      const family = sourceFamily(item);
      const familyCount = familyCounts.get(family) || 0;
      if (!relaxed && familyCount >= sourceFamilyLimit(item)) continue;
      selected.push(item);
      seen.add(item.file);
      familyCounts.set(family, familyCount + 1);
      count--;
    }
  };

  const tierA = annotated.filter(item => item.qualityTier === 'A');
  const tierB = annotated.filter(item => item.qualityTier === 'B');
  const tierC = annotated.filter(item => item.qualityTier === 'C');

  take(roundRobinByBucket(tierA), Math.min(limit, tierA.length));
  if (selected.length < limit) take(roundRobinByBucket(tierB), limit - selected.length);
  if (selected.length < limit) take(roundRobinByBucket(tierC), limit - selected.length);
  if (selected.length < limit) take(roundRobinByBucket(annotated), limit - selected.length, { relaxed: true });

  return selected;
}

export function normalizeTopicVoice(topic, source = {}) {
  const explicit = String(topic.voice || '').trim();
  const haystack = [
    topic.title,
    topic.slug,
    topic.angle,
    topic.reason,
    source.title,
    source.text,
  ].filter(Boolean).join(' ');

  if (
    explicit === 'analytical' &&
    /怎么(搭|用|做|开始|配置|接入)|workflow|工作流|教程|路线图|上手|入门|RAG|MCP|agent|Agent|交付|低代码/i.test(haystack)
  ) {
    return 'first-person';
  }

  return explicit;
}

function sourcePriority(item) {
  return baseSourcePriority(item) + sourceQualityBoost(item);
}

function baseSourcePriority(item) {
  let score = 0;
  const haystack = `${item.file} ${item.title} ${item.source} ${item.text}`.toLowerCase();
  if (/openclaw|clawhub|clawdbot|moltbot|hermes|nousresearch/.test(haystack)) score += 60;
  if (/openclaw|hermes|nousresearch/.test(haystack) && /release|releases|version|v20\d|更新|新版本|latest|readme/.test(haystack)) score += 25;
  if (/openai|anthropic|google|deepmind|github|simon|interconnects|replicate/.test(haystack)) score += 20;
  if (/codex|agent|model|llm|api|pricing|open source|developer|tool|cost|benchmark/.test(haystack)) score += 12;
  if (/github-trending/.test(item.file)) score += Math.min(20, Math.log10(Math.max(item.stars, 1)) * 8);
  if (/product-hunt|release/.test(item.file)) score -= 8;
  if (item.text.length < 80) score -= 10;
  return score;
}

function sourceQualityBoost(item) {
  const classified = item.qualityTier ? item : classifySource(item);
  if (classified.qualityTier === 'A') return 35;
  if (classified.qualityTier === 'B') return 12;
  if (classified.qualityTier === 'D') return -1000;
  return -8;
}

function sourceHaystack(item) {
  return [
    item.file,
    item.title,
    item.source,
    item.sourceType,
    item.url,
    item.text,
  ].filter(Boolean).join(' ').toLowerCase();
}

function sourceBucket(item) {
  const haystack = sourceHaystack(item);
  const sourceLine = `${item.file} ${item.source} ${item.sourceType} ${item.url}`;
  if (/github.*releases|-releases-|releases\/tag|github release|release rss|releases?$/i.test(sourceLine)) return 'release';
  if (/x-home-|home timeline/i.test(sourceLine)) return 'x-home';
  if (/^x @/i.test(item.source || '') || /^x-[^-]+-/i.test(path.basename(item.file || ''))) return 'x-account';
  if (/github-trending|source_type:\s*github|github\.com/i.test(sourceLine)) return 'github-repo';
  if (/arxiv/.test(haystack)) return 'research';
  if (/product-hunt/.test(haystack)) return 'product-discovery';
  if (/pypi/.test(haystack)) return 'ecosystem-data';
  return 'rss';
}

function sourceRole(bucket) {
  switch (bucket) {
    case 'github-repo':
      return 'fact';
    case 'release':
      return 'version';
    case 'x-account':
    case 'x-home':
      return 'angle';
    case 'research':
      return 'evidence';
    case 'product-discovery':
      return 'discovery';
    case 'ecosystem-data':
      return 'adoption';
    default:
      return 'background';
  }
}

function sourceFamily(item) {
  const bucket = item.sourceBucket || sourceBucket(item);
  const basename = path.basename(item.file || '').replace(/-[a-f0-9]{8}\.md$/i, '').replace(/\.md$/i, '');
  const githubRepo = String(item.url || '').match(/github\.com\/([^/\s]+\/[^/\s#?]+)/i)?.[1]?.toLowerCase();
  const xHandle = String(item.source || '').match(/^X\s+@(.+)$/i)?.[1]?.trim().toLowerCase();

  if (bucket === 'github-repo' && githubRepo) return `github-repo:${githubRepo}`;
  if (bucket === 'release') return `release:${githubRepo || basename}`;
  if (bucket === 'x-account') return `x-account:${xHandle || basename.replace(/-[a-f0-9]+$/i, '')}`;
  if (bucket === 'x-home') return `x-home:${basename.replace(/^x-home-/, '').replace(/-[a-f0-9]+$/i, '')}`;
  if (bucket === 'rss') return `rss:${String(item.source || basename).toLowerCase()}`;
  if (bucket === 'research') return `research:${String(item.source || 'arxiv').toLowerCase()}`;
  if (bucket === 'product-discovery') return `product:${String(item.source || basename).toLowerCase()}`;
  return `${bucket}:${String(item.source || basename).toLowerCase()}`;
}

function sourceFamilyLimit(item) {
  const bucket = item.sourceBucket || sourceBucket(item);
  switch (bucket) {
    case 'github-repo':
      return 1;
    case 'release':
      return 4;
    case 'x-account':
      return 4;
    case 'x-home':
      return 3;
    case 'rss':
      return 5;
    case 'research':
      return 12;
    case 'product-discovery':
      return 4;
    default:
      return 6;
  }
}

function sourceQualityScore(item, { bucket, textLength, haystack, risks }) {
  if (risks.length) return -100;

  let score = baseSourcePriority(item);

  if (textLength >= 700) score += 20;
  else if (textLength >= 250) score += 14;
  else if (textLength >= 100) score += 8;
  else if (textLength < 40) score -= 25;

  if (bucket === 'github-repo') score += 24;
  if (bucket === 'release') score += 20;
  if (bucket === 'research') score += 14;
  if (bucket === 'x-account') score += 12;
  if (bucket === 'x-home') score -= 4;
  if (bucket === 'product-discovery') score -= 12;

  if (/release|version|changelog|更新|新版本|latest|v\d/i.test(haystack)) score += 10;
  if (/workflow|agent|mcp|rag|codex|developer|github|api|benchmark|local|本地|工作流|交付|版本|开源/.test(haystack)) score += 10;
  if (/openclaw|hermes|nousresearch/i.test(haystack)) score += 30;
  if (/reddit|hacker news|openrouter/i.test(haystack)) score -= 100;

  return Math.round(score);
}

function isDirectTopicSource({ item, bucket, textLength, haystack, qualityScore }) {
  const stars = Number(item.stars || 0) || 0;
  if (qualityScore >= 70 && textLength >= 80) return true;
  if (bucket === 'github-repo' && (stars >= 1000 || /openclaw|hermes|nousresearch|dify|transformers|vllm/i.test(haystack))) return true;
  if (bucket === 'release' && /openclaw|hermes|nousresearch|transformers|vllm|langchain|openai|anthropic/i.test(haystack) && textLength >= 120) return true;
  if (bucket === 'x-account' && textLength >= 320 && /workflow|agent|codex|github|diff|review|mcp|rag|工作流|验证|交付|开源/i.test(haystack)) return true;
  if (bucket === 'ecosystem-data' && textLength >= 80) return true;
  return false;
}

function isEvidenceSource({ bucket, textLength, haystack, qualityScore }) {
  if (qualityScore >= 35 && textLength >= 80) return true;
  if (['release', 'research', 'x-account', 'github-repo'].includes(bucket) && textLength >= 80) return true;
  if (bucket === 'product-discovery' && textLength >= 40) return true;
  if (/official|blog|release|paper|github|文档|官方/.test(haystack) && textLength >= 120) return true;
  return false;
}

function roundRobinByBucket(items) {
  const order = [
    'github-repo',
    'release',
    'x-account',
    'research',
    'ecosystem-data',
    'product-discovery',
    'rss',
    'x-home',
  ];
  const groups = new Map();

  for (const item of items) {
    const bucket = item.sourceBucket || classifySource(item).sourceBucket;
    if (!groups.has(bucket)) groups.set(bucket, []);
    groups.get(bucket).push(item);
  }

  for (const group of groups.values()) {
    group.sort((a, b) => sourcePriority(b) - sourcePriority(a) || String(a.file).localeCompare(String(b.file)));
  }

  const keys = [
    ...order.filter(key => groups.has(key)),
    ...[...groups.keys()].filter(key => !order.includes(key)).sort(),
  ];
  const out = [];
  let progressed = true;

  while (progressed) {
    progressed = false;
    for (const key of keys) {
      const group = groups.get(key);
      if (!group?.length) continue;
      out.push(group.shift());
      progressed = true;
    }
  }

  return out;
}

export function buildSelectionPrompt({ date, count, min, max, sources }) {
  const safeSources = filterPublishableSources(sources)
    .map(item => item.qualityTier ? item : { ...item, ...classifySource(item) });
  const scoringPrompt = fs.existsSync(SCORING_PROMPT_PATH)
    ? fs.readFileSync(SCORING_PROMPT_PATH, 'utf8')
    : '';
  const sourceText = safeSources.map((item, idx) => [
    `### ${idx + 1}. ${item.title}`,
    `file: ${item.file}`,
    `source: ${item.source || 'unknown'}`,
    `quality_tier: ${item.qualityTier}`,
    `source_bucket: ${item.sourceBucket}`,
    `source_role: ${item.sourceRole}`,
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
    '      "slug": "中文可读目录名，优先接近最终标题，不要纯英文，不要纯拼音",',
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
    '- 不要选玄学、访问教程、纯拉踩标题、账号自动化违规运营教程。',
    '- 不要选择或提及 Reddit、Hacker News/HN、OpenRouter 相关来源；GitHub 来源可以正常使用。',
    '- 不要使用“外网/国内/国外/境外/海外”等二分表达，用“读者/中文读者/公开来源/官方文档/本地运行/可验证入口”等中性表达。',
    '- 优先中文读者能立刻动手的东西，尤其是工具、模型、API、省钱、开发者工作流、开源生态、openclaw/NousResearch 生态。',
    '- openclaw 或 Hermes 相关题目必须从新版本切入，覆盖解决的问题、新增能力、启发和怎么开始使用。',
    '- 使用 source 的 quality_tier 和 source_role：A 可直接选题；B 只能作为需要补官方证据的候选；C 只作背景，除非没有更强素材不要选。',
    '- source_role=fact/version 的 GitHub、release、官方文档可作事实主源；source_role=angle 的 X 内容只能提供场景和问题意识，不能替代官方事实；source_role=evidence/adoption/background 只能辅助判断。',
    '- 最终候选不要被单一来源类型占满，优先组合 fact、version、angle、evidence、adoption，让同一天文章既有项目、版本变化、方法论，也有使用场景。',
    '- 如果源材料过短但主题重要，angle 只写可执行的读者角度，例如“整理成发布前检查清单”或“先用 GitHub release 验证版本变化”，不要写内部边界规则。',
    '- angle、reason、reach_note 只能写给读者/作者看的自然选题角度，不要出现“正文必须”“源材料摘要较短”“只基于公开资料”等内部生成规则。',
    '- file 必须逐字使用 source 列表里的 file。',
    '- slug 是后续 drafts/{date}/{slug}/{slug}.md 的文件夹和文件名，必须中文可读、接近最终标题、短于 96 字符，生成后不要在写作阶段改名。',
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
    const source = byFile.get(file);
    const sanitized = {
      title: String(item.title || source.title || '').trim(),
      slug: slugify(String(item.slug || item.title || source.title || '').trim()),
      angle: sanitizeInternalInstructions(String(item.angle || '').trim()),
      reach_note: sanitizeInternalInstructions(String(item.reach_note || '').trim()),
      reason: sanitizeInternalInstructions(String(item.reason || '').trim()),
    };
    const candidate = {
      ...source,
      ...item,
      ...sanitized,
      file,
    };
    if (!isPublishableSource(candidate)) continue;
    if (scanPublishSurface([
      sanitized.title,
      sanitized.slug,
      sanitized.angle,
      sanitized.reach_note,
      sanitized.reason,
    ].filter(Boolean).join(' ')).length) continue;
    seen.add(file);
    topics.push({
      file,
      title: sanitized.title,
      slug: sanitized.slug,
      angle: sanitized.angle,
      voice: normalizeTopicVoice(item, source),
      reach: Number(item.reach || 0) || null,
      reach_note: sanitized.reach_note,
      reason: sanitized.reason,
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
  const parsed = matter(fs.readFileSync(metaPath, 'utf8'));
  const current = parsed.data || {};
  const next = {
    ...current,
    reach: Number(topic.reach || 0) || current.reach || null,
    angle: sanitizeInternalInstructions(current.angle || topic.angle || ''),
    reach_note: sanitizeInternalInstructions(topic.reach_note || current.reach_note || ''),
    selection_reason: sanitizeInternalInstructions(topic.reason || current.selection_reason || ''),
  };

  const nextMarkdown = `---\n${yaml.dump(next, {
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  }).trim()}\n---\n\n${parsed.content.trim()}\n`;
  assertPublishSurfaceSafe(nextMarkdown, `topic metadata for ${topic.slug || topic.title || metaPath}`);
  fs.writeFileSync(metaPath, nextMarkdown);
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
