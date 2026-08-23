---
title: b9923
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9923'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-08T15:28:03.000Z'
fetched_at: '2026-07-08T23:02:50.256Z'
---
server-stream: follow-up on SSE Replay Buffer (#23226) (#25047)
server-stream : pimpl
server-stream: prefix free functions with server_stream_
address review from ggerganov: scope the public stream functions under the
server-stream: guard session and manager state with the mutex
address review from ggerganov: make done, completed_ts and the GC running flag plain members under their
server-stream: trim comments to the non-obvious
address review from ggerganov: drop comments that restate the code, keep the
server-stream: update dev docs for the pimpl and prefix
reflect server_stream_session_manager_start/stop and the server_stream_ prefix,
server-stream: move stream traces to debug level
keep the bring-up traces for diagnostics but off the default log: skip
server-stream: align router stream resume proxy trace with upstream
the child-side bring-up traces are already SRV_TRC on master, move the
server-stream: move stream_read_status enum to the cpp
it is only used by the hidden session and consumer types, so it belongs
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
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
