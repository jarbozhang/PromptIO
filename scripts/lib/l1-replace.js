// L1-1 禁用词替换映射 (from config/prompts/wechat.md L1-1)
// 每个 entry: [pattern, replacement]
// replacement 为 null 表示直接删除（删掉后可能留下多余空格，后续清理）
const FORBIDDEN_WORDS = [
  ['说白了', '坦率讲'],
  ['意味着什么', '那结果会怎样'],
  ['这意味着', '所以呢'],
  ['本质上', '说到底'],
  ['换句话说', '你想想看'],
  ['不可否认', null],
  ['综上所述', null],
  ['总的来说', null],
  ['值得注意的是', null],
  ['不难发现', null],
  ['让我们来看看', null],
  ['众所周知', null],
  ['在当今时代', null],
];

// L1-2 禁用标点 (fullwidth only — ASCII colon/dash untouched)
const FORBIDDEN_PUNCTUATION = [
  ['：', '，'],  // ： → ，
  ['——', '，'],  // —— → ，
];

// Layer 1 合规词表 — 命中任一项直接跳过文章生成（小红书封建迷信类）
// 每一项是高置信度不可修主线，边缘 case（如"算命先生"人物实体上下文）交给 QA L6 判断
const SKIP_PATTERNS = [
  '算命', '看风水', '批八字', '占卜', '塔罗牌', '运势测算',
  '符咒', '开光', '代参拜', '代开光',
  '预测未来', '改变命运', '转运', '招财', '破财', '开运',
  '紫微斗数', '奇门遁甲', '易经预测', '命格',
];

// Layer 2 合规词表 — 可机械删除的禁用词，applyCompliance 直接删除
// 出现时优先删改主稿，不直接舍弃文章
const COMPLIANCE_DELETE = [
  '翻墙', '梯子', '科学上网', '魔法上网', '全局代理',
  '自建节点', '机场订阅', 'Clash 订阅', 'V2Ray', 'Shadowsocks', 'SSR 订阅',
  '加微信', '加我微信', '私信我', '主页领取', '主页有链接',
  '评论区蹲', '求赞', '求关注', '求收藏', '点个赞', '关注我',
  '进群', '加群', '扫码入群', '领取资料',
];

// Layer 3 合规词表 — 拉踩词软化替换，applyCompliance 执行替换
// 营销拉踩类，可以软化为中性表达保留核心意思
const RHETORIC_SOFTEN = [
  ['干翻', '追上'],
  ['吊打', '领先'],
  ['完爆', '比过'],
  ['碾压', '领先'],
  ['秒杀', '明显快于'],
  ['暴打', '超过'],
  ['完胜', '表现更好'],
  ['砍掉', '对标'],
  ['杀死', '切到同赛道'],
  ['平替', '开源替代'],
  ['订阅可以退了', '开源方案来了'],
  ['可以卸载了', '多了个新选择'],
  ['真的凉了', '遇到挑战'],
  ['要凉了', '遇到挑战'],
  ['变笨了', '有用户反馈变化'],
  ['割韭菜', '定价争议'],
  ['稳赚', '存在收益想象但有风险'],
  ['保赚', '存在收益想象但有风险'],
  ['包过', '提高通过概率'],
  ['100% 成功', '提高成功概率'],
  ['百分百成功', '提高成功概率'],
  ['月入过万保证', '存在收益想象但有风险'],
  ['全网第一', '少见的高水平'],
  ['行业第一', '行业靠前'],
  ['唯一选择', '一个选择'],
];

// Layer 4 合规词表 — 需要语义质修的问题，只报告不机械改写
// 这些问题通常能通过改标题、补标识、删除诱导或改行动建议修复，不能在选题阶段直接丢弃
const MANUAL_REWRITE = [
  'AI 托管账号', 'AI托管账号', '自动养号', '批量发笔记', '批量发布小红书',
  '自动评论', '自动私信', '模拟真人', '伪装真人', '规避审核', '绕过审核',
  '不标注 AI', '不用标 AI', '不用标注 AI',
  '荐股', '保本', '无风险收益', '包治', '根治', '治愈率', '疗效保证',
];

// Final publish-surface guard. Unlike checkCompliance(), this scans the full
// markdown including frontmatter and links because hidden metadata is still part
// of the only file we keep per article.
const PUBLISH_SURFACE_RULES = [
  {
    type: 'sensitive_source',
    pattern: 'Reddit',
    re: /\breddit\b|reddit\.com|\/r\/[a-z0-9_]+/gi,
  },
  {
    type: 'sensitive_source',
    pattern: 'Hacker News/HN',
    re: /\bhacker news\b|\bhacker-news\b|news\.ycombinator\.com|\bshow hn\b|\bask hn\b|\bhn\b/gi,
  },
  {
    type: 'sensitive_source',
    pattern: 'OpenRouter',
    re: /\bopenrouter\b|openrouter\.ai/gi,
  },
  {
    type: 'domestic_foreign_framing',
    pattern: '外网/国内/国外/境外/海外',
    re: /外网|国内|国外|境外|海外/gi,
  },
  {
    type: 'instruction_leak',
    pattern: '内部写作约束泄漏',
    re: /这篇只按|这篇不写|这篇我不写成|我这篇不写成|我没有把[^。；;\n]*(?:写成|全部跑一遍)|先说明边界|本文只基于公开|只按公开.*确认的信息写|不补实测结果|不编安装参数|不替仓库脑补|源材料摘要较短|必须明确标注信息边界|正文必须标注|只基于公开.*可验证能力|不能编造实测|不要写成连续说明文|正文必须/gi,
  },
  {
    type: 'formulaic_heading',
    pattern: '模板化今晚行动段',
    re: /^(?:#{2,3}\s*)?[^。\n]{0,18}今晚[^。\n]*(?:可以这样|能做什么|想动手|能做|可以做|就做|要开始|开始|演示|拿一个|动手|验证|跑起来|搭)[^。\n]*[。？?]?$/gmi,
  },
];

// Regex to match fenced code blocks (``` ... ```) and inline code (` ... `)
const CODE_BLOCK_RE = /```[\s\S]*?```|`[^`\n]+`/g;

/**
 * Replace L1-1 forbidden words and L1-2 forbidden punctuation.
 * Protects content inside markdown code blocks and inline code spans.
 *
 * @param {string} text - article markdown text
 * @returns {{ text: string, replacements: Array<{from: string, to: string, count: number}> }}
 */
export function l1Replace(text) {
  // 1. Extract code blocks, replace with placeholders
  const codeSlots = [];
  let safeText = text.replace(CODE_BLOCK_RE, (match) => {
    const idx = codeSlots.length;
    codeSlots.push(match);
    return `\x00CODE${idx}\x00`;
  });

  const replacements = [];

  // 2. Apply forbidden word replacements
  for (const [word, replacement] of FORBIDDEN_WORDS) {
    let count = 0;
    const re = new RegExp(escapeRegExp(word), 'g');
    safeText = safeText.replace(re, () => {
      count++;
      return replacement ?? '';
    });
    if (count > 0) {
      replacements.push({ from: word, to: replacement ?? '(deleted)', count });
    }
  }

  // 3. Apply forbidden punctuation replacements
  for (const [punct, replacement] of FORBIDDEN_PUNCTUATION) {
    let count = 0;
    const re = new RegExp(escapeRegExp(punct), 'g');
    safeText = safeText.replace(re, () => {
      count++;
      return replacement;
    });
    if (count > 0) {
      replacements.push({ from: punct, to: replacement, count });
    }
  }

  // 4. Clean up: collapse multiple spaces left by deletions
  safeText = safeText.replace(/  +/g, ' ');

  // 5. Restore code blocks
  let result = safeText.replace(/\x00CODE(\d+)\x00/g, (_, idx) => codeSlots[Number(idx)]);

  return { text: result, replacements };
}

/**
 * Scan text for compliance violations without modifying it.
 * Used in Step 3 (选题门) to decide whether to skip only truly irreparable topics,
 * and in Step 4.5 (QA L6) to inform the QA/rewrite loop what to repair in the main draft.
 *
 * @param {string} text - article markdown text or title + source summary
 * @returns {{ skip: boolean, reasons: Array<{layer: string, pattern: string, matched_text: string}> }}
 *   skip=true means the topic should be abandoned (only SKIP_PATTERNS hit).
 *   reasons includes skip, auto-rewrite, and manual-rewrite matches for diagnostic use.
 */
export function checkCompliance(text) {
  const codeSlots = [];
  const safeText = text.replace(CODE_BLOCK_RE, (match) => {
    codeSlots.push(match);
    return `\x00CODE${codeSlots.length - 1}\x00`;
  });

  const reasons = [];
  let skip = false;

  for (const pattern of SKIP_PATTERNS) {
    const re = new RegExp(escapeRegExp(pattern), 'g');
    const matches = [...safeText.matchAll(re)];
    if (matches.length > 0) {
      skip = true;
      for (const m of matches) {
        reasons.push({ layer: 'skip', pattern, matched_text: m[0] });
      }
    }
  }

  for (const pattern of COMPLIANCE_DELETE) {
    const re = new RegExp(escapeRegExp(pattern), 'g');
    const matches = [...safeText.matchAll(re)];
    for (const m of matches) {
      reasons.push({ layer: 'compliance_delete', pattern, matched_text: m[0] });
    }
  }

  for (const [pattern] of RHETORIC_SOFTEN) {
    const re = new RegExp(escapeRegExp(pattern), 'g');
    const matches = [...safeText.matchAll(re)];
    for (const m of matches) {
      reasons.push({ layer: 'rhetoric_soften', pattern, matched_text: m[0] });
    }
  }

  for (const pattern of MANUAL_REWRITE) {
    const re = new RegExp(escapeRegExp(pattern), 'g');
    const matches = [...safeText.matchAll(re)];
    for (const m of matches) {
      reasons.push({ layer: 'manual_rewrite', pattern, matched_text: m[0] });
    }
  }

  return { skip, reasons };
}

/**
 * Apply Layer 2 (COMPLIANCE_DELETE — delete) and Layer 3 (RHETORIC_SOFTEN — replace)
 * compliance transformations to text. Layer 1 (SKIP_PATTERNS) is NOT applied here
 * because SKIP means abandon; Layer 4 (MANUAL_REWRITE) is semantic and must be handled
 * by the QA/rewrite loop instead of mechanical replacement.
 *
 * l1Replace() is orthogonal to this — callers typically run l1Replace() for writing-style
 * normalization and then applyCompliance() separately for platform compliance.
 *
 * @param {string} text - article markdown text
 * @returns {{ text: string, replacements: Array<{layer: string, from: string, to: string, count: number}> }}
 */
export function applyCompliance(text) {
  const codeSlots = [];
  let safeText = text.replace(CODE_BLOCK_RE, (match) => {
    codeSlots.push(match);
    return `\x00CODE${codeSlots.length - 1}\x00`;
  });

  const replacements = [];

  for (const pattern of COMPLIANCE_DELETE) {
    let count = 0;
    const re = new RegExp(escapeRegExp(pattern), 'g');
    safeText = safeText.replace(re, () => {
      count++;
      return '';
    });
    if (count > 0) {
      replacements.push({ layer: 'compliance_delete', from: pattern, to: '(deleted)', count });
    }
  }

  for (const [pattern, softened] of RHETORIC_SOFTEN) {
    let count = 0;
    const re = new RegExp(escapeRegExp(pattern), 'g');
    safeText = safeText.replace(re, () => {
      count++;
      return softened;
    });
    if (count > 0) {
      replacements.push({ layer: 'rhetoric_soften', from: pattern, to: softened, count });
    }
  }

  safeText = safeText.replace(/  +/g, ' ');
  const result = safeText.replace(/\x00CODE(\d+)\x00/g, (_, idx) => codeSlots[Number(idx)]);

  return { text: result, replacements };
}

export function scanPublishSurface(text) {
  const raw = String(text || '');
  const issues = [];

  for (const rule of PUBLISH_SURFACE_RULES) {
    rule.re.lastIndex = 0;
    const matches = [...raw.matchAll(rule.re)];
    for (const match of matches) {
      issues.push({
        type: rule.type,
        pattern: rule.pattern,
        matched_text: match[0],
      });
    }
  }

  return issues;
}

export function sanitizeInternalInstructions(text) {
  let value = String(text || '');
  const patterns = [
    /[；;，,。]?\s*源材料摘要较短[，,]?\s*正文必须(?:明确)?标注[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*源材料摘要较短[。；;]?/g,
    /[；;，,。]?\s*正文必须(?:明确)?[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*必须改成小红书可收藏结构[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*不要写成连续说明文[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*只按公开[^。；;]*确认的信息写[。；;]?/g,
    /[；;，,。]?\s*只基于公开[^。；;]*可验证能力[。；;]?/g,
    /[；;，,。]?\s*不补实测结果[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*不编安装参数[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*不替仓库脑补[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*本文只基于公开[^。；;]*[。；;]?/g,
    /[；;，,。]?\s*我没有把[^。；;]*(?:写成|全部跑一遍)[^。；;]*[。；;]?/g,
  ];

  for (const pattern of patterns) value = value.replace(pattern, '。');

  return value
    .replace(/[。；;，,]\s*[。；;，,]+/g, '。')
    .replace(/\s+/g, ' ')
    .replace(/^[。；;，,\s]+/, '')
    .replace(/[；;，,\s]+$/g, '')
    .trim();
}

export function assertPublishSurfaceSafe(text, context = 'publish surface') {
  const issues = scanPublishSurface(text);
  if (!issues.length) return true;

  const summary = issues
    .slice(0, 8)
    .map(issue => `${issue.type}:${issue.matched_text}`)
    .join(', ');
  const err = new Error(`${context} contains blocked publish-surface terms: ${summary}`);
  err.issues = issues;
  throw err;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
