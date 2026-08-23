---
title: >-
  Single RTX 5090: Qwen3.8-27B NVFP4 at a real 262K context in vLLM — 77 tok/s
  short-context, 64.7 tok/s at 128K
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvl7pc/single_rtx_5090_qwen3827b_nvfp4_at_a_real_262k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-22T19:16:31.000Z'
fetched_at: '2026-08-23T11:01:37.697Z'
---
This is the Qwen3.8-27B setup I actually use every day on one RTX 5090. 
 I wanted to write it down with enough detail that another 5090 owner can reproduce it instead of guessing which memory knobs I used.
 The short version: the full 262,144-token window fits together with vision, FP8 KV, prefix caching, tool calling, and a normal KDE desktop. Decode is 77.2 tok/s after a 1K prompt and 64.7 tok/s with 128K already resident. A successful 262,000-token prefill took 166 seconds. This is not a claim that 262K is fast; it is proof that it genuinely fits and completes.
 Model: joshebbs/qwen3.8-27b-uncensored-nvfp4-modelopt, pinned to revision e5ff4986938dcd0dd05ab4cce89da1b052be6ce3.
 It is an NVFP4 ModelOpt export of JonathanColetti/Qwen3.8-27B-Uncensored. The checkpoint is 19.18 GiB of safetensors and retains the vision tower and MTP head. The model is a 64-layer hybrid: 48 Gated DeltaNet layers and 16 full-attention layers.
 Results
 All runs hit the already-warm daily vLLM server through /v1/completions, concurrency 1, random token prompts, --ignore-eos, and temperature 0. PP means accepted input tokens divided by TTFT. TG means 1000 / mean_TPOT_ms, so it excludes prefill. The non-prefix runs had zero prefix-cache hits according to the server counters.
  
 Workload Runs PP tok/s TTFT Steady TG tok/s End-to-end output tok/s 
  
 8,192 in -> 1 out 5 7,005 1.169 s mean / 1.167 s median n/a n/a 
  32,768 in -> 1 out 3 6,148 5.330 s mean / 5.332 s median n/a n/a 
  131,072 in -> 256 out 1 2,781 47.128 s 64.7 5.01, because the 47 s prefill dominates 
  262,000 in -> 1 out 1 1,578 166.004 s n/a n/a 
  1,024 in -> 512 out 5 not used as a PP test 119.3 ms mean / 116.9 ms median 77.2 75.95 
 
 The short-context decode run had 12.959 ms mean TPOT and a measured peak of 78 output tok/s. At 128K resident context, TPOT rose to 15.463 ms, so generation fell by about 16.2% to 64.7 tok/s.
 The 128K and 262K rows are one run each. Treat those as measured operating points and fit chec
