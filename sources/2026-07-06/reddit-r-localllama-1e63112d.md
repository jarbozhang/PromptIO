---
title: >-
  [Paper] Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration
  via Staged Sampling
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unxqw5/paper_multiresolution_flow_matching_trainingfree/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T09:25:25.000Z'
fetched_at: '2026-07-05T23:01:37.130Z'
---
Hardware-agnostic strategies for accelerating text-to-image diffusion, such as timestep distillation and feature caching, can reduce inference time without custom kernels or system-level optimization. Among them, multi-resolution generation strategies have recently received broad attention, attaining more than 5x speedup without any training. However, the design of performing upsampling in the latent space, together with the selective modification of partial regions, causes these methods to exhibit noticeable blurring or artifacts. To this end, we propose MrFlow, a training-free multi-resolution acceleration strategy for pretrained flow-matching models built upon a staged low-to-high-resolution pipeline. MrFlow first rapidly generates the main structure at low resolution, then performs super-resolution in the pixel space using a lightweight pretrained GAN-based model, subsequently injects low-strength noise to enable high-frequency resampling, and finally refines the details at high resolution. Quantitative and qualitative results on FLUX.1-dev and Qwen-Image show that MrFlow exploits the quadratic token reduction and reduced step requirement of low-resolution sampling to achieve 10x end-to-end acceleration while keeping OneIG within a 1% gap relative to that before acceleration, significantly surpassing other training-free acceleration strategies, and requiring no training or runtime dynamic identification whatsoever. MrFlow can further be directly combined orthogonally with pre-trained timestep distillation strategies, achieving even higher generation acceleration of up to 25x.
  
Highlights
 
  
Training-free deployment. No finetuning, learned upsampler, or model-specific retraining is required.
 No custom kernels. The implementation uses standard PyTorch, Diffusers pipelines, and scheduler controls.
 Strong aggressive-speed regime. MrFlow reaches more than 10x end-to-end speedup on Qwen-Image while preserving visual quality.
 Works with distilled models. The sam
