---
title: b9745
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9745'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-21T11:40:21.000Z'
fetched_at: '2026-06-22T04:13:29.943Z'
---
spec : Support Step3.5/3.7 flash mtp3 (#24340)
add mtp_layer_offset + include nextn flags in graph reuse
add llama_set_mtp_layer_offset + llama_model_n_nextn_layer API
offset head select + require all MTP blocks
speculative multi-head process()
speculative multi-head draft()
gather outputs via inp_out_ids
cleanup
fix core
minor cleanup
merged draft_multi_head into draft()
mtp rename nextn
Apply suggestions from code review
Co-authored-by: Aman Gupta amangupta052@gmail.com
clean-up comments
fix for multi seq
apply suggestions && chain-heads comment
add a reference for chain_heads discussion
Co-authored-by: Aman Gupta amangupta052@gmail.com
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
