---
title: v0.28.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.28.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-08-26T10:17:05.000Z'
fetched_at: '2026-08-26T11:02:30.212Z'
---
v0.28.0
Highlights
This release features 584 commits from 270 contributors (76 new)!
Kimi-K3 performance push: a major optimization effort for Kimi-K3 across the stack — Decode Context Parallel (DCP) support (#50484), fused FlashKDA decode and prefill kernels (#50654, #51311, #52458), SiTU activation support for MegaMoE (#50510), GEMM-RS for sequence parallelism (#52079), combined all-gathers with 1.5~3x kernel-level speedup (#51070), an adaptive speculative token budget delivering ~60% better DSpark TTFT (#51725), and optional shared-expert sharding saving ~17 GiB of memory per GPU (#50912). Kimi-K3 also now runs on ROCm with the V2 model runner (#51653).
DeepSeek V4: sparse MLA now works end-to-end for plain decode, MTP, and DSpark speculative decoding (#51538), joined by AMD Quark NVFP4 support (#47972), reasoning-effort prompts and mappings (#50580), sparse top-k metadata kernel optimizations (#52084, #51967), narrowed eager CUDA graph regions (#51430, #52401), and ROCm enablement on gfx11 and gfx950 (#47017, #52212).
Speculative decoding advances: DFlash2 with local convolution and a candidate selector (#52816), DSpark confidence-scheduled verification (#47808), and async scheduling auto-enabled for draft models (#48341).
Model Runner V2 maturation: E/P/D disaggregation (#38390), weight offloading (#51413), multi-layer MTP KV cache support (#50062), encoder CUDA graphs (#49852), decoder token-wise pooling (#50931) plus Transformers pooling models (#52425), attention-free models (#52374), and thinking_token_budget support (#46727).
Tiered KV cache offloading: disk offloading support (#49644), out-of-tree secondary tier managers via module_path (#51007), partial secondary-tier load results (#50321), tiering metrics (#48798), and a canonical CPU layout for parallelism-agnostic offload (#48414).
Rust frontend & gRPC: a standalone renderer (#50289), multimodal image inference over gRPC (#50368), explicit data-parallel rank routing (#51178), and RL lifecycle control 
