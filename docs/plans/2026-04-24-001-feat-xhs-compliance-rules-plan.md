---
title: 小红书合规规则落地（四层防御）
type: feat
status: active
date: 2026-04-24
origin: docs/brainstorms/2026-04-24-xhs-compliance-requirements.md
---

# 小红书合规规则落地（四层防御）

## Overview

把 4 次违规案例整理出的合规规则沉淀到 PromptIO 的 prompt 层、机械替换层、QA 层和发布层，实现"公众号保锐度 + 小红书自动出合规版"的双版本策略。目标是：下一轮 daily pipeline 跑完后，不会再出现同类违规选题被生成，或即便被生成也不会误发小红书。

## Problem Frame

小红书账号 PromptIO（103989869）已累计 4 次处置，进入账号级警告状态：

- 案例 1（4/18）《Qwen3.6-35B 比 Claude Opus 4.7 好》→ 拉踩测评
- 案例 2（4/21）《GitHub 42k 星指南用 Gemini 学英语》→ 翻墙/境外软件
- 案例 3（4/20）《7 个 AI 玄学 Skills》→ 封建迷信
- 案例 4（4/23）账号级警告（由 #3 升级）

根因扫描后确认：`config/prompts/scoring.md` / `CLAUDE.md` / `.claude/skills/daily-content-pipeline/SKILL.md` 三份文件都把"AI 玄学"列为四大内容方向之一（案例 3 的直接制度来源）；`config/prompts/wechat.md` 完全没有平台合规约束；`scripts/lib/l1-replace.js` 只覆盖写作风格词，不覆盖合规禁用词。今天（4/24）生成的 8 篇中，F《Claude Code 变笨了》和 I《Midjourney 订阅可以退了》在现行规则下都能通过 QA，但本质是案例 1 同款。

## Requirements Trace

- R1. 删除"AI 玄学"作为内容方向（scoring.md / CLAUDE.md / SKILL.md 三处同步）
- R2. 选题门阶段自动识别玄学/翻墙教程/纯拉踩标题句式，触发即跳过或降权
- R3. 写作层给出明确的"标题禁用句式 / 境外工具提及规范 / 对比类写作模板"
- R4. L1 机械替换新增三类（玄学 skip、境外访问删除、拉踩软化），保持现有 L1-1/L1-2 行为不变
- R5. QA 新增 L6 小红书合规检查，failed 不阻止公众号发布，只影响小红书分发
- R6. REACH>=8 或 L6 fail 的文章自动生成 `xhs-version.md` 合规版
- R7. `meta.yaml` 增加 `platforms` 字段用于分平台发布标记，旧文章缺失该字段时按"公众号发、小红书不发"兜底
- R8. 今天的 F 和 I 两篇走新机制打标，验证端到端闭环
- R9. `scripts/lib/l1-replace.js` 现有测试全部继续通过（向后兼容）

**Origin actors:** 写作子代理（作者角色）、QA 子代理（审稿人角色）、小红书合规子代理（发布前合规转写）、最终发布脚本

**Origin flows:** F1 选题门过滤、F2 写作生成、F3 L1 机械替换、F4 QA 独立检查、F5 xhs 合规版生成、F6 跨平台发布

## Scope Boundaries

- 不引入第三方平台合规检测服务（自托管规则即可）
- 不做公众号/X 的新增合规规则（两平台现行内容无违规历史）
- 不自动重写已 passed 的历史 drafts（仅处理今天 F 和 I，其它历史文章由人工按需补）
- 不做申诉自动化（申诉策略仅在需求文档里文字记录）
- `npm run publish` 发布脚本的 platforms 分流逻辑**仅加读取和兜底**，实际分平台适配留给后续（下一个 plan）

### Deferred to Follow-Up Work

- `npm run publish` 真正按 platforms 字段分平台执行发布（本 plan 只保证字段正确写入）
- 历史 drafts 的批量 platforms 回填（用一次性脚本，不在本 plan 范围）
- 小红书合规版的"素材级改写"（如去掉原本配图里出现的境外 logo），本 plan 只管文本

---

## Context & Research

### Relevant Code and Patterns

- `scripts/lib/l1-replace.js` — 现有 L1-1/L1-2 替换实现，代码块/行内代码有 placeholder 保护
- `test/l1-replace.test.js` — node:test 原生测试，已覆盖 L1-1/L1-2 主要用例
- `config/prompts/qa-check.md` — L1-L5 打分 + JSON 输出契约，overall_pass 合取逻辑
- `config/prompts/wechat.md` — 现有写作规范 + L1-L5 自检条款（独立审稿人版 qa-check.md 的源）
- `.claude/skills/daily-content-pipeline/SKILL.md` Step 4.5 — 现有 QA 循环流程（L1 机械替换 + 独立 QA 检查 + 质修循环），为 Step 4.6 双版本的模式参考
- `drafts/2026-04-24/*/meta.yaml` — 现有 qa 字段的写入模式，扩展 platforms 字段时要参考同一 YAML dump 路径以避免日期序列化 bug（参见 `/tmp/update-qa-meta-20260424.mjs` 的 sed date fix 经验）

### Institutional Learnings

- 4/22 发现过同款 yaml.dump 把 `date` 序列化成 ISO 的 bug，fix 用 sed；本 plan U7 扩展 meta.yaml 时要复用这个 pattern
- 4/23 用户反馈 slug 必须"中文字符 + 英文品牌" kebab-case 禁止纯拼音（保存在 memory），本 plan 新文件名（xhs-version.md）不受影响因为只是固定名

### External References

- 小红书《社区公约》《违禁品清单》— 为将来做申诉时的参考依据，本 plan 不在代码里引用
- 无需外部框架文档（所有改动都是 prompt 和 Node.js 内置功能）

---

## Key Technical Decisions

- **L1 扩展采用"分层词表 + 新函数"而不是"改现有 FORBIDDEN_WORDS"**：保留 `FORBIDDEN_WORDS` / `FORBIDDEN_PUNCTUATION` 原样不改，新增三个常量（`SKIP_PATTERNS` / `COMPLIANCE_DELETE` / `RHETORIC_SOFTEN`），新增导出 `checkCompliance(text)` 返回 `{skip, reasons, softened}`。`l1Replace(text)` 签名和行为不变，保证 `test/l1-replace.test.js` 9 条既有用例全绿。
- **L6 检查走 QA 子代理 prompt 扩展，不走新脚本**：复用 Step 4.5b 的独立 QA agent，只在 `qa-check.md` 加一段 L6 规则 + JSON schema 加 `l6_pass / l6_issues`，不引入新 agent 或新脚本。
- **xhs-version.md 仅在触发条件成立时生成**：条件 = `L6 fail OR REACH >= 8`。前者保"高风险一定生成"，后者保"高价值文章一定覆盖小红书"。低 REACH 且无 L6 fail 的文章不额外生成（节省子代理配额）。
- **platforms 字段默认"小红书不发"**：缺失 `platforms` 或 `platforms.xhs` 时，发布脚本把它当作 `blocked` 处理（保守策略）；要发小红书必须显式设 `xhs: primary`（非高风险文章）或 `xhs: compliant`（触发合规版）或 `xhs: blocked`（拒发）。这避免历史 drafts 误发。
- **F 和 I 不改主版本正文，只打 `platforms.xhs: blocked` + 生成 xhs-version.md**：主版本是公众号/X 的"锐度版"，改它会破坏人格化表达；生成 xhs-version.md 让合规机制端到端跑一遍，同时保留两周后如果想重发小红书的素材。
- **qa-check.md 的 overall_pass 公式里 L6 只影响 `xhs_pass`，不影响 `overall_pass`**：维持现有 passed/needs_review/failed_qa 三态不变，新增字段 `xhs_pass: bool` 和 `xhs_issues: []`。这样 L6 fail 不会把文章拉进质修循环（避免为小红书合规牺牲公众号锐度）。

## Open Questions

### Resolved During Planning

- Q: 双版本放 Step 4.6 还是扩到 Step 4.5？→ 放 Step 4.6（新步骤）。理由：Step 4.5 是"独立 QA + 质修循环"，语义是"把主版本改到合格"；Step 4.6 是"为其它平台派生版本"，两个步骤意图差别明显，分开代码路径和 prompt 也更清晰。
- Q: 合规词表放 l1-replace.js 还是独立文件？→ 放同文件，新增常量分组。理由：l1-replace.js 只有 84 行，加三组合规词表后约 150 行仍轻量；独立文件反而要多 import 一次，无收益。
- Q: L6 是否算 overall_pass 的一部分？→ 不算。理由见上面 Key Technical Decisions 最后一条。
- Q: 历史 drafts 是否批量补 platforms 字段？→ 不。理由：保守默认"xhs: blocked"已覆盖；批量回填会大面积改 commit history 噪声。

### Deferred to Implementation

- xhs-compliant 子代理的 prompt 输出字数下限具体定到 600 还是 800（U6 实现时调）
- `scripts/lib/l1-replace.js` 的 `checkCompliance` 返回结构里是否要带定位信息（段落号/行号），实现时看选题门代理能不能用
- Step 4.6 里 xhs-version.md 生成失败时是否应该 block commit（实现时定，倾向 soft-fail + 在 meta.yaml 记 `xhs_generation_error` 字段）

---

## Implementation Units

- [ ] U1. **扩展 scripts/lib/l1-replace.js 加三层合规词表**

**Goal:** 新增 `SKIP_PATTERNS`（触发文章跳过）、`COMPLIANCE_DELETE`（境外访问词直接删）、`RHETORIC_SOFTEN`（拉踩词软化替换）三组词表 + 导出 `checkCompliance(text)` 函数。`l1Replace(text)` 签名和行为完全不变。

**Requirements:** R4, R9

**Dependencies:** 无

**Files:**
- Modify: `scripts/lib/l1-replace.js`
- Test: `test/l1-replace.test.js`

**Approach:**
- 在 `FORBIDDEN_WORDS` / `FORBIDDEN_PUNCTUATION` 常量下方追加三组新常量（见需求文档"禁用词表"章节）
- 新导出 `checkCompliance(text)`：扫描 `SKIP_PATTERNS` 命中 → 返回 `{skip: true, reasons: [{pattern, matched_text}]}`；扫描 `COMPLIANCE_DELETE` 和 `RHETORIC_SOFTEN` 收集 matches 但**不改文本**，只返回报告
- 新导出 `applyCompliance(text)`：对 `COMPLIANCE_DELETE` 执行删除，对 `RHETORIC_SOFTEN` 执行替换，返回 `{text, replacements}`，代码块保护逻辑复用 `CODE_BLOCK_RE`
- `l1Replace(text)` 函数体不动，导出签名不动

**Patterns to follow:**
- `scripts/lib/l1-replace.js:36-80` 的 code-block placeholder 保护 + replace loop 模式
- 命名风格：现有用 `FORBIDDEN_*`（SCREAMING_SNAKE）、导出用 camelCase

**Test scenarios:**
- Happy path: `checkCompliance('今天聊聊赛博算命 Skill')` 返回 `{skip: true, reasons: [{pattern: '算命', ...}]}`
- Happy path: `checkCompliance('自建 Clash 节点')` 返回包含 `RHETORIC_SOFTEN` 或 `COMPLIANCE_DELETE` 命中的报告（visual 对应"Clash 订阅"/"梯子"等词）
- Happy path: `applyCompliance('这玩意干翻了 Claude')` 返回 `{text: '这玩意追上了 Claude'}` 且 replacements[0].from === '干翻'
- Edge case: `applyCompliance('```\n算命\n```')` 返回原文不变（代码块保护）
- Edge case: `applyCompliance('')` 返回 `{text: '', replacements: []}`
- Error path: 不应用存在（纯函数，无 IO）
- Integration: `l1Replace('说白了这是算命')` 仍然只替换"说白了"→"坦率讲"，不碰"算命"（向后兼容验证）
- Integration: 现有 `test/l1-replace.test.js` 9 条既有用例必须全绿

**Verification:**
- `node --test test/l1-replace.test.js` 通过（新旧用例都过）
- 新增导出 `checkCompliance` 和 `applyCompliance` 出现在 `scripts/lib/l1-replace.js` 末尾

---

- [ ] U2. **config/prompts/scoring.md 加 Layer 1 选题门过滤**

**Goal:** 删除"AI 玄学"方向表述，新增 Layer 1 排除规则 + 降权规则清单，让选题评分子代理（Step 3）自动跳过/降权高风险选题。

**Requirements:** R1, R2

**Dependencies:** 无（纯 prompt 修改）

**Files:**
- Modify: `config/prompts/scoring.md`

**Approach:**
- `## Content Angles` 里把 `AI+中国特色场景 — 微信生态 AI 集成、AI 玄学、AI+电商、AI+教育` 改为 `AI+中国特色场景 — 微信生态 AI 集成、AI+电商、AI+教育`
- 新增 `## Hard Exclusions（强制排除，直接跳过）` section，列出需求文档 Layer 1 的 5 条强制排除规则（玄学词/翻墙教程/境外访问教程/纯拉踩标题/"X 平替 Y"）
- 新增 `## REACH Penalties（降权 -2）` section，列出需求文档 Layer 1 的 3 条降权规则
- 在 `## Selection rules` 里加一条：`Before scoring, run Hard Exclusions check. If any rule matches the title or source summary, skip this topic entirely (do not include in output).`

**Patterns to follow:**
- scoring.md 现有的 Chinese-only 规则文体
- `## REACH < 7 的典型特征（直接排除）` 已有的"排除"语义 section

**Test scenarios:**
- Test expectation: none -- prompt 文件修改，无单元测试；验证通过 U8 今天 F/I 的重跑和下一轮 pipeline 实测

**Verification:**
- `grep -n '玄学' config/prompts/scoring.md` 返回空
- 文件包含 `## Hard Exclusions` 和 `## REACH Penalties` 两个新 section

---

- [ ] U3. **config/prompts/wechat.md 加 Layer 2 写作规范**

**Goal:** 在现有写作指南之后追加标题禁用句式、境外工具提及规范、玄学完全禁区、对比类写作模板四段。

**Requirements:** R3

**Dependencies:** 无（纯 prompt 修改）

**Files:**
- Modify: `config/prompts/wechat.md`

**Approach:**
- 在现有 `### 观点：先极端再收回` 之后、`### 人格化` 之前插入新 section `### 平台合规（L6）`
- 在 `## 第四步：四层自检` 之后追加 `## 第五步：合规自检（L6 小红书）`，列出 5 条检查
- 追加 `### 对比类写作模板` 到 `### 写作技法` 内（与"升番逻辑"等并列）
- 添加内容直接从 `docs/brainstorms/2026-04-24-xhs-compliance-requirements.md` Layer 2 整段拷入（标题禁用句式、允许对比句式、境外工具规范、玄学禁区、对比模板）

**Patterns to follow:**
- wechat.md 现有 `### ...` 三级标题和 bullet 风格
- L1-1/L1-2 规则的"替换表"呈现方式

**Test scenarios:**
- Test expectation: none -- prompt 文件修改，由下一次 pipeline 实测验证写作子代理是否遵守新规则

**Verification:**
- `grep -cn '干翻\|吊打\|订阅可以退了' config/prompts/wechat.md` 返回非 0（禁用句式出现）
- `grep -n 'Clash\|翻墙\|梯子' config/prompts/wechat.md` 返回非空（境外访问词清单存在）

---

- [ ] U4. **config/prompts/qa-check.md 加 L6 小红书合规维度**

**Goal:** 新增 L6 独立合规维度，输出 `l6_pass / l6_issues / xhs_pass` 字段，不影响现有 `overall_pass`。

**Requirements:** R5

**Dependencies:** 无（纯 prompt 修改）

**Files:**
- Modify: `config/prompts/qa-check.md`

**Approach:**
- 在 `### 第五步：L5 传播潜力检查（1-10 分）` 之后、`## 输出格式` 之前新增 `### 第六步：L6 小红书合规检查（pass/fail）`
- 列出 5 条 fail 条件（标题禁用句式/玄学词/境外访问教程/拉踩对比列表/翻墙行动建议），映射到需求文档 Layer 3
- 修改 `## 输出格式` JSON schema 加 `l6_pass: bool, l6_issues: [{type, text, suggestion}], xhs_pass: bool`
- `xhs_pass` 计算规则：`l6_pass && l5_score >= 7`（必须传播潜力也及格才考虑发小红书）
- **overall_pass 公式保持不变**：仍然是 `l4_pass == true AND l1_violations == 0 AND l2_score >= 7 AND l3_score >= 7 AND l5_score >= 7`
- 在 `## 输出格式` 末尾加一句：`注意：L6 fail 不影响 overall_pass。overall_pass=true 且 xhs_pass=false 的文章会进入 Step 4.6 生成小红书合规版。`

**Patterns to follow:**
- qa-check.md 现有 L1-L5 step 结构（三级标题 + 检查项 bullet + 打分阈值）
- 现有 JSON schema 的字段命名（snake_case）

**Test scenarios:**
- Test expectation: none -- prompt 文件修改，由下一次 pipeline QA 实测验证

**Verification:**
- `grep -n 'L6\|l6_pass\|xhs_pass' config/prompts/qa-check.md` 三处均命中
- JSON schema 示例里包含新字段

---

- [ ] U5. **新建 config/prompts/xhs-compliant.md 小红书合规版生成子代理 prompt**

**Goal:** 提供一个完整的子代理 system prompt，输入"原公众号版正文 + qa l6_issues 列表"，输出合规的小红书版本 markdown。

**Requirements:** R6

**Dependencies:** 无

**Files:**
- Create: `config/prompts/xhs-compliant.md`

**Approach:**
- 文件开头写角色设定："你是一位熟悉小红书社区规则的内容编辑，任务是把一篇公众号风格文章改写成小红书合规版本。"
- 输入契约：`{原文markdown, l6_issues}`
- 输出契约：完整合规 markdown（不含 frontmatter，H1 开头，字数 800-1200）
- 核心规则（Layer 4）：
  - 标题改写：去掉 Layer 2 所有禁用句式（干翻/吊打/订阅可以退了/变笨了等）
  - 对比段落改写：所有"X 比 Y 好"改为并列呈现或带限定词
  - 境外工具访问教程段落：完全删除，改为 `国内用户可以通过 [OpenRouter/镜像站/国产替代] 使用`
  - 玄学词出现即直接跳过生成（返回错误信号 `cannot_comply`）
  - 正文末尾加标准免责声明：`本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。`
- 复用现有 L1-1/L1-2 规则（禁用词、禁用标点）
- 保留原文的"我"视角和人格化（不是机翻式去锐度）
- 输出末尾加 `<!-- REACH (xhs): X/10 | 品牌✓ 利益点✓ 可操作✓ -->` 注释，REACH 分是 xhs 版本的独立评估

**Patterns to follow:**
- `config/prompts/wechat.md` 现有的"角色 → 任务 → 规则 → 输出格式"结构
- `config/prompts/summary.md` 的简洁度（xhs-compliant 应比 wechat.md 短 1/3）

**Test scenarios:**
- Test expectation: none -- prompt 文件，由 U7 的 Step 4.6 首次调用 + U8 的 F/I 转写测试验证

**Verification:**
- 文件存在，行数 80-150（简洁但完整）
- 包含"免责声明"""国内可合法访问"""cannot_comply"三处关键语

---

- [ ] U6. **CLAUDE.md 同步删玄学方向 + 加合规条款（简短）**

**Goal:** 顶层项目文档和选题门保持一致，任何新代理/人类读到 CLAUDE.md 都知道合规底线。

**Requirements:** R1

**Dependencies:** 无（纯文档修改）

**Files:**
- Modify: `CLAUDE.md`

**Approach:**
- `## 内容定位` 四大方向里 `AI+中国特色场景（微信生态 AI、AI 玄学、AI+电商）` 删除"AI 玄学"
- `## 内容定位` section 末尾追加 `### 平台合规底线` 小节（5-8 行），列出三类高风险品类（玄学/境外访问教程/纯拉踩）和对应应对（选题门跳过/写作层禁用/QA L6 校验）
- 明确指向详细规则：`详见 docs/brainstorms/2026-04-24-xhs-compliance-requirements.md 和 config/prompts/scoring.md Hard Exclusions`

**Patterns to follow:**
- CLAUDE.md 现有的中文 bullet + 一级/二级标题风格

**Test scenarios:**
- Test expectation: none -- 项目文档修改

**Verification:**
- `grep -n '玄学' CLAUDE.md` 返回空
- 出现 `### 平台合规底线` 小节

---

- [ ] U7. **daily-content-pipeline/SKILL.md 加 Step 4.6 + Step 3 过滤引用 + 删玄学方向 + meta.yaml schema 扩展**

**Goal:** 把合规机制接入 daily pipeline：Step 3 引用 scoring.md 的 Hard Exclusions、Step 4.5 传入 L6 检查到 QA、Step 4.6 新增双版本生成、meta.yaml schema 新增 platforms 字段说明。

**Requirements:** R1, R2, R6, R7

**Dependencies:** U1（需要 checkCompliance 在 Step 3 伪代码里引用）、U4（L6 的 QA schema）、U5（xhs-compliant prompt 的调用方）

**Files:**
- Modify: `.claude/skills/daily-content-pipeline/SKILL.md`

**Approach:**
- `### Step 3: 选题评分（wiki-informed）` 里"评分标准（读取 config/prompts/scoring.md 获取完整版）"之下新增一条：`**合规前置检查：** 对每个候选选题，调用 scripts/lib/l1-replace.js 的 checkCompliance(title + source 摘要)，返回 skip=true 的直接排除；其它候选正常评分`
- `## 内容方向（四个方向，无固定配比）` 里把"AI+中国特色场景（微信生态 AI 集成、AI 玄学、AI+电商、AI+教育）"删除"AI 玄学"
- `### Step 4.5e 写入 QA 结果到 meta.yaml` 的 yaml 示例里 `qa:` 块加 `l6_pass / l6_issues / xhs_pass` 三字段
- 在 Step 4.5 之后 Step 5 之前新增 `### Step 4.6: xhs 合规版生成（条件触发）`：
  - 触发条件：`qa.overall_pass === true AND (qa.l6_pass === false OR reach >= 8)`
  - 对每篇符合条件的文章，启动子代理，system prompt 读 `config/prompts/xhs-compliant.md`，传入正文 + `l6_issues`
  - 子代理返回 `cannot_comply` 时：`meta.yaml.platforms.xhs = 'blocked'`，记 `xhs_blocked_reason: '玄学不可合规'`
  - 子代理返回合规 markdown 时：写入 `drafts/{date}/{slug}/xhs-version.md`，`meta.yaml.platforms.xhs = 'compliant'`
  - 其它情况（不触发条件）：`meta.yaml.platforms.xhs = 'primary'`（主版本可直接发）
  - 每篇写入后 meta.yaml 同样补 `platforms.wechat: primary` 和 `platforms.x: primary`
- `### Step 4.5e` meta.yaml schema 更新，加：
  ```yaml
  platforms:
    wechat: primary   # primary | blocked
    xhs: primary      # primary | compliant | blocked
    x: primary        # primary | blocked
  xhs_blocked_reason: ""  # 可选，仅 xhs=blocked 时
  ```
- 新增"向后兼容"条款：`读取 meta.yaml 时，如 platforms.xhs 字段不存在，按 blocked 处理（保守策略）`

**Patterns to follow:**
- SKILL.md 现有 `### Step 4.5a L1 机械替换` 的触发条件 + shell 调用示例结构
- `### Step 4.5e` 的 yaml 示例呈现方式

**Test scenarios:**
- Test expectation: none -- pipeline skill 文档修改，端到端验证通过 U8 + 下一轮 pipeline 实跑

**Verification:**
- `grep -n '玄学' .claude/skills/daily-content-pipeline/SKILL.md` 返回空
- 出现 `### Step 4.6` 段落
- meta.yaml schema 示例包含 `platforms` 字段

---

- [ ] U8. **今天 F 和 I 两篇按新机制回补：标 platforms + 生成 xhs-version.md**

**Goal:** 用新机制端到端跑一遍今天的两篇高风险文章，验证 U1-U7 的链路可用。

**Requirements:** R8

**Dependencies:** U1, U4, U5, U7（全部前置单元都要先完成）

**Files:**
- Modify: `drafts/2026-04-24/claude-code变笨了-anthropic-retro-opus4-7-system-prompt拆解/meta.yaml`
- Modify: `drafts/2026-04-24/open-generative-ai-200模型mit开源-midjourney订阅可以退了/meta.yaml`
- Create: `drafts/2026-04-24/claude-code变笨了-anthropic-retro-opus4-7-system-prompt拆解/xhs-version.md`
- Create: `drafts/2026-04-24/open-generative-ai-200模型mit开源-midjourney订阅可以退了/xhs-version.md`

**Approach:**
- 对 F：手动跑一次"QA 重检（只跑 L6）" → 确认 `l6_pass=false`（标题"变笨了"直接命中 Layer 2 禁用句式）
- 对 F：启动 xhs-compliant 子代理，输入正文 + l6_issues，得到 xhs-version.md
- 对 F：`meta.yaml` 增补：
  ```yaml
  qa:
    ...existing fields...
    l6_pass: false
    l6_issues:
      - type: title_banned_phrase
        text: "变笨了"
        suggestion: "改为中性描述"
    xhs_pass: false
  platforms:
    wechat: primary
    xhs: compliant
    x: primary
  ```
- 对 I 同样处理（标题"订阅可以退了"命中禁用句式）
- 其它 6 篇（A/B/C/D/G/H）用一次性脚本统一补 `platforms: {wechat: primary, xhs: primary, x: primary}`（不触发合规版生成）
- 本单元是"验证"性质，不回退 commit；如跑完发现 U1-U7 有 bug，修复后再重跑本单元

**Patterns to follow:**
- `/tmp/update-qa-meta-20260424.mjs` 的 js-yaml 写回模式 + sed 日期修复
- 现有 xhs-version.md 约定：纯 markdown，不含 frontmatter，H1 开头（和主版本同名不同 slug 不需要）

**Test scenarios:**
- Happy path: F 的 xhs-version.md 存在、标题不含"变笨了"、正文不含拉踩表述、末尾带免责声明
- Happy path: I 的 xhs-version.md 存在、标题不含"订阅可以退了"
- Edge case: A 的 reach=10、L6 可能 pass 但 reach>=8 触发条件 → 应生成 xhs-version.md（验证触发逻辑第二条也工作）
- Edge case: 其它 6 篇 meta.yaml 都含 `platforms` 字段
- Integration: 人工肉眼 review F 和 I 两份 xhs-version.md 的可读性和合规性，如不达标回到 U5 调整 xhs-compliant prompt

**Verification:**
- `ls drafts/2026-04-24/*/xhs-version.md` 至少返回 F 和 I 两个（若 A/D/G/H 的 REACH>=8 触发也一起生成，更好）
- `grep -l 'platforms:' drafts/2026-04-24/*/meta.yaml | wc -l` 返回 8

---

## System-Wide Impact

- **Interaction graph:** 选题代理（Step 3）新增一次 checkCompliance 调用；生成代理（Step 4）的 system prompt 读 wechat.md 新增内容；QA 代理（Step 4.5）的 JSON 输出新增 L6 字段；新增 xhs-compliant 代理（Step 4.6）读独立 prompt；将来的 `npm run publish` 要读 meta.yaml.platforms
- **Error propagation:** checkCompliance 失败（比如正则 bug）应被视为选题门 pass（保守，不错杀候选）；xhs-compliant 子代理 `cannot_comply` 时主版本仍然 commit，只是 `platforms.xhs=blocked`；Step 4.6 子代理异常时 meta.yaml 记 `xhs_generation_error`
- **State lifecycle risks:** meta.yaml 的 platforms 字段如果 U7 schema 定了但 U8 执行时写错（比如 `xhs: compliance` vs `xhs: compliant`），会误导后续发布脚本；U8 的 Verification 要用精确字符串匹配
- **API surface parity:** `scripts/lib/l1-replace.js` 的现有导出 `l1Replace` 必须保持签名、入参、返回结构完全不变（R9），防止已有 /tmp 脚本或 Step 4.5a 的 `node -e` 调用被打破
- **Integration coverage:** 跨 Step 4.5 → 4.6 → commit 的完整链路由 U8 手动验证（一次性），不新增自动化测试
- **Unchanged invariants:** `l1Replace` 的 L1-1/L1-2 行为、`qa-check.md` 的 overall_pass 三态（passed/needs_review/failed_qa）、`meta.yaml` 现有字段（title/status/date/reach/sources/tags/qa），这些都**不变**，本 plan 只做增量

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `l1Replace` 的新常量被错误复用到代码块外，破坏现有 9 条测试 | U1 明确约束"现有 FORBIDDEN_* 不动，新增常量独立，新增函数独立导出"，测试先跑 |
| xhs-compliant 子代理改写后的小红书版本仍然含拉踩/玄学词（prompt 没控住） | U5 的 prompt 里显式列 L1 合规词黑名单 + U8 人工 review 前两篇产出物 |
| Step 4.6 子代理启动失败（比如 bypass_permissions 不够）导致 commit 被 block | U7 明确 xhs 生成失败走 soft-fail + meta.yaml 记错误字段，不阻塞 commit |
| meta.yaml 加 platforms 后 yaml.dump 再次把 date 序列化成 ISO | U7 + U8 复用 4/22 的 sed 日期修复 pattern（已作为 Institutional Learning 记录） |
| 历史 drafts 缺 `platforms` 字段，将来 publish 脚本误发小红书 | Key Technical Decisions 第 4 条：默认缺失 = blocked，保守兜底 |
| 选题门的 checkCompliance 被 false positive 误杀正常选题（如"算命"出现在技术上下文中） | U1 的 `SKIP_PATTERNS` 只放高置信度禁用词；边缘 case 交给降权而不是 skip；下一轮 pipeline 跑完观察召回率，必要时回到 U1 调 |

---

## Documentation / Operational Notes

- `docs/brainstorms/2026-04-24-xhs-compliance-requirements.md` 是本 plan 的需求源，不改动
- 落地后需要在 `wiki/sources/failed-sources.md` 或新建 `wiki/coverage/compliance-log.md` 记录违规案例库（可做后续 plan）
- 申诉策略（案例 1 可申诉，其它不申）由用户手动执行，本 plan 不自动化
- 账号级警告 30 天自动解除，期间小红书只发 `xhs: primary` 的低风险文章

---

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-24-xhs-compliance-requirements.md](../brainstorms/2026-04-24-xhs-compliance-requirements.md)
- Related code:
  - `scripts/lib/l1-replace.js`
  - `test/l1-replace.test.js`
  - `config/prompts/scoring.md`
  - `config/prompts/wechat.md`
  - `config/prompts/qa-check.md`
  - `CLAUDE.md`
  - `.claude/skills/daily-content-pipeline/SKILL.md`
- Related drafts (需要 U8 回补):
  - `drafts/2026-04-24/claude-code变笨了-anthropic-retro-opus4-7-system-prompt拆解/`
  - `drafts/2026-04-24/open-generative-ai-200模型mit开源-midjourney订阅可以退了/`
- Prior art: 无直接 prior，最接近的是 `docs/plans/2026-04-17-001-feat-content-quality-pipeline-plan.md`（L1-L5 质检体系的原始 plan）
