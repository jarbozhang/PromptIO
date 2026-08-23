---
title: >-
  $1800 (in GPU cost running with P2P running Qwen/Qwen3.6-27b-FP8 with 262K
  context and BF16 KV cache at 55 tok/s
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uah3oc/1800_in_gpu_cost_running_with_p2p_running/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-19T23:30:10.000Z'
fetched_at: '2026-06-20T04:27:01.317Z'
---
Hey peeps, wanted to share what is possible for folks with an inference only single user use case with 1700 in GPU cost.
 Setup: 4x 5060 ti (16GB) with P2P
 If you are in the US and you keep an eye on facebook marketplace and places like slickdeals you can find some 5060 ti 16 GB models for 425 to 475 used.
 A giant caveat is this type of configuration is only viable if your only interested in strictly inference.
 The VLLM Command Used:
 export VLLM_SLEEP_WHEN_IDLE=1 export VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS=1 export VLLM_WORKER_MULTIPROC_METHOD=spawn export SAFETENSORS_FAST_GPU=1 export NCCL_P2P_DISABLE=0 export NCCL_CUMEM_ENABLE=1 export CUDA_DEVICE_ORDER=PCI_BUS_ID export TORCH_FLOAT32_MATMUL_PRECISION=high export PYTORCH_ALLOC_CONF=expandable_segments:True # dropped: VLLM_USE_FLASHINFER_MOE_FP8 (dense model), VLLM_TEST_FORCE_FP8_MARLIN (test native FP8 first) vllm serve /data/models/Qwen/Qwen3.6-27B-FP8 \ --host 0.0.0.0 --port 8080 \ --tensor-parallel-size 4 \ --performance-mode interactivity \ --trust-remote-code \ --language-model-only \ --enable-auto-tool-choice \ --tool-call-parser qwen3_coder \ --reasoning-parser qwen3 \ --max-model-len 262144 \ --kv-cache-dtype bfloat16 \ --max-num-seqs 4 \ --gpu-memory-utilization 0.92 \ --speculative-config '{"method":"qwen3_next_mtp","num_speculative_tokens":3}' \ --compilation-config '{"max_cudagraph_capture_size":16,"mode":"VLLM_COMPILE"}' \ --async-scheduling \ --attention-backend flashinfer \ --enable-prefix-caching 
 Benchmark Command:
 vllm bench serve --backend vllm --base-url http://localhost:8080 --endpoint /v1/completions --model /data/models/Qwen/Qwen3.6-27B-FP8 --dataset-name random --random-input-len 4096 --random-output-len 1024 --num-prompts 40 --max-concurrency 1 --num-warmups 5 --ignore-eos --seed 1234 --percentile-metrics ttft,tpot,itl,e2el --save-result --result-filename qwen36_c1_4k.json
 ============ Serving Benchmark Result ============ Successful requests: 40 Failed requests: 0 Maximum reque
