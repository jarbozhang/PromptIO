---
title: >-
  Ultrafast Qwen3-TTS at 34 ms Time-to-First-Audio, Handling 10 Requests Per
  Second [OSS]
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vukf57/ultrafast_qwen3tts_at_34_ms_timetofirstaudio/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T16:01:06.000Z'
fetched_at: '2026-08-22T11:01:33.613Z'
---
Hey locallama! We recently open sourced a Qwen3-TTS 1.7B implementation that achieves 10 requests per second (RPS) and sub-50 ms p95 time-to-first-audio (TTFA) while maintaining real-time playback on 1 x H100. This extends to 20 RPS at sub-100 ms p95 TTFA. 
 By adjusting settings, you can get a 4090 to perform at ~50 ms p95 TTFA as well. We were frustrated with locally runnable models having slow response speeds - even slower than some cloud ones (which include network times). We achieve a big speedup compared to popular engines such as vLLM-Omni and SGLang-Omni. 
 We open source the implementation and benchmark. Our methodology is explained in our blog! Hope you enjoy and would love to get feedback :)
    submitted by    /u/Forsaken_Goal3692  
 [link]   [comments]
