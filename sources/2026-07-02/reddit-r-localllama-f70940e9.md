---
title: >-
  DeepSeek-V4-Flash (MXFP4): compute buffer scales ~3x just from KV cache quant
  type (f16 vs q8_0) — anyone else seeing this? Llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uk5y5m/deepseekv4flash_mxfp4_compute_buffer_scales_3x/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T00:01:36.000Z'
fetched_at: '2026-07-01T23:02:00.949Z'
---
Bartowski's DeepSeek-V4-Flash-MXFP4 GGUF, llama.cpp build 9851 (0eca4d490), deepseek4 arch.
 Ran the same n_ctx = 10240, same n_ubatch = n_batch = 8192, flash attention on — only difference is -ctk/-ctv:
  
 Cache type Total KV cache (CUDA0) CUDA0 compute buffer 
  
 f16 (default, no -ctk/-ctv set) ~425 MiB 12,964 MiB 
  q8_0 (-ctk q8_0 -ctv q8_0) ~226 MiB 3,973 MiB 
 
 So switching the KV cache quant type only saves ~200MB of actual cache (expected — DSV4's compressed CSA/HCA/lightning-indexer caches are tiny either way), but it shaves ~9GB off the compute buffer — a 3.26x difference — with literally nothing else changed.
 This is what was actually causing my OOM at higher context (35.9GB compute buffer requested at ctx=32000 with f16 cache, on a 32GB card). Once I forced q8_0 cache, it loads fine.
 Does forcing -ctk q8_0 -ctv q8_0 cut your compute buffer by a similar ~3x?
    submitted by    /u/Shoddy_Bed3240  
 [link]   [comments]
