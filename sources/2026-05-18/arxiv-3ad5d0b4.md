---
title: >-
  RoSHAP: A Distributional Framework and Robust Metric for Stable Feature
  Attribution
url: 'https://arxiv.org/abs/2605.15154v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Lanxin Xiang
  - Liang Shi
  - Youhui Ye
  - Boyu Jiang
  - Dawei Zhou
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-05-14T17:51:09Z'
fetched_at: '2026-05-18T00:51:02.182Z'
---
Feature attribution analysis is critical for interpreting machine learning models and supporting reliable data-driven decisions. However, feature attribution measures often exhibit stochastic variation: different train--test splits, random seeds, or model-fitting procedures can produce substantially different attribution values and feature rankings. This paper proposes a framework for incorporating stochastic nature of feature attribution and a robust attribution metric, RoSHAP, for stable feature ranking based on the SHAP metric. The proposed framework models the distribution of feature attribution scores and estimates it through bootstrap resampling and kernel density estimation. We show that, under mild regularity conditions, the aggregated feature attribution score is asymptotically Gaussian, which greatly reduces the computational cost of distribution estimation. The RoSHAP summarizes the distribution of SHAP into a robust feature-ranking criterion that simultaneously rewards features that are active, strong, and stable. Through simulations and real-data experiments, the proposed framework and RoSHAP outperform standard single-run attribution measures in identifying signal features. In addition, models built using RoSHAP-selected features achieve predictive performance comparable to full-feature models while using substantially fewer predictors. The proposed RoSHAP approach improves the stability and interpretability of machine learning models, enabling reliable and cons

Authors: Lanxin Xiang, Liang Shi, Youhui Ye, Boyu Jiang, Dawei Zhou
Categories: stat.ML, cs.LG, stat.ML
