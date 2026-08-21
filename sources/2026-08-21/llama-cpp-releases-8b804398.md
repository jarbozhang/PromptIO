---
title: b10534
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10534'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-21T01:43:16.000Z'
fetched_at: '2026-08-21T11:02:30.229Z'
---
CUDA: adding switch points per HW and quant type to tune the mvq->MMQ decode crossover (#26079)
CUDA: runtime GGML_CUDA_MMVQ_MAX to tune the mvq->MMQ decode crossover
Add a runtime override of the mul_mat_vec_q -> MMQ batch crossover
The value is parsed once and clamped to [1, MMVQ_MAX_BATCH_SIZE], since
Added Blackwell specific switch point, to reduce dependence on runtime env var.
Add per-HW switch point values for DGX Spark and removing runtime env var
Adding switch points for Ada, tested on RTX 4090
Modifying DGX Spark numbers based on latest run and adding some comments and small functional changes relating to MoE
Reverting an unnecessary conditional
Update ggml/src/ggml-cuda/mmvq.cu
Co-authored-by: praneshgo 227579474+praneshgo@users.noreply.github.com
osimons@nvidia.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42022971
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
