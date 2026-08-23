---
title: v0.23.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.23.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-06-15T05:27:20.000Z'
fetched_at: '2026-06-20T04:27:47.775Z'
---
vLLM v0.23.0 Release Notes
Please note that Minimax M3 is not yet supported in this version. Please follow vLLM recipe for usage guides for M3.
Highlights
This release features 408 commits from 200 contributors (63 new)!
DeepSeek-V4 matures across backends: Following its introduction in v0.22.0, DeepSeek-V4 received another large hardening and optimization pass. Its sparse MLA metadata is now decoupled from DeepSeek-V3.2 (#44699), it gained a TRTLLM-gen attention kernel (#43827), EPLB support for the Mega-MoE (#43339), selective prefix-cache retention for sliding-window KV cache (#43447), and an index-share feature for DSA MTP (#44420). The model was also detached from torch.compile (#43746, #43891), its attention and RoPE paths were refactored (#44569, #44262, #43926), and an XPU attention decode path was added (#42953).
Model Runner V2 expands to more dense models: MRv2 is now selected by default for Llama and Mistral dense models (#43458) in addition to Qwen3. It gained a FlashInfer sampler (#42472), breakable CUDA graphs (#44050), pipeline-parallel bubble elimination (#42187), kernel block-size support for hybrid models (#38831), and Gemma 4 MTP (#43241).
Rust frontend grows up: The experimental Rust frontend added a streaming generate endpoint (#43779), dynamic LoRA endpoints (#43778), /version (#43854) and /server_info (#43942) endpoints, a server-router extension hook (#43774), request-ID headers (#43883), and many new tool parsers (InternLM2 #43481, hy_v3 #43872, Phi-4-mini #44213, Gemma4 #43850).
Gemma 4: Added encoder-free Gemma 4 Unified support (#44429) and Gemma 4 MTP (#43241), plus numerous accuracy and startup fixes.
Transformers v5 compatibility: vLLM now targets Transformers v5, with vendored MiniCPM-V/O processors (#44282) and compatibility fixes for Sarvam (#38804) and Voxtral (#44559).
Multi-tier KV cache offloading: The offloading framework gained an object-store secondary tier (#41968), HMA enabled by default for capable connectors (#41847), ti
