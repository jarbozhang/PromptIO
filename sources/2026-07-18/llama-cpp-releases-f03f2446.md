---
title: b10057
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10057'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-17T10:24:35.000Z'
fetched_at: '2026-07-17T23:01:56.058Z'
---
sycl: fix row calculation when K_QUANTS_PER_ITERATION is 1 (#25690)
sycl: fix incorrect row calculation when K_QUANTS_PER_ITERATION=1
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: use K_QUANTS_PER_ITERATION for non-reordered Q5_K kernel
This is the only Q5_K kernel that was not using KQPI.
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: add missing second half processing to reordered q5_k
Error found while running
GGML_SYCL_PRIORITIZE_DMMV=1 
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: fix potential off-by-one error
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
sycl: fix missing row > nrows check
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
Signed-off-by: Todd Malsbary todd.malsbary@intel.com
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
