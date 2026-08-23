---
title: 'Patch release: v5.14.1'
url: 'https://github.com/huggingface/transformers/releases/tag/v5.14.1'
source: Transformers Releases
source_type: rss
language: en
published: '2026-07-16T09:41:36.000Z'
fetched_at: '2026-08-14T11:02:22.467Z'
---
Patch release v5.14.1
This patch solves a few issues which appeared when integrating Inkling model, most notably an issue affecting models using EncoderDecoderCache during assisted generation. It also fixes an issue that could appear during prefill with StaticCache and sdpa without padding for Inkling which uses a position_bias.
Fix sdpa prefill with position_bias (#47359) by @Cyrilvallez
Fix assisted decoding for models with EncoderDecoder cache & OlmoHybrid (#47361) by @Cyrilvallez
[FP8] Bump kernels version (#47344) by @vasqu
Fix deepgemm on multiple devices (#47323) by @IlyasMoutawwakil
