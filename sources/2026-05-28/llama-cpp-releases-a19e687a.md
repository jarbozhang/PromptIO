---
title: b9370
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9370'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-27T18:25:30.000Z'
fetched_at: '2026-05-28T03:17:07.522Z'
---
hexagon: add support for Q4_1 in MUL_MAT and MUL_MAT_ID (#23647)
hex-mm: add support for Q4_1 matmul/matvec, hvx-only for now
hmx-mm: add support for Q4_1
hex-mm: use Q8_1 dynamic quantization to avoid having to compute sums in the vec_dot
hexagon: fix repack scratch buffer overflow
hex-mm: fix Q4_1 repack buffer sizing
hexagon: flip the build order for mm and fa (seems to help LTO)
hex-mm: add vec_dot 4x1s and minor HMX cleanup after adding Q4_1
hex-mm: fix fp16 vec_dot fallback to 2x1 and another issue that could cause incorrect output
hexagon: resurrect early-wake and add support for polling for op-batch completions
With Q4_1 ggml-hexagon now claims pretty much the entire graphs which gives the CPU more time to chilax.
Co-authored-by: Todor Boinovski todorb@qti.qualcomm.com
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
Ubuntu x64 (SYCL FP32) DISABLED
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL) DISABLED
Windows x64 (HIP)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
