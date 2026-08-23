---
title: 'I tried running a 1.56TB MoE model on a 6GB RTX 4050 Laptop, Here’s the result'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9hd9u/i_tried_running_a_156tb_moe_model_on_a_6gb_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T01:12:50.000Z'
fetched_at: '2026-07-29T11:01:19.466Z'
---
The Test Bench Setup
 I tested running a massive 1.56TB Mixture-of-Experts (MoE) checkpoint (96 shards, 93 layers, 896 experts/layer, ~4.46 bits/param MXFP4) on a budget gaming laptop.
 Laptop: HP Victus 15
 GPU: NVIDIA RTX 4050 Laptop (6GB GDDR6, 96-bit interface @ 192 GB/s bandwidth, Ada Lovelace AD107)
 System RAM: 16GB DDR4 (Dual-Channel)
 Storage: Stock PCIe 4.0 NVMe SSD (Benchmarked at ~3,500 MB/s sequential read)
 Usable Fast Memory Budget: ~19GB total (~13.5GB available RAM + 5.5GB available VRAM after OS overhead)
 Hardware Context: The RTX 4050 uses 4th-Gen Tensor Cores. Because it lacks native MXFP4 hardware acceleration (which arrived with the 50-series/Blackwell), the engine dequantizes MXFP4 weights down to FP16/INT8 in memory before Tensor Core execution.
 Run 1: Standard Engine Architecture (Out-of-Box Attempt)
 Result: Hard Crash / OOM before Token 1
 Under the default engine setup, dense attention weights and shared parameters stay permanently resident in RAM while sparse expert weights stream off the NVMe.
 Required Resident Memory: ~40GB at 4-bit precision.
 Available Memory: ~19GB.
 The engine instantly hit an Out-Of-Memory (OOM) allocation error during the initial memory-map phase and terminated before processing a single prompt token.
 Run 2: Patched Engine (Streaming Dense Weights off SSD)
 To force the model to execute on 16GB RAM, I patched the runtime to treat RAM purely as a thin LRU cache, forcing the engine to stream non-cached dense weights and attention layers directly off the NVMe alongside the active experts.
 Real Benchmark Numbers:
 Initial Load & Mmap Time: 5 minutes, 42 seconds (dominated by mmap overhead and parsing headers across all 96 shard files).
 Prefill (7-token prompt): 11.8 seconds (loads each layer's weights once across all positions).
 Decode Speed: 9.4 seconds / token (~0.106 tok/s).
 Where the Bottleneck Settled:
 At 8 active experts per layer across 93 layers, each token required thrashing:
 Active Experts: 8 × 93
