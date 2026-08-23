---
title: b10361
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10361'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-11T17:14:55.000Z'
fetched_at: '2026-08-12T11:02:24.737Z'
---
model : fix SWA not being enabled for EXAONE 4.5 (#26848)
model : fix SWA not being enabled for EXAONE 4.5
load_arch_hparams tests hparams.n_layer() == 64 before
n_swa is still filled in by the unconditional get_key below the block, so
This affects the official LGAI-EXAONE GGUF release as well. EXAONE 4.0 has
model-loader : skip TENSOR_SKIP tensors in the metadata-only path
create_tensor asserts on a null buffer type when building from metadata
The file-backed path below already returns nullptr for the same tensors, so
tests : cover exaone4 hparams ordering
Builds a synthetic exaone4 model with the layout the shipped EXAONE 4.5
Fails before the ordering fix with "swa_type is not STANDARD", passes after.
Revert "tests : cover exaone4 hparams ordering"
This reverts commit d2f3baf.
Revert "model-loader : skip TENSOR_SKIP tensors in the metadata-only path"
This reverts commit aecb9bc.
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
