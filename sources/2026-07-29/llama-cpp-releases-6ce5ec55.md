---
title: b10171
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10171'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-28T18:55:40.000Z'
fetched_at: '2026-07-29T11:02:16.092Z'
---
opencl: skip the Adreno KQ/KQV image kernels for multi-stream batches (#26189)
The Adreno KQ/KQV image1d kernels (ggml_cl_mul_mat_kq_kqv_adreno) ignore
Route ne03/ne13 > 1 to the general path, which handles dim 3, and honor
Llama-3.2-1B-Instruct Q4_0, wiki.test.raw, 8 chunks, -ngl 99:
Adreno 740, default:            PPL 1817.64 -> 15.61
Adreno 740, -fa 0:              PPL 1941.64 -> 15.61
Adreno 840, -fa 0:              PPL 1943.90 -> 15.50
single-stream (-b 512) results unchanged (15.6090)
test-backend-ops -o MUL_MAT on 740: identical before/after (909 OK,
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
