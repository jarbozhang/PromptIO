---
title: Filtered Conformal Ellipsoids for Graph-Native Time Series
url: 'https://arxiv.org/abs/2606.17014v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yannick Limmer
categories:
  - cs.LG
  - math.ST
  - stat.ML
  - cs.LG
published: '2026-06-15T17:46:19Z'
fetched_at: '2026-06-16T06:33:00.403Z'
---
Joint prediction sets for multivariate time series should control a single event while adapting to cross-coordinate dependence. We study filtered conformal ellipsoids: a frozen state-space filter emits a one-step predictive mean and covariance, and split-conformal calibration is applied to the resulting Mahalanobis scores. The filter is used to choose the ellipsoid shape; conformal calibration chooses the scalar radius, so the construction benefits from a learned predictive covariance without relying on Gaussian tail probabilities for coverage. The main difficulty is that filtered scores are dependent and learned recurrent filters need not contract in their raw hidden state; we therefore analyse contraction in an observable predictive-law quotient that identifies hidden states producing the same future sequence of emitted Gaussian laws. Under a stable Bayes Gaussian-projection filter, covariance bounds, and a finite-horizon observability Fisher condition, small excess Gaussian negative log-likelihood implies contraction of the learned emitted laws. Combined with a threshold-autocovariance envelope this yields a Chebyshev-type approximate coverage bound for filtered split-conformal prediction under dependence; a sharper Bernstein-type bound requires an additional geometric-mixing concentration assumption. Under Gaussian oracle realisability we also obtain a near-oracle log-volume comparison within the class of conditionally valid Gaussian ellipsoid rules. We instantiate the fr

Authors: Yannick Limmer
Categories: cs.LG, math.ST, stat.ML, cs.LG
