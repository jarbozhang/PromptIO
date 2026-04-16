---
title: "Release v5.4.0: PaddlePaddle models \U0001F64C, Mistral 4, PI0, VidEoMT, UVDoc, SLANeXt, Jina Embeddings v3"
url: 'https://github.com/huggingface/transformers/releases/tag/v5.4.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-03-27T00:33:02.000Z'
fetched_at: '2026-04-16T06:07:17.475Z'
---
New Model additions
VidEoMT

Video Encoder-only Mask Transformer (VidEoMT) is a lightweight encoder-only model for online video segmentation built on a plain Vision Transformer (ViT). It eliminates the need for dedicated tracking modules by introducing a lightweight query propagation mechanism that carries information across frames and employs a query fusion strategy that combines propagated queries with temporally-agnostic learned queries. VidEoMT achieves competitive accuracy while being 5x-10x faster than existing approaches, running at up to 160 FPS with a ViT-L backbone.
Links: Documentation | Paper
Add VidEoMT (#44285) by @NielsRogge in #44285
UVDoc

UVDoc is a machine learning model designed for document image rectification and correction. The main purpose of this model is to carry out geometric transformation on images to correct document distortion, inclination, perspective deformation and other problems in document images. It provides both single input and batched inference capabilities for processing distorted document images.
Links: Documentation
[Model] Add UVDoc Model Support (#43385) by @XingweiDeng in #43385
Jina Embeddings v3

The Jina-Embeddings-v3 is a multilingual, multi-task text embedding model designed for a variety of NLP applications. Based on the XLM-RoBERTa architecture, this model supports Rotary Position Embeddings (RoPE) replacing absolute position embeddings to support long input sequences up to 8192 tokens. Additionally, it features 5 built-in Task-Specific LoRA Adapters that allow the model to generate task-specific embeddings (e.g., for retrieval vs. classification) without increasing inference latency significantly.
Links: Documentation | Paper
Add Jina-Embeddings-V3 Model (#44251) by @Sai-Suraj-27 in #44251
Mistral4

Mistral 4 is a powerful hybrid model with the capability of acting as both a general instruction model and a reasoning model. It unifies the capabilities of three different model families - Instruct, Reasoning (previo
