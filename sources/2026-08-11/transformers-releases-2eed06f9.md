---
title: 'Release: v5.15.0'
url: 'https://github.com/huggingface/transformers/releases/tag/v5.15.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-08-10T10:28:13.000Z'
fetched_at: '2026-08-11T11:02:03.108Z'
---
Release v5.15.0
New Model additions
Meta Muse Glimmer
Muse Glimmer, released today, is Meta’s new multimodal model, especially designed for agentic use cases. Distilled from Muse to 30B parameters, and released under the Apache 2.0 license, it can be deployed to local setups for privacy-aware applications such as coding, document analysis, personal assistants, Claw- or Hermes-like setups.
Muse Glimmer is a dense 30B parameter model consisting of:
2B ViT-style encoder for vision (Perception Encoder)
28B parameter text decoder
We're covering it in the following blogpost: http://hf.co/blog/muse-glimmer


GraniteMoeSWA & GraniteSWA

Links: Documentation
Add Granite-swa and Granitemoe-swa model support (#47179) by @daviswer in #47179
Links: Documentation
Add Granite-swa and Granitemoe-swa model support (#47179) by @daviswer in #47179
A.X-K1 & A.X-K2

Links: Documentation
Add AXK2 from SKT (#47528) by @vasqu in #47528
Links: Documentation
add_axk1 (#46867) by @kmswin1 in #46867
Cosmos3 Edge

Links: Documentation
Add Cosmos3 Edge model support (#47181) by @atharvajoshi10 in #47181
Breaking changes
Kernels are now opt-in rather than mandatory for linear attention models (Mamba, GDN, Conv-only, etc.), so users who relied on automatic kernel selection must explicitly enable kernels to maintain previous behavior.
🚨 [Kernels] Refactor all linear attn models & native kernels fallback (#47630) by @vasqu
The cache cropping API now only accepts negative values (relative offsets) instead of absolute sizes, so users calling crop methods directly must update their code to pass negative values accordingly.
🚨 [cache] Cropping can only be done with negative values (#47720) by @Cyrilvallez
T5 and its model family (MT5, LongT5, etc.) now support SDPA and other attention backends via ALL_ATTENTION_FUNCTIONS, meaning the default attention implementation may change and users relying on the previous eager-only path should explicitly set attn_implementation="eager" if needed.
🚨 Enable SDPA (
