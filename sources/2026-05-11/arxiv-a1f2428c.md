---
title: 'Beyond Pairs: Your Language Model is Secretly Optimizing a Preference Graph'
url: 'https://arxiv.org/abs/2605.08037v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ning Liu
  - Chuanneng Sun
  - Kristina Klinkner
  - Shervin Malmasi
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-08T17:26:14Z'
fetched_at: '2026-05-11T08:20:12.074Z'
---
Direct Preference Optimization (DPO) aligns language models using pairwise preference comparisons, offering a simple and effective alternative to Reinforcement Learning (RL) from human feedback. However, in many practical settings, training data consists of multiple rollouts per prompt, inducing rich preference structure that pairwise DPO fails to exploit. Collapsing such data into independent pairs discards transitivity, introduces redundant or conflicting supervision, and can lead to unstable optimization. We propose Graph Direct Preference Optimization (GraphDPO), a principled generalization of DPO that operates over directed acyclic preference graphs induced by rollout rankings. GraphDPO encodes dominance relations as edges and optimizes a graph-structured Plackett--Luce-inspired objective that aggregates supervision over graph neighborhoods, enforcing transitivity while recovering standard DPO as a special case. To handle discrete or sparse signals, we introduce an equivalence-class construction where responses with identical preferences form graph layers, and intra-layer edges contribute zero loss, preventing spurious gradients. Despite leveraging full graph structure, GraphDPO maintains linear per-prompt complexity via efficient log-sum-exp aggregation. We further incorporate optional ground-truth anchoring by inserting verified solutions as dominant nodes and applying an annealed schedule that stabilizes early training while gradually relaxing oracle supervision. Expe

Authors: Ning Liu, Chuanneng Sun, Kristina Klinkner, Shervin Malmasi
Categories: cs.LG, cs.AI, cs.LG
