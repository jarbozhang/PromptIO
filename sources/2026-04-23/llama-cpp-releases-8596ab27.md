---
title: b8888
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8888'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-22T22:11:02.000Z'
fetched_at: '2026-04-23T02:22:01.029Z'
---
sycl: Improve mul_mat_id memory efficiency and add BF16 fast path (#22119)
sycl: size mul_mat_id staging buffers by routed rows
Previously src1_contiguous/dst_contiguous in ggml_sycl_mul_mat_id were
sycl: add bf16 mul_mat fast path via DNNL
When src0 is BF16 (commonly the case for lm_head / output.weight), the
Add a bf16xbf16 -> f32 DNNL matmul fast path that uses the bf16 storage
gemm.hpp: map bfloat16 to dnnl::memory::data_type::bf16.
convert.{hpp,cpp}: expose ggml_get_to_bf16_sycl for f32/f16/bf16 -> bf16.
ggml-sycl.cpp: take the bf16 path early in ggml_sycl_op_mul_mat_sycl
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
