---
title: b8972
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8972'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-29T16:29:39.000Z'
fetched_at: '2026-04-30T08:51:14.965Z'
---
ggml-cpu: cmake: append xsmtvdotii march for SpacemiT IME (#22317)
ggml-cpu: cmake: append xsmtvdotii march for SpacemiT IME
When GGML_CPU_RISCV64_SPACEMIT=ON is set, ime1_kernels.cpp contains
Error: unrecognized opcode vmadot v16,v14,v0', extension xsmtvdotii' required
Append _xsmtvdotii to MARCH_STR when GGML_CPU_RISCV64_SPACEMIT is
toolchain from https://www.spacemit.com/community/resources-download/Tools
Update ggml/src/ggml-cpu/CMakeLists.txt
Co-authored-by: alex-spacemit jinghui.huang@spacemit.com
Co-authored-by: alex-spacemit jinghui.huang@spacemit.com
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
