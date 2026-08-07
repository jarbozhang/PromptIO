---
title: >-
  KV cache quantization benchmarks: 413 pairs tested on Qwen 3.6 27B, Gemma 4
  31B. KLD with BeeLlama.cpp v0.4.0: KVarN 6-bit beats q8_0, precision tail 1024
  dominates
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vhaabz/kv_cache_quantization_benchmarks_413_pairs_tested/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T17:09:39.000Z'
fetched_at: '2026-08-07T11:00:46.506Z'
---
Link to the article: KV Cache Quantization Benchmarks: KVarN, Precision Tail
 KLD benchmarks with BeeLlama.cpp v0.4.0, fork of llama.cpp with more KV cache quantization options.
  
Models: Qwen 3.6 27B Q5_K_S 64k context, Gemma 4 31B Q5_K_S 16k context
 Standard quants, extended: q6_0 and q6_1, and low-bit types from q2_0 to q3_1
 KVarN: Variance-Normalized KV-Cache by Huawei, implemented in BeeLlama
 Precision Tail: keeping latest X tokens of KV cache in (B)F16, implemented in BeeLlama
 413 configurations in total: 238 with Qwen 3.6 27B, 175 with Gemma 4 31B
  
The Recommendation Ladder
 Full benchmark results, setup, method, analysis, explanations and everything else can be found in the article.
 1. Qwen
  
 Cache Tail KV cache (MiB) Median KLD 99.9% KLD What it is for 
  
 bf16 0 4096.00 0 0.00005 Reference 
  q8_0 1024 2272.00 0.000897 0.087699 Standard fidelity with a precision tail 
  kvarn8 1024 2256.00 0.000871 0.087639 Best measured quality below BF16 
  q8_0 0 2176.00 0.000909 0.093029 Standard fidelity 
  q8_0-q6_0 1024 2016.00 0.000894 0.091098 q8_0 quality within noise, 256.00 MiB less 
  kvarn6 1024 1744.00 0.000879 0.084629 The high-end value pick 
  kvarn6-kvarn5 1024 1616.00 0.000886 0.092778 Much cheaper, almost as good 
  kvarn5 1024 1488.00 0.000897 0.087666 Highest value in mid-range 
  q5_0-q4_1 1024 1440.00 0.000966 0.089128 Standard when VRAM-constrained 
  kvarn5-kvarn4 1024 1360.00 0.000936 0.089469 Balanced default 
  q4_0 1024 1248.00 0.001057 0.104486 Compact standard 
  kvarn4 1024 1232.00 0.000994 0.090391 Cleaner than q4_0 for less memory 
  kvarn4-kvarn3 1024 1104.00 0.001112 0.113968 Smallest recommended tier 
  kvarn3 1024 976.00 0.001316 0.139558 When the context must fit 
  kvarn3-kvarn2 1024 848.00 0.002424 0.23878 Emergency compression 
  kvarn2 1024 720.00 0.003811 0.450496 Last resort 
 
 2. Qwen Standard-Only
  
 Cache Tail KV cache (MiB) Median KLD 99.9% KLD What it is for 
  
 bf16 0 4096.00 0 0.00005 Reference 
  q8_0 0 2
