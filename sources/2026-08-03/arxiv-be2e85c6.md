---
title: >-
  When Does On-Policy Interaction Help? Representational Tradeoffs in
  Value-Based Imitation Learning
url: 'https://arxiv.org/abs/2607.29617v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Luca Viano
  - Antoine Moulin
  - Audrey Huang
  - Volkan Cevher
  - Philip Amortila
categories:
  - cs.LG
  - cs.AI
  - stat.ML
  - cs.LG
published: '2026-07-31T16:52:47Z'
fetched_at: '2026-08-03T11:02:19.118Z'
---
Imitation learning (IL)---training an agent to replicate expert behavior from demonstrations---underpins applications from robotics to language model training. Standard approaches such as Behavior Cloning (BC) are known to suffer from compounding errors and performance plateaus, particularly when the learner cannot perfectly represent the expert's policy (as is typical, e.g., in distillation). Two interventions are widely understood empirically to improve performance: querying the expert interactively along the learner's own trajectories, and using value function estimation en route to generating a policy rather than directly fitting the expert's full action distribution. We investigate the nature of these improvements and their potentially surprising interplay. Our main finding is that expert interaction relaxes the representational demands on the learner: one only needs a model capable of realizing the expert's value function, bypassing the (often stricter) requirement of realizing the expert's policy itself. Concretely, we introduce OVI, an interactive on-policy IL algorithm that is statistically efficient whenever the learner can represent the expert's value function and computationally efficient given access to a linear maximization oracle. We complement this with a negative result showing that interaction is necessary. Namely, without stronger assumptions beyond expert-value realizability alone, any offline IL algorithm must scale with the complexity of the expert polic

Authors: Luca Viano, Antoine Moulin, Audrey Huang, Volkan Cevher, Philip Amortila
Categories: cs.LG, cs.AI, stat.ML, cs.LG
