---
title: Hermes Agent 最新版怎么开始用，从 clawdbot、moltbot 到自己的可验证 AI 助手
status: draft
date: '2026-07-01'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: >-
  把 Hermes Agent 当作 openclaw/NousResearch 生态的新入口来写：读者关心的是它解决了什么日常助手问题、和 clawdbot/moltbot 的关系，以及如何从
  GitHub README 跑起第一个本地任务。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Hermes Agent
  - openclaw
  - AI Agent
  - NousResearch
  - GitHub Trending
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 最新版怎么开始用，从 clawdbot、moltbot 到自己的可验证 AI 助手
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.057
reach_note: 命中 Hermes/openclaw 生态品牌，可从 GitHub 入口立刻动手，适合做版本解读。
selection_reason: 这是本号核心生态线，GitHub fact 源足够作为主选题；相比泛泛介绍 agent，更适合写成一次新版能力和上手路径梳理。
---

# Hermes Agent 最新版怎么开始用，从 clawdbot、moltbot 到自己的可验证 AI 助手

如果你已经用过 openclaw，或者听过 clawdbot、moltbot，我建议把 Hermes Agent 当成一个新入口看。不是再追一个聊天壳，而是看它怎么把记忆、技能、工具、消息入口和后台任务绑成一个长期助手。

它现在最值得看的不是 star 数。公开仓库已经到 20 万+ star，latest release 是 v0.17.0，发布日期是 2026 年 6 月 19 日。对读者更有用的是，它把「装完能聊」往「能跨入口、跨会话、持续做事」推了一步。

我不会急着把它塞进复杂项目。更稳的打开方式，是从 GitHub README 跑起一个本地任务，确认模型、工具、会话恢复都能工作，再决定要不要迁移 OpenClaw 里的记忆和 skills。

## 把旧问题压成三个场景

旧问题不是缺一个 Agent 名字。官方 Quickstart 里有一句很扎心的定位，很多人不是装不上，而是装完以后还是什么都做不起来。

Hermes 的答案是把助手拆成三个可验证场景。

一个是本地终端，`hermes` 或 `hermes --tui` 直接开聊，先确认它能回答、能读当前目录、能跑工具。

一个是长期记忆，README 强调它会从经验里创建 skills，在使用中改进 skills，搜索过去对话，并维护跨会话的用户模型。

一个是消息入口，README 列了 Telegram、Discord、Slack、WhatsApp、Signal 和 CLI，v0.17.0 又继续扩展平台触点。

clawdbot、moltbot 的关系，我会看得克制一点。仓库 topics 把它们和 openclaw、hermes-agent 放在同一组发现入口里，但 README 里真正写清楚的迁移路径是 OpenClaw，命令是 `hermes claw migrate`，可以导入 settings、memories、skills、允许列表、消息配置和部分密钥。

## 读懂 v0.17.0 改了哪几处

v0.17.0 被官方称为 Reach Release。它不是一次单点补丁，从 v0.16.0 到它，中间有约 1475 次提交、约 800 个合并 PR、300+ issue 关闭。

我会把这次更新读成一张能力变化表。

| 旧问题 | 新改动 | 可验证场景 |
| --- | --- | --- |
| 助手卡在单一入口 | iMessage 接入 Photon、Raft agent network、官方 WhatsApp Business Cloud API 适配 | 把同一个助手放进常用消息流 |
| 长任务会挡住当前对话 | `delegate_task(background=true)` 支持后台 subagent | 让它做长研究或多步构建，主对话继续推进 |
| 记忆编辑容易多轮失败 | `memory` 工具支持原子批量 add、replace、remove | 一次性腾出旧记忆并写入新记忆 |
| 自动化要懂 cron | Automation Blueprints 用问答配置计划任务 | 日报、备份、审计这类重复工作更容易落地 |
| 桌面端像预览 | 可改快捷键、系统通知、subagent watch-window、主题安装 | 日常使用不必只盯终端 |

这张表里我最在意的是后台 subagent 和 memory 原子操作。前者解决等待，后者解决长期助手最烦的「记住了，但不好改」。

## 让助手从聊天壳变成工作面

Hermes 给我的启发很明确，Agent 应用不要只卷一次回答质量。真正难用的点往往在回答之外。

它要知道你是谁，要记得上次做过什么，要能在不同入口接着聊，还要能把重复任务排进计划里。README 里提到的技能系统、FTS5 session search、cron scheduler、gateway、terminal backends，其实都在补同一个洞，助手不能每次都从空白开始。

v0.17.0 的桌面端增强也在服务这个方向。live subagent watch-window、composer model selector、per-thread drafts 这些东西听起来不像爆点，但对真正把 agent 放进日常流程的人更关键。你需要看见它在做什么，也需要随时改方向。

我的判断是，Hermes 现在更像一个 agent 操作系统的早期形态，而不是单纯命令行工具。它的价值不在于第一次对话多惊艳，而在于第十次任务还知道上下文，失败后还能恢复。

## 从 README 跑起第一个本地任务

我会按官方 Quickstart 的最短路径验证，不直接上 gateway、cron 或一堆 MCP。

Linux、macOS、WSL2、Termux 的 README 命令是 `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`。装完重载 shell，用 `hermes setup` 或 `hermes model` 选模型，再用 `hermes` 或 `hermes --tui` 开第一段对话。

第一条 prompt 不要炫技。官方文档给的验证任务很朴素，比如让它总结当前 repo，找主入口，或者检查当前目录里像主项目文件的东西。

成功标准也很简单。欢迎页能显示你选的 provider 和 model；Hermes 能正常回复；需要时能调用 terminal、file read 这类工具；第二轮对话不断掉。

如果这一步都不稳，我不会继续加消息平台。用 `hermes doctor`、`hermes model`、`hermes setup`、`hermes sessions list` 把基本状态修好，再谈迁移和自动化。

## 决定谁该现在验证

适合现在看的，是三类人。

OpenClaw 用户可以先跑 `hermes claw migrate --dry-run` 看迁移预览，不急着覆盖原配置。你关心的是 memories、skills、允许列表和消息配置能不能被带过来。

做团队助手的人，可以先盯 gateway、dashboard profile builder、secure login 和 Skills Hub。v0.17.0 的重点是 reach，很多改动都在让同一个助手出现在更多工作入口。

个人开发者可以只验证本地 TUI、会话恢复、memory 和一个后台 subagent。能跑通这条线，再加 MCP 和定时任务才有意义。

别把 Hermes 当成「又一个 agent 仓库」收藏完就算了。给它一个能验收的任务，最小到「读这个 repo，找入口，保存会话，明天继续」。如果它能把这件小事做连续，后面的 clawdbot、moltbot、OpenClaw 生态关系才有讨论价值。

## 相关链接

- GitHub 仓库，https://github.com/NousResearch/hermes-agent
- v0.17.0 Release，https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19
- Quickstart 文档，https://hermes-agent.nousresearch.com/docs/getting-started/quickstart
- 官方文档入口，https://hermes-agent.nousresearch.com/docs

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
