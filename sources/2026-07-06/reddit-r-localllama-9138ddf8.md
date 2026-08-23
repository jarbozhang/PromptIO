---
title: 'Qwen 3.6 27B - VLLM Performance Benchmark Results (BF16, FP8, NVFP4)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uo32yw/qwen_36_27b_vllm_performance_benchmark_results/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T14:06:23.000Z'
fetched_at: '2026-07-05T23:01:37.129Z'
---
Sharing some testing of Qwen 3.6 27B using VLLM across the popular quants on my development system. I used llama benchy to generate the results, then fed it into an LLM to format it the tables for readibility.
 While NVFP4 is blazing fast, have had looping issues in copilot that I don't get with BF16, and the responses in general when used in agent mode seem to be less thorough than the higher quants. Based on these results, FP8 seems to be the right choice. Some of the parameters can be further tuned I'm sure to get better performance but these are were all plenty fast enough for coding purposes.
 I used to use llama.cpp, but have found that VLLM is in practice is faster (due to paged attention), as well as more stable (llama.cpp would give me random errors that happen frequently, requiring me to reset the prompt or restart the service).
 If you have any comments or suggestions to improve let me know.
 Test System:
 Motherboard: Asus Proart Z890
 CPU: Intel 270K plus
 RAM: 96GB DDR5 (6000MHZ)
 GPU: RTX 6000 Pro Blackwell 96GB (Max-Q, ECC enabled)
 Software:
 OS : Ubuntu 26.04 LTS (x86_64)
 Python version : 3.12.13 
 vLLM Version : 0.24.0
 NVIDIA-SMI 595.71.05 
 CUDA Version: 13.2 
 Models:
 Qwen 3.6 27B - BF16 and FP8 (HF Qwen)
 Qwen 3.6 27B - NVFP4 (HF Nvidia)
 * replaced the delivered jinja scripts with the fixed chat template
 VLLM Parameters:
 GPU_COUNT="1"
 MAX_LEN="262144" 
 export VLLM_USE_DEEP_GEMM=0
 export FLASHINFER_MAX_NUM_TOKENS=8192
 export TORCH_CUDA_ARCH_LIST="12.0f"
 export TORCH_FLOAT32_MATMUL_PRECISION=high
 export PYTORCH_ALLOC_CONF=expandable_segments:True
 export VLLM_USE_FLASHINFER_SAMPLER=1
 vllm serve "$MODEL_PATH" \
 --port "$PORT" \
 --tensor-parallel-size "$GPU_COUNT" \
 --max-model-len "$MAX_LEN" \
 --performance-mode interactivity \
 --attention-backend FLASHINFER \
 --gpu-memory-utilization 0.88 \
 --max-num-seqs 2 \
 --enable-chunked-prefill \
 --max-num-batched-tokens 8192 \
 --kv-cache-dtype fp8 \
 --reasoning-parser qwen3 \
 --ena
