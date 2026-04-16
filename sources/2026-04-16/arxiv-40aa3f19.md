---
title: >-
  ID and Graph View Contrastive Learning with Multi-View Attention Fusion for
  Sequential Recommendation
url: 'https://arxiv.org/abs/2604.14114v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaofan Zhou
  - Kyumin Lee
categories:
  - cs.IR
  - cs.LG
  - cs.IR
published: '2026-04-15T17:36:19Z'
fetched_at: '2026-04-16T06:07:35.555Z'
---
Sequential recommendation has become increasingly prominent in both academia and industry, particularly in e-commerce. The primary goal is to extract user preferences from historical interaction sequences and predict items a user is likely to engage with next. Recent advances have leveraged contrastive learning and graph neural networks to learn more expressive representations from interaction histories -- graphs capture relational structure between nodes, while ID-based representations encode item-specific information. However, few studies have explored multi-view contrastive learning between ID and graph perspectives to jointly improve user and item representations, especially in settings where only interaction data is available without auxiliary information. To address this gap, we propose Multi-View Contrastive learning for sequential recommendation (MVCrec), a framework that integrates complementary signals from both sequential (ID-based) and graph-based views. MVCrec incorporates three contrastive objectives: within the sequential view, within the graph view, and across views. To effectively fuse the learned representations, we introduce a multi-view attention fusion module that combines global and local attention mechanisms to estimate the likelihood of a target user purchasing a target item. Comprehensive experiments on five real-world benchmark datasets demonstrate that MVCrec consistently outperforms 11 state-of-the-art baselines, achieving improvements of up to 14.

Authors: Xiaofan Zhou, Kyumin Lee
Categories: cs.IR, cs.LG, cs.IR
