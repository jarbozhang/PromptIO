---
title: >-
  Auto-fit vs tuned MoE offload: 564 → 1330 pp tok/s, unchanged decode
  (Qwen3.6-35B-A3B Q6 / RTX 3090)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vh22c8/autofit_vs_tuned_moe_offload_564_1330_pp_toks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T11:52:59.000Z'
fetched_at: '2026-08-07T11:00:46.508Z'
---
TL;DR: On a Qwen3.6-35B-A3B Q6 setup sized for 64K context on a 24GB RTX 3090, spilling eight MoE expert layers to CPU freed enough VRAM to increase -b from 512 to 1024 and -ub from 128 to 512.
 Prompt processing improved by 2.36×, while generation speed remained unchanged within measurement noise.
  
 Benchmark Auto-fit baseline Tuned Result 
  
 PP4K 564.5 tok/s 1330.0 tok/s 2.36× 
  TG4K 97.4 tok/s 97.7 tok/s Within noise 
  TG32K 81.6 tok/s 84.0 tok/s Within noise 
 
 These are PP measurements with a 4K prompt and TG measurements at 4K and 32K context depth. The configurations were sized against a 64K context requirement; this is not a 64K-depth throughput benchmark.
 I first used auto-fit to establish a feasible configuration. Its resulting batch settings were -b 512 -ub 128; I hard-coded them in the baseline command below so the comparison is reproducible.
 The tuned configuration deliberately moves eight layers’ MoE expert weights to CPU:
 -ot 'blk\.(1[2-9])\.ffn_.*_exps\.weight=CPU' \ -b 1024 -ub 512 -ngl 41 
 This is a joint-configuration result: CPU offload frees VRAM, and the larger batch/micro-batch uses that memory to accelerate prefill. It is not an isolated claim that CPU offload alone improves performance.
 Full reproduction
 Baseline, reproduces the auto-fit configuration:
 llama-bench \ -m Qwen3.6-35B-A3B-UD-Q6_K.gguf \ -fitt 1024 -fitc 65536 \ -t 7 -b 512 -ub 128 \ -fa on -ctk q8_0 -ctv q8_0 -mmp 1 \ -p 4096 -n 64 -r 2 \ -d 4096,32768 
 Tuned:
 llama-bench \ -m Qwen3.6-35B-A3B-UD-Q6_K.gguf \ -t 7 -b 1024 -ub 512 -ngl 41 \ -fa on -ctk q8_0 -ctv q8_0 -mmp 1 \ -ot 'blk\.(1[2-9])\.ffn_.*_exps\.weight=CPU' \ -p 4096 -n 64 -r 2 \ -d 4096,32768 
 Environment
  
Model: unsloth/Qwen3.6-35B-A3B-GGUF
 Quant: Qwen3.6-35B-A3B-UD-Q6_K.gguf, 27.3 GiB
 SHA-256: 4fe53b148b46f9b88830e2a3055c5b15c3a4d1e3ddc9a1384a108d8b9d59f043
 GPU: RTX 3090, 24 GiB
 CPU: Threadripper PRO 3955WX, with seven cores available to the rental
 RAM: approximately 100 GB DDR4
 llama.cpp: c
