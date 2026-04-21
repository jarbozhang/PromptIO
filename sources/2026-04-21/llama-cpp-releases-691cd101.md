---
title: b8858
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8858'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-20T21:05:15.000Z'
fetched_at: '2026-04-21T00:54:41.887Z'
---
ggml-cpu: Optimized x86 and generic cpu q1_0 dot (follow up) (#21636)
Implemented optimized q1_0 dot for x86 and generic
Removed redundant helper definition
Removed two redundant instructions from AVX q1_0 dot
Fixed inconsistency with fp16 conversion for generic q1_0 dot and deduplicated generic fallback
Style cleanup around AVX q1_0 dot
Replaced explicitly unrolled blocks with inner for loop for q1_0
Replaced scalar ARM q1_0 impl with new generic one
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
