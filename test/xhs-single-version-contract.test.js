import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

describe('XHS single-version contract', () => {
  it('keeps L6 as a hard gate on the primary draft', () => {
    const qaPrompt = read('config/prompts/qa-check.md');
    const dailySkill = read('.claude/skills/daily-content-pipeline/SKILL.md');
    const wechatPrompt = read('config/prompts/wechat.md');

    assert.ok(qaPrompt.includes('L6 是主稿硬门槛'));
    assert.ok(qaPrompt.includes('AND l6_pass == true'));
    assert.ok(dailySkill.includes('只保留一份主稿'));
    assert.ok(wechatPrompt.includes('直接改这份主稿'));
  });

  it('does not reintroduce the old XHS derivative generation flow', () => {
    const activeText = [
      read('CLAUDE.md'),
      read('.claude/skills/daily-content-pipeline/SKILL.md'),
      read('config/prompts/qa-check.md'),
      read('config/prompts/wechat.md'),
      read('config/prompts/xhs-compliant.md'),
      read('config/prompts/video-script.md'),
    ].join('\n');

    assert.ok(!activeText.includes('xhs.compliant'));
    assert.ok(!activeText.includes('生成小红书合规版'));
    assert.ok(!activeText.includes('高 REACH 或 L6 fail 的文章在 Step 4.6 自动生成'));
    assert.ok(!activeText.includes('REACH >= 8 的高价值文章主动生成合规版'));
    assert.ok(!activeText.includes('L6 不影响 overall_pass'));
  });
});
