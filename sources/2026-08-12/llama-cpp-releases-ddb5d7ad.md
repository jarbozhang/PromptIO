---
title: b10362
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10362'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-11T22:59:42.000Z'
fetched_at: '2026-08-12T11:02:24.737Z'
---
tests : disable backend sampler hip multi output (#26878)
test-backend-sampler: skip multi_output_sampling_chain on HIP
The new multi_output_sampling_chain test uses top_k, whose backend probs
ci: keep gpu-rocm logs in a per-run dir keyed by GitHub run id
The self-hosted gpu-rocm runner can't upload logs to Azure blob (egress
test-backend-sampler: also skip multi_output_cpu on HIP
Like the other TOP_K-based subtests, multi_output_cpu's backend sampler
Co-authored-by: Jim Wu ywu@xilinx.com
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
Ubuntu x64 (ROCm 7.14)
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
