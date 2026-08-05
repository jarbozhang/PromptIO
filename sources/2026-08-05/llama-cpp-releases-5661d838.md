---
title: b10270
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10270'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T18:06:22.000Z'
fetched_at: '2026-08-05T11:02:22.093Z'
---
mtmd: support Qwen3-TTS (note: breaking change to llama-tts binary) (#26254)
convert text model
main model load ok
convert encoder ok
speaker encoder loading ok
speaker enc graph
adapt vocab for backbone (with some tricks)
add suppress_tokens
poc new mtmd gen api
convert code_predictor to gguf
load gen_code model ok
add clip_encode
wire up
code gen cgraph init version
Co-authored-by: Pascal admin@serveurperso.com
code2wav convert to gguf
code2wav graph ok
wire up in/out
(wip) subgraph
wire up
wip, correct code2wav
demo (to be removed)
code2wav preserve kv between calls
demo voice clone
llama: add llama_model_get_tok_embd
mtmd_helper_gen_audio API
fix clamp cold prefix
Co-authored-by: Pascal admin@serveurperso.com
fuse snake op
Co-authored-by: Pascal admin@serveurperso.com
demo: use proper sampling
update dev docs
polymorphism helper
revamp llama-tts binary
update docs
fix compile
fix lint
nits
add guide + docs
more timings info
clean up code comments
security fixes
update docs
use ggml_build_forward_select, clean up comments
fix ci
use ISO 639-1 language code
rename CODE2WAV --> GEN_WAV, update docs
clean up
clean up tts.cpp
add seq_id
add step_prompt()
mtmd_helper_model_can_chat
clean up comments
Co-authored-by: Pascal admin@serveurperso.com
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
openEuler aarch64 (910b, 
