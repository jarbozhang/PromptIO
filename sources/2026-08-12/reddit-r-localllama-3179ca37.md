---
title: '[llama.cpp PR #26608] Ling-3.0 support (unmerged)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vlr0gd/llamacpp_pr_26608_ling30_support_unmerged/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T19:14:59.000Z'
fetched_at: '2026-08-12T11:01:19.739Z'
---
aetherbird has done some great work getting Ling-3.0 to work in llama.cpp. The architecture is generally identical to deepseekv2. 
 I recently added a microscopic 40 line PR to his that adds support for the Tiny model, works great. Using it for home assistant voice with decent results. It has a very solid tendency to admit when it doesnt understand or know something. Aetherbird merged this tiny PR last night.
 https://github.com/ggml-org/llama.cpp/pull/26608
 still unmerged to mainline, seems like we will have to fix the 2 CI issues at minimum. Likely also needs more legitimate testing data. I'm kinda locked up because I'm developing a rust inference engine for GFX 1201 for my dual R9700s so I cant spare my compute, so please include benchmarks if you can!
    submitted by    /u/Public_Umpire_1099  
 [link]   [comments]
