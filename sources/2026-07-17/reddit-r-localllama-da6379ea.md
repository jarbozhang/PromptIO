---
title: >-
  PSA: Nvidia's CMP 170HX Full Compute and Memory(80GB) may be unlockable via
  exploit
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uxqccx/psa_nvidias_cmp_170hx_full_compute_and_memory80gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-16T02:40:10.000Z'
fetched_at: '2026-07-16T23:01:10.318Z'
---
If you don't know, the CMP 170HX is essentially a A100 that has had it's compute and memory crippled so it can only mine crypto. It was a product of the crypto craze, and was released shortly before the crypto crash.
 Well, I was scrolling around and found out, apparently, it can be reverted back to an A100 using an exploit in Nvidia's Falcon security processor.
 https://www.researchgate.net/publication/408132536_A_Canary_in_the_Crypto_Mine_Defeating_Stack_Protection_in_a_GPU_Secure_Coprocessor
 https://preview.redd.it/6lbe88w9fidh1.png?width=1249&format=png&auto=webp&s=32a738b4bb742f803388447a26214c43448d3154
 The details are in this paper published last month. 
 There was a PoC repo that verified the compute unlock(https://github.com/arabel1a/cmpunlocker), but it seems to be down now. The memory unlock has yet to be replicated.
 For reference, the A100 goes for over $5000, while a 170HX went for under $200(before all the sellers found out about the news).
 TL:DR: We may be able to buy essentially a A100 80GB for under $1000 soon, if this is legit.
    submitted by    /u/invisibleman42  
 [link]   [comments]
