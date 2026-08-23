---
title: You really should not quantize KV Cache for DeepSeek V4 Flash
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vduxth/you_really_should_not_quantize_kv_cache_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T22:01:32.000Z'
fetched_at: '2026-08-03T11:01:09.274Z'
---
I don't think anyone should quantize the KV with DS4F. I checked the the quality impact (PPL, KLD, Same TopP) for swhitching from BF16 KV to Q8 KV, and it appears significant. Very much in contrast to Qwen 397B.
 Here are the results for DS4F:
 ====== Perplexity statistics ====== Mean PPL(Q) : 5.877076 ± 0.042497 Mean PPL(base) : 5.839660 ± 0.041730 Cor(ln(PPL(Q)), ln(PPL(base))): 95.74% Mean ln(PPL(Q)/PPL(base)) : 0.006387 ± 0.002100 Mean PPL(Q)/PPL(base) : 1.006407 ± 0.002114 Mean PPL(Q)-PPL(base) : 0.037416 ± 0.012318 ====== KL divergence statistics ====== Mean KLD: 0.145884 ± 0.001043 Maximum KLD: 12.467786 99.9% KLD: 4.535020 99.0% KLD: 1.857870 95.0% KLD: 0.652148 90.0% KLD: 0.349220 Median KLD: 0.032079 10.0% KLD: 0.000093 5.0% KLD: 0.000012 1.0% KLD: 0.000000 0.1% KLD: -0.000002 Minimum KLD: -0.000025 ====== Token probability statistics ====== Mean Δp: -0.007 ± 0.031 % Maximum Δp: 99.525% 99.9% Δp: 81.503% 99.0% Δp: 42.054% 95.0% Δp: 14.588% 90.0% Δp: 7.220% 75.0% Δp: 1.066% Median Δp: 0.000% 25.0% Δp: -1.061% 10.0% Δp: -7.112% 5.0% Δp: -14.515% 1.0% Δp: -42.297% 0.1% Δp: -84.157% Minimum Δp: -99.994% RMS Δp : 11.884 ± 0.069 % Same top p: 87.189 ± 0.088 % 
 As a comparison, here are the results for Qwen 397B:
 ====== Perplexity statistics ====== Mean PPL(Q) : 3.747980 ± 0.020507 Mean PPL(base) : 3.746773 ± 0.020461 Cor(ln(PPL(Q)), ln(PPL(base))): 99.89% Mean ln(PPL(Q)/PPL(base)) : 0.000322 ± 0.000260 Mean PPL(Q)/PPL(base) : 1.000322 ± 0.000260 Mean PPL(Q)-PPL(base) : 0.001207 ± 0.000975 ====== KL divergence statistics ====== Mean KLD: 0.003552 ± 0.000034 Maximum KLD: 2.220941 99.9% KLD: 0.131591 99.0% KLD: 0.043847 95.0% KLD: 0.014439 90.0% KLD: 0.007836 Median KLD: 0.000866 10.0% KLD: 0.000013 5.0% KLD: 0.000004 1.0% KLD: -0.000000 0.1% KLD: -0.000006 Minimum KLD: -0.000176 ====== Token probability statistics ====== Mean Δp: 0.019 ± 0.005 % Maximum Δp: 39.939% 99.9% Δp: 15.971% 99.0% Δp: 6.618% 95.0% Δp: 2.334% 90.0% Δp: 1.222% 75.0% Δp: 0.233% Median Δp: 0
