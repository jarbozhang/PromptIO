---
title: >-
  GLM-5.2 on 8xB200: the deployment math nobody spells out - NVFP4 + 2x TP=4
  replicas should beat TP=8 by ~2x. Full config guidance inside.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uq4oeg/glm52_on_8xb200_the_deployment_math_nobody_spells/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T19:06:12.000Z'
fetched_at: '2026-07-07T23:01:24.261Z'
---
We have 8xB200 nodes and users keep asking us how to serve GLM-5.2 on them. Our engineering team went through everything published so far, and the optimal config is not the obvious one. Sharing the analysis because most of it applies wherever you rent or rack your B200s.
 The model
 GLM-5.2: ~750B total / ~40B active MoE (256 experts, top-8 routing, ~5.9% sparsity), DSA + MLA attention, 1M context, MIT license. Weights: ~744 GB in FP8, ~459 GB in NVFP4 (KV cache stays FP8).
 The hardware math
 8x B200 SXM = 1,440 GB HBM3e aggregate, 8 TB/s per GPU, NVLink 5 (900 GB/s/GPU).
 The non-obvious part: MoE decode at moderate concurrency streams ~40B active params + KV cache from HBM every step - it's bandwidth-bound, not compute-bound. That's why B200 over H200 at the same FP8 precision is only ~1.2x perf/$ (tracks the HBM bandwidth ratio, not the 2.3x FLOPs ratio). The lever that actually moves the number is NVFP4: half the weight bytes to read per step, and Hopper has no FP4 tensor cores at all.
 The published numbers (InferenceX / SemiAnalysis - SGLang v0.5.12 + EAGLE MTP, ISL 8192 / OSL 1024)
 These are GLM-5 runs - same architecture family. For 5.2 on Blackwell, what's public so far is provider-level speed, but we haven't found full concurrency-sweep tables (tok/s/GPU vs conc vs TPOT) on a documented 8xB200 config - happy to be corrected. At 8K context we expect 5.2 to land close to GLM-5, since its IndexShare change mainly pays off at long context.
 FP8, TP=8 (whole node, one engine):
  
 Conc tok/s/GPU tok/s/user TPOT (ms) 
  
 4 417 100.9 9.9 
  16 953 56.9 17.6 
  64 1,619 23.6 42.5 
  256 1,947 11.9 84.2 
 
 NVFP4, TP=4 (half the node):
  
 Conc tok/s/GPU tok/s/user TPOT (ms) 
  
 4 1,039 121.2 8.3 
  16 2,228 66.3 15.1 
  64 3,740 26.8 37.3 
  128 4,116 17.6 56.7 
 
 Source: https://inferencex.semianalysis.com/blog/b200-glm5-nvfp4-vs-h200-fp8-3-6x-perf-per-dollar
 What falls out of the math
  
NVFP4 fits in 4 GPUs - 459 GB weights in 720 GB HBM leaves ~230 GB fo
