---
title: "Elastic Agent Memory：用 Elasticsearch 做长期记忆层"
url: "https://www.elastic.co/search-labs/blog/agent-memory-elasticsearch"
source: "Curated Elastic official blog summary"
source_type: curated
language: zh
published: "2026-06-16T00:00:00Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

Elastic 发布文章 Agent memory on Elasticsearch，讲一个持久化、多租户的 Agent memory layer。官方给出的摘要是：three indices、hybrid retrieval with RRF and a reranker、supersession、decay、per-user DLS isolation；在 168 个问题的 QA-style eval 上 R@10 平均 0.89，且 zero cross-tenant leaks。

文章的核心判断：1M context window 是 scratchpad，不是 memory system。context window 适合一次 inference 的 active reasoning space；长期记忆需要在 session 结束后仍存在，能跨多年交互扩展，并按内容、时间、用户检索。

官方架构把记忆分成三类：

- episodic memory：用户经历过的事件，例如上次尝试过什么修复、发生在什么时间。
- semantic memory：稳定事实，例如用户偏好、设备、长期约束。
- procedural memory：步骤和 playbooks，例如某类问题的处理流程。

检索层使用 hybrid retrieval：关键词、向量召回、RRF 融合和 cross-encoder reranker。矛盾更新不直接删除旧事实，而是 supersede，保留 audit trail；旧事实会衰减，经常被触达的事实不容易下沉。

多用户部署的关键是 DLS（document-level security）：每个用户的记忆必须对其他用户不可见。文章强调，这一层不应拆成 vector store、keyword engine、audit layer、separate auth service 四套东西，因为这样会增加故障面和 round trips。

适合写作角度：写 Agent 记忆时，别把“塞更多上下文”当长期方案。更有价值的是把这篇文章翻译成工程检查清单：记忆分类、召回融合、事实过期、矛盾处理、租户隔离、审计轨迹和 MCP 可访问性。
