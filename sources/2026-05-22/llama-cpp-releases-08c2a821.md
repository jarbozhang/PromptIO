---
title: b9266
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9266'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-21T16:34:21.000Z'
fetched_at: '2026-05-22T00:18:34.629Z'
---
llama-graph: fix null-buffer crash in llm_graph_input_attn_kv_iswa for SWA-only models (#23131)
When a model has zero non-SWA attention layers (e.g. a SWA-only slice of Gemma 4),
The same scenario applies symmetrically: if a model had zero SWA layers, the SWA
Fix: guard both the base and SWA set_input calls with null/buffer checks, matching
Also fix can_reuse() in the same class to skip the ne[0] and kq_mask checks for
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
