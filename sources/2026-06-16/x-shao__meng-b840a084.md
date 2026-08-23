---
title: "AI 驱动开发的七阶段 1. Grill 2. Research 3. Prototype 4. PRD 5. Issues 6. Implement 7. Review  来自 Skills For"
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2066678169005121847"
date: "Tue Jun 16 00:24:07 +0000 2026"
likes: 53
reposts: 15
replies: 0
source_type: x
---

AI 驱动开发的七阶段
1. Grill
2. Research
3. Prototype
4. PRD
5. Issues
6. Implement
7. Review

来自 Skills For Real Engineers 作者 @mattpocockuk 
https://t.co/5jqJsURTQ8

7 个阶段：目的  |  产出
1. Grill：把模糊想法变成共享理解  |  问题陈述 + 对齐
2. Research：缓存难探索的外部信息  |  research.md
3. Prototype：用可玩代码验证设计/UX  |  可丢弃原型
4. PRD：描述终点，而非路径  |  需求文档
5. Issues：拆成可并行执行的垂直切片  |  带依赖的工单 DAG
6. Implement：Agent 执行（TDD、Ralph 等）  |  可运行代码
7. Review：人工 QA，发现问题再回环  |  QA 计划 + 新工单

/grill-with-docs：这是 /grill-me 的升级版，专为有代码库的场景设计

额外能力：
1. 领域语言（CONTEXT.md）
来自 DDD 的 ubiquitous language。CONTEXT.md 只是术语表，不是 spec、不是实现笔记。
例：「materialization cascade」比「lesson 被 real 化时文件系统里占坑」省 token、可搜索、命名一致。
2. ADR（docs/adr/）
只在三条件同时满足时写：难逆转、无上下文会令人惊讶、存在真实 trade-off。
3. 会话中的四类动作
· 对照 glossary 挑战用词
· 用具体场景压测边界
· 对照代码发现矛盾
· 决策即时写入 CONTEXT，不批量攒

与 /grill-me 的分工：有代码库 → /grill-with-docs；无代码库（写悼词、纯产品构思）→ /grill-me。
