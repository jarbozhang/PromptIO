---
title: "MosaicLeaks：研究 Agent 会不会把私密信息漏进外部查询"
url: "https://huggingface.co/blog/ServiceNow/mosaicleaks"
source: "Curated Hugging Face summary"
source_type: curated
language: zh
published: "2026-06-18T18:13:13Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

Hugging Face 2026-06-18 发布 ServiceNow 团队文章 MosaicLeaks: Can your research agent keep a secret? 文章讨论 deep research agent 同时读取私有本地资料和调用外部检索工具时的隐私风险。

核心问题是，agent 的外部查询本身可能泄露敏感信息。攻击者不需要看到私有文档，也不需要看到 agent 的完整推理，只要观察 agent 发出的多次查询，就可能把碎片拼成企业内部事实。

文章用“mosaic effect”描述这种风险，单条查询不一定暴露秘密，但多个查询组合起来会泄露私密上下文。

MosaicLeaks 提出一个多跳 deep-research 任务，把公开信息和私有信息交织起来，用于衡量 agent 在回答问题过程中是否泄露信息。

文章给出的关键结果：
- 普通 deep research agent 在测试中会频繁泄露私有信息。
- 只强化任务表现可能让泄露更严重。
- 团队提出 Privacy-Aware Deep Research, PA-DR。
- PA-DR 将 strict chain success 从 48.7% 提升到 58.7%。
- 同时把 answer/full-information leakage 从 34.0% 降到 9.9%。

适合写作角度，给使用 RAG、资料库、deep research agent 的人一份安全提醒，问题不只在“回答里有没有泄露”，还在“搜索词、工具调用参数、外部请求是否泄露”。
