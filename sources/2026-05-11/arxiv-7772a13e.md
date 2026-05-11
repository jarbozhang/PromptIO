---
title: >-
  SCOPE: Structured Decomposition and Conditional Skill Orchestration for
  Complex Image Generation
url: 'https://arxiv.org/abs/2605.08043v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tianfei Ren
  - Zhipeng Yan
  - Yiming Zhao
  - Zhen Fang
  - Yu Zeng
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-08T17:32:30Z'
fetched_at: '2026-05-11T08:20:12.074Z'
---
While text-to-image models have made strong progress in visual fidelity, faithfully realizing complex visual intents remains challenging because many requirements must be tracked across grounding, generation, and verification. We refer to these requirements as semantic commitments and formalize their lifecycle discontinuity as the Conceptual Rift, where commitments may be locally resolved or checked but fail to remain identifiable as the same operational units throughout the generation lifecycle. To address this, we propose SCOPE, a specification-guided skill orchestration framework that maintains semantic commitments in an evolving structured specification and conditionally invokes retrieval, reasoning, and repair skills around unresolved or violated commitments. To evaluate commitment-level intent realization, we introduce Gen-Arena, a human-annotated benchmark with entity- and constraint-level specifications, together with Entity-Gated Intent Pass Rate (EGIP), a strict entity-first pass criterion. SCOPE substantially outperforms all evaluated baselines on Gen-Arena, achieving 0.60 EGIP, and further achieves strong results on WISE-V (0.907) and MindBench (0.61), demonstrating the effectiveness of persistent commitment tracking for complex image generation.

Authors: Tianfei Ren, Zhipeng Yan, Yiming Zhao, Zhen Fang, Yu Zeng
Categories: cs.CV, cs.AI, cs.CV
