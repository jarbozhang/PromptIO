---
title: >-
  A 2.6B model with tool calling and 128K context now runs at 30 tok/s on a
  phone
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vfn9vc/a_26b_model_with_tool_calling_and_128k_context/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-04T21:15:16.000Z'
fetched_at: '2026-08-05T11:01:21.136Z'
---
Liquid AI released LFM2.5-2.6B today, and this might be more relevant to local AI than another massive model most people cannot run.
 The model is only 2.69B parameters, has 128K context, supports tool calling and was post-trained specifically for multi-step agent workflows. The official Q4_K_M GGUF is around 1.67 GB and already works with llama.cpp.
 Their reported CPU speeds:
 - 30 tok/s on a phone
 - 113 tok/s on a Ryzen AI Max+ 395
 - 220 tok/s on an M5 Max
 - Under 2.5 GB memory during their tests
 These are vendor benchmarks, so independent results are obviously needed.
 The benchmark results are surprisingly competitive for the size:
 - ToolSandbox: 77.83, compared with 76.44 for Qwen3.5-9B
 - IFBench: 59.17, compared with 56.47 for Qwen3.5-9B
 - BFCLv4: 56.88, still behind Qwen3.5-9B at 60.13
 - LiveCodeBench: 59.41, compared with 69.86 for Qwen3.5-9B
 So it does not magically replace larger models. Coding and knowledge-heavy work are still weaknesses, and Liquid’s own model card says it is not recommended for agentic coding.
 But I think this is where small local models actually make sense: not as your smartest assistant, but as cheap worker agents doing extraction, searches, file operations and repetitive tool calls locally. A larger model could handle planning only when the small one gets stuck.
 The 128K claim also needs real testing. Supporting 128K and running it comfortably on a phone are two very different things once KV cache and long agent histories are involved.
 Has anyone tested the Q4 GGUF on Android, an older laptop or a mini-PC yet? Would be useful to see hardware, context size, real tok/s and whether it can survive 10+ consecutive tool calls without derailing.
    submitted by    /u/BTA_Labs  
 [link]   [comments]
