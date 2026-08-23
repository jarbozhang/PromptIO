---
title: 'TokenPilot: Cache-Efficient Context Management for LLM Agents'
url: 'https://arxiv.org/abs/2606.17016v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Buqiang Xu
  - Zirui Xue
  - Dianmou Chen
  - Chenyang Fu
  - Chiyu Wu
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.MA
  - cs.CL
published: '2026-06-15T17:46:50Z'
fetched_at: '2026-06-16T06:33:00.403Z'
---
As LLM agents are deployed in long-horizon sessions, context accumulation drives up inference costs. Existing approaches utilize text pruning or dynamic memory eviction to minimize token footprints; however, their unconstrained sequence mutations alter layouts, introducing prefix mismatches and cache invalidation. This reveals a critical trade-off between text sparsity and prompt cache continuity. To address this, we present TokenPilot, a dual-granularity context management framework. Globally, Ingestion-Aware Compaction acts as a framework harness to stabilize prompt prefixes and eliminate open-world environmental noise at the ingestion gate. Locally, Lifecycle-Aware Eviction monitors the ongoing residual utility of context segments, enforcing a conservative batch-turn schedule to offload content segments only when task relevance expires. Experiments on PinchBench and Claw-Eval under both isolated and continuous modes demonstrate that TokenPilot reduces costs by 61% and 56% in isolated mode, and 61% and 87% in continuous mode, while maintaining competitive performance compared to prior systems. TokenPilot has been integrated into LightMem2 at https://github.com/zjunlp/LightMem2.

Authors: Buqiang Xu, Zirui Xue, Dianmou Chen, Chenyang Fu, Chiyu Wu
Categories: cs.CL, cs.AI, cs.LG, cs.MA, cs.CL
