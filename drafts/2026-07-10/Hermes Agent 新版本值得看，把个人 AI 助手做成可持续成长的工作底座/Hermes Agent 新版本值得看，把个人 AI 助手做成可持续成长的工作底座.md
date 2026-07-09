---
title: Hermes Agent 新版本值得看，把个人 AI 助手做成可持续成长的工作底座
status: draft
date: '2026-07-10'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 中文读者可以从最新仓库入口看它如何把记忆、工具调用和 openclaw 生态连接起来，适合整理成一次最小上手路线：先跑起来，再判断能否接入自己的开发或内容流程。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - OpenClaw
  - AI Agent
  - 个人 AI 助手
  - 版本更新
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 新版本值得看，把个人 AI 助手做成可持续成长的工作底座
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.048
reach_note: NousResearch、Hermes、openclaw 都有明确品牌识别，GitHub 仓库可直接验证和上手。
selection_reason: 这是本号重点生态题，且具备版本更新、开源入口和可实践路径，适合做公众号解读和小红书快速种草。
---

# Hermes Agent 新版本值得看，把个人 AI 助手做成可持续成长的工作底座

如果你把个人 AI 助手只当成聊天窗口，Hermes Agent 这轮更新会显得有点重。

但如果你想要的是一个能记住项目习惯、沉淀工具流程、跨会话继续干活的助手，它就值得放进验证列表。

我看它的角度不是又一个 agent shell，而是一个个人工作底座。记忆、skills、工具调用、消息网关、OpenClaw 迁移入口，被它放到同一条工作线上。

信息来自 GitHub 仓库、release notes 和官方文档。落地前更适合按一个最小任务验证，不要一上来把全部流程搬进去。

## 把老问题压缩成一个判断

个人助手最烦人的地方，不是回答不够聪明，而是每次都像第一次见你。

它不知道你常用的仓库结构，不记得你偏好的写作格式，也不会把上次跑通的流程自动变成下一次可复用的步骤。最后人还是要反复解释背景。

Hermes 的 README 把核心卖点放在自我改进上。它会从经验里创建 skills，在使用中改进 skills，主动持久化知识，搜索过往对话，并在跨会话里建立用户模型。

我关心的不是这句话听起来多漂亮，而是它有没有把学习过程做成可看、可改、可回退的东西。

## 读这一组版本，别只盯着最新补丁

v0.18.2 是 2026 年 7 月 7 日发布的同日补丁，GitHub 页面显示为 latest。它修的是 WhatsApp bridge 的 Baileys 依赖，把 pinned git commit 改成 published 7.0.0-rc13，让 tagged release 的 Docker build 和安装更可靠。

真正的大变化在 v0.18.0 和 v0.18.1。

| 版本动作 | 解决的老问题 | 我会优先验证的能力 |
|---|---|---|
| v0.18.0 | 高优先级 issue 和 PR 清零，agent 不能只靠感觉说完成 | `/goal` 完成契约、验证证据、`/learn`、`/journey` |
| v0.18.1 | 主分支变化很快，下游安装、Docker、PyPI 需要稳定标签 | Windows installer 和 updater 自修复、dashboard 和 gateway 修复、MCP 和 provider 修复 |
| v0.18.2 | 消息桥接依赖影响 tagged Docker build | 使用已发布 npm 版本，降低构建失败概率 |

这一组更新的重点，是从会聊天变成能交付。release notes 里最关键的一句，是 Hermes 现在可以记录 coding work 的验证证据，并用项目检查结果判断工作是否完成。

这对 agent 应用很重要。一个助手如果不能证明自己真的完成了任务，只能算会说话。能把完成标准、验证动作、复用技能串起来，才开始接近工作底座。

## 把记忆和技能放到明处

Hermes 的记忆不是无限塞上下文。官方文档写得很克制，`MEMORY.md` 用来放环境事实、项目约定和经验，字符上限约 2200。`USER.md` 放用户偏好和沟通风格，字符上限约 1375。

这两个文件会在 session 开始时注入系统提示词，中途修改会落盘，但要到下一个 session 才进入新的提示词快照。

这个设计反而让我放心。长期记忆如果没有容量边界，迟早会变成垃圾堆。Hermes 把记忆控制在小文件里，再配合 v0.18 的 `/journey`，让你能看到它学到了什么，也能删掉不该留下的东西。

skills 也是同一个思路。官方文档说 skills 是按需加载的知识文档，放在 `~/.hermes/skills/`，核心文件是 `SKILL.md`。agent 不需要每次把所有技能塞进上下文，只在任务需要时加载完整内容。

我的判断很简单，Hermes 真正值得看的不是记忆本身，而是记忆能不能变成下一次可执行的流程。`/learn` 如果能把一次成功工作流沉淀成 skill，个人助手才有持续成长的可能。

## 让工具调用有一条可控入口

Hermes 不只做聊天层。README 里列了 TUI、CLI、gateway、cron、subagents、terminal backends、MCP integration 和 OpenClaw migration。

MCP 文档给的定位很直接，它让 Hermes 连接外部工具服务器，比如 GitHub、数据库、文件系统、浏览器栈、内部 API。配置入口在 `~/.hermes/config.yaml` 的 `mcp_servers` 下，还支持 per-server tool filtering。

这对开发和内容流程都有启发。不要把 agent 设计成一个巨大黑箱，而是把能力拆成几个可控入口。

记忆负责长期偏好，skills 负责复用流程，MCP 负责接工具，gateway 负责多入口会话。OpenClaw 用户还可以通过 `hermes claw migrate` 导入设置、记忆、skills、消息设置、工作区指令和允许迁移的密钥项。

这条线很清楚，Hermes 想接住的是从 OpenClaw 到更完整 agent 工作台的迁移。

## 用一个任务决定要不要接入

我不会建议一上来就把所有工具、消息平台、cron、MCP 都打开。更稳的办法，是先选一个重复出现的小任务。

比如开发场景，要求它总结当前 repo，找主入口，给出一个可验证的改动计划。内容场景，要求它把一个选题资料夹整理成标题、角度、风险边界和下一步素材缺口。

跑通后只看四件事。

- 它能不能通过 `hermes model` 选好模型并完成一次正常对话
- 它能不能用 `hermes doctor` 把配置问题说清楚
- 它能不能把一次成功流程通过 `/learn` 沉淀成 skill
- 它能不能在下一次 session 里通过记忆和 skill 少问你一遍背景

如果这四件事成立，再考虑接 MCP、gateway、cron 或 OpenClaw 迁移。

不成立也不用硬上。偶尔问答、一次性写作、临时查资料，普通聊天入口更轻。Hermes 适合的是高频、重复、有上下文、有工具调用的工作流。

## 谁现在适合验证

如果你已经在用 OpenClaw，或者正在搭一个长期陪跑的开发助手，Hermes v0.18 以后值得验证。

如果你关心的是多模型协作，v0.18.0 把 Mixture of Agents 做成可选择的模型入口，并展示 reference model 的推理输出，再流式生成 aggregator answer。这个方向适合用来处理难题，但要结合成本和延迟一起看。

如果你更关心团队或长运行服务，gateway 的 scale to zero、drain coordination、后台 subagents，都是偏生产化的信号。

我会把 Hermes 放在长期助手候选里，而不是马上替换现有工作流。最先验证的不是它会不会说漂亮话，而是它能不能把一次成功流程变成下一次可复用的 skill。

过了这关，个人 AI 助手才不只是回答器，而是一个会慢慢长出工作能力的底座。

## 相关链接

- Hermes Agent GitHub 仓库，https://github.com/NousResearch/hermes-agent
- Hermes Agent v0.18.2 release，https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7.2
- Hermes Agent v0.18.0 release notes，https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1
- Hermes Quickstart，https://hermes-agent.nousresearch.com/docs/getting-started/quickstart
- Hermes Memory 文档，https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
- Hermes Skills 文档，https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
- Hermes MCP 文档，https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
