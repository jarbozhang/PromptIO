---
title: >-
  VFA: Relieving Vector Operations in Flash Attention with Global Maximum
  Pre-computation
url: 'https://arxiv.org/abs/2604.12798v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yupeng Sun
  - Yanzhao Li
  - Zhiqiang Zou
  - Bai Du
  - Zhiyuan Zhang
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-14T14:28:50Z'
fetched_at: '2026-04-15T02:22:53.570Z'
---
FlashAttention-style online softmax enables exact attention computation with linear memory by streaming score tiles through on-chip memory and maintaining a running maximum and normalizer. However, as attention kernels approach peak tensor-core/cube-core throughput on modern accelerators, non-matmul components of online softmax -- especially per-tile rowmax and rowsum reductions and rescale chains -- can become vector or SIMD limited and dominate latency. This paper revisits FlashAttention and proposes Vector Relieved Flash Attention (VFA), a hardware-friendly method that reduces rowmax-driven updates of the running maximum while retaining the online-softmax structure. VFA initializes the running maximum via a cheap approximation from key-block representations, reorders key-block traversal to prioritize high-impact sink and local blocks, and freezes the maximum for remaining blocks to avoid repeated reductions and rescaling. We further integrate VFA with block-sparse skipping methods such as BLASST to form Vector Relieved Sparse Attention (VSA), which reduces both block count and per-block overhead. Notably, VFA and VSA completely avoid the conditional rescale operation in the update stage used in FA4.0. Extensive evaluations on benchmarks including MMLU and MATH500, together with attention statistics, verify our design: (i) sink and local reordering stabilizes the running maximum early; (ii) simple Q and K block summaries fail due to intra-block heterogeneity; (iii) m-initia

Authors: Yupeng Sun, Yanzhao Li, Zhiqiang Zou, Bai Du, Zhiyuan Zhang
Categories: cs.LG, cs.AI, cs.LG
