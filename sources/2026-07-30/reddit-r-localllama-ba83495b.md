---
title: >-
  Quantizing Kimi K3 (2.8T A50B) to GGUF ourselves - Q3_K_S works, 1.1 TB on
  disk
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vaaqdl/quantizing_kimi_k3_28t_a50b_to_gguf_ourselves_q3/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T22:08:40.000Z'
fetched_at: '2026-07-30T11:01:46.423Z'
---
we're experimenting with our own dynamic GGUF quants of kimi k3, made from the original weights with our llama.cpp fork. Q3_K_S is done and works 1114.76 GiB on disk. Q1 and Q2 are in progress, results on those tomorrow
 rented box hardware:
 - AMD EPYC 9554P, 64 cores
 - 1.5 TB of DDR5
 - NVMe in raid0 to store the weights (inference runs fully from ram)
 - no GPU
 the run:
 - 110 threads
 - pp512: 4.21 t/s
 we ran a short test for text coherence and image understanding to make sure the quant isn't lobotomized. loaded the 1969 NYT "men walk on moon" front page and asked the model to describe what's going on. it listed the masthead, the "all the news that's fit to print" slogan, the date, the 10 cent price, the headline, the sub-headline about astronauts collecting rocks and the "voice from moon" column. we haven't noticed any hallucinated text
 wdyt about running quants of giant models like this on cpu instead of going with smth smaller but with normal tps and zero extra costs?
 disclaimer: we're the team behind atomic chat ( atomic.chat )
    submitted by    /u/Fun-Meaning-6474  
 [link]   [comments]
