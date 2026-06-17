---
title: >-
  Dynamic Workflows 别只当成程序员玩具。把 Claude Code 当生活脚手架的人，真正的解锁点是它能现场写一段 JS spawn
  一群隔离 context 的子 agent，去处理你存量的 50 个会话、30 天 daily notes、整个 NotebookLM
  笔记本，把第二大脑从"存着"变成"反复可挖"。 三个老毛病一次性收掉：ag
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2062901723099005177'
date: 'Fri Jun 05 14:17:52 +0000 2026'
likes: 73
reposts: 18
replies: 30
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-17T03:16:02.868Z'
---
Dynamic Workflows 别只当成程序员玩具。把 Claude Code 当生活脚手架的人，真正的解锁点是它能现场写一段 JS spawn 一群隔离 context 的子 agent，去处理你存量的 50 个会话、30 天 daily notes、整个 NotebookLM 笔记本，把第二大脑从"存着"变成"反复可挖"。

三个老毛病一次性收掉：agent laziness（50 项跑一半停了，workflow 是确定性程序，每个 item 都被显式 spawn）、self-preferential bias（同一个 agent 给自己的 draft 打分会偏袒，子 agent 隔离 context 后这就不成立）、goal drift（长会话忘初衷，子 agent 每次都是干净 context 带显式目标启动）。

作者跑过的三个真实用例：① 10 个并行 agent 扫最近 50 个会话挖"我反复在纠正什么"，49 sessions / 86 corrections，HTML 报告 + CLAUDE.md diff 建议；② 31 个 daily notes 每个派一个 Haiku 抽要点，Opus 跨笔记聚类找出"我反复在拖什么"，每条 pattern 自带原始 daily note 日期作证据；③ 让 Claude 从 NotebookLM 抓视频转录，fan-out 出可落地的想法，每个想法附"可直接粘贴回 Claude 跑"的实施 prompt。

关键洞察两条：重复 corrections 不该塞进 CLAUDE.md，该打包成 skill 让 skill 本身就规避错误——把提示工程升级成工具工程；workflow 不要做成独立实体，作为 JS 文件内嵌进 skill 目录，对外只暴露 skill 一个入口。

可复用范式：classify-and-act、fan-out-and-synthesize、tournament（成对比较替代千级绝对评分）、loop-until-done（搭配 schedule 做每日 digest）、claim-by-claim deep verification。任意输入 → 结构化输出 + 可执行 prompt，是这套用法的真正杠杆。
