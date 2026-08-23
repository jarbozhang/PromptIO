---
title: b10255
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10255'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T05:40:54.000Z'
fetched_at: '2026-08-04T11:02:38.777Z'
---
Extended SYCL oneDNN SDPA to non-FP16 KV caches (Q4_0–Q8_0 and FP32) (#25874)
sycl: extend oneDNN SDPA to Q4_0-Q8_0 and F32 KV caches
Extends the oneDNN SDPA path (PR #25222) to handle non-F16 KV caches by
Supported KV types:
Q4_0, Q4_1, Q5_0, Q5_1, Q8_0: to_fp16_sycl / to_fp16_nc_sycl
F32: cont_to_f16_sycl
BF16 and IQ types are excluded (no conversion kernel available)
Gate: non-F16 requires K >= 1024 and Q >= 32 (prefill only).
Also includes the stream sync fix (stream->wait_and_throw() unconditional,
#25741 by @malsbat) and removal of V_is_K_view aliasing (K and V are
Co-Authored-By: Claude noreply@anthropic.com
docs: drop GGML_SYCL_FA_DEBUG from SYCL.md (not shipped in this PR)
noreply@anthropic.com
Co-authored-by: Claude noreply@anthropic.com
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
