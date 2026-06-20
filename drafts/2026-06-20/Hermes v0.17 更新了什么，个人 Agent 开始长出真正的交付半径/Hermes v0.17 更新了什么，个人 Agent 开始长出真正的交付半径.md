---
title: Hermes v0.17 更新了什么，个人 Agent 开始长出真正的交付半径
status: draft
date: '2026-06-20'
source: manual
source_url: https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19
angle: >-
  从 v0.17.0 的 Reach Release 切入，不再重复介绍 Hermes 是什么，而是拆它这次新增的入口、后台子任务、图片编辑、自动化蓝图、Skills
  Hub、记忆工具和成本控制。落点是一份 Agent 应用从个人可用走向可交付前的检查清单。
voice: first-person
reach: 9
tags:
  - Hermes
  - Agent
  - 开源项目
  - 自动化工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes v0.17 更新了什么，个人 Agent 开始长出真正的交付半径
wechat_title: ''
cover:
  status: skipped
reach_note: Hermes 是长期跟踪重点，版本变化具体，读者能按清单检查自己的 Agent。
selection_reason: 这是 06-19 新 release，能回答用户要求的“新版本解决了哪些问题、新增了哪些功能、怎么使用”。
---

# Hermes v0.17 更新了什么，个人 Agent 开始长出真正的交付半径

做个人 Agent 的人，这版 Hermes v0.17 值得翻一遍。

这版没有靠新按钮刷存在感，主线是把一个偏桌面预览的 Agent，往可交付形态推了一步。

读这版 release，可以按几个问题过一遍：入口够不够多，长任务会不会堵住人，技能和记忆能不能管理，成本有没有兜底。少一个，个人玩具还能跑。真要交付给别人用，迟早会被这些细节卡住。

## 入口先被补到哪里

v0.17.0 官方称为 Reach Release，这个名字挺准。

这次 Hermes 新增了 iMessage 平台插件，基于 Photon managed line pool。它还新增 Raft platform adapter，让 Hermes 可以作为外部 agent，通过 wake-channel bridge 接入 Raft agent network。

同一轮更新里，Telegram rich messages 和 official WhatsApp Business Cloud API adapter 也有增强。

这里要看的不是“支持了几个聊天软件”。更关键的是，Agent 不再只待在单个桌面窗口里。可用的个人 Agent，最后一定会进入消息、桌面、浏览器和团队协作入口。

入口变多之后，问题也会变复杂。不同渠道的权限、格式、唤醒方式、上下文长度都不一样。这里最容易踩坑的是，只按一个聊天窗口设计体验，然后上线到多个入口，结果每个入口都像临时接的补丁。

## 把长任务放到后台，不要让人等在窗口前

我觉得这次最像“交付前能力”的更新，是 `delegate_task(background=true)`。

它可以把 subagent 派到后台，立即返回 handle。子任务结束后，完整结果再作为新的 turn 回到当前对话。

这解决的是一个很真实的问题，Agent 一旦开始做调研、整理、多步骤执行，用户就不该一直卡在当前对话里等它跑完。

交付给别人用时，长任务需要三件事。

- 能后台跑，不堵住主对话
- 能返回任务句柄，让用户知道事情还在推进
- 能把最终结果自然接回当前上下文，而不是丢一个孤立日志

Hermes 这次把这条链路补上了。它不保证每个任务都会做得漂亮，但它至少开始把“等待”从聊天体验里拆出去。

## 别只看桌面 UI，看日常使用的摩擦有没有少

桌面端这轮变化也很实际。

新增可重绑快捷键、原生系统通知、subagent watch-windows、composer model selector、VS Code Marketplace theme、可调整终端 pane、per-thread composer drafts。

这些功能单看都不大，但组合起来就是一个信号，Hermes 正在从演示环境走向日常工作流。

三个摩擦点值得单独看。

- 快捷键能不能按自己的肌肉记忆改
- 子任务有没有独立观察窗口
- 不同线程里的输入草稿会不会互相覆盖

很多 Agent 产品不是死在模型能力，而是死在这些小摩擦上。你每天打开十几次，一个 pane 调不了大小，一个 draft 丢了，用户就会回到自己熟悉的工具。

## 用技能、蓝图和图片编辑补交付形态

v0.17 还补了几块很适合做应用封装的能力。

`image_generate` 支持 image-to-image 编辑。Automation Blueprints 用问答式配置替代手写 cron。dashboard 增加 profile builder，可以在浏览器里选择模型、skills、MCP servers。Skills Hub 支持预览和安全扫描。

这几件事连起来看，Hermes 想做的不只是“会聊天的 agent”。它开始提供一套让用户配置、选择、复用、检查的入口。

对开发者来说，Automation Blueprints 的价值不在于少写 cron，而在于把自动化从工程配置变成可交互表单。Skills Hub 的价值也不只是市场，而是把技能预览和安全扫描放到安装前。

这里我的判断比较明确。

Agent 应用要从个人可用走向可交付，不能只暴露 prompt 和模型选择。它需要把任务模板、技能来源、权限风险、运行成本都做成用户能理解的界面。

## 记忆和成本，才是后面最难补的账

这次更新里还有两项容易被忽略。

`memory` tool 支持 atomic batch operations，可以在一次调用里 add、replace、remove，并按最终字符预算原子提交。

这听起来偏底层，但对长期记忆很关键。记忆不是只会追加就行，它要能批量更新，要能在预算内保证一致性。否则越用越乱，最后只能 reset。

成本侧也有变化。skill curator 默认只做 deterministic inactivity sweep，不再为 routine runs 消耗 aux-model 预算，除非显式开启 consolidate。

我会把这条当成很务实的成本控制。很多 Agent 系统刚开始跑得很顺，一旦后台维护、记忆整理、技能清理都要额外模型预算，账单就会变得不可预测。

## 可收藏的 Agent 交付检查清单

做类似个人 Agent，可以直接拿 v0.17 这次更新反推一张表。

- 入口，是否只有一个聊天窗口，还是已经考虑消息渠道、桌面端和外部 agent network
- 长任务，是否支持后台执行、任务句柄和结果回流
- 桌面体验，是否有快捷键、通知、草稿保留和子任务观察窗口
- 自动化，是否能用问答式配置替代手写定时任务
- 技能，是否支持预览、安全扫描和可控安装
- 记忆，是否能批量增删改，并在字符预算内原子提交
- 成本，是否区分日常清理和显式整理，避免默认消耗额外模型预算

这不是 Hermes 专属清单。任何想交付的 Agent 应用，都绕不开这些问题。

## 开始使用前先验证一个最小任务

不要一上来就把它接满所有入口。

一个合适的起点是重复任务。比如从消息里触发资料整理，在桌面端观察 subagent，后台跑完后把结果接回当前对话。然后再看 memory 更新和 skill curator 的成本行为。

只验证这条最小路径，就能看出 Hermes v0.17 的更新到底有没有进入你的工作流。

这次 Reach Release 的启发很朴素：个人 Agent 的半径靠入口、后台、技能、记忆和成本这些小环节一点点接上。

真正的分水岭也在这里。

能聊天，只是开始。能被别人稳定托付一个任务，才算长出了交付半径。

## 相关链接

- Hermes Agent v0.17.0 Release，https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19
- Hermes Agent GitHub 仓库，https://github.com/NousResearch/hermes-agent
