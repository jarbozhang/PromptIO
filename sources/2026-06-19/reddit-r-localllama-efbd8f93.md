---
title: >-
  [NEW MODEL] SupraLabs just released SupraVL-Nano-900k, a Vision-Language Model
  built entirely from scratch!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9q6m2/new_model_supralabs_just_released_supravlnano900k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-19T02:53:02.000Z'
fetched_at: '2026-06-19T14:35:21.919Z'
---
Hey r/LocalLLaMA! We just released SupraVL-Nano-900k, our first VLM. It has ~900k parameters, was trained from scratch on Flickr8k, and the entire architecture fits in a single Jupyter notebook. This is not a production model, it's a fully transparent, readable blueprint for anyone who wants to understand how image-to-text models actually work under the hood.
 🤗 SupraVL-Nano-900k
 What is this?
 Most VLMs are black boxes. CLIP encoders, billion-parameter LLMs, fusion layers you can't easily read. SupraVL-Nano builds the whole thing from scratch: a CNN visual encoder, a GPT-2-style transformer decoder, a BPE tokenizer trained on the dataset itself, and a prefix concatenation fusion strategy. Every component is written from scratch and documented.
 The goal is simple: if you want to understand how a VLM works, you should be able to read the code.
 Architecture
  
 Component Details 
  
 Visual encoder 3× Conv-BN-ReLU + AdaptiveAvgPool(4×4) → 16 spatial tokens 
  Visual channels 64-d → projected to 128-d 
  Decoder GPT-2 style, 3 layers, d=128, 4 heads, FF=256 
  Vocabulary 2048 BPE tokens trained on Flickr8k captions 
  Context 16 visual tokens + 48 text tokens = 64 total positions 
  Parameters ~900k 
  Fusion Prefix concatenation (visual tokens prepended to text sequence) 
  Weight tying tok_emb ↔ lm_head (GPT-2 style) 
 
 The 4×4 spatial grid is a deliberate choice over a single global token — the decoder can attend to different image regions when generating different words, which is closer to how real VLMs work.
 Training
  
 Setting Value 
  
 Dataset Flickr8k (30k train / 5k val pairs) 
  Epochs 15 
  Optimizer AdamW (β₁=0.9, β₂=0.95, wd=0.01) 
  Learning rate 3e-4 → cosine decay → 3e-5 
  Batch size 64 
  Precision Mixed (AMP) 
  Hardware Kaggle 2× T4 / Google Colab T4 
 
 Quick start
 Install:
 pip install torch torchvision pillow huggingface_hub safetensors tokenizers 
 Run:
 import json, torch, torch.nn as nn, torch.nn.functional as F import torchvision.tra
