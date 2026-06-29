---
title: >-
  Learning Topology-Aware Representations via Test-Time Adaptation for Anomaly
  Segmentation
url: 'https://arxiv.org/abs/2606.28268v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ali Zia
  - Usman Ali
  - Abdul Rehman
  - Umer Ramzan
  - Kang Han
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-06-26T17:04:42Z'
fetched_at: '2026-06-29T23:02:47.155Z'
---
Test-time adaptation (TTA) has emerged as a promising paradigm for mitigating distribution shifts in deep models. However, existing TTA approaches for anomaly segmentation remain limited by their reliance on pixel-level heuristics, such as confidence thresholding or entropy minimisation, which fail to preserve structural consistency under noise and texture variation. Moreover, they typically treat anomaly maps as flat intensity fields, ignoring the higher-order spatial relationships that characterise complex defect geometries. We introduce TopoTTA (Topological Test-Time Adaptation), a novel framework that integrates persistent homology, a tool from topological data analysis, into the TTA pipeline to enforce geometric and structural coherence during adaptation. By applying multi-level cubical complex filtration to anomaly score maps, TopoTTA derives robust topological pseudo-labels that guide a lightweight test-time classifier, enhancing segmentation quality without retraining the backbone model. The approach avoids reliance on method-specific raw-score thresholding for mask binarisation, preserves connectivity, and generalises across both 2D and 3D modalities. Extensive experiments across six standard benchmarks (MVTec AD, VisA, Real-IAD, MVTec 3D-AD, AnomalyShapeNet, and MVTec LOCO) demonstrate an average 15% F1 improvement over state-of-the-art unsupervised anomaly detection and segmentation methods, with the largest gains on anomalies exhibiting complex geometric or struct

Authors: Ali Zia, Usman Ali, Abdul Rehman, Umer Ramzan, Kang Han
Categories: cs.CV, cs.AI, cs.CV
