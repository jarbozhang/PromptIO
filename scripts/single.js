import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const WECHAT_PROMPT_PATH = path.join(ROOT, 'config/prompts/wechat.md');
const XHS_PROMPT_PATH = path.join(ROOT, 'config/prompts/xhs-compliant.md');
const COVER_TARGET = { width: 900, height: 383 };
const COVER_SOURCE_SIZE = process.env.OPENAI_IMAGE_SIZE || '1808x768';

loadEnv(path.join(ROOT, '.env'));

export function usage() {
  return [
    'Usage:',
    '  node scripts/single.js <article-file> [--angle "写作角度"] [--title "标题"] [--slug "文件名"] [options]',
    '',
    'Options:',
    '  --voice <first-person|narrative|analytical|retro>',
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
  return (text || 'manual-article')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'manual-article';
}

export function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').trim();
}

export function normalizeMarkdown(markdown, fallbackTitle) {
  const body = stripFrontmatter(String(markdown || '').trim());
  if (!body.startsWith('# ')) return `# ${fallbackTitle}\n\n${body}`.trim() + '\n';
  return body.trim() + '\n';
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

export function buildGenerationPrompt({ article, angle, title, slug, voice }) {
  const wechatPrompt = fs.readFileSync(WECHAT_PROMPT_PATH, 'utf8');
  const xhsPrompt = fs.existsSync(XHS_PROMPT_PATH)
    ? fs.readFileSync(XHS_PROMPT_PATH, 'utf8')
    : '';
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
    '  "title": "公众号主标题",',
    '  "slug": "中文字符和英文品牌混合的 kebab-case slug，不要纯拼音",',
    '  "reach": 1,',
    '  "tags": ["tag"],',
    '  "wechat": "# 标题\\n\\n主稿 markdown",',
    '  "xhs_title": "小红书发布标题，不要标题党、不要拉踩、不要引流求互动",',
    '  "cover_prompt": "给 gpt-image-2 的英文封面图提示词，不要让图中出现任何文字"',
    '}',
    '',
    '主稿要求:',
    '- 严格遵守下面的 wechat.md 写作规范。',
    '- 以 H1 开头，不要 YAML frontmatter。',
    '- 结尾包含相关链接 section 和 REACH 注释。',
    '- 事实必须来自源材料，不能编造实测、价格、发布日期或社区反馈。',
    '- 如果源材料不足以支撑亲测视角，不要写成亲测，改用 narrative 或 analytical。',
    '- 这份主稿必须能直接作为小红书正文使用，不要另写一份小红书短稿。',
    '- 不要出现小红书禁区，不要教境外访问方法，不要写加微信/私信/评论区蹲/求收藏。',
    '- 保留关键信息、行动建议、风险边界和 AI 内容标识需要。',
    '',
    '小红书发布标题要求:',
    '- xhs_title 是发布时可用的标题，不需要限制到 10 个字或 20 个字。',
    '- 可以比公众号标题更口语，但必须完整表达主题。',
    '- 不要标题党、不要拉踩、不要引流求互动。',
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
  const title = generated.title || headingFrom(generated.wechat) || opts.title || article.frontmatter.title || slug;
  return {
    title,
    status: 'draft',
    date: opts.date,
    source: 'manual',
    source_file: path.relative(ROOT, path.resolve(article.filepath)),
    source_title: article.frontmatter.title || '',
    source_url: article.frontmatter.url || article.frontmatter.link || '',
    angle: opts.angle || '',
    voice: opts.voice || '',
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
    draft_files: {
      wechat: `${slug}.md`,
    },
    xhs_title: generated.xhs_title || '',
    cover,
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

async function generateCover({ prompt, outDir, model, skip }) {
  const base = {
    status: skip ? 'skipped' : 'pending',
    model,
    prompt,
    target_size: `${COVER_TARGET.width}x${COVER_TARGET.height}`,
    source_size: COVER_SOURCE_SIZE,
    source_path: 'cover-source.png',
    path: 'cover.png',
    error: '',
  };

  if (skip) return base;
  if (!process.env.OPENAI_API_KEY) {
    return { ...base, status: 'failed', error: 'OPENAI_API_KEY is not set' };
  }

  try {
    const sourcePath = path.join(outDir, base.source_path);
    const sizes = [...new Set([COVER_SOURCE_SIZE, 'auto'].filter(Boolean))];
    let generatedSize = '';
    let lastError;

    for (const size of sizes) {
      try {
        const image = await requestOpenAIImage({ model, prompt, size });
        await writeImageData(image, sourcePath);
        generatedSize = size;
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (lastError) throw lastError;

    const coverPath = path.join(outDir, base.path);
    resizeCover(sourcePath, coverPath);
    return { ...base, status: 'generated', source_size: generatedSize || COVER_SOURCE_SIZE };
  } catch (err) {
    return { ...base, status: 'failed', error: err.message };
  }
}

async function requestOpenAIImage({ model, prompt, size }) {
  const body = {
    model,
    prompt,
    quality: process.env.OPENAI_IMAGE_QUALITY || 'medium',
    n: 1,
  };
  if (size) body.size = size;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(Number(process.env.OPENAI_IMAGE_TIMEOUT_MS || 180000)),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`OpenAI image API failed HTTP ${res.status} for size=${size}: ${text.slice(0, 500)}`);

  const json = JSON.parse(text);
  const image = json.data?.[0];
  if (!image) throw new Error('OpenAI image API returned no image');
  return image;
}

async function writeImageData(image, filepath) {
  if (image.b64_json) {
    fs.writeFileSync(filepath, Buffer.from(image.b64_json, 'base64'));
    return;
  }

  if (image.url) {
    const imageRes = await fetch(image.url, { signal: AbortSignal.timeout(60000) });
    if (!imageRes.ok) throw new Error(`image download failed HTTP ${imageRes.status}`);
    fs.writeFileSync(filepath, Buffer.from(await imageRes.arrayBuffer()));
    return;
  }

  throw new Error('OpenAI image API returned no b64_json or url');
}

function resizeCover(sourcePath, coverPath) {
  if (commandExists('magick')) {
    execFileSync('magick', [
      sourcePath,
      '-resize', `${COVER_TARGET.width}x${COVER_TARGET.height}^`,
      '-gravity', 'center',
      '-extent', `${COVER_TARGET.width}x${COVER_TARGET.height}`,
      coverPath,
    ], { stdio: 'pipe' });
    return;
  }

  if (commandExists('sips')) {
    const { width, height } = readImageSize(sourcePath);
    const targetAspect = COVER_TARGET.width / COVER_TARGET.height;
    const sourceAspect = width / height;
    let cropWidth = width;
    let cropHeight = height;

    if (sourceAspect > targetAspect) {
      cropWidth = Math.round(height * targetAspect);
    } else if (sourceAspect < targetAspect) {
      cropHeight = Math.round(width / targetAspect);
    }

    const tmpPath = coverPath.replace(/\.png$/, '.tmp.png');
    execFileSync('sips', [
      '--cropToHeightWidth',
      String(cropHeight),
      String(cropWidth),
      sourcePath,
      '--out',
      tmpPath,
    ], { stdio: 'pipe' });
    execFileSync('sips', [
      '--resampleHeightWidth',
      String(COVER_TARGET.height),
      String(COVER_TARGET.width),
      tmpPath,
      '--out',
      coverPath,
    ], { stdio: 'pipe' });
    fs.rmSync(tmpPath, { force: true });
    return;
  }

  fs.copyFileSync(sourcePath, coverPath);
  throw new Error('neither magick nor sips is available to resize cover image');
}

function readImageSize(filepath) {
  const output = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', filepath], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) throw new Error(`could not read image size for ${filepath}`);
  return { width, height };
}

function commandExists(cmd) {
  try {
    execFileSync('which', [cmd], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export async function run(opts) {
  const article = readArticle(path.resolve(opts.contentFile));
  const prompt = buildGenerationPrompt({ article, ...opts });
  const raw = await callTextLLM(prompt, opts);
  const generated = extractJson(raw);

  const title = generated.title || headingFrom(generated.wechat) || opts.title || article.frontmatter.title || 'manual article';
  if (!generated.wechat || !String(generated.wechat).trim()) {
    throw new Error('LLM response missing required field: wechat');
  }

  const baseSlug = slugify(opts.slug || generated.slug || title);
  const draft = uniqueDraftDir(opts.date, baseSlug, opts.overwrite);
  fs.mkdirSync(draft.dir, { recursive: true });

  const wechat = normalizeMarkdown(generated.wechat, title);
  fs.writeFileSync(path.join(draft.dir, `${draft.slug}.md`), wechat);

  const coverPrompt = generated.cover_prompt || `Editorial technology cover image for: ${title}. No text, no logos, no QR codes.`;
  let cover = await generateCover({
    prompt: coverPrompt,
    outDir: draft.dir,
    model: opts.coverModel,
    skip: opts.noCover,
  });

  const metaPath = path.join(draft.dir, 'meta.yaml');
  writeYaml(metaPath, buildMeta({ opts, article, generated, slug: draft.slug, cover }));

  if (cover.status === 'failed' && opts.requireCover) {
    throw new Error(`cover generation failed: ${cover.error}`);
  }

  return {
    dir: draft.dir,
    slug: draft.slug,
    wechat: path.join(draft.dir, `${draft.slug}.md`),
    xhs: path.join(draft.dir, `${draft.slug}.md`),
    meta: metaPath,
    cover: cover.status === 'generated' ? path.join(draft.dir, 'cover.png') : null,
    coverStatus: cover.status,
    coverError: cover.error,
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
    console.log(`- WeChat: ${path.relative(ROOT, result.wechat)}`);
    console.log(`- XHS: uses primary draft (${path.relative(ROOT, result.xhs)})`);
    console.log(`- Meta: ${path.relative(ROOT, result.meta)}`);
    if (result.cover) {
      console.log(`- Cover: ${path.relative(ROOT, result.cover)} (${COVER_TARGET.width}x${COVER_TARGET.height})`);
    } else {
      console.log(`- Cover: ${result.coverStatus}${result.coverError ? ` (${result.coverError})` : ''}`);
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
