import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRAFTS_DIR = path.join(ROOT, 'drafts');
const WECHAT_API_BASE = 'https://api.weixin.qq.com';

loadEnv(path.join(ROOT, '.env'));

export function usage() {
  return [
    'Usage:',
    '  node scripts/publish.js <draft-dir|date/slug> [options]',
    '',
    'Options:',
    '  --platform <wechat|xhs|all>     Default: all',
    '  --dry-run                       Build in-memory publish preview only, no files written',
    '  --out-dir <dir>                 Ignored for XHS single-md preview; kept for CLI compatibility',
    '  --overwrite                     Recreate local publish files if they already exist',
    '  --manual-bypass <reason>        Override the meta publish gate for legacy/manual review cases',
    '',
    'WeChat Official Account:',
    '  --wechat-action <draft|publish> Default: draft',
    '  --wechat-thumb-media-id <id>    Use an existing permanent media id as cover',
    '  --wechat-cover <file>           Upload this cover if no media id is provided',
    '  --wechat-author <name>          Default: WECHAT_AUTHOR or PromptIO',
    '  --wechat-source-url <url>       Default: source_url from markdown frontmatter',
    '',
    'Xiaohongshu:',
    '  --xhs-mode <package>            Default: package',
  ].join('\n');
}

export function parseArgs(argv) {
  const args = [...argv];
  const opts = {
    platform: 'all',
    dryRun: false,
    outDir: '',
    overwrite: false,
    manualBypassReason: '',
    wechatAction: 'draft',
    wechatThumbMediaId: process.env.WECHAT_THUMB_MEDIA_ID || '',
    wechatCover: process.env.WECHAT_COVER_PATH || '',
    wechatAuthor: process.env.WECHAT_AUTHOR || 'PromptIO',
    wechatSourceUrl: '',
    wechatCoverMediaType: process.env.WECHAT_COVER_MEDIA_TYPE || 'thumb',
    xhsMode: 'package',
  };

  while (args.length) {
    const arg = args.shift();
    if (!arg) continue;
    if (!arg.startsWith('--') && !opts.draftRef) {
      opts.draftRef = arg;
      continue;
    }

    switch (arg) {
      case '--platform':
        opts.platform = requireValue(args, arg);
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--out-dir':
        opts.outDir = requireValue(args, arg);
        break;
      case '--overwrite':
        opts.overwrite = true;
        break;
      case '--manual-bypass':
      case '--manual-bypass-reason':
        opts.manualBypassReason = requireValue(args, arg);
        break;
      case '--wechat-action':
        opts.wechatAction = requireValue(args, arg);
        break;
      case '--publish':
        opts.wechatAction = 'publish';
        break;
      case '--wechat-thumb-media-id':
        opts.wechatThumbMediaId = requireValue(args, arg);
        break;
      case '--wechat-cover':
        opts.wechatCover = requireValue(args, arg);
        break;
      case '--wechat-author':
        opts.wechatAuthor = requireValue(args, arg);
        break;
      case '--wechat-source-url':
        opts.wechatSourceUrl = requireValue(args, arg);
        break;
      case '--wechat-cover-media-type':
        opts.wechatCoverMediaType = requireValue(args, arg);
        break;
      case '--xhs-mode':
        opts.xhsMode = requireValue(args, arg);
        break;
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }

  if (!opts.draftRef) throw new Error('missing draft-dir');
  opts.platform = String(opts.platform).toLowerCase();
  opts.wechatAction = String(opts.wechatAction).toLowerCase();
  opts.wechatCoverMediaType = String(opts.wechatCoverMediaType).toLowerCase();
  opts.xhsMode = String(opts.xhsMode).toLowerCase();

  if (!['wechat', 'xhs', 'all'].includes(opts.platform)) {
    throw new Error('--platform must be wechat, xhs, or all');
  }
  if (!['draft', 'publish'].includes(opts.wechatAction)) {
    throw new Error('--wechat-action must be draft or publish');
  }
  if (!['image', 'thumb'].includes(opts.wechatCoverMediaType)) {
    throw new Error('--wechat-cover-media-type must be image or thumb');
  }
  if (opts.xhsMode !== 'package') {
    throw new Error('--xhs-mode currently supports package only');
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

export function resolveDraftDir(ref) {
  const candidates = [];
  if (path.isAbsolute(ref)) {
    candidates.push(ref);
  } else {
    candidates.push(path.resolve(ROOT, ref));
    candidates.push(path.join(DRAFTS_DIR, ref));
  }

  for (const candidate of candidates) {
    if (findDraftMarkdown(candidate)) return candidate;
  }

  throw new Error(`draft markdown not found for: ${ref}`);
}

export function readDraft(draftDir) {
  const markdownPath = findDraftMarkdown(draftDir);
  if (!markdownPath) throw new Error(`draft markdown not found: ${draftDir}`);
  const parsed = matter(fs.readFileSync(markdownPath, 'utf8'));
  const meta = parsed.data || {};
  const slug = path.basename(draftDir);

  return {
    dir: draftDir,
    slug,
    metaPath: markdownPath,
    meta,
    wechatPath: markdownPath,
    xhsPath: markdownPath,
    wechatMarkdown: parsed.content.trim() + '\n',
    xhsMarkdown: parsed.content.trim() + '\n',
  };
}

function findDraftMarkdown(draftDir) {
  if (!fs.existsSync(draftDir) || !fs.statSync(draftDir).isDirectory()) return '';
  const preferred = path.join(draftDir, `${path.basename(draftDir)}.md`);
  if (fs.existsSync(preferred)) return preferred;
  const markdowns = fs.readdirSync(draftDir)
    .filter(name => name.endsWith('.md') && !name.startsWith('xhs-') && name !== 'xhs-publish.md')
    .sort();
  return markdowns.length === 1 ? path.join(draftDir, markdowns[0]) : '';
}

const ALLOWED_PLATFORM_STATUSES = new Set(['primary', 'compliant']);

export function evaluatePublishGate(draft, platform, opts = {}) {
  const bypassReason = String(opts.manualBypassReason || '').trim();
  if (bypassReason) {
    return {
      allowed: true,
      publishable: true,
      gate_status: 'manual_bypass',
      gate_reason: '',
      bypass_reason: bypassReason,
    };
  }

  const reasons = [];
  const qa = draft.meta.qa || {};
  const platforms = draft.meta.platforms || {};
  const platformStatus = platforms[platform];

  if (qa.overall_pass !== true) {
    reasons.push('missing or false qa.overall_pass');
  }
  if (!platformStatus) {
    reasons.push(`missing platforms.${platform}`);
  } else if (!ALLOWED_PLATFORM_STATUSES.has(String(platformStatus))) {
    reasons.push(`platforms.${platform} is ${platformStatus}`);
  }
  if (platform === 'xhs' && qa.l6_pass !== true && qa.xhs_pass !== true) {
    reasons.push('missing or false qa.l6_pass or qa.xhs_pass');
  }

  if (reasons.length) {
    return {
      allowed: false,
      publishable: false,
      gate_status: 'blocked',
      gate_reason: reasons.join('; '),
    };
  }

  return {
    allowed: true,
    publishable: true,
    gate_status: 'passed',
    gate_reason: '',
  };
}

function applyGateToResult(result, gate, { blockedPreview = false } = {}) {
  const next = {
    ...result,
    publishable: gate.publishable,
    gate_status: gate.gate_status,
  };
  if (gate.gate_reason) next.gate_reason = gate.gate_reason;
  if (gate.bypass_reason) next.bypass_reason = gate.bypass_reason;
  if (blockedPreview) next.status = 'blocked_preview';
  return next;
}

export function buildWechatArticle(draft, opts, thumbMediaId) {
  const title = truncateText(draft.meta.title || headingFrom(draft.wechatMarkdown) || draft.slug, 64);
  const digest = truncateText(firstParagraphText(draft.wechatMarkdown), 120);
  const content = markdownToWechatHtml(draft.wechatMarkdown);
  const sourceUrl = opts.wechatSourceUrl || draft.meta.source_url || draft.meta.sourceUrl || '';

  return {
    title,
    author: opts.wechatAuthor,
    digest,
    content,
    content_source_url: sourceUrl,
    thumb_media_id: thumbMediaId,
    need_open_comment: 0,
    only_fans_can_comment: 0,
  };
}

export function markdownToWechatHtml(markdown) {
  const lines = stripFrontmatter(markdown).split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let inCode = false;
  let codeLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map(item => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length, 3);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);

  return html.join('\n');
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
}

function stripFrontmatter(markdown) {
  return String(markdown || '').replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').trim();
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function headingFrom(markdown) {
  const match = String(markdown || '').match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function firstParagraphText(markdown) {
  const body = stripFrontmatter(markdown)
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.startsWith('```'));
  return stripMarkdownInline(body[0] || headingFrom(markdown));
}

function stripMarkdownInline(text) {
  return String(text || '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(text, max) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  return Array.from(normalized).slice(0, max).join('');
}

function defaultCoverPath(draft, opts) {
  if (opts.wechatCover) return path.resolve(opts.wechatCover);
  const coverPath = draft.meta.cover?.path ? path.join(draft.dir, draft.meta.cover.path) : '';
  return coverPath && fs.existsSync(coverPath) ? coverPath : '';
}

async function publishWechat(draft, opts) {
  let thumbMediaId = opts.wechatThumbMediaId;
  const coverPath = defaultCoverPath(draft, opts);

  if (opts.dryRun) {
    if (!thumbMediaId) thumbMediaId = '__WECHAT_THUMB_MEDIA_ID__';
    const article = buildWechatArticle(draft, opts, thumbMediaId);
    const payload = { articles: [article] };
    return {
      status: 'dry_run',
      action: opts.wechatAction,
      article,
      payload,
      cover: coverPath || '',
      thumb_media_id: thumbMediaId,
    };
  }

  const token = await getWechatAccessToken();
  if (!thumbMediaId) {
    if (!coverPath) {
      throw new Error('WeChat cover is required: provide WECHAT_THUMB_MEDIA_ID or --wechat-cover');
    }
    const media = await uploadWechatPermanentMedia(token, coverPath, opts.wechatCoverMediaType);
    thumbMediaId = media.media_id;
  }
  if (!thumbMediaId) throw new Error('WeChat cover upload did not return media_id');

  const payload = { articles: [buildWechatArticle(draft, opts, thumbMediaId)] };
  const draftResult = await wechatPostJson(`/cgi-bin/draft/add?access_token=${token}`, payload);
  const mediaId = draftResult.media_id;
  if (!mediaId) throw new Error(`WeChat draft API did not return media_id: ${JSON.stringify(draftResult)}`);

  let publishResult = null;
  if (opts.wechatAction === 'publish') {
    publishResult = await wechatPostJson(`/cgi-bin/freepublish/submit?access_token=${token}`, { media_id: mediaId });
  }

  updatePublishMeta(draft, {
    wechat: {
      status: opts.wechatAction === 'publish' ? 'publish_submitted' : 'draft_created',
      media_id: mediaId,
      publish_id: publishResult?.publish_id || '',
      updated_at: new Date().toISOString(),
    },
  });

  return {
    status: opts.wechatAction === 'publish' ? 'publish_submitted' : 'draft_created',
    action: opts.wechatAction,
    media_id: mediaId,
    publish_id: publishResult?.publish_id || '',
  };
}

async function getWechatAccessToken() {
  const appId = process.env.WECHAT_APP_ID;
  const appSecret = process.env.WECHAT_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error('WECHAT_APP_ID and WECHAT_APP_SECRET are required for WeChat publishing');
  }

  const url = `${WECHAT_API_BASE}/cgi-bin/token?grant_type=client_credential&appid=${encodeURIComponent(appId)}&secret=${encodeURIComponent(appSecret)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(Number(process.env.WECHAT_TIMEOUT_MS || 30000)) });
  const json = await res.json();
  assertWechatOk(json, 'get access_token');
  if (!json.access_token) throw new Error(`WeChat token API returned no access_token: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function uploadWechatPermanentMedia(token, filepath, mediaType) {
  if (!fs.existsSync(filepath)) throw new Error(`cover file not found: ${filepath}`);
  const { body, contentType } = buildMultipartMedia(filepath);
  const url = `${WECHAT_API_BASE}/cgi-bin/material/add_material?access_token=${token}&type=${encodeURIComponent(mediaType)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': contentType },
    body,
    signal: AbortSignal.timeout(Number(process.env.WECHAT_TIMEOUT_MS || 30000)),
  });
  const json = await res.json();
  assertWechatOk(json, 'upload permanent media');
  return json;
}

function buildMultipartMedia(filepath) {
  const boundary = `----PromptIO${Date.now()}${Math.random().toString(16).slice(2)}`;
  const filename = path.basename(filepath);
  const mime = mimeType(filepath);
  const file = fs.readFileSync(filepath);
  const head = Buffer.from([
    `--${boundary}`,
    `Content-Disposition: form-data; name="media"; filename="${filename}"`,
    `Content-Type: ${mime}`,
    '',
    '',
  ].join('\r\n'));
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`);

  return {
    body: Buffer.concat([head, file, tail]),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}

function mimeType(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.bmp') return 'image/bmp';
  return 'application/octet-stream';
}

async function wechatPostJson(pathname, payload) {
  const res = await fetch(`${WECHAT_API_BASE}${pathname}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(Number(process.env.WECHAT_TIMEOUT_MS || 30000)),
  });
  const json = await res.json();
  assertWechatOk(json, pathname);
  return json;
}

function assertWechatOk(json, action) {
  if (json.errcode && json.errcode !== 0) {
    throw new Error(`WeChat ${action} failed ${json.errcode}: ${json.errmsg || JSON.stringify(json)}`);
  }
}

export function buildXhsPackage(draft) {
  const title = draft.meta.xhs_title || headingFrom(draft.xhsMarkdown) || draft.meta.title || draft.slug;
  const body = stripFrontmatter(draft.xhsMarkdown)
    .replace(/^#\s+.+\n?/, '')
    .trim();
  const tags = normalizeXhsTags(draft.meta.tags || []);

  return {
    title,
    body,
    tags,
    combined: [body, '', tags.join(' ')].filter(Boolean).join('\n'),
    warnings: xhsWarnings({ title, body }),
  };
}

function xhsWarnings({ title, body }) {
  const warnings = [];
  if (Array.from(body).length > 1000) {
    warnings.push('body_over_1000_chars');
  }
  return warnings;
}

function normalizeXhsTags(tags) {
  return [...new Set(
    (Array.isArray(tags) ? tags : [])
      .map(tag => String(tag || '').replace(/^#+/, '').replace(/\s+/g, '').trim())
      .filter(Boolean)
      .slice(0, 8)
  )].map(tag => `#${tag}`);
}

function publishXhsPackage(draft, opts, outDir) {
  const pack = buildXhsPackage(draft);

  return {
    status: opts.dryRun ? 'dry_run' : 'package_created',
    mode: 'manual_creator_center',
    title: pack.title,
    body: pack.body,
    tags: pack.tags,
    warnings: pack.warnings,
    payload: pack,
  };
}

export async function run(opts) {
  const draftDir = resolveDraftDir(opts.draftRef);
  const draft = readDraft(draftDir);
  const requestedPlatforms = [];
  if (opts.platform === 'wechat' || opts.platform === 'all') requestedPlatforms.push('wechat');
  if (opts.platform === 'xhs' || opts.platform === 'all') requestedPlatforms.push('xhs');
  const gates = Object.fromEntries(
    requestedPlatforms.map(platform => [platform, evaluatePublishGate(draft, platform, opts)])
  );

  if (!opts.dryRun) {
    const blocked = requestedPlatforms.find(platform => !gates[platform].allowed);
    if (blocked) {
      throw new Error(`publish gate blocked ${blocked}: ${gates[blocked].gate_reason}`);
    }
  }

  const result = {
    draft_dir: draftDir,
    out_dir: '',
    wechat: null,
    xhs: null,
  };

  if (opts.platform === 'wechat' || opts.platform === 'all') {
    const gate = gates.wechat;
    result.wechat = applyGateToResult(
      await publishWechat(draft, opts),
      gate,
      { blockedPreview: opts.dryRun && !gate.allowed }
    );
  }

  if (opts.platform === 'xhs' || opts.platform === 'all') {
    const gate = gates.xhs;
    result.xhs = applyGateToResult(
      publishXhsPackage(draft, opts),
      gate,
      { blockedPreview: opts.dryRun && !gate.allowed }
    );
  }

  return result;
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
    console.log(`Publish preview: ${path.relative(ROOT, result.draft_dir)}`);
    if (result.wechat) {
      console.log(`- WeChat: ${result.wechat.status}${result.wechat.media_id ? ` media_id=${result.wechat.media_id}` : ''}`);
    }
    if (result.xhs) {
      console.log(`- XHS: ${result.xhs.status} (${result.xhs.mode})`);
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
