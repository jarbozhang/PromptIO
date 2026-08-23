---
title: 'DICS: Data-Informed Centroid Splitting for Decision Tree Classifiers'
url: 'https://arxiv.org/abs/2608.20258v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - MD Saifur Rahman Mazumder
  - Feng Yu
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-08-20T16:54:17Z'
fetched_at: '2026-08-23T11:02:37.261Z'
---
Decision tree-based models are widely used in machine learning due to their interpretability and strong empirical performance. However, training decision trees can be computationally expensive, particularly for large and high-dimensional datasets, largely due to the exhaustive search over candidate splits at each node. To improve computational efficiency, we propose Data-Informed Centroid Splitting (DICS), a clustering-based framework that constructs a compact and informative set of candidate splits using data-driven priors. By incorporating class-aware structure, DICS significantly reduces the split search space for classification tasks while preserving predictive performance. We further provide theoretical analysis showing that under the stated assumptions, DICS does not degrade the performance of classification trees compared to exhaustive split search. DICS can be incorporated into classification trees, random forests, and gradient-boosting models. Extensive experiments demonstrate that DICS achieves comparable accuracy while substantially reducing training time across synthetic and benchmark datasets, highlighting the benefit of integrating data-informed priors into split selection for scalable classification tree learning.

Authors: MD Saifur Rahman Mazumder, Feng Yu
Categories: cs.LG, stat.ML, cs.LG
