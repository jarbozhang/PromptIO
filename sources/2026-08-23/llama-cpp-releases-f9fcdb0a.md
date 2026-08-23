---
title: b10587
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10587'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-22T20:13:41.000Z'
fetched_at: '2026-08-23T11:02:23.166Z'
---
vulkan : added the PAD_REFLECT_1D operation (#26586)
vulkan : added PAD_REFLECT_1D operation
Implemented the GGML_OP_PAD_REFLECT_1D operation for the Vulkan backend
Changes:
pad_reflect_1d.comp: implemented the GLSL compute shader with reflection logic
vulkan-shaders-gen.cpp: register the shader for SPIR-V compilation
ggml-vulkan.cpp: pushed constants struct, pipeline creation,
Tested the PAD_REFLECT_1D on Intel Iris Xe (Vulkan 1.4, Mesa 25.2.8):
Correctness:
All test are passed
Performance:
Update ggml/src/ggml-vulkan/vulkan-shaders/pad_reflect_1d.comp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42354333
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
Ubuntu x64 (ROCm 7.14)
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
Windows arm64 (CUDA 13) (preview) - CUDA 13.4 DLLs
Windows x64 (Vulkan)
Windows x64 (OpenVINO)
Windows x64 (SYCL)
Windows x64 (ROCm 7.14)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
