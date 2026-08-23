---
title: >-
  Serving a fleet of Qwen3.5 122b sessions on a single Mac Studio (96GB) without
  losing your sanity
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uzpk4g/serving_a_fleet_of_qwen35_122b_sessions_on_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-18T07:44:45.000Z'
fetched_at: '2026-07-18T23:01:00.746Z'
---
Hello all
 Just following up on a post I made last week about my experiment to try minmax my Mac Studio. In particular, I've had quite a lot of success with pushing things even further.
 Across a 20 minute test with three concurrent sessions, my Mac Studio was offered 789,351 prompt tokens and only recomputed 48,996 of them on the GPU. The other 93.8% came back off an on-disk KV cache. That is roughly a 16x cut in prefill compute, three chats running on about one GPU's worth of work.
 The main changes made:
  
Implemented proper partial storage of the Gated DeltaNet KV cache
 Implemented a less stupid eviction strategy 
  
My goal was to basically try achieve concurrency without parallelism given the memory constraints of the base Mac Studio model (96GB RAM). Since I've already made the insane decision to fork my own engine, I decided to see if I could optimise what I've already done to get me there. In otherwords, I've decided to go all in on cold caching.
 I am now dogfooding this setup with a frontier orchestrator and qMLX as my workers and I am pleasantly surprised how well it is working. 
 My write-up: https://mrzk.io/posts/qmlx-optimising-multiplexing-and-dogfood/
 The repo: https://github.com/marzukia/qMLX
 tl;dr: I have completely removed the hot cache path, and made qMLX a-restore-from-SSD inference engine that limits requests in a serial manner. qMLX can now achieve concurrency without parallelism, which finally lets me run sub-agents off a local model.
    submitted by    /u/marzukia  
 [link]   [comments]
