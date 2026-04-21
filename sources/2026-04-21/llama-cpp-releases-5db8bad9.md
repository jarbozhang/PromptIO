---
title: b8860
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8860'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-20T21:31:01.000Z'
fetched_at: '2026-04-21T00:54:41.886Z'
---
Tensor-parallel: Fix delayed AllReduce on Gemma-4 MoE (#22129)
Fix delayed AllReduce on Gemma-4 MoE
Skip forward past nodes that don't consume the current one, and allow a chain of MULs.
Check for all sources before skipping nodes
Address review comments
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
