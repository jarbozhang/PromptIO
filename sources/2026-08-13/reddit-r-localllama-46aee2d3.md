---
title: >-
  I ran DeepSeek V4 Flash 284B + DSpark on one RTX PRO 6000. The drafter was
  faster in RAM than VRAM.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vmt1y3/i_ran_deepseek_v4_flash_284b_dspark_on_one_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T22:41:23.000Z'
fetched_at: '2026-08-13T11:02:02.146Z'
---
Hey guys,
 Just finished benchmarking DeepSeek V4 Flash 284B + DSpark on a single RTX PRO 6000 96GB.
 Short version:
  
DSpark: ~15–17% faster generation on my coding workload
 On this setup, the DSpark drafter was faster in system RAM than VRAM
 q8_0 KV cache: 256K → 768K context with basically no decode-speed loss
 Best 9-turn coding run: 31.16 tok/s
 The 144.4GB model obviously does not fit in 96GB VRAM
  
Hardware:
 Ryzen 9 9950X | RTX PRO 6000 Blackwell 96GB | 96GB DDR5 | Ubuntu
 Model:
 DeepSeek-V4-Flash-0731 UD-Q4_K_XL — 144.4GB
 My final target-model split:
 21 expert layers → GPU
 19 expert layers → system RAM
 Those RAM-resident experts have to be streamed during generation, so this setup is largely memory-bandwidth bound rather than compute-bound.
 1. DSpark still helped with heavy CPU offload
 I compared the configurations at roughly the same VRAM usage:
 No drafter 26.52 tok/s DSpark in VRAM 29.86 tok/s +12.6% DSpark experts in RAM 31.16 tok/s +17.5% 
 Because layers can only move in whole units, I think the honest result is ~15–17%, rather than treating 17.5% as an exact/general number.
 Matching VRAM usage matters here.
 My first comparison gave the DSpark configuration significantly more target-model weights in VRAM than the baseline, which exaggerated the gain.
 I reran it with memory usage matched as closely as possible. These are the rerun numbers.
 2. The result I didn't expect: put the drafter in RAM
 This was probably the most interesting result.
 The DSpark drafter is about 10.15GB in Q8_0.
 Keeping it in VRAM means that VRAM can't be used for DeepSeek's expert layers.
 Moving the drafter experts into system RAM freed enough VRAM to keep three additional target-model expert layers on the GPU.
 I expected this configuration to lose.
 It didn't:
 Drafter in VRAM 29.86 tok/s Drafter experts in RAM 31.16 tok/s 
 That's about 4.4% faster with the drafter experts in RAM.
 My interpretation is that what matters isn't only how many GB you move, but ho
