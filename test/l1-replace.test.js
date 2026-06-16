import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  l1Replace,
  checkCompliance,
  applyCompliance,
  scanPublishSurface,
  assertPublishSurfaceSafe,
  sanitizeInternalInstructions,
} from '../scripts/lib/l1-replace.js';

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

  it('reports newer bashing and exaggerated claims without setting skip', () => {
    const { skip, reasons } = checkCompliance('这个工具碾压同行，号称稳赚');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.layer === 'rhetoric_soften' && r.pattern === '碾压'));
    assert.ok(reasons.some(r => r.layer === 'rhetoric_soften' && r.pattern === '稳赚'));
  });
});

describe('checkCompliance — manual rewrite reporting', () => {
  it('reports AI account automation as manual rewrite, not skip', () => {
    const { skip, reasons } = checkCompliance('用 AI 托管账号自动评论自动私信，模拟真人运营');
    assert.equal(skip, false);
    assert.ok(reasons.some(r => r.layer === 'manual_rewrite' && r.pattern === 'AI 托管账号'));
    assert.ok(reasons.some(r => r.layer === 'manual_rewrite' && r.pattern === '自动评论'));
    assert.ok(reasons.some(r => r.layer === 'manual_rewrite' && r.pattern === '模拟真人'));
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

  it('deletes engagement bait and private traffic phrases', () => {
    const { text, replacements } = applyCompliance('私信我，主页领取，求关注，扫码入群');
    assert.ok(!text.includes('私信我'));
    assert.ok(!text.includes('主页领取'));
    assert.ok(!text.includes('求关注'));
    assert.ok(!text.includes('扫码入群'));
    assert.ok(replacements.some(r => r.from === '私信我' && r.layer === 'compliance_delete'));
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

  it('softens exaggerated claims instead of skipping the article', () => {
    const { text, replacements } = applyCompliance('这是全网第一方案，保证稳赚，100% 成功');
    assert.ok(!text.includes('全网第一'));
    assert.ok(!text.includes('稳赚'));
    assert.ok(!text.includes('100% 成功'));
    assert.ok(replacements.some(r => r.from === '全网第一' && r.to === '少见的高水平'));
    assert.ok(replacements.some(r => r.from === '稳赚' && r.to === '存在收益想象但有风险'));
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

describe('scanPublishSurface — final publish guard', () => {
  it('flags sensitive source names and links in the full markdown', () => {
    const issues = scanPublishSurface('---\nsource: OpenRouter\n---\n正文引用 Reddit 和 news.ycombinator.com');
    assert.ok(issues.some(issue => issue.type === 'sensitive_source' && issue.matched_text === 'OpenRouter'));
    assert.ok(issues.some(issue => issue.type === 'sensitive_source' && issue.matched_text === 'Reddit'));
    assert.ok(issues.some(issue => issue.type === 'sensitive_source' && issue.matched_text === 'news.ycombinator.com'));
  });

  it('flags domestic/foreign framing terms', () => {
    const issues = scanPublishSurface('这个工具有国内可访问入口，也适合外网资料整理');
    assert.ok(issues.some(issue => issue.type === 'domestic_foreign_framing' && issue.matched_text === '国内'));
    assert.ok(issues.some(issue => issue.type === 'domestic_foreign_framing' && issue.matched_text === '外网'));
  });

  it('flags leaked internal writing instructions in final markdown', () => {
    const issues = scanPublishSurface('这篇只按公开仓库摘要能确认的信息写，不补实测结果，不编安装参数。');
    assert.ok(issues.some(issue => issue.type === 'instruction_leak'));
  });

  it('flags prompt-like boundary disclaimers that should be rewritten naturally', () => {
    const issues = scanPublishSurface('我这篇不写成亲测教程。先说明边界。源材料摘要较短，正文必须标注信息边界。');
    assert.ok(issues.some(issue => issue.type === 'instruction_leak'));
  });

  it('flags first-person rule explanations that leaked into copy', () => {
    const issues = scanPublishSurface('我没有把它写成已跑通实测，下面给你一条今晚能自己验证的路径。');
    assert.ok(issues.some(issue => issue.type === 'instruction_leak'));
  });

  it('flags formulaic action headings without banning natural body copy', () => {
    const issues = scanPublishSurface('## 今晚可以这样搭\n\n正文');
    assert.ok(issues.some(issue => issue.type === 'formulaic_heading'));
    assert.ok(scanPublishSurface('今晚能做什么？').some(issue => issue.type === 'formulaic_heading'));
    assert.ok(scanPublishSurface('今晚想动手，我建议先跑一条最短路径。').some(issue => issue.type === 'formulaic_heading'));
    assert.deepEqual(scanPublishSurface('正文里说今晚先跑一个低风险任务。'), []);
  });

  it('allows GitHub and neutral wording', () => {
    assert.deepEqual(
      scanPublishSurface('参考 GitHub release 和官方文档，本地运行即可复现'),
      []
    );
  });

  it('throws a useful error when publish surface is unsafe', () => {
    assert.throws(
      () => assertPublishSurfaceSafe('Hacker News 上的讨论', 'test article'),
      /test article contains blocked publish-surface terms/
    );
  });
});

describe('sanitizeInternalInstructions', () => {
  it('removes prompt-like constraints while keeping the useful angle', () => {
    const text = sanitizeInternalInstructions(
      '写成 Agent 开发者检查清单；源材料摘要较短，正文必须明确标注信息边界，并只基于公开仓库可验证能力。'
    );
    assert.equal(text, '写成 Agent 开发者检查清单。');
    assert.deepEqual(scanPublishSurface(text), []);
  });

  it('removes leaked first-person instruction phrasing from metadata', () => {
    const text = sanitizeInternalInstructions(
      '写 Hermes 新版本；我没有把它写成已跑通实测，下面给你一条今晚能自己验证的路径。'
    );
    assert.equal(text, '写 Hermes 新版本。');
    assert.deepEqual(scanPublishSurface(text), []);
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
