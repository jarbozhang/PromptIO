---
title: >-
  Speculative cache warming: warms your cache while you type your prompt, save
  10-20s of wait time
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uskb1g/speculative_cache_warming_warms_your_cache_while/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T10:57:20.000Z'
fetched_at: '2026-07-10T23:01:38.133Z'
---
https://preview.redd.it/0g9l1pvqsdch1.png?width=603&format=png&auto=webp&s=33b554fa2e8344205dc586fb4080bb4e472c8abb
 Hello,
 I'm continuously working on OpenFox (MIT-licensed - no business model whatsoever), which is a harness dedicated to local AI, mostly for coding but well you know, this can do anything.
 I'm using it every day with my 2x Spark cluster, mostly with DS4 Flash these days.
 I noticed a small opportunity for improvement, nothing revolutionary but it kinda clicked at some point.
 When you create a new session and start typing your prompt, there is this time where your local rig does nothing.
 Then you send your prompt and the session starts, and your llm needs to process:
  
the system prompt (containing AGENTS.md, your preferences) ~ from 5K to 10K tokens depending on your project and setup
 the tools array ~ 1K tokens
 the prompt itself
  
I thought "why don't I use this time to pre-warm the context with the exact system prompt that will be used when I send my prompt?"
 That's what "speculative cache warming" is. System prompt + tools array is processed while you type, then when you send your prompt, only the prompt itself needs to be processed.
 At 500 tps of prompt processing, this saves easily 10s and makes the experience more interactive. Marginal improvement, but basically free. 
 ---
 As a side note, that's the kind of attention to details that comes with a "local LLM first" harness. I spend lots of time ensuring nothing breaks the cache for instance, with stable system prompt and tools, and opt-in only cache invalidation mechanism (if your AGENTS.md file is updated for instance, you can choose to update the system prompt with it).
    submitted by    /u/t4a8945  
 [link]   [comments]
