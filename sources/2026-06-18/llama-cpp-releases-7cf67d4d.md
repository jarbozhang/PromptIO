---
title: b9691
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9691'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-17T20:56:25.000Z'
fetched_at: '2026-06-18T08:58:00.978Z'
---
ggml-cpu: Conditionally enable power11 backend based on compiler support (#24687)
ggml: Conditionally enable power11 backend based on compiler support
Guard POWER11 backend creation behind a compiler flag check for -mcpu=power11. This avoids build failures on current GCC/Clang toolchains while preserving forward compatibility once POWER11 support becomes available.
Update CMakeLists.txt
ggml-cpu: Use -mcpu=power10 for P10 and P11
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
