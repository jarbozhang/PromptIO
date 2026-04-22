---
title: 'FASTER: Value-Guided Sampling for Fast RL'
url: 'https://arxiv.org/abs/2604.19730v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Perry Dong
  - Alexander Swerdlow
  - Dorsa Sadigh
  - Chelsea Finn
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-21T17:52:17Z'
fetched_at: '2026-04-22T08:06:49.535Z'
---
Some of the most performant reinforcement learning algorithms today can be prohibitively expensive as they use test-time scaling methods such as sampling multiple action candidates and selecting the best one. In this work, we propose FASTER, a method for getting the benefits of sampling-based test-time scaling of diffusion-based policies without the computational cost by tracing the performance gain of action samples back to earlier in the denoising process. Our key insight is that we can model the denoising of multiple action candidates and selecting the best one as a Markov Decision Process (MDP) where the goal is to progressively filter action candidates before denoising is complete. With this MDP, we can learn a policy and value function in the denoising space that predicts the downstream value of action candidates in the denoising process and filters them while maximizing returns. The result is a method that is lightweight and can be plugged into existing generative RL algorithms. Across challenging long-horizon manipulation tasks in online and batch-online RL, FASTER consistently improves the underlying policies and achieves the best overall performance among the compared methods. Applied to a pretrained VLA, FASTER achieves the same performance while substantially reducing training and inference compute requirements. Code is available at https://github.com/alexanderswerdlow/faster .

Authors: Perry Dong, Alexander Swerdlow, Dorsa Sadigh, Chelsea Finn
Categories: cs.LG, cs.AI, cs.LG
