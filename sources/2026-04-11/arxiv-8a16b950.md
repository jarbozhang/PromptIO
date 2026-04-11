---
title: >-
  OpenVLThinkerV2: A Generalist Multimodal Reasoning Model for Multi-domain
  Visual Tasks
url: 'https://arxiv.org/abs/2604.08539v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wenbo Hu
  - Xin Chen
  - Yan Gao-Tian
  - Yihe Deng
  - Nanyun Peng
categories:
  - cs.CV
  - cs.AI
  - cs.CL
  - cs.CV
published: '2026-04-09T17:59:39Z'
fetched_at: '2026-04-11T01:43:18.430Z'
---
Group Relative Policy Optimization (GRPO) has emerged as the de facto Reinforcement Learning (RL) objective driving recent advancements in Multimodal Large Language Models. However, extending this success to open-source multimodal generalist models remains heavily constrained by two primary challenges: the extreme variance in reward topologies across diverse visual tasks, and the inherent difficulty of balancing fine-grained perception with multi-step reasoning capabilities. To address these issues, we introduce Gaussian GRPO (G$^2$RPO), a novel RL training objective that replaces standard linear scaling with non-linear distributional matching. By mathematically forcing the advantage distribution of any given task to strictly converge to a standard normal distribution, $\mathcal{N}(0,1)$, G$^2$RPO theoretically ensures inter-task gradient equity, mitigates vulnerabilities to heavy-tail outliers, and offers symmetric update for positive and negative rewards. Leveraging the enhanced training stability provided by G$^2$RPO, we introduce two task-level shaping mechanisms to seamlessly balance perception and reasoning. First, response length shaping dynamically elicits extended reasoning chains for complex queries while enforce direct outputs to bolster visual grounding. Second, entropy shaping tightly bounds the model's exploration zone, effectively preventing both entropy collapse and entropy explosion. Integrating these methodologies, we present OpenVLThinkerV2, a highly robust

Authors: Wenbo Hu, Xin Chen, Yan Gao-Tian, Yihe Deng, Nanyun Peng
Categories: cs.CV, cs.AI, cs.CL, cs.CV
