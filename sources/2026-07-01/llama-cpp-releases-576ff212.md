---
title: b9840
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9840'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-29T10:27:00.000Z'
fetched_at: '2026-06-30T23:02:35.718Z'
---
DeepSeek V4  (#24162)
convert: add dsv4 conversion
add basic setup
add llm_graph_input_dsv4
add save-load state
add sinkhorn eps - correction by @fairydreaming
add rope fix
cleanup dead code
fix bugs
support pro model: added by @fairydreaming
remove redundant V cache
Chat template
remove debugging leftovers
Add mechanism for inlining templates based on architecture
s/deepseek-v4-flash/deepseek4/g
s/deepseek-v4-flash/deepseek4/g continued
enable graph reuse
enable FA
fix test llama archs
rename
compatibility with antirez ds4 GGUFs
simplified set_gguf_parameters() by calling super class method, replaced moe.score_func with expert_gating_func.
reserve worst-case kv-cache
revert max split inputs
address review comments
add padding to enable FA
pad only the final value of plan.n_kv to 256
remove built-in cpp chat template
cont: remove cpp built-in template
rm outdated test
replace ggml_view_3d() with ggml_reshape_3d()
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
only support n_seq=1 for now
remove unused var
cont: remove unused var
use scale bias
use correct ptr for can_reuse
remove gen-chat-inline-templates.py
simplify graph reuse
cont: cleanup
remove unused inputs
enable partial checkpointing
add correct shape for kq_mask + set llama_model_n_swa to 0 for dsv4
precompute source_idx + add comment about dummy write
support multi-seq
remove restored_trim_pos
use split_equal when possible
fix indent
address review comments
use LLM_KV
fix ci
Co-authored-by: Piotr Wilkin piotr.wilkin@syndatis.com
sszymczy@gmail.com
son@huggingface.co
166155368+fairydreaming@users.noreply.github.com
ggerganov@gmail.com
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
Windows x64 (C
