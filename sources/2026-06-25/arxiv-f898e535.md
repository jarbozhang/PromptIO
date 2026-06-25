---
title: >-
  When Does Synthetic Data Augmentation Improve Score-Based Imbalanced
  Classification?
url: 'https://arxiv.org/abs/2606.26053v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhengchi Ma
  - Pengfei Lyu
  - Anru R. Zhang
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-06-24T17:30:36Z'
fetched_at: '2026-06-25T07:41:52.276Z'
---
Synthetic data augmentation is widely used to mitigate class imbalance, but its theoretical effects on score-based classification remain poorly understood. This paper develops a framework for characterizing when synthetic minority augmentation can improve threshold-integrated and threshold-optimized metrics, including AUROC, AUPRC, best-threshold balanced accuracy, and best-threshold \(\F_1\) score. We separate the effect of augmentation into two components: a change in effective class weighting and a discrepancy between the synthetic and true minority distributions. Under well-specified score models, the raw estimator already targets the likelihood-ratio ordering, which is population-optimal for the metrics considered. Consequently, augmentation cannot provide a fundamental population-level improvement beyond possible finite-sample variance reduction, and may introduce additional bias through synthetic distributional error. We further establish minimax lower bounds showing that the raw estimator already achieves the optimal metric-regret rate in the well-specified regime. Under misspecification, however, augmentation can play a qualitatively different role: by changing the effective class balance, it can alter the restricted-class projection and correct ranking errors induced by the raw imbalanced objective. We provide explicit improvement bounds quantifying the roles of approximation error, finite-sample estimation error, and synthetic distributional error. Simulation studi

Authors: Zhengchi Ma, Pengfei Lyu, Anru R. Zhang
Categories: stat.ML, cs.LG, stat.ML
