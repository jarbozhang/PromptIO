---
title: >-
  Disentangling Continuous-Time Latent Dynamics: Identifiability of Latent SDEs
  via Diffusion Shifts
url: 'https://arxiv.org/abs/2606.28228v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuanyuan Wang
  - Wenjie Wang
  - Haoxuan Li
  - Mingming Gong
  - Kun Zhang
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-06-26T16:18:28Z'
fetched_at: '2026-06-29T23:02:47.158Z'
---
Causal representation learning for time series has developed strong identifiability results in discrete-time latent causal models, but identifiability in continuous-time latent stochastic differential equation (SDE) models remains largely open. We address this gap using environment-induced shifts in diffusion covariance. We study additive-noise latent SDEs observed through an unknown nonlinear diffeomorphism, with shared drift but environment-specific diffusion covariance. We show that two diagonal diffusion regimes with pairwise distinct coordinate-wise variance ratios identify the latent coordinates up to permutation and scaling, without any sparsity assumption on the drift. We first prove this result for linear Ornstein--Uhlenbeck systems and then extend it to general additive-noise latent SDEs. Under mild smoothness, the instantaneous drift-Jacobian causal graph is identifiable up to the same permutation. We propose a two-stage estimator for latent disentanglement and optional graph recovery; experiments on synthetic systems confirm the predicted identifiability boundary, and an application to Hardanger Bridge monitoring data illustrates the approach on real sensor trajectories.

Authors: Yuanyuan Wang, Wenjie Wang, Haoxuan Li, Mingming Gong, Kun Zhang
Categories: cs.LG, stat.ML, cs.LG
