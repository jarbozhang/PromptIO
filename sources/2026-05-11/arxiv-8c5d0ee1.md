---
title: >-
  Reinforcement Learning for Exponential Utility: Algorithms and Convergence in
  Discounted MDPs
url: 'https://arxiv.org/abs/2605.08053v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gugan Thoppe
  - L. A. Prashanth
  - Ankur Naskar
  - Sanjay Bhat
categories:
  - cs.LG
  - cs.LG
published: '2026-05-08T17:41:48Z'
fetched_at: '2026-05-11T08:20:12.072Z'
---
Reinforcement learning (RL) for exponential-utility optimization in discounted Markov decision processes (MDPs) lacks principled value-based algorithms. We address this gap in the fixed risk-aversion setting. Building on the Bellman-type equation for exponential utility studied in \cite{porteus1975optimality}, we derive two Q-value-style extensions and show that the associated operators are contractions in the $L_\infty$ and sup-log/Thompson metrics, respectively. We characterize their fixed points and prove that the induced greedy stationary policy is optimal for the exponential-utility objective among stationary policies. These structural results lead to two model-free algorithms: a two-timescale Q-learning--style algorithm, for which we establish almost-sure convergence and provide finite-time convergence rates via timescale separation, and a one-timescale algorithm governed by a sublinear power-law operator. Since the latter does not admit a global contraction in standard metrics, we prove its convergence using delicate arguments based on local Lipschitzness, monotonicity, homogeneity, and Dini derivatives, and provide a scalar finite-time analysis that highlights the challenges in obtaining convergence rates in the vector case. Our work provides a foundation for value-based RL under exponential-utility objectives.

Authors: Gugan Thoppe, L. A. Prashanth, Ankur Naskar, Sanjay Bhat
Categories: cs.LG, cs.LG
