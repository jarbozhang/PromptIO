---
title: I got Nemotron Puzzle 75B running smoothly on a 64GB M2 Max
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uue46z/i_got_nemotron_puzzle_75b_running_smoothly_on_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T12:27:04.000Z'
fetched_at: '2026-07-12T23:01:41.979Z'
---
TL;DR: Added native nemotron_h_puzzle support to mlx-lm (PR #1535), then compared 4-bit vs 5-bit expert quantization (both with 6-bit dense layers, BF16 output head, group size 64) on a 64GB M2 Max.
 Results (same prompts, 5 seeds per task, temp 1.0 / top_p 0.95):
  
  4-bit experts 5-bit experts 
  
 Dense paths 6-bit 6-bit 
  Output head BF16 BF16 
  Checkpoint 42.03 GiB 49.88 GiB 
  Peak MLX memory 49.68 GB 58.12 GB 
  Average generation 14.27 tok/s 10.53 tok/s 
  Local task checks 24/30 21/30 
  Long-context retrieval 4/5 0/5 
 
 i believe the reason 5-bit performs worse is because the 5-bit checkpoint runs right at the 64GB ceiling, and memory pressure kills it where KV + working set grows. If you have 96/128GB, 5-bit may well behave differently.
 I'd love numbers from anyone who can test that.
 What it took to get running:
  
mlx-lm's existing Nemotron-H code needed blockwise config support, tensor remapping, and matching NVIDIA's FP32 norm/router behavior.
 Annoying bug: first-layer SSM outputs disagreed with NVIDIA's reference at cosine sim 0.8832 despite identical inputs. 
 Root cause: NVIDIA computes softplus(dt + dt_bias) in BF16 and promotes to FP32 after, mlx-lm's shared SSM path promotes before. Matching their boundary improved cosine similarity up to 0.999998.
 The BF16 output head is mandatory: quantizing the 131k-vocab lm_head at 4-bit produced repetitive garbage; restoring BF16 fixed it (~2.1 GiB cost).
  
   submitted by    /u/These_Meaning_3883  
 [link]   [comments]
