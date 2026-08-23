import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const PROMPTS = {
  title: path.join(ROOT, 'config/prompts/title-scorer.md'),
  quote: path.join(ROOT, 'config/prompts/gold-quote.md'),
  summary: path.join(ROOT, 'config/prompts/summary.md'),
};

export async function titleScorer(articleText, client, model) {
  const response = await callClaude(client, model, buildPrompt(PROMPTS.title, articleText));
  const candidates = parseTitleCandidates(response)
    .map(item => ({
      title: String(item.title || '').trim(),
      score: Number(item.score),
    }))
    .filter(item => item.title && Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score);

  if (!candidates.length) throw new Error('failed to parse titles');

  return {
    title: candidates[0].title,
    title_score: candidates[0].score,
    title_alternatives: candidates,
  };
}

export async function goldQuote(articleText, client, model) {
  const text = (await callClaude(client, model, buildPrompt(PROMPTS.quote, articleText))).trim();
  if (!text) throw new Error('empty response from goldQuote');
  return { gold_quote: stripWrappingQuotes(text) };
}

export async function summaryGen(articleText, client, model) {
  const text = (await callClaude(client, model, buildPrompt(PROMPTS.summary, articleText))).trim();
  if (!text) throw new Error('empty response from summaryGen');
  return { summary: text };
}

function buildPrompt(promptPath, articleText) {
  return [
    fs.readFileSync(promptPath, 'utf8'),
    '',
    '--- article ---',
    articleText,
  ].join('\n');
}

async function callClaude(client, model, prompt) {
  const res = await client.messages.create({
    model,
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = (res.content || [])
    .map(part => typeof part.text === 'string' ? part.text : '')
    .join('\n')
    .trim();

  return text;
}

function parseTitleCandidates(text) {
  const jsonText = extractJsonArray(text);
  if (jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // Fall through to object-by-object parsing below.
    }
  }

  const objects = [];
  const re = /\{[^{}]*"title"[^{}]*"score"[^{}]*\}/g;
  for (const match of String(text).matchAll(re)) {
    try {
      objects.push(JSON.parse(match[0]));
    } catch {
      // Continue scanning; title generation often returns partial prose around JSON.
    }
  }
  if (objects.length) return objects;

  throw new Error('failed to parse titles');
}

function extractJsonArray(text) {
  const raw = String(text || '').trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();

  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start !== -1 && end > start) return raw.slice(start, end + 1);

  const objStart = raw.indexOf('{');
  const objEnd = raw.lastIndexOf('}');
  if (objStart !== -1 && objEnd > objStart) return raw.slice(objStart, objEnd + 1);

  return '';
}

function stripWrappingQuotes(text) {
  return text.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();
}
