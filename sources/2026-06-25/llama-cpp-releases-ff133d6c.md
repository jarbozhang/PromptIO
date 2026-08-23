---
title: b9780
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9780'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-24T10:21:03.000Z'
fetched_at: '2026-06-25T07:41:36.959Z'
---
vulkan: fail the build when a shader fails to compile (#24450)
vulkan-shaders-gen: fail the build when a shader fails to compile
vulkan-shaders-gen did not detect shader-compile subprocess failures, so a
Return the child exit code from execute_command() (WEXITSTATUS on POSIX,
Fixes #24393
Signed-off-by: liminfei-amd 91481003+liminfei-amd@users.noreply.github.com
vulkan-shaders-gen: simplify compile_failed access and drop unreachable return
Address review feedback on #24450:
Access the std::atomic compile_failed directly (= / implicit bool)
Remove the unreachable trailing return -1 in execute_command(): on POSIX the
Signed-off-by: liminfei-amd 91481003+liminfei-amd@users.noreply.github.com
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
