---
title: >-
  Dense Supervision, Sparse Updates: On the Sparsity and Geometry of On-Policy
  Distillation
url: 'https://arxiv.org/abs/2606.13657v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guo Yu
  - Wenlin Liu
  - Yulan Hu
  - Hao-Xuan Ma
  - Jun-Peng Jiang
categories:
  - cs.LG
  - cs.LG
published: '2026-06-11T17:54:09Z'
fetched_at: '2026-06-14T14:02:35.103Z'
---
On-policy distillation (\textsc{OPD}) has recently become a prominent post-training recipe as it combines two desirable ingredients: on-policy student trajectories and dense teacher supervision, yet how this hybrid changes a model's parameters remains unclear. Across several language and vision-language model pairs and use cases, our analysis yields two main findings. On sparsity, \textsc{OPD}-style updates are small and coordinate-sparse. They are distributed across layers and are usually FFN-heavy. This sparse structure is operationally useful: training only the discovered subnetwork recovers nearly the same performance as full \textsc{OPD}. However, the sparsity-inducing SGD optimizer underperforms AdamW in our optimizer ablation, likely because dense teacher supervision preserves heterogeneous coordinate-wise gradient scales where AdamW's adaptive scaling remains useful. On geometry, the updates are numerically full-rank but spectrally concentrated; they lie mostly away from the principal singular subspaces of the source weights and fall disproportionately on coordinates where the source weights are close to zero. These findings suggest that dense teacher supervision does not turn \textsc{OPD} into ordinary dense parameter rewriting; instead, \textsc{OPD} retains important geometric signatures of on-policy post-training.

Authors: Guo Yu, Wenlin Liu, Yulan Hu, Hao-Xuan Ma, Jun-Peng Jiang
Categories: cs.LG, cs.LG
