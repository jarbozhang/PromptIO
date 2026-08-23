---
title: llama.cpp b9966 for sm-tensor
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utyzbl/llamacpp_b9966_for_smtensor/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T23:28:40.000Z'
fetched_at: '2026-07-12T23:01:41.978Z'
---
B9966
 If you run -sm tensor in production you might want to grab this fix which removes 29 regex recompilations per tensor per token on the decode thread.
 Claude tell me in one sentence what this means:
  
The code was rebuilding 29 regex patterns from scratch on every tensor of every token instead of building them once and reusing them, so the fix just caches them — same behavior, way less wasted CPU on the decode thread
  
   submitted by    /u/Bulky-Priority6824  
 [link]   [comments]
