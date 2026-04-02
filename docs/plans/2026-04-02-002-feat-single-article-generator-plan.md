---
title: "feat: Add single article generator CLI"
type: feat
status: completed
date: 2026-04-02
---

# feat: Add single article generator CLI

## Overview

添加 `npm run single` CLI 命令，接受已抓取的英文文章文本 + 可选写作角度，直接走生成+gates 流程输出中文公众号草稿。与现有 RSS 自动管线互补，支持手动策展场景。

## Problem Frame

现有 pipeline 只支持全自动 RSS 采集→评分→生成。当发现一篇好文章想快速出稿时，没有"喂一篇文章直接生成"的入口。需要一个轻量 CLI 脚本，复用现有生成能力和 gates，跳过 RSS 和评分。

## Requirements Trace

- R1. 接受 1-2 篇已抓取的英文文章文本作为输入
- R2. 接受可选的写作角度/指示，影响生成方向
- R3. 多篇输入时合成一篇文章，不分别生成
- R4. 复用现有 wechat.md prompt + gates（titleScorer/goldQuote/summaryGen）
- R5. 输出草稿到 `drafts/{TODAY}/{slug}/wechat.md`，frontmatter 格式与 pipeline 一致
- R6. 不执行 RSS 采集、评分、git commit

## Scope Boundaries

- 不做 URL 抓取 — 内容获取由 Claude Code 层（agent-browser skill）处理
- 不做评分 — 手动选题已隐含"我认为这个值得写"
- 不做 git commit — 手动场景不需要自动提交
- 不做封面图生成 — 可后续单独加

## Context & Research

### Relevant Code and Patterns

- `scripts/pipeline.js` phaseGenerate (lines 482-598) — 生成+gates+frontmatter 的完整模式
- `scripts/lib/gates.js` — titleScorer/goldQuote/summaryGen，签名: `(articleText, client, model)`
- `config/prompts/wechat.md` — 生成 prompt
- pipeline.js `loadEnv()` (lines 36-48) — .env 加载模式
- pipeline.js `createAnthropicClient()` — SDK 初始化模式
- pipeline.js `slugify()` — slug 生成

## Key Technical Decisions

- **输入方式: 临时文件而非 stdin** — 1-2 篇文章文本可能很长，用临时文件路径传入比 stdin 管道更可靠，也方便 Claude Code 层调用。格式: `node scripts/single.js <content-file> [--angle '角度']`，content-file 是纯文本文件，包含一篇或多篇文章内容（多篇用 `---` 分隔）
- **复用而非提取** — 从 pipeline.js 复制所需的工具函数（loadEnv, createAnthropicClient, slugify）到 single.js，而不是重构 pipeline.js 做模块提取。理由：scope 小，避免改动已稳定的 pipeline
- **无新依赖** — 不需要 CLI 参数库，process.argv 足够；不需要 HTML 解析库，内容已预处理

## Open Questions

### Resolved During Planning

- **如何传多篇文章？** — 用 `---` 分隔符在同一文件中，single.js 读取后识别分隔
- **frontmatter 中 score/scoring_reason 怎么处理？** — 手动模式不评分，frontmatter 中 `score: null`, `scoring_reason: 'manual'`，`source: 'manual'`

### Deferred to Implementation

- wechat.md prompt 中 topic context 的具体拼接格式（需要适配"无评分原因"的场景）

## Implementation Units

- [x] **Unit 1: scripts/single.js 核心脚本**

**Goal:** 创建独立 CLI 脚本，读取文本文件 + 角度参数，调用 LLM 生成文章，跑 gates，输出草稿

**Requirements:** R1, R2, R3, R4, R5, R6

**Dependencies:** None

**Files:**
- Create: `scripts/single.js`
- Reuse: `scripts/lib/gates.js` (import)
- Reuse: `config/prompts/wechat.md` (read)
- Test: `test/single.test.js`

**Approach:**
- 从 pipeline.js 复制 loadEnv, createAnthropicClient, slugify, TODAY 等工具函数
- 解析 process.argv: 位置参数为 content-file 路径，`--angle` 为可选写作角度
- 读取 content-file，按 `---` 分隔多篇文章
- 拼接 wechat prompt + 文章内容 + 角度指示，调用 Anthropic API
- 用 Promise.allSettled 并行跑三个 gates
- 构建 frontmatter（score: null, source: 'manual'），写入 drafts 目录
- 打印生成结果摘要到 stdout

**Patterns to follow:**
- pipeline.js phaseGenerate 的生成+gates+frontmatter 模式
- pipeline.js loadEnv/createAnthropicClient 初始化模式

**Test scenarios:**
- Happy path: 提供单篇文章文本文件 + 角度，验证调用 LLM 的 prompt 包含文章内容和角度，验证 gates 被调用，验证 frontmatter 包含 source: 'manual' 和 score: null
- Happy path: 提供两篇文章（---分隔），验证两篇内容都传入 LLM prompt
- Edge case: 不提供 --angle 参数，验证生成正常进行（角度为可选）
- Error path: content-file 不存在，验证报错退出
- Error path: content-file 为空，验证报错退出

**Verification:**
- `node scripts/single.js test-content.txt --angle '实操分析'` 生成草稿到 drafts/ 目录
- 输出的 wechat.md frontmatter 格式与 pipeline 生成的一致
- gates 结果正确合并到 frontmatter

- [x] **Unit 2: package.json 注册命令**

**Goal:** 添加 `npm run single` 快捷命令

**Requirements:** R1

**Dependencies:** Unit 1

**Files:**
- Modify: `package.json`

**Approach:**
- 在 scripts 中添加 `"single": "node scripts/single.js"`

**Test expectation:** none — 纯配置，无行为变更

**Verification:**
- `npm run single -- content.txt --angle '角度'` 等价于 `node scripts/single.js content.txt --angle '角度'`

## System-Wide Impact

- **Interaction graph:** 直接 import gates.js，读取 config/prompts/wechat.md — 与 pipeline.js 共享这些模块但无运行时交互
- **Error propagation:** gates 失败 → 对应字段省略（与 pipeline 一致），LLM 调用失败 → 脚本退出并报错
- **State lifecycle risks:** 无 — 不触碰 pipeline 的 lock 文件、sources/、topics/ 目录
- **API surface parity:** 草稿 frontmatter 格式与 pipeline 完全一致，下游 publish 脚本可以无感处理

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| wechat.md prompt 假设有评分原因，手动模式没有 | 拼接时用 "Manual selection" 替代 scoring reason |
| 复制 loadEnv/slugify 导致代码重复 | 接受短期重复，后续可提取到 lib/utils.js |
