---
title: b9769
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9769'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-23T11:45:34.000Z'
fetched_at: '2026-06-24T01:28:21.496Z'
---
vulkan: link ggml-cpu when GGML_VULKAN_CHECK_RESULTS / RUN_TESTS are enabled (#24444)
The result-checking and test debug paths in ggml-vulkan.cpp call ggml_graph_compute_with_ctx() to compute a CPU reference graph, but that symbol is defined in ggml-cpu, which ggml-vulkan does not link. Enabling -DGGML_VULKAN_CHECK_RESULTS=ON (or -DGGML_VULKAN_RUN_TESTS=ON) therefore fails to link with an unresolved external (e.g. LNK2019 on MSVC, undefined reference on GCC/Clang). This regressed after ggml-cpu was split into its own library. Link ggml-cpu under those two options so the debug builds link again.
Signed-off-by: Wyatt Caldwell 218154709+Detensable@users.noreply.github.com
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
