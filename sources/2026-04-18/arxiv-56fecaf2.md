---
title: 'Generalization in LLM Problem Solving: The Case of the Shortest Path'
url: 'https://arxiv.org/abs/2604.15306v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yao Tong
  - Jiayuan Ye
  - Anastasia Borovykh
  - Reza Shokri
categories:
  - cs.AI
  - cs.LG
  - cs.AI
published: '2026-04-16T17:59:43Z'
fetched_at: '2026-04-18T02:24:59.954Z'
---
Whether language models can systematically generalize remains actively debated. Yet empirical performance is jointly shaped by multiple factors such as training data, training paradigms, and inference-time strategies, making failures difficult to interpret. We introduce a controlled synthetic environment based on shortest-path planning, a canonical composable sequential optimization problem. The setup enables clean separation of these factors and supports two orthogonal axes of generalization: spatial transfer to unseen maps and length scaling to longer-horizon problems. We find that models exhibit strong spatial transfer but consistently fail under length scaling due to recursive instability. We further analyze how distinct stages of the learning pipeline influence systematic problem-solving: for example, data coverage sets capability limits; reinforcement learning improves training stability but does not expand those limits; and inference-time scaling enhances performance but cannot rescue length-scaling failures.

Authors: Yao Tong, Jiayuan Ye, Anastasia Borovykh, Reza Shokri
Categories: cs.AI, cs.LG, cs.AI
