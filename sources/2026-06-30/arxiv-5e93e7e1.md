---
title: >-
  Parameter Efficient Hybrid Transformer (PEHT) for Network Traffic Prediction
  via Dynamic Urban Congestion Integration
url: 'https://arxiv.org/abs/2606.28274v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Abdolazim Rezaei
  - Mehdi Sookhak
  - Mahboobeh Haghparast
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-26T17:17:17Z'
fetched_at: '2026-06-29T23:02:47.152Z'
---
Accurate network traffic prediction is a critical element for efficient resource allocation in dynamic urban cellular networks. However, prediction remains challenging because network demand is influenced by complex mobility patterns, congestion dynamics, and heterogeneous user behavior. This paper introduces the Parameter-Efficient Hybrid Transformer (PEHT), a network traffic prediction framework that integrates urban mobility and congestion information into a Transformer-based architecture. PEHT separates primary network communication features from secondary urban mobility features and incorporates Low-Rank Adaptation (LoRA) into the Transformer encoder to reduce the number of trainable parameters while maintaining high predictive accuracy. A multimodal fusion strategy then injects external mobility and congestion features into the decoder to improve traffic forecasting. Experiments on the Telecom Italia Milan dataset and multiple synthetic congestion scenarios show that PEHT outperforms state-of-the-art baselines in terms of RMSE, MAE, and $R^2$. The implementation is available in the GitHub repository.

Authors: Abdolazim Rezaei, Mehdi Sookhak, Mahboobeh Haghparast
Categories: cs.LG, cs.AI, cs.LG
