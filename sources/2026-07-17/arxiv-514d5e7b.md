---
title: >-
  Lighthouse RL: Sample-Efficient Circuit Optimization via Strategic Reset
  Points
url: 'https://arxiv.org/abs/2607.14008v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mustafa Emre Gürsoy
  - Stefan Uhlich
  - Ryoga Matsuo
  - Yağız Gençer
  - Arun Venkitaraman
categories:
  - cs.LG
  - cs.AR
  - cs.LG
published: '2026-07-15T16:37:57Z'
fetched_at: '2026-07-16T23:02:09.824Z'
---
In this paper, we introduce Lighthouse RL, a sample-efficient reinforcement learning (RL) approach for analog circuit sizing. Traditional methods lack generalization across different performance targets, while standard RL approaches waste resources exploring unpromising regions. Our method addresses these inefficiencies through a strategic reset strategy that initializes episodes from high-performing configurations discovered during training, called "lighthouses". These states, which are closer to the target objectives, guide exploration toward promising regions. When compared to RL and Bayesian optimization methods from the literature, we demonstrate the effectiveness of our approach on a 2D benchmark problem and on two analog circuits, showing significant improvements in sample efficiency (up to 1.72x faster), optimization performance (100% vs. 0-87% success rate), generalization (75% vs. 0-50% extrapolation success), and objective maximization. This efficiency is particularly valuable for computationally expensive black-box optimization problems, and our reset strategy can be used as a plug-and-play enhancement for any RL-based optimization approach.

Authors: Mustafa Emre Gürsoy, Stefan Uhlich, Ryoga Matsuo, Yağız Gençer, Arun Venkitaraman
Categories: cs.LG, cs.AR, cs.LG
