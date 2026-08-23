---
title: >-
  Norm-preserving abliteration on Qwen3.6-35B-A3B: 0% refusal, benchmarks
  intact, open source dataset
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ujktg5/normpreserving_abliteration_on_qwen3635ba3b_0/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T09:54:54.000Z'
fetched_at: '2026-06-30T23:01:36.517Z'
---
Been reading the mechanistic interpretability literature on refusal for a while now. The core insight from Arditi et al. (2024) is clean: refusal is mediated by a geometrically consistent direction in the residual stream. You can find it via the difference of means between harmful and harmless activation caches, then project it out of the weight matrices.
 The problem with vanilla abliteration (as popularized by mlabonne) is benchmark degradation. When you project out a component from weight vectors, you shrink their norms. Applied across hundreds of matrices in a 35B-parameter MoE model, the residual stream magnitudes decay layer by layer. The model gets measurably dumber.
 grimjim's norm-preserving biprojection technique fixes this. After orthogonalizing each weight row against the refusal direction, you rescale it back to its original L2 norm. The resulting vector has zero component along r and the same magnitude as the original. Simple but it makes the difference between "works on paper" and "actually passes benchmarks."
 I applied this to Qwen3.6-35B-A3B (hybrid MoE with 256 experts + shared expert, mixed standard/linear attention). Two things that break naive scripts silently:
  
Hybrid attention: some layers use self_attn.o_proj, others use linear_attn.out_proj. Miss the linear attention layers and you get partial abliteration.
 
3D expert tensors: routed expert down projections are stored as (n_experts, d_hidden, d_model). Need an einsum ij,ejk->eik to apply the projection per-expert rather than treating it as a single 2D matrix.
 
 Also built an enriched harmful dataset (7356 prompts, 35 categories, 10 prompt styles) because diversity of framing matters more than raw count. If your harmful set is all "how to make a bomb" type prompts, you extract a direction that captures that phrasing pattern, not the actual refusal mechanism.
 Results: 0% refusal on held-out test set. Math and code benchmarks intact (the norm preservation is what keeps this working).
 Ope
