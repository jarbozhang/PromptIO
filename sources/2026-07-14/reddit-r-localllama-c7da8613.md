---
title: >-
  Running Qwen3.5-122B on Mac Studio 96GB: Fixed 3 bugs that made long-context
  inference usable
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uuwrc0/running_qwen35122b_on_mac_studio_96gb_fixed_3/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T00:47:05.000Z'
fetched_at: '2026-07-13T23:01:48.264Z'
---
Hey everyone,
 I recently switched from DS4 Flash to Qwen3.5-122B on my M3 Ultra Mac Studio for long-context agentic coding. While the model fit better, I hit a wall where follow-up messages took 3-5 minutes to start generating (cold fills) despite having a "warm" context.
 Turns out the issue wasn't the model, but three specific bugs in my serving stack (qMLX fork of rapid-mlx):
  
Prompt Instability: A unique message ID in the system prompt broke byte-exact KV cache matching, forcing a full re-compute on every turn.
 Interrupt Path: Streaming replies weren't persisted when generation was interrupted, causing history divergence.
 Checkpoint Poison: A background writer created unmatchable checkpoints that crowded out valid ones, triggering aggressive eviction.
  
After fixing these, prefill time dropped from minutes to sub-seconds (e.g., 53k tokens cached, only 33 prefilled).
 I decided to fork rather than PR these changes because the hybrid attention optimizations are very specific to Qwen and likely unpalatable for a general upstream stack. Expect qMLX to continue diverging as we optimize specifically for this architecture.
 I've open-sourced the fork and a benchmark script (bench_qmlx.py) that separates prefill/decode metrics. Would love to hear if anyone else is seeing similar issues with hybrid attention caching or has ideas for further optimization.
  
Full breakdown: https://mrzk.io/posts/qmlx-maximising-ai-psychosis-minmaxing-mac-studio/
 GitHub (qMLX): https://github.com/marzukia/qMLX
  
EDIT: I should also be clear, the restore kills the cold-prefill cliff but doesn't make deep context turns free. Example below from one of my deep context sessions:
  
 Prompt tokens Restored from SSD Delta prefilled Time to first token 
  
 168,440 168,373 67 2.6s 
  167,859 167,727 132 2.6s 
  163,140 162,764 376 4.4s 
  168,332 167,912 420 4.8s 
  167,478 166,667 811 8.2s 
  164,400 163,206 1,194 11.6s 
  162,271 160,489 1,782 17.1s 
 
    submitted by    /u/marzukia  
 
