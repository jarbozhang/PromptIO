---
title: >-
  GPU-Parallel Linearization Error Bounds for Real-Time Robust Optimal Control
  of Nonlinear and Neural Network Dynamics
url: 'https://arxiv.org/abs/2607.01203v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jeffrey Fang
  - Keyi Shen
  - Anutam Srinivasan
  - Glen Chou
categories:
  - eess.SY
  - cs.AI
  - cs.LG
  - cs.RO
  - math.OC
  - eess.SY
published: '2026-07-01T17:42:37Z'
fetched_at: '2026-07-02T23:01:57.291Z'
---
This paper studies real-time robust optimal control for uncertain nonlinear systems, where linear time-varying (LTV) approximations make planning tractable but require sound linearization error bounds (LEBs) to guarantee robust constraint satisfaction. We develop tight, differentiable, GPU-parallel LEBs for LTV approximations of nonlinear and neural network (NN) dynamics. For analytic dynamics, we introduce path-based Hessian bounds that are tighter than standard interval methods. For NN dynamics, we derive certified LEBs using NN verifier-generated affine relaxations and local Jacobian corrections. We adapt a GPU-parallel system-level synthesis LTV-based robust control solver to be compatible with these LEBs by extending it to handle right-invertible disturbance matrices and non-zero-centered disturbance sets for tight zonotopic uncertainty propagation. Our method, GPUSLS-LEO, enables online optimization of robust feedback policies that account for linearization error, producing tight, formally verified reachable tubes. On complex nonlinear and NN dynamics up to 168 state dimensions, our method can compute robust control policies on the GPU at rates up to 67 Hz, reducing solve times and conservativeness relative to baselines while preserving formal guarantees and real-time performance.

Authors: Jeffrey Fang, Keyi Shen, Anutam Srinivasan, Glen Chou
Categories: eess.SY, cs.AI, cs.LG, cs.RO, math.OC, eess.SY
