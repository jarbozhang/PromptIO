---
title: >-
  How Embeddings Shape Graph Neural Networks: Classical vs Quantum-Oriented Node
  Representations
url: 'https://arxiv.org/abs/2604.15273v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nouhaila Innan
  - Antonello Rosato
  - Alberto Marchisio
  - Muhammad Shafique
categories:
  - cs.LG
  - quant-ph
  - cs.LG
published: '2026-04-16T17:45:24Z'
fetched_at: '2026-04-18T02:24:59.958Z'
---
Node embeddings act as the information interface for graph neural networks, yet their empirical impact is often reported under mismatched backbones, splits, and training budgets. This paper provides a controlled benchmark of embedding choices for graph classification, comparing classical baselines with quantum-oriented node representations under a unified pipeline. We evaluate two classical baselines alongside quantum-oriented alternatives, including a circuit-defined variational embedding and quantum-inspired embeddings computed via graph operators and linear-algebraic constructions. All variants are trained and tested with the same backbone, stratified splits, identical optimization and early stopping, and consistent metrics. Experiments on five different TU datasets and on QM9 converted to classification via target binning show clear dataset dependence: quantum-oriented embeddings yield the most consistent gains on structure-driven benchmarks, while social graphs with limited node attributes remain well served by classical baselines. The study highlights practical trade-offs between inductive bias, trainability, and stability under a fixed training budget, and offers a reproducible reference point for selecting quantum-oriented embeddings in graph learning.

Authors: Nouhaila Innan, Antonello Rosato, Alberto Marchisio, Muhammad Shafique
Categories: cs.LG, quant-ph, cs.LG
