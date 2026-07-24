---
title: v0.24.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.24.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-06-30T01:19:02.000Z'
fetched_at: '2026-07-24T11:02:34.011Z'
---
vLLM v0.24.0 Release Notes
Highlights
This release features 571 commits from 256 contributors (77 new)!
MiniMax-M3: Added support for the new MiniMax-M3 model (#45381), with a fast follow-on of BF16/FP8 indexer via MSA (#45892), MXFP4 support (#45896), FP8 sparse GQA (#45744), and extensive AMD/ROCm tuning — mxfp8 MoE/linear on gfx950 (#45725), fp8_per_channel for bf16 weights on MI300X (#45854), FP8 KV-cache fix (#45720), and packed-modules mapping (#45794). A MiniMax-M2 perf regression was also fixed (#45935).
DeepSeek-V4 keeps maturing: Following its debut, DeepSeek-V4 received another large optimization pass — a FlashInfer sparse index cache (2–4% TTFT) (#45863), prefill chunk-planning optimization (4% E2E throughput) (#45061), a cluster-cooperative topK kernel for low-latency (#43008), contiguous per-block KV allocations (#44577), TEP=16 for the block-FP8 shared expert (#46001), and native DSA indexer decode for next_n > 2 on SM100 (#45322). It is now enabled on SM120 alongside GLM-5.1 (#43477), with XPU (#44144, #44517, #45240) and ROCm (#44899, #45103, #45681) attention/MoE paths added.
Model Runner V2 (MRv2) continues to expand: MRv2 now supports quantized models by default (#44446), enables GraniteMoE by default (#45461), and gained migration of Qwen + DeepSeek-V2 MoE models (#42667), DFlash speculative decoding (#44586), and more accurate FP32 Gumbel sampling (#45996).
Streaming Parser Engine: A new streaming parser engine unifies tool-call/reasoning parsing across models, with parsers for Qwen3 (#45413), MiniMax-M2 (#45701), GLM-4.7/5.1/5.2 (#45915), and Nemotron V3 (#45755).
Diffusion LLMs: Added DiffusionGemma (#45163), including a CPU path (#45690) and structured-output guardrails for diffusion decoders (#45468).
WideEP / DeepEP v2: Integrated DeepEP v2 for expert parallelism (#41183), with follow-on robustness fixes (#46404, #46432).
Rust frontend matures further: Added API-key authentication (#44321), CORS (#45753), /tokenize + /detokenize (#44222), 
