---
title: b9833
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9833'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-28T15:34:10.000Z'
fetched_at: '2026-06-29T23:02:31.479Z'
---
chat : implement minicpm5 parser (#24889)
Add minicpm5 tool call parser
Refactor MiniCPM5 PEG parser per review feedback
Fix jinja min/max API to match Jinja2
modify by review
MiniCPM5: use autoparser for XML tool calls and fix grammar preserved-token triggers
MiniCPM5: fix streaming tool-arg placeholder and remove alt XML markers
skip min/max attribute tests in -py mode
test-jinja: use real expected output for min/max attribute tests
MiniCPM5: revert shared mapper and history fallbacks per review
Drop streaming tool-arg placeholder workarounds from the generic PEG
chat : refactor minicpm5 back to dedicated parser
cont : simplify grammar
cont : refactor
cont : fixes
cont : rename template to openbmb-MiniCPM5-1B.jinja
cont : add message delimiters
cont : fix tests
Co-authored-by: zhangtao zhangtao2@modelbest.cn
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
