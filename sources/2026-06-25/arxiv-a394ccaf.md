---
title: 'FedReLa: Imbalanced Federated Learning via Re-Labeling'
url: 'https://arxiv.org/abs/2606.26037v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guangzheng Hu
  - Patricia Menéndez
  - Feng Liu
  - Mingming Gong
  - Guanghui Wang
categories:
  - stat.ML
  - cs.CV
  - cs.LG
  - stat.ML
published: '2026-06-24T17:13:41Z'
fetched_at: '2026-06-25T07:41:52.282Z'
---
Federated learning has emerged as the foremost approach for decentralized model training with privacy preservation. The global class imbalance and cross-client data heterogeneity naturally coexist, and the mismatch between local and global imbalances exacerbates the performance degradation of the aggregated model. The agnosticism of global class distribution poses significant challenges for data-level methods, especially under extreme conditions with severe class absence across clients. In this paper, we propose FedReLa, a novel data-level approach that tackles the coexistence of data heterogeneity and class imbalance in federated learning. By re-labeling samples with a feature-dependent label re-allocator, FedReLa corrects biased global decision boundaries without requiring knowledge of the global class distribution. This modular, model-agnostic approach can be integrated with algorithmic methods to deliver consistent improvements without additional communication overhead. Through extensive experiments, our method significantly improves the accuracy of minority classes and the overall accuracy on stepwise-imbalanced and long-tailed datasets, outperforming the previous state of the art.

Authors: Guangzheng Hu, Patricia Menéndez, Feng Liu, Mingming Gong, Guanghui Wang
Categories: stat.ML, cs.CV, cs.LG, stat.ML
