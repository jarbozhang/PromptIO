---
title: b9736
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9736'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-20T12:01:00.000Z'
fetched_at: '2026-06-21T03:19:14.777Z'
---
model : glm-dsa load DSA indexer tensors as optional (#24770)
GLM-5.2 ships the DSA "lightning indexer" on only a subset of layers (the
missing tensor 'blk.3.indexer.k_norm.weight'.
GLM_DSA's graph is llama_model_deepseek2::graph (plain MLA) and does not use
DeepSeek-V3.2 (uniform indexer on all layers) is unaffected.
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
