---
title: b9982
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9982'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-13T01:30:04.000Z'
fetched_at: '2026-07-13T23:03:07.160Z'
---
server: honour per-request reasoning_budget_tokens in chat completions (#23116)
server: honour per-request reasoning_budget_tokens in chat completions
The reasoning-budget block in oaicompat_chat_params_parse read only the
Fix: read reasoning_budget_tokens from the request body first, so the
Add a unit test in test-chat.cpp that exercises this path via
server: honour per-request reasoning_budget_message in chat completions
The reasoning-budget block in oaicompat_chat_params_parse wrote
This mirrors the reasoning_budget_tokens bug fixed in the previous commit.
Fix: read reasoning_budget_message from the request body first, falling
While here, collapse the adjacent reasoning_budget_tokens override to a
Add a unit test in test-chat.cpp that exercises this path via
cleanup
Co-authored-by: Xuan Son Nguyen son@huggingface.co
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
