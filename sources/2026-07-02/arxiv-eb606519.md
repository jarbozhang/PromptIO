---
title: >-
  FLORA: A deep learning approach to predict forest attributes from
  heterogeneous LiDAR data
url: 'https://arxiv.org/abs/2606.32023v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Emilie Vautier
  - Clément Mallet
  - Cédric Vega
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-06-30T17:52:28Z'
fetched_at: '2026-07-01T23:03:14.704Z'
---
Forest attributes are essential for national-scale resource monitoring. Airborne LiDAR metrics are among the auxiliary variables most strongly correlated with forest attributes used in National Forest Inventory (NFI) estimates. However, producing wall-to-wall predictions remains challenging when LiDAR data are acquired under heterogeneous conditions. As national LiDAR programs expand across Europe, variability in sensors, flight parameters, seasons, and scan angles limits the robustness of existing models, which are often calibrated for local conditions. We present FLORA (Forest LiDAR Octree Regression with Auxiliary Data), a deep learning framework that predicts six forest attributes: dominant height, total volume, deciduous volume, coniferous volume, basal area, and stem density from heterogeneous LiDAR point clouds. FLORA combines an octree-based backbone with ecological and spatiotemporal auxiliary variables through a late-fusion gating mechanism. Models are trained and evaluated on 32,052 National Forest Inventory plots across mainland France using data from the French LiDAR HD program. A single model trained on both leaf-on and leaf-off acquisitions outperforms season-specific models and improves cross-season robustness. Auxiliary variables provide modest overall gains but contribute more strongly to species-specific volume prediction. FLORA achieves an rRMSE of about 12.3% (R2 = 0.88) for dominant height and 39% (R2 = 0.74) for total volume, providing a robust baseline

Authors: Emilie Vautier, Clément Mallet, Cédric Vega
Categories: cs.CV, cs.AI, cs.CV
