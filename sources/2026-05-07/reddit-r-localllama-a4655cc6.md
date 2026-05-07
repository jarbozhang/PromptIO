---
title: 'Qwen3.6 27B NVFP4 + MTP on a single RTX 5090: 200k context working in vLLM'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5dya8/qwen36_27b_nvfp4_mtp_on_a_single_rtx_5090_200k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T14:05:54.000Z'
fetched_at: '2026-05-07T10:33:23.087Z'
---
So I spent some time testing Qwen3.6 27B NVFP4 on my RTX 5090 and wanted to share the numbers, since most of the recent good posts are either around 48GB cards, FP8, or llama.cpp/GGUF.
 This is not a "best possible setup" claim. More like: this is what I got working, here are the exact params, here are the numbers, and maybe it helps other 5090 owners avoid some guessing.
 The short version:
  
Single RTX 5090, 32GB VRAM
 Model: Peutlefaire/Qwen3.6-27B-NVFP4
 vLLM: 0.20.1.dev0+g88d34c640.d20260502
 Torch: 2.13.0.dev20260430+cu130
 Driver: 595.58.03
 Quantization: compressed-tensors
 Attention backend: flashinfer
 KV cache: fp8_e4m3
 MTP enabled with 3 speculative tokens
 Text-only mode
 Public claim I am comfortable with: 200k context, not 220k/262k
  
The vLLM model endpoint reports max_model_len: 230400, but I only benchmarked up to 200k context depth. I am intentionally keeping the claim at 200k because that is what I actually validated with repeated runs.
 Here are the main vLLM args:
 bash vllm serve Peutlefaire/Qwen3.6-27B-NVFP4 \ --host 0.0.0.0 --port 8082 \ --safetensors-load-strategy=prefetch \ --tensor-parallel-size 1 \ --attention-backend flashinfer \ --performance-mode interactivity \ --language-model-only \ --skip-mm-profiling \ --kv-cache-dtype fp8_e4m3 \ --gpu-memory-utilization 0.95 \ --max-model-len 230400 \ --max-num-seqs 1 \ --max-num-batched-tokens 4096 \ --enable-chunked-prefill \ --enable-prefix-caching \ --no-disable-hybrid-kv-cache-manager \ --reasoning-parser qwen3 \ --default-chat-template-kwargs '{"enable_thinking": false}' \ --enable-auto-tool-choice \ --tool-call-parser qwen3_coder \ --quantization compressed-tensors \ --speculative-config '{"method":"mtp","num_speculative_tokens":3}' \ --trust-remote-code 
 Startup log had the important bits I wanted to see:
  
Using FlashInferCutlassNvFp4LinearKernel for NVFP4 GEMM
 Available KV cache memory: 8.3 GiB
 Maximum concurrency for 230,400 tokens per request: 1.00x
  
After the run, nvidia-sm
