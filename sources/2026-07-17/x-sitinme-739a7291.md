---
title: >-
  现在用 Codex、Claude Code 或 Cursor 写一个网页并不难，不过要想把一个网页设计的好看高级，还是有点难度的。 最近发现一个给 AI
  Agent “注入设计品味”的开源技能库：emilkowalski/skills 一句话：专门解决 AI 做 UI 动画和交互时“没品味”的问题。
  它不是新的 AI 模型，也不是设计软件，而是一套可以安装到
source: X @sitinme
url: 'https://x.com/sitinme/status/2077216108533493887'
date: 'Wed Jul 15 02:18:07 +0000 2026'
likes: 100
reposts: 17
replies: 13
source_type: x
language: zh
account_name: sitinme
fetched_at: '2026-07-16T23:12:44.508Z'
---
现在用 Codex、Claude Code 或 Cursor 写一个网页并不难，不过要想把一个网页设计的好看高级，还是有点难度的。

最近发现一个给 AI Agent “注入设计品味”的开源技能库：emilkowalski/skills

一句话：专门解决 AI 做 UI 动画和交互时“没品味”的问题。

它不是新的 AI 模型，也不是设计软件，而是一套可以安装到 AI 编程 Agent 里的“设计经验包”：

把一位资深设计工程师关于动画、交互和 UI 细节的判断，整理成 AI 可以执行的规则。

核心技能包括：
 - improve-animations：扫描整个代码库，按 8 个维度审计动画，输出可执行的改进计划 
- review-animations：严格按规则审查动画 
- animation-vocabulary：教 AI 用精确语言描述动画 
- apple-design：蒸馏苹果设计原则

最聪明的地方是：它不直接改代码，而是先审计 → 生成 prioritized plan → 再让 Agent 去执行。用强模型做审查，便宜模型做落地。

对经常用 AI 做前端 / UI 的人来说，这可能是目前最实用的“设计品味”注入工具。
