---
title: b9756
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9756'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-22T09:34:04.000Z'
fetched_at: '2026-06-23T01:36:14.640Z'
---
server: fix edit_file crash on append at end of file (line_start -1) (#24893)
line_start -1 normalized to n+1, so append inserted at lines.begin() + n + 1,
Normalize -1 to n (insert at end()), restrict -1 to append mode and reject it
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
