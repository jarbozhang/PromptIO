import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { l1Replace, checkCompliance, applyCompliance } from '../scripts/lib/l1-replace.js';

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

describe('checkCompliance — SKIP_PATTERNS (Layer 1)', () => {
  it('flags "算命" as skip', () => {
    const { skip, reasons } = checkCompliance('今天聊聊赛博算命 Skill');
    assert.equal(skip, true);
    assert.ok(reasons.some(r => r.layer === 'skip' && r.pattern === '算命'));
  });

  it('flags "批八字" as skip', () => {
    const { skip, reasons } = checkCompliance('7 个 AI 玄学 Skills 批八字');
    assert.equal(skip, true);
    assert.ok(reasons.some(r => r.pattern === '批八字'));
  });

  it('returns skip=false for clean title', () => {
    const { skip, reasons } = checkCompliance('DeepSeek V4 今天发布，1.6T MoE 模型上线');
    assert.equal(skip, false);
    assert.equal(reasons.length, 0);
  });
});

describe('checkCompliance — COMPLIANCE_DELETE reporting', () => {
  it('reports "翻墙" without setting skip', () => {
    const { skip, reasons } = checkCompliance('需要翻墙才能访问');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.layer === 'compliance_delete' && r.pattern === '翻墙'));
  });

  it('reports "Clash 订阅" without setting skip', () => {
    const { skip, reasons } = checkCompliance('配置 Clash 订阅就能用');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.pattern === 'Clash 订阅'));
  });
});

describe('checkCompliance — RHETORIC_SOFTEN reporting', () => {
  it('reports "干翻" without setting skip', () => {
    const { skip, reasons } = checkCompliance('这玩意干翻了 Claude');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.layer === 'rhetoric_soften' && r.pattern === '干翻'));
  });

  it('reports "订阅可以退了" without setting skip', () => {
    const { skip, reasons } = checkCompliance('Midjourney 订阅可以退了');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.pattern === '订阅可以退了'));
  });
});

describe('checkCompliance — code block protection', () => {
  it('does not flag SKIP_PATTERNS inside fenced code blocks', () => {
    const input = '```\n算命\n```';
    const { skip, reasons } = checkCompliance(input);
    assert.equal(skip, false);
    assert.equal(reasons.length, 0);
  });

  it('handles empty input', () => {
    const { skip, reasons } = checkCompliance('');
    assert.equal(skip, false);
    assert.equal(reasons.length, 0);
  });
});

describe('applyCompliance — COMPLIANCE_DELETE (Layer 2)', () => {
  it('deletes "翻墙" from text', () => {
    const { text, replacements } = applyCompliance('教你翻墙访问');
    assert.ok(!text.includes('翻墙'));
    assert.ok(replacements.some(r => r.from === '翻墙' && r.to === '(deleted)'));
  });

  it('deletes "Clash 订阅"', () => {
    const { text } = applyCompliance('用 Clash 订阅就好');
    assert.ok(!text.includes('Clash 订阅'));
  });
});

describe('applyCompliance — RHETORIC_SOFTEN (Layer 3)', () => {
  it('softens "干翻" to "追上"', () => {
    const { text, replacements } = applyCompliance('这玩意干翻了 Claude');
    assert.ok(!text.includes('干翻'));
    assert.ok(text.includes('追上'));
    assert.ok(replacements.some(r => r.from === '干翻' && r.to === '追上'));
  });

  it('softens "订阅可以退了" to "开源方案来了"', () => {
    const { text } = applyCompliance('Midjourney 订阅可以退了');
    assert.ok(!text.includes('订阅可以退了'));
    assert.ok(text.includes('开源方案来了'));
  });

  it('softens "变笨了" to "有用户反馈变化"', () => {
    const { text } = applyCompliance('Claude Code 变笨了');
    assert.ok(!text.includes('变笨了'));
    assert.ok(text.includes('有用户反馈变化'));
  });
});

describe('applyCompliance — code block protection', () => {
  it('does not modify content inside fenced code blocks', () => {
    const input = '正文变笨了\n\n```\n变笨了 inside code\n```';
    const { text } = applyCompliance(input);
    assert.ok(text.includes('```\n变笨了 inside code\n```'));
    assert.ok(!text.startsWith('变笨了'));
  });

  it('returns empty result for empty input', () => {
    const { text, replacements } = applyCompliance('');
    assert.equal(text, '');
    assert.equal(replacements.length, 0);
  });
});

describe('backward compatibility (R9)', () => {
  it('l1Replace does not touch Layer 2/3 compliance words', () => {
    // Compliance words should pass through l1Replace untouched
    // (l1Replace only handles L1-1 writing style words)
    const { text } = l1Replace('这玩意干翻了 Claude，需要翻墙');
    assert.ok(text.includes('干翻'));
    assert.ok(text.includes('翻墙'));
  });

  it('l1Replace still handles L1-1 words when mixed with compliance words', () => {
    const { text } = l1Replace('说白了这玩意干翻了 Claude');
    assert.ok(!text.includes('说白了'));
    assert.ok(text.includes('坦率讲'));
    // 干翻 stays (compliance layer not in l1Replace scope)
    assert.ok(text.includes('干翻'));
  });
});
