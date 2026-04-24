---
title: v0.20.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.20.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-04-23T21:02:03.000Z'
fetched_at: '2026-04-24T03:00:14.285Z'
---
vLLM v0.20.0
Highlights
This release features 546 commits from 257 contributors (83 new)!
CUDA 13.0 default: Default CUDA wheel switched to CUDA 13.0; architecture lists and build-args cleaned up (#39878). As a general rule of thumb, our CUDA version policy follows PyTorch's.
PyTorch 2.11 upgrade (#34644): vLLM ships on torch 2.11 for CUDA; XPU temporarily remains on torch-xpu 2.10 (#39656). This is a breaking change for environment dependency.
Transformers v5: vLLM now runs on HuggingFace transformers>=5 (landed in v0.19.1); v0.20.0 carries continued v4/v5 compat fixes including PaddleOCR-VL image processor max_pixels (#38629) and Mistral YaRN warning (#37292).
FlashAttention 4 as default MLA prefill: FA4 re-enabled as the default MLA prefill backend (#38819) with head-dim 512 and paged-KV support on SM90+ (#38835), plus an upstream FA4 sync (#38690).
TurboQuant 2-bit KV cache: New attention backend delivering 2-bit KV cache compression with 4× capacity (#38479).
Online quantization frontend: New end-to-end online quantization frontend (#38138), with docs (#39736); experts_int8 consolidated into the FP8 online path (#38463).
vLLM IR: Initial IR skeleton with rms_norm op (#33825), OOT-platform kernel imports (#38807), and gemma_rms_norm reworked on IR (#39014) — foundation for future kernel work.
Model Runner V2 advances: Eagle prefill full-CUDA-graph (#37588), auto-resolve cudagraph mode/sizes from attention backend (#32936), fused probabilistic rejection sample kernels (#38496), config validation for unsupported features (#38758), and piecewise-fallback disabled for eagle draft decodes (#39773).
MoE refactor series: Unquantized migrated to Full Oracle Flow (#36286), SharedExperts class (#35153), DefaultMoERunner split (#35326), ZeroExpertFusedMoE in new framework (#35549), compressed_tensors_moe.py split up (#38960), and MoE DP chunking removed (#39107).
Model Support
New architectures: EXAONE-4.5 (#39388), BharatGen Param2MoE (#38000), Phi-4-reasoning-vision-15B 
