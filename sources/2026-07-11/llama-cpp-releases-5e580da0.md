---
title: b9946
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9946'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-09T22:22:02.000Z'
fetched_at: '2026-07-10T23:02:34.311Z'
---
hexagon: tiling, tracing and optimizations for unary ops (#25474)
hexagon: tile wide rows in pointwise unary ops to avoid VTCM overflow
unary: reject permuted tensors for now (not used by models)
hex-unary: replace divs with fastdiv
hex-unary: add vtcm layout and host computed kernel params
hex-unary: move fastdiv init into kernel params
hex-unary: add specialized thread functions to improve generated code
hex-unary: tracing instrumentation for unary ops
hex-unary: factor out hvx kernels, streamline and remove more duplication
ggml-hexagon: fix std::min collision with Windows min macro
hex-cmake: make lto build happy
Co-authored-by: Max Krasnyansky maxk@qti.qualcomm.com
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
