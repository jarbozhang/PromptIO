---
title: >-
  OptProver: Bridging Olympiad and Optimization through Continual Training in
  Formal Theorem Proving
url: 'https://arxiv.org/abs/2604.23712v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenyi Li
  - Yanchen Nie
  - Zhengyu Ming
  - Gong Zhang
  - Kun Yuan
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-26T13:54:28Z'
fetched_at: '2026-04-28T02:04:33.988Z'
---
Recent advances in formal theorem proving have focused on Olympiad-level mathematics, leaving undergraduate domains largely unexplored. Optimization, fundamental to machine learning, operations research, and scientific computing, remains underserved by existing provers. Its reliance on domain-specific formalisms (convexity, optimality conditions, and algorithmic analysis) creates significant distribution shift, making naive domain transfer ineffective. We present OptProver, a trained model that achieves robust transfer from Olympiad to undergraduate optimization. Starting from a strong Olympiad-level prover, our pipeline mitigates distribution shift through two key innovations. First, we employ large-scale optimization-focused data curation via expert iteration. Second, we introduce a specialized preference learning objective that integrates perplexity-weighted optimization with a mechanism to penalize valid but non-progressing proof steps. This not only addresses distribution shifts but also guides the search toward efficient trajectories. To enable rigorous evaluation, we construct a novel benchmark in Lean 4 focused on optimization. On this benchmark, OptProver achieves state-of-the-art Pass@1 and Pass@32 among comparably sized models while maintaining competitive performance on general theorem-proving tasks, demonstrating effective domain transfer without catastrophic forgetting.

Authors: Chenyi Li, Yanchen Nie, Zhengyu Ming, Gong Zhang, Kun Yuan
Categories: cs.LG, cs.AI, cs.LG
