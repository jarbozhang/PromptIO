---
title: b10254
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10254'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T04:55:13.000Z'
fetched_at: '2026-08-04T11:02:38.777Z'
---
chat : add new template for DeepSeek V4 Flash 0731 (#26398)
common/chat: update DeepSeek V4 templates
Align the DeepSeek V4 templates with the official encoders while keeping parser behavior out of this change.
Default drop_thinking for DeepSeek V4 history so prior thinking is omitted unless preserve_reasoning is requested or tools are present.
Add structured output response-format instructions to the V4 templates and pass the schema into template rendering.
Add a separate Flash 0731 template for the updated high and max reasoning effort mapping.
Cover reasoning effort, drop_thinking, structured output prompts, preserved reasoning, continuations, and empty tool arguments in template rendering tests.
Official references:
https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/main/encoding/encoding_dsv4.py
https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731/blob/main/encoding/encoding_dsv4.py
Assisted-by: Codex
Fix deepseek v4 0731 template selection
remove unneeded lower normalization
Fix DSML parser to consume the tool call separator
address aldehir requests
address aldehir comment
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
