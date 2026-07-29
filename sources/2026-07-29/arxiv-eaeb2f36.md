---
title: >-
  Re-thinking Mammography Transfer Learning: The Dataset-Informed Transfer
  Learning (DITL) Framework for Breast Cancer Screening and Lesion Diagnosis
url: 'https://arxiv.org/abs/2607.26043v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Adarsh Bhandary Panambur
  - Siming Bayer
  - Andreas Maier
categories:
  - cs.LG
  - cs.LG
published: '2026-07-28T17:52:36Z'
fetched_at: '2026-07-29T11:02:31.056Z'
---
Enhancing classification performance in mammography remains a persistent challenge across both small curated datasets and large-scale clinical cohorts. Conventional transfer learning approaches often neglect dataset-specific characteristics, while recent neighborhood-informed methods have been restricted to narrow tasks with rigid formulations, limiting their scalability to population-level datasets. To address these challenges, we propose the Dataset-Informed Transfer Learning (DITL) framework, which integrates dataset-derived difficulty signals with neighborhood-based triplet supervision in a unified objective. DITL introduces two adaptive components: (i) Adaptive Difficulty-Weighted Cross-Entropy (A-DWCE), which assigns per-sample weights based on k-nearest neighbor label purity in a self-supervised feature space, and (ii) Adaptive Neighborhood Representation Triplet (A-NR-Triplet), which enforces intra-class compactness and inter-class separation using a learnable margin. Unlike focal loss, DITL requires no hyperparameter tuning, removes heuristic weighting and fixed margins, and incurs negligible computational overhead, yielding a robust and scalable optimization strategy. On the large-scale VinDR-Mammo dataset, DITL achieves state-of-the-art performance for whole-image breast density classification, with significant improvements across accuracy, F1-score, and AUC (p &lt; 0.0001). Beyond large cohorts, DITL also delivers consistent, statistically significant gains on sma

Authors: Adarsh Bhandary Panambur, Siming Bayer, Andreas Maier
Categories: cs.LG, cs.LG
