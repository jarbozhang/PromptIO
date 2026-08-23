---
title: 'Gemma 4 QAT handles KV cache quantization MUCH better, KLD benchmarks show'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vmhc4h/gemma_4_qat_handles_kv_cache_quantization_much/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T15:28:03.000Z'
fetched_at: '2026-08-13T11:02:02.146Z'
---
Link to the article: KV Cache Quantization on Gemma 4 31B: Non-QAT vs QAT
 KLD benchmarks with BeeLlama.cpp v0.4.3, fork of llama.cpp with more KV cache quantization options, comparing Gemma Q4_0 non-QAT vs Gemma Q4_0 QAT. Long story short: QAT is much more friendly to KV cache quantization, moving same-top agreement from "different model" to "that looks like Gemma 4?"
 This confirms results from previous posts on this subreddit:
  
Gemma 4 QAT seems to respond significantly better to KV cache quantization
 Gemma 4 QAT 31B responds better to KV cache quantization too
  
Comparison of standard quants
 Full benchmark results, setup, method, analysis, explanations and everything else can be found in the article.
  
 Type Size (MiB) Mean KLD non-QAT Mean KLD QAT KLD ratio (non-QAT ÷ QAT) Same-top non-QAT Same-top QAT QAT gain 
  
 q8_0-q8_0 1997.50 0.305575 0.015078 20.3× 85.115% 94.870% +9.755 pp 
  q6_0-q6_0 1527.50 0.404391 0.022552 17.9× 82.415% 93.640% +11.225 pp 
  q5_0-q5_0 1292.50 0.561436 0.040937 13.7× 78.566% 91.134% +12.568 pp 
  q4_0-q4_0 1057.50 0.880436 0.090504 9.7× 71.630% 86.337% +14.707 pp 
  q3_0-q3_0 822.50 1.716668 0.286372 6.0× 57.927% 73.017% +15.090 pp 
  q2_0-q2_0 587.50 4.176003 1.058423 3.9× 26.593% 48.659% +22.066 pp 
 
    submitted by    /u/Anbeeld  
 [link]   [comments]
