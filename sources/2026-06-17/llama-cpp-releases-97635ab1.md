---
title: b9664
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9664'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-16T08:11:18.000Z'
fetched_at: '2026-06-17T03:04:07.741Z'
---
sycl: support reordered Q4_K/Q5_K/Q6_K MoE MUL_MAT_ID (#24452)
sycl: support reordered Q4_K and Q5_K MoE MUL_MAT_ID
Extend reordered-weight handling to fused MoE MUL_MAT_ID for Q4_K and Q5_K expert tensors and add Q5_K reordered DMMV coverage. Unsupported 3D reorder cases now fall back instead of aborting.
sycl: extend MoE reorder to Q6_K mul_mat_id
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
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows x64 (Vulkan)
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
