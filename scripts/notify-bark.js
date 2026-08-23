#!/usr/bin/env node

import { pathToFileURL } from 'node:url';

const DEFAULT_TITLE = 'PromptIO 流程完成';

function trimSegment(value) {
  return String(value ?? '').trim();
}

function encodeSegment(value) {
  return encodeURIComponent(String(value ?? '').trim());
}

export function buildBarkUrl(baseUrl, { title, body }) {
  if (!baseUrl) {
    throw new Error('BARK_NOTIFY_URL is required');
  }
  if (!title || !body) {
    throw new Error('Bark title and body are required');
  }

  const rawTitle = trimSegment(title);
  const rawBody = trimSegment(body);
  const encodedTitle = encodeSegment(rawTitle);
  const encodedBody = encodeSegment(rawBody);
  const template = String(baseUrl).trim();

  if (
    template.includes('{title}') ||
    template.includes('{body}') ||
    template.includes('__TITLE__') ||
    template.includes('__BODY__') ||
    template.includes('推送标题') ||
    template.includes('这里改成你自己的推送内容')
  ) {
    return template
      .replaceAll('{title}', encodedTitle)
      .replaceAll('{body}', encodedBody)
      .replaceAll('__TITLE__', encodedTitle)
      .replaceAll('__BODY__', encodedBody)
      .replaceAll('推送标题', encodedTitle)
      .replaceAll('这里改成你自己的推送内容', encodedBody);
  }

  const url = new URL(template);
  const pathname = url.pathname.replace(/\/+$/, '');
  url.pathname = `${pathname}/${rawTitle}/${rawBody}`;
  return url.toString();
}

export function parseArgs(argv) {
  const options = {
    title: process.env.BARK_NOTIFY_TITLE || DEFAULT_TITLE,
    body: process.env.BARK_NOTIFY_BODY || '',
    url: process.env.BARK_NOTIFY_URL || '',
    dryRun: false,
    softFail: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--title' || arg === '-t') {
      options.title = argv[++index] || '';
    } else if (arg === '--body' || arg === '-b') {
      options.body = argv[++index] || '';
    } else if (arg === '--url') {
      options.url = argv[++index] || '';
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--soft-fail') {
      options.softFail = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

export async function notifyBark({
  url = process.env.BARK_NOTIFY_URL || '',
  title = process.env.BARK_NOTIFY_TITLE || DEFAULT_TITLE,
  body = process.env.BARK_NOTIFY_BODY || '',
  dryRun = false,
  fetchImpl = globalThis.fetch,
} = {}) {
  if (!url) {
    return { ok: true, skipped: true, reason: 'BARK_NOTIFY_URL is not set' };
  }

  const targetUrl = buildBarkUrl(url, { title, body });
  if (dryRun) {
    return { ok: true, dryRun: true, url: targetUrl };
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('fetch is not available in this Node.js runtime');
  }

  const init = { method: 'GET' };
  const timeoutMs = Number(process.env.BARK_NOTIFY_TIMEOUT_MS || 10000);
  if (globalThis.AbortSignal?.timeout && Number.isFinite(timeoutMs) && timeoutMs > 0) {
    init.signal = AbortSignal.timeout(timeoutMs);
  }

  const response = await fetchImpl(targetUrl, init);
  const responseText = typeof response.text === 'function' ? await response.text() : '';
  if (!response.ok) {
    throw new Error(`Bark notify failed HTTP ${response.status}: ${responseText.slice(0, 200)}`);
  }

  return { ok: true, sent: true, status: response.status, url: targetUrl };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  try {
    const result = await notifyBark(options);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(error.message);
    if (!options.softFail) {
      process.exitCode = 1;
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
