import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts/sync-to-obsidian.sh');

describe('sync-to-obsidian.sh', () => {
  it('uses draft markdown frontmatter title for Obsidian draft folder and filename', () => {
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'promptio-obsidian-sync-'));
    const src = path.join(workDir, 'src');
    const dst = path.join(workDir, 'vault');
    const draftDir = path.join(src, 'drafts', '2026-06-15', 'english-slug');
    const wikiDir = path.join(src, 'wiki');
    const topicsDir = path.join(src, 'topics');

    fs.mkdirSync(draftDir, { recursive: true });
    fs.mkdirSync(wikiDir, { recursive: true });
    fs.mkdirSync(topicsDir, { recursive: true });
    fs.writeFileSync(path.join(draftDir, 'english-slug.md'), [
      '---',
      'title: 中文标题：用于左侧导航',
      '---',
      '',
      '# 中文标题：用于左侧导航',
      '',
      '正文',
      '',
    ].join('\n'));
    fs.writeFileSync(path.join(wikiDir, 'index.md'), '# Wiki\n');
    fs.writeFileSync(path.join(topicsDir, '2026-06-15.json'), '{"topics":[]}\n');

    fs.mkdirSync(path.join(dst, 'drafts', '2026-06-15', 'english-slug'), { recursive: true });
    fs.writeFileSync(
      path.join(dst, 'drafts', '2026-06-15', 'english-slug', 'english-slug.md'),
      'stale\n'
    );

    try {
      execFileSync('bash', [SCRIPT], {
        cwd: ROOT,
        env: {
          ...process.env,
          PROMPTIO_SYNC_SRC: src,
          PROMPTIO_OBSIDIAN_DST: dst,
        },
        stdio: 'pipe',
      });

      const title = '中文标题：用于左侧导航';
      const chineseDraftDir = path.join(dst, 'drafts', '2026-06-15', title);
      assert.ok(fs.existsSync(path.join(chineseDraftDir, `${title}.md`)));
      assert.equal(fs.readdirSync(chineseDraftDir).filter(name => name.endsWith('.md')).length, 1);
      assert.ok(!fs.existsSync(path.join(chineseDraftDir, 'meta.yaml')));
      assert.ok(!fs.existsSync(path.join(dst, 'drafts', '2026-06-15', 'english-slug')));
      assert.ok(fs.existsSync(path.join(dst, 'wiki', 'index.md')));
      assert.ok(fs.existsSync(path.join(dst, 'topics', '2026-06-15.json')));
    } finally {
      fs.rmSync(workDir, { recursive: true, force: true });
    }
  });
});
