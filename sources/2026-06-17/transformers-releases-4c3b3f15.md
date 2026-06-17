---
title: Release v5.10.1
url: 'https://github.com/huggingface/transformers/releases/tag/v5.10.1'
source: Transformers Releases
source_type: rss
language: en
published: '2026-06-03T15:37:41.000Z'
fetched_at: '2026-06-17T03:04:10.928Z'
---
Release v5.10.1
v5.10.0 was yanked as we publish on a corrupted branch. Sorry everyone, this happens when we rush a release!!!
New Model additions
Gemma4 unified+ Gemma4 MTP

Gemma 4 12B Unified is an encoder-free multimodal model with pretrained and instruction-tuned variants. Unlike standard Gemma 4, which uses dedicated encoder towers, Gemma 4 12B Unified projects raw inputs directly into the language model's embedding space through lightweight linear pipelines. This results in a simpler architecture while maintaining strong multimodal performance.
Key differences from standard Gemma 4:
No Vision Tower: Raw pixel patches are projected directly into LM space via a Dense + LayerNorm pipeline with factorized 2D positional embeddings, replacing the vision encoder.
No Audio Tower: Raw 16 kHz waveform samples are chunked into fixed-length frames and projected through a simple RMSNorm → Linear pipeline, replacing the mel spectrogram + Conformer encoder.
Shared Multimodal Pipeline: Both vision and audio use the same Gemma4UnifiedMultimodalEmbedder (RMSNorm → Linear) for the final projection to text hidden space.
You can find the original Gemma 4 12B Unified checkpoints under the Gemma 4 release.
who needs encoders? (#46385) by @douglas-reid @sgerrard @vasqu @molbap
Sapiens2
Sapiens2 is a family of high-resolution vision transformers pretrained on ~1 billion curated human images, designed for human-centric computer vision tasks including pose estimation, body-part segmentation, surface normal estimation, and pointmap estimation. The models scale from 0.4B to 5B parameters and train at native 1K resolution, with hierarchical 4K variants for extended spatial reasoning. Sapiens2 achieves substantial improvements over its predecessor with +4 mAP in pose estimation, +24.3 mIoU in body-part segmentation, and 45.6% error reduction in normal estimation.
Links: Documentation | Paper
Add Sapiens2 Model (#45919) by @guarin in #45919
DeepSeek-OCR-2
DeepSeek-OCR-2 is an OCR-specialize
