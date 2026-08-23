---
title: Claude Cowork 把 Claude Code 的思路搬到文件夹里，非程序员也能用 Agent 干活
status: draft
date: '2026-06-18'
source: manual
source_url: >-
  https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no
angle: >-
  从 Cowork 让 Claude Desktop 在文件夹里做非代码任务切入，讲它和 Claude Code 的关系：不是写代码，而是整理收据、做报告、清邮件、做资料归档。读者关心的是
  Agent 什么时候能从开发者工具变成日常办公工具。
voice: first-person
reach: 8
tags:
  - Claude
  - Claude Cowork
  - Claude Code
  - Agent
  - 办公自动化
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Claude Cowork 把 Claude Code 的思路搬到文件夹里，非程序员也能用 Agent 干活
wechat_title: ''
cover:
  status: skipped
reach_note: Claude/Claude Code 品牌强，文件 Agent 的利益点清楚，适合写成办公场景清单。
selection_reason: 这是今天 RSS 里最适合普通读者的 Agent 题，和代码工具主题拉开差异。
---

# Claude Cowork 把 Claude Code 的思路搬到文件夹里，非程序员也能用 Agent 干活

我看到 Cowork 最在意的不是 Anthropic 又发了一个新功能，而是它终于把 Claude Code 那套工作方式从终端里搬了出来。

如果你每天卡在收据、报告、邮件、下载文件夹、会议记录这些琐事里，Cowork 讲的不是“让非程序员写代码”，而是让 Agent 直接在一个文件夹里接活、改文件、交付结果。

读完这篇，你至少可以判断一件事，Agent 什么时候值得从开发者工具进入日常办公，以及你该拿什么任务验证它，而不是把自己的硬盘直接交出去。

## 先把任务关进一个文件夹

Cowork 的核心动作很简单，用户指定一个本地文件夹，Claude 可以在这个范围里读取、编辑、创建文件。

这和普通聊天很不一样。普通聊天是你把内容复制进去，它给你一段回答。Cowork 更像你把一堆材料放到桌上，然后说，帮我整理成一个能交付的东西。

VentureBeat 提到的例子很具体，一堆收据截图可以变成费用表，散落在多个文档里的笔记可以变成报告草稿，混乱的下载文件夹可以被分类和重命名。

我觉得这个设计抓住了办公 Agent 的第一条红线，不能一上来接管整台电脑，先给它一个可控工作区。

这也是我建议的验证方式，别拿真实客户资料、唯一原件、全盘文档开局。先复制一个小文件夹，让它处理一件明确任务。

## 把 Claude Code 的工作方式拆出来

Cowork 和 Claude Code 的关系，不是“代码工具出了办公版”这么简单。

Claude Code 最早是面向开发者的终端工具，用来处理重复的编程任务。但 Anthropic 观察到，很多人已经在逼着它做非代码工作，比如旅行研究、做幻灯片、清邮件、取消订阅、从硬盘里恢复婚礼照片，甚至监控植物生长。

这件事挺有意思。开发者先用命令行把 Agent 当临时同事用，Anthropic 再把命令行复杂度拿掉，留下任务规划、执行、检查、追问这些能力。

VentureBeat 写到，Cowork 基于 Claude Agent SDK，和 Claude Code 共享底层架构。它不是只吐一段文字，而是会规划步骤、并行处理、检查结果，遇到不确定的地方再问你。

这就是我认为它值得看的地方。真正能进入办公场景的 Agent，不是更会聊天，而是更会把一个模糊需求压成文件里的交付物。

## 先用这些低风险任务验证

如果你想判断 Cowork 这类产品有没有用，别从宏大流程开始。先选一个小、脏、重复、可检查的任务。

可收藏的验证清单如下。

- 适合谁，长期被文件整理、报销、周报、会议纪要、资料归档拖住的人
- 怎么做，把材料复制到一个测试文件夹，只授权这个文件夹
- 交付形态，表格、报告草稿、文件夹结构、命名规则、摘要文档
- 坑点，涉及删除、重命名、移动文件时，先让它给计划，不要直接执行
- 下一步动作，拿一组收据截图或会议记录跑一次，看输出是否能少改一半

我会优先拿三类任务试。

一类是收据截图转费用表，因为结果好验，金额、日期、商户、分类对不对，一眼能看出来。

一类是会议记录生成报告草稿，因为它能测试跨文件阅读和结构化输出。

还有一类是下载文件夹整理，但这个任务必须要求它先列计划，哪些文件移动、哪些文件重命名、哪些文件建议删除，都要人工确认。

## 这里最容易踩坑

Cowork 最大的吸引力，也是它最大的风险，都是“它真的会动文件”。

Anthropic 自己也提醒过，Claude 在被指示时可能执行有破坏性的动作，比如删除本地文件。更麻烦的是，它可能误解指令，也可能遇到网页或文件里的隐藏指令，这就是 prompt injection 风险。

所以我的判断很直接，办公 Agent 的成熟度不只看模型聪不聪明，还要看权限边界、确认机制和回滚习惯。

一个更稳的提示词思路是，让它先交计划，再等你批准。比如整理文件夹时，先输出分类方案、命名规则、待确认文件列表，不要直接删除或覆盖。

这不是保守，这是 Agent 进入办公桌面前必须补上的肌肉记忆。

## 看懂它对 Agent 应用的启发

Cowork 现在是研究预览，VentureBeat 报道称当时只面向 Claude Max 订阅用户，并通过 macOS 桌面应用使用。这个范围并不大，但方向很清楚。

Claude Code 证明了开发者愿意把重复劳动交给 Agent。Cowork 想验证的是，非程序员是否也愿意把文件夹、连接器、浏览器动作交出去一部分。

这一步对做 Agent 应用的人很重要。过去很多产品还停在聊天框加插件，用户每一步都要催着它走。Cowork 的路线更像“留言给同事”，把任务放下，回来检查交付物。

但能不能长期用，不取决于演示视频有多顺。它取决于一次普通任务里，Claude 是否知道什么时候该停下来问，什么时候该动手，什么时候绝不能碰原文件。

## 把下一步压到一个交付物

如果你已经有 Cowork 权限，最小动作不是研究所有功能，而是准备一个测试文件夹，里面放 10 张收据截图或 5 份会议笔记，让它产出一个表格或一页报告。

如果你还没有权限，也可以先照着这个模式重构自己的 Agent 任务，把输入材料、允许操作、禁止操作、交付格式写清楚。等这类桌面 Agent 普及，你会更快判断它是真帮忙，还是只会把文件夹弄得更乱。

Agent 进入日常办公，不会从一句“帮我做完所有事”开始。它会从一个可复制、可检查、可回滚的小文件夹开始。

## 相关链接

- VentureBeat 原文, https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no
- Claude Cowork 官方页面, https://claude.com/product/cowork
- Claude Code 官方页面, https://claude.com/product/claude-code
- Claude Agent SDK 介绍, https://claude.com/blog/building-agents-with-the-claude-agent-sdk
