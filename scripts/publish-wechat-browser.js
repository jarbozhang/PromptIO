import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WECHAT_ORIGIN = 'https://mp.weixin.qq.com';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEFAULT_PROFILE = path.join(os.homedir(), 'Library', 'Application Support', 'PromptIO', 'wechat-chrome-profile');

export function parseArgs(argv) {
  const args = [...argv];
  const opts = { draftRef: '', submit: false, theme: 'grace', color: '#2563eb', profile: DEFAULT_PROFILE, prepareOnly: false };
  while (args.length) {
    const arg = args.shift();
    if (!arg.startsWith('--') && !opts.draftRef) opts.draftRef = arg;
    else if (arg === '--submit') opts.submit = true;
    else if (arg === '--prepare-only') opts.prepareOnly = true;
    else if (arg === '--theme') opts.theme = required(args, arg);
    else if (arg === '--color') opts.color = required(args, arg);
    else if (arg === '--profile') opts.profile = path.resolve(required(args, arg));
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!opts.draftRef) throw new Error('missing draft reference');
  return opts;
}

function required(args, flag) {
  const value = args.shift();
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

export function resolveWechatMediaAssets(draftDir, meta) {
  const cover = meta.wechat_cover || meta.cover;
  const coverRel = typeof cover === 'string' ? cover : cover?.path;
  const coverStatus = typeof cover === 'object' ? cover?.status : '';
  if (!coverRel || (coverStatus && !['ready', 'generated', 'approved'].includes(String(coverStatus)))) {
    throw new Error('publish gate blocked: dedicated WeChat cover must be ready and have a path');
  }
  const coverPath = path.resolve(draftDir, coverRel);
  if (!inside(draftDir, coverPath) || !fs.existsSync(coverPath)) throw new Error('publish gate blocked: cover file missing or outside draft');
  const bodyImages = (Array.isArray(meta.body_images) ? meta.body_images : []).map((item, index) => {
    const rel = typeof item === 'string' ? item : item?.path;
    if (!rel) throw new Error(`publish gate blocked: body image ${index + 1} has no path`);
    const resolved = path.resolve(draftDir, rel);
    if (!inside(draftDir, resolved) || !fs.existsSync(resolved)) throw new Error(`publish gate blocked: body image ${index + 1} missing or outside draft`);
    if (resolved === coverPath) throw new Error('publish gate blocked: WeChat cover and body images must be separate assets');
    return { ...(typeof item === 'object' ? item : {}), path: resolved };
  });
  return { coverPath, bodyImages };
}

export function verifyWechatBodyImages(expected, remote) {
  const configured = Array.isArray(expected) ? expected : [];
  const actual = Array.isArray(remote) ? remote : [];
  const valid = actual.filter(item => /^https:\/\/(?:[^/]+\.)?qpic\.cn\//.test(String(item.src || '')) && Number(item.width) > 0 && Number(item.height) > 0);
  const matched = configured.every(item => valid.some(remoteItem => String(remoteItem.previousHeading || '').trim() === String(item.after_heading || '').trim()));
  if (valid.length !== configured.length || !matched) {
    throw new Error(`WeChat body image verification failed: expected ${configured.length}, found ${valid.length}`);
  }
  return { verified: true, count: valid.length };
}

export function inspectDraftForBrowserPublish(ref) {
  const draftDir = resolveDraftDir(ref);
  const markdownPath = findMarkdown(draftDir);
  const parsed = matter(fs.readFileSync(markdownPath, 'utf8'));
  const meta = parsed.data || {};
  if (meta.qa?.overall_pass !== true) throw new Error('publish gate blocked: qa.overall_pass must be true');
  if (!['primary', 'compliant'].includes(String(meta.platforms?.wechat || ''))) {
    throw new Error('publish gate blocked: platforms.wechat must be primary or compliant');
  }
  const { coverPath, bodyImages } = resolveWechatMediaAssets(draftDir, meta);
  const title = String(meta.wechat_title || meta.title || '').trim();
  if (!title) throw new Error('publish gate blocked: title is required');
  if (Array.from(title).length > 64) throw new Error('publish gate blocked: title exceeds 64 characters');
  const summary = String(meta.description || meta.summary || firstParagraph(parsed.content)).trim().slice(0, 120);
  return { draftDir, markdownPath, markdown: parsed.content.trim(), meta, title, summary, author: String(meta.author || 'PromptIO'), coverPath, bodyImages };
}

function resolveDraftDir(ref) {
  const candidates = path.isAbsolute(ref) ? [ref] : [path.resolve(ROOT, ref), path.resolve(ROOT, 'drafts', ref)];
  const found = candidates.find(candidate => findMarkdown(candidate, false));
  if (!found) throw new Error(`draft markdown not found for: ${ref}`);
  return found;
}

function findMarkdown(dir, fail = true) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return '';
  const preferred = path.join(dir, `${path.basename(dir)}.md`);
  if (fs.existsSync(preferred)) return preferred;
  const files = fs.readdirSync(dir).filter(name => name.endsWith('.md') && !name.startsWith('xhs-'));
  if (files.length === 1) return path.join(dir, files[0]);
  if (fail) throw new Error(`expected one markdown file in ${dir}`);
  return '';
}

function inside(parent, child) {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function firstParagraph(markdown) {
  return markdown.split(/\n\s*\n/).map(s => s.replace(/^#+\s*/gm, '').trim()).find(s => s && !s.startsWith('![')) || '';
}

export function assertAllowedWechatUrl(value) {
  const url = new URL(value);
  if (url.protocol === 'file:') return true;
  if (url.protocol === 'https:' && url.origin === WECHAT_ORIGIN) return true;
  throw new Error(`blocked outbound URL: ${url.origin}`);
}

export function stripInternalPublishAnnotations(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const internalHeading = lines.findIndex(line => /^#{1,3}\s+相关链接\s*$/.test(line.trim()));
  const visible = internalHeading >= 0 ? lines.slice(0, internalHeading) : lines;
  return visible
    .filter(line => !/^\s*<!--\s*(?:REACH|QA|INTERNAL)\s*:/i.test(line))
    .join('\n')
    .trim();
}

export function buildWechatBrowserHtml(draft, { theme = 'grace', color = '#2563eb' } = {}) {
  const body = markdownToHtml(stripInternalPublishAnnotations(draft.markdown));
  const css = themeCss(theme, color);
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(draft.title)}</title><meta name="author" content="${esc(draft.author)}"><meta name="description" content="${esc(draft.summary)}"><style>${css}</style></head><body><article id="output">${body}</article></body></html>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/); const out = []; let list = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`); list = []; } };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const h = line.match(/^(#{1,3})\s+(.+)$/); if (h) { flush(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    const b = line.match(/^[-*]\s+(.+)$/); if (b) { list.push(b[1]); continue; }
    const q = line.match(/^>\s*(.+)$/); if (q) { flush(); out.push(`<blockquote>${inline(q[1])}</blockquote>`); continue; }
    flush(); out.push(`<p>${inline(line)}</p>`);
  }
  flush(); return out.join('\n');
}

function inline(text) {
  return esc(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1<sup>〔来源〕</sup>');
}
function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function themeCss(theme, color) {
  const font = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif";
  return `body{margin:0;background:#fff;color:#262626;font-family:${font}}#output{max-width:677px;margin:0 auto;padding:24px;line-height:1.85;font-size:16px}h1{font-size:25px;text-align:center}h2{font-size:20px;border-left:4px solid ${color};padding-left:10px;margin-top:32px}h3{font-size:18px;color:${color}}p{margin:16px 0}strong{color:${color}}blockquote{margin:20px 0;padding:12px 18px;background:#f7f8fa;border-left:4px solid ${color}}code{background:#f3f4f6;padding:2px 5px;border-radius:4px}sup{color:#888;font-size:11px}/* theme:${esc(theme)} */`;
}

async function freePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
  });
}

async function waitJson(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try { const res = await fetch(url); if (res.ok) return await res.json(); } catch {}
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`Chrome CDP did not become ready: ${url}`);
}

class Cdp {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); }
  static async connect(url) {
    const ws = new WebSocket(url); const cdp = new Cdp(ws);
    ws.onmessage = event => cdp.receive(JSON.parse(event.data));
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    return cdp;
  }
  receive(msg) { const p = this.pending.get(msg.id); if (p) { this.pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); } }
  send(method, params = {}, sessionId) { return new Promise((resolve, reject) => { const id = ++this.id; this.pending.set(id, { resolve, reject }); this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })); }); }
  close() { this.ws.close(); }
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'browser evaluation failed');
  return result.result.value;
}

async function waitUntil(fn, timeout, message) {
  const start = Date.now();
  while (Date.now() - start < timeout) { const value = await fn(); if (value) return value; await new Promise(r => setTimeout(r, 500)); }
  throw new Error(message);
}

export function findRunningChromeCdp(processes, profile) {
  const normalized = path.resolve(profile);
  for (const line of String(processes || '').split(/\r?\n/)) {
    if (!line.includes('Google Chrome') || !line.includes(`--user-data-dir=${normalized}`)) continue;
    const match = line.match(/--remote-debugging-port=(\d+)/);
    if (match) return { port: Number(match[1]) };
  }
  return null;
}

function runningChromeCdp(profile) {
  try {
    return findRunningChromeCdp(execFileSync('pgrep', ['-fal', 'Google Chrome'], { encoding: 'utf8' }), profile);
  } catch {
    return null;
  }
}

async function launchWechat(profile) {
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found: ${CHROME}`);
  fs.mkdirSync(profile, { recursive: true });
  const running = runningChromeCdp(profile);
  if (running) {
    const version = await waitJson(`http://127.0.0.1:${running.port}/json/version`, 5000);
    return { cdp: await Cdp.connect(version.webSocketDebuggerUrl), chrome: null, reused: true };
  }
  const port = await freePort();
  const chrome = spawn(CHROME, [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--start-maximized', WECHAT_ORIGIN], { stdio: 'ignore' });
  chrome.unref();
  const version = await waitJson(`http://127.0.0.1:${port}/json/version`);
  return { cdp: await Cdp.connect(version.webSocketDebuggerUrl), chrome, reused: false };
}

async function attachWechat(cdp) {
  const targets = await cdp.send('Target.getTargets');
  let page = targets.targetInfos.find(t => t.type === 'page' && t.url.includes('mp.weixin.qq.com'));
  if (!page) { const made = await cdp.send('Target.createTarget', { url: WECHAT_ORIGIN }); page = { targetId: made.targetId }; }
  const attached = await cdp.send('Target.attachToTarget', { targetId: page.targetId, flatten: true });
  await cdp.send('Runtime.enable', {}, attached.sessionId);
  await cdp.send('Page.enable', {}, attached.sessionId);
  return { targetId: page.targetId, sessionId: attached.sessionId };
}

export function isWechatLoggedInSnapshot({ href, body = '' }) {
  const url = new URL(String(href));
  return url.origin === WECHAT_ORIGIN && url.pathname.startsWith('/cgi-bin/') && Boolean(url.searchParams.get('token')) && !String(body).includes('请重新登录');
}

export function buildWechatHomeUrl(href) {
  const url = new URL(String(href));
  const token = url.searchParams.get('token');
  if (url.origin !== WECHAT_ORIGIN || !token) throw new Error('WeChat session has no active token');
  return `${WECHAT_ORIGIN}/cgi-bin/home?t=home/index&lang=zh_CN&token=${encodeURIComponent(token)}`;
}

export function buildWechatEditorUrl(href) {
  const url = new URL(String(href));
  const token = url.searchParams.get('token');
  if (url.origin !== WECHAT_ORIGIN || !token) throw new Error('WeChat session has no active token');
  return `${WECHAT_ORIGIN}/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&createType=0&token=${encodeURIComponent(token)}&lang=zh_CN`;
}

export function hasWechatCover({ backgroundImage = '', emptyLabelDisplay = '' }) {
  return /url\(["']?https:\/\/[^)]+/.test(String(backgroundImage)) && String(backgroundImage) !== 'none';
}

export function findNewWechatEditorTarget(targetInfos, initialTargets) {
  return targetInfos.find(target => {
    if (target.type !== 'page' || !target.url.includes('mp.weixin.qq.com/cgi-bin/appmsg')) return false;
    const oldUrl = initialTargets.get(target.targetId);
    return oldUrl !== target.url;
  });
}

async function saveBrowserDraft(draft, htmlPath, profile) {
  const { cdp } = await launchWechat(profile);
  try {
    let session = await attachWechat(cdp);
    console.log('[wechat] 请在打开的独立 Chrome 中扫码登录公众号（等待 3 分钟）…');
    const loggedInHref = await waitUntil(async () => {
      const snapshot = await evaluate(cdp, session.sessionId, `({href:location.href,body:(document.body?.innerText||'').slice(0,200)})`);
      return isWechatLoggedInSnapshot(snapshot) ? snapshot.href : '';
    }, 180000, 'WeChat login timeout');
    const homeUrl = buildWechatHomeUrl(loggedInHref);
    if (loggedInHref !== homeUrl) await evaluate(cdp, session.sessionId, `location.href=${JSON.stringify(homeUrl)}`);
    await waitUntil(() => evaluate(cdp, session.sessionId, `!!document.querySelector('.new-creation__menu')`), 40000, 'WeChat home menu did not load');
    const editorUrl = buildWechatEditorUrl(loggedInHref);
    const made = await cdp.send('Target.createTarget', { url: editorUrl });
    const targetId = made.targetId;
    const attached = await cdp.send('Target.attachToTarget', { targetId, flatten: true }); session = { targetId, sessionId: attached.sessionId };
    await cdp.send('Runtime.enable', {}, session.sessionId);
    await waitUntil(() => evaluate(cdp, session.sessionId, `!!document.querySelector('#title')&&!!document.querySelector('.rich_media_content .ProseMirror')`), 30000, 'WeChat editor did not load');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const payload = { title: draft.title, author: draft.author, summary: draft.summary, html };
    const inserted = await evaluate(cdp, session.sessionId, `(function(p){const set=(sel,v)=>{const e=document.querySelector(sel);if(!e)return false;e.focus();e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return true};set('#title',p.title);set('#author',p.author);set('#js_description',p.summary);const editor=document.querySelector('.rich_media_content .ProseMirror');const doc=new DOMParser().parseFromString(p.html,'text/html');const output=doc.querySelector('#output');editor.focus();editor.innerHTML=output?output.innerHTML:doc.body.innerHTML;editor.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertHTML'}));return {title:document.querySelector('#title')?.value||'',text:(editor.innerText||'').trim().length}})(${JSON.stringify(payload)})`);
    if (inserted.title !== draft.title || inserted.text < 20) throw new Error(`editor verification failed: ${JSON.stringify(inserted)}`);
    if (draft.bodyImages.length) {
      const bodyDoc = await cdp.send('DOM.getDocument', { depth: -1, pierce: true }, session.sessionId);
      const bodyInput = await cdp.send('DOM.querySelector', { nodeId: bodyDoc.root.nodeId, selector: 'input[type=file][name=file]' }, session.sessionId);
      if (!bodyInput.nodeId) throw new Error('WeChat body image upload input not found');
      for (const [index, image] of draft.bodyImages.entries()) {
        const positioned = await evaluate(cdp, session.sessionId, `(function(heading){const editor=document.querySelector('.rich_media_content .ProseMirror');const target=[...editor.querySelectorAll('h2')].find(e=>(e.innerText||'').trim()===heading);if(!target)return null;const range=document.createRange(),selection=getSelection();range.setStartAfter(target);range.collapse(true);selection.removeAllRanges();selection.addRange(range);editor.focus();return [...editor.querySelectorAll('img[src]')].length})(${JSON.stringify(image.after_heading || '')})`);
        if (positioned === null) throw new Error(`WeChat body image heading not found: ${image.after_heading || index + 1}`);
        await cdp.send('DOM.setFileInputFiles', { nodeId: bodyInput.nodeId, files: [image.path] }, session.sessionId);
        await waitUntil(async () => Number(await evaluate(cdp, session.sessionId, `[...document.querySelector('.rich_media_content .ProseMirror').querySelectorAll('img[src]')].length`)) > positioned, 30000, `WeChat body image ${index + 1} upload timeout`);
      }
    }
    const coverOpened = await evaluate(cdp, session.sessionId, `(function(){const direct=document.querySelector('#js_cover_null .js_imagedialog');if(direct){direct.click();return true}const area=document.querySelector('.js_cover_btn_area');if(!area)return false;area.click();setTimeout(()=>document.querySelector('#js_cover_null .js_imagedialog')?.click(),100);return true})()`);
    if (!coverOpened) throw new Error('WeChat cover selector not found');
    await waitUntil(() => evaluate(cdp, session.sessionId, `!!document.querySelector('.weui-desktop-dialog input[type=file][accept*="image"]')`), 10000, 'WeChat cover upload dialog did not open');
    const coverDoc = await cdp.send('DOM.getDocument', { depth: -1, pierce: true }, session.sessionId);
    const coverInput = await cdp.send('DOM.querySelector', { nodeId: coverDoc.root.nodeId, selector: '.weui-desktop-dialog input[type=file][accept*="image"]' }, session.sessionId);
    if (!coverInput.nodeId) throw new Error('WeChat cover dialog upload input not found');
    await cdp.send('DOM.setFileInputFiles', { nodeId: coverInput.nodeId, files: [draft.coverPath] }, session.sessionId);
    await waitUntil(() => evaluate(cdp, session.sessionId, `[...document.querySelectorAll('.weui-desktop-dialog .weui-desktop-img-picker__item')].some(e=>e.classList.contains('selected'))`), 30000, 'WeChat cover upload did not become selectable');
    const next = await evaluate(cdp, session.sessionId, `(function(){const e=[...document.querySelectorAll('.weui-desktop-dialog button')].find(e=>(e.innerText||'').trim()==='下一步'&&!e.disabled);if(!e)return false;e.click();return true})()`);
    if (!next) throw new Error('WeChat cover next button not found');
    await waitUntil(() => evaluate(cdp, session.sessionId, `[...document.querySelectorAll('.weui-desktop-dialog button')].some(e=>(e.innerText||'').trim()==='确认')`), 15000, 'WeChat cover crop dialog did not load');
    const confirmed = await evaluate(cdp, session.sessionId, `(function(){const e=[...document.querySelectorAll('.weui-desktop-dialog button')].find(e=>(e.innerText||'').trim()==='确认');if(!e)return false;e.click();return true})()`);
    if (!confirmed) throw new Error('WeChat cover confirm button not found');
    const coverState = await waitUntil(async () => {
      const state = await evaluate(cdp, session.sessionId, `({backgroundImage:getComputedStyle(document.querySelector('.js_cover_preview_new')).backgroundImage,emptyLabelDisplay:getComputedStyle(document.querySelector('.js_share_type_none_image')).display})`);
      return hasWechatCover(state) ? state : null;
    }, 30000, 'WeChat cover was not applied');
    await evaluate(cdp, session.sessionId, `document.querySelector('#js_submit button')?.click()`);
    const appmsgid = await waitUntil(async () => { const href = String(await evaluate(cdp, session.sessionId, 'location.href')); return new URL(href).searchParams.get('appmsgid') || ''; }, 60000, 'WeChat draft save did not return appmsgid');
    await new Promise(resolve => setTimeout(resolve, 3000));
    const remoteBodyImages = await evaluate(cdp, session.sessionId, `[...document.querySelector('.rich_media_content .ProseMirror').querySelectorAll('img[src]')].map(e=>({src:e.src,width:e.naturalWidth,height:e.naturalHeight,previousHeading:e.parentElement?.previousElementSibling?.innerText||''}))`);
    const bodyVerification = verifyWechatBodyImages(draft.bodyImages, remoteBodyImages);
    return { status: 'draft_created', appmsgid, coverVerified: Boolean(coverState), bodyImagesVerified: bodyVerification.verified, bodyImageCount: bodyVerification.count };
  } finally { cdp.close(); }
}

function updatePublishState(draft, result) {
  const parsed = matter(fs.readFileSync(draft.markdownPath, 'utf8'));
  parsed.data.publish = { ...(parsed.data.publish || {}), wechat_browser: { status: result.status, appmsgid: result.appmsgid, cover_verified: result.coverVerified === true, body_images_verified: result.bodyImagesVerified === true, body_image_count: Number(result.bodyImageCount || 0), verified_at: new Date().toISOString() } };
  fs.writeFileSync(draft.markdownPath, matter.stringify(parsed.content, parsed.data));
}

export async function run(opts) {
  const draft = inspectDraftForBrowserPublish(opts.draftRef);
  const outDir = path.join(draft.draftDir, 'publish'); fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(outDir, 'wechat-browser.html'); fs.writeFileSync(htmlPath, buildWechatBrowserHtml(draft, opts));
  const prepared = { status: 'prepared', htmlPath, coverPath: draft.coverPath, title: draft.title };
  if (!opts.submit || opts.prepareOnly) return prepared;
  const result = await saveBrowserDraft(draft, htmlPath, opts.profile); updatePublishState(draft, result); return { ...prepared, ...result };
}

async function main() {
  try { const result = await run(parseArgs(process.argv.slice(2))); console.log(JSON.stringify(result, null, 2)); }
  catch (error) { console.error(`ERROR: ${error.message}`); process.exitCode = 1; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
