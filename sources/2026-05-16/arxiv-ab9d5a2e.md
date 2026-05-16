---
title: >-
  Eradicating Negative Transfer in Multi-Physics Foundation Models via Sparse
  Mixture-of-Experts Routing
url: 'https://arxiv.org/abs/2605.15179v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ellwil Sharma
  - Arastu Sharma
categories:
  - cs.LG
  - cs.AI
  - physics.comp-ph
  - cs.LG
published: '2026-05-14T17:58:15Z'
fetched_at: '2026-05-16T14:12:26.803Z'
---
Scaling Scientific Machine Learning (SciML) toward universal foundation models is bottlenecked by negative transfer: the simultaneous co-training of disparate partial differential equation (PDE) regimes can induce gradient conflict, unstable optimization, and plasticity loss in dense neural operators. In particular, broadband open-channel fluid dynamics and boundary-dominated porous media flows impose incompatible spectral and geometric demands on a single dense parameter path. We introduce Shodh-MoE, a sparse-activated latent transformer architecture for multi-physics transport. Shodh-MoE operates on compressed 16^3 physical latents produced by a physics-informed autoencoder with an intra-tokenizer Helmholtz-style velocity parameterization, restricting decoded states to divergence-free velocity manifolds. The model guarantees exact mass conservation, achieving a physically verifiable velocity divergence of ~2.8 x 10^-10 (evaluated post-hoc in FP64) on 128^3 grids. A Top-1 soft-semantic router dynamically assigns localized latent patches to expert subnetworks, enabling specialized parameter paths for distinct physical mechanisms while preserving shared experts for universal symmetries. In a 20,000-step distributed pretraining run over mixed three-dimensional physical tensors, routing telemetry shows autonomous domain bifurcation: held-out validation tokens from the open-channel domain route exclusively to Expert 0, while porous-media tokens route exclusively to Expert 1. The 

Authors: Ellwil Sharma, Arastu Sharma
Categories: cs.LG, cs.AI, physics.comp-ph, cs.LG
