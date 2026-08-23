---
title: v0.25.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.25.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-07-11T20:06:44.000Z'
fetched_at: '2026-08-19T11:02:41.677Z'
---
vLLM v0.25.0 Release Notes
Highlights
This release features 558 commits from 232 contributors (64 new)!
Model Runner V2 is now the default for all dense models (#44443). Building on quantized-model support from the previous release, MRv2 is now the standard execution path, with new support for EVS (#46535), realtime embeddings (#46762), prefix caching for Mamba hybrid models (#42406), multimodal-prefix bidirectional attention (#46942), and dynamic speculative decoding compatible with full CUDA graphs (#45953).
PagedAttention has been removed (#47361). The legacy attention implementation is deleted now that V1/MRv2 backends are the standard path.
The Transformers modeling backend is now as fast as native vLLM (#47187), and gained FP8 MoE support (#46820), CUDA graph + embed scaling fixes (#48010), and migration of GPTBigCode/Starcoder2 (#30966) and RoBERTa (#47452).
New models: LLaVA-OneVision-2 (#44785), Unlimited OCR (#46564, #47102), MOSS-Transcribe-Diarize (#47729), openai/privacy-filter (#41026), and Hy3 (#47192). GLM-5 / DeepSeek-V3.2 landed in the model zoo (#46808) with GLM-5.2 tuning, and MiniMax-M3 gained pipeline parallelism (#45810) and NVFP4 support (#46756).
New Streaming Parser Engine (#46610) — a unified tool-call/reasoning parsing framework, with a new Kimi k2.5/k2.6/k2.7 parser and ports of seed_oss (#46314) and DeepSeek V4 (#45877). The Rust frontend continues to mature with HTTPS/mTLS (#45890), a DP supervisor (#47076), and profiler control routes (#46306).
Universal speculative decoding for heterogeneous vocabularies (TLI) (#38174), plus new DSpark (#46995) and DFlash (#46770, #46853) drafters.
Model Support
New models: LLaVA-OneVision-2 (#44785), Unlimited OCR (#46564) with a Triton R-SWA backend (#47102), MOSS-Transcribe-Diarize (#47729), openai/privacy-filter (#41026), Hy3 with token-suffix and JSON Schema array support (#47192).
GLM-5 family: GLM-5 / DeepSeek-V3.2 added to the model zoo (#46808), GLM-5.2 FP32 gate (#47410), GLM MTP post-final
