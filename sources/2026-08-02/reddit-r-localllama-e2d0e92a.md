---
title: DeepSeek-V4-Flash 284B on 5.3GB of memory
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vdbix4/deepseekv4flash_284b_on_53gb_of_memory/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T07:28:04.000Z'
fetched_at: '2026-08-02T11:00:59.747Z'
---
Following up on my Qwen 3.6 port, I wanted to keep adding models and ended up fixing a bunch of things along the way, so it's its own engine now: Mference.
 Same core idea from TurboFieldfare, MoE models activate a few B params per token, so keep the shared core and KV cache resident and stream the selected experts off SSD.
 What runs now:
  
Gemma 4 26B-A4B — ~2 GB, 31–35 tok/s on a 24 GB M5 Pro
 Qwen 3.6 35B-A3B — ~1.45 GB, 19–23 tok/s
 DeepSeek-V4-Flash 284B-A13B — new. ~6.8 GB peak memory, mostly ~5.3 GB in practice, up to 4.8 tok/s on the same 24 GB M5. 2-bit dynamic quant, ~91 GB on disk.
  
Also picked up a native Mac app with multi-turn chat, an OpenAI-compatible server, and local PDF/DOCX/PPTX/XLSX attachments along the way.
 From here I want to keep adding model families, cut the expert-read wait (decode is ~53% I/O right now, serialized with compute), and push context past 4K.
 Not very useful beyond a few turns but you can technically run a "usable" dsv4f on a 8gb Mac. It only gets better from here. 
    submitted by    /u/Blahblahblakha  
 [link]   [comments]
