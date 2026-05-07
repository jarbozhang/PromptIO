---
title: >-
  Most people seem obsessed with token generation speed, but isn’t prefill the
  real bottleneck? Am I missing something?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5o4kc/most_people_seem_obsessed_with_token_generation/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T20:02:22.000Z'
fetched_at: '2026-05-07T10:33:23.087Z'
---
I read this sub every day and I keep seeing benchmarks and discussions focused almost entirely on tokens/s generation speed. Prompt processing speed barely gets mentioned.
 From my own experience running a bunch of different models on different GPUs for all kinds of tasks, the prefill stage is usually the part that actually feels slow. Once generation starts, even “only” 15 t/s is perfectly usable for me. The wait for the model to eat the prompt is what eats most of the time.
 Seeing all the hype around MTP lately kind of reinforces that feeling. If generation speed improvements don’t really move the needle on total wall-clock time for typical use cases, why is everyone laser-focused on it?
 For example, with Qwen 27B Q6 I’m getting ~15 t/s generation with my current setup (which feels fine no matter what I’m doing) but only ~300 t/s on prefill. I spend way more time staring at the processing than I do waiting for the actual reply to finish. Even with prompt caching.
 Am I misunderstanding something about how most people use these models? Curious what others are seeing.
 Edit: I forgot to mention that I mostly do agentic work, where the model has to ingest part of the codebase before it can actually do anything useful. For normal chat this obviously isn’t an issue, context stays small and you just need enough t/s to keep up with your reading speed.
    submitted by    /u/wbulot  
 [link]   [comments]
