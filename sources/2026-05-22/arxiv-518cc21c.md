---
title: Variance Reduction for Expectations with Diffusion Teachers
url: 'https://arxiv.org/abs/2605.21489v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jesse Bettencourt
  - Xindi Wu
  - Matan Atzmon
  - James Lucas
  - Jonathan Lorraine
categories:
  - cs.LG
  - cs.AI
  - cs.CV
  - stat.CO
  - stat.ML
  - cs.LG
published: '2026-05-20T17:59:52Z'
fetched_at: '2026-05-22T00:18:38.666Z'
---
Pretrained diffusion models serve as frozen teachers feeding downstream pipelines such as text-to-3D, single-step distillation, and data attribution. The teacher gradients these pipelines consume are Monte Carlo (MC) expectations over noise levels and Gaussian noise samples; their estimator variance dominates compute cost because each draw requires expensive upstream work (rendering, simulation, encoding). We introduce CARV, a compute-aware variance-accounting framework that motivates a hierarchical MC estimator: amortize the expensive upstream computation over cheap diffusion-noise resamples, sharpened by timestep importance sampling and a stratified-inverse-CDF construction. In our text-to-3D distillation and attribution experiments, CARV delivers 2-3x effective compute multipliers (most from amortized reuse; ~25% additional from IS+stratification) without changing the objective; in single-step distillation, the same techniques cut gradient variance by an order of magnitude but do not improve downstream FID, marking the regime where MC variance is no longer the bottleneck.

Authors: Jesse Bettencourt, Xindi Wu, Matan Atzmon, James Lucas, Jonathan Lorraine
Categories: cs.LG, cs.AI, cs.CV, stat.CO, stat.ML, cs.LG
