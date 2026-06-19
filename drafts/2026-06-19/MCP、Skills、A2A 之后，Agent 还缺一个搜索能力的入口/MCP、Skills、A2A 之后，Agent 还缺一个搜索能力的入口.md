---
title: MCP、Skills、A2A 之后，Agent 还缺一个搜索能力的入口
status: draft
date: '2026-06-19'
source: manual
source_url: https://huggingface.co/blog/agentic-resource-discovery-launch
angle: >-
  从能力太多后的发现问题切入。MCP 管调用，Skills 管指令，A2A 管互相调用，但用户仍要知道该装什么。ARD 的价值是让 Agent 在运行时搜索工具、Skills 和其他
  Agent。重点写它为何不是 marketplace，而是发现层。
voice: first-person
reach: 8
tags:
  - Agent
  - MCP
  - Skills
  - A2A
  - ARD
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: MCP、Skills、A2A 之后，Agent 还缺一个搜索能力的入口
wechat_title: ''
cover:
  status: skipped
reach_note: MCP/Skills/A2A 都是当前 agent 工程关键词，标准层变化值得关注。
selection_reason: 能把工具生态从“安装更多工具”推进到“运行时发现能力”，有方法论价值。
---

# MCP、Skills、A2A 之后，Agent 还缺一个搜索能力的入口

我最近看 ARD 这份草案时，第一反应不是又来一个新协议，而是 Agent 应用终于开始面对一个更现实的问题。

能力太多以后，用户根本不想记住该装哪个工具、该挂哪份 Skill、该找哪个 Agent。用户只想说清任务，然后让 Agent 自己去找能用的能力。

这就是 Agentic Resource Discovery 想补的位置。MCP 管调用，Skills 管指令，A2A 管 Agent 互相协作，但在它们前面，还缺一个发现入口。

## 先把问题换成一个真实交付场景

假设你要交付一个客服 Agent。它可能要查订单、读知识库、调工单系统、发邮件、找另一个售后 Agent 协助。

如果只看协议层，MCP 能让它标准化调用工具，Skills 能把操作指令打包给它，A2A 能让它调用其他 Agent。问题是，这些能力从哪里来。

现在很多 Agent 系统默认用户已经知道答案。你要先知道装哪个 server、引用哪个 skill、接哪个 agent，然后 Agent 才能开始工作。

这在 demo 里没问题。真正做产品时，能力列表会变长，版本会变化，团队会新增服务，用户也会提出你没预装过的任务。

我认为 ARD 的价值就在这里。它不是让 Agent 调更多工具，而是让 Agent 在运行时先搜索自己需要什么。

## 别把 ARD 理解成工具商店

Hugging Face 这篇发布文章反复强调，ARD 不是单一产品，也不是 marketplace。

这个判断很关键。

marketplace 解决的是人怎么浏览和安装。ARD 想解决的是 Agent 怎么发现、排序和选择能力。

它更像一层共享的发现协议。公司、开源项目、内部平台都可以按同一套方式发布能力描述，再让 Agent 或编排系统去搜索。

这也是它和 MCP、Skills、A2A 的关系。

- MCP 负责调用工具
- Skills 负责消费任务指令
- A2A 负责 Agent 之间互相调用
- ARD 负责在这些动作发生前，找到可能需要的能力

如果没有发现层，Agent 的能力扩展很容易变成上下文堆料。把所有工具说明、所有 Skill 文档、所有可调用 Agent 都塞进去，看起来万能，实际很快失控。

发现层的思路更克制。先查，再选，再调用。

## 把能力发布成可搜索的资源

ARD 目前是一个 draft open specification，有 Microsoft、Google、GoDaddy、Hugging Face 等贡献者参与。

它拆成两个核心部分。

第一部分是静态 manifest，文件名叫 ai-catalog.json。发布者可以把它放在 well-known URL，让外部系统知道这里有哪些 Agent、工具或服务。

第二部分是动态 registry API。核心接口是 POST /search，用来做实时搜索和排序发现。

这个设计的好处是，它没有把发现权锁在一个平台里。一个团队可以维护自己的 catalog，一个平台可以做自己的 registry，一个 Agent 编排器也可以在运行时向多个来源查询。

我会把它理解成 Agent 能力世界里的索引层，而不是安装页。

## 先按这份清单判断值不值得接

如果你现在在做 Agent 应用，不必急着把 ARD 当成必装组件。更实用的判断是，看你的系统有没有碰到能力发现问题。

可以按这份清单自查。

- 适合谁，已经有多个 MCP server、内部工具、Skills 或 Agent，需要按任务动态选择能力的团队
- 怎么做，先把现有能力整理成 catalog，再看是否需要 registry search
- 坑点，不要把 ARD 当成权限系统、计费系统或安装市场，它只解决发现层问题
- 下一步动作，先选 3 到 5 个高频能力做 manifest，验证 Agent 能不能搜到正确资源
- 交付形态，给业务侧的不是一堆插件名，而是一个能按任务发现能力的 Agent 入口

这里最容易踩坑的是，把发现层做成另一个大而全平台。

我的判断是，ARD 越有价值，越应该保持轻。它应该帮 Agent 找到候选能力，而不是替代 MCP、Skills、A2A 的职责。

## 用一个最小验证看懂它

Hugging Face 已经实现了 Discover Tool，提供 REST API 与 MCP Tool。对读者来说，最小动作不是研究完整生态，而是先验证一个问题。

当 Agent 面对一个没预装的任务时，它能不能搜到合适能力。

你可以这样拆。

- 选一个真实任务，例如查客户订单后生成回复
- 列出任务可能需要的工具、Skill 或 Agent
- 用 ai-catalog.json 描述这些能力
- 通过搜索接口让 Agent 找候选资源
- 再进入 MCP 调用、Skill 执行或 A2A 协作

这条路径跑通以后，你会更清楚 ARD 的边界。

它不是让 Agent 变聪明的魔法。它只是把过去靠人记、靠文档找、靠预装堆出来的能力入口，变成机器可搜索的索引。

## 我的判断，Agent 缺的不是更多按钮

Agent 应用现在的问题，很多时候不是能力不够，而是能力管理方式还停留在人类插件时代。

人可以逛页面、看介绍、决定装哪个。Agent 不该用同一套方式。

如果 MCP、Skills、A2A 分别把调用、指令和协作标准化了，ARD 补的是更前面的动作。任务来了，先发现该用什么。

这件事不会立刻让每个 Agent 产品改架构，但它会影响后面怎么设计能力目录、内部工具平台和多 Agent 协作。

我会建议从一个小 catalog 开始，而不是从大平台开始。先让 Agent 搜到 3 个真正有用的资源，比一次性整理 300 个工具更接近交付。

## 相关链接

- Hugging Face 发布文章，https://huggingface.co/blog/agentic-resource-discovery-launch
