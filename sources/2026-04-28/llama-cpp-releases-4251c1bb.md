---
title: b8943
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8943'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-27T05:57:19.000Z'
fetched_at: '2026-04-28T02:04:28.795Z'
---
common: fix missing exports in llama-common (#22340)
common: refactor common/debug to move abort_on_nan into base_callback_data
Passing bool abort_on_nan as template parameter for common_debug_cb_eval is unnecessary and creates an issue with LTO.
cont : cleanup
common : use pimpl in debug.h to reduce header dependencies
Move common_debug_cb_user_data's data members (std::regex,
This removes the includes of common.h and  from debug.h,
Assisted-by: llama.cpp:local pi
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
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
