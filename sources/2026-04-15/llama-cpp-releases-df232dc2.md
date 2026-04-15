---
title: b8788
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8788'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-14T16:50:21.000Z'
fetched_at: '2026-04-15T02:22:33.451Z'
---
cmake: fix CMP0194 warning on Windows with MSVC (#21630)
cmake: fix CMP0194 warning on Windows with MSVC
Set CMP0194 policy to NEW before project() call in ggml/CMakeLists.txt to suppress the "MSVC is not an assembler for language ASM" warning introduced in CMake 4.1.
The ggml project enables ASM globally for Metal (macOS) and KleidiAI (ARM) backends. On Windows/MSVC, no assembler sources are used, but CMake 4.1+ warns because cl.exe is not a valid ASM compiler.
This follows the same pattern used in ggml-vulkan (CMP0114, CMP0147).
Closes #20311
cmake: apply cisc's formatting suggestion
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
