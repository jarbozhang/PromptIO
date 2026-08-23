---
title: Hermes Agent 新版上手：把会成长的 AI Agent 接进 openclaw 工作流
status: draft
date: '2026-06-30'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: >-
  从新版仓库和 README 切入，梳理 Hermes Agent 解决了什么、和 openclaw/clawdbot/moltbot
  生态怎么衔接，以及读者今天可以从哪里开始试一个最小任务。读者关心的是：它不是又一个聊天入口，而是可以沉淀能力的执行层。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  title_pattern_repeat_in_batch,agent_like_daily_cap,checklist_daily_cap,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - openclaw
  - AI Agent
  - 版本解读
  - 工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 新版上手：把会成长的 AI Agent 接进 openclaw 工作流
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.066
reach_note: NousResearch/openclaw 是重点生态品牌，GitHub 可直接验证和上手，且能带来明确的 Agent 工作流收益。
selection_reason: 这是当天最贴合 PromptIO 定位的核心生态题，事实主源质量高，适合做版本变化、能力边界和上手路径的合并解读。
---

# Hermes Agent 新版上手：把会成长的 AI Agent 接进 openclaw 工作流

我看 Hermes Agent 新版 README 时，最先注意到的不是它又支持多少入口，而是它把 agent 从聊天窗口往执行层推了一步。

如果你已经在 openclaw、clawdbot、moltbot 这条线里折腾过，最痛的地方通常不是模型不够聪明，而是能力留不下来。今天教会它一套流程，明天换会话又要重讲一次。

Hermes 的新版本值得看，原因就在这里。它把记忆、技能、消息网关、MCP、子代理和定时任务放在同一套循环里，目标不是让你多开一个 bot，而是让一个 agent 在重复工作里逐渐变顺手。

## 把旧问题说清楚，别只看聊天入口

openclaw 这一类个人 agent 的吸引力，一直是你可以从消息平台把任务丢出去，让它在机器上执行。问题也很明显，入口越多，状态越散，技能越靠 prompt 临时撑。

我最关心 Hermes 的点，是它有没有把这三个问题往前推。

任务状态能不能跨会话找回来。

常用流程能不能沉淀成 skill。

从 openclaw 迁过来的记忆、技能、白名单和工作区指令，能不能继续用，而不是重新开荒。

README 里给出的迁移入口很直接。首次 `hermes setup` 会检测 `~/.openclaw`，之后也可以用 `hermes claw migrate` 做交互式迁移，用 `--dry-run` 预览要迁的内容。它覆盖 SOUL.md、MEMORY.md、USER.md、用户自建 skills、命令白名单、消息设置、部分白名单密钥和 AGENTS.md。

这对老用户很关键。一个 agent 的价值不在第一句回答，而在它记得你怎么交付。

## 看 v0.17 改动，重点是执行半径变大

v0.17.0 发布说明把这版叫 Reach Release。这个名字挺准确，它不是单点能力爆炸，而是把 Hermes 伸到更多工作位置里。

| 旧问题 | 新版变化 | 对工作流的影响 |
| --- | --- | --- |
| 长任务会卡住主会话 | background subagents 返回 handle，完成后再把结果带回会话 | 研究、构建、排查可以委派出去，主线继续推进 |
| 记忆编辑容易因为容量失败 | `memory` 工具支持原子批量操作 | 能同时删旧内容、写新内容，长期记忆更稳 |
| 桌面端像早期预览 | 桌面端加入快捷键重绑、通知、子代理观察窗、模型预设、终端面板 | 更像日常工作台，而不是演示壳 |
| skills 浏览像平铺列表 | Skills Hub 支持预览、安全扫描和更完整的浏览体验 | 团队可以把能力当资产管理 |
| 仪表盘权限和配置复杂 | profile builder 与安全登录加强 | 多 profile、MCP、消息入口更适合团队使用 |

我会把这些变化合在一起看。Hermes 在做的不是聊天体验优化，而是让 agent 可以同时拥有长期记忆、可复用技能、可委派执行和多入口触达。

这正好补上 openclaw 系工作流的一个缺口，消息入口已经足够吸引人，下一步要解决的是能力如何沉淀。

## 接进 openclaw 生态，别急着全量迁移

如果你已经有 openclaw 配置，我建议从迁移预览开始，而不是一上来就把所有渠道都接上。

`hermes claw migrate --dry-run` 的价值，是让你先看清哪些东西会进入 Hermes。记忆和技能适合迁，密钥和消息配置要按团队安全要求再确认，AGENTS.md 这类工作区指令最好单独读一遍。

clawdbot、moltbot、openclaw 这些名字背后，其实是同一个用户需求，想让 agent 通过熟悉的入口帮自己执行任务。Hermes 的差别，是它在 README 里把迁移、gateway、skills、memory、MCP、cron 都放进了同一张图。

还有一个细节可以留意。README 相关社区项目里提到 HermesClaw，它能让 Hermes Agent 和 OpenClaw 运行在同一微信账号上。这不是我建议你立刻上生产的理由，但它说明生态正在往桥接而不是替代的方向走。

## 用一个重复任务验证成长性

我会选一个足够小、但会重复出现的任务来试 Hermes。

比如让它在一个测试仓库里做每周依赖巡检。不要让它一开始就接业务系统，也不要让它同时开所有平台。先在 CLI 跑通，再加 gateway，再加 cron，最后才考虑 MCP 和自建 skill。

我的最小路径是这样。

- 按官方 quickstart 安装，先跑一轮普通对话
- 用 `hermes model` 确认模型和上下文窗口，官方文档要求至少 64K tokens
- 用 `hermes doctor` 排掉配置问题
- 如果来自 openclaw，先跑 `hermes claw migrate --dry-run`
- 选一个测试仓库，让 Hermes 总结入口文件、写出变更建议，并观察它会不会把项目约定写入 memory
- 第二次开启新会话，用 `hermes --continue` 或新会话检验它是否能找回上下文

这里的验收标准不是它一次回答多漂亮，而是三件事。

它能不能把重复偏好写进长期记忆。

它能不能把复杂流程沉淀成 skill。

它能不能把长任务委派给 background subagent，而主会话不被卡住。

## 我的判断，Hermes 更像 agent 的执行层

很多 agent 产品把重点放在入口上，桌面端、聊天端、网页端、命令行端，看起来很热闹。但对工程师来说，入口只是门把手，真正省时间的是门后那套执行层。

Hermes v0.17.0 最值得关注的，是它把门后的东西补得更完整。记忆能批量原子更新，skills 可以更安全地浏览和安装，子代理可以后台跑，dashboard 可以管理 profile，消息网关可以承接更多渠道。

这给 openclaw 用户一个现实选择。你不必把原来的工作流推倒重来，可以从迁移预览开始，把记忆、技能和工作区指令逐步接进 Hermes，然后用一个重复任务测试它是否真的会成长。

如果它只会聊天，那不值得迁。如果它能把你每周都会做的那件事越做越少解释，Hermes 才开始变成执行层。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.17.0 发布说明](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19)
- [Hermes Agent 官方文档](https://hermes-agent.nousresearch.com/docs/)
- [OpenClaw 迁移说明](https://github.com/NousResearch/hermes-agent#migrating-from-openclaw)
- [HermesClaw 社区桥接](https://github.com/AaronWong1999/hermesclaw)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
