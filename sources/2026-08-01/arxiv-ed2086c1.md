---
title: >-
  Doubly Robust Functional Representation Learning for Longitudinal Causal
  Inference with Irregular Histories
url: 'https://arxiv.org/abs/2607.28567v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mengfei Ran
  - Yifeng Shen
  - Ruijie Guan
categories:
  - stat.ML
  - cs.LG
  - stat.AP
  - stat.CO
  - stat.ME
  - stat.ML
published: '2026-07-30T17:33:42Z'
fetched_at: '2026-08-01T11:02:16.288Z'
---
Longitudinal causal studies often record histories as irregular functional fragments: laboratory values, physiologic signals, sensor streams, and image-derived summaries measured at unequal and informative times. Standard doubly robust estimators usually require scalar summaries, whereas sequence learners optimize prediction losses that need not stabilize the efficient influence function. We propose Doubly Robust Functional Representation Learning (DR-FRL), a cross-fitted workflow that turns irregular histories into estimand-targeted states for observed-history regimes. Functional and temporal encoders map point clouds and prior histories into states; nuisance heads estimate outcome, treatment, and censoring functions; and EIF-targeted validation, calibration, overlap, tail, and ablation diagnostics assess whether the state supports the estimating equation. If the selected state preserves the nuisance information needed by the EIF, representation error enters the same second-order product remainder as ordinary nuisance error, and the mean estimator is asymptotically linear under explicit rate, overlap, calibration, and stability conditions. Catoni aggregation is treated separately as a bounded-influence point estimator, not a replacement for Wald inference. Simulations show gains when functional confounding is high-dimensional, measurement is informative, support is weak, or pseudo-outcomes are heavy-tailed. A VitalDB audit shows that DR-FRL can use irregular laboratory point

Authors: Mengfei Ran, Yifeng Shen, Ruijie Guan
Categories: stat.ML, cs.LG, stat.AP, stat.CO, stat.ME, stat.ML
