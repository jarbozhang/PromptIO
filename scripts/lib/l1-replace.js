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
  ['\uFF1A', '\uFF0C'],  // ： → ，
  ['\u2014\u2014', '\uFF0C'],  // —— → ，
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

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
