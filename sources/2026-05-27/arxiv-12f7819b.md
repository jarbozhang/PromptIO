---
title: >-
  OrpQuant: Geometric Orthogonal Residual Projection for Multiplier-Free
  Power-of-Two Transformer Quantization
url: 'https://arxiv.org/abs/2605.26092v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Maoyang Xiang
  - Bo Wang
  - Tao Luo
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-25T17:52:46Z'
fetched_at: '2026-05-27T01:19:09.167Z'
---
The deployment of Large Language Models (LLMs) and Vision Transformers (ViTs) on edge devices is significantly constrained by memory limitations and the critical timing bottlenecks introduced by dense Multiply-Accumulate (MAC) arrays. In the ultra-low bit regime, logarithmic Power-of-Two (PoT) quantization provides a hardware-efficient alternative by replacing MAC operations with bit-shifts. However, the non-uniform exponential lattice is inherently limited by a \textbf{Low Angular Resolution Regime}, a structural flaw that becomes particularly pronounced at sub-4-bit thresholds, leading to a notable degradation of high-dimensional feature manifolds. To address this geometric limitation, we propose Orthogonal Residual Projection (ORP), an algorithm-hardware co-design framework. By formulating quantization as a dual-basis geometric projection, ORP adaptively synthesizes a higher-resolution residual lattice using strictly shift-and-add operations. Furthermore, ORP's analytical solver offers a practical alternative to computationally intensive gradient-based optimization, reducing the full-model calibration time for LLaMA-2-7B to approximately \textbf{15 minutes}. Extensive evaluations demonstrate ORP's applicability across modalities and its hardware efficiency. Under the 3-bit (W3/A16) constraint, ORP achieves a perplexity of 6.10 on LLaMA-2-7B, comparing favorably to conventional MAC-intensive baselines like AWQ without relying on asymmetric scaling, while maintaining competi

Authors: Maoyang Xiang, Bo Wang, Tao Luo
Categories: cs.LG, cs.AI, cs.LG
