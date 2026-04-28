---
title: b8952
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8952'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-27T22:52:41.000Z'
fetched_at: '2026-04-28T02:04:28.792Z'
---
server: (router) Forward form-data to model server (Fixes #22044) (#22118)
This commit enables the router to forward form-data to model server.
#22044 (enabling to use the /v1/audio/transcriptions in router mode)
Applied the suggestion from Copilots first comment: using the non-throwing json::parse overload.
Addressed Copilots third comment by extending the files representation to also include filename and content-type
Addressed Copilots fourth comment by making the RNG thread_local
Changed variable body from std::string to std::ostringstream in build_multipart_body
#22118 (comment)
Added sanitize_field lambda in build_multipart_body for key, filename and content_type
#22118 (comment)
explicitly checking if value/item is string before calling value/item.getstd::string()
#22118 (comment)
Added double quote to the sanitize lambda and throw on json parse failure
Co-authored-by: Ralph Paßgang ralph@trust-it.de
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
