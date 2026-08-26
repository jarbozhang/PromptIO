---
title: b10632
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10632'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-26T09:31:33.000Z'
fetched_at: '2026-08-26T11:02:28.534Z'
---
ggml-metal: add chunked SSD MMA for Mamba-2 prefill optimization (#26647)
metal: WIP chunked SSD SSM_SCAN kernels for multi-token prefill
metal: drop scalar SSD path; MMA + sequential tail
drop WIP ssm scan test noise
remove state_from_dst and rename CS and NSG constants
remove unrelated  added whitespace padding
added clarity to mma_tokens calculation
added clarity to use_mma bool checks
added comments to metal ssd op constants for clarity
reserve K tokens for sequential kernel rollback snapshots
reset concurrency between mma and seq tail
remove print args no longer used
fixed comment to no longer point to specific line
add FC_SSM_SCAN so seq path skips token offlset unless it's mma tail
added changes to new ssm.metal for rebase after ggml-metal.metal refactor
specialize ssm_scan tail with a template instead of a function constant
Co-authored-by: dpantaleoni dominikpantaleoni@gmail.com
690105611@qq.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/43085130
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
