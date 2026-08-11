---
title: 'Fairness in Link Prediction Beyond Demographic Parity: A Reproducibility Study'
url: 'https://arxiv.org/abs/2608.09899v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Valentijn Oldenburg
  - Floris de Kam
  - Stef de Wildt
  - Jarno Nilson Balk
categories:
  - cs.LG
  - cs.SI
  - cs.LG
published: '2026-08-10T17:47:19Z'
fetched_at: '2026-08-11T11:02:16.307Z'
---
In fair ranked link prediction, demographic parity ($Δ_\mathrm{DP}$) is a common fairness metric. Yet, Mattos et al. (2025) argue that it fails to detect exposure bias because it ignores where links appear in the ranking. In this study, we reproduce this claim by showing that $Δ_\mathrm{DP}$ can indicate aggregate parity even when some subgroup-pair links are systematically ranked lower than others. The proposed rank-aware Normalized Discounted KL-divergence (NDKL), however, does detect such disparities. We also reproduce the effectiveness of MORAL, a post-processing method that improves exposure-based fairness while maintaining competitive utility. Beyond reproduction, we assess robustness using synthetic homophily settings, categorical sensitive attributes, and additional fairness and utility metrics, including subgroup-pair-adapted Attention-Weighted Rank Fairness (AWRF). Overall, our results show that exposure-based metrics uncover biases hidden by $Δ_\mathrm{DP}$ and that MORAL reduces these biases with minimal utility loss across diverse settings and datasets. We release a corrected, reproducible implementation at https://github.com/Floris93100/reproducing-MORAL.

Authors: Valentijn Oldenburg, Floris de Kam, Stef de Wildt, Jarno Nilson Balk
Categories: cs.LG, cs.SI, cs.LG
