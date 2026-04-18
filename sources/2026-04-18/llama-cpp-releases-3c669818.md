---
title: b8824
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8824'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-17T01:22:18.000Z'
fetched_at: '2026-04-18T02:24:42.482Z'
---
hexagon: optimize HMX matmul operations (#21071)
optimize hmx_mat_mul functions by calculating row and column tiles upfront
refactor core_dot_chunk_fp16 to use size_t for tile counts and improve readability
wip
set scale outside of loop
wip
refactor core_mma_chunk_fp16 and mat_mul_qk_0_d16a32 to use size_t for tile counts
wip
wip
refactor transfer_output_chunk_fp16_to_fp32 to use size_t for dimensions
refactor core_dot_chunk_fp16 to use size_t for tile row stride calculation
wip
refactor hmx_mat_mul functions to use hvx_vec_splat_f16 for column scales initialization
refactor hmx_mat_mul_permuted_w16a32_batched to streamline scale setting and locking
refactor core_dot_chunk_fp16 to improve tile stride calculations for output
refactor hmx_mat_mul functions to use Q6_V_vsplat_R for column scales initialization
fix compiling error
wip
optimize row and column tile indexing in core_mma_chunk_fp16 function
wip
Revert "wip"
This reverts commit cde679e.
Add size limit check for HAP_mmap in htp_iface_mmap and drop_mmap functions
wip
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
