---
title: b9198
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9198'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-17T19:14:52.000Z'
fetched_at: '2026-05-18T00:50:45.898Z'
---
ggml-vulkan/CMakeLists: add a check for SPIRV-Headers (#22009)
ci/run: set explicit SPIR-V Headers search path for macOS vulkan CI
For whatever reason, the files are under additional sub-path
vulkan/ under the cmake directory, which does not match either
lib/cmake/SPIRV-Headers),
share/cmake/SPIRV-Headers).
This allows for SPIRV-Headers to be found, as currently the CI
ggml-vulkan/CMakeLists: add a check for SPIRV-Headers
This is installed by the project if it is built and installed.
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
