---
title: >-
  One MacBook vs 2× DGX Spark: DeepSeek-V4-Flash scored 54% vs 52% on
  Terminal-Bench 2.1
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uzaf54/one_macbook_vs_2_dgx_spark_deepseekv4flash_scored/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T19:58:13.000Z'
fetched_at: '2026-07-17T23:00:59.688Z'
---
TL;DR: I ran DeepSeek-V4-Flash through the same 89-task Terminal-Bench 2.1 suite on two very different local setups:
  
an aggressively quantized 80.8 GiB GGUF on one 128 GB M5 Max MacBook;
 the native mixed FP8/FP4 checkpoint with DSpark speculative decoding on 2× DGX Spark.
  
The Mac finished at 47/87 graded tasks (54%). The two-Spark setup finished at 45/86 (52%). On the 86 tasks graded by both, they agreed on 66 and split the remaining 20 almost evenly: 11 wins for the Mac build, 9 for the Spark build.
 I do not think this proves that 2-bit quantization is free. It is one run, and this was an end-to-end comparison, not a clean quantization ablation. But I was still surprised by how little separated them.
 The two setups
  
 Setup detail MacBook DGX Spark pair 
  
 Hardware 1× M5 Max, 128 GB 2× DGX Spark GB10, TP=2, direct CX7 200G link 
  Target model DeepSeek-V4-Flash DeepSeek-V4-Flash + DSpark draft module 
  Weights 80.8 GiB mixed GGUF: IQ2_XXS/Q2_K experts, with important tensors kept at Q8/F16/F32 Native mixed FP8 weights + FP4 routed experts 
  Approx. overall size ~2.45 bits per weight ~167 GB checkpoint 
  KV / context on-disk KV, 100K advertised to the agent harness nvfp4_ds_mla, 262K server window, 200K advertised to the harness 
  Runtime DwarfStar (ds4-server, Metal) patched vLLM build for GB10 (sm_121a) 
  Speculative decode none in this run DSpark, 3 draft tokens 
 
 So yes, both use the same DeepSeek-V4-Flash target-model lineage. But they are not identical stacks. The quantization, runtime, KV format, context cap and hardware all differ.
 Also, calling the Mac build simply “2-bit” is shorthand. Most routed-expert weights are around two bits, but attention, shared experts, routing and other sensitive tensors are kept at higher precision. The whole file works out to roughly 2.45 bits per weight.
 What I ran
 The benchmark was Terminal-Bench 2.1 with the Terminus-2 agent. It contains 89 tasks where the agent gets a real shell and has to leave the e
