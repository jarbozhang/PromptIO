---
title: b10483
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10483'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-18T09:26:32.000Z'
fetched_at: '2026-08-18T11:03:43.218Z'
---
build : fix xcframework + cmake clean-up (#27304)
xcframework : fix build
mtmd : remove unused include path
vendor : use vendor::hash alias target in cmake
CMake reserves "::" in target names for imported/alias targets, so the real
Assisted-by: pi:llama.cpp/Qwen3.8-27B
vendor : add cmake targets for all vendored libs with vendor:: aliases
Add INTERFACE targets for the header-only vendor libs (miniaudio, nlohmann,
Consolidate the per-lib add_subdirectory calls into a single
hash: consumers now include via "hash/hash.h"; the vendor/hash dir is kept
Assisted-by: pi:llama.cpp/Qwen3.8-27B
readme : use foo/bar names in acknowledgements
Assisted-by: pi:llama.cpp/Qwen3.8-27B
ocd : fix valign
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
Ubuntu x64 (ROCm 7.14)DISABLED
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
