---
title: v0.18.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.18.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-03-20T22:19:03.000Z'
fetched_at: '2026-04-16T06:07:15.494Z'
---
vLLM v0.18.0
Known issues
Degraded accuracy when serving Qwen3.5 with FP8 KV cache on B200 (#37618)
If you previously ran into CUBLAS_STATUS_INVALID_VALUE and had to use a workaround in v0.17.0, you can reinstall torch 2.10.0. PyTorch published an updated wheel that addresses this bug.
Highlights
This release features 445 commits from 213 contributors (61 new)!
gRPC Serving Support: vLLM now supports gRPC serving via the new --grpc flag (#36169), enabling high-performance RPC-based serving alongside the existing HTTP/REST interface.
GPU-less Render Serving: New vllm launch render command (#36166, #34551) enables GPU-less preprocessing and rendering, allowing separation of multimodal preprocessing from GPU inference.
NGram GPU Speculative Decoding: NGram speculative decoding now runs on GPU and is compatible with the async scheduler (#29184), significantly reducing spec decode overhead.
KV Cache Offloading Improvements: Smart CPU offloading that stores only frequently-reused blocks (#35342), plus FlexKV as a new offloading backend (#34328) and support for multiple KV groups in offloading spec (#36610).
Elastic Expert Parallelism Milestone 2: NIXL-EP integration (#35627) enables dynamic GPU scaling for MoE experts, with new --enable-ep-weight-filter CLI option (#37351) for faster EP model loading.
FlashInfer 0.6.6: Updated FlashInfer dependency (#36768) with numerous performance and correctness improvements.
Responses API Streaming Tool Calls: The OpenAI Responses API now supports tool/function calling with streaming (#29947).
Online Beam Search for ASR: Beam search support for encoder/decoder models both offline (#36153) and online transcriptions (#36160).
Ray No Longer a Default Dependency: Ray has been removed as a default dependency (#36170) — install it explicitly if needed.
Model Support
New architectures: Sarvam MoE (#33942), OLMo Hybrid (#32550), HyperCLOVAX-SEED-Think-32B VLM (#31471), HyperCLOVAX-SEED-Think-14B (#37107), Kimi-Audio-7B-Instruct (#36127), ColP
