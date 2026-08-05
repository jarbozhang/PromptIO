---
title: Release v5.14.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.14.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-07-15T19:02:19.000Z'
fetched_at: '2026-08-05T11:02:25.235Z'
---
Release v5.14.0
New Model additions
Inkling (fresh from Thinking Machines): 975B total, 41B active
Add Inkling model #47347 by @molbap @Cyrilvallez @eustlb and @zucchini-nlp

Inkling is a general-purpose multimodal model that accepts text, image and audio inputs and
TIPSv2

Links: Documentation
Add TIPSv2 (#46347) by @Ternura143 in #46347
TIPSv2 DPT

Links: Documentation
Add TIPSv2 (#46347) by @Ternura143 in #46347
🚨  Breaking changes
GPTNeoX now remaps embed_out to lm_head and GPTBigCode has _supports_attention_backend = True enabled for vLLM compatibility; users relying on the previous weight naming or attention backend behavior for these models should update their code accordingly.
🚨 Fix GPTBigCode and GPTNeoX for the Transformers modelling backend for vLLM (#47198) by @hmellor
Kernels
Several kernel-related fixes and improvements were made, including pinning the kernels dependency to a compatible version in the benchmark workflow, removing a deprecated package_name argument from LocalLayerRepository, and making the DeepGEMM Triton fallback more robust when CUDA_HOME is unset or misconfigured. Additionally, SDPA prefill was updated to leverage the FlashAttention kernel with StaticCache, yielding significant performance gains (up to 260% faster for large input sizes).
Pin kernels to compatible version in benchmark workflow (#47339) by @tarekziade in [#47339]
[Fix] Remove deprecated argument from kernels call (#47100) by @remi-or in [#47100]
[Fix] Make DeepGEMM triton fallback more robust (#47126) by @remi-or in [#47126]
[sdpa] Allow prefill to use FA kernel with StaticCache (#47094) by @Cyrilvallez in [#47094]
Generation
Generation improvements include adding Multi-Token Prediction (MTP) decoding support, static ensemble verification for speculative decoding to improve draft token acceptance rates, and a fix for crashes in greedy assisted generation with different tokenizers. A misleading double-negative warning message for synced_gpus in continuous batching mod
