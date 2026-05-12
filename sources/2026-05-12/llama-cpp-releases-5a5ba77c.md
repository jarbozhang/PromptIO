---
title: b9112
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9112'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-11T23:26:55.000Z'
fetched_at: '2026-05-12T11:42:46.902Z'
---
CUDA: handle OW > 65535 in im2col (2D and 3D) (#22944)
im2col_cuda and im2col_3d_cuda both dispatch with
block_nums.y = OW. CUDA caps grid Y at 65535. Conv1d encoders on
invalid configuration argument.
Clamp block_nums.y to MIN(OW, MAX_GRIDDIM_Y) and loop inside the
MAX_GRIDDIM_Y. Same in-kernel stride pattern
MAX_GRIDDIM_Z). Both 2D im2col_kernel
im2col_3d_kernel need the same fix. Bit-identical for
Tested on T4 / Jetson Orin with a SEANet encoder running on 11 s /
invalid configuration argument, post-fix runs to completion.
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
