---
title: Running Qwen3 30B A3B at 50 tok/s on RTX 5060 Ti
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utefpr/running_qwen3_30b_a3b_at_50_toks_on_rtx_5060_ti/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T08:29:07.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
Experimented with some custom CUDA and C++ code that can now run a Qwen3-30B-A3B at 50-54 tok/s at float 8 on an RTX 5060 Ti with only 16 GB of VRAM. This speed is roughly 50% improvement to llama.cpp which runs at around 33-34 tok/s (with n-cpu-moe). These speedups come mostly from combining SOTA solutions I saw in papers in NeurIPS, ICML, and EuroSys
 Engines like these allow for new local inference oppurtunities on consumer hardware, offering more private, cheaper, and greener alternative to centralized datacenters!
 REPO: https://github.com/NikolayBlagoev/garlic-inference
    submitted by    /u/Azazelionide  
 [link]   [comments]
