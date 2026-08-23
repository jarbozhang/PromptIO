---
title: b10293
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10293'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-06T09:14:26.000Z'
fetched_at: '2026-08-06T11:02:32.691Z'
---
ci : onboard AMD ROCm CI with gfx1151 fixes (#26544)
ci: prepare for amd rocm ci
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
ci: fix editorconfig-checker
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
ci: fix device not recognised
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
ci: rename gpu-amd to gpu-hip
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
ci: gpu-hip to gpu-rocm
haha
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
CUDA: allow integrated-GPU host output buffer in debug assert
On integrated GPUs (APUs), the scheduler can legitimately place a graph
Fixes test-recurrent-state-rollback on gfx1151 (Strix Halo).
ci: enable unified memory for ROCm gfx1151 job
Work around a coherence issue on integrated RDNA3.5 (gfx1151) where GPU
test-llama-archs: skip jamba on HIP backend
jamba produces incorrect output (~0.55 NMSE vs CPU) on the HIP backend on
ci: use HIP_LAUNCH_BLOCKING for ROCm gfx1151 job
The gfx1151 ROCm CI job produced incorrect inference output (qwen3 perplexity ~88 vs ~9.4) due to an async-execution correctness issue in the HIP path. Serializing kernel launches with HIP_LAUNCH_BLOCKING=1 restores correctness. This replaces the earlier GGML_CUDA_ENABLE_UNIFIED_MEMORY workaround, which did not fix batched inference.
test-backend-sampler: skip top-k subtests on HIP backend
The ROCm backend does not support the TOP_K/ARGSORT op at vocab scale (no CUB; bitonic argsort is capped at ncols <= 1024), so top-k/top-p backend samplers cannot be offloaded. The penalties, set_sampler, mixed, and top_p subtests assert that offload happened, so they fail on HIP. Skip them until TOP_K is supported on the ROCm backend.
Update tests/test-backend-sampler.cpp
Co-authored-by: Aaron Teo taronaeo@gmail.com
Update tests/test-backend-sampler.cpp
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
Signed-off-by: Aaron Teo aaron.teo1@ibm.com
aaron.teo1@ibm.com
ywu@xilinx.com
taronaeo@gmail.com
ggerganov@gmail.com
Website:
https://llama.app
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple S
