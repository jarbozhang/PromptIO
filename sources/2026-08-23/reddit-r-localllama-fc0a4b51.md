---
title: >-
  I benchmark DFlash 2 (PR build) in llama.cpp on Qwen 3.8 27B against all
  speculative methods for 3 days. 2.26x on 100 real coding prompts, 4.68x with
  one n-gram drafter on top. Up to 8x on specific ca
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvncyh/i_benchmark_dflash_2_pr_build_in_llamacpp_on_qwen/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-22T20:41:35.000Z'
fetched_at: '2026-08-23T11:01:37.692Z'
---
Hey guys,
 Inco AI shipped DFlash 2 a few days ago with a drafter for Qwen 3.8 27B and a llama.cpp PR. I built the PR and ran it against plain decoding, MTP, the n-gram lookup drafters, and my July DFlash 1 numbers on Qwen 3.6 27B for 3 days. One RTX PRO 6000, concurrency 1, about three days of runs.
 The interesting result isn't the biggest number I measured. It's where n-gram actually helps and where it doesn't.
 Short version:
  
DFlash 2 alone: 2.26x on 100 real LiveCodeBench problems (67.97 → 153.91 tok/s, inter-token latency 14.27 → 6.02 ms), natural stop, nothing forced. That is the headline. Costs +2.7 GB VRAM.
 DFlash 2 + one n-gram lookup table (ngram-map-k4v): 4.68x on the build phase of an 18-turn coding session (65.1 → 304.9 tok/s). Adding the second table (ngram-mod) made it slower, 3.77x. In July, with DFlash 1, stacking both was the winner. I did not expect that to flip.
 The same n-gram flag is +52% on a synthetic benchmark, +1% on LiveCodeBench and -30% on prose. The +52% is the harness degenerating, do not quote it.
 The recommended --spec-draft-n-max 7 is past the peak. 5 gave roughly 11% more on 8K coding prompts. 7 is also a hard cap (block_size 8), anything above is silently clamped.
 --spec-draft-p-min does nothing on DFlash 2. The DFlash 2 code path in common/speculative.cpp never reads it.
 I also measured 8.47x in a synthetic test. I nearly used that as the headline. It was mostly benchmark garbage caused by the model falling into a repetitive loop.
  
Setup (the parts that matter for reproducing)
  
Target ggml-org/Qwen3.8-27B-GGUF:Q4_K_M (18 GB). Drafter incoai/Qwen3.8-27B-DFlash2-GGUF:Q4_K_M (1.1 GB). MTP sidecar mtp-Qwen3.8-27B-Q8_0.gguf (3.0 GB). Reasoning off.
 llama.cpp b10498 built from PR #27342 (commit 5ecbe1ac), CUDA 13.3. The PR build matched upstream b10499 within 0.3% on a non-speculative baseline (checked at 512 and 4K only).
 RTX PRO 6000 Blackwell 96 GB, Ryzen 9 9950X. -c 262144, f16 KV, -fa on, -ngl -1, drafter fully on G
