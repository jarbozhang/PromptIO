---
title: '16 GB VRAM users, what model do we like best now?'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgvt01/16_gb_vram_users_what_model_do_we_like_best_now/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T17:12:53.000Z'
fetched_at: '2026-04-10T00:43:27.394Z'
---
I'm finding Qwen 3.5 27b at IQ3 quants to be quite nice, I can usually fit around 32k (this is usually enough context for me since I dont use my local models for anything like coding) without issues and get around 40+ t/s on my RTX 4080 using ik_llama.cpp compiled for CUDA. I'm wondering if we could maybe get away with iq4 quants for the gemma 26b moe using turboquant for kv cache.. 
 Being on 16gb kind of feels like edging, cause the quality drop off between iq4 and q4 feel pretty noticable to me.. but you also give-up a ton of speed as soon as you need to start offloading layers.
    submitted by    /u/lemon07r  
 [link]   [comments]
