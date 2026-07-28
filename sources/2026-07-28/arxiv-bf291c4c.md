---
title: Explainable Reinforcement Learning via Physics-Aware Policy Distillation
url: 'https://arxiv.org/abs/2607.24672v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shaker Al-Tamari
  - Waled Kadour
categories:
  - cs.LG
  - cs.LG
published: '2026-07-27T17:14:42Z'
fetched_at: '2026-07-28T11:02:16.573Z'
---
In safety-critical sectors such as robotics and automotive engineering, the deployment of Deep Reinforcement Learning (DRL) is often hindered by the black-box nature of deep neural networks. This lack of transparency poses significant challenges for regulatory compliance and human-agent trust. This paper presents an experimental study aimed at making high-performance continuous control DRL systems interpretable. A policy distillation framework is implemented using the classic Inverted Pendulum benchmark. A high-performance Twin Delayed DDPG (TD3) agent serves as an opaque, continuous teacher model, whose policy is distilled into an interpretable student surrogate based on a shallow Decision Tree. By leveraging a custom physics-aware feature and "Noisy Oracle Rollouts" for dataset generation, the distillation process achieves performance equivalent to the expert teacher. Furthermore, comparative control theory analysis reveals a fundamental trade-off: transitioning from continuous to discrete rule-based control induces high-frequency Bang-Bang actuation and a stable bimodal limit cycle. Simulation results indicate that Bounded-Input Bounded-Output (BIBO) stability is maintained while providing both global and local interpretability for safe autonomous systems.

Authors: Shaker Al-Tamari, Waled Kadour
Categories: cs.LG, cs.LG
