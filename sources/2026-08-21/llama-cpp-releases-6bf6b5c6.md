---
title: b10537
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10537'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-21T02:23:40.000Z'
fetched_at: '2026-08-21T11:02:30.228Z'
---
CI: Use LLVM's OpenMP over MSVC_DEBUG_non_redist on Windows (#26678)
CI: Use LLVM's OpenMP over MSFT_DEBUG_non_redist on Windows
Currently, we ship the non-redist debug version of microsoft's libomp.
Remove LLVM SHA from job name to increase legibility
Add temp validations to CI
Revert "Add temp validations to CI"
This reverts commit eef97c8.
Build OpenMP in CI
Make OpenMP fetch self-contained in cmake and cache in CI
Robustify Licens-packaging
Ship OpenMP license, not LLVM's.
Invalidate cache also on checksum of the license
Remove stale reference in docs/build.md
No longer package base license in release
This was scope-creep
Add explanatory comment to OpenMP license
Remove arm64 smoke
Forgot this during conflict resolution during rebase of
c54c0e9
Remove GGML_OPENMP_FETCH_CACHE_DIR as requested by @CISC
whitespace changes
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42028077
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
