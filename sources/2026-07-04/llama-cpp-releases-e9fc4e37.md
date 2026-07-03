---
title: b9866
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9866'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-03T14:22:18.000Z'
fetched_at: '2026-07-03T23:01:55.143Z'
---
cuda: enable topk-moe fusion for 288 experts (#25267)
cuda: enable topk-moe fusion for 288 experts
The topk-moe fusion only accepted power-of-2 expert counts (or the
288 is a multiple of the warp size, so the existing kernel already
Measured on gfx1151 with Step-3.7-Flash IQ4_XS (llama-bench,
test            | before         | after
Prompt processing is unaffected (the fusion only touches decode
Assisted-By: Claude Fable 5 noreply@anthropic.com
Update tests/test-backend-ops.cpp
Co-authored-by: Oliver Simons osimons@nvidia.com
Add comment for case 288 in topk-moe.cu
Co-authored-by: Oliver Simons osimons@nvidia.com
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
