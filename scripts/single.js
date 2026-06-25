import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import {
  assertPublishSurfaceSafe,
  sanitizeInternalInstructions,
} from './lib/l1-replace.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const WECHAT_PROMPT_PATH = path.join(ROOT, 'config/prompts/wechat.md');
const XHS_PROMPT_PATH = path.join(ROOT, 'config/prompts/xhs-compliant.md');

loadEnv(path.join(ROOT, '.env'));

export function usage() {
  return [
    'Usage:',
    '  node scripts/single.js <article-file> [--angle "写作角度"] [--title "标题"] [--slug "文件名"] [options]',
    '',
    'Options:',
    '  --voice <first-person|narrative|analytical|retro>',
    '  --content-lane <lane>         Daily diversity lane from selector',
    '  --content-archetype <type>    Article structure archetype from selector',
    '  --diversity-note <text>       Similarity warnings from daily selector',
    '  --date <YYYY-MM-DD>',
    '  --llm-provider <anthropic|codex>',
    '  --text-model <model>',
    '  --codex-bin <path>          Default: CODEX_BIN or codex',
    '  --codex-profile <profile>   Optional Codex CLI profile',
    '  --cover-model <model>        Default: OPENAI_IMAGE_MODEL or gpt-image-2',
    '  --no-cover                   Only generate drafts, skip cover image',
    '  --require-cover              Exit non-zero if cover image generation fails',
    '  --overwrite                  Reuse the same draft directory if it already exists',
  ].join('\n');
}

export function parseArgs(argv) {
  const args = [...argv];
  const opts = {
    angle: '',
    title: '',
    slug: '',
    voice: '',
    contentLane: '',
    contentArchetype: '',
    diversityNote: '',
    date: TODAY,
    llmProvider: process.env.LLM_PROVIDER || 'anthropic',
    textModel: '',
    codexBin: process.env.CODEX_BIN || 'codex',
    codexProfile: process.env.CODEX_PROFILE || '',
    coverModel: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2',
    noCover: false,
    requireCover: false,
    overwrite: false,
  };

  while (args.length) {
    const arg = args.shift();
    if (!arg) continue;

    if (!arg.startsWith('--') && !opts.contentFile) {
      opts.contentFile = arg;
      continue;
    }

    switch (arg) {
      case '--angle':
        opts.angle = requireValue(args, arg);
        break;
      case '--title':
        opts.title = requireValue(args, arg);
        break;
      case '--slug':
        opts.slug = requireValue(args, arg);
        break;
      case '--voice':
        opts.voice = requireValue(args, arg);
        break;
      case '--content-lane':
        opts.contentLane = requireValue(args, arg);
        break;
      case '--content-archetype':
        opts.contentArchetype = requireValue(args, arg);
        break;
      case '--diversity-note':
        opts.diversityNote = requireValue(args, arg);
        break;
      case '--date':
        opts.date = requireValue(args, arg);
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
      case '--cover-model':
        opts.coverModel = requireValue(args, arg);
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
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }

  if (!opts.contentFile) throw new Error('missing article-file');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) {
    throw new Error('--date must be YYYY-MM-DD');
  }
  if (opts.voice && !['first-person', 'narrative', 'analytical', 'retro'].includes(opts.voice)) {
    throw new Error('--voice must be first-person, narrative, analytical, or retro');
  }
  if (opts.contentArchetype && ![
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
  ].includes(opts.contentArchetype)) {
    throw new Error('--content-archetype is not supported');
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

  return opts;
}

function requireValue(args, flag) {
  const value = args.shift();
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

function loadEnv(filepath) {
  if (!fs.existsSync(filepath)) return;
  const lines = fs.readFileSync(filepath, 'utf8').split('\n');
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

export function slugify(text) {
  return safeFileBasename(text, 'manual article');
}

export function hasCjk(text) {
  return /[\u4e00-\u9fff]/.test(String(text || ''));
}

export function chooseDraftSlug({ requestedSlug, generatedSlug, title }) {
  const requested = requestedSlug ? safeFileBasename(requestedSlug, '') : '';
  const generated = generatedSlug ? safeFileBasename(generatedSlug, '') : '';
  const titled = title ? safeFileBasename(title, '') : '';

  if (hasCjk(titled)) return titled;
  if (hasCjk(generated)) return generated;
  if (hasCjk(requested)) return requested;
  return requested || generated || titled || 'manual-article';
}

export function safeFileBasename(text, fallback = 'manual article') {
  let value = String(text || fallback || '').trim();
  const replacements = {
    '/': '／',
    '\\': '＼',
    ':': '：',
    '*': '＊',
    '?': '？',
    '"': "'",
    '<': '＜',
    '>': '＞',
    '|': '｜',
  };
  for (const [source, target] of Object.entries(replacements)) {
    value = value.split(source).join(target);
  }
  value = value
    .replace(/[\x00-\x1f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[. ]+|[. ]+$/g, '');
  return Array.from(value || fallback || 'manual article').slice(0, 96).join('');
}

export function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').trim();
}

export function normalizeMarkdown(markdown, fallbackTitle) {
  const body = stripFrontmatter(String(markdown || '').trim());
  if (!body.startsWith('# ')) return `# ${fallbackTitle}\n\n${body}`.trim() + '\n';
  return body.replace(/^#\s+.+$/m, `# ${fallbackTitle}`).trim() + '\n';
}

export function extractJson(text) {
  const raw = String(text || '').trim();
  const jsonFenced = raw.match(/```json\s*([\s\S]*?)```/i);
  const candidates = [];
  if (jsonFenced) candidates.push(jsonFenced[1].trim());
  candidates.push(raw);
  const objectText = extractJsonObject(raw);
  if (objectText) candidates.push(objectText);

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return JSON.parse(candidate);
    } catch {
      // Try the next candidate. LLMs sometimes include non-JSON code fences from source material.
    }
  }

  throw new Error('LLM response did not contain valid JSON');
}

function extractJsonObject(text) {
  const raw = String(text || '');
  const start = raw.indexOf('{');
  if (start === -1) return '';

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
    } else if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return raw.slice(start, i + 1);
    }
  }

  return '';
}

export function readArticle(filepath) {
  if (!fs.existsSync(filepath)) throw new Error(`file not found: ${filepath}`);
  const raw = fs.readFileSync(filepath, 'utf8');
  if (!raw.trim()) throw new Error(`content file is empty: ${filepath}`);

  const parsed = matter(raw);
  const content = parsed.content.trim();
  if (!content) throw new Error(`content file is empty: ${filepath}`);

  return {
    filepath,
    frontmatter: parsed.data || {},
    content,
    sections: splitArticles(content),
  };
}

function splitArticles(content) {
  const parts = content
    .split(/\n\s*---\s*\n/g)
    .map(part => part.trim())
    .filter(Boolean);
  return parts.length ? parts : [content.trim()];
}

export function buildGenerationPrompt({
  article,
  angle,
  title,
  slug,
  voice,
  contentLane = '',
  contentArchetype = '',
  diversityNote = '',
}) {
  const wechatPrompt = fs.readFileSync(WECHAT_PROMPT_PATH, 'utf8');
  const xhsPrompt = fs.existsSync(XHS_PROMPT_PATH)
    ? fs.readFileSync(XHS_PROMPT_PATH, 'utf8')
    : '';
  const archetypeGuide = articleArchetypeGuide(contentArchetype);
  const sourceTitle = title || article.frontmatter.title || '';
  const sourceUrl = article.frontmatter.url || article.frontmatter.link || '';
  const sourceName = article.frontmatter.source || 'manual';
  const sourceContext = article.sections
    .map((section, idx) => `### Source ${idx + 1}\n\n${section}`)
    .join('\n\n');

  return [
    '你是 PromptIO 的中文内容生成代理。用户已经指定了一篇文章作为源材料，你要生成一份可同时用于公众号和小红书的主稿。',
    '',
    '必须只返回 JSON，不要解释，不要使用 markdown code fence。',
    '',
    'JSON schema:',
    '{',
    '  "title": "默认主标题，必须按小红书标题要求生成，可同时作为公众号标题",',
    '  "slug": "中文可读目录名，优先接近最终标题，不要纯英文，不要纯拼音",',
    '  "reach": 1,',
    '  "tags": ["tag"],',
    '  "wechat": "# 标题\\n\\n主稿 markdown",',
    '  "wechat_title": "可选，公众号备用标题；没有更合适标题时留空",',
    '  "xhs_title": "小红书发布标题，默认应与 title 完全一致",',
    '  "cover_prompt": "给 gpt-image-2 的英文封面图提示词，不要让图中出现任何文字"',
    '}',
    '',
    '主稿要求:',
    '- 严格遵守下面的 wechat.md 写作规范。',
    '- 以 H1 开头，不要 YAML frontmatter。',
    '- 结尾包含相关链接 section 和 REACH 注释。',
    '- 事实必须来自源材料，不能编造实测、价格、发布日期或社区反馈。',
    '- 如果源材料不足以支撑亲测视角，不要写成亲测，改用 narrative 或 analytical。',
    '- 内部写作约束不能进入正文。不要把“只按公开仓库摘要能确认的信息写 / 不补实测结果 / 不编安装参数 / 必须明确标注信息边界 / 不要写成连续说明文”等 prompt 规则写给读者。',
    '- 不要使用“这篇不写 / 我这篇不写成 / 我没有把它写成 / 先说明边界 / 本文只基于公开信息”等元叙事句式。需要说明边界时，改成自然表达，例如“信息来自 GitHub 仓库、发布说明和官方文档，落地前先按最小路径验证”。',
    '- 小红书正文是默认主稿，不要先写公众号稿再派生小红书稿。',
    '- 不要出现小红书禁区，不要教境外访问方法，不要写加微信/私信/评论区蹲/求收藏。',
    '- 最终可见内容、标题、链接和 frontmatter 不能出现 Reddit、Hacker News/HN、OpenRouter。',
    '- 不要使用“外网/国内/国外/境外/海外”等二分表达，用“读者/中文读者/公开来源/官方文档/本地运行/可验证入口”等中性表达。',
    '- 字面黑名单：外网、国内、国外、境外、海外。标题、正文、链接说明、风险提示、否定句和引用原文里都不能出现这些词。',
    '- 保留关键信息、行动建议和风险边界；不要写“本文为 AI 辅助整理”“不是实测”“不是假装跑完”等元叙事。',
    '- 按小红书高流量结构写，前 3 段先回答读者收益，但不要把每篇都写成同一个“问题 → 工具 → 清单 → 下一步”模板。',
    '- 正文至少有 3 个 ## 二级标题，二级标题必须服务本篇版型；不要每篇都使用“先把/先看/这里最容易踩坑/从一个最小任务开始”。',
    '- 只有 hands_on_recipe、buyer_guide、reference_card、safety_review 这类本来适合收藏的版型才必须有清单或步骤。version_brief、failure_postmortem、decision_memo、trend_argument、case_story、myth_busting 可以不用清单，改用版本变化表、事故链条、取舍备忘录、判断段、场景故事或反常识论证。',
    '- 工具、教程、工作流、路线图、选型、交付类文章不能写成连续说明文，但版面层级不等于清单堆叠。每篇只保留一种主结构。',
    '- 如果本篇版型需要清单，至少 1 个可收藏清单或步骤清单必须服务具体对象；如果本篇版型不需要清单，不要为了凑格式硬塞。',
    '- 二级标题必须写成读者任务，例如“选一个最小场景”“把验证路径压到一个任务”，不要写成“RAG”“MCP”“模型接入”这种概念目录。',
    '- 不要复用“今晚可以这样...”“今晚能做什么”“今晚想动手”这类模板化行动标题或段落。行动段标题必须贴合本篇对象，例如验证长期记忆、保留 reset、跑一个收件箱 workflow、检查免费额度失败兜底。',
    '- 英文项目名和技术词不要占据主钩子，必须翻译成中文读者关心的具体场景。',
    '- 如果主题涉及 openclaw 或 Hermes，必须重点写新版本解决了哪些问题、新增了哪些功能、对 agent 应用有什么启发、读者怎么开始使用。',
    '- 保存前做一次去 AI 味终审，删掉模板化开头、总结腔、清单堆叠、假装亲测、重复动作描写和“本文将介绍”式过渡。尤其检查：这篇是否像最近几天同一个 agent 写出的兄弟篇；如果像，优先换入口、换 H2 骨架、换收尾，而不是只换词。',
    '',
    '本篇多样性约束:',
    `- content_lane: ${contentLane || '未指定，按素材选择但不要默认都写成开发者工具'}`,
    `- content_archetype: ${contentArchetype || '未指定，按素材选择一种主版型'}`,
    `- diversity_note: ${diversityNote || '无'}`,
    archetypeGuide,
    '',
    '小红书发布标题要求:',
    '- title 和 xhs_title 都按小红书发布标题写；除非用户指定，否则二者应完全一致。',
    '- 不需要限制到 10 个字或 20 个字。',
    '- 可以比公众号标题更口语，但必须完整表达主题。',
    '- 不要标题党、不要拉踩、不要引流求互动。',
    '- 标题前 18 个字优先出现中文场景或收益，再出现 Dify、RAG、MCP、Agent 等技术词。',
    '',
    '公众号封面图要求:',
    '- cover_prompt 用英文写给 gpt-image-2。',
    '- 横向科技媒体封面，适合微信公众号 900x383 最终裁切。',
    '- 不要生成任何可读文字、logo、二维码或 UI 截图。',
    '- 画面要具体体现文章主题，不要纯抽象渐变。',
    '',
    `指定标题: ${sourceTitle || '(未指定)'}`,
    `指定 slug: ${slug || '(未指定)'}`,
    `指定角度: ${angle || 'Manual selection, choose the most actionable angle.'}`,
    `指定 voice: ${voice || '由内容自动选择 first-person/narrative/analytical/retro 中最合适的一种'}`,
    `指定 content_lane: ${contentLane || '(未指定)'}`,
    `指定 content_archetype: ${contentArchetype || '(未指定)'}`,
    `来源: ${sourceName}`,
    `URL: ${sourceUrl || '(none)'}`,
    '',
    '--- wechat.md ---',
    wechatPrompt,
    '',
    '--- xhs compliance guide ---',
    xhsPrompt,
    '',
    '--- source materials ---',
    sourceContext,
  ].join('\n');
}

function articleArchetypeGuide(archetype) {
  switch (archetype) {
    case 'version_brief':
      return [
        '- 本篇按“版本解读型”写。主结构是：旧问题 → 新版本改了什么 → 哪些能力变得可用 → 适合谁升级/验证。',
        '- 可以用小表格或要点列版本变化，但不要把全文写成通用检查清单。',
        '- openclaw/Hermes 题必须重点写解决的问题、新增功能、启发和怎么开始使用。',
      ].join('\n');
    case 'failure_postmortem':
      return [
        '- 本篇按“失败复盘/风险提醒型”写。主结构是：问题现场 → 根因拆解 → 为什么常见方案不够 → 修复动作。',
        '- 不要写成工具种草；重点放在读者如何避免同类错误。',
        '- 结尾可以给一张事故卡片，而不是下一步教程。',
      ].join('\n');
    case 'decision_memo':
      return [
        '- 本篇按“取舍备忘录型”写。主结构是：要做的决策 → 三个判断维度 → 适合/不适合的人 → 我的选择。',
        '- 不要写成教程；少用步骤，多写边界和取舍。',
      ].join('\n');
    case 'trend_argument':
      return [
        '- 本篇按“趋势判断型”写。主结构是：一个小变化 → 它指向的趋势 → 为什么现在值得看 → 对读者的启发。',
        '- 不强制清单；需要一个明确判断，而不是平均介绍。',
      ].join('\n');
    case 'case_story':
      return [
        '- 本篇按“场景故事/案例拆解型”写。主结构是：一个具体使用场景 → 工具如何进入流程 → 交付物变了什么 → 可复用的经验。',
        '- 用场景链条替代概念目录，不要堆功能列表。',
      ].join('\n');
    case 'buyer_guide':
      return [
        '- 本篇按“选型指南型”写。主结构是：谁需要选 → 关键条件 → 分支建议 → 验证路径。',
        '- 可以有清单，但必须是选型判断清单，不要变成泛泛教程。',
      ].join('\n');
    case 'myth_busting':
      return [
        '- 本篇按“反常识/破误解型”写。主结构是：常见误解 → 为什么不完整 → 更准确的判断 → 怎么调整做法。',
        '- 标题和 H2 要有观点，不要只列功能。',
      ].join('\n');
    case 'reference_card':
      return [
        '- 本篇按“参考卡/发布前检查型”写。主结构是：使用前提 → 检查项 → 失败信号 → 最小验证。',
        '- 这是少数可以明确写清单的版型，但清单要短、具体、可执行。',
      ].join('\n');
    case 'safety_review':
      return [
        '- 本篇按“安全审查型”写。主结构是：风险面 → 攻击/失效路径 → 控制点 → 上线前验证。',
        '- 不要制造恐慌；用工程控制语言写。',
      ].join('\n');
    case 'hands_on_recipe':
      return [
        '- 本篇按“实操配方型”写。主结构是：最小场景 → 操作路径 → 验收标准 → 常见坑。',
        '- 可以有步骤清单，但不要每节都以“先”开头，也不要把动作段写成“今晚可以这样开始”。',
      ].join('\n');
    default:
      return '- 本篇必须先选择一种主版型，再写正文；不要自动套用通用工具文结构。';
  }
}

async function callAnthropic(prompt, model) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const baseURL = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '');
  const res = await fetch(`${baseURL}/v1/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'authorization': `Bearer ${apiKey}`,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: Number(process.env.LLM_MAX_TOKENS || 12000),
      messages: [{ role: 'user', content: prompt }],
    }),
    signal: AbortSignal.timeout(Number(process.env.LLM_TIMEOUT_MS || 180000)),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Anthropic API failed HTTP ${res.status}: ${body.slice(0, 500)}`);
  }

  const json = JSON.parse(body);
  const text = (json.content || [])
    .map(part => part.type === 'text' ? part.text : '')
    .join('\n')
    .trim();

  if (!text) throw new Error('Anthropic API returned empty text');
  return text;
}

export async function callTextLLM(prompt, opts) {
  switch (opts.llmProvider) {
    case 'anthropic':
      return callAnthropic(prompt, opts.textModel);
    case 'codex':
      return callCodex(prompt, opts);
    default:
      throw new Error(`unsupported LLM provider: ${opts.llmProvider}`);
  }
}

async function callCodex(prompt, opts) {
  if (!commandExists(opts.codexBin)) {
    throw new Error(`Codex CLI not found: ${opts.codexBin}`);
  }

  const outputPath = path.join(
    os.tmpdir(),
    `promptio-codex-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.txt`
  );
  const args = buildCodexExecArgs(opts, outputPath);

  try {
    const result = await execFileWithInput(opts.codexBin, args, prompt, {
      cwd: ROOT,
      timeoutMs: Number(process.env.CODEX_TIMEOUT_MS || process.env.LLM_TIMEOUT_MS || 300000),
    });

    const text = fs.existsSync(outputPath)
      ? fs.readFileSync(outputPath, 'utf8').trim()
      : result.stdout.trim();

    if (!text) {
      const detail = result.stderr.trim() || result.stdout.trim();
      throw new Error(`Codex CLI returned empty text${detail ? `: ${detail.slice(0, 500)}` : ''}`);
    }
    return text;
  } finally {
    fs.rmSync(outputPath, { force: true });
  }
}

export function buildCodexExecArgs(opts, outputPath) {
  const args = [
    'exec',
    '--ephemeral',
    '--sandbox', 'read-only',
    '--color', 'never',
    '-C', ROOT,
    '-o', outputPath,
  ];

  if (opts.textModel) args.push('--model', opts.textModel);
  if (opts.codexProfile) args.push('--profile', opts.codexProfile);

  args.push('-');
  return args;
}

function execFileWithInput(command, args, input, { cwd, timeoutMs }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env,
    });
    let stdout = '';
    let stderr = '';
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      child.kill('SIGTERM');
      settled = true;
      reject(new Error(`${command} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => {
      stdout += chunk;
    });
    child.stderr.on('data', chunk => {
      stderr += chunk;
    });
    child.on('error', err => {
      if (settled) return;
      clearTimeout(timeout);
      settled = true;
      reject(err);
    });
    child.on('close', code => {
      if (settled) return;
      clearTimeout(timeout);
      settled = true;
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(`${command} failed with exit code ${code}: ${(stderr || stdout).slice(0, 1000)}`));
    });

    child.stdin.end(input);
  });
}

function buildMeta({ opts, article, generated, slug, cover }) {
  const title = generated.xhs_title || generated.title || headingFrom(generated.wechat) || opts.title || article.frontmatter.title || slug;
  const wechatTitle = generated.wechat_title || generated.title || '';
  return {
    title,
    status: 'draft',
    date: opts.date,
    source: 'manual',
    source_url: article.frontmatter.url || article.frontmatter.link || '',
    angle: sanitizeInternalInstructions(opts.angle || ''),
    voice: opts.voice || '',
    content_lane: opts.contentLane || '',
    content_archetype: opts.contentArchetype || '',
    diversity_note: sanitizeInternalInstructions(opts.diversityNote || ''),
    reach: Number(generated.reach || 0) || null,
    tags: Array.isArray(generated.tags) ? generated.tags : [],
    llm: {
      provider: opts.llmProvider,
      model: opts.textModel || '',
    },
    platforms: {
      wechat: 'primary',
      xhs: 'primary',
      x: 'blocked',
    },
    xhs_title: title,
    wechat_title: wechatTitle && wechatTitle !== title ? wechatTitle : '',
    cover: cover || { status: 'skipped' },
  };
}

function headingFrom(markdown) {
  const match = String(markdown || '').match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function writeYaml(filepath, data) {
  fs.writeFileSync(filepath, yaml.dump(data, {
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  }));
}

function markdownWithFrontmatter(markdown, data) {
  return `---\n${yaml.dump(data, {
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  }).trim()}\n---\n\n${stripFrontmatter(markdown).trim()}\n`;
}

function uniqueDraftDir(date, slug, overwrite) {
  const baseDir = path.join(ROOT, 'drafts', date);
  fs.mkdirSync(baseDir, { recursive: true });

  let finalSlug = slug;
  let dir = path.join(baseDir, finalSlug);
  if (overwrite || !fs.existsSync(dir)) return { dir, slug: finalSlug };

  for (let i = 2; i < 100; i++) {
    finalSlug = `${slug}-${i}`;
    dir = path.join(baseDir, finalSlug);
    if (!fs.existsSync(dir)) return { dir, slug: finalSlug };
  }
  throw new Error(`too many existing draft directories for slug: ${slug}`);
}

function commandExists(cmd) {
  return spawnSync('which', [cmd], { stdio: 'ignore' }).status === 0;
}

export async function run(opts) {
  const article = readArticle(path.resolve(opts.contentFile));
  const prompt = buildGenerationPrompt({ article, ...opts });
  const raw = await callTextLLM(prompt, opts);
  const generated = extractJson(raw);

  const title = generated.xhs_title || generated.title || headingFrom(generated.wechat) || opts.title || article.frontmatter.title || 'manual article';
  if (!generated.wechat || !String(generated.wechat).trim()) {
    throw new Error('LLM response missing required field: wechat');
  }

  const baseSlug = chooseDraftSlug({
    requestedSlug: opts.slug,
    generatedSlug: generated.slug,
    title,
  });
  const draft = uniqueDraftDir(opts.date, baseSlug, opts.overwrite);
  fs.mkdirSync(draft.dir, { recursive: true });

  const wechat = normalizeMarkdown(generated.wechat, title);
  const meta = buildMeta({ opts, article, generated, slug: draft.slug, cover: { status: 'skipped' } });
  const markdownPath = path.join(draft.dir, `${draft.slug}.md`);
  const finalMarkdown = markdownWithFrontmatter(wechat, meta);
  assertPublishSurfaceSafe(finalMarkdown, `generated markdown for ${draft.slug}`);
  fs.writeFileSync(markdownPath, finalMarkdown);

  return {
    dir: draft.dir,
    slug: draft.slug,
    wechat: markdownPath,
    xhs: markdownPath,
    meta: markdownPath,
    cover: null,
    coverStatus: 'skipped',
    coverError: '',
  };
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
    console.log(`Drafts written: ${path.relative(ROOT, result.dir)}`);
    console.log(`- Markdown: ${path.relative(ROOT, result.wechat)}`);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
