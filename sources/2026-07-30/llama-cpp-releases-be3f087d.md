---
title: b10181
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10181'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-29T15:11:44.000Z'
fetched_at: '2026-07-30T11:02:44.288Z'
---
ggml-cuda : disable MMQ on devices with less than 48 KiB shared memory (#26141)
ggml_cuda_should_use_mmq() selects MMQ purely from the quantization
Disable MMQ when smpbo < 48 KiB so the caller falls back to the BLAS
Reproduced on a Moore Threads MTT S70 (arch mp_21, 28 KiB shared memory
$ llama-bench -m rwkv7-g1d-0.1b-Q8_0.gguf -p 128 -n 0
Only prefill (batch > 1) is affected; token generation is fine. After
Q8_0    pp128 1470.7 t/s, tg8 55.3 t/s   (was: abort)
This matches a -DGGML_CUDA_FORCE_CUBLAS=ON build (pp128 1464.2 t/s),
This is not MUSA-specific: any device with less than 48 KiB per-block
Co-authored-by: KakaruHayate KakaruHayate@users.noreply.github.com
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
