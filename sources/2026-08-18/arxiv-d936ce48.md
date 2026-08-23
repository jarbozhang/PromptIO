---
title: Q-based Variational Inverse Reinforcement Learning
url: 'https://arxiv.org/abs/2608.16888v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ondrej Bajgar
  - Peter Tisnikar
  - Alessandro Abate
  - Konstantinos Gatsis
  - Maike Osborne
categories:
  - cs.LG
  - cs.LG
published: '2026-08-17T17:59:55Z'
fetched_at: '2026-08-18T11:04:07.035Z'
---
The development of safe and beneficial AI requires that systems can learn and act in accordance with human preferences. However, explicitly specifying these preferences by hand is often infeasible. Inverse reinforcement learning (IRL) addresses this challenge by inferring preferences, represented as reward functions, from expert behaviour. We introduce Q-based Variational IRL (QVIRL), a novel Bayesian IRL method that recovers a posterior distribution over rewards from expert demonstrations via primarily learning a variational distribution over optimal Q-values. Unlike previous approaches, QVIRL combines scalability with uncertainty quantification, important for safety-critical applications as well as active learning. We demonstrate QVIRL's strong performance in apprenticeship learning across various tasks, including gridworlds, Lunar Lander, the Highway Environment, and two ATARI games both with static expert data and with active learning. It is the first method for Bayesian IRL that demonstrates training from raw pixel observations.

Authors: Ondrej Bajgar, Peter Tisnikar, Alessandro Abate, Konstantinos Gatsis, Maike Osborne
Categories: cs.LG, cs.LG
