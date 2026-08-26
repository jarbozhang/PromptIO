---
title: 'New: Llama.cpp adaptive speculation for faster inference'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vxxa9x/new_llamacpp_adaptive_speculation_for_faster/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-25T11:35:40.000Z'
fetched_at: '2026-08-26T11:01:34.336Z'
---
We have been working on some performance optimisations for Qwen3.8 and other models. 
 The main new feature that we introduced is adaptive speculation for Llama.cpp
 What is it?
 MTP and DFlash work well to speed up inference work, especially for dense models. However, different content types need different settings. Llama.cpp only supports a single value.
 This fork introduces adaptive speculation. You set the minimum and maximum and the engine will adjust the number of tokens that are suggested automatically. This leads to improvements in token generation by up to 50% over mainline, especially in Qwen3.8. On a Strix Halo this improved generation from 44t/s to 65t/s for structured content.
 Github: https://github.com/LaurentZuijdwijk/llama.cpp
 Release: https://github.com/LaurentZuijdwijk/llama.cpp/releases
 
    submitted by    /u/Dutchnamn  
 [link]   [comments]
