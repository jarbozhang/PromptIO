---
title: b9626
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9626'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-13T18:20:52.000Z'
fetched_at: '2026-06-14T23:19:29.390Z'
---
Add arch support for cohere2-MoE (#24260)
Add arch support for cohere2-MoE
Removed redundant gating_func checks
Changed ffn lookup to prefer prefix_dense_intermediate_size
Renamed arch to cohere2moe
Removed redundant lmhead check and chat template changes
Removed lm_head.weight check from modify tensors, load output tensor not required, fallback to token_embd.weight
Changed to (routed+shared)*0.5 for shared expert combined avg
fixed sliding_window_pattern issue and pattern
Fixed transformers crash 'first_k_dense_replace' error
Remove comment
Removed cohere2-moe as a tokenizer type and kept as tiny_aya.  Renamed North-Mini-Code-1.0.
Fixed MTP fail, changed to use iSWA
Fixed remaining todos: cohere2moe renamed, changed swa parsing to use get_key_or_arr, removed extra get_arr use
Force metadata usage
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Remove Cohere2 checkpoint comment
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Remove MTP comment
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Regenerate cohere2moe tokenizer hash
Add cohere2moe to Llama Model Saver supported list
Check for zerobios tensors and add support for Command to use LayerNorm
Map expert_selection_fn to sigmoid in base.py instead of command.py
use bools for foundnorm/foundnormrms
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
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
openEuler x86 
