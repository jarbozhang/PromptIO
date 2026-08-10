---
title: b10338
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10338'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-10T10:53:20.000Z'
fetched_at: '2026-08-10T11:02:38.622Z'
---
model-saver : fix expert shared/chunk FFN length key clobber (#26693)
The saver called add_kv with LLM_KV_EXPERT_SHARED_FEED_FORWARD_LENGTH twice, the
So a save->load roundtrip of any MoE model with a shared expert loses n_ff_shexp. On
Fix: the second call writes LLM_KV_EXPERT_CHUNK_FEED_FORWARD_LENGTH.
test-llama-archs: set expert_shared_feed_forward_length to a value distinct from n_ff
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
