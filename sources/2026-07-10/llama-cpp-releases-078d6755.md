---
title: b9938
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9938'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-09T10:10:03.000Z'
fetched_at: '2026-07-09T23:01:51.338Z'
---
ggml-hip: enable -funsafe-math-optimizations (#24668)
CUDA is compiled with fast math and AMD/HIP is not — this flag lets AMD use fast math too.
We can't use -ffast-math: it implies -ffinite-math-only, which won't compile (ggml uses INFINITY for masking) and produces NaNs. -funsafe-math-optimizations gives the speedup without the NaN problems.
Co-authored-by: Mark Caldwell mark@cloudhands.ai
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
