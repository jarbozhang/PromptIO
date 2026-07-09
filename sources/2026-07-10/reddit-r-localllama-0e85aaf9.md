---
title: Exploring FlashAttention-3/4 optimizations on RTX GPUs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1urucz1/exploring_flashattention34_optimizations_on_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T15:56:33.000Z'
fetched_at: '2026-07-09T23:01:04.808Z'
---
I was curious whether any of the FA-3/4 optimizations transfer to RTX GPUs. vLLM/SGLang attention falls back to FA-2 on consumer cards (FA-3 and FA-4 are datacenter-only), so I wanted to know if there's any performance left on the table, and I rebuilt the attention kernels from scratch.
 The kernel reaches parity with FA-2 (206us on RTX5090 with batch=1, heads=8, seq_len=4096, head_dim=64), but unfortunately, FA-3/4 optimizations are either not applicable or not helpful on consumer cards. It looks like FA-2 is the ceiling.
 In summary:
  
Faster tensor-core instructions (WGMMA) are the main lever behind FA-3, but they are not available on RTX GPUs.
 TMA (tensor memory accelerator) is available on sm_120 (RTX 5XXX). It helps on paper (LSU drops), but the transport isn't the bottleneck, so the final number barely moves.
 Warp specialization is also available. However, it is mainly a scheduling optimization, i.e., it helps eliminate pipeline bubbles and better utilize tensor cores, but without asynchronous tensor core instructions. The result is negative: 213 vs 206 us.
 In FA-4, they also simulated exp using FMA instructions because the tensor cores on the B200 are so fast that the whole pipeline became SFU-bound (special functions unit). RTX 5090 is tensor-core bound, so no point in this optimization either. In fact, even a conventional optimization of using faster exp2f instead of expf for softmax doesn't move the number.
  
I have tried a handful of other optimizations that could potentially work on consumer silicon, such as a deeper pipeline and register ping-pong. No luck. Since the whole pipeline is tensor-pipe-bound, I believe the FA-2 is the ceiling, and that all meaningful levers will require sacrificing some accuracy to leverage faster, lower-precision tensor cores.
 Note that this is an exploration of the regular attention that dominates the prefill- and compute-bound regimes. Decoding against a large KV cache is a different, memory-bound story where split-
