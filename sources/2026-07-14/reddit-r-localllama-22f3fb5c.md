---
title: llama.cpp Agentic Workflows Ctx Checkpoints Fix
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uuue5p/llamacpp_agentic_workflows_ctx_checkpoints_fix/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T23:03:21.000Z'
fetched_at: '2026-07-13T23:01:48.265Z'
---
b9978
 Claude in one sentence what does this fix 
  
llama.cpp b9978 fixes a checkpoint bug that hit agentic workloads hardest: every agent turn created a new checkpoint (bypassing min-step spacing), collapsing the coverage window so that context rewinds — common in tool-calling loops — erased all checkpoints and forced a full reprocess; now closely-spaced checkpoints from prior tasks are evicted, keeping the window wide and long agent sessions fast.
  
   submitted by    /u/Bulky-Priority6824  
 [link]   [comments]
