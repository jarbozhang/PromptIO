---
title: b8843
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8843'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-19T11:34:49.000Z'
fetched_at: '2026-04-20T05:39:26.236Z'
---
cmake: remove CMP0194 policy to restore MSVC builds (#21934)
#21630 added the CMP0194 NEW policy to silence a CMake warning, but on Windows runners it caused CMake to prefer the MinGW toolchain for ASM and broke MSVC builds.
Reverting only that policy block restores the previous working behavior. The CMake 4.1+ warning comes back, but that is cosmetic and does not break any platform.
Reported-by: oobabooga
Refs: #21630
Co-authored-by: texasich texasich@users.noreply.github.com
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
