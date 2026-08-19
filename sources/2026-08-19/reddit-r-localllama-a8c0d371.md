---
title: 1-bit / 2-bit / Ternary / Bitnet Models - Updates & Tracking
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vryaid/1bit_2bit_ternary_bitnet_models_updates_tracking/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T18:51:24.000Z'
fetched_at: '2026-08-19T11:01:44.120Z'
---
Bonsai / Ternary Bonsai
 During April Bonsai came with bunch of models .... 1-bit & 1.58-bit(Ternary) versions. And last month(July) they released 27B models in same versions. Last month itself, Bonsai-27B was able to run on all backends mainline. But Ternary-Bonsai-27B was not ready on all backends.
 This month, PRs got merged for CUDA & Vulkan on mainline.
 Also an Optimization PR for CUDA got merged so +15-40% tg, +8% pp.
  
https://github.com/PrismML-Eng/Bonsai-demo - Demo fork
 https://github.com/PrismML-Eng/llama.cpp - Custom fork
  
BitCPM-CANN
  
https://huggingface.co/collections/openbmb/bitcpm-cann
  
Tencent - Hy-MT1.5 - Mixed Meta Translation Model Version 1.5
  
https://huggingface.co/collections/tencent/hy-mt15
  
Maple-Preview
 DeepGrove/maple-preview - 20B-A1B - 200+ t/s on Mac Mini M4 & 120+ t/s on iPhone.
  
llama.cpp PR #27000 - CPU backend
 https://github.com/deepgrove-ai/llama.cpp - Custom llama.cpp fork
 https://github.com/deepgrove-ai/mlx-lm-deepgrove - Custom MLX fork
  
Mach-1-Additive-35B
 Mach-1-Additive-35B - A3B - Up to 120 t/s on Consumer Laptop.
 Mach-1-Additive-35B-Multimodal
  
https://github.com/SyzygyResearch/llama.cpp-mach1 - Custom llama.cpp fork
  
From their recent tweet : Currently they're cooking new ones based on Laguna-S-2.1 & Qwen3.8-27B.
 Neutrino-8B
 https://huggingface.co/FermionResearch/Neutrino-8B
  
https://github.com/fermionresearch/llama.cpp - Custom llama.cpp fork
  
Pestle-27B-Ternary
 https://huggingface.co/Doses-AI/Pestle-27B-Ternary-GGUF - Medical research model
  
https://github.com/DosesAI/mortar.cpp - Custom inference - CPU, CUDA, Metal
  
Image Models:
 https://huggingface.co/collections/prism-ml/bonsai-image
  
https://huggingface.co/Green-Sky/bonsai-image-ternary-4B-GGUF
 https://huggingface.co/Green-Sky/bonsai-image-binary-4B-GGUF
  
https://huggingface.co/clark-labs/clark-air-sana-1.6b-1.58bit
 Abliterated Models:
  
https://huggingface.co/Hikari07jp/Ternary-Bonsai-27B-Abliterated-LowDeg-GGUF
 https://
