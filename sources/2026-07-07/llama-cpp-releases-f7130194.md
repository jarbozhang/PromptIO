---
title: b9885
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9885'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-06T11:06:21.000Z'
fetched_at: '2026-07-06T23:02:05.837Z'
---
ggml-cpu: Enable tiled matmul on AIX (#25199)
The matmul_tiled path uses large local stack buffers for A_pack and B_pack. On AIX this can trigger a segmentation fault, so reduce the buffer footprint there to keep the tiled path usable.
Performance Impact:
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
