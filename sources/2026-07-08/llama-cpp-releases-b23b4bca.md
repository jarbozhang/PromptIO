---
title: b9893
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9893'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-07T03:39:45.000Z'
fetched_at: '2026-07-07T23:02:20.474Z'
---
opencl: general flash attention decode performance optimizations (#25366)
opencl: vec flash-attention decode kernels for f16/q8_0/q4_0 KV
opencl: improve non FA KQ mv kernels
opencl: tweaks for multiquery FA
opencl: some tweaks for FA q1 kernels
opencl: FA with DK=DV=512 for gemma-4
opencl: various fixes
opencl: cleanup
opencl: fix FA decode crash for DK=512 (gemma-4)
The DK=512 decode-only program does not create the f32_f16 prefill
opencl: run DK=512 FA decode on CPU
DK=512 decode is bandwidth-bound and faster on the CPU than the GPU,
opencl: compile MQ_GQA=8 FA kernels in a minimal program
The full program compiled with -D MQ_GQA=8 runs the Adreno compiler out
opencl: remove stray token in flash_attn_f32_f16.cl
A stray "." broke the f32_f16 program build.
opencl: split f16-KV FA decode finer (FD_KV_PER_SPLIT_F16)
The 2048 default under-fills the GPU on single-query f16-KV decode;
Co-authored-by: Li He lih@qti.qualcomm.com
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
