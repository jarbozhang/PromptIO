---
title: >-
  MGDA-Decoupled: Geometry-Aware Multi-Objective Optimisation for DPO-based LLM
  Alignment
url: 'https://arxiv.org/abs/2604.20685v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Andor Vári-Kakas
  - Ji Won Park
  - Natasa Tagasovska
categories:
  - cs.LG
  - cs.LG
published: '2026-04-22T15:33:45Z'
fetched_at: '2026-04-23T02:22:06.468Z'
---
Aligning large language models (LLMs) to desirable human values requires balancing multiple, potentially conflicting objectives such as helpfulness, truthfulness, and harmlessness, which presents a multi-objective optimisation challenge. Most alignment pipelines rely on a fixed scalarisation of these objectives, which can introduce procedural unfairness by systematically under-weighting harder-to-optimise or minority objectives. To promote more equitable trade-offs, we introduce MGDA-Decoupled, a geometry-based multi-objective optimisation algorithm that finds a shared descent direction while explicitly accounting for each objective's convergence dynamics. In contrast to prior methods that depend on reinforcement learning (e.g., GAPO) or explicit reward models (e.g., MODPO), our approach operates entirely within the lightweight Direct Preference Optimisation (DPO) paradigm. Experiments on the UltraFeedback dataset show that geometry-aware methods -- and MGDA-Decoupled in particular -- achieve the highest win rates against golden responses, both overall and per objective.

Authors: Andor Vári-Kakas, Ji Won Park, Natasa Tagasovska
Categories: cs.LG, cs.LG
