import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROMPTS_DIR = path.resolve(__dirname, '../../config/prompts');
const TITLE_SCORER_PROMPT = path.join(PROMPTS_DIR, 'title-scorer.md');
const GOLD_QUOTE_PROMPT = path.join(PROMPTS_DIR, 'gold-quote.md');
const SUMMARY_PROMPT = path.join(PROMPTS_DIR, 'summary.md');

/**
 * Parse JSON from LLM response, handling code fences and malformed output.
 * Adapted from pipeline.js parseScoreJSON but checks obj.title && obj.score.
 */
function parseTitleJSON(text) {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) || text.match(/\[[\s\S]*\]/);
    let jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    jsonStr = jsonStr.replace(/[\x00-\x1f\x7f]/g, m => m === '\n' || m === '\r' || m === '\t' ? m : ' ');
    jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    // Fallback: extract individual JSON objects
    const objects = [];
    const objRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    let match;
    while ((match = objRegex.exec(text)) !== null) {
      try {
        const obj = JSON.parse(match[0]);
        if (obj.title && obj.score) objects.push(obj);
      } catch { /* skip */ }
    }
    return objects.length > 0 ? objects : null;
  }
}

/**
 * Generate 3 candidate titles, score them, return the best one.
 * Throws on failure (caller handles via Promise.allSettled).
 */
export async function titleScorer(articleText, client, model) {
  const prompt = fs.readFileSync(TITLE_SCORER_PROMPT, 'utf-8');
  const response = await client.messages.create({
    model,
    max_tokens: 2000,
    messages: [{ role: 'user', content: `${prompt}\n\n---\n\n${articleText}` }],
  });

  const text = response.content[0].text;
  const titles = parseTitleJSON(text);

  if (!titles || titles.length === 0) {
    throw new Error('titleScorer: failed to parse titles from LLM response');
  }

  // Coerce scores to numbers, sort descending
  const scored = titles.map(t => ({
    title: t.title,
    score: Number(t.score),
  })).sort((a, b) => b.score - a.score);

  return {
    title: scored[0].title,
    title_score: scored[0].score,
    title_alternatives: scored,
  };
}

/**
 * Extract a shareable gold quote from the article.
 * Throws on failure.
 */
export async function goldQuote(articleText, client, model) {
  const prompt = fs.readFileSync(GOLD_QUOTE_PROMPT, 'utf-8');
  const response = await client.messages.create({
    model,
    max_tokens: 500,
    messages: [{ role: 'user', content: `${prompt}\n\n---\n\n${articleText}` }],
  });

  const text = response.content[0].text.trim();
  if (!text) {
    throw new Error('goldQuote: LLM returned empty response');
  }

  return { gold_quote: text };
}

/**
 * Generate a suspense-driven summary for feed preview.
 * Throws on failure.
 */
export async function summaryGen(articleText, client, model) {
  const prompt = fs.readFileSync(SUMMARY_PROMPT, 'utf-8');
  const response = await client.messages.create({
    model,
    max_tokens: 1000,
    messages: [{ role: 'user', content: `${prompt}\n\n---\n\n${articleText}` }],
  });

  const text = response.content[0].text.trim();
  if (!text) {
    throw new Error('summaryGen: LLM returned empty response');
  }

  return { summary: text };
}
