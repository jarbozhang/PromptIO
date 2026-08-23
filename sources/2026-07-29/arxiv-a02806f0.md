---
title: Parallel Decoding Distillation for Fast Image and Video Generation
url: 'https://arxiv.org/abs/2607.26004v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Neta Shaul
  - Chao Liu
  - Arash Vahdat
  - Julius Berner
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-07-28T17:20:00Z'
fetched_at: '2026-07-29T11:02:31.059Z'
---
Generation in video diffusion or flow models is computationally expensive due to the slow and iterative sampling process. Current state-of-the-art (SOTA) acceleration methods heavily rely on variational score distillation (VSD) and adversarial losses to distill diffusion models into few-step generators. Albeit achieving high-quality video generation, these training losses are notoriously hard to optimize and suffer from mode collapse, leading to loss of video diversity and lack of motion. In this paper, we introduce Parallel Decoding Distillation (PDD), a simplified and scalable trajectory-based distillation method for fast inference of diffusion and flow matching models. Our architecture and training procedure are compatible with any pre-trained model and support sampling with a varying number of function evaluations (NFE). PDD accelerates generation by predicting multiple denoising steps per network evaluation. Conceptually, it learns a representation of the mean velocity without regressing its derivative using JVPs or finite-difference approximations. Our method achieves SOTA performance with 4-8 NFE on LTX-2.3 Text-to-Video/Audio, Wan 14B Text-to-Video, and Qwen-Image Text-to-Image. Moreover, PDD presents a significant improvement in generated video diversity.

Authors: Neta Shaul, Chao Liu, Arash Vahdat, Julius Berner
Categories: cs.CV, cs.LG, cs.CV
