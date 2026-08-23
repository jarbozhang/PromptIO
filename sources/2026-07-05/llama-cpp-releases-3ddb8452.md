---
title: b9859
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9859'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-01T18:11:42.000Z'
fetched_at: '2026-07-04T23:02:17.128Z'
---
opencl: allow loading precompiled binary kernels from library (#23042)
opencl: allow loading binary kernel
opencl: add libdl.h
ggml-backend-dl is in ggml, which depends backend libs, thus
add libdl.h to break cyclic dep
opencl: allow loading bin kernel lib
opencl: load gemm_moe_mxfp4_f32_ns from kernel lib if available
opencl: load q8_0 gemm from kernel lib
opencl: load q4_0 moe gemm from kernel lib
opencl: load q4_1 moe gemm from kernel lib
opencl: load q4_k moe gemm from kernel lib
opencl: always declare get_adreno_bin_kernel_func_t
opencl: rephrase message
opencl: fix for rebase
opencl: update doc
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
