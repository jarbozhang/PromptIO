---
title: 小红书敏感来源过滤与主稿规则改造
type: feat
status: active
date: 2026-06-16
origin: docs/brainstorms/2026-06-16-xhs-source-risk-skill-update-requirements.md
---

# 小红书敏感来源过滤与主稿规则改造

## Overview

把 Reddit、Hacker News/HN、OpenRouter 从 PromptIO 的选题、写作和发布面中移除，同时把 openclaw/Hermes 的选题策略改成“新版本解决问题 + 怎么用”的产品更新视角。最终仍只生成一份主稿 markdown，默认用于小红书、公众号和后续同步。

## Requirements Trace

- R1/R2 来源和发布面风险：`scripts/daily.js` 来源过滤、`scripts/lib/l1-replace.js` 发布面扫描、`scripts/single.js` 写入前断言。
- R3 中性表达：`config/prompts/*.md` 与 daily skill 替换“外网/国内/国外/境外”包装。
- R4 openclaw/Hermes：daily source priority 与 selection/generation prompt 增加新版本优先要求。
- R5 去 AI 味：`config/prompts/wechat.md`、`config/prompts/xhs-compliant.md`、`scripts/single.js` generation prompt 加最终 humanizer pass。
- R6 skill 同步：`.claude/skills/daily-content-pipeline/SKILL.md` 删除 Reddit/HN/OpenRouter 流程指令。
- R7 单文件契约：保持现有 `scripts/single.js`、`publish.js` 单 markdown 结构，不恢复旧双版本机制。

## Implementation Units

- U1. daily 来源过滤
  - 增加 `sourceRisk`、`isPublishableSource`、`filterPublishableSources`。
  - `collectSourceSummaries`、`buildSelectionPrompt`、`normalizeSelection` 三处都过滤敏感来源。
  - 删除 Hacker News 的优先级加分，GitHub 仍保留；openclaw/Hermes release/source 额外加权。

- U2. 发布面扫描
  - 在 `scripts/lib/l1-replace.js` 新增 `scanPublishSurface`、`assertPublishSurfaceSafe`。
  - 扫描完整 markdown，包括 frontmatter、链接和正文。
  - 命中 Reddit/HN/OpenRouter 或“外网/国内/国外/境外”二分表达时阻止写入。

- U3. single 写作入口
  - generation prompt 明确禁止最终可见内容出现敏感源。
  - openclaw/Hermes 选题必须覆盖新版本解决的问题、新功能、启发和使用入口。
  - 写入 markdown 前调用发布面扫描。

- U4. prompt 与 skill 更新
  - `scoring.md`、`wechat.md`、`xhs-compliant.md`、`qa-check.md` 移除 OpenRouter 和 Reddit/HN/HN 社区反馈建议。
  - `.claude/skills/daily-content-pipeline/SKILL.md` 改成 GitHub-first 与中文平台信号，不落地 community-research.md，不生成 xhs-version.md 或 meta.yaml。

- U5. 测试
  - daily 测试覆盖 prompt 过滤、normalize 过滤、OpenRouter/HN 拒绝。
  - l1 测试覆盖发布面扫描。
  - single 测试覆盖 prompt 规则与扫描写入前契约。

- U6. 重新生成
  - 删除 `drafts/2026-06-15`。
  - 用新规则重新运行 daily generation。
  - 扫描新 drafts 和 topics，确认敏感源与二分表达没有进入发布面。

## Verification

- `node --test test/daily.test.js test/single.test.js test/l1-replace.test.js test/publish.test.js test/sync-to-obsidian.test.js test/xhs-single-version-contract.test.js`
- `rg -n "Reddit|Hacker News|\\bHN\\b|OpenRouter|openrouter|外网|国外|境外|国内可访问|国内无法|国内用户" drafts/2026-06-15 topics/2026-06-15.json`
- 检查 `find drafts/2026-06-15 -mindepth 2 -maxdepth 2 -type f` 每个文章目录只有一个 `.md`。
