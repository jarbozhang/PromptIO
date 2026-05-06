---
title: Release 5.8.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.8.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-05-05T16:52:21.000Z'
fetched_at: '2026-05-06T09:11:19.562Z'
---
Release v5.8.0
New Model additions
DeepSeek-V4

DeepSeek-V4 is the next-generation MoE (Mixture of Experts) language model from DeepSeek that introduces several architectural innovations over DeepSeek-V3. The architecture replaces Multi-head Latent Attention (MLA) with a hybrid local + long-range attention design, swaps residual connections for Manifold-Constrained Hyper-Connections (mHC), and bootstraps the first few MoE layers with a static token-id → expert-id hash table. This implementation covers DeepSeek-V4-Flash, DeepSeek-V4-Pro, and their -Base pretrained variants, which share the same architecture but differ in width, depth, expert count and weights.
Links: Documentation | Paper
Add DeepSeek V4 (#45643) by @ArthurZucker in #45643
Gemma 4 Assistant

Gemma 4 Assistant is a small, text-only model that enables speculative decoding for Gemma 4 models using the Multi-Token Prediction (MTP) method and associated candidate generator. The model shares the same Gemma4TextModel backbone as other Gemma 4 models but uses KV sharing throughout the entire model, allowing it to reuse the KV cache populated by the target model and skip the pre-fill phase entirely. This architecture includes cross-attention to make the most of the target model's context, allowing the assistant to accurately predict more drafted tokens per drafting round.
Links: Documentation
First model (#45788) by @SindhuRaghuram97 in #45788
GraniteSpeechPlus

Granite Speech Plus is a variant of Granite Speech that enhances the projector by consuming the concatenation of the encoder's final hidden states with an arbitrary subset of its intermediate hidden states along the feature dimension. It is a multimodal speech-to-text model that can transcribe audio, provide speaker annotation and word level timestamps by responding to text prompts. The model inherits the same architecture components as Granite Speech including the speech encoder, query transformer projector, language model, and optional LoRA adapter.
