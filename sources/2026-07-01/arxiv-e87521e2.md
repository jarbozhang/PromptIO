---
title: >-
  C$^{2}$R: Cross-sample Consistency Regularization Mitigates Feature Splitting
  and Absorption in Sparse Autoencoders
url: 'https://arxiv.org/abs/2606.30609v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Haoran Jin
  - Xiting Wang
  - Shijie Ren
  - Hong Xie
  - Defu Lian
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-29T17:45:31Z'
fetched_at: '2026-06-30T23:02:51.939Z'
---
Sparse Autoencoders (SAEs) are widely used to interpret large language models by decomposing activations into sparse, human-understandable features, but scaling to large dictionaries exposes fundamental challenges. Systematic studies reveal pervasive feature splitting that fragments coherent concepts into non-atomic latents and widespread feature absorption that creates arbitrary exceptions in general features, severely compromising latent reliability. These issues stem from inconsistent latent assignment across samples: without cross-sample constraints, per-sample optimization often allows a single underlying concept to be inconsistently distributed across multiple redundant or interfering latents. To address this, we introduce C$^2$R (\underline{\textbf{C}}ross-sample \underline{\textbf{C}}onsistency \underline{\textbf{R}}egularization). C$^2$R explicitly encourages that each semantic feature is consistently represented by a unified latent across the batch by penalizing the co-activation of directionally similar latents. Comprehensive evaluation demonstrates that C$^2$R effectively mitigates both splitting and absorption while, crucially, preserving reconstruction fidelity, providing a principled solution that enhances latent interpretability without degrading model performance. Source code is available at https://github.com/hr-jin/Cross-sample-Consistency-Regularization.

Authors: Haoran Jin, Xiting Wang, Shijie Ren, Hong Xie, Defu Lian
Categories: cs.LG, cs.AI, cs.LG
