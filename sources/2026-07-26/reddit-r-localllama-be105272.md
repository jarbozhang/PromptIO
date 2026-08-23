---
title: 'Benchmarks: TensorSharp vs. llama.cpp'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v6ect8/benchmarks_tensorsharp_vs_llamacpp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T17:27:32.000Z'
fetched_at: '2026-07-26T11:00:55.542Z'
---
Cuda and Vulkan Benchmark: TensorSharp vs. llama.cpp
 I would like to share my latest open source local Unsloth (GGUF) LLM inference engine and applications. It supports many models from Unsloth, like Gemma4, DiffusionGemma, Qwen3.6 with multi-modal (image, vision, audio), Qwen Image Edit, reasoning and function tool. It can run on Windows/MacOS/Linux and fully leverage GPU's capability(Nvidia, Apple, AMD, Intel and others supported by Vulkan, CUDA and Metal). The API is completely compatible with OpenAI and Ollama interface. It has on par performance than llama.cpp Here is the benchmark results in overall:
 **Performance ratio — TensorSharp vs reference engines**
 Geomean of TensorSharp's per-scenario speedup over each reference engine on the **same backend**, across every scenario both engines ran (single-stream, MTP-off). A value **> 1.0× means TensorSharp is faster** (for decode / prefill throughput) or lower-latency (for TTFT); `—` = no overlapping cells. Per-scenario ratios are in each model's section below.
  
 Model Comparison decode prefill TTFT 
  
   
       
  Gemma 4 E4B it (Q8_0, dense multimodal) vs llama.cpp · CUDA 1.02× 1.28× 1.27× 
  Gemma 4 E4B it (Q8_0, dense multimodal) vs llama.cpp · Vulkan 1.00× 1.05× 1.03× 
  Gemma 4 12B it (QAT UD-Q4_K_XL, dense) vs llama.cpp · CUDA 1.04× 1.17× 1.16× 
  Gemma 4 12B it (QAT UD-Q4_K_XL, dense) vs llama.cpp · Vulkan 1.21× 1.04× 1.03× 
  Qwen 3.6 35B-A3B (UD-IQ2_XXS, MoE) vs llama.cpp · CUDA 0.98× 1.28× 1.27× 
  Qwen 3.6 35B-A3B (UD-IQ2_XXS, MoE) vs llama.cpp · Vulkan 0.87× 1.04× 1.03× 
  Qwen 3.6 27B (UD-IQ2_XXS, dense) vs llama.cpp · CUDA 1.07× 0.96× 0.95× 
  Qwen 3.6 27B (UD-IQ2_XXS, dense) vs llama.cpp · Vulkan 1.02× 0.85× 0.84× 
 
 This project is not just a C# wrapper of llama.cpp. It implemented the entire LLM inference engine from bottom to top. If you use CPU backend, it's 100% pure C# code execution. Besides CPU backend, I also implmented CUDA, MLX and GGML backend. The GGML backend refer GGML project 
