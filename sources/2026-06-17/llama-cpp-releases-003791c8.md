---
title: b9670
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9670'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-16T13:13:19.000Z'
fetched_at: '2026-06-17T03:04:07.740Z'
---
Fix and restrict NVFP4 edge-cases in llama-graph (#24331)
Move post-GEMM MUL required for dequant b4 lora and bias add
see #23484 :
For lora, I would presume we want fully dequantized values before
#8332
For ModelOPT, bias-add should happen on fully-dequantized



Restrict build_ffn for NVFP4 to supported combinations
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
