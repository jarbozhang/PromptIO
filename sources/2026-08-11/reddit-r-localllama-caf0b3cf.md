---
title: >-
  I gave DeepSeek V4 Flash basic vision by training a 40M connector on 100K
  examples
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vl6ior/i_gave_deepseek_v4_flash_basic_vision_by_training/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T03:45:19.000Z'
fetched_at: '2026-08-11T11:01:01.021Z'
---
I wanted to find out whether a huge text-only MoE could be given basic vision without retraining the language model itself.
 The short answer is yes.
 I froze DeepSeek V4 Flash and a 417M-parameter MoonViT image encoder, then trained a 40.1M-parameter connector between them on 100,000 image-text examples.
 The completed NVFP4 model loaded across four B200s in a custom SGLang stack and answered real image prompts. It has basic vision, although this 100K-example pilot is not yet a production-quality VLM.
 Models and weights
 DeepSeek V4 Flash Vision NVFP4:
 https://huggingface.co/webbrain-one/DeepSeek-V4-Flash-Vision-NVFP4
 BF16 vision tower and connector:
 https://huggingface.co/webbrain-one/DeepSeek-V4-Flash-Vision-BF16
 DeepSeek V4 Flash 0731 Vision NVFP4:
 https://huggingface.co/webbrain-one/DeepSeek-V4-Flash-0731-Vision-NVFP4
 Laguna XS 2.1 Vision NVFP4:
 https://huggingface.co/webbrain-one/Laguna-XS-2.1-Vision-NVFP4
 What I built
 The model has three components:
  
DeepSeek V4 Flash: 284B total / 13B active MoE — frozen
 MoonViT-3d: 417M-parameter image encoder from Kimi K2.6 — frozen
 A 40.1M-parameter connector — trained
  
The image path is:
 Image → frozen MoonViT → 1152-dimensional image features → merge each 2×2 patch group → small MLP connector → 4096-dimensional embeddings → frozen DeepSeek V4 Flash
 Only the connector learned anything. Neither the language model nor the image encoder received weight updates.
 Images used up to 512 visual tokens, while the maximum training sequence length was 2,048 tokens.
 Training data
 I sampled 100,000 examples from HuggingFaceM4/the_cauldron.
 The mixture included:
  
General image questions and captions
 OCR and text-heavy images
 Documents and infographics
 Charts, plots and diagrams
 Science questions
 Spatial reasoning
 Website screenshots and UI descriptions
  
One important observation was that 100,000 examples did not mean 100,000 different images.
 The dataset contained only 39,619 unique images because some
