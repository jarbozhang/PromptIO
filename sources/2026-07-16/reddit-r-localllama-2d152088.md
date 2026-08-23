---
title: ExLlamaV3 v1.0.0 - Major Performance Upgrades
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uwylut/exllamav3_v100_major_performance_upgrades/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T07:17:43.000Z'
fetched_at: '2026-07-15T23:01:42.663Z'
---
After over a year in development, ExLlamaV3 has had its first production release.
 Turboderp has been pulling 10 hour days with Fable to bring us this massive batch of improvements. Check out detailed performance metrics and a little write-up from him here.
 Some of the biggest changes:
  
Removed flash-attention-2 and xformers dependencies
 Extended tensor-parallel support to most models, including Gemma4
 New attention kernel with online cache quantization, dual input for SWA layers and attention sinks; no more slowdown for KV quantization (can even speed up inference now)
 Graph path for all attn/GDN modules
 New conv1d kernel (removes support/need for causal_conv1d)
 Greatly improved GEMM/GEMV performance on Ampere
 New INT8 GEMV kernel
 New MoE kernel ticket scheduler
 Added GptOssForCausalLM
 Added NemotronHForCausalLM
 Many minor optimizations
 Many more bugfixes
 Many QoL improvements
 Faster extension build with more compilation units
  
Have questions, or just want to drop by, talk shop, and congratulate Turbo? Join us at the exllama discord.
    submitted by    /u/Unstable_Llama  
 [link]   [comments]
