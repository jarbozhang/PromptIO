---
title: You can now convert EXL3 quants on Apple Silicon Mac
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ub0vqa/you_can_now_convert_exl3_quants_on_apple_silicon/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T16:29:46.000Z'
fetched_at: '2026-06-21T03:18:27.869Z'
---
Hi, I'm here with an update. But this time it's quite a bigger news on local llm. Normally accessing the high fidelity quant like EXL3 is CUDA gated, and imagine you need 96GB-128GB with RTX cards, they are very specialized and expensive. But now on a more general basis, MacOS and Apple Silicon you can find those with 64GB+ quite easily, they don't come cheap but they are available for normal people. You can now run, inference and even convert EXL3 models. I've done it with MiniCPM5 and Qwen3.6-27B. The mean KLD of MiniCPM5 is on par with model converted with RTX card, and Qwen3.6-27B is just a tiny bit behind. 
 If you don't know about EXL3, it's a wonderful work from turboderp and co. Best quant quality-to-weight on a consumer machine. It's approximately around half a bit per weight better than MLX quant in general.
 https://github.com/beamivalice/PonyExl3 Grab it - Apache 2.0
 Cheers,
 Beam
    submitted by    /u/Beamsters  
 [link]   [comments]
