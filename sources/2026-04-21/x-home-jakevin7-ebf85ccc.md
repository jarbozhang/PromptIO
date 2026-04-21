---
title: "做了一个 llm-wiki 的最佳实践！这一套是关于「AI agent 如何建立和维护自己的知识体系」我自己的完整答案。  目前已经运行在 OpenCLI 的项目管理中了，使用体验很 nice。ope"
source: "X home @jakevin7"
url: "https://x.com/jakevin7/status/2046232019806704079"
date: "Mon Apr 20 14:18:25 +0000 2026"
likes: 140
reposts: 13
replies: 8
---

做了一个 llm-wiki 的最佳实践！这一套是关于「AI agent 如何建立和维护自己的知识体系」我自己的完整答案。

目前已经运行在 OpenCLI 的项目管理中了，使用体验很 nice。opencli 交流群的群友希望学习下，于是把 public 了 repo 出来了。地址放评论。

讲讲自己的设计思路：
1. llm-wiki 的设计是有一个负责 wiki 维护的 wiki agent 作为 agent team 的一部分，实时的维护和摄入项目的设计和成果。两层架构（AGENTS.md + Skill）是这样设计理念下的产物。
2. wiki 产物是知识库图谱，兼容 obsidian 来方便进行知识查看
3. 不做 GUI or 后续做，不需要GUI来进行内容维护，因为维护是Agent本身来做， GUI 只做展示用，初始阶段 obsidian 已经足够。

项目的核心主张：
- vault 是 agent 的外脑。llm-wiki 把「知识库」从人类工具变成了 agent-native 工具：由 agent 写，给 agent 和人类读。

知识复利（/query 写回）
query 的答案如果连接了 3 个以上页面、产生了新的 synthesis，就写回 wiki。每次查询都可能让 vault 变得更完整。知识库随使用自增长。
运行模型

四个操作形成闭环：/ingest（原始来源 → wiki 页面）→ /query（问题 → 合成答案 + 写回）→ /lint（健康检查 + 自动修复）→ /research（引入外部源）。
设计边界

知识分三层：原始材料（sources/）、提炼知识（wiki/）、操作日志（wiki-log.md），三者隔离。源文件永远不修改。
