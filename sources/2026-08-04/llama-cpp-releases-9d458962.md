---
title: b10256
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10256'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T06:41:04.000Z'
fetched_at: '2026-08-04T11:02:38.776Z'
---
sycl: parallelize the non-contiguous concat kernel (#25852)
sycl: parallelize the non-contiguous concat kernel
Launch geometry only: the non-contiguous concat kernel launched a single-lane
SYCL_CONCAT_BLOCK_SIZE is defined in ggml/src/ggml-sycl/presets.hpp.
llama-bench (Arc Pro B70, Qwen3.6-27B-UD-Q4_K_XL, -fa on, q8_0 KV),
sycl: cap non-contiguous concat block at ne0
sycl: make non-contiguous concat block width env-tunable (GGML_SYCL_CONCAT_BLOCK_SIZE)
Revert "sycl: make non-contiguous concat block width env-tunable (GGML_SYCL_CONCAT_BLOCK_SIZE)"
This reverts commit 2709909.
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
