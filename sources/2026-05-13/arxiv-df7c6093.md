---
title: 'Solve the Loop: Attractor Models for Language and Reasoning'
url: 'https://arxiv.org/abs/2605.12466v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jacob Fein-Ashley
  - Paria Rashidinejad
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.NE
  - cs.LG
published: '2026-05-12T17:51:26Z'
fetched_at: '2026-05-13T10:19:24.405Z'
---
Looped Transformers offer a promising alternative to purely feed-forward computation by iteratively refining latent representations, improving language modeling and reasoning. Yet recurrent architectures remain unstable to train, costly to optimize and deploy, and constrained to small, fixed recurrence depths. We introduce Attractor Models, in which a backbone module first proposes output embeddings, then an attractor module refines them by solving for the fixed point, with gradients obtained through implicit differentiation. Thus, training memory remains constant in effective depth, and iterations are chosen adaptively by convergence. Empirically, Attractor Models outperform existing models across two regimes, large-scale language-model pretraining and reasoning with tiny models. In language modeling, Attractor Models deliver a Pareto improvement over standard Transformers and stable looped models across sizes, improving perplexity by up to 46.6% and downstream accuracy by up to 19.7% while reducing training cost. Notably, a 770M Attractor Model outperforms a 1.3B Transformer trained on twice as many tokens. On challenging reasoning tasks, we show that our model with only 27M parameters and approximately 1000 examples achieves 91.4% accuracy on Sudoku-Extreme and 93.1% on Maze-Hard, scaling favorably where frontier models like Claude and GPT o3, fail completely, and specialized recursive reasoners collapse at larger sizes. Lastly, we show that Attractor Models exhibit a nove

Authors: Jacob Fein-Ashley, Paria Rashidinejad
Categories: cs.LG, cs.AI, cs.CL, cs.NE, cs.LG
