---
title: 2.5x faster Qwen3.6 NVFP4 Unsloth quants
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usniqh/25x_faster_qwen36_nvfp4_unsloth_quants/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T13:20:19.000Z'
fetched_at: '2026-07-10T23:01:38.126Z'
---
Hey r/LocalLLaMA folks! We made NVFP4 quants 2.5x faster for Qwen3.6 27B and also 1.56x to 1.79x faster for 35B-A3B vs NVIDIA's NVFP4 quants without any accuracy degradation! We used W4A4 so actual 4bit tensor cores for matmuls, whilst NVIDIA's ones uses W4A16.
 FP8 KV Cache calibration is also provided, auto allowing 2x longer contexts. For accuracy we conducted MMLU-Pro, AIME 2025, GPQA for FP8, BF16, NVIDIA's NVFP4 and our NVFP4s. It also has MTP pre-embedded.
 We also provided 2 35B versions NVFP4-Fast (1.79x faster) and NVFP4 (1.56x faster) where NVFP4-Fast fully uses W4A4 whilst NVFP4 normal uses a mixture to stay a little bit more accurate.
 NVFP4 links:
 Qwen3.6-35B-A3B-NVFP4 (1.56x Faster)
 Qwen3.6-35B-A3B-NVFP4-Fast (1.79x Faster)
 Qwen3.6-27B-NVFP4 (2.5x Faster)
 Qwen3.6-27B
  
 Provider MMLU-Pro GPQA AIME 2025 
  
 Unsloth 86.25 86.34 93.12 
  NVIDIA 85.96 86.87 93.12 
  FP8 86.11 86.87 93.75 
  BF16 85.96 88.13 93.33 
 
 Qwen3.6-35B-A3B
  
 Provider MMLU-Pro GPQA AIME 2025 
  
 Unsloth 85.85 86.74 92.29 
  Unsloth Fast 85.58 87.75 91.67 
  NVIDIA 85.60 87.12 91.88 
  FP8 85.75 86.74 93.12 
  BF16 85.75 86.36 92.50 
 
 We have more analysis and benchmarks in our NVFP4 Qwen3.6 blog: https://unsloth.ai/docs/models/qwen3.6#nvfp4
 Have a nice weekend folks!
    submitted by    /u/danielhanchen  
 [link]   [comments]
