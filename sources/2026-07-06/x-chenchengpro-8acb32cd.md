---
title: >-
  给 LLM Agent 堆越花哨的"记忆"架构，效果不一定越好。一篇新论文实测了 12 个记忆系统，没有通用赢家。 它把 Agent
  记忆当成数据库来拆——表示与存储、抽取、检索与路由、维护四个模块，拉来
  Mem0、Letta、Zep、Cognee、MemOS、MemTree、A-MEM、LightMem 等 12 个系统，外加 Long Context 和
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2070128168879653017'
date: 'Thu Jun 25 12:53:11 +0000 2026'
likes: 250
reposts: 55
replies: 42
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-07-05T23:05:04.209Z'
---
给 LLM Agent 堆越花哨的"记忆"架构，效果不一定越好。一篇新论文实测了 12 个记忆系统，没有通用赢家。

它把 Agent 记忆当成数据库来拆——表示与存储、抽取、检索与路由、维护四个模块，拉来 Mem0、Letta、Zep、Cognee、MemOS、MemTree、A-MEM、LightMem 等 12 个系统，外加 Long Context 和 Embedding RAG 两个基线，跑 5 类负载、11 个数据集。

几个反直觉的点：

1）在数据库操作类任务 DB-Bench 上，裸的 Long Context（48.20 EM）和最朴素的 MemoChat 反而赢过一众精致记忆系统。强记忆看的是它对主导瓶颈的对齐程度，而不是用了多花哨的表示。

2）检索的关键是怎么组织证据供后续重建，而不是把最相关那条排第一。证据拉远时图/层级结构碾压扁平：A-MEM Recall@10 达 85.9，而 Embedding RAG 的 Answer-F1 从 37.1 断崖跌到 7.4。

3）成本由"维护范围"而非"结构本身"决定，局部维护远胜全局重组。LongBench 上 LightMem 稳在 17.3 秒，而做全局协调的 Mem0/MemoChat/MemoryOS/A-MEM 飙到 374~552 秒，20~30 倍延迟差。

4）别急着压缩：保留原文胜过摘要，压一压 Substring-EM 就从 26.0 掉到 10.7；抽取要保上下文（MemOS Fast 25.5 EM vs Fine 2.5）；维护要保守整合，激进的延迟刷新反而把分数拉低。

还有个普遍毛病叫"过去的幻觉"：事实更新后系统照样返回旧值。所以论文标题才会问，我们真的准备好迎接 Agent 原生的记忆系统了吗。

https://t.co/T6hYrIp9Xg
