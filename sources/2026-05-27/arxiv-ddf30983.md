---
title: 'From Model Scaling to System Scaling: Scaling the Harness in Agentic AI'
url: 'https://arxiv.org/abs/2605.26112v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shangding Gu
categories:
  - cs.AI
  - cs.LG
  - cs.AI
published: '2026-05-25T17:59:36Z'
fetched_at: '2026-05-27T01:19:09.162Z'
---
This paper studies the next major bottleneck in agentic AI as system scaling, not only model scaling: the design of auditable, persistent, modular, and verifiable architectures around foundation models. We refer to this shift as scaling the harness: treating the structured execution layer around a foundation model as a first-class object of design, evaluation, and optimization. Although recent large language models enable agents to use tools, retrieve information, maintain memory, and execute long-horizon workflows, evaluation remains largely model-centric, often reducing agents to final-task success while treating memory, retrieval, tool use, orchestration, verification, and governance as secondary implementation details. This framing is increasingly inadequate because agent performance emerges from the interaction among the foundation model, memory substrate, context constructor, skill-routing layer, orchestration loop, and verification-and-governance layer. Together, these components form the agent harness, which translates model capability into long-horizon agent behavior. We study scaling the harness through three core bottlenecks: context governance, trustworthy memory, and dynamic skill routing, together with the orchestration and governance mechanisms that coordinate and constrain them. We further outline a research agenda for harness-level benchmarks that go beyond one-shot task success to measure trajectory quality, memory hygiene, context efficiency, communication 

Authors: Shangding Gu
Categories: cs.AI, cs.LG, cs.AI
