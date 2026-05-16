---
title: b9158
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9158'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-14T23:25:51.000Z'
fetched_at: '2026-05-16T14:12:21.058Z'
---
HIP: RDNA3 mma FA, faster AMD transpose, tune AMD (#22880)
Adds RDNA3 support to the CUDA mma FA kernel. To make the RDNA3 tensor cores work with the FP16 accumulation for VKQ the tiles they need to be 32 logical units long in direction of the attention head; for head sizes 80 and 112 that are not exactly divided by 32 the regular length of 16 with FP32 accumulation is used instead. The longer tiles also enable more efficient transposition for a warp size of 32 which is why it's also used for RDNA4. However, this scrambles the data layout of the accumulators along the attention head dimension. To prevent accidental misuse I added another entry to ggml_cuda_mma::data_layout.
I also tuned the kernel parameters for RDNA3, RDNA4, and CDNA1 in general, during which I discovered that the kernel can be made to work for head sizes up to 256 for CDNA. For RDNA3/4 I was not able to get better performance that the tile kernel for head sizes > 128.
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
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
Windows x64 (CUDA 13) - CUDA 13.1 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
