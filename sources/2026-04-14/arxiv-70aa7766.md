---
title: >-
  VISOR: Agentic Visual Retrieval-Augmented Generation via Iterative Search and
  Over-horizon Reasoning
url: 'https://arxiv.org/abs/2604.09508v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yucheng Shen
  - Jiulong Wu
  - Jizhou Huang
  - Dawei Yin
  - Lingyong Yan
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-10T17:25:34Z'
fetched_at: '2026-04-14T00:33:19.777Z'
---
Visual Retrieval-Augmented Generation (VRAG) empowers Vision-Language Models to retrieve and reason over visually rich documents. To tackle complex queries requiring multi-step reasoning, agentic VRAG systems interleave reasoning with iterative retrieval.. However, existing agentic VRAG faces two critical bottlenecks. (1) Visual Evidence Sparsity: key evidence is scattered across pages yet processed in isolation, hindering cross-page reasoning; moreover, fine-grained intra-image evidence often requires precise visual actions, whose misuse degrades retrieval quality; (2) Search Drift in Long Horizons: the accumulation of visual tokens across retrieved pages dilutes context and causes cognitive overload, leading agents to deviate from their search objective. To address these challenges, we propose VISOR (Visual Retrieval-Augmented Generation via Iterative Search and Over-horizon Reasoning), a unified single-agent framework. VISOR features a structured Evidence Space for progressive cross-page reasoning, coupled with a Visual Action Evaluation and Correction mechanism to manage visual actions. Additionally, we introduce a Dynamic Trajectory with Sliding Window and Intent Injection to mitigate search drift. They anchor the evidence space while discarding earlier raw interactions, preventing context from being overwhelmed by visual tokens. We train VISOR using a Group Relative Policy Optimization-based Reinforcement Learning (GRPO-based RL) pipeline with state masking and credit a

Authors: Yucheng Shen, Jiulong Wu, Jizhou Huang, Dawei Yin, Lingyong Yan
Categories: cs.CV, cs.AI, cs.CV
