---
title: Release v5.12.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.12.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-06-12T14:39:40.000Z'
fetched_at: '2026-06-25T07:41:39.824Z'
---
Release v5.12.0
New Model additions
MiniMax-M3-VL

MiniMax-M3-VL is the vision-language member of the MiniMax-M3 family that pairs a CLIP-style vision tower with 3D rotary position embeddings with the MiniMax-M3 text backbone. It uses a mixed dense/sparse Mixture-of-Experts decoder with SwiGLU-OAI gated experts and a lightning indexer for block-sparse attention. The model processes images through a Conv3d patch embedding system and includes specialized components for efficient multimodal understanding and generation.
Links: Documentation
Add minimax m3vl (#46600) by @ArthurZucker in #46600
PP-OCRv6: update documentation and slow tests (#46576)

The official weights for PP-OCRv6 are out: PP-OCRv6 is a lightweight OCR system that combines architectural innovation with data-centric optimization. It redesigns the backbone, detection neck, and recognition neck around a unified MetaFormer-style building block with structural reparameterization. Three model tiers (medium, small, tiny) share the same block primitives, covering deployment scenarios from server to edge.
PP-OCRv6: update documentation and slow tests (#46576) by @ zhang-prog
Add Parakeet-RNNT (#46331)
ParakeetForRNNT: a Fast Conformer Encoder + an RNN-T (RNN Transducer) decoder
RNN-T Decoder: Standard neural transducer:

LSTM prediction network maintains language context across token predictions.

Joint network combines encoder and decoder outputs.
Greedy transducer decoding for inference: a blank emission advances the encoder frame by one, a non-blank emission stays on the same frame.
Add Parakeet-RNNT (#46331) by @eustlb
Bugfixes and improvements
[CI] don't export OTELs within the tests (#46602) by @tarekziade in [#46602]
[CI] capture checkers output in OTEL (#46601) by @tarekziade in [#46601]
Lfm2: thread seq_idx through ShortConv for packed/varlen inputs (#46588) by @ChangyiYang in [#46588]
put output_hidden_states into filter_output_hidden_states (#46422) by @molbap in [#46422]
a11 for checkers (#46599) by
