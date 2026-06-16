import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseArgs,
  slugify,
  normalizeMarkdown,
  extractJson,
  buildCodexExecArgs,
  buildGenerationPrompt,
  chooseDraftSlug,
} from '../scripts/single.js';

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
      '--slug', 'stable-topic-slug',
      '--voice', 'narrative',
      '--date', '2026-05-25',
      '--llm-provider', 'codex',
      '--text-model', 'claude-test',
      '--codex-bin', 'codex-test',
      '--codex-profile', 'local',
      '--cover-model', 'gpt-image-2',
      '--no-cover',
      '--require-cover',
      '--overwrite',
    ]);

    assert.equal(opts.contentFile, 'article.md');
    assert.equal(opts.angle, '实操分析');
    assert.equal(opts.title, '指定标题');
    assert.equal(opts.slug, 'stable-topic-slug');
    assert.equal(opts.voice, 'narrative');
    assert.equal(opts.date, '2026-05-25');
    assert.equal(opts.llmProvider, 'codex');
    assert.equal(opts.textModel, 'claude-test');
    assert.equal(opts.codexBin, 'codex-test');
    assert.equal(opts.codexProfile, 'local');
    assert.equal(opts.coverModel, 'gpt-image-2');
    assert.equal(opts.noCover, true);
    assert.equal(opts.requireCover, true);
    assert.equal(opts.overwrite, true);
  });

  it('slugify: keeps readable Chinese titles instead of forcing kebab-case', () => {
    assert.equal(
      slugify('OpenAI 给 Codex 上了 Windows sandbox，IDE 怎么跟？'),
      'OpenAI 给 Codex 上了 Windows sandbox，IDE 怎么跟？'
    );
  });

  it('chooseDraftSlug: prefers the final Chinese title over generated or requested slugs', () => {
    assert.equal(
      chooseDraftSlug({
        requestedSlug: 'dify-rag-mcp-agent-workflow',
        generatedSlug: 'Dify-不只做聊天框-RAG-MCP-Agent-怎么交付',
        title: 'Dify 不只做聊天框，RAG、MCP、Agent 怎么交付',
      }),
      'Dify 不只做聊天框，RAG、MCP、Agent 怎么交付'
    );
  });

  it('chooseDraftSlug: falls back to Chinese title when the requested slug is English-only', () => {
    assert.equal(
      chooseDraftSlug({
        requestedSlug: 'dify-rag-mcp-agent-workflow',
        generatedSlug: '',
        title: '中小团队用 Dify 交付 AI 应用',
      }),
      '中小团队用 Dify 交付 AI 应用'
    );
  });

  it('normalizeMarkdown: removes frontmatter and keeps an H1', () => {
    const md = normalizeMarkdown('---\ntitle: old\n---\n正文第一段', '新标题');
    assert.equal(md, '# 新标题\n\n正文第一段\n');
  });

  it('normalizeMarkdown: rewrites an existing H1 to the default XHS title', () => {
    const md = normalizeMarkdown('# 公众号备用标题\n\n正文第一段', '小红书默认标题');
    assert.equal(md, '# 小红书默认标题\n\n正文第一段\n');
  });

  it('extractJson: extracts JSON from a markdown code fence', () => {
    const parsed = extractJson('```json\n{"title":"测试","reach":8}\n```');
    assert.deepEqual(parsed, { title: '测试', reach: 8 });
  });

  it('extractJson: ignores non-json source code fences before the JSON object', () => {
    const parsed = extractJson('```bash\ncurl https://models.dev/api.json\n```\n\n{"title":"测试","reach":8}');
    assert.deepEqual(parsed, { title: '测试', reach: 8 });
  });

  it('parseArgs: validates llm provider', () => {
    assert.throws(
      () => parseArgs(['article.md', '--llm-provider', 'ollama']),
      /--llm-provider must be anthropic or codex/
    );
  });

  it('parseArgs: defaults Anthropic model only for Anthropic provider', () => {
    const anthropic = parseArgs(['article.md']);
    assert.equal(anthropic.llmProvider, 'anthropic');
    assert.equal(anthropic.textModel, process.env.LLM_MODEL || 'claude-sonnet-4-20250514');

    const codex = parseArgs(['article.md', '--llm-provider', 'codex']);
    assert.equal(codex.llmProvider, 'codex');
    assert.equal(codex.textModel, process.env.CODEX_MODEL || '');
  });

  it('parseArgs: does not reuse LLM_MODEL when Codex provider is selected', () => {
    const oldLlmProvider = process.env.LLM_PROVIDER;
    const oldLlmModel = process.env.LLM_MODEL;
    const oldCodexModel = process.env.CODEX_MODEL;
    try {
      process.env.LLM_PROVIDER = 'codex';
      process.env.LLM_MODEL = 'glm-4.7';
      delete process.env.CODEX_MODEL;

      const opts = parseArgs(['article.md']);
      assert.equal(opts.llmProvider, 'codex');
      assert.equal(opts.textModel, '');
    } finally {
      restoreEnv('LLM_PROVIDER', oldLlmProvider);
      restoreEnv('LLM_MODEL', oldLlmModel);
      restoreEnv('CODEX_MODEL', oldCodexModel);
    }
  });

  it('buildCodexExecArgs: uses non-interactive read-only execution', () => {
    const args = buildCodexExecArgs({
      textModel: 'gpt-5.1-codex',
      codexProfile: 'local',
    }, '/tmp/promptio-output.txt');

    assert.deepEqual(args.slice(0, 2), ['exec', '--ephemeral']);
    assert.ok(args.includes('--sandbox'));
    assert.ok(args.includes('read-only'));
    assert.ok(args.includes('-o'));
    assert.ok(args.includes('/tmp/promptio-output.txt'));
    assert.ok(args.includes('--model'));
    assert.ok(args.includes('gpt-5.1-codex'));
    assert.ok(args.includes('--profile'));
    assert.ok(args.includes('local'));
    assert.equal(args.at(-1), '-');
  });

  it('buildGenerationPrompt: keeps XHS content as the default primary draft', () => {
    const prompt = buildGenerationPrompt({
      article: {
        frontmatter: { title: '测试源' },
        sections: ['测试正文'],
      },
      angle: '测试角度',
      title: '',
      voice: '',
    });

    assert.ok(prompt.includes('"xhs_title"'));
    assert.ok(prompt.includes('小红书正文是默认主稿'));
    assert.ok(prompt.includes('title 和 xhs_title 都按小红书发布标题写'));
    assert.ok(prompt.includes('不能出现 Reddit、Hacker News/HN、OpenRouter'));
    assert.ok(prompt.includes('去 AI 味终审'));
    assert.ok(prompt.includes('openclaw 或 Hermes'));
    assert.ok(prompt.includes('至少有 3 个 ## 二级标题'));
    assert.ok(prompt.includes('可收藏清单或步骤清单'));
    assert.ok(prompt.includes('不要复用“今晚可以这样...”'));
    assert.ok(prompt.includes('“今晚能做什么”'));
    assert.ok(prompt.includes('“今晚想动手”'));
    assert.ok(!prompt.includes('今晚可以这样搭'));
    assert.ok(!prompt.includes('"xhs": "# 小红书标题'));
    assert.ok(!prompt.includes('单独生成一份适合小红书图文笔记的短稿'));
  });
});

function restoreEnv(key, value) {
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
}
