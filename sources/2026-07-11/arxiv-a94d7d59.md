---
title: >-
  MPFlow: Learning Budgeted Max-Flow Optimization on the Lightning Network with
  Deep Graph Reinforcement Learning
url: 'https://arxiv.org/abs/2607.08703v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Harrison Rush
  - Vincent Davis
  - Simone Antonelli
  - Vikash Singh
  - Jesse Shrader
categories:
  - cs.LG
  - cs.LG
published: '2026-07-09T17:09:20Z'
fetched_at: '2026-07-10T23:02:58.075Z'
---
We address liquidity placement in the Bitcoin Lightning Network (LN): given a fixed budget, which channels should a node open to maximize its routing capacity? We cast this as a budget-constrained combinatorial optimization problem on graphs, selecting $k$ edge additions that maximize $s$--$t$ max-flow, a theory-grounded measure of routing capacity, and solve it with graph reinforcement learning. Our lightweight agent combines a message-passing policy network with proximal policy optimization (PPO) and action masking, and is trained under a hub-exclusion curriculum: the network's top hubs are removed from training subgraphs, forcing the policy to learn capacity-aware placement rather than hub attachment. In extensive experiments on real Lightning Network snapshots, our method consistently outperforms strong heuristic baselines on the max-flow objective across multiple seeds and unseen graphs. The agent has been deployed in production for peer recommendations, executing 4640 channel-open decisions that cumulatively allocate 267.3 BTC over $16 million across 30 managed nodes.

Authors: Harrison Rush, Vincent Davis, Simone Antonelli, Vikash Singh, Jesse Shrader
Categories: cs.LG, cs.LG
