---
title: The Seriality Gap in Video Diffusion Models
url: 'https://arxiv.org/abs/2607.13031v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jorge Diaz Chao
  - Konpat Preechakul
  - Yuxi Liu
  - Yutong Bai
categories:
  - cs.LG
  - cs.CV
  - cs.LG
published: '2026-07-14T17:59:22Z'
fetched_at: '2026-07-15T23:03:05.475Z'
---
When one ball strikes another, then another, video models should predict the consequences of each bounce. In controlled experiments on multi-ball hard-sphere dynamics, we find that the performance of standard bidirectional video diffusion degrades as the causal chain lengthens, even when provided more denoising steps. In a length-matched single-ball control, where ball-ball interactions are absent, the degradation largely disappears, isolating dependent-event structure rather than video length as the cause. Across intervention studies, methods that increase effective serial computation improve performance disproportionately, including autoregressive/blockwise generation and architectural depth. We identify this pattern as the seriality gap: a mismatch between tasks requiring growing serial computation and video diffusion models whose denoising loop does not provide scalable serial compute. We then prove that, for deterministic video prediction, denoising steps do not add serial computation beyond the backbone, indicating a structural obstacle for video diffusion on serial reasoning and simulation tasks.

Authors: Jorge Diaz Chao, Konpat Preechakul, Yuxi Liu, Yutong Bai
Categories: cs.LG, cs.CV, cs.LG
