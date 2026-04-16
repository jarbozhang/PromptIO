---
title: Qwen3.5-35B running well on RTX4060 Ti 16GB at 60 tok/s
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1smlvni/qwen3535b_running_well_on_rtx4060_ti_16gb_at_60/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T22:58:26.000Z'
fetched_at: '2026-04-16T06:06:04.167Z'
---
Spent a bunch of time tuning llama.cpp on a Windows 11 box (i7-13700F 64GB) with an RTX 4060 Ti 16GB, trying to get unsloth Qwen3.5-35B-A3B-UD-Q4_K_L running well at 64k context. I finally got it into a pretty solid place, so I wanted to share what is working for me.
 models.ini entry:
 [qwen3.5-35b-64k] model = Qwen3.5-35B-A3B-UD-Q4_K_L.gguf ctx-size = 65536 threads = 6 threads-batch = 8 n-cpu-moe = 11 batch-size = 1024 ubatch-size = 512 parallel = 2 kv-unified = true ;also from defaults ngl = 99 fa = on ctk = q8_0 ctv = q8_0 prio = 3 jinja = true mlock = true reasoning = off 
 Router start command
 llama-server.exe --models-preset models.ini --models-max 1 --host 0.0.0.0 --webui-mcp-proxy --port 8080 
 What I’m seeing now
 With that preset, I’m reliably getting roughly 40–60 tok/s on many tasks, even with Docker Desktop running in the background.
 A few examples from the logs:
  
~56.41 tok/s on a 1050-token generation
 ~46.84 tok/s on a 234-token continuation after a 1087-token prompt
 ~44.97 tok/s on a 259-token continuation after checkpoint restore
 ~41.21 tok/s on a 1676-token generation
 ~42.71 tok/s on a 1689-token generation in a much longer conversation
  
So not “benchmark fantasy numbers,” but real usable throughput at 64k on a 4060 Ti 16GB.
 Other observations
  
The startup logs can look “correct” and still produce bad throughput if the effective runtime shape isn’t what you think.
 Looking at: 
 n_parallel
 kv_unified
 n_ctx_seq
 n_ctx_slot
 n_batch
 n_ubatch was way more useful than just staring at the top-level command line.
 
 Keeping VRAM pressure under control mattered more than squeezing out the absolute highest one-off score.
  
I did not find a database of tuned configs for various cards, but might be something useful to have.
    submitted by    /u/Nutty_Praline404  
 [link]   [comments]
