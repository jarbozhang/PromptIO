---
title: ROCm vs Vulkan vs vLLM on Dual R9700's
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubqn87/rocm_vs_vulkan_vs_vllm_on_dual_r9700s/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T13:53:25.000Z'
fetched_at: '2026-06-22T04:12:20.732Z'
---
Just wanted to share these numbers I saw running Qwen3.6 35BA3 and Qwen3.6 27B and the big increase I saw going to vLLM. I was just expecting better concurrency but ended up with a lot better speeds.
 llama.cpp services Running ROCm and Vulkan
  
 Model Backend Gen 
  
 35B-A3B Q6_K_XL (MTP) ROCm ~106 t/s 
  27B Q6_K_XL (MTP) ROCm ~44 t/s 
  35B-A3B Q6_K_XL (MTP) Vulkan ~87 t/s 
  27B Q6_K_XL (MTP) Vulkan ~41 t/s 
 
 vLLM
  
 Model Backend Gen 
  
 35B-A3B MoE FP8 (MTP) ROCm + AITER 156 t/s 
  27B FP8 (MTP) ROCm + AITER 69 t/s 
 
 **EDIT, here are prefill speeds from 35BA3 since several were asking:
 Pulled these from vLLM logger.
  
 Prompt size Prefill speed (= tokens ÷ TTFT) 
  
    
  ~10K ~10,000 tok/s 10,033 ÷ 0.98s 
  ~40K ~6,600 tok/s 39,997 ÷ 6.0s 
  ~70K ~5,500 tok/s 70,027 ÷ 12.7s 
  ~100K ~4,400 tok/s 99,991 ÷ 22.9s 
 
 I am curious what speeds others are seeing on Qwen3.6 35BA3 and 27B.
    submitted by    /u/whodoneit1  
 [link]   [comments]
