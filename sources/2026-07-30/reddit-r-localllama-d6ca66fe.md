---
title: >-
  PSA: llama.cpp now loads MTP tensors by default for any draft-mtp arch, even
  with MTP disabled
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1va54em/psa_llamacpp_now_loads_mtp_tensors_by_default_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T18:45:34.000Z'
fetched_at: '2026-07-30T11:01:46.423Z'
---
If your GGUF has MTP/NextN tensors baked in (GLM-5.2, hy_v3, qwen35moe, step35, etc.), recent llama.cpp builds load them by default — even if you never pass --spec-type draft-mtp. Before, they were skipped unless you actually enabled speculative decoding.
 Most community GGUFs bundle the MTP block by default, so this means extra VRAM/RAM use (~1 extra MoE layer) on every load, whether you use MTP or not.
 See https://github.com/ggml-org/llama.cpp/pull/25980
    submitted by    /u/Shoddy_Bed3240  
 [link]   [comments]
