---
title: >-
  Beyond Negative Rollouts: Positive-Only Policy Optimization with Implicit
  Negative Gradients
url: 'https://arxiv.org/abs/2605.06650v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mingwei Xu
  - Hao Fang
categories:
  - cs.CL
  - cs.CL
published: '2026-05-07T17:55:21Z'
fetched_at: '2026-05-10T05:29:17.422Z'
---
Reinforcement learning with verifiable rewards (RLVR), due to the deterministic verification, becomes a dominant paradigm for enhancing the reasoning ability of large language models (LLMs). The community witnesses the rapid change from the Proximal Policy Optimization (PPO) to Group Relative Policy Optimization (GRPO), in which GRPO reduces the complicated advantage estimation with simple estimation over grouped positive and negative rollouts. However, we note that negative rollouts may admit no gradation of failure severity, and the combinatorial vastness makes penalizing a few sampled negatives unlikely to cover a meaningful reward signal under sparse binary rewards. In this work, we propose Positive-Only Policy Optimization (POPO), a novel RLVR framework in which learning can occur exclusively via online positive rollouts. Specifically, POPO utilizes bounded importance sampling over the positive rollout set. Thus, no disjoint negative rollouts are used for the gradient guidance. We show that implicit negative gradients can emerge naturally through reinforcing the positive probability via rollouts redistribution. Next, POPO stabilizes the policy optimization through two mechanisms. First, it applies a siamese policy network with a momentum-based adaptation law for stabilized policy evolution. Second, we replace the KL-divergence with a bounded similarity penalty term in the siamese representation space. We conduct extensive experiments using publicly available, well-establ

Authors: Mingwei Xu, Hao Fang
Categories: cs.CL, cs.CL
