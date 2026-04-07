---
title: Your Pre-trained Diffusion Model Secretly Knows Restoration
url: 'https://arxiv.org/abs/2604.04924v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sudarshan Rajagopalan
  - Vishal M. Patel
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-06T17:59:04Z'
fetched_at: '2026-04-07T11:24:28.781Z'
---
Pre-trained diffusion models have enabled significant advancements in All-in-One Restoration (AiOR), offering improved perceptual quality and generalization. However, diffusion-based restoration methods primarily rely on fine-tuning or Control-Net style modules to leverage the pre-trained diffusion model's priors for AiOR. In this work, we show that these pre-trained diffusion models inherently possess restoration behavior, which can be unlocked by directly learning prompt embeddings at the output of the text encoder. Interestingly, this behavior is largely inaccessible through text prompts and text-token embedding optimization. Furthermore, we observe that naive prompt learning is unstable because the forward noising process using degraded images is misaligned with the reverse sampling trajectory. To resolve this, we train prompts within a diffusion bridge formulation that aligns training and inference dynamics, enforcing a coherent denoising path from noisy degraded states to clean images. Building on these insights, we introduce our lightweight learned prompts on the pre-trained WAN video model and FLUX image models, converting them into high-performing restoration models. Extensive experiments demonstrate that our approach achieves competitive performance and generalization across diverse degradations, while avoiding fine-tuning and restoration-specific control modules.

Authors: Sudarshan Rajagopalan, Vishal M. Patel
Categories: cs.CV, cs.AI, cs.CV
