---
title: >-
  HAF: Adapting Generalist VLAs to Humanoid Whole-Body Loco-manipulation via
  Hierarchical Action Flow and Spectral Latent RL
url: 'https://arxiv.org/abs/2608.16837v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Langzhe Gu
  - Chengkai Hou
  - Meng Li
  - Xinhua Wang
  - Jiaming Liu
categories:
  - cs.RO
  - cs.AI
  - cs.RO
published: '2026-08-17T17:22:33Z'
fetched_at: '2026-08-18T11:04:07.076Z'
---
Humanoid robots hold great promise as general-purpose agents in human-centered environments, yet generalist vision-language-action (VLA) foundation models are not readily applicable to humanoid whole-body loco-manipulation. The high dimensionality and interdependence of humanoid motions make it challenging for conventional single-stage VLA architectures to coordinate locomotion, waist posture, and dual-arm manipulation effectively. Moreover, policies trained through offline behavior cloning can remain suboptimal during real-world deployment. Although online reinforcement learning can refine policies through real-world interaction, directly tuning large VLA backbones demands excessive computation and may introduce safety risks during real-robot exploration. To address these bottlenecks, we introduce HAF (Humanoid Adaptation Framework), a two-part framework consisting of HAF-VLA and HAF-Steer that transfers off-the-shelf generalist VLA foundation models to humanoid whole-body loco-manipulation. HAF-VLA is a hierarchical action-flow generator built on a pretrained flow-matching VLA. It splits full-body action denoising into three sequential stages with stage embeddings and cross-stage KV caches that retain kinematic dependencies, avoiding incoherent whole-body actions from one-shot generation. On top of the frozen HAF-VLA, HAF-Steer is a latent offline-to-online RL pipeline that leverages flow-matching invertibility and DCT-based dimensionality reduction to restrict RL optimizat

Authors: Langzhe Gu, Chengkai Hou, Meng Li, Xinhua Wang, Jiaming Liu
Categories: cs.RO, cs.AI, cs.RO
