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
  replaceSelectedTopics,
  markDraftReady,
  markDraftFailed,
} from './lib/run-manifest.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SCORING_PROMPT_PATH = path.join(ROOT, 'config/prompts/scoring.md');

export const CONTENT_LANES = [
  'developer-tooling',
  'version-update',
  'model-deployment',
  'risk-postmortem',
  'creator-workflow',
  'product-business',
  'research-security',
  'opinion-trend',
];

export const CONTENT_ARCHETYPES = [
  'hands_on_recipe',
  'version_brief',
  'failure_postmortem',
  'decision_memo',
  'trend_argument',
  'case_story',
  'buyer_guide',
  'myth_busting',
  'reference_card',
  'safety_review',
];

const CHECKLIST_ARCHETYPES = new Set(['hands_on_recipe', 'buyer_guide', 'reference_card', 'safety_review']);
const DEVELOPER_LANES = new Set(['developer-tooling', 'version-update', 'model-deployment', 'research-security']);

const AGENT_LIKE_RE = /\b(agent|agents|agentic|codex|mcp|a2a|claude code|skill|skills)\b|智能体|工作流|助手|代理/i;
const CHECKLIST_LIKE_RE = /清单|检查表|路线图|怎么(做|用|搭|选|开始)|教程|上手|步骤|最小路径|避坑/i;
const DEV_TOOL_RE = /\b(codex|mcp|sdk|api|cli|github|vllm|ollama|rag|dify|n8n|openclaw|hermes|deepseek|qwen|kimi|glm)\b|开发者|部署|本地跑|模型|仓库|开源|工作流/i;

const TITLE_PATTERN_RULES = [
  ['dont', /别再|不要再|别急着/],
  ['first', /^先|，先|先把|先看|先用|先跑/],
  ['how', /怎么|如何|怎么办|该怎么/],
  ['checklist', /清单|检查表|打勾|发布前/],
  ['local-run', /本地跑|本地部署|自托管/],
  ['agent-title', /Agent|MCP|Codex|Skill|智能体|助手/],
  ['version-update', /更新|新版|新版本|v\d|V\d|release|Release/i],
  ['dont-just', /不能只|不只是|别只|不要只/],
];

const ENTITY_RULES = [
  ['openclaw', /openclaw|clawhub|clawdbot|moltbot|molty|橙皮书/i],
  ['hermes', /hermes|nousresearch/i],
  ['codex', /codex/i],
  ['mcp', /\bmcp\b/i],
  ['dify', /dify/i],
  ['n8n', /\bn8n\b/i],
  ['ollama', /ollama/i],
  ['vllm', /vllm/i],
  ['deepseek', /deepseek/i],
  ['qwen', /qwen|通义/i],
  ['kimi', /kimi|moonshot/i],
  ['claude', /claude|anthropic/i],
  ['gemini', /gemini|google/i],
  ['openai', /openai|chatgpt/i],
  ['airllm', /airllm/i],
  ['agent-memory', /agent memory|agent 记忆|记忆系统|agents need a diary|mem0|letta|zep/i],
  ['warp-loop', /warp|triage skill|issue triage|双层 loop|双层循环/i],
];

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
    '  --topics-file <path>         Use a reviewed topics JSON file instead of selecting topics again',
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
    topicsFile: '',
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
      case '--topics-file':
        opts.topicsFile = requireValue(args, arg);
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

export function normalizeContentLane(value, fallback = 'developer-tooling') {
  const lane = String(value || '').trim();
  return CONTENT_LANES.includes(lane) ? lane : fallback;
}

export function normalizeContentArchetype(value, fallback = 'hands_on_recipe') {
  const archetype = String(value || '').trim();
  return CONTENT_ARCHETYPES.includes(archetype) ? archetype : fallback;
}

export function inferContentLane(topic = {}, source = {}) {
  const haystack = topicHaystack(topic, source);
  const bucket = source.sourceBucket || sourceBucket(source);

  if (/泄密|漏洞|安全|风险|红队|control|roadmap|sandbox|cve|leak|privacy|attack|闸门|门禁|犯错|事故|postmortem|no-mistakes/i.test(haystack)) {
    return bucket === 'research' || /论文|研究|paper|arxiv|deepmind/i.test(haystack)
      ? 'research-security'
      : 'risk-postmortem';
  }
  if (/openclaw|hermes|nousresearch|release|releases|version|changelog|更新|新版|新版本|v\d/i.test(haystack)) {
    return 'version-update';
  }
  if (/vllm|ollama|本地跑|本地部署|自托管|推理|部署|deepseek|qwen|kimi|glm|模型|gpu|cuda|server|runtime/i.test(haystack)) {
    return 'model-deployment';
  }
  if (/tts|语音|音频|视频|图像|生图|ppt|photoshop|premiere|adobe|设计|创意|内容团队|创作者|剪辑|配图|播客/i.test(haystack)) {
    return 'creator-workflow';
  }
  if (/pricing|cost|spend|预算|成本|省钱|价格|订阅|商业|产品|创业|独立开发|收入|变现|采购|额度/i.test(haystack)) {
    return 'product-business';
  }
  if (/趋势|生态|为什么|真正|开始|缺一个|提醒|信号|roadmap|未来|方向/i.test(haystack)) {
    return 'opinion-trend';
  }
  return 'developer-tooling';
}

export function inferContentArchetype(topic = {}, source = {}, lane = inferContentLane(topic, source)) {
  const haystack = topicHaystack(topic, source);
  const explicit = normalizeContentArchetype(topic.content_archetype || topic.archetype || '', '');
  if (explicit) return explicit;

  if (/犯错|泄密|漏洞|事故|别急着|踩坑|失败|风险|postmortem|leak/i.test(haystack)) return 'failure_postmortem';
  if (lane === 'version-update') return 'version_brief';
  if (lane === 'research-security') return 'safety_review';
  if (lane === 'product-business') return /怎么选|选型|采购|价格|成本|额度/i.test(haystack) ? 'buyer_guide' : 'decision_memo';
  if (lane === 'creator-workflow') return /怎么|一键|自动|上手|跑|生成|配图/i.test(haystack) ? 'hands_on_recipe' : 'case_story';
  if (lane === 'model-deployment') return /怎么选|选型|第一台|组合|哪/i.test(haystack) ? 'buyer_guide' : 'hands_on_recipe';
  if (lane === 'opinion-trend') return /别再|不是|不能只|不只是|真正|为什么/i.test(haystack) ? 'myth_busting' : 'trend_argument';
  if (/清单|检查表|发布前|打勾/i.test(haystack)) return 'reference_card';
  if (/怎么|如何|教程|上手|开始|跑通|接入|配置/i.test(haystack)) return 'hands_on_recipe';
  if (/为什么|真正|开始|信号|趋势|缺一个/i.test(haystack)) return 'trend_argument';
  return 'decision_memo';
}

function topicHaystack(topic = {}, source = {}) {
  return [
    topic.title,
    topic.slug,
    topic.angle,
    topic.reason,
    topic.reach_note,
    topic.content_lane,
    topic.content_archetype,
    topic.voice,
    source.title,
    source.source,
    source.sourceType,
    source.url,
    source.text,
  ].filter(Boolean).join(' ');
}

export function enrichTopicDiversity(topic, source = {}) {
  const contentLane = normalizeContentLane(
    topic.content_lane || topic.contentLane || topic.lane,
    inferContentLane(topic, source)
  );
  const contentArchetype = normalizeContentArchetype(
    topic.content_archetype || topic.contentArchetype || topic.archetype,
    inferContentArchetype(topic, source, contentLane)
  );
  return {
    ...topic,
    content_lane: contentLane,
    content_archetype: contentArchetype,
  };
}

export function readRecentDraftProfiles({ date, days = 7, root = ROOT } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) return [];
  const profiles = [];

  for (let offset = 1; offset <= days; offset++) {
    const day = shiftDate(date, -offset);
    const dir = path.join(root, 'drafts', day);
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const articleDir = path.join(dir, entry.name);
      const markdown = fs.readdirSync(articleDir)
        .filter(name => name.endsWith('.md'))
        .sort()[0];
      if (!markdown) continue;
      const filepath = path.join(articleDir, markdown);
      const profile = draftProfileFromMarkdown(filepath, root);
      if (profile && !scanPublishSurface(`${profile.title} ${profile.slug}`).length) {
        profiles.push(profile);
      }
    }
  }

  return profiles;
}

function shiftDate(date, deltaDays) {
  const d = new Date(`${date}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

function draftProfileFromMarkdown(filepath, root = ROOT) {
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    const parsed = matter(raw);
    const content = parsed.content || '';
    const title = String(parsed.data.title || headingFromMarkdown(content) || path.basename(filepath, '.md')).trim();
    const h2s = [...content.matchAll(/^##\s+(.+)$/gm)].map(match => match[1].trim());
    return topicProfile({
      title,
      slug: path.basename(path.dirname(filepath)),
      angle: String(parsed.data.angle || ''),
      content_lane: parsed.data.content_lane,
      content_archetype: parsed.data.content_archetype,
      h2s,
      text: content.slice(0, 1200),
      date: parsed.data.date || path.basename(path.dirname(path.dirname(filepath))),
      file: path.relative(root, filepath).split(path.sep).join('/'),
    });
  } catch {
    return null;
  }
}

function headingFromMarkdown(markdown) {
  const match = String(markdown || '').match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

export function topicProfile(topic = {}, source = {}) {
  const enriched = enrichTopicDiversity(topic, source);
  const haystack = topicHaystack(enriched, source);
  return {
    file: topic.file || '',
    date: topic.date || '',
    title: String(topic.title || source.title || '').trim(),
    slug: String(topic.slug || '').trim(),
    angle: String(topic.angle || '').trim(),
    content_lane: enriched.content_lane,
    content_archetype: enriched.content_archetype,
    entities: extractEntities(haystack),
    title_patterns: extractTitlePatterns(topic.title || source.title || ''),
    agent_like: AGENT_LIKE_RE.test(haystack),
    checklist_like: CHECKLIST_LIKE_RE.test(haystack) || CHECKLIST_ARCHETYPES.has(enriched.content_archetype),
    developer_like: DEV_TOOL_RE.test(haystack) || DEVELOPER_LANES.has(enriched.content_lane),
    tokens: textTokens([
      topic.title,
      topic.slug,
      topic.angle,
      topic.reason,
      topic.reach_note,
      ...(topic.h2s || []),
      topic.text,
      source.title,
      source.text,
    ].filter(Boolean).join(' ')),
  };
}

function extractEntities(text) {
  return ENTITY_RULES
    .filter(([, re]) => re.test(text))
    .map(([name]) => name);
}

function extractTitlePatterns(title) {
  return TITLE_PATTERN_RULES
    .filter(([, re]) => re.test(String(title || '')))
    .map(([name]) => name);
}

function textTokens(text) {
  const normalized = String(text || '').toLowerCase();
  const words = normalized.match(/[a-z0-9][a-z0-9.+#_-]{1,}/g) || [];
  const cjk = [...normalized.matchAll(/[\u4e00-\u9fff]/g)].map(match => match[0]);
  const cjkBigrams = [];
  for (let i = 0; i < cjk.length - 1; i++) cjkBigrams.push(`${cjk[i]}${cjk[i + 1]}`);
  return new Set([
    ...words.filter(word => !['the', 'and', 'for', 'with', 'from'].includes(word)),
    ...cjkBigrams,
  ]);
}

function jaccard(a, b) {
  if (!a?.size || !b?.size) return 0;
  let overlap = 0;
  for (const item of a) if (b.has(item)) overlap++;
  return overlap / (a.size + b.size - overlap);
}

export function diversityDiagnostics(topic, { recentProfiles = [], selectedProfiles = [], count = 7 } = {}) {
  const profile = topic.tokens ? topic : topicProfile(topic);
  const selectedLaneCount = selectedProfiles.filter(item => item.content_lane === profile.content_lane).length;
  const selectedArchetypeCount = selectedProfiles.filter(item => item.content_archetype === profile.content_archetype).length;
  const selectedEntityOverlap = selectedProfiles.some(item => intersects(item.entities, profile.entities));
  const selectedPatternOverlap = selectedProfiles.some(item => intersects(item.title_patterns, profile.title_patterns));
  const selectedAgentCount = selectedProfiles.filter(item => item.agent_like).length;
  const selectedChecklistCount = selectedProfiles.filter(item => item.checklist_like).length;
  const selectedDeveloperCount = selectedProfiles.filter(item => item.developer_like).length;
  const maxRecentSimilarity = Math.max(0, ...recentProfiles.map(item => jaccard(profile.tokens, item.tokens)));
  const recentEntityCount = recentProfiles.filter(item => intersects(item.entities, profile.entities)).length;
  const recentPatternCount = recentProfiles.filter(item => intersects(item.title_patterns, profile.title_patterns)).length;
  const warnings = [];
  let penalty = 0;

  if (selectedLaneCount >= 2) {
    penalty += 28;
    warnings.push(`lane_repeat:${profile.content_lane}`);
  }
  if (selectedArchetypeCount >= 2) {
    penalty += 24;
    warnings.push(`archetype_repeat:${profile.content_archetype}`);
  }
  if (selectedEntityOverlap) {
    penalty += 36;
    warnings.push('same_entity_in_batch');
  }
  if (selectedPatternOverlap) {
    penalty += 12;
    warnings.push('title_pattern_repeat_in_batch');
  }
  if (profile.agent_like && selectedAgentCount >= Math.min(3, Math.ceil(count * 0.45))) {
    penalty += 42;
    warnings.push('agent_like_daily_cap');
  }
  if (profile.checklist_like && selectedChecklistCount >= Math.min(3, Math.ceil(count * 0.5))) {
    penalty += 34;
    warnings.push('checklist_daily_cap');
  }
  if (profile.developer_like && selectedDeveloperCount >= Math.max(1, count - 2)) {
    penalty += 46;
    warnings.push('developer_lane_daily_cap');
  }
  if (maxRecentSimilarity >= 0.34) {
    penalty += Math.round(maxRecentSimilarity * 100);
    warnings.push(`recent_similarity:${maxRecentSimilarity.toFixed(2)}`);
  }
  if (recentEntityCount >= 2 && profile.entities.length) {
    penalty += 16;
    warnings.push('recent_entity_saturation');
  }
  if (recentPatternCount >= 3 && profile.title_patterns.length) {
    penalty += 10;
    warnings.push('recent_title_pattern_saturation');
  }

  return {
    ...profile,
    penalty,
    warnings,
    max_recent_similarity: Number(maxRecentSimilarity.toFixed(3)),
  };
}

function intersects(a = [], b = []) {
  return a.some(item => b.includes(item));
}

export function selectDiverseTopics(candidates, { count, recentProfiles = [] } = {}) {
  const remaining = candidates.map((topic, index) => ({
    topic,
    index,
    profile: topicProfile(topic),
  }));
  const selected = [];
  const selectedProfiles = [];

  while (remaining.length && selected.length < count) {
    let bestIndex = 0;
    let bestScore = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const item = remaining[i];
      const diagnostics = diversityDiagnostics(item.profile, {
        recentProfiles,
        selectedProfiles,
        count,
      });
      const reachBonus = Number(item.topic.reach || 0) >= 9 ? -0.05 : 0;
      const score = diagnostics.penalty + item.index * 0.001 + reachBonus;
      if (score < bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    const [choice] = remaining.splice(bestIndex, 1);
    const diagnostics = diversityDiagnostics(choice.profile, {
      recentProfiles,
      selectedProfiles,
      count,
    });
    selected.push({
      ...choice.topic,
      diversity_note: diagnostics.warnings.join(','),
      diversity_penalty: diagnostics.penalty,
      recent_similarity: diagnostics.max_recent_similarity,
    });
    selectedProfiles.push(choice.profile);
  }

  return selected;
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
  if (/sopilot-hot|sopilot hot tweets|sopilot-hot-tweet/i.test(sourceLine)) return 'sopilot-hot';
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
    case 'sopilot-hot':
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
  if (bucket === 'sopilot-hot') return `sopilot-hot:${String(item.url || basename).match(/status\/(\d+)/)?.[1] || basename}`;
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
    case 'sopilot-hot':
      return 8;
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
  if (bucket === 'sopilot-hot') score += 16;
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
  if (['x-account', 'sopilot-hot'].includes(bucket) && textLength >= 320 && /workflow|agent|codex|github|diff|review|mcp|rag|工作流|验证|交付|开源/i.test(haystack)) return true;
  if (bucket === 'ecosystem-data' && textLength >= 80) return true;
  return false;
}

function isEvidenceSource({ bucket, textLength, haystack, qualityScore }) {
  if (qualityScore >= 35 && textLength >= 80) return true;
  if (['release', 'research', 'x-account', 'sopilot-hot', 'github-repo'].includes(bucket) && textLength >= 80) return true;
  if (bucket === 'product-discovery' && textLength >= 40) return true;
  if (/official|blog|release|paper|github|文档|官方/.test(haystack) && textLength >= 120) return true;
  return false;
}

function roundRobinByBucket(items) {
  const order = [
    'github-repo',
    'release',
    'sopilot-hot',
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
    `content_lane_hint: ${inferContentLane({}, item)}`,
    `content_archetype_hint: ${inferContentArchetype({}, item)}`,
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
    '      "content_lane": "developer-tooling|version-update|model-deployment|risk-postmortem|creator-workflow|product-business|research-security|opinion-trend",',
    '      "content_archetype": "hands_on_recipe|version_brief|failure_postmortem|decision_memo|trend_argument|case_story|buyer_guide|myth_busting|reference_card|safety_review",',
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
    '- 同一天不要选择同一实体/同一产品线的两篇文章；例如 Hermes Agent 和 Hermes Studio 通常应合并成一篇版本解读，除非两个题目都有独立事实主源且读者行动完全不同。',
    '- 不要选玄学、访问教程、纯拉踩标题、账号自动化违规运营教程。',
    '- 不要选择或提及 Reddit、Hacker News/HN、OpenRouter 相关来源；GitHub 来源可以正常使用。',
    '- 不要使用“外网/国内/国外/境外/海外”等二分表达，用“读者/中文读者/公开来源/官方文档/本地运行/可验证入口”等中性表达。',
    '- 优先中文读者能立刻动手的东西，尤其是工具、模型、API、省钱、开发者工作流、开源生态、openclaw/NousResearch 生态。',
    '- openclaw 或 Hermes 相关题目必须从新版本切入，覆盖解决的问题、新增能力、启发和怎么开始使用。',
    '- 使用 source 的 quality_tier 和 source_role：A 可直接选题；B 只能作为需要补官方证据的候选；C 只作背景，除非没有更强素材不要选。',
    '- source_role=fact/version 的 GitHub、release、官方文档可作事实主源；source_role=angle 的 X/SoPilot 热帖及评论只能提供场景、热度和问题意识，不能替代官方事实；source_role=evidence/adoption/background 只能辅助判断。',
    '- 最终候选不要被单一来源类型占满，优先组合 fact、version、angle、evidence、adoption，让同一天文章既有项目、版本变化、方法论，也有使用场景。',
    '- 最终候选也不要被单一内容版型占满。每天优先覆盖 4 种以上 content_lane，至少 4 种 content_archetype；工具配方/检查清单最多 3 篇。',
    '- 同一天标题或主角里 Agent/Codex/MCP/Skill/工作流/助手 相关最多 3 篇；开发者工具/部署/模型类最多占 count-2 篇，至少留 2 篇给创作者、产品商业、风险复盘、趋势观点或普通用户场景。',
    '- 不要把所有文章都写成“问题 → 工具 → 清单 → 下一步”。根据 content_archetype 改结构：version_brief 写版本变化，failure_postmortem 写事故/根因/修复，decision_memo 写取舍，trend_argument 写判断，case_story 写场景链条，buyer_guide 写选型，myth_busting 写反常识。',
    '- 使用 source 的 content_lane_hint 和 content_archetype_hint 作为参考，但可以根据你的标题和角度调整；调整的目的只能是让当天选题更分散，不是规避事实。',
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
    const enriched = enrichTopicDiversity(candidate, source);
    if (!isPublishableSource(candidate)) continue;
    if (scanPublishSurface([
      sanitized.title,
      sanitized.slug,
      sanitized.angle,
      sanitized.reach_note,
      sanitized.reason,
      enriched.content_lane,
      enriched.content_archetype,
    ].filter(Boolean).join(' ')).length) continue;
    seen.add(file);
    topics.push({
      file,
      title: sanitized.title,
      slug: sanitized.slug,
      angle: sanitized.angle,
      voice: normalizeTopicVoice(item, source),
      content_lane: enriched.content_lane,
      content_archetype: enriched.content_archetype,
      reach: Number(item.reach || 0) || null,
      reach_note: sanitized.reach_note,
      reason: sanitized.reason,
    });
  }

  if (topics.length < opts.min) {
    throw new Error(`selector returned ${topics.length} usable topics, expected at least ${opts.min}`);
  }
  const recentProfiles = readRecentDraftProfiles({ date: opts.date, days: 7 });
  return selectDiverseTopics(topics, {
    count: opts.count,
    recentProfiles,
  });
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

function readTopicsFile(filepath) {
  const resolved = path.isAbsolute(filepath) ? filepath : path.join(ROOT, filepath);
  if (!fs.existsSync(resolved)) throw new Error(`topics file not found: ${filepath}`);
  const parsed = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  if (!Array.isArray(parsed.topics)) throw new Error(`topics file must contain a topics array: ${filepath}`);
  return parsed;
}

function appendDailyLog(date, message) {
  const logDir = path.join(ROOT, 'logs');
  fs.mkdirSync(logDir, { recursive: true });
  const ts = new Date().toISOString().slice(11, 19);
  fs.appendFileSync(path.join(logDir, `${date}.md`), `[${ts}] ${message}\n`);
}

export function recordManifestSelection({ date, sources, topics }) {
  updateSourceCount(date, sources.length);
  replaceSelectedTopics(date, topics);
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
    content_lane: topic.content_lane || current.content_lane || '',
    content_archetype: topic.content_archetype || current.content_archetype || '',
    diversity_note: sanitizeInternalInstructions(topic.diversity_note || current.diversity_note || ''),
    recent_similarity: topic.recent_similarity ?? current.recent_similarity ?? null,
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
  const selection = opts.topicsFile
    ? readTopicsFile(opts.topicsFile)
    : extractJson(await callTextLLM(buildSelectionPrompt({
      date: opts.date,
      count: opts.count,
      min: opts.min,
      max: opts.max,
      sources,
    }), opts));
  const topics = normalizeSelection(selection, sources, opts);
  const topicsPath = writeTopicsFile({ date: opts.date, topics });
  recordManifestSelection({ date: opts.date, sources, topics });

  if (opts.dryRun) {
    const source = opts.topicsFile ? `reviewed topics file ${path.relative(ROOT, path.resolve(ROOT, opts.topicsFile))}` : 'selector';
    appendDailyLog(opts.date, `Daily generation dry-run selected ${topics.length} topics via ${source}.`);
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
        contentLane: topic.content_lane,
        contentArchetype: topic.content_archetype,
        diversityNote: topic.diversity_note,
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
