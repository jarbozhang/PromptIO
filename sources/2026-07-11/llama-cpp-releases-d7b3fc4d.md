---
title: b9952
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9952'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-10T17:20:48.000Z'
fetched_at: '2026-07-10T23:02:34.306Z'
---
llama : make all KQ masks f16 if FA is used, remove zero attention bias, remove raw_k repeats in DeepSeek V4 (#25370)
llama : make all KQ masks (except the lightning indexer one) f16 if FA is used and remove zero attention bias in DeepSeek V4
llama : remove dead code that repeats unified raw_k cache for each stream in DeepSeek V4 - no longer needed as raw_k is always non-unified.
Co-authored-by: Stanisław Szymczyk sszymczy@gmail.com
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
