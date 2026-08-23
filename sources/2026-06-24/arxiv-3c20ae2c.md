---
title: 'QC-SMOTE: Quality-Controlled SMOTE for Imbalanced Classification'
url: 'https://arxiv.org/abs/2606.24625v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Parth Upman
  - Shreyank N Gowda
categories:
  - cs.LG
  - cs.LG
published: '2026-06-23T14:23:18Z'
fetched_at: '2026-06-24T01:28:36.380Z'
---
Class imbalance poses a significant challenge in classification, where existing methods such as SMOTE often generate low-quality synthetic samples in regions with noise or class overlap. We propose QC-SMOTE, a quality-controlled oversampling framework that estimates minority sample reliability using a composite neighbourhood trustworthiness score combining local density, safe-level, and isolation from the majority class. Synthetic candidates are generated using an IPQ-guided best-of-K strategy that evaluates midpoint purity and, when required, majority clearance, with allocation guided by sample reliability and boundary informativeness. Generation behaviour adapts across overlap--imbalance regimes, adjusting interpolation range and selection criteria to match local data geometry. Low-quality synthetic samples are replaced with original minority duplicates when neighbourhood purity falls below an adaptive threshold, providing graceful degradation by reverting to duplication in severely noisy regions. Experiments on 30 imbalanced datasets using repeated stratified cross-validation show that QC-SMOTE achieves the strongest average AUC-ROC and Macro F1 among the compared oversampling methods, with particularly clear gains under moderate and severe imbalance. These results demonstrate the importance of quality-aware, geometry-adaptive synthetic sampling for robust imbalanced classification.

Authors: Parth Upman, Shreyank N Gowda
Categories: cs.LG, cs.LG
