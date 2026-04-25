---
title: b8922
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8922'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-24T19:59:39.000Z'
fetched_at: '2026-04-25T09:06:14.622Z'
---
ggml-webgpu: enable FLASH_ATTN_EXT on browser without subgroup matrix  (#22199)
ggml-webgpu: add tile flash attention fallback
ggml-webgpu: add new fields and discard usage of mnk for tile version
ggml-webgpu: modify the vec path to discard the mnk parameter
ggml-webgpu: enable flash attention vec and tile version for broswer
ggml-webgpu: stagging KV for flash attention tile version
formatting
turn on subgroup uniformity check
remove Q_TILE as it is always 1 for vec path
make row_max and exp_sum to local register
make different bindings with same underlying buffer to have the same usage flags
move path selection into the shader library and have the host consume a single flash-attn decision object.
turn off skip_validation and address buffer overlapping when nwg==1
formatting
merge binding when kv overlap
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
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
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.1 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
