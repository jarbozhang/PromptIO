---
title: b8980
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8980'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-29T22:32:48.000Z'
fetched_at: '2026-04-30T08:51:14.964Z'
---
hexagon: make vmem and buffer-size configurable (#22487)
hexagon: allow host to set max vmem size
We use a sane default but it's helpful to allow for an override if needed.
hexagon: add support for measuring vmem space and move pinned mmaping management to host
hexagon: update vmem checks to use uint64
hexagon: bump op buffers to 16 (matches max mmaps)
hexagon: bump default vmem to 3.2GB
hexagon: add support for autodetecting vmem space and some logging cleanup in that area
hexagon: fix whitespace warnings
Update scripts/snapdragon/adb/run-cli.sh
Co-authored-by: Pascal admin@serveurperso.com
hex-adb: fix run-completion script
Co-authored-by: Pascal admin@serveurperso.com
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
