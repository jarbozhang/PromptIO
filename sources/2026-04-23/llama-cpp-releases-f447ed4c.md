---
title: b8891
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8891'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-22T22:39:24.000Z'
fetched_at: '2026-04-23T02:22:01.028Z'
---
ggml-webgpu: Add fused RMS_NORM + MUL (#21983)
fused rms_norm_mul + mul
Add GGML_WEBGPU_DISABLE_FUSION for being able to disable kernel fusion.
Decouple num_fused_ops from webgpu_context; misc cleanup
Fix eps handling and remove disable_fusion.
Fix not to use c++20 initializers.
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
