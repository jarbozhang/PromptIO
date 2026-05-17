---
title: v0.21.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.21.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-05-15T08:54:45.000Z'
fetched_at: '2026-05-17T11:22:37.863Z'
---
Highlights
This release features 367 commits from 202 contributors (49 new)!
Transformers v4 deprecated: This release formally deprecates transformers v4 support (#40389). Users should migrate to transformers v5.
C++20 build requirement: vLLM now requires a C++20-compatible compiler for compatibility with PyTorch (#40380). This is a breaking build change.
KV Offload + Hybrid Memory Allocator (HMA): The KV offloading subsystem now integrates with the Hybrid Memory Allocator, including scheduler-side sliding window group support and full HMA enablement (#41228, #41445, #39571).
Speculative decoding with thinking budget: Speculative decoding now respects reasoning/thinking budgets, enabling correct spec decode for reasoning models (#34668).
TOKENSPEED_MLA backend on Blackwell: A new TOKENSPEED_MLA attention backend is available for DeepSeek-R1/Kimi-K25 prefill + decode on Blackwell GPUs (#41778).
Model Support
New architectures: MiMo-V2.5 (#40967), Laguna XS.2 (#41129, #41880), Moondream3 (#32325), Qianfan-OCR (#40136), Cohere MoE (#40817), Cohere Eagle (#42078).
Speculative decoding: EAGLE for Mistral (#41024), Gemma4 MTP (#41745), MTP for MiMo-V2.5 (#41905), Cohere Eagle (#42078).
DeepSeek V4: AMD/ROCm support (#40871), pipeline parallelism (#41694), max reasoning effort (#40982), disaggregated serving fixes (#41957).
Tool calling: Cohere reasoning and tool parsers (#40422), LFM2/2.5 tool parser (#39243).
Gemma3/Gemma4: hidden_act variant support (#40588), pipeline parallelism fix (#40786), MoE fixes (#41206, #41574, #41401), tool parser crash fix (#41991, #42188).
Model Runner V2: Qwen3.5/Mamba hybrid model support (#35520), logprob_token_ids support (#40559).
CUDA graph: ViT CUDA graph support for Qwen2.5-VL (#40830).
Compatibility: Vendor HCXVisionConfig for Transformers v5 (#38447), legacy rope_type checkpoint support (#41734).
Engine Core
KV offloading + HMA: Scheduler-side sliding window groups (#41228), full HMA enablement (#41445), multi-connector HMA (#39571
