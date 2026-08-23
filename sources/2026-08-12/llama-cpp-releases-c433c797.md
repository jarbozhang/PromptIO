---
title: b10356
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10356'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-11T02:47:58.000Z'
fetched_at: '2026-08-12T11:02:24.737Z'
---
ci : target ROCm 7.14 for build and release (#25775)
Switch ROCm from 7.2.1 to 7.14
ROCm 7.14 is the first production release using TheRock build system.
Adjust ROCm targets for Linux and Windows to use this instead.
ci: switch all other Windows ROCm jobs to ROCm 7.14 wheels
Move the shared windows-setup-rocm composite action from the HIP SDK PRO
Also migrate the build-cuda-windows.yml hip job to the same wheel-based
Website:
https://llama.app
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
