---
title: >-
  Variance Is Not Importance: Structural Analysis of Transformer Compressibility
  Across Model Scales
url: 'https://arxiv.org/abs/2604.20682v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Samuel Salfati
categories:
  - cs.LG
  - cs.LG
published: '2026-04-22T15:31:46Z'
fetched_at: '2026-04-23T02:22:06.469Z'
---
We present a systematic empirical study of transformer compression through over 40 experiments on GPT-2 (124M parameters) and Mistral 7B (7.24B parameters). Our analysis covers spectral compression, block-level function replacement, rotation-based quantization, activation geometry, and adaptive early exit. We identify five structural properties relevant to compression. (1) Variance is not importance: high-variance activation directions are approximately 96 percent uncorrelated with predictive directions (measured via CCA), and projecting onto these subspaces preserves over 90 percent of variance while degrading perplexity. (2) Block linearity is conditional: transformer blocks are approximately linear (R^2 ~ 0.95 on GPT-2, 0.93 on Mistral block 31) only under the correct upstream distribution; modifying earlier blocks induces distribution shift that degrades downstream approximations. (3) The reconstruction wall: approaches that factor weights into quantized components amplify errors through cross-terms, making direct quantization strictly superior. (4) Linearity increases with depth: Mistral 7B exhibits a progression from R^2 = 0.17 (block 0) to R^2 = 0.93 (block 31), indicating a division between nonlinear feature construction and linear refinement. (5) Approximately 30 percent of tokens are computationally easy, confirmed via exit heads and KL divergence sensitivity. We demonstrate that single-block linear replacement achieves 34x compression with a 1.71 perplexity increas

Authors: Samuel Salfati
Categories: cs.LG, cs.LG
