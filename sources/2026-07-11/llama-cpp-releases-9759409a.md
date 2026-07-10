---
title: b9948
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9948'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-10T07:45:46.000Z'
fetched_at: '2026-07-10T23:02:34.310Z'
---
ggml : process data in smaller chunks in CUDA ggml_top_k() and ggml_argsort() to reduce temporary buffers memory usage (#24776)
ggml : process data in smaller chunks in CUDA ggml_top_k() implementation to reduce temporary buffers memory usage
ggml : allocate tmp_dst only only once before the loop
chore : whitespaces
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
ggml : use chunked processing in both CUDA CUB top-k and argsort implementations
chore : separate argsort_f32_i32_cuda_bitonic() call from return statement
Co-authored-by: Johannes Gäßler johannesg@5d6.de
chore : replace ternary operators with min/max
Co-authored-by: Stanisław Szymczyk sszymczy@gmail.com
ggerganov@gmail.com
johannesg@5d6.de
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
