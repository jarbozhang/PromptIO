---
title: Are EPYC CCDs all you need + benchmarks
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utjleq/are_epyc_ccds_all_you_need_benchmarks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T13:03:56.000Z'
fetched_at: '2026-07-11T23:01:42.043Z'
---
Recently I've found a deal to buy 9374f for cheap to replace my bottle-necked 9135. 8 CCD looked delicious. But first benchmarks showed me no decoding advantage. Until I used 48 threads. Non 64 or 32, which gave even worse performance than 9135 in some scenarios.
 Still not sure it was worth it as 9374f is much worse for gaming.
 Benchmarks (ik_llama.cpp latest version) with 4800 DDR5 for Unsloth GLM-5.2-UD-IQ4_XS:
 * 9135
  
 PP TG N_KV T_PP s S_PP t/s T_TG s S_TG t/s 
  
 8192 128 0 31.835 257.33 14.753 8.68 
  8192 128 8192 35.541 230.49 15.205 8.42 
  8192 128 16384 39.352 208.17 15.339 8.34 
  8192 128 32768 47.421 172.75 15.777 8.11 
  8192 128 49152 55.571 147.41 16.062 7.97 
 
 * 9374f
  
 PP TG N_KV T_PP s S_PP t/s T_TG s S_TG t/s 
  
 8192 128 0 31.888 256.90 10.503 12.19 
  8192 128 8192 34.475 237.62 11.065 11.57 
  8192 128 16384 36.370 225.24 11.148 11.48 
  8192 128 32768 42.632 192.16 12.145 10.54 
  8192 128 49152 49.670 164.93 14.026 9.13 
 
    submitted by    /u/iVoider  
 [link]   [comments]
