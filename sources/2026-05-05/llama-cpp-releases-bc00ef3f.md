---
title: b9016
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9016'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-04T08:14:49.000Z'
fetched_at: '2026-05-05T09:52:05.926Z'
---
docs : update speculative decoding parameters after refactor (#22397) (#22539)
docs : update speculative decoding parameters after refactor (#22397)
Update docs/speculative.md to reflect the new parameter naming scheme
#22397:
Replace --draft-max/--draft-min with --spec-draft-n-max/--spec-draft-n-min
Replace --spec-ngram-size-n/m with per-implementation variants
Add documentation for all new --spec-ngram-*- parameters
Update all example commands
Assisted-by: llama.cpp:local pi
pi : add rule to use gh CLI for GitHub resources
Assisted-by: llama.cpp:local pi
docs : run llama-gen-docs
arg : fix typo
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
