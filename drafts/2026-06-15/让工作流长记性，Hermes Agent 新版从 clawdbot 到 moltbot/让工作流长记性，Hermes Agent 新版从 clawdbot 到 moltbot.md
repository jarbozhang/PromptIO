---
title: 让工作流长记性，Hermes Agent 新版从 clawdbot 到 moltbot
status: draft
date: '2026-06-15'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: >-
  从 6 月 14 日最新仓库更新切入，覆盖 Hermes Agent 解决的长期记忆、工具调用和个人工作流沉淀问题，重点写新增能力、openclaw
  生态启发和最小上手路径。
voice: analytical
reach: 9
tags:
  - Hermes Agent
  - Agent工作流
  - OpenClaw
  - MCP
  - 长期记忆
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 让工作流长记性，Hermes Agent 新版从 clawdbot 到 moltbot
wechat_title: ''
cover:
  status: skipped
reach_note: NousResearch/Hermes 生态品牌 + Agent 工作流利益点 + GitHub 可操作入口。
selection_reason: Hermes 与 openclaw 共享生态关键词，是本号应持续跟踪的高优先级选题，适合做成开发者可执行的新版解读。
---

# 让工作流长记性，Hermes Agent 新版从 clawdbot 到 moltbot

如果你最近在搭个人 agent，Hermes Agent 这次最值得看的点，不是又多一个聊天入口，而是它把三个老问题放到同一套产品里处理，长期记忆、工具调用、工作流沉淀。

GitHub Trending 摘要记录的这轮仓库活跃更新停在 2026年6月14日。公开仓库页显示项目约 194k stars，最新 release 是 2026年6月5日的 v0.16.0，官方叫 The Surface Release。

这篇更适合当作新版能力解读，而不是跑分或安装实录。关键事实来自 README、v0.16.0 release 和官方文档，重点看它新增了什么、解决什么，以及已有 OpenClaw 用户怎么判断迁移价值。

为什么中文读者该看它。很多 agent demo 能把一次任务跑完，但第二天你换个入口、换个机器、换个项目，它就像没来过。Hermes Agent 的目标更像长期助手，记住偏好和项目事实，能接工具，能把做过的流程沉淀成 skill，还能从 OpenClaw 迁移旧配置和旧记忆。

README 里最核心的表述，是 built-in learning loop。官方描述包括从经验创建 skills、使用中改进 skills、提示自己保存知识、搜索过去对话，并逐步建立用户模型。这里别急着理解成 AGI，工程上更接近一套记忆和流程资产管理机制。

长期记忆这块，官方文档写得很克制。Hermes 用 MEMORY.md 和 USER.md 两个文件保存信息，分别放环境事实、项目约定、已学到的东西，以及用户偏好和沟通习惯。它们有字符上限，且不是自动无限压缩，写满会报错，agent 需要自己整理或删减。

这个设计有启发。真正可用的长期记忆，不应该是无限塞上下文，而应该是带容量、能审计、能修剪的项目资产。对做 OpenClaw 或团队 agent 的人来说，记忆的价值不是让模型显得懂你，而是少重复问同样的问题，少把同一个配置踩第二遍。

工具调用是第二条线。官方工具文档列出的能力覆盖 web、terminal、file、browser、vision、image generation、memory、session search、cronjob、delegation、messaging、Home Assistant 和 MCP。更关键的是 toolsets 可以按平台开关，终端后端也能选 local、Docker、SSH、Singularity、Modal、Daytona。

这让 Hermes 不只是聊天壳。它可以在本地跑，也可以把终端放进 Docker 或远程服务器；可以用 MCP 接 GitHub、数据库、文件系统和内部 API；也可以通过 cron 把某个 prompt 或 skill 做成定时任务。工具越多，权限边界越重要，所以官方也把 Docker 隔离、命令审批、凭据分离这些内容放进文档和 release 里。

v0.16.0 的新增能力，主要是把使用表面补齐。release 写到，桌面应用覆盖 macOS、Linux、Windows，支持应用内更新、拖拽文件进聊天、状态栏模型选择、多 profile 并发会话、简体中文界面，以及连接远程 Hermes gateway。Web dashboard 也从看会话变成管理面板，能配置 MCP catalog、消息渠道、凭据、webhook、memory 和登录方式。

这对 agent 应用的启发很直接。过去很多项目停在 CLI，很适合作者自己用，不适合交给团队成员。Hermes 这次把桌面、web 管理、远程 gateway、模型选择和中文界面一起补上，说明 agent 要进入工作流，入口要从开发者工具变成可交付界面。

从 clawdbot 到 moltbot，最好不要只当成仓库 topic 里的热词。更有价值的读法是，OpenClaw 生态一直在探索多入口助手和个人工作流 agent，而 Hermes 新版把迁移路径写进了 README。`hermes claw migrate` 可以迁移 settings、memories、skills、命令 allowlist、消息配置、允许迁移的密钥、TTS 资产和 AGENTS.md。对已有 OpenClaw 用户，这比重新配置一个新 bot 更现实。

适合谁用。第一类是已经在用 Claude Code、Codex、Cursor 处理工程任务，但想把个人习惯沉淀下来的开发者。第二类是想做团队共享助手的人，需要 gateway、定时任务、MCP 和权限配置。第三类是做 agent 产品的人，想看一个开源项目怎么把记忆、工具、技能、桌面入口和迁移路径接在一起。

坑点也要先摆出来。Hermes 要求模型至少 64K 上下文，本地小模型不一定合适。MCP catalog 虽然经过项目方合并审查，但安装还是会跑第三方代码，应该先看 manifest、source 和 bootstrap 命令。cron 很适合日报、审计、备份，但官方也限制 cron 任务里递归创建 cron，避免调度失控。

验证路径可以压得很短。先按官方 Quickstart 做一条最短路径，安装 Hermes，跑 `hermes model` 选提供方，启动 `hermes` 或 `hermes --tui`，让它总结当前仓库并确认能用 terminal 或 file 工具。确认 `hermes --continue` 能恢复会话后，再开 `hermes tools`、`hermes skills`、MCP 或 gateway。

如果你是 OpenClaw 用户，先跑 dry-run 看迁移内容，而不是直接覆盖。`hermes claw migrate --dry-run` 这一步能帮你判断记忆、skills 和配置是不是值得带过去。工作流 agent 最怕一上来就全自动，先让它在一个低风险目录里记住你的项目约定，才是更稳的起点。

我认为 Hermes Agent 这次值得看，不是因为它声量大，而是它把 agent 应用里最难产品化的几件事放到一起了。长期记忆要有边界，工具调用要能分层，个人工作流要能迁移和沉淀。谁能把这三件事做顺，谁才更接近可长期使用的 agent。

## 相关链接

- Hermes Agent 仓库 https://github.com/NousResearch/hermes-agent
- Hermes Agent v0.16.0 release https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5
- Quickstart 官方文档 https://hermes-agent.nousresearch.com/docs/getting-started/quickstart
- Persistent Memory 官方文档 https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
- MCP 官方文档 https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
