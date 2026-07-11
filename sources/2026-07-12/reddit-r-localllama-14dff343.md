---
title: >-
  Some testing on RTX Pro 4500 (With Oculink) on PrismaQuant, INT4 Autoround and
  NVFP4 W4A4 quantized model
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ut8o8t/some_testing_on_rtx_pro_4500_with_oculink_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T03:16:19.000Z'
fetched_at: '2026-07-11T23:01:42.043Z'
---
This little beast has been around for a while after asking about whether it's possible to set up in this subreddit.
 Beelink SER 8 8745 HS, AooStar eg01, and RTX Pro 4500 32GB
 The Sakamakismile model I've been running was throwing tool call errors and getting stuck in thinking loops in both Opencode and Cline across vLLM 0.22, 0.23, and 0.24 for some reasons, and even swapping to the Froggeric Chat Template didn't seem to improve things (it was relatively OK for roughly 2 days of intense using, then the problem surfaced again). I went looking to see if there were any NVFP4 quantized models available.
 Then I found a new quantization method that's been getting some discussion on the official Nvidia DGX Spark forum, called PrismaQuant. Simply put, it selects the most suitable format for each linear layer to maximize the model's capabilities at a specific bit.
 Note that the PrismaQuant quantization method is currently only usable in vLLM for the Blackwell architecture (50 series, RTX Pro series). Also, because it's so new, GGUF is basically completely unsupported right now.
  
 Model Name Quantization Bits Weight Size Base/Source Model Notes 
  
 rdtand/Qwen3.6-27B-PrismaSCOUT-Blackwell-NVFP4-BF16-vllm ~5.31 bits ~20 GB Qwen3.6-27B – 
  rdtand/Qwen3.6-27B-PrismaAURA-5.5bit-vllm ~5.5 bits ~23 GB Qwen3.6-27B Higher bit per quantized weight compared to PrismaSCOUT, better response quality theoretically 
  rdtand/Qwen3.6-27B-PrismaQuant-Heretic-5.25bit-vllm ~5.249 bits ~22 GB llmfan46/Qwen3.6-27B-uncensored-heretic-v2 Not actually tested 
 
 PrismaSCOUT docker command with 0.24 vLLM:
 docker run -d --name vllm-prismascout --restart unless-stopped --gpus all --ipc=host -p 8000:8000 --env-file .env -e HF_HUB_OFFLINE=1 -e VLLM_USE_FLASHINFER_SAMPLER=1 -e VLLM_NVFP4_GEMM_BACKEND=flashinfer-cutlass -e PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True -v /home/rw/vllm/models:/models:ro --entrypoint /bin/bash "vllm/vllm-openai:v0.24.0-cu129-ubuntu2404" -lc 'exec vllm serve /mode
