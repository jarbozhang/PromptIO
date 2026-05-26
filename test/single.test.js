import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseArgs, slugify, normalizeMarkdown, extractJson } from '../scripts/single.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts/single.js');

// Helper: create a temp content file
function writeTempContent(content) {
  const tmpPath = path.join(ROOT, 'test', `.tmp-content-${Date.now()}.txt`);
  fs.writeFileSync(tmpPath, content);
  return tmpPath;
}

function cleanup(filepath) {
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
}

describe('single.js CLI', () => {
  it('error: exits with usage when no arguments given', () => {
    assert.throws(
      () => execFileSync('node', [SCRIPT], { encoding: 'utf-8', stdio: 'pipe' }),
      (err) => {
        assert.ok(err.stderr.includes('Usage:'));
        assert.equal(err.status, 1);
        return true;
      }
    );
  });

  it('error: exits when content file does not exist', () => {
    assert.throws(
      () => execFileSync('node', [SCRIPT, '/nonexistent/file.txt'], { encoding: 'utf-8', stdio: 'pipe' }),
      (err) => {
        assert.ok(err.stderr.includes('file not found'));
        assert.equal(err.status, 1);
        return true;
      }
    );
  });

  it('error: exits when content file is empty', () => {
    const tmpPath = writeTempContent('');
    try {
      assert.throws(
        () => execFileSync('node', [SCRIPT, tmpPath], { encoding: 'utf-8', stdio: 'pipe' }),
        (err) => {
          assert.ok(err.stderr.includes('empty'));
          assert.equal(err.status, 1);
          return true;
        }
      );
    } finally {
      cleanup(tmpPath);
    }
  });

  it('parseArgs: valid args pass CLI validation (no usage/file errors)', () => {
    const tmpPath = writeTempContent('Test article content here.');
    try {
      // Run with invalid API key to force LLM failure, but arg parsing should succeed
      const result = execFileSync('node', [SCRIPT, tmpPath, '--angle', '实操分析'], {
        encoding: 'utf-8',
        stdio: 'pipe',
        env: { ...process.env, ANTHROPIC_API_KEY: 'sk-invalid-key', ANTHROPIC_BASE_URL: 'http://localhost:1' },
        timeout: 5000,
      });
      // If it somehow succeeds, that's fine too
      assert.ok(true);
    } catch (err) {
      // Should fail at LLM call, not at arg parsing
      const stderr = err.stderr || '';
      assert.ok(!stderr.includes('Usage:'), 'should not show usage error');
      assert.ok(!stderr.includes('file not found'), 'should not show file error');
      assert.ok(!stderr.includes('empty'), 'should not show empty error');
    } finally {
      cleanup(tmpPath);
    }
  });

  it('parseArgs: supports platform draft options', () => {
    const opts = parseArgs([
      'article.md',
      '--angle', '实操分析',
      '--title', '指定标题',
      '--voice', 'narrative',
      '--date', '2026-05-25',
      '--text-model', 'claude-test',
      '--cover-model', 'gpt-image-2',
      '--no-cover',
      '--require-cover',
      '--overwrite',
    ]);

    assert.equal(opts.contentFile, 'article.md');
    assert.equal(opts.angle, '实操分析');
    assert.equal(opts.title, '指定标题');
    assert.equal(opts.voice, 'narrative');
    assert.equal(opts.date, '2026-05-25');
    assert.equal(opts.textModel, 'claude-test');
    assert.equal(opts.coverModel, 'gpt-image-2');
    assert.equal(opts.noCover, true);
    assert.equal(opts.requireCover, true);
    assert.equal(opts.overwrite, true);
  });

  it('slugify: keeps Chinese characters and English brands in kebab-case', () => {
    assert.equal(
      slugify('OpenAI 给 Codex 上了 Windows sandbox，国内 IDE 怎么跟？'),
      'openai-给-codex-上了-windows-sandbox-国内-ide-怎么跟'
    );
  });

  it('normalizeMarkdown: removes frontmatter and keeps an H1', () => {
    const md = normalizeMarkdown('---\ntitle: old\n---\n正文第一段', '新标题');
    assert.equal(md, '# 新标题\n\n正文第一段\n');
  });

  it('extractJson: extracts JSON from a markdown code fence', () => {
    const parsed = extractJson('```json\n{"title":"测试","reach":8}\n```');
    assert.deepEqual(parsed, { title: '测试', reach: 8 });
  });
});
