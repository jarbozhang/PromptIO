---
title: b9656
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9656'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-15T20:29:17.000Z'
fetched_at: '2026-06-16T06:32:44.988Z'
---
chat: harden peg-native tool call parsing (#24329)
chat: harden peg-native tool call parsing
accept an optional leading type: function field in
return a clean error and log the unparsed fragment on a final peg
keep the raw arguments string in func_args_not_string when it is not
chat: surface peg-native parse failures
a final peg parse failure threw the raw parser position and input. log
minimal change, no behavior change on successful parses.
chat: handle openai style tool calls in peg-native
nits
common: scope OpenAI wrapper grammar trigger via autoparser flag
chat: gate type:function parsing leniency on the analysis flag
Thread accept_openai_wrapper from the generator to build_json_tools_flat_keys
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
