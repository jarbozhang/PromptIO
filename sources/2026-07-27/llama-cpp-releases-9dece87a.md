---
title: b10144
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10144'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-27T06:15:38.000Z'
fetched_at: '2026-07-27T11:02:23.369Z'
---
server + ui: fix stream routes for model names containing a slash (#26137)
server + ui: refactor resumable stream routes to query string conv_id
The conversation id can embed a model name containing slashes
server: move stream route docs to server-stream.h
Address review: ngxson wants the main server.cpp registration code kept
server: cancel a pending request when its stream is stopped during model load
The conversation was registered in the conv map only after the blocking
server + ui: resume a stream after a page reload during model load
A pending request died with the client socket when the page was
ui: show the model load progress again after a page refresh
The resume wait was invisible, so a conversation refreshed while its
fix CI
fix CI bis
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
