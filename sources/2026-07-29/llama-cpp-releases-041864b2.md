---
title: b10164
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10164'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-28T14:30:32.000Z'
fetched_at: '2026-07-29T11:02:16.093Z'
---
ggml-cuda: add chunked SSD matmul for Mamba-2 prefill acceleration (#22675)
ggml-cuda: add chunked SSD matmul for Mamba-2 prefill acceleration
cuda: added SSD CICD fixes for CUDA / HIP / MUSA / MSVC.
ggml-cuda: review comments fixed.
ggml-cuda: Fuse M matrix materialization into pre_matmul kernel and enabled test.
ggml-cuda: test updates and fixes
ggml-cuda: test updates to remove hardcoding of tensor initialise data limits.
ggml-cuda: ssd minor review comment fixed.
ggml-cuda: ssd minor CICD fixed.
CUDA SSD: Fixes correctness by promoting s0_stride_seq to int64_t, improves memory coalescing in ssm_ssd_prepare_dt_kernel, and boosts efficiency by merging B_weighted and C_scaled; also addresses prior review comments.
cuda: fix sdata read-write race in prepare_dt fallback scan loop
Website:
https://llama.app
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled) DISABLED
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 (OpenVINO)
Ubuntu x64 (SYCL FP32)
Ubuntu x64 (SYCL FP16)
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows arm64 (OpenCL Adreno)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows x64 (Vulkan)
Windows x64 (OpenVINO)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
