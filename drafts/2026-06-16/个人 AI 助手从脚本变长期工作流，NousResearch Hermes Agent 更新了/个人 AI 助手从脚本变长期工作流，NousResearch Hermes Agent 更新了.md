---
title: 个人 AI 助手从脚本变长期工作流，NousResearch Hermes Agent 更新了
status: draft
date: '2026-06-16'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: >-
 从 6 月 16 日仓库更新切入，讲清 Hermes Agent 解决了个人 agent 难持续、难接工具、难沉淀上下文的问题，并给读者一条从
 README、示例配置到本地运行的验证路径。
voice: first-person
reach: 9
tags:
 - Hermes Agent
 - 个人 AI 助手
 - Agent 工作流
 - MCP
 - 本地运行
llm:
 provider: codex
 model: ''
platforms:
 wechat: primary
 xhs: primary
 x: blocked
xhs_title: 个人 AI 助手从脚本变长期工作流，NousResearch Hermes Agent 更新了
wechat_title: ''
cover:
 status: skipped
reach_note: NousResearch 和 Hermes 命中重点生态，GitHub 可直接查看和运行，个人 agent 工作流有明确实操价值。
selection_reason: Hermes Agent 同时关联 clawdbot、moltbot、openclaw、Codex 等关键词，适合做成中文读者能立刻跟着搭建的 agent 工作流选题。
---

# 个人 AI 助手从脚本变长期工作流，NousResearch Hermes Agent 更新了

如果你的个人 agent 现在还停留在「丢一个任务、跑一段脚本、下次重新解释背景」，Hermes Agent 这次更新值得看。它让我在意的不是又多了一个聊天入口，而是把个人助手往长期工作流上推了一步。

GitHub Trending 给到的摘要里，仓库最后推送是 2026 年 6 月 16 日，主语言 Python，star 已到 19 万级。更关键的是，仓库 README 和 6 月 5 日 v0.16.0 发布说明都在强调同一件事，Hermes 不想只做一次性 agent。

本文为 AI 辅助整理，关键事实按 GitHub 仓库、发布说明和官方文档核对。更稳妥的做法，是先用下面这条最小路径确认它适不适合自己的工作流。

## 先判断它适不适合你

Hermes Agent 最适合的不是随手问答，而是那些会反复发生、需要上下文、需要工具权限的个人工作流。

可以先用这个清单判断。

- 适合，你想让助手记住项目偏好、常用目录、沟通习惯，不想每次从零开始
- 适合，你要把 GitHub、文件系统、数据库、浏览器栈或内部接口接进 agent，而不是每次临时写脚本
- 适合，你需要桌面端、CLI、消息入口、定时任务共用一套配置
- 暂时不适合，你只需要一次性问答，或还没有一个稳定的模型供应方式

我自己的判断很简单，Hermes 这波更新真正解决的是「个人 agent 为什么很难持续用」。不是模型不会回答，而是回答之后没有沉淀，工具接入很散，第二天接不上昨天的任务。

## 把三件难事拆开看

README 写得很满，我会把它压成三件事。

一是持续。官方文档里，Hermes 的记忆由 `MEMORY.md` 和 `USER.md` 两类文件组成，分别存 agent 学到的环境事实和用户偏好。会话还会进 SQLite，并通过 FTS5 做历史搜索。对个人助手来说，这比「把所有东西塞进长 prompt」更像一个能维护的状态层。

二是接工具。Hermes 有 `hermes tools`，也支持 MCP。官方 MCP 文档里，配置落在 `~/.hermes/config.yaml` 的 `mcp_servers` 下，可以接 stdio 服务，也可以接 HTTP 服务，还能按 server 做工具过滤。对 agent 应用的启发是，工具不是越多越好，而是要让 agent 只看见当前任务需要的那部分。

三是沉淀上下文。配置目录里有 `config.yaml`、`.env`、`SOUL.md`、`memories`、`skills`、`cron`、`sessions` 和 `logs`。这套结构把身份、密钥、记忆、技能、定时任务分开了。好处是长期运行有地方落，坏处是配置出错时你必须会看 `hermes doctor` 和 `hermes config`。

## 用一个测试仓库验证长期记忆

别一上来就做全家桶。Hermes 官方 Quickstart 也把顺序讲得很清楚，普通聊天没跑通之前，不要急着加 gateway、cron、skills、voice 或 routing。

我的建议是按这个路径走。

- 读 README 和 v0.16.0 发布说明，先确认你要的是 CLI、桌面端，还是常驻工作流
- 打开 `cli-config.yaml.example`，只看四块，`model`、`terminal`、`memory`、`platform_toolsets`
- 先跑最小闭环，`hermes setup` 或 `hermes model`，然后用 `hermes` 发一个能验证的问题
- 确认会话能回来，执行 `hermes --continue`，看它能不能接上刚才的上下文
- 再接一个工具，不要一口气接所有 MCP。想试 MCP，就先用官方 filesystem 示例指向一个测试目录
- 需要常驻时，再看 `hermes gateway setup`、cron 和桌面端连接远程 Hermes 的部分

这条路径的目标不是马上把它变成生产助手，而是确认三件事，模型能稳定回复，工具能被正确发现，历史会话和记忆不会让你第二天从零开始。

## 这里最容易踩坑

我会先把坑排在功能前面。

模型上下文要够。Quickstart 写明 Hermes 要求至少 64K tokens，上来接小上下文本地模型，很可能不是 Hermes 坏，而是工作记忆不够。

记忆不是无限仓库。官方文档写得很明确，`MEMORY.md` 和 `USER.md` 有字符上限，写满不会自动丢旧内容，agent 需要整理后再写。长期工作流靠的是高密度记忆，不是把所有对话都永久塞进去。

MCP 也不是写进 YAML 就完事。服务没连上、发现失败、过滤配置排空、server 被关闭，都会导致工具不出现。我的做法会是先接一个只读、低风险的工具，确认 Hermes 能发现、能调用、能报错，再逐步加权限。

## 看 6 月这波更新解决了什么

仓库页面显示，最新正式版本是 2026 年 6 月 5 日的 v0.16.0，发布说明叫 The Surface Release。之后到 6 月中旬仍在继续合并更新，这也是我从 6 月 16 日仓库动态切入的原因。

这版重点不只在底层 agent loop。发布说明里提到，Hermes Desktop 变成了 macOS、Linux、Windows 上的原生桌面应用，有安装器、应用内更新、拖拽文件、状态栏模型选择、多 profile 会话和完整简体中文界面。Web dashboard 也从查看会话扩展成管理面板，可以配置 MCP catalog、消息渠道、凭据、webhook、memory 和 gateway。

还有几个对个人 agent 很关键的小点。Quick Setup via Nous Portal 降低了第一次发消息的门槛，模型选择器支持模糊搜索，`/undo [N]` 可以撤回最近几轮，默认 skill set 被精简。它们看起来不像大功能，但都是「长期用」才会撞上的摩擦。

我认为 Hermes 给 agent 应用的启发是，个人助手不能只靠一个聪明模型和一堆脚本。它需要可管理的界面、长期状态、工具边界、恢复命令和清楚的本地配置。少一个，都容易从工作流退回玩具。

先别把目标定成部署一个万能助手。拿一个测试仓库，让 Hermes 读目录、记住项目约定、第二天继续同一任务。这个闭环成立，再考虑桌面端、MCP catalog 和 cron。

个人助手能不能长期工作，不看第一次回答多漂亮，看它能不能第二天接着干。

## 相关链接

- Hermes Agent 仓库 [GitHub](https://github.com/NousResearch/hermes-agent)
- v0.16.0 发布说明 [GitHub Release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5)
- Quickstart [官方文档](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)
- 配置示例 [cli-config.yaml.example](https://github.com/NousResearch/hermes-agent/blob/main/cli-config.yaml.example)
- 持久记忆 [官方文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)
- MCP 接入 [官方文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)

相关实体:: [[hermes-agent|Hermes Agent]] | [[nousresearch|NousResearch]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[local-first-ai|本地优先 AI]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
