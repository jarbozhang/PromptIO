---
title: >-
  StraTA: Incentivizing Agentic Reinforcement Learning with Strategic Trajectory
  Abstraction
url: 'https://arxiv.org/abs/2605.06642v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiangyuan Xue
  - Yifan Zhou
  - Zidong Wang
  - Shengji Tang
  - Philip Torr
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-05-07T17:51:16Z'
fetched_at: '2026-05-10T05:29:17.424Z'
---
Large language models (LLMs) are increasingly used as interactive agents, but optimizing them for long-horizon decision making remains difficult because current methods are largely purely reactive, which weakens both exploration and credit assignment over extended trajectories. In this work, we present Strategic Trajectory Abstraction (StraTA), a simple framework that introduces an explicit trajectory-level strategy into agentic reinforcement learning (RL). StraTA samples a compact strategy from the initial task state, conditions subsequent actions on that strategy, and trains strategy generation and action execution jointly with a hierarchical GRPO-style rollout design, further enhanced by diverse strategy rollout and critical self-judgment. Experiments on ALFWorld, WebShop, and SciWorld show that StraTA consistently improves both sample efficiency and final performance over strong baselines. StraTA reaches success rates of 93.1% on ALFWorld and 84.2% on WebShop. On SciWorld, StraTA attains a 63.5% overall score, outperforming frontier closed-source models.

Authors: Xiangyuan Xue, Yifan Zhou, Zidong Wang, Shengji Tang, Philip Torr
Categories: cs.CL, cs.AI, cs.CL
