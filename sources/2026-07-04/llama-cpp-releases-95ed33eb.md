---
title: b9862
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9862'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-03T09:42:59.000Z'
fetched_at: '2026-07-03T23:01:55.159Z'
---
Remove redundant CUDA copies after gated_delta_net. (#23940)
Remove redundant CUDA copies after gated_delta_net.
Currently, GDN writes recurrent state snapshots into its output tail, then the graph immediately copies those snapshots into ssm_states_all. With MTP draft length 3, target decode uses K=4, so that becomes 4 extra ggml_cuda_cpy calls.
The change detects that gated_delta_net -> view -> cpy pattern and makes the CUDA GDN kernel write the state snapshot(s) directly into the recurrent cache, skipping the intermediate tail writes and copy kernels when safe.
Address review comments
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
