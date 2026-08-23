---
title: DFlash2 speeds Qwen 3.8 27B up to 4 times
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsuaoj/dflash2_speeds_qwen_38_27b_up_to_4_times/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T18:10:35.000Z'
fetched_at: '2026-08-20T11:01:24.240Z'
---
llama.cpp pr #27342 adds dflash2, so i rented an rtx 6000 and ran the same four prompts through four decoding setups on qwen3.8 27B
 median results over the four tasks:
  
baseline 47.4 tok/s
 mtp 114.7 tok/s
 dflash 99.3 tok/s
 dflash2 140.6. tok/s
  
so on average 3x for dflash2
 though i have to point out that it's far from a 3x gain some of the time, on one of the test it struggled to achieve a 1.5x gain, it really just depends on the task you give to the model
  
the races are sped up in some places, so that the video lasts roughly 30 seconds, but the tok/s and acceptance % on screen are the real
  
i'm from the atomic.chat team - we publish our own quants on hf and make a desktop and mobile app for running local models. so any feedback welcome - we're building this for you folks
 about dflash2: https://inco.ai/blog/dflash2/
    submitted by    /u/Top-Eye-8104  
 [link]   [comments]
