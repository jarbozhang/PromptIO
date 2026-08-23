---
title: b9330
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9330'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-26T02:49:50.000Z'
fetched_at: '2026-05-27T01:18:58.668Z'
---
model: tag ffn_latent as MUL_MAT to fix buft probe (#23664)
ffn_latent_down/up are declared GGML_OP_MUL in LLM_TENSOR_INFOS but
Verified on Nemotron 3 Super 120B Q5_K_M: from 64.9 back to 103.22 t/s.
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
UI:
UI
