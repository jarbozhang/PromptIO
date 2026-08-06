---
title: Inkling-Small 276B-A12B at ~2.9 tok/s on <10gb memory
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vgfuyg/inklingsmall_276ba12b_at_29_toks_on_10gb_memory/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-05T18:35:47.000Z'
fetched_at: '2026-08-06T11:01:32.493Z'
---
A follow up to the launch of Mference, it now supports and runs Inkling-Small 276B-A12B.
 Inkling-Small (Thinking Machines, Apache 2.0), from the pipenetwork/Inkling-Small-MLX-4bit conversion: 276B total, ~12B active, 3.4 GB resident set, ~148 GB on disk.
 Measured on my M5, 24GB:
  
 Prompt Type Prompt / gen Prefill (excl. load) Decode Peak footprint 
  
 short-explanation 59 / 416 8.4 s 2.86 tok/s 9.48 GB 
  medium-review 421 / 560 60.1 s 2.93 tok/s 9.59 GB 
  long-synthesis 2,785 / 294 535.9 s 2.56 tok/s 9.56 GB 
 
 The same three cases on a 256 GB M3 Ultra hit 5.31–6.92 tok/s.
 Issues: long prompt prefill is trash (2,785 tokens is almost 9mins to first token), and it's text-only for now.
 Four model families now: Gemma 4 26B-A4B (~2 GB), Qwen 3.6 35B-A3B (~1.45 GB), DeepSeek-V4-Flash 284B-A13B (~6.8 GB), Inkling-Small 276B-A12B (~9.5 GB).
 I also got access to a few M3 Ultras, so I'll be testing and optimizing for higher configs too. But the primary goal stays the same: large MoE models on consumer grade hardware.
 Repo: https://github.com/NeelM0906/Mference — Swift + Metal, not a wrapper around MLX or llama.cpp. Mac app, CLI, and an OpenAI compatible server. Contributions welcome.
    submitted by    /u/Blahblahblakha  
 [link]   [comments]
