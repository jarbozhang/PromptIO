---
title: >-
  Qwen3.6 27B on a 5090, 6.4k sample tok/s distribution after tuning MTP/cache
  settings
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unbi4a/qwen36_27b_on_a_5090_64k_sample_toks_distribution/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T15:11:17.000Z'
fetched_at: '2026-07-04T23:01:32.106Z'
---
Spent a while tuning llama.cpp for Qwen3.6 27B on a 9800X3D / 64GB / 5090 box and wanted to share the real distribution instead of just a headline number, since averages hide a lot.
 Ran with q8 KV cache, 192k context, MTP draft=10, spec-draft-p-min=0.5, batch/ubatch 512. Logged 6,454 samples across a mixed agentic coding + debugging + doc session over 20 hour ish. Peak bucket sits at 120-130 tok/s, mean 140.7, median 134.9, with a long tail up to 233.
 Worth noting the hybrid attention/SWA cache handling in llama.cpp still isn't perfect for this model if you see prompt reprocessing warnings in your logs that's why. Happy to share launch flags if anyone wants to compare setups.
    submitted by    /u/UsedMorning9886  
 [link]   [comments]
