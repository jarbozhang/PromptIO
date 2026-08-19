---
title: OpenCode overrides the samplers for Qwen models to the wrong values
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vroao0/opencode_overrides_the_samplers_for_qwen_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T12:51:35.000Z'
fetched_at: '2026-08-19T11:01:44.120Z'
---
This is invisible with llama.cpp or derivatives, but ninfer helpfully logs the sampler settings on each request and auto-configures the correct ones for the model. Basically, OpenCode will always send top-p=1.0 (which means there is no filtering of low-probability tokens except with top-k) instead of the correct 0.95 (thinking) or 0.80 (no-thinking).
 The commit that added this is supposedly for another fix and has no explanation for the change whatsoever: https://github.com/anomalyco/opencode/commit/0b132c032aae15a99907a5979f471c3b5bb2e3dc
 You can't easily fix this per/model provider as far as I can tell, though this works, but it will affect all models/providers.
  "agent": { "build": { "top_p": 0.95 } } 
    submitted by    /u/JadedSession  
 [link]   [comments]
