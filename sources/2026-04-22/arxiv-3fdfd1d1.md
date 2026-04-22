---
title: >-
  FB-NLL: A Feature-Based Approach to Tackle Noisy Labels in Personalized
  Federated Learning
url: 'https://arxiv.org/abs/2604.19729v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Abdulmoneam Ali
  - Ahmed Arafa
categories:
  - cs.LG
  - cs.IT
  - eess.SP
  - cs.LG
published: '2026-04-21T17:51:58Z'
fetched_at: '2026-04-22T08:06:49.535Z'
---
Personalized Federated Learning (PFL) aims to learn multiple task-specific models rather than a single global model across heterogeneous data distributions. Existing PFL approaches typically rely on iterative optimization-such as model update trajectories-to cluster users that need to accomplish the same tasks together. However, these learning-dynamics-based methods are inherently vulnerable to low-quality data and noisy labels, as corrupted updates distort clustering decisions and degrade personalization performance. To tackle this, we propose FB-NLL, a feature-centric framework that decouples user clustering from iterative training dynamics. By exploiting the intrinsic heterogeneity of local feature spaces, FB-NLL characterizes each user through the spectral structure of the covariances of their feature representations and leverages subspace similarity to identify task-consistent user groupings. This geometry-aware clustering is label-agnostic and is performed in a one-shot manner prior to training, significantly reducing communication overhead and computational costs compared to iterative baselines. Complementing this, we introduce a feature-consistency-based detection and correction strategy to address noisy labels within clusters. By leveraging directional alignment in the learned feature space and assigning labels based on class-specific feature subspaces, our method mitigates corrupted supervision without requiring estimation of stochastic noise transition matrices. In

Authors: Abdulmoneam Ali, Ahmed Arafa
Categories: cs.LG, cs.IT, eess.SP, cs.LG
