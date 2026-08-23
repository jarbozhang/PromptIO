---
title: This is amazing. Token speed doubled + kv cache now need low vram - qwen 27b
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u6bca1/this_is_amazing_token_speed_doubled_kv_cache_now/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-15T09:11:10.000Z'
fetched_at: '2026-06-16T06:31:40.319Z'
---
Edited : "Qwen3.6-27B Q4_K_M on a single RTX 3090: native 256K context at 38.6 tok/s with 72 MiB of resident KV, needle recall 88-100% at 6% residency, harness accuracy unchanged (36/36 vs full cache)."
 On the same hardware, generation speeds doubled and VRAM usage dropped significantly (21GB to 17.5GB) while maintaining full context accuracy
 Yt video of fahd --> https://youtu.be/8rTVCRWvRDo?si=MYiVrQQltbSsMAOP
 Link to git hub - https://github.com/Luce-Org/lucebox-hub/tree/main/optimizations/kvflash
 Quality loss?? --> "Quality verdict (harness ground truth, base-vs-base control included): full results in RESULTS.md. Outputs are not guaranteed byte-identical to the full cache on long generations (the masked kernel path rounds differently — a different deterministic lineage), but correctness is identical: 36/36 vs 36/36 across HumanEval, GSM, MATH, and agent suites."
    submitted by    /u/9r4n4y  
 [link]   [comments]
