---
title: >-
  ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive
  Human Motion Generation
url: 'https://arxiv.org/abs/2607.08741v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kaifeng Zhao
  - Mathis Petrovich
  - Haotian Zhang
  - Tingwu Wang
  - Siyu Tang
categories:
  - cs.GR
  - cs.CV
  - cs.LG
  - cs.RO
  - cs.GR
published: '2026-07-09T17:41:49Z'
fetched_at: '2026-07-11T23:02:41.603Z'
---
Generating realistic 3D human motions in real-time within interactive applications is key for animation, simulation, and humanoid robotics. While recent offline motion generation approaches offer precise control via text and kinematic constraints, they lack the inference speed required for interactive settings. Conversely, existing online methods enable real-time synthesis but often sacrifice controllability or struggle with complex text semantics and long-horizon goals due to limited context windows. In this work, we introduce ARDY, a streaming generation framework that bridges this gap by enabling high-fidelity motion generation controllable via online text prompts and flexible kinematic constraints. ARDY employs a hybrid representation that combines explicit root features with a latent body embedding, balancing precise trajectory control with efficient generative learning. We propose a two-stage autoregressive transformer denoiser that features variable history context and supports conditioning on flexible, long-horizon kinematic constraints. By training on a large-scale motion capture dataset and being directly conditioned on text labels and kinematic constraints sampled from ground truth poses, ARDY natively learns controllable generation that supports online prompting and flexible long-horizon goals. Extensive evaluations on the HumanML3D benchmark and the large-scale, high-fidelity Bones Rigplay dataset demonstrate ARDY's high motion quality and constraint adherence, v

Authors: Kaifeng Zhao, Mathis Petrovich, Haotian Zhang, Tingwu Wang, Siyu Tang
Categories: cs.GR, cs.CV, cs.LG, cs.RO, cs.GR
