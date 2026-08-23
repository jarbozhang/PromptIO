---
title: >-
  165K ✨ 开源 Skills 系列 Skills For Real Engineers 新添一个 Skill「loop-me」：目前还在
  in-progress 阶段，在多轮会话里，用当前目录作有状态工作区，通过「拷问」把想法磨成可落地的工作流规格。
  https://t.co/Mu5YYIB3ys loop-me 和 grill-me 共用 grilli
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2069941286371774519'
date: 'Thu Jun 25 00:30:34 +0000 2026'
likes: 88
reposts: 20
replies: 29
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-06-25T23:00:31.951Z'
---
165K ✨ 开源 Skills 系列 Skills For Real Engineers

新添一个 Skill「loop-me」：目前还在 in-progress 阶段，在多轮会话里，用当前目录作有状态工作区，通过「拷问」把想法磨成可落地的工作流规格。
https://t.co/Mu5YYIB3ys

loop-me 和 grill-me 共用 grilling 纪律，但产出物不同：
· grill-me 对齐任意计划
· loop-me 只产出 workflows/*.md

# loop-me 核心概念

Loop 透镜
Loop = 生活中可识别的重复模式：职业节奏、每周节奏、早晨例行、某类固定活动。生活可被看成「大 loop 套小 loop」。

价值在于：可预测 → 可委托。Agent 应主动帮用户发现「你没意识到但在重复做的事」，而不只写用户已说出的那几项。

Workflow
Workflow = 某一个 loop 的规格说明书；loop 的一次运行 = 该 workflow 的一次实例。

规格存放在 workflows/*.md，是唯一真相源。会话过程中可创建、编辑、删除这些文件，随拷问推进而收敛。

拷问纪律（grilling）
· 一次一问：多问并行会让人迷失
· 每问附带推荐答案：降低回答成本，加速收敛
· 走完整棵决策树：分支依赖逐个解决
· 能查代码库就先查：不把本该自己调研的问题抛给用户
· 有状态：跨会话延续，工作区文件承载进度

完成标准（Definition of Done）
实现 agent 读 spec 后不需要再问任何问题。

拷问未消尽疑点 = 未完成。这与 to-prd（从已有对话合成 PRD）不同：loop-me 是主动挖空未知，直到 spec 自洽。

设计哲学（精简）
1. 从重复模式出发，而非从「我要一个 AI agent」出发。
2. 规格是唯一交付物；实现是后续步骤。
3. 人类时间最贵——Push right + Brief，把人的角色压缩为「晚到的单次决策」。
4. 反模板化——结构由场景决定，不由 skill 预设。
5. 状态外置到文件，支持跨会话、可版本化、可 diff。

在 Skills 生态中的位置 👇
