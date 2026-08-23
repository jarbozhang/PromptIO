---
title: >-
  I tested freshly merged DFlash in llama.cpp on Qwen 3.6 27B Local AI win.
  4.44x faster at 36K context. Here are my findings RTX 6000 PRO.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uq0h4o/i_tested_freshly_merged_dflash_in_llamacpp_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T16:40:32.000Z'
fetched_at: '2026-07-07T23:01:24.263Z'
---
Hey guys,
 A month ago I posted my MTP benchmarks here (3.34x on Gemma 4). DFlash support just merged into llama.cpp (PR #22105), so I ran it on the same rig with the Qwen 3.6 27B and it beat my best MTP numbers at every draft length. DFlash is speculative decoding with a block diffusion drafter from z-lab. Instead of drafting tokens one by one, it fills a block of 15(currently limit) tokens in a single pass. You can get the docker compose from repo and run it on your hardware as Llama server in one click too.
 https://preview.redd.it/pltg3n2i7ubh1.png?width=1700&format=png&auto=webp&s=3aa3306e95908b1c8eddb504c13865e9fbf17bb3
 Benchmark config:
 - Speed: NVIDIA aiperf synthetic sweeps, ISL = OSL at 512 / 4K / 12K / 36K, fixed lengths (stddev 0), ignore EOS + min_tokens pinned so every request generates the full size
 - Measured requests per size: 30 / 10 / 5 / 3 (fewer as context grows, but 3 runs at 36K is still ~110K generated tokens), warm-up requests before each measured set: 2 / 2 / 1 / 1, random seed 42
 - Greedy decoding (temperature 0, top-k 1, top-p 1.0), concurrency 1, so the "serving yourself at home" scenario.
 Leaderboard (quick config comparison, code in benchmark/leaderboard.py):
 - Same short prompt across all runs and all configs
 - 10 runs per config, 1500 generated tokens per run, 3000 ctx limit
 - Temperature 0, top-k 1, seed 1234, prefix caching OFF, ignore EOS on
 - tok/s comes from llama.cpp's own timings, acceptance rate from draft_n / draft_n_accepted
 - Every run appends to a CSV, leaderboard keeps the best avg per config
 https://preview.redd.it/4oh5rqgt5ubh1.png?width=1030&format=png&auto=webp&s=3183585fe446b00d2da2fb40e0a9e5c1abb3a919
 Quality Test:
 - MATH-500, first 100 problems, same subset for both configs, seed pinned, reasoning off. Looking to run LiveCodeBench too but need to check some issues on ai perf and packages.
 Models used:
 - Target: unsloth/Qwen3.6-27B-GGUF (UD-Q4_K_XL) via llama.cpp server (Docker)
 - Draft: Alittlehamm
