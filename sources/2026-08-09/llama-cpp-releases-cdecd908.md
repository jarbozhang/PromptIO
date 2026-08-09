---
title: b10322
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10322'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-07T19:53:30.000Z'
fetched_at: '2026-08-09T11:01:56.130Z'
---
sycl: coalesce the ssm_conv window loads (#26612)
test-backend-ops perf -o SSM_CONV on an Arc Pro B70, interleaved A/B against
ne_a=[515,3328,1,1] ne_b=[4,3328,1,1]   n_t=512     97.68 -> 52.95   1.85x
llama-bench on qwen35 27B Q4_K - Medium (48 of its 64 blocks run ssm_conv),
-b 2048 -ub 2048  pp2048  1045.1 / 1043.5 / 1043.7 -> 1069.5 / 1066.3 / 1065.9  +2.2%
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
