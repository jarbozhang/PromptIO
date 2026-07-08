---
title: b9931
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9931'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-08T21:13:12.000Z'
fetched_at: '2026-07-08T23:02:50.243Z'
---
opencl: ragged-tile MoE prefill FP16 GEMM optimization (skip padded expert tiles) (#25433)
opencl: ragged-tile MoE prefill GEMM (skip padded expert tiles)
The MoE prefill GEMM groups tokens into TILESIZE_N=32 per-expert tiles; at low
opencl: quarter-granularity ragged MoE tile-skip (8-col skip-groups)
Replace the two half-tile dotx16_reduce8 calls in the 8 *_f32_ns MoE GEMMs with
opencl: move ragged moe env var in cl_init
Co-authored-by: Li He lih@qti.qualcomm.com
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
