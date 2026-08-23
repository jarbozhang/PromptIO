---
title: b10584
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10584'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-22T15:07:40.000Z'
fetched_at: '2026-08-23T11:02:23.173Z'
---
fit: also take into account n_streams (#27496)
fit: also take into account n_streams
server: make the draft context follow the target context
With a non-unified KV cache the target context now holds n_ctx_train
The draft context now takes its size from the target context, so both
The memory reserved for the draft model before fitting is measured at
fit: take an optional second model into account
Illustrates the alternative discussed on the draft context fix. The
common_fit_params now takes an optional second model that shares the
This drops the reservation block in the server, which no longer has to
Co-authored-by: Pascal admin@serveurperso.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42330023
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
Ubuntu x64 (ROCm 7.14)
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
