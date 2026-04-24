---
title: b8906
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8906'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-23T23:15:01.000Z'
fetched_at: '2026-04-24T03:00:13.434Z'
---
server: (anthropic API) fix prefix caching (#21793)
When testing claude code against llama.cpp, I noticed that only
slot update_slots: id  3 | task 10342 | old: ... ; cch= | defa0;You are
slot update_slots: id  3 | task 10342 | new: ... ; cch= | 1c8b4;


I observed that the cch value changed every time. Reading about that,
I'm treating this as an anthropic message body API detail - I think this
It's always 5 hexadecimal characters, but I've written the replacement
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
