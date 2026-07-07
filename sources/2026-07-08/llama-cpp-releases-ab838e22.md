---
title: b9901
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9901'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-07T16:43:18.000Z'
fetched_at: '2026-07-07T23:02:20.469Z'
---
sycl : set K_QUANTS_PER_ITERATION to 1 on DMMV path (#25063)
sycl: add supported types to ggml_sycl_supports_reorder_dmmv
The reordered feature is implemented in ggml_sycl_op_dequantize_mul_mat_vec,
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: set K_QUANTS_PER_ITERATION=1 to improve utilization
When combined with opening the reorder gate, this improves GPU
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: replace QK_WARP_SIZE with WARP_SIZE for QK_5
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: add missing types to ggml_backend_sycl_buffer_init_tensor
Without this, the extra field is not allocated and the reorder path
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
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
