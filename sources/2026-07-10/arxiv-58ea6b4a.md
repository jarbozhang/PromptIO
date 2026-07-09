---
title: 'PeTeR: Post-Training Robustification of Probabilistic Circuits'
url: 'https://arxiv.org/abs/2607.07671v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Adrian Ciotinga
  - Yeming Dai
  - YooJung Choi
categories:
  - cs.LG
  - cs.LG
published: '2026-07-08T17:25:20Z'
fetched_at: '2026-07-09T23:02:05.098Z'
---
Probabilistic circuits (PCs) can model complex joint distributions while supporting exact and efficient computation of many inference queries. However, standard likelihood-based PC learning is vulnerable to overfitting and fragile generalization when confronted with data noise, small sample sizes, or distribution shifts. This can be mitigated using distributionally-robust optimization which consider worst-case distributions within a Wasserstein ball of the empirical distribution, but current methods are limited to training a model from scratch in this framework. Instead, we propose PeTeR: a novel, data-free post-training framework designed to robustify pre-trained PCs against distribution shifts without retraining from scratch. Empirical evaluations across multiple density estimation benchmarks demonstrate that PeTeR effectively robustifies baseline models against both random and adversarial perturbations, achieving competitive or superior performance to data-dependent robust learning baselines.

Authors: Adrian Ciotinga, Yeming Dai, YooJung Choi
Categories: cs.LG, cs.LG
