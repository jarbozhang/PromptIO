---
title: 'High-quality GLM-5.2 Quant on 4x DGX Spark - Guide, Results, and Comps'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uidtb8/highquality_glm52_quant_on_4x_dgx_spark_guide/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T00:45:36.000Z'
fetched_at: '2026-06-29T23:01:34.483Z'
---
I got GLM-5.2 NVFP4 running on four DGX Sparks at 128K context. This is still a niche/hacky setup, but it is now a real serving point rather than just a proof of life.
 Objective: A high quality 4-bit quant running on 4x spark. Model: https://huggingface.co/Mapika/GLM-5.2-NVFP4
 TL;DR: 128k context at fp8_ds_mla, ~15-16 tps at c0 decode, falling to about ~13 tps decode at long context (this holds up really well)
 The other TL;DR: or an m3ultra 512GB, which can "just run" the unsloth Q4_K_S quant. More details at the bottom, but the lack of MLA kernel support causes mac to start with a tiny decode edge at c=0 which collapses extremely badly as ctx grows.
 Hardware: 4x standard nVidia-brand GB10 DGX Sparks, and a Microtik RoCE switch.
 To quote the card:
 > The MoE expert FFNs (routed + shared) are quantized to NVFP4; attention (MLA + the DeepSeek-style DSA lightning indexer), the router, and the LM head are kept in BF16. This shrinks the checkpoint from 1.5 TB → 410 GB (~3.7×) while retaining GSM8K accuracy within ~2 points of BF16.
 Why this is interesting: the model is too large and the memory is too tight to treat Spark like normal discrete-GPU hardware. The win was combining decode-context parallelism with aggressive system/Ray memory trimming. DCP4 shards the decode context across the four TP ranks, which is what makes 128K feasible. MTP1 then recovers enough generation speed to be usable.
 Main result:
 4x DGX Spark / GB10, one GPU per node
 GLM-5.2 NVFP4 MTP hybrid checkpoint
 vLLM fork with DCP + B12X sparse MLA patches
 TP4 / PP1 / DCP4 / MTP1
 fp8 KV cache, explicit 1.81 GB/rank
 131,072 max model len
 132,096 fitted KV tokens
 512 tokens/s prefill
 about 14.5-15.2 output tok/s on short-prompt codegen
 Can be a tiny bit inconsistent, eg, on a 112k prompt uncached:
 (APIServer pid=736) INFO 06-29 00:12:03 [loggers.py:277] Engine 000: Avg prompt throughput: 511.6 tokens/s, Avg generation throughput: 0.0 tokens/s, Running: 1 reqs, Waiting: 0 reqs, GPU KV cache
