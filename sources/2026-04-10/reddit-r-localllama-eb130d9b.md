---
title: Gemma 4 on Llama.cpp should be stable now
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgl3qz/gemma_4_on_llamacpp_should_be_stable_now/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T09:48:52.000Z'
fetched_at: '2026-04-10T00:43:27.393Z'
---
With the merging of https://github.com/ggml-org/llama.cpp/pull/21534, all of the fixes to known Gemma 4 issues in Llama.cpp have been resolved. I've been running Gemma 4 31B on Q5 quants for some time now with no issues.
 Runtime hints:
  
remember to run with `--chat-template-file` with the interleaved template Aldehir has prepared (it's in the llama.cpp code under models/templates)
 I strongly encourage running with `--cache-ram 2048 -ctxcp 2` to avoid system RAM problems
 running KV cache with Q5 K and Q4 V has shown no large performance degradation, of course YMMV
  
Have fun :)
 (oh yeah, important remark - when I talk about llama.cpp here, I mean the *source code*, not the releases which lag behind - this refers to the code built from current master)
 Important note about building: DO NOT currently use CUDA 13.2 as it is CONFIRMED BROKEN (the NVidia people are on the case already) and will generate builds that will not work correctly.
    submitted by    /u/ilintar  
 [link]   [comments]
