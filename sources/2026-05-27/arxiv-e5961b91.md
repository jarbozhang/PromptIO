---
title: >-
  Global Convergence of Wasserstein Policy Gradient for Entropy-Regularized
  Reinforcement Learning
url: 'https://arxiv.org/abs/2605.26078v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhaoyu Zhu
  - Rui Gao
  - Shuang Li
categories:
  - cs.LG
  - cs.LG
published: '2026-05-25T17:42:59Z'
fetched_at: '2026-05-27T01:19:09.170Z'
---
Wasserstein policy gradient (WPG) is a policy optimization method for reinforcement learning (RL) that exploits the optimal-transport geometry of action distributions. For the entropy-regularized RL objective, WPG evolves each state-conditional policy by transporting it along the action gradient of the soft Q-function together with a Langevin-type diffusion. Despite its appeal for continuous-control problems, its global convergence properties remain poorly understood. Standard Langevin analyses do not directly apply, because the RL objective depends on the policy through the Bellman recursion rather than through a static convex functional, and the Langevin drift is determined by the soft Q-function, whose regularity must be controlled along the policy iterates. In this paper, we develop a global convergence theory for WPG by exploiting the Bellman structure of entropy-regularized RL. We show that the role usually played by convexity can be replaced by a Bellman-based argument: the soft Bellman residual admits a statewise KL representation with respect to a Gibbs policy; Bellman contraction relates this residual to the global optimality gap; and a Bellman resolvent identity connects value improvement to relative Fisher information. Combined with a uniform log-Sobolev inequality (LSI) for the evolving Gibbs family, these ingredients yield a distributional Polyak--Łojasiewicz condition. We further establish the regularity and uniform bounds needed to control the discretization e

Authors: Zhaoyu Zhu, Rui Gao, Shuang Li
Categories: cs.LG, cs.LG
