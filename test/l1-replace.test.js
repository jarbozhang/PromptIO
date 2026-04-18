import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { l1Replace } from '../scripts/lib/l1-replace.js';

describe('l1Replace — forbidden words (L1-1)', () => {
  it('replaces "说白了" with "坦率讲"', () => {
    const { text, replacements } = l1Replace('说白了这就是核心问题');
    assert.ok(!text.includes('说白了'));
    assert.ok(text.includes('坦率讲'));
    assert.equal(replacements[0].from, '说白了');
    assert.equal(replacements[0].count, 1);
  });

  it('replaces "本质上" with "说到底"', () => {
    const { text } = l1Replace('本质上就是这样');
    assert.ok(!text.includes('本质上'));
    assert.ok(text.includes('说到底'));
  });

  it('replaces "意味着什么" and "这意味着"', () => {
    const { text } = l1Replace('这意味着什么？意味着什么呢');
    assert.ok(!text.includes('意味着什么'));
    assert.ok(!text.includes('这意味着'));
  });

  it('deletes "不可否认" entirely', () => {
    const { text, replacements } = l1Replace('不可否认这是事实');
    assert.ok(!text.includes('不可否认'));
    const entry = replacements.find(r => r.from === '不可否认');
    assert.equal(entry.to, '(deleted)');
  });

  it('deletes "众所周知" entirely', () => {
    const { text } = l1Replace('众所周知AI很强');
    assert.ok(!text.includes('众所周知'));
  });

  it('deletes "值得注意的是" entirely', () => {
    const { text } = l1Replace('值得注意的是这个趋势');
    assert.ok(!text.includes('值得注意的是'));
  });

  it('deletes "综上所述" and "总的来说"', () => {
    const { text } = l1Replace('综上所述，总的来说效果不错');
    assert.ok(!text.includes('综上所述'));
    assert.ok(!text.includes('总的来说'));
  });

  it('handles multiple forbidden words in same text', () => {
    const input = '说白了，本质上这不可否认是个问题';
    const { text, replacements } = l1Replace(input);
    assert.ok(!text.includes('说白了'));
    assert.ok(!text.includes('本质上'));
    assert.ok(!text.includes('不可否认'));
    assert.ok(replacements.length >= 3);
  });
});

describe('l1Replace — forbidden punctuation (L1-2)', () => {
  it('replaces fullwidth colon "：" with fullwidth comma "，"', () => {
    const { text } = l1Replace('问题是：这很复杂');
    assert.ok(!text.includes('：'));
    assert.ok(text.includes('，'));
  });

  it('replaces em dash "——" with fullwidth comma "，"', () => {
    const { text } = l1Replace('这个工具——确实不错');
    assert.ok(!text.includes('——'));
    assert.ok(text.includes('，'));
  });

  it('does NOT replace ASCII colon ":"', () => {
    const input = 'url: https://example.com';
    const { text } = l1Replace(input);
    assert.equal(text, input);
  });
});

describe('l1Replace — no-op on clean text', () => {
  it('returns original text and empty replacements for clean input', () => {
    const input = '这是一段干净的文章，没有任何禁用词。';
    const { text, replacements } = l1Replace(input);
    assert.equal(text, input);
    assert.equal(replacements.length, 0);
  });
});

describe('l1Replace — code block protection', () => {
  it('does not replace forbidden words inside fenced code blocks', () => {
    const input = '正文说白了有问题\n\n```\n说白了这是代码里的\n```\n\n结尾';
    const { text } = l1Replace(input);
    // "说白了" in prose should be replaced
    assert.ok(!text.startsWith('说白了'));
    // "说白了" inside code block should remain
    assert.ok(text.includes('```\n说白了这是代码里的\n```'));
  });

  it('does not replace fullwidth colon inside inline code', () => {
    const input = '参数是`key：value`格式';
    const { text } = l1Replace(input);
    assert.ok(text.includes('`key：value`'));
  });

  it('does not replace fullwidth colon inside fenced code blocks', () => {
    const input = '正文：有冒号\n\n```yaml\ntitle: "标题：测试"\n```';
    const { text } = l1Replace(input);
    // prose colon replaced
    assert.ok(text.startsWith('正文，'));
    // code block colon preserved
    assert.ok(text.includes('标题：测试'));
  });
});
