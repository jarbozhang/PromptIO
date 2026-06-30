---
title: 'Qwen 3.6 27B Speculative Decoding Bench: Pushing ~100 TPS on a single RTX 3090'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ujo46r/qwen_36_27b_speculative_decoding_bench_pushing/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T12:40:45.000Z'
fetched_at: '2026-06-30T23:01:36.517Z'
---
First of all, a huge thank you to the r/LocalLLaMA community and the 3090 club. This benchmark started from your shared recipes...
 These are my findings on my hardware (Xeon E5-2666v3, 64GB RAM, single RTX 3090 24GB) comparing 5 engines (3 llama.cpp forks + mainline + Lucebox) across two quantizations of the same model.
 I've used the bench script from https://github.com/noonghunna/club-3090/tree/master and two simple scripts using en8wiki for building long prompts.
 Summary Table
 Sorted by fork → speculative type. Key metrics: decode_TPS (code & narrative), TTFT, VRAM usage, and context consistency (generation speed degradation when moving from 72k to 128k filled context).
  
 Fork / Engine Speculative Type Model / Quant Code TPS Narr. TPS TTFT VRAM (MiB) Gen 72k Gen 128k Deg. (72k→128k) 
  
 ik_llama (ubergarm config) MTP n_max=4 Qwen3.6-27B-IQ4_KS 89.2 63.9 361ms 22304 34.6 23.5 −32.1% 
  ik_llama + ngram ngram+MTP Qwen3.6-27B-IQ4_KS 87.8 58.6 341ms 20508 32.1 24.1 −24.9% 
  ik_llama (Standard config) MTP n_max=2 Qwen3.6-27B-IQ4_KS 73.1 61.7 357ms 20208 33.8 25.4 −24.8% 
            
  mainline llama.cpp MTP n_max=1 Qwen3.6-27B-Q4_K_M 64.7 52.5 288ms 21354 33.4 31.2 −6.6% 
  Spiritbuun MTP Qwen3.6-27B-Q4_K_M 59.7 45.7 294ms 22066 34.8 31.5 −9.5% 
  beellama DFlash (Draft GGUF) Qwen3.6-27B-Q4_K_M 96.8 45.6 504ms 20814 22.9* 27.1 −41.3%** 
  Spiritbuun DFlash Qwen3.6-27B-Q4_K_M 66.9 30.4 300ms 23356 — — — 
  LUCEBOX DFlash (TQ3 KV) Qwen3.6-27B-Q4_K_M 32.6 32.5 448ms 20680 27.0 — — 
 
 * beellama: The 72k run (22.9 DP) was an outlier due to the experimental KV cache configuration (q5_0/q4_1), stabilizing at 27.1 DP upon reaching 128k.
 ** Degradation calculated relative to baseline performance in short context.
 ik_llama — The fork that does "everything"
 Fork of llama.cpp with native MTP support, merge-qkv, recurrent checkpoints, and multi-backend speculative decoding. Tested on IQ4_KS quant (by ubergarm).
 ik_llama + MTP+ngram (ngram-mod + mtp)
 Great code gener
