---
title: DeepSeek V4 Flash 0731 IQ2_M benchmark for Dual 3060 and 96GB RAM ≈ 3.5 tok/s.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vcrd6d/deepseek_v4_flash_0731_iq2_m_benchmark_for_dual/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-01T16:10:45.000Z'
fetched_at: '2026-08-02T11:00:59.748Z'
---
Thanks to the community help I finally launched this llm. LM Studio refused to load weight onto second GPU but Unsloth Studio did so everything was done in there. Not a proper benchmark (used PC in parallel as well) but it gives an idea of ​​the performance from dual 3060 with RAM offloading.
 DeepSeek V4 Flash 0731 IQ2_M from Unsloth
 CPU: Ryzen 7500F
 GPU 0 (PCIe 5.0x16 lane): RTX3060
 GPU 1 (PCIe 3.0x1 lane): RTX3060
 RAM: 96GB 5600
 Prompt: Write me a tetris game.
 Result (copy from the summary):
 Prompt eval: 2.96s
 Prompt speed: 3.0 tok/s
 Generation: 960.02s
 Speed: 4.5 tok/s (PowerShell shows 3.5 tok/s, don't know why it shows 4.5 tok/s, single GPU with RAM offload output was around 3 tok/s so I trust PowerShell metrics more)
 Tokens: 4,338
 First token: 2.96s
 Cache hits: 1
 Total: 963.32s
 Chunks: 4318
 Wattmeter is on the way but my estimate is around 130W total system power draw (with 2 monitors connected but they are not taken into account) Each GPU used 30-40W with 0.9V undervolt. Task took around 16 minutes to complete, consumed around 35 watts and cost 0.0059 euros.
 Update:
 OS Windows 11.
 Actually math is showing 4338/960.02=4.52 tok/s, don't know why PowerShell showed 3.5 most of the time. I ran one more request with web search and it gave 4.7 tok/s. Updated 3.5 -> 4.5 tok/s.
    submitted by    /u/esw123  
 [link]   [comments]
