---
title: >-
  82 TPS On Qwen 3.6 27b On A Macbook Pro | Introducing MTPLX V2: The Fastest
  Way To Run MLX Models.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ure84m/82_tps_on_qwen_36_27b_on_a_macbook_pro/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T03:08:56.000Z'
fetched_at: '2026-07-09T23:01:04.803Z'
---
Hey Everyone,
 here is an update on MTPLX!
 One month after releasing MTPLX V1 which brought a swift based app and upgraded CLI for coding use I am happy to announce MTPLX V2.
 The biggest change is Turbo Mode: using custom verify-specialized quantized-matmul kernels plus a compiled verify step we have achieved 82 TPS on a Macbook pro m5 max at a temperature of 0.6
 We also released significant changes to SSD KV cache and long context tool calling improvements. 
 here are the preliminary benchmarks from Ivan Fioravanti showing MTPLX vs oMLX vs DGX spark. 
 Looking forward to hearing everyone’s thoughts on the fastest MLX runtime. 
    submitted by    /u/YoussofAl  
 [link]   [comments]
