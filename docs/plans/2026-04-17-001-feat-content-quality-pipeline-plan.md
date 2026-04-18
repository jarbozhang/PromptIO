---
title: "feat: Add quality-check and revision loop to content pipeline"
type: feat
status: active
date: 2026-04-17
origin: docs/brainstorms/2026-04-17-content-quality-pipeline-requirements.md
---

# feat: Add quality-check and revision loop to content pipeline

## Overview

在文章生成和 commit 之间插入自动化质检 + 质修循环。当前管线的 10 个子代理生成文章后直接 commit，wechat.md 中定义的 L1-L5 质检标准仅作为生成 prompt 的自检指令，无独立验证。本计划在每个子代理流程末尾增加独立 QA agent + 最多 3 轮质修循环。

## Problem Frame

管线采集端和编辑标准都已成熟，但执行层缺少闭环：文章生成后直接 commit，没有独立质检或迭代。需求文档（origin）详细定义了 P0-P3 四层优先级的改进方案，本计划聚焦 **Pre-flight 验证 + P0 核心闭环实施**。(see origin: docs/brainstorms/2026-04-17-content-quality-pipeline-requirements.md)

## Requirements Trace

- PF1. Pilot 验证质修循环有效性（5 篇文章实测）
- PF2. QA 评分校准测试（5 高传播 + 5 低传播文章）
- PF3. 记录管线时间基线
- PF4. 处理 gates.test.js
- R1. L1 机械替换 + 独立质检 agent 扫描
- R2. L2 风格一致性检查
- R3. L3 内容质量检查
- R4. L4 活人感终审（pass/fail 二元判断）
- R5. L5 传播潜力检查
- R6. 质修循环，最多 3 轮，独立 agent 分离质检/修改
- R7. 修改原则：删减类只删不加，替换类 <= 原文 x 1.1

## Scope Boundaries

- 不改变 pipeline.js（fetch-only 逻辑不动）
- 不改变评分/选题流程
- 不新增 npm 依赖
- 不自动发布，人工审核 gate 保留
- P1(R10-R11 去 AI 味)、P2(R8-R9 开头竞争)、P3(R12-R13 爆款提炼) 不在本计划范围
- 不实现 gates.js（质检在 Claude Code 会话内通过 prompt 驱动）

## Context & Research

### Relevant Code and Patterns

- **子代理调度模式**: SKILL.md Step 4 使用 `Agent tool, mode: bypassPermissions, run_in_background: true` 并行启动 10 个子代理，每个收到独立 prompt（角色设定 + 选题 + source 路径 + wechat.md 指引 + 输出路径）
- **Prompt 模板**: `config/prompts/` 下 5 个独立 markdown 文件，每个是完整 system prompt
- **L1-L5 标准**: 内嵌在 `config/prompts/wechat.md` 第 106-186 行
- **meta.yaml 格式**: 6 字段（title, status, date, reach, sources, tags），无 QA 相关字段
- **Draft 文件结构**: `drafts/{date}/{slug}/{slug}.md` + `meta.yaml`
- **Gates 测试模式**: `test/gates.test.js` 使用 `Promise.allSettled` 并行执行，部分失败不影响其他 gate

### Institutional Learnings

- **LLM 自评分不可靠**: viral-content-engine plan 中记录 `title_score` 是 placeholder metric，LLM 自评倾向于给窄范围高分。这直接影响了 L4 改用 pass/fail 二元判断的决策 (see origin)
- **Gates 架构已验证可扩展**: Promise.allSettled + 非阻塞 + 字段省略模式稳定运行
- **同模型偏见是核心风险**: origin 文档已识别但无缓解方案，PF2 校准测试是验证点

## Key Technical Decisions

- **质检实现为新的 prompt 文件 + SKILL.md 编排修改，不写 Node.js 脚本**: 与现有架构一致，质检循环在 Claude Code 会话层面通过 Agent tool 驱动 (see origin)
- **质检标准从 wechat.md 提取为独立 prompt 文件 `config/prompts/qa-check.md`**: 质检 agent 需要独立的 prompt（不能直接复用 wechat.md 的自检指令，避免"自评"模式）。新 prompt 从 wechat.md L1-L5 提取标准，但视角是"独立审稿人"而非"作者自检"
- **L1-1/L1-2 禁用词和禁用标点做机械替换 pass（不消耗循环轮次）**: 这些是确定性的字符串替换，不需要 LLM 判断。写作 agent 完成初稿后，主会话直接执行替换，然后再提交给 QA agent
- **L4 使用 pass/fail 而非 1-10 评分**: LLM 连续评分的 test-retest reliability 低，在 6.8 vs 7.2 级别不稳定 (see origin)
- **QA 结果写入 meta.yaml 的 `qa` 字段**: 扩展现有 meta.yaml schema，保持单文件元数据模式
- **gates.test.js 处理方式**: 创建空 stub `scripts/lib/gates.js`（3 个 export 函数返回空对象），让 ESM static import 能解析成功。不能只加 skip wrapper——ESM import 在 parse 阶段执行，skip 无法阻止 ERR_MODULE_NOT_FOUND

## Open Questions

### Resolved During Planning

- **质检 prompt 是合并一次调用还是分层？** → 合并为一次调用。L1(结构性套话+工具名) + L2 + L3 + L4 + L5 在一个 prompt 中完成，返回结构化 JSON。理由：减少 token 开销和延迟；L1 禁用词/标点已在机械替换 pass 中处理，不需要 LLM 参与
- **QA 结果存 meta.yaml 还是独立 qa-report.yaml？** → 存 meta.yaml。增加 `qa` 字段，保持单文件元数据的简洁性。结构见 Unit 3
- **L1 机械替换如何执行？** → 由子代理在生成文章后通过 Bash tool 调用 `scripts/lib/l1-replace.js`，替换全角禁用词和全角禁用标点（不碰 ASCII 冒号），写回文件
- **嵌套 Agent tool 是否可行？** → Unit 0a 验证。如果支持三级嵌套（主会话→写作子代理→QA 子代理），每篇文章的质检循环在子代理内部完成。如果不支持，改为主会话分波编排

### Deferred to Implementation

- L2/L3/L5 评分的 test-retest reliability 在实际运行中是否稳定，需要 PF1 pilot 数据
- 质修循环中写作 agent 是否能稳定遵守"全文总字数 <= 原文 x 1.1"的约束，需要 pilot 实测
- 如果 PF2 校准测试失败（QA 无法区分高低传播文章），需要回到 brainstorm 重新设计方案

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
子代理流程（每篇文章，并行执行）:

┌─────────────────────────────────┐
│ Step A: 生成初稿                 │
│   写作 agent 按 wechat.md 生成   │
│   → {slug}.md + meta.yaml       │
└──────────┬──────────────────────┘
           ▼
┌─────────────────────────────────┐
│ Step B: L1 机械替换              │
│   子代理通过 Bash tool 调用       │
│   l1-replace.js 替换禁用词/标点   │
│   → 写回文件                    │
└──────────┬──────────────────────┘
           ▼
┌─────────────────────────────────┐
│ Step C: 独立 QA agent 质检       │
│   仅接收文章 markdown            │
│   → 输出 JSON: L1-L5 评分+问题   │
│   → L4 输出 pass/fail + 段落列表 │
└──────────┬──────────────────────┘
           ▼
      ┌────┴────┐
      │ 全部通过？│
      └────┬────┘
    yes    │    no
     ▼     │     ▼
  写入 QA  │  ┌───────────────────┐
  结果到   │  │ Step D: 修改 agent │
  meta.yaml│  │  接收问题清单+原文  │
           │  │  按 R7 规则修改     │
  完成 ✓   │  └───────┬───────────┘
           │          ▼
           │     回到 Step C
           │     (最多 3 轮)
           │          │
           │     3轮后仍失败
           │          ▼
           │     标记 needs_review
           │     带完整 QA 历史
           │     进入人工审核
           └──────────┘
```

## Implementation Units

- [ ] **Unit 0a: 基础 Pre-flight（无需 QA prompt）**

**Goal:** 处理不依赖 QA prompt 的前置验证

**Requirements:** PF3, PF4, 嵌套 Agent 可行性验证

**Dependencies:** None

**Files:**
- Create: `scripts/lib/gates.js` (空 stub，3 个 export 函数返回空对象)
- No modify needed — stub 让 import 不报错，原有测试 describe 加 `{ skip: true }` 可选

**Approach:**
- PF3: 跑一次标准 10 篇生成管线，记录从 Step 4 开始到全部写入完成的时间，写入 `logs/baseline-timing.txt`
- PF4: 创建空 stub `scripts/lib/gates.js`（ESM static import 在 parse 阶段执行，skip wrapper 无法阻止 ERR_MODULE_NOT_FOUND，必须让 import 能解析成功）
- **嵌套 Agent 验证**: 在一个 background sub-agent 中测试能否调用 Agent tool 启动第三级子代理。如果不支持，Unit 4 需要改为主会话分波编排（见 Unit 4 备选方案）

**Test expectation:** none — 验证步骤

**Verification:**
- PF3: `logs/baseline-timing.txt` 存在且有具体分钟数
- PF4: `npm test` 不崩溃
- 嵌套 Agent 验证: 记录结果（支持/不支持），决定 Unit 4 的编排架构

---

- [ ] **Unit 1: 创建 QA prompt 模板**

**Goal:** 创建独立的质检 agent prompt，从 wechat.md 提取 L1-L5 标准但以"独立审稿人"视角重写

**Requirements:** R1-R5

**Dependencies:** Unit 0a 通过

**Files:**
- Create: `config/prompts/qa-check.md`

**Approach:**
- 从 wechat.md 第 106-186 行提取 L1-L5 标准
- L1 部分：只包含 L1-3（结构性套话）和 L1-4（空泛工具名），L1-1/L1-2 已由机械替换处理
- L2-L3-L5：提取评分维度，每个维度要求输出 1-10 分 + 扣分理由
- **L4 必须放在 prompt 最前面（在 L1-L3 之前）**：先做整体"活人感"判断，再进入 checklist 逐项扫描。避免 L1-L3 的"编辑模式"锚定 L4 的整体判断
- L4：要求输出 pass/fail + "AI 味段落"位置列表 + 具体改进建议
- 输出格式：结构化 JSON
- Prompt 视角是"你是一个独立审稿人，正在审阅一篇待发布的公众号文章"，而非"检查你自己写的文章"
- 文章原型信息（工具实测/现象解读/论文拆解/社区事件/方法论）作为可选输入，影响 L3 专项检查的侧重点

**Patterns to follow:**
- `config/prompts/scoring.md` 的 JSON 输出格式
- `config/prompts/wechat.md` 第 106-186 行的标准定义

**Test expectation:** none — 这是 prompt 文件，通过 PF1/PF2 已验证有效性

**Verification:**
- qa-check.md 存在且包含 L1(结构性套话+工具名)/L2/L3/L4/L5 五个维度
- JSON 输出格式明确，QA agent 能解析

---

- [ ] **Unit 0b: QA 有效性验证（依赖 Unit 1 的 QA prompt）**

**Goal:** 用真实的 QA prompt 验证质修循环有效性和 QA 评分区分度

**Requirements:** PF1, PF2

**Dependencies:** Unit 1 (需要 qa-check.md 存在)

**Files:**
- None (手动验证)

**Approach:**
- PF1: 手动选 5 篇 L4 偏低的现有 drafts，用 qa-check.md 执行一轮 QA → 修改循环，记录 L4 是否改善
- PF2: 从 article-registry.md 取文章，让 QA agent 评分。**注意：用实际微信阅读量/点赞数（如有）选择高低传播组，而非 REACH 自评分**。如果尚无实际传播数据，改为由人工审核者独立评分 10 篇文章，检查 QA agent 评分与人工评分的一致性
- 如果 PF1 或 PF2 失败，停止后续 unit，回到 brainstorm 重新设计

**Test expectation:** none — 验证步骤

**Verification:**
- PF1: 5 篇中 >= 3 篇有可感知的质量改善
- PF2: QA 评分能区分高低质量文章（均值差 >= 1 分，或与人工评分相关系数 > 0.5）

---

- [ ] **Unit 2: 实现 L1 机械替换逻辑**

**Goal:** 在生成后、QA 前执行确定性的禁用词/禁用标点替换

**Requirements:** R1（L1-1 禁用词, L1-2 禁用标点）

**Dependencies:** Unit 0a 通过

**Files:**
- Create: `scripts/lib/l1-replace.js`
- Create: `test/l1-replace.test.js`

**Approach:**
- 纯函数 `l1Replace(text)` → `{ text, replacements }`
- 从 wechat.md L1-1 构建替换映射："说白了"→"坦率讲"/"其实就是", "意味着什么"/"这意味着"→"那结果会怎样"/"所以呢", "本质上"→"说到底"/"其实", 等等
- L1-2 禁用标点：**全角冒号"："(U+FF1A)** →全角逗号"，"，**全角破折号"——"** →逗号/句号。**不替换 ASCII 冒号":"(U+003A)**，避免破坏 YAML frontmatter、URL、代码块
- 返回替换列表供 QA 报告使用
- 使用 ESM 模块，与现有 yaml.js 模式一致

**Patterns to follow:**
- `scripts/lib/yaml.js` 的模块模式（ESM export）
- `test/gates.test.js` 的测试模式（node:test + node:assert/strict）

**Test scenarios:**
- Happy path: 含禁用词的文本 → 替换后不含禁用词，返回替换记录
- Happy path: 含禁用标点（冒号、破折号）的文本 → 替换为逗号/句号
- Edge case: 无禁用词/禁用标点的文本 → 原样返回，replacements 为空数组
- Edge case: 同一段落多个禁用词 → 全部替换
- Edge case: 代码块/引用块内的冒号不应被替换（markdown 语法保护）

**Verification:**
- `node --test test/l1-replace.test.js` 全部通过
- 函数是纯函数，无副作用

---

- [ ] **Unit 3: 扩展 meta.yaml schema**

**Goal:** 在 meta.yaml 中增加 `qa` 字段，存储质检结果

**Requirements:** R1-R5, R6 (QA 报告存储)

**Dependencies:** Unit 0 通过

**Files:**
- Modify: `.claude/skills/daily-content-pipeline/SKILL.md`（meta.yaml 格式文档部分）

**Approach:**
- 在 SKILL.md 的 meta.yaml 模板中增加 `qa` 字段定义
- 结构：

```yaml
qa:
  status: passed | needs_review | failed_qa
  rounds: 1           # 质修循环轮数
  l1_qa_violations: 0 # L1-3/L1-4 残留违规数（L1-1/L1-2 由机械替换处理，不计入）
  l2_score: 8         # 1-10
  l3_score: 7         # 1-10
  l4_pass: true       # boolean
  l5_score: 8         # 1-10
  l1_replacements: 3  # 机械替换次数
  issues: []          # 最后一轮的未解决问题列表（仅 needs_review 时有值）
  error: ""           # failed_qa 时填写错误原因（parse_error/timeout/unknown）
```

- `status: passed` = 全部通过阈值
- `status: needs_review` = 3 轮后仍未达标，进入人工审核
- `status: failed_qa` = QA agent 错误（超时/不可解析），进入人工审核

**Test expectation:** none — 这是文档变更，不是代码

**Verification:**
- SKILL.md 中 meta.yaml 模板包含 `qa` 字段定义和各状态说明

---

- [ ] **Unit 4: 修改 SKILL.md 编排逻辑**

**Goal:** 在 SKILL.md Step 4 的子代理流程中插入质检循环

**Requirements:** R1-R7

**Dependencies:** Unit 1, Unit 2, Unit 3

**Files:**
- Modify: `.claude/skills/daily-content-pipeline/SKILL.md`

**Approach:**
- 在 Step 4 "文章并行生成" 中，修改子代理 prompt，增加生成后的质检流程
- 每个子代理的 prompt 增加以下步骤（在"生成文章并写入文件"之后）：
  1. **L1 机械替换**: 读取生成的 .md 文件，通过 Bash tool 调用 `scripts/lib/l1-replace.js` 的 l1Replace 函数，写回文件
  2. **独立 QA 检查**: 启动一个新的 Agent tool 子代理（质检 agent），只传入文章 markdown 文本和文章原型信息，使用 `config/prompts/qa-check.md` 作为 system prompt
  3. **判断阈值**: L1 结构性套话/工具名零容忍，L2/L3/L5 >= 7，L4 pass
  4. **质修循环**: 如果未通过，将 QA 问题清单传给写作 agent（另一个 Agent tool 子代理）做定向修改，然后重新 QA。最多 3 轮
  5. **写入 QA 结果**: 将最终 QA 状态写入 meta.yaml 的 `qa` 字段
  6. **错误处理**: QA agent 返回不可解析输出或超时，先重试 QA 调用（最多 2 次重试）。重试仍失败才消耗 1 轮内容修改配额。区分基础设施错误（重试）和内容未达标（消耗轮次）
- 修改原则写入 prompt：
  - 删减类（冗余/节奏/风格）：只删不加
  - 替换类（结构性缺陷）：QA 指出具体段落 + 缺陷类型，替换后全文总字数 <= 原文 x 1.1
- Step 5（Wiki 更新）在质检循环完成后执行，不变

**备选方案（如果 Unit 0a 嵌套 Agent 验证失败）：** 不在子代理内部嵌套 QA/modify agent，改为主会话分波编排：
  - Wave 1: 10 个写作子代理并行生成（同当前）
  - Wave 2: 主会话逐篇执行 L1 机械替换 + 启动 QA agent 子代理（可 10 篇并行）
  - Wave 3: 对未通过的文章启动 modify agent 子代理，修改后重新 QA（最多 3 波）
  - 此方案将每篇文章内的串行循环改为全局分波并行，避免嵌套 Agent 依赖

**Execution note:** 这是最大的单元，但本质是修改 SKILL.md 中的自然语言编排指令，不是写代码。核心工作是精确描述质检流程的编排方式（具体采用嵌套还是分波取决于 Unit 0a 验证结果）。

**Patterns to follow:**
- SKILL.md Step 4 现有的子代理 prompt 结构
- SKILL.md 中使用 `Agent tool, mode: bypassPermissions` 的调度模式

**Test scenarios:**
- Happy path: 生成 → L1 替换 → QA 全通过 → meta.yaml qa.status=passed, rounds=1
- Happy path: 生成 → QA 不通过 → 修改 → QA 通过 → meta.yaml qa.status=passed, rounds=2
- Error path: QA agent 返回不可解析输出 → 消耗 1 轮配额，进入下一轮
- Error path: 3 轮均未通过 → meta.yaml qa.status=needs_review, issues 非空
- Error path: QA agent 3 轮均错误 → meta.yaml qa.status=failed_qa
- Edge case: 文章仅有 L1 违规（机械替换已处理）→ QA 直接通过，rounds=1
- Integration: 修改 agent 遵守字数约束（替换后总字数 <= 原文 x 1.1）

**Verification:**
- SKILL.md Step 4 包含完整的质检循环描述
- 子代理 prompt 中质检/修改由不同 agent 执行
- 错误处理路径完整（不可解析、超时、3 轮超限）
- meta.yaml qa 字段在所有路径上都有正确值（包括 passed、needs_review、failed_qa 三种 status）

---

- [ ] **Unit 5: 端到端验证**

**Goal:** 用实际管线跑一批文章，验证质检循环工作正常

**Requirements:** 全部 P0 要求

**Dependencies:** Unit 4

**Files:**
- No new files

**Approach:**
- 运行一次完整的 daily-content-pipeline（至少 3 篇文章）
- 检查每篇文章的 meta.yaml 是否包含 qa 字段
- 检查 L1 机械替换是否生效（文章中不应有禁用词/禁用标点）
- 检查是否有文章触发了质修循环（rounds > 1）
- 比较有无质检循环的管线总耗时
- 记录首轮通过率，与 PF3 基线对比

**Test expectation:** none — 这是集成验证，不是自动化测试

**Verification:**
- 所有生成的文章 meta.yaml 包含 qa.status 字段
- 没有文章包含 wechat.md L1-1/L1-2 定义的禁用词或禁用标点
- 管线总耗时 <= PF3 基线 x 2
- 如果首轮通过率 < 60%，记录并考虑调整阈值

## System-Wide Impact

- **Interaction graph:** SKILL.md Step 4 → 子代理 prompt → 新增 QA agent 子代理 + 修改 agent 子代理。每个子代理从 1 次 LLM 调用变为 1(生成) + 1(QA) + 0-6(修改循环) 次
- **Error propagation:** QA agent 错误不阻塞管线，消耗循环轮次后进入人工审核。单篇文章的错误不影响其他并行文章
- **State lifecycle:** meta.yaml 增加 qa 字段，status 仍为 draft（QA 通过/不通过不改变 status，人工审核决定 approved/rejected）
- **API surface parity:** 无。质检在 Claude Code 会话内部完成，不暴露外部接口
- **Unchanged invariants:** pipeline.js fetch 逻辑不变、sources/ 数据不可变、drafts/ 文件结构不变（仅 meta.yaml 增加字段）、wiki 更新流程不变

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| PF1/PF2 验证失败，质修循环无效 | 整个计划暂停，回到 brainstorm 重新设计。这是有意的——宁可验证后放弃，不要盲目实施 |
| 同模型偏见导致 QA 评分虚高 | PF2 校准测试作为前置 gate；上线后持续追踪 QA 评分与实际微信数据的相关性 |
| 管线耗时超过 2x | 监控首轮通过率；如 < 60% 优先降低阈值而非增加轮次 |
| L4 pass/fail 二元判断可能过于粗糙 | 用 pilot 数据验证；如果 pass rate 太高（> 95%，说明标准太松）或太低（< 40%，说明标准太严），调整 QA prompt 中的判断标准 |
| 写作 agent 不遵守字数约束 | 在 prompt 中明确约束 + QA agent 在下一轮验证字数 |

## Documentation / Operational Notes

- 上线后第一周，每天记录：各文章 QA rounds 数、首轮通过率、有多少篇进入 needs_review
- 第一周结束后，评估是否需要调整 L2-L5 阈值
- 同时开始手动记录发布文章的实际微信阅读量/点赞数，建立外部校准数据

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-17-content-quality-pipeline-requirements.md](docs/brainstorms/2026-04-17-content-quality-pipeline-requirements.md)
- Related plan: [docs/plans/2026-04-02-001-feat-viral-content-engine-plan.md](docs/plans/2026-04-02-001-feat-viral-content-engine-plan.md)（Gates 架构设计，LLM 自评分不可靠的教训）
- L1-L5 标准: [config/prompts/wechat.md](config/prompts/wechat.md) 第 106-186 行
- 管线编排: [.claude/skills/daily-content-pipeline/SKILL.md](.claude/skills/daily-content-pipeline/SKILL.md)
