---
title: >-
  RRC: Unlocking Generative Reward Models in LLM Reinforcement Learning via
  Ranking-Based Reward Construction
url: 'https://arxiv.org/abs/2608.06310v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenglong Wang
  - Ziming Zhu
  - Yifu Huo
  - Bei Li
  - Qiaozhi He
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-08-06T17:24:36Z'
fetched_at: '2026-08-08T11:02:02.907Z'
---
Recent advances in reward modeling show a paradigm shift from discriminative reward models to generative reward models. However, despite their strong capabilities in response ranking, generative reward models have not realized their potential in reinforcement learning (RL). Our analysis reveals that this limitation arises from a mismatch between the comparative nature of generative reward modeling and the scalar scoring paradigm adopted by existing RL algorithms. To bridge this gap, we propose a Ranking-based Reward Construction (RRC) approach, which enables generative reward models to provide more effective RL learning signals by deriving rewards from relative preference rankings. RRC introduces two complementary strategies: self-competitive ranking, which exploits comparisons among sampled responses, and anchor-guided ranking, which enables scalable ranking-based reward construction with a small set of reference responses. Experiments across open-ended chat and reasoning benchmarks demonstrate that RRC substantially improves RL training with generative reward models, achieving consistent gains over existing reward construction approaches. Our code can be found at https://github.com/wangclnlp/RRC.

Authors: Chenglong Wang, Ziming Zhu, Yifu Huo, Bei Li, Qiaozhi He
Categories: cs.LG, cs.CL, cs.LG
