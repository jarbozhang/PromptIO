---
title: b9731
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9731'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-19T21:56:05.000Z'
fetched_at: '2026-06-20T04:27:46.147Z'
---
server : optimize get_token_probabilities (#24796)
Use std::partial_sort to order only the requested top-n tokens instead
logprobs sort: vocab=128000 n_top=0 iters=100
full    sort:   8555.6 us/op
partial sort:    704.3 us/op


Signed-off-by: Adrien Gallouët angt@huggingface.co
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
