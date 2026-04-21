---
title: b8853
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8853'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-20T12:12:03.000Z'
fetched_at: '2026-04-21T00:54:41.887Z'
---
[SYCL] Fix reorder MMVQ assert on unaligned vocab sizes (#22035)
[SYCL] Fix reorder MMVQ assert on unaligned vocab sizes
The reorder mul_mat_vec_q dispatchers for Q4_0, Q8_0, Q4_K, and Q6_K
I replaced the assert with padding: block_num_y now rounds up to a
if (row >= nrows) return;) so the extra padded
For aligned vocab sizes the padded block_num_y equals the old value,
Thanks to @arthw for flagging the relationship to #21527.
Fixes #22020.
AI assisted coding, tested on Intel B70 hardware.
sycl: use WARP_SIZE for num_subgroups in reorder MMVQ launches
Replaces the hardcoded 16 with WARP_SIZE in the four reorder_mul_mat_vec
@NeoZhangJianyu on #22035.
Assisted by Claude.
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
