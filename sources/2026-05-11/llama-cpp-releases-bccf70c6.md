---
title: b9095
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9095'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-10T09:45:14.000Z'
fetched_at: '2026-05-11T08:20:06.502Z'
---
internal AllReduce kernel for CUDA provider (#22299)
ggml-cuda: add internal AllReduce provider for tensor parallelism
Introduces a NCCL-free AllReduce implementation for LLAMA_SPLIT_MODE_TENSOR
New files:
ggml/src/ggml-cuda/comm.cuh        — ggml_cuda_allreduce_provider enum
ggml/src/ggml-cuda/allreduce.cuh   — pipeline API declarations
ggml/src/ggml-cuda/allreduce.cu    — kernel + pipeline init/dispatch
ggml-cuda.cu changes:
ggml_backend_cuda_comm_context gains ar_pipeline field
Provider selection via GGML_CUDA_ALLREDUCE env var ("nccl" / "internal")
INTERNAL provider initialises the pipeline at comm_init time
Dispatch routes to ggml_cuda_ar_allreduce(); falls back to meta-backend
Current scope: 2 GPUs, FP32, tensors <= 256 KB. Notes in NOTES-allreduce.md.
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
llama-bench: add --allreduce flag to select AllReduce provider
Adds --allreduce <auto|nccl|internal> to llama-bench (and via the shared
Also fixes ggml_cuda_select_allreduce_provider() to treat an empty
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
Provider selection via GGML_CUDA_ALLREDUCE env var ("nccl" / "internal")
INTERNAL provider initialises the pipeline at comm_init time
Dispatch routes to ggml_cuda_ar_allreduce(); falls back to meta-backend
Current scope: 2 GPUs, FP32, tensors <= 256 KB. Notes in NOTES-allreduce.md.
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
llama-bench: rename --allreduce to --reduction-provider / -rp
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
Also fixes ggml_cuda_select_allreduce_provider() to treat an empty
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
Provider selection via GGML_CUDA_ALLREDUCE env var ("nccl" / "internal")
INTERNAL provider initialises the pipeline at comm_init time
Dispatch routes to ggml_cuda_ar_allreduce(); falls back to meta-backend
Current scope: 2 GPUs, FP32, tensors <= 256 KB. Notes in NOTES-allreduce.md.
Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.c
