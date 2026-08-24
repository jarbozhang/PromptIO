---
title: ConvRot Quant method now in llama-cpp-turboquant
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vwoseh/convrot_quant_method_now_in_llamacppturboquant/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T01:16:57.000Z'
fetched_at: '2026-08-24T11:01:49.506Z'
---
It started here , and now https://github.com/TheTom/llama-cpp-turboquant/ has it.
 Imagine a Q6 quant with nearly Q8 KLD/PPL.
 Q6_CR and Q5_CR have a slight improvement over their base counterparts.
 Also while you are there check out --moe-cache auto to help improve running MoE models bigger than your VRAM.
 I am hoping that with this we may be able to recover some lost quality from turbo4/3/2 , but I haven't test that out yet.
 PR's has the breakdown of the tests, we did have some some decode and crashing issues but they are now resolved.
    submitted by    /u/giveen  
 [link]   [comments]
