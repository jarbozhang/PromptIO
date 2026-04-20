---
title: >-
  FL-MHSM: Spatially-adaptive Fusion and Ensemble Learning for Flood-Landslide
  Multi-Hazard Susceptibility Mapping at Regional Scale
url: 'https://arxiv.org/abs/2604.16265v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aswathi Mundayatt
  - Jaya Sreevalsan-Nair
categories:
  - cs.LG
  - cs.LG
published: '2026-04-17T17:23:55Z'
fetched_at: '2026-04-20T05:39:43.393Z'
---
Existing multi-hazard susceptibility mapping (MHSM) studies often rely on spatially uniform models, treat hazards independently, and provide limited representation of cross-hazard dependence and uncertainty. To address these limitations, this study proposes a deep learning (DL) workflow for joint flood-landslide multi-hazard susceptibility mapping (FL-MHSM) that combines two-level spatial partitioning, probabilistic Early Fusion (EF), a tree-based Late Fusion (LF) baseline, and a soft-gating Mixture of Experts (MoE) model, with MoE serving as final predictive model. The proposed design preserves spatial heterogeneity through zonal partitions and enables data-parallel large-area prediction using overlapping lattice grids. In Kerala, EF remained competitive with LF, improving flood recall from 0.816 to 0.840 and reducing Brier score from 0.092 to 0.086, while MoE provided strongest performance for flood susceptibility, achieving an AUC-ROC of 0.905, recall of 0.930, and F1-score of 0.722. In Nepal, EF similarly improved flood recall from 0.820 to 0.858 and reduced Brier score from 0.057 to 0.049 relative to LF, while MoE outperformed both EF and LF for landslide susceptibility, achieving an AUC-ROC of 0.914, recall of 0.901, and F1-score of 0.559. GeoDetector analysis of MoE outputs further showed that dominant factors varied more across zones in Kerala, where susceptibility was shaped by different combinations of topographic, land-cover, and drainage-related controls, while Ne

Authors: Aswathi Mundayatt, Jaya Sreevalsan-Nair
Categories: cs.LG, cs.LG
