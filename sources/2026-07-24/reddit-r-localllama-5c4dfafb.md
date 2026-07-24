---
title: Apple M5 isn't making full use of its matmul cores yet
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4iw0n/apple_m5_isnt_making_full_use_of_its_matmul_cores/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T16:28:39.000Z'
fetched_at: '2026-07-24T11:01:34.763Z'
---
At the moment MLX (and Llama.cpp for Macs) run 16bit activations everywhere. Despite this, the M5 generation silicon actually does support INT8 activations - it actually allows w4a8 d_type. It's just that no inference backends are using them yet
 I built some w8a8 kernels and have managed to get 1.4x speed up on Gemma4 prefill tasks; on my M5 MacBook Air it brings baseline prefill for the E2B from 2193 tps stock to 3,029 tps for 130,173 tokens of input*
 *Even faster at small context lengths; it approaches nearly 10k tps
    submitted by    /u/maddie-lovelace  
 [link]   [comments]
