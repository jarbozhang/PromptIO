---
title: Devs - do you use Mistral Medium 3.5 (128b dense) and if so - thoughts?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1urzsnk/devs_do_you_use_mistral_medium_35_128b_dense_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T19:06:23.000Z'
fetched_at: '2026-07-09T23:01:04.808Z'
---
I've picked up a 3-bit quant of this one (Unsloth - Q3_KS) - the best fit for my config right now. Normally I shy away from 3-bit quants but as this is a giant dense model, I figured... why not.
 I've tested it a few hours in my latest project, and it found a few things that my daily driver had missed. It seems really good. Slower than an MoE, but not bad for me (8 tok/sec - with KV 80k - quant K = q8_0 quant v = q5_0).
 I was wondering what other people thought after actually using it with code.
    submitted by    /u/Jorlen  
 [link]   [comments]
