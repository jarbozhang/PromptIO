---
title: b10594
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10594'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-23T13:23:17.000Z'
fetched_at: '2026-08-24T11:02:45.147Z'
---
common : skip device_info loop if it's not going to be printed (#26692)
The device_info loop iterates over the discovered devices and gets
For this information to be used in any way, the log verbosity must
In certain cases the user may not want to use any GPU resources.
Fix by checking the verbosity level and skipping the loop if there
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42421792
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
