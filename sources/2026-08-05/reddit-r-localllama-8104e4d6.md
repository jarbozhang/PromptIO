---
title: >-
  A llama.cpp PR caches “hot” MoE experts on the GPU — 33 → 56 tok/s reported
  with 8GB VRAM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vfhns3/a_llamacpp_pr_caches_hot_moe_experts_on_the_gpu/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-04T17:52:04.000Z'
fetched_at: '2026-08-05T11:01:21.135Z'
---
A new llama.cpp PR (#26563) adds a heatmap that tracks which MoE experts are used most often.
 Instead of keeping every expert on the GPU or offloading all of them, it caches the frequently selected experts in VRAM while the cold experts continue running on the CPU.
 The author’s results on Qwen3.6-35B-A3B with 8GB VRAM:
 Q2_M: 33.25 → 56.0 tok/s (1.68x)
 Q5_K_P: 17.34 → 35.93 tok/s (2.07x)
 Autofit enabled with --expert-hot-s -1
 The negative results are probably more interesting: Qwen3.5-122B-A10B and Laguna-S-2.1 were actually slower with caching enabled.
 So this clearly isn’t a universal “make MoE faster” switch. My guess is that it only helps when expert reuse is high enough to outweigh the extra tracking and cache-management overhead.
 Current limitations:
 CUDA only
 Only active during single-token decoding
 Output can vary slightly depending on which experts are cached
 Still an open PR and not merged into llama.cpp
 This seems like a useful direction for running larger MoE models on consumer GPUs without destroying them with extremely low quants.
 Has anyone tested the branch on a 3060, 4060 or another 8–12GB card? I’d especially like to see hit rate and tok/s compared across coding, normal chat and long-context workloads.
 Source: llama.cpp PR #26563
    submitted by    /u/BTA_Labs  
 [link]   [comments]
