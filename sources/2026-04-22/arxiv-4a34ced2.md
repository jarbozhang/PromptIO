---
title: Safe Continual Reinforcement Learning in Non-stationary Environments
url: 'https://arxiv.org/abs/2604.19737v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Austin Coursey
  - Abel Diaz-Gonzalez
  - Marcos Quinones-Grueiro
  - Gautam Biswas
categories:
  - cs.LG
  - cs.LG
published: '2026-04-21T17:58:32Z'
fetched_at: '2026-04-22T08:06:49.534Z'
---
Reinforcement learning (RL) offers a compelling data-driven paradigm for synthesizing controllers for complex systems when accurate physical models are unavailable; however, most existing control-oriented RL methods assume stationarity and, therefore, struggle in real-world non-stationary deployments where system dynamics and operating conditions can change unexpectedly. Moreover, RL controllers acting in physical environments must satisfy safety constraints throughout their learning and execution phases, rendering transient violations during adaptation unacceptable. Although continual RL and safe RL have each addressed non-stationarity and safety, respectively, their intersection remains comparatively unexplored, motivating the study of safe continual RL algorithms that can adapt over the system's lifetime while preserving safety. In this work, we systematically investigate safe continual reinforcement learning by introducing three benchmark environments that capture safety-critical continual adaptation and by evaluating representative approaches from safe RL, continual RL, and their combinations. Our empirical results reveal a fundamental tension between maintaining safety constraints and preventing catastrophic forgetting under non-stationary dynamics, with existing methods generally failing to achieve both objectives simultaneously. To address this shortcoming, we examine regularization-based strategies that partially mitigate this trade-off and characterize their benefit

Authors: Austin Coursey, Abel Diaz-Gonzalez, Marcos Quinones-Grueiro, Gautam Biswas
Categories: cs.LG, cs.LG
