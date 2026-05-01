---
title: >-
  An adaptive wavelet-based PINN for problems with localized high-magnitude
  source
url: 'https://arxiv.org/abs/2604.28180v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Himanshu Pandey
  - Ratikanta Behera
categories:
  - cs.LG
  - cs.LG
published: '2026-04-30T17:57:22Z'
fetched_at: '2026-05-01T02:24:44.537Z'
---
In recent years, physics-informed neural networks (PINNs) have gained significant attention for solving differential equations, although they suffer from two fundamental limitations, namely, spectral bias inherent in neural networks and loss imbalance arising from multiscale phenomena. This paper proposes an adaptive wavelet-based PINN (AW-PINN) to address the extreme loss imbalance characteristic of problems with localized high-magnitude source terms. Such problems frequently arise in various physical applications, such as thermal processing, electro-magnetics, impact mechanics, and fluid dynamics involving localized forcing. The proposed framework dynamically adjusts the wavelet basis function based on residual and supervised loss. This adaptive nature makes AW-PINN handle problems with high-scale features effectively without being memory-intensive. Additionally, AW-PINN does not rely on automatic differentiation to obtain derivatives involved in the loss function, which accelerates the training process. The method operates in two stages, an initial short pre-training phase with fixed bases to select physically relevant wavelet families, followed by an adaptive refinement that adapts scales and translations without populating high-resolution bases across entire domains. Theoretically, we show that under certain assumptions, AW-PINN admits a Gaussian process limit and derive its associated NTK structure. We evaluate AW-PINN on several challenging PDEs featuring localized hig

Authors: Himanshu Pandey, Ratikanta Behera
Categories: cs.LG, cs.LG
