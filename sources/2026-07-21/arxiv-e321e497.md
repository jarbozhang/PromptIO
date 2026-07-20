---
title: >-
  DADiff: Diffusion-Driven Cross-Domain Policy Adaptation for Reinforcement
  Learning
url: 'https://arxiv.org/abs/2607.16090v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hanyang Chen
  - Anirudh Satheesh
  - Longchao Da
  - Hua Wei
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-17T16:20:08Z'
fetched_at: '2026-07-20T23:02:10.420Z'
---
Transferring policies across domains poses a vital challenge in reinforcement learning, due to the dynamics mismatch between the source and target domains. In this paper, we consider the setting of online dynamics adaptation, where policies are trained in the source domain with sufficient data, while only limited interactions with the target domain are allowed. There are a few existing works that address the dynamics mismatch by employing domain classifiers, value-guided data filtering, or representation learning. Instead, we study the domain adaptation problem from a generative modeling perspective. Specifically, we introduce DADiff, a diffusion-based framework that leverages the discrepancy between source and target domain generative trajectories in the generation process of the next state to estimate the dynamics mismatch. Both reward modification and data selection variants are developed to adapt the policy to the target domain. We also provide a theoretical analysis to show that the performance difference of a given policy between the two domains is bounded by the generative trajectory deviation. More discussions on the applicability of the variants and the connection between our theoretical analysis and the prior work are further provided. We conduct extensive experiments in environments with various shifts to validate the effectiveness of our method. The results demonstrate that our method provides superior performance compared to existing approaches, effectively addre

Authors: Hanyang Chen, Anirudh Satheesh, Longchao Da, Hua Wei
Categories: cs.LG, cs.AI, cs.LG
