---
title: >-
  Serving Deepseek v4 Flash 0731 on 2x DGX Spark — 5-7 GB OS headroom, what
  would you do to lower VRAM usage and increase OS available RAM?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vig3tw/serving_deepseek_v4_flash_0731_on_2x_dgx_spark_57/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T23:25:18.000Z'
fetched_at: '2026-08-08T11:01:01.045Z'
---
Hey all, I'm serving DSv4Flash 0731 on a cluster of 2x DGX Sparks but am running into constant issues with having almost no RAM (unified memory) left for the OS/cache and I'd love to hear the community feedback on what I could do to get more RAM for headroom. The DGX has an issue where it locks up when RAM fills, so having more headroom allows things to be comfortably more stable. 
 Question: DeepSeek-V4-Flash-0731 (304B MoE) at full 1M context on 2x NVIDIA DGX Spark — how can we free more RAM for the OS?
 Hardware
  
2x DGX Spark (GB10 Grace Blackwell, SM121): 128 GB unified memory each (~121.7 GiB visible), ~273 GB/s bandwidth, 20-core ARM, 4 TB NVMe, DGX OS (headless, GUI/desktop services disabled)
 Direct-connected ConnectX-7 fabric, dual links, RoCE, MTU 9000; NCCL confirmed using IB transport (~200 Gbps)
  
Model
  
DeepSeek-V4-Flash-0731, native FP8 checkpoint (167 GB safetensors)
 304B total params, MoE: 256 routed experts/layer, 6 active + 1 shared per token, 43 layers
 Sparse attention (indexer top-k 512) + built-in KV compression (4x / 128x per-layer groups), YaRN-calibrated 1M context
  
Serving stack
  
vLLM 0.26.1rc1 built from source (the DeepSeek V4 SM12x support PR), CUDA 13.0 toolchain, running in containers
 Tensor parallel TP=2 across the two boxes (--nnodes 2, multiprocessing backend, no Ray)
 DSpark speculative decoding (method "dspark", num_speculative_tokens=5) — ~80% draft acceptance
 llama-swap as the single OpenAI-compatible endpoint / model router; Open WebUI frontend
  
Key engine flags
  
--kv-cache-dtype fp8_ds_mla (8-bit packed 584 B/token/layer; measured ~3.9 KB/token effective across all layers with the model's compression)
 --max-model-len 1048576 (full 1M)
 --gpu-memory-utilization 0.82 ← the knob in question
 --max-num-batched-tokens 4096 (larger values blow up per-request block accounting via tiny-block-size compressor-state cache groups — each 4-token block pins a ~1 MB slab)
 --max-num-seqs 6, prefix caching + chunked prefill 
