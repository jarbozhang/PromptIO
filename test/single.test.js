import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
});
