---
title: >-
  DeepSeek V4-Flash (284B MoE) at 33 tok/s single / 68 tok/s aggregate on 2× RTX
  3090 + a used quad-Xeon DDR4 server — full config
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1veow4b/deepseek_v4flash_284b_moe_at_33_toks_single_68/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T20:25:21.000Z'
fetched_at: '2026-08-04T11:01:38.797Z'
---
Ran DeepSeek V4-Flash-0731 — the full official checkpoint, not a re-quant — on commodity used hardware. Sharing because I couldn't find anyone else publishing Ampere results for this engine.
 Edit / update: a commenter called out that hybrid CPU-GPU posts always publish decode and never prefill. Fair hit — I didn't have it. I do now, it's in a new section below, and it's the number that decides what this box is actually good for.
 Why bother with a 2018 server
 The model is 156 GB. That number decides everything before speed matters:
  
 Platform Memory Bandwidth Price Runs DS4-Flash? 
  
 Mac Studio M3 Ultra 96 GB max¹ 819 GB/s $3,999+ ❌ won't load 
  DGX Spark 128 GB 273 GB/s $4,699² ⚠️ 4-bit re-quant only, ~10 GB headroom 
  AMD Ryzen AI Halo 128 GB ~256 GB/s $3,999 ⚠️ same 
  RTX PRO 6000 Blackwell 96 GB 1,792 GB/s ~$9,000 ❌ won't load 
  6× RTX 3090 144 GB 936 GB/s ~$6,600 cards alone ✅ (+ a chassis that takes 6 cards) 
  Used R940 + 2× 3090 512–768 GB 141 GB/s × 4 nodes ~$6K ✅ full checkpoint 
 
 ¹ Apple pulled the 512 GB M3 Ultra option in March 2026 and the 256 GB in May — 96 GB is the current ceiling. ² Up from $3,999 at launch, explicitly attributed to DRAM costs.
 Unified-memory boxes give you bandwidth in a small pool. A 4-socket server gives you a huge pool at lower per-node bandwidth — but four independent memory controllers running in parallel. For sparse MoE, where only ~13B of 284B params activate per token, capacity wins.
 Inference platform
 Lvllmds4-x v2.3.8 — guqiong96's SM80+ DeepSeek V4 specialization. A vLLM fork (base: yhfgyyf/vllm-deepseek-v4-sm89) with the lk_moe v2.3.1 CPU-GPU hybrid MoE engine doing NUMA-aware expert compute in system RAM. Prebuilt cp312 wheel from the GitHub release, no compiling.
 Model
 DeepSeek V4-Flash-0731 · 284B total / 13B active MoE · official safetensors, 156 GB (48 shards)
 Quantization-aware trained — routed experts (~96% of params) ship natively in MXFP4. Nothing re-quantized. FP8 linears run weight-only, ac
