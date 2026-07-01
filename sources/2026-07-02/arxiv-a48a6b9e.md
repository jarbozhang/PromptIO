---
title: 'TRIAGE: Role-Typed Credit Assignment for Agentic Reinforcement Learning'
url: 'https://arxiv.org/abs/2606.32017v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuanda Xu
  - Zhengze Zhou
  - Hejian Sang
  - Xiaomin Li
  - Jiaxin Zhang
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-30T17:48:07Z'
fetched_at: '2026-07-01T23:03:14.708Z'
---
Agentic reinforcement learning requires assigning credit to environment-facing actions such as searches, clicks, edits, navigation commands, and object interactions. Standard GRPO uses the final verifier outcome as a uniform advantage over all action tokens. This outcome signal is useful but structurally incomplete: it punishes useful exploration in failed rollouts and reinforces redundant or regressive actions in successful rollouts. We propose TRIAGE, a role-typed credit assignment framework that adds a semantic role axis to outcome credit. A structured judge classifies each segment as decisive progress, useful exploration, no-progress infrastructure, or regression, and a fixed role-conditioned rule maps these labels to bounded segment-level process rewards. This keeps verifier outcomes as the source of optimization direction while correcting the two main blind spots of outcome-only credit. We further show that role-conditioned credit is the optimal segment-level correction expressible from role labels alone -- a projection of the per-segment advantage residual onto the role variable -- so that the fixed role constants reduce advantage estimation error whenever the judge is reliable, and we connect this to lower-variance policy gradients. Across ALFWorld, Search-QA, and WebShop, TRIAGE improves success rates over GRPO for two policy models and outperforms both a scalar judge-derived process reward and an outcome-supervised shared-backbone value baseline. Ablations show that

Authors: Yuanda Xu, Zhengze Zhou, Hejian Sang, Xiaomin Li, Jiaxin Zhang
Categories: cs.LG, cs.AI, cs.LG
