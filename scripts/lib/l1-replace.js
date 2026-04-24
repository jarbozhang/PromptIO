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
// 每一项是高置信度禁用词，边缘 case（如"算命先生"人物实体上下文）交给 QA L6 判断
const SKIP_PATTERNS = [
  '算命', '看风水', '批八字', '占卜', '塔罗牌', '运势测算',
  '符咒', '开光', '代参拜', '代开光',
  '预测未来', '改变命运', '转运', '招财', '破财', '开运',
  '紫微斗数', '奇门遁甲', '易经预测', '命格',
];

// Layer 2 合规词表 — 境外访问教程禁用词，applyCompliance 直接删除
// 行政合规类，出现即必删
const COMPLIANCE_DELETE = [
  '翻墙', '梯子', '科学上网', '魔法上网', '全局代理',
  '自建节点', '机场订阅', 'Clash 订阅', 'V2Ray', 'Shadowsocks', 'SSR 订阅',
];

// Layer 3 合规词表 — 拉踩词软化替换，applyCompliance 执行替换
// 营销拉踩类，可以软化为中性表达保留核心意思
const RHETORIC_SOFTEN = [
  ['干翻', '追上'],
  ['吊打', '领先'],
  ['完爆', '比过'],
  ['砍掉', '对标'],
  ['杀死', '切到同赛道'],
  ['平替', '开源替代'],
  ['订阅可以退了', '开源方案来了'],
  ['可以卸载了', '多了个新选择'],
  ['真的凉了', '遇到挑战'],
  ['变笨了', '有用户反馈变化'],
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
 * Used in Step 3 (选题门) to decide whether to skip a topic entirely,
 * and in Step 4.5 (QA L6) to inform the QA agent what to flag.
 *
 * @param {string} text - article markdown text or title + source summary
 * @returns {{ skip: boolean, reasons: Array<{layer: string, pattern: string, matched_text: string}> }}
 *   skip=true means the article/topic should be abandoned (SKIP_PATTERNS hit).
 *   reasons always includes all matches across all three layers for diagnostic use.
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

  return { skip, reasons };
}

/**
 * Apply Layer 2 (COMPLIANCE_DELETE — delete) and Layer 3 (RHETORIC_SOFTEN — replace)
 * compliance transformations to text. Layer 1 (SKIP_PATTERNS) is NOT applied here
 * because SKIP means abandon; use checkCompliance() first to decide.
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

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
