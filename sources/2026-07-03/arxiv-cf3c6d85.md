---
title: 'TiRex-2: Generalizing TiRex to Multivariate Data and Streaming'
url: 'https://arxiv.org/abs/2607.01204v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Patrick Podest
  - Marco Pichler
  - Elias Bürger
  - Levente Zólyomi
  - Bernhard Voggenberger
categories:
  - cs.LG
  - cs.LG
published: '2026-07-01T17:45:04Z'
fetched_at: '2026-07-02T23:01:57.290Z'
---
We introduce TiRex-2, a recurrent xLSTM-based time series foundation model that generalizes the univariate TiRex to multivariate forecasting with both past and future covariates. Real-world forecasting is inherently sequential: observations arrive continuously, variables evolve jointly, and a subset of covariates is known ahead of time. Existing Transformer-based time series foundation models capture cross-variate dependencies but incur quadratic complexity in context length and require full-history recomputation as new observations arrive. TiRex-2 addresses these limitations through a memory-centric recurrent design that operates at constant per-patch cost under streaming. The model combines a bidirectional time mixer with an asymmetric grouped-attention variate mixer, enabling the integration of future-known covariates while preserving strict causality over target variables. To our knowledge, this is the first time series foundation model that achieves this combination of properties. To support scalable multivariate pretraining, we propose a synthetic coupling pipeline that composes diverse multivariate samples on the fly from large univariate corpora. Empirically, TiRex-2 achieves state-of-the-art zero-shot performance on GIFT-Eval and fev-bench, remains stable when streamed to arbitrary context lengths, and maintains constant inference cost per patch. The model uses 38.4M active parameters in univariate mode, with an additional 44.1M parameters activated for multivariate 

Authors: Patrick Podest, Marco Pichler, Elias Bürger, Levente Zólyomi, Bernhard Voggenberger
Categories: cs.LG, cs.LG
