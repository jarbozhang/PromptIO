---
title: b9828
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9828'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-27T23:21:30.000Z'
fetched_at: '2026-06-28T23:01:56.592Z'
---
opencl: flash attention improvement (#25069)
opencl: rework FA kernel for f16 and f32
opencl: flash-attention prefill prepass kernels
flash_attn_kv_pad_f16    pads the tail KV tile to a BLOCK_N multiple
flash_attn_mask_pad_f16  pads the matching mask tile
flash_attn_blk_f16       classifies each KV tile per query block as
opencl: FA kernels for q4_0 and q8_0
opencl: set_rows for f32 to q8_0/q4_0
opencl: dequant kernels for q4_0 and q8_0
opencl: add FA tile tuning table with override
opencl: wire host side for FA
opencl: q4_0 MoE tensors are also SOA'ed
opencl: cosmetic fix
opencl: refactor, also clarify some code paths in comments
opencl: fix inifity for -cl-finite-math-only
Co-authored-by: Li He lih@qti.qualcomm.com
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
