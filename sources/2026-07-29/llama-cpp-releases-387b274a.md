---
title: b10172
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10172'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-28T19:29:10.000Z'
fetched_at: '2026-07-29T11:02:16.092Z'
---
ggml-webgpu: Fix some binding alias issues to support all archs, fix recurrent-state-rollback test (#25931)
Add overlap glu variant to support all archs, fix recurrent-state-rollback test
format
Fix all arch overlapped ranges
format
diagnose bus error on apple ci
More testing
more testing
more targeted testing
Fix bug in alignment for > 4gb buffer offsets
Fix bug in view offsets
Try avoiding multi_buffers
not fixed yet, more logging :(
Handle edge case in set_rows
Try looking at view source
Skip deepseek32 for now and clean up trace infrastructure
simplify skipping
last cleanup
actually final cleanup
update handling of overlap
format
try skipping other failing model
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
