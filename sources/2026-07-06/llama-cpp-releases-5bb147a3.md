---
title: b9876
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9876'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-05T18:30:46.000Z'
fetched_at: '2026-07-05T23:02:32.926Z'
---
ggml : fix tensor-parallel + -ncmoe crash on MoE models (#25028)
Tensor parallelism (-sm tensor) combined with -ncmoe (CPU-offloaded MoE
The failing tensor is the MoE router output (ffn_moe_topk): it is mirrored
Move the split-state lookup above the assert and allow the mirrored case in
Diagnosis credit to the reporter (@nathanmp).
Fixes #24886
Signed-off-by: liminfei-amd 91481003+liminfei-amd@users.noreply.github.com
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
