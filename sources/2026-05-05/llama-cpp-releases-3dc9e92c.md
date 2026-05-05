---
title: b9019
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9019'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-04T17:27:17.000Z'
fetched_at: '2026-05-05T09:52:05.926Z'
---
model: move load_hparams and load_tensors to per-model definition (#22004)
git-friendly migration
add build_graph
nits
exclude old code from build
wip
add llm_arch_model_i
prepare downstream functions
nits
nits
wip
wip
add back create_tensor_qkv
fix files missing include
enforce one llm_build per arch
cmake: use glob
missing model params
nits
wip
wip (2)
wip (3)
test-llama-archs is happy
improve switch case
move more stuff into llm_arch_model_i
fix downstream code
nits
nits (2)
fix order
llama_model_base
LLAMA_LOAD_LOCALS
small fix
fix build errors
auto
rm migration script and ifdef
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
