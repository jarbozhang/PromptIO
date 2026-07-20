---
title: >-
  I ran Ternary-Bonsai-27B (2-bit) and Bonsai-27B (1-bit) on Terminal-Bench 2.0,
  in 8GB VRAM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v1ya97/i_ran_ternarybonsai27b_2bit_and_bonsai27b_1bit_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T21:15:29.000Z'
fetched_at: '2026-07-20T23:00:57.694Z'
---
I asked myself where the Bonsai models actually land, so I ran them and compared to the results I already have for qwen-3.6-35b-a3b and qwen-3.5-9b on the same harness. Thought it might interest more people.
 Setup: little-coder harness via the harbor adapter, all 89 tasks of terminal-bench 2.0, single attempt (k=1), 40-turn cap, temp 0.2. RTX 5070 Laptop 8GB, i9-14900HX, 32GB RAM, CUDA 13.1. Runtime is PrismML's llama.cpp fork (stock llama.cpp can't load the 2-bit kernels).
 Results: Ternary-Bonsai-27B at 2-bit scored 7.9%, Qwen3.5-9B gets 9.2% and Qwen3.6-35B-A3B gets 24.3%, both as per-trial means from their k=5 runs. The 1-bit Bonsai never produced a number.
 The good part is that it genuinely all fits on the GPU. Tool calling was also clean, zero parse errors across the whole run. The bad part is the accuracy: 7.9% is below the 9B that also fits entirely on the same card, so the whole pitch costs you accuracy versus just running a smaller dense model at normal quant (Q4). Of the 7 tasks the 2-bit solved, the 35B solved 6. 
 The 1-bit model isn't usable in an agent harness. It's fine on simple prompts thuogh. 12*12 gives 144, a correct is_prime in 1007 tokens, clean stop. Under an agentic loop it produced a single 14,000+ token completion on the first task that never emitted a stop token, just rambling until it exhausted 32k context. Its traces show a self-validation tic even on trivial prompts that snowballs into non-termination as difficulty rises. I aborted the run once that was clear.
 Happy to share some more figures or numbers if anybody wants them!
    submitted by    /u/Creative-Regular6799  
 [link]   [comments]
