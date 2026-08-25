---
title: What's the best local model you've found for 8 GB of VRAM?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vx4k9g/whats_the_best_local_model_youve_found_for_8_gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T14:34:40.000Z'
fetched_at: '2026-08-25T11:00:49.198Z'
---
I'm curious what other people are using for local LLM coding / agentic coding with only 8 GB of VRAM.
 My current setup is:
  
Intel Core i7-11800H
 RTX 3070 Laptop, 8 GB VRAM
 32 GB DDR4 RAM
 openSUSE Tumbleweed / KDE
 Unsloth Studio
 pi.dev as the coding agent
  
After testing quite a few different models and quantizations, I've currently settled on:
 Qwen3.6-35B-A3B-UD-IQ4_NL by Unsloth
 For agentic coding tasks, I'm getting roughly 25 generated tokens/s on average, and more importantly, I'm getting surprisingly good final results. The model is generally capable of navigating a codebase, using tools, making changes, and completing reasonably complex tasks without requiring constant intervention.
 For me, the important metric isn't simply maximum tokens/sec. I'm looking for the best combination of:
 speed + coding ability + tool use + reliability + quality of the final result.
 I've tried several other models before settling on Qwen3.6, but so far this has given me the best overall time/performance/result trade-off on my particular hardware.
 That said, I obviously haven't tested everything available.
 So I'm curious:
 If you have an 8 GB VRAM GPU, what local model are you currently using for coding or agentic coding?
 And especially: what are your actual tokens/s and how good are the results?
 I'm less interested in benchmark scores and more interested in real-world experience: “I gave it this kind of coding task and it actually managed to finish it.”
 I'd love to hear what I'm missing before I decide that I've found my personal sweet spot. 🙂
    submitted by    /u/Elemental_Particle  
 [link]   [comments]
