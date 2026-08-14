---
title: b10427
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10427'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-14T08:15:51.000Z'
fetched_at: '2026-08-14T11:02:19.878Z'
---
sycl: fuse mul_mat(gate) + mul_mat(up) + GLU for q4_K dense FFN (#26779)
Measured on Arc Pro B70 (Battlemage, Level Zero), llama-bench -r 20, two
qwen2.5-3B-Instruct Q4_K_M    154.18 -> 158.53 t/s   +2.8%
gemma-2-2b-it Q4_K_M          162.45 -> 165.62 t/s   +2.0%


llama-batched-bench on qwen2.5-3B, S_TG by batch size:
  B=1   142.72 -> 147.57 t/s    +3.4%
  B=2   243.72 -> 268.26 t/s   +10.1%
  B=4   359.58 -> 398.02 t/s   +10.7%
  B=8   449.75 -> 505.63 t/s   +12.4%



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
