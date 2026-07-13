---
title: 20GB VRAM + 64GB DDR5 - Qwen3.6 35B A3B still the best choice?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uv7cf5/20gb_vram_64gb_ddr5_qwen36_35b_a3b_still_the_best/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T10:08:11.000Z'
fetched_at: '2026-07-13T23:01:48.266Z'
---
Hey everyone. Trying to figure out the best setup for my hardware. I've got a 64GB DDR5 RAM laptop and A 20GB 7900xt egpu. Usecase is only pi-coding-agent locally.
 So far, Qwen3.6 35B A3B has been the only model I've found that would work well with CPU offload (MoE) at higher quants - I've managed to fit Q8 at 100k context or ud-q6kl at full 262k context. It works okay, on the slower side but for me anything with 20+tks is very useable.
 However, I'm interested in what you guys are running on similar hardware configs. Any other MoE models you've found worthwhile to play around with? Or do you stick with lower quants but dense and all on VRAM? 
    submitted by    /u/kirisoraa  
 [link]   [comments]
