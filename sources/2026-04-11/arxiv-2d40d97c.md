---
title: 'SIM1: Physics-Aligned Simulator as Zero-Shot Data Scaler in Deformable Worlds'
url: 'https://arxiv.org/abs/2604.08544v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yunsong Zhou
  - Hangxu Liu
  - Xuekun Jiang
  - Xing Shen
  - Yuanzhen Zhou
categories:
  - cs.RO
  - cs.AI
  - cs.CV
  - cs.RO
published: '2026-04-09T17:59:52Z'
fetched_at: '2026-04-11T01:43:18.430Z'
---
Robotic manipulation with deformable objects represents a data-intensive regime in embodied learning, where shape, contact, and topology co-evolve in ways that far exceed the variability of rigids. Although simulation promises relief from the cost of real-world data acquisition, prevailing sim-to-real pipelines remain rooted in rigid-body abstractions, producing mismatched geometry, fragile soft dynamics, and motion primitives poorly suited for cloth interaction. We posit that simulation fails not for being synthetic, but for being ungrounded. To address this, we introduce SIM1, a physics-aligned real-to-sim-to-real data engine that grounds simulation in the physical world. Given limited demonstrations, the system digitizes scenes into metric-consistent twins, calibrates deformable dynamics through elastic modeling, and expands behaviors via diffusion-based trajectory generation with quality filtering. This pipeline transforms sparse observations into scaled synthetic supervision with near-demonstration fidelity. Experiments show that policies trained on purely synthetic data achieve parity with real-data baselines at a 1:15 equivalence ratio, while delivering 90% zero-shot success and 50% generalization gains in real-world deployment. These results validate physics-aligned simulation as scalable supervision for deformable manipulation and a practical pathway for data-efficient policy learning.

Authors: Yunsong Zhou, Hangxu Liu, Xuekun Jiang, Xing Shen, Yuanzhen Zhou
Categories: cs.RO, cs.AI, cs.CV, cs.RO
