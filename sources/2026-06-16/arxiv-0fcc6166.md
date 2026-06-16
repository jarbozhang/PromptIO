---
title: >-
  ROVE: Unlocking Human Interventions for Humanoid Manipulation via
  Reinforcement Learning
url: 'https://arxiv.org/abs/2606.17011v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wei Xiao
  - Weiliang Tang
  - Yuying Ge
  - Hui Zhou
  - Yao Mu
categories:
  - cs.RO
  - cs.LG
  - cs.RO
published: '2026-06-15T17:45:06Z'
fetched_at: '2026-06-16T06:33:00.404Z'
---
Human interventions provide crucial corrective signals for post-training Vision-Language-Action (VLA) models. However, enabling seamless humanoid interventions is a formidable systems challenge due to complex whole-body kinematics and dexterous-hand control. Consequently, the collected intervention trajectories are often suboptimal, and methods that rely on human interventions as expert supervision can absorb hesitant, inefficient, or even erroneous behaviors. To address both the system and algorithmic challenges, we propose ROVE, a reinforcement learning framework for humanoid VLA post-training with imperfect human interventions. First, ROVE introduces a human-in-the-loop pipeline capable of collecting deployment and intervention data for humanoid manipulation. Second, it utilizes Optimistic Value Estimation (OVE) to prioritize high-value behaviors from mixed-quality trajectories. To further robustify value estimation, we incorporate cross-embodiment human experience videos to provide rich supervision for long-tailed failure and recovery modes. The resulting critic yields informative advantage signals, steering the VLA actor to focus on high-value behaviors rather than indiscriminately imitating all actions. On challenging real-world contact-rich and fine-grained humanoid manipulation tasks, ROVE outperforms experience-learning baselines and consistently improves across multiple rollout-intervention iterations.

Authors: Wei Xiao, Weiliang Tang, Yuying Ge, Hui Zhou, Yao Mu
Categories: cs.RO, cs.LG, cs.RO
