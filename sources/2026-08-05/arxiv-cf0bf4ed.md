---
title: >-
  Assessment of Conditional Diffusion Model for Synthetic Histopathology Image
  Generation
url: 'https://arxiv.org/abs/2608.03990v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seyed Kahaki
  - Shijie Li
  - Weijie Chen
  - Nicholas Petrick
categories:
  - cs.LG
  - cs.LG
published: '2026-08-04T17:51:40Z'
fetched_at: '2026-08-05T11:02:38.583Z'
---
Synthetic histopathology image generation has emerged as an approach that may address data scarcity in computational pathology, yet current evaluation methodologies may not fully assess synthetic data quality for medical applications. This work investigates and addresses limitations in existing evaluation metrics, investigating an approach for assessing synthetic histopathology image quality through domain-specific metrics and downstream task validation. We show that conventional synthetic data evaluation metrics such as Frechet Inception Distance (FID) and Inception Score (IS) may have limitations when applied to histopathology images due to their reliance on ImageNet-pretrained feature extractors. To address these limitations, we propose for consideration modified FID and IS approaches utilizing foundation models pretrained on digital pathology datasets, supplemented by precision-recall based metrics as part of an additional quality assessment. Using conditional denoising diffusion models trained on four benchmark datasets, with a two-step training approach, we generated synthetic datasets with systematically varied quality characteristics. We also measured the correlation between the synthetic data quality metrics with downstream nuclei segmentation performance using common metrics including the aggregated Jaccard index (AJI+) and the Dice coefficient. The study results suggest that pathology-specific metrics may provide improved discriminative power. Specifically, the mod

Authors: Seyed Kahaki, Shijie Li, Weijie Chen, Nicholas Petrick
Categories: cs.LG, cs.LG
