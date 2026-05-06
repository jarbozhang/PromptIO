---
title: Conditional Diffusion Sampling
url: 'https://arxiv.org/abs/2605.04013v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Francisco M. Castro-Macías
  - Pablo Morales-Álvarez
  - Saifuddin Syed
  - Daniel Hernández-Lobato
  - Rafael Molina
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-05-05T17:36:29Z'
fetched_at: '2026-05-06T09:11:23.118Z'
---
Sampling from unnormalized multimodal distributions with limited density evaluations remains a fundamental challenge in machine learning and natural sciences. Successful approaches construct a bridge between a tractable reference and the target distribution. Parallel Tempering (PT) serves as the gold standard, while recent diffusion-based approaches offer a continuous alternative at the cost of neural training. In this work, we introduce Conditional Diffusion Sampling (CDS), a framework that combines these two paradigms. To this end, we derive Conditional Interpolants, a class of stochastic processes whose transport dynamics are governed by an exact, closed-form stochastic differential equation (SDE), requiring no neural approximation. Although these dynamics require sampling from a non-trivial initialization distribution, we show both theoretically and empirically that the cost of this initialization diminishes for sufficiently short diffusion times. CDS leverages this by a two-stage procedure: (1) PT is used to efficiently sample the initial distribution, and then (2) samples are transported via the transport SDE. This combination couples the robust global exploration of PT with efficient local transport. Experiments suggest that CDS has the potential to achieve a superior trade-off between sample quality and density evaluation cost compared to state-of-the-art samplers.

Authors: Francisco M. Castro-Macías, Pablo Morales-Álvarez, Saifuddin Syed, Daniel Hernández-Lobato, Rafael Molina
Categories: stat.ML, cs.LG, stat.ML
