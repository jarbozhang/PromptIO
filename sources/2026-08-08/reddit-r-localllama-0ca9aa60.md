---
title: LFM2.5-2.6B model+KV cache quantization report
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vi0d4i/lfm2526b_modelkv_cache_quantization_report/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T13:15:48.000Z'
fetched_at: '2026-08-08T11:01:01.043Z'
---
LFM2.5-2.6B is a new tiny model by LiquidAI, with benchmarks that put it head to head with much larger models.
 I've run llama-perplexity on many model GGUF quants, crossed with many KV cache quants, to understand the model's best overall quantization for any given amount of memory.
 I also show how different quantization metrics show (or hide) model degradation.
 Full report and commentary
 Interactive HTML plots
 If you don't have time to read
 
  
The model fits on an 8GB Raspberry Pi with no material degradation and on a 4GB Raspberry Pi with contained degradation.
 DO NOT use Q4_K_M.
 On this model, model quant quality degrades faster than KV cache quant.
 Abliteration comes with a flat cost of ~0.075 KLD.
 Logarithmic KLD and Top-1% plots lie to you by telling you that quality degradation is smooth, while it's actually a cliff.
  
   submitted by    /u/crusaderky  
 [link]   [comments]
