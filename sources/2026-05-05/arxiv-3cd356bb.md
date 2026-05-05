---
title: >-
  First-Order Efficiency for Probabilistic Value Estimation via A Statistical
  Viewpoint
url: 'https://arxiv.org/abs/2605.02827v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ziqi Liu
  - Kiljae Lee
  - Yuan Zhang
  - Weijing Tang
categories:
  - cs.AI
  - stat.ME
  - stat.ML
  - cs.AI
published: '2026-05-04T17:02:17Z'
fetched_at: '2026-05-05T09:52:13.895Z'
---
Probabilistic values, including Shapley values and semivalues, provide a model-agnostic framework to attribute the behavior of a black-box model to data points or features, with a wide range of applications including explainable artificial intelligence and data valuation. However, their exact computation requires utility evaluations over exponentially many coalitions, making Monte Carlo approximation essential in modern machine learning applications. Existing estimators are often developed through different identification strategies, including weighted averages, self-normalized weighting, regression adjustment, and weighted least squares. Our key observation is that these seemingly distinct constructions share a common first-order error structure, in which the leading term is an augmented inverse-probability weighted influence term determined by the sampling law and a working surrogate function. This first-order representation yields an explicit expression for the leading mean squared error (MSE), which characterizes how the sampling law and the surrogate jointly determine statistical efficiency. Guided by this criterion, we propose an Efficiency-Aware Surrogate-adjusted Estimator (EASE) that directly chooses the sampling law and surrogate to minimize the first-order MSE. We demonstrate that EASE consistently outperforms state-of-the-art estimators for various probabilistic values.

Authors: Ziqi Liu, Kiljae Lee, Yuan Zhang, Weijing Tang
Categories: cs.AI, stat.ME, stat.ML, cs.AI
