---
title: Subspace Optimization for Backpropagation-Free Continual Test-Time Adaptation
url: 'https://arxiv.org/abs/2603.28678v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Damian Sójka
  - Sebastian Cygert
  - Marc Masana
categories:
  - cs.LG
  - cs.LG
published: '2026-03-30T16:58:13Z'
fetched_at: '2026-03-31T16:34:45.079Z'
---
We introduce PACE, a backpropagation-free continual test-time adaptation system that directly optimizes the affine parameters of normalization layers. Existing derivative-free approaches struggle to balance runtime efficiency with learning capacity, as they either restrict updates to input prompts or require continuous, resource-intensive adaptation regardless of domain stability. To address these limitations, PACE leverages the Covariance Matrix Adaptation Evolution Strategy with the Fastfood projection to optimize high-dimensional affine parameters within a low-dimensional subspace, leading to superior adaptive performance. Furthermore, we enhance the runtime efficiency by incorporating an adaptation stopping criterion and a domain-specialized vector bank to eliminate redundant computation. Our framework achieves state-of-the-art accuracy across multiple benchmarks under continual distribution shifts, reducing runtime by over 50% compared to existing backpropagation-free methods.

Authors: Damian Sójka, Sebastian Cygert, Marc Masana
Categories: cs.LG, cs.LG
