---
title: b10016
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10016'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-15T09:14:17.000Z'
fetched_at: '2026-07-15T23:02:46.787Z'
---
[SYCL] Flash Attention with XMX engine via oneDNN (#25222)
[SYCL] F16 (default) Flash Attention with XMX engine via oneDNN graph API; Qwen3.6-27b-Q8_0 prefill speed up x1.21 at p=512 and x4.26 at p=80k
[SYCL] Address review on FA oneDNN path. Result: llama-bench---pp512; 32% increase with fa1; llama-perplexity---0.11% difference; tested model: mradermacher/Meta-Llama-3.1-8B-Instruct-Q8_0.gguf
PR-25222 revision v2: addressed audits
[SYCL] flash-attn oneDNN SDPA KV F16 rev 3.0: add BMG gate + multi-device sync. Narrow the scrope of this PR to Battlemage only (bmg; Xe2). Other archs (e.g., alchemist) fall back to existing FA kernel. When device_count >1, apply stream -> wait_and_throw(), validated working path for multi-gpu sync fix by @maxious.
Co-authored-by: maxious 81432+maxious@users.noreply.github.com
updated comment on bmg gate, noted the issue
Co-authored-by: scientist3 scientist.3@users.noreply.github.com
hmscider@users.noreply.github.com
81432+maxious@users.noreply.github.com
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
