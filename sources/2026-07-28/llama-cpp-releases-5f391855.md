---
title: b10148
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10148'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-27T11:16:55.000Z'
fetched_at: '2026-07-28T11:02:01.638Z'
---
common: fix explicit -md precedence over draft sidecar resolution (#26165)
common: fix explicit -md precedence over draft sidecar resolution
Follow-up of #25955, an explicit --model-draft file given with -hfd
An explicit draft file selection now disables the sidecar resolution,
common: apply the -hfd tag to the sidecar resolution
The sidecar selection was anchored on the primary of the draft plan,
The tag now anchors the sidecar directly: exact tag match first, then
common: promote speculative load logs from trace to info
Show the loaded draft model and the MTP draft context at the default
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
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
