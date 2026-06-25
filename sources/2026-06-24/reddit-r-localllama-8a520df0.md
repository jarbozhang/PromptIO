---
title: >-
  I mapped the KLD of KV cache quantization for Qwen3.6-35B-A3B and Gemma4-E2B
  QAT
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1udjvhd/i_mapped_the_kld_of_kv_cache_quantization_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T15:12:16.000Z'
fetched_at: '2026-06-24T01:27:25.847Z'
---
TL;DR version
  
q8/q8 is nearly free on both models
 q4/q4 is useable on Qwen and catastrophic on Gemma
 turbo4 is sometimes slightly better, sometimes slightly worse, than q4_0
 turbo3 and turbo2 allow compressing the cache to unprecedented levels - but you'll pay dearly for it
 K is sometimes more sensitive than V, sometimes less, sometimes they're symmetrical
  
Full analysis
 Nuance, caveats, zoomable plots, and the software to replicate these plots with any model:
 https://github.com/crusaderky/pixi-llm-recipes/tree/main/perplexity#readme
    submitted by    /u/crusaderky  
 [link]   [comments]
