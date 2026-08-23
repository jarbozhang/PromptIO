---
title: Ensemble Controlled-Flow Filtering for Implicit Data Assimilation
url: 'https://arxiv.org/abs/2607.12975v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhuoyuan Li
  - Yue Zhao
  - Ming Li
categories:
  - stat.ML
  - cs.LG
  - math.NA
  - math.OC
  - stat.ML
published: '2026-07-14T17:16:37Z'
fetched_at: '2026-07-15T23:03:05.477Z'
---
Data assimilation estimates the state of a dynamical system from model forecasts and incoming observations. Many observation mechanisms, however, are many-to-one, implicit, non-smooth, or accessible only through simulation, and need not provide the residual structures or likelihood guidance required by existing ensemble filters. We introduce implicit data assimilation, in which the analysis law is defined as an energy tilt of the forecast distribution. We then propose the Ensemble Controlled-flow Filter (EnCF), which realizes this update through a stochastic controlled flow and learns the observation-dependent control by adjoint matching from terminal energy gradients. For simulator-defined observations, EnCF-LF learns a surrogate conditional energy from samples and applies the same controlled-flow solver. We prove ideal exactness, derive a one-step error decomposition, and establish non-accumulation of local errors under filter stability. Numerical results show that Kalman-type filters remain preferable for smooth additive-Gaussian observations, while the proposed methods are better suited to non-Gaussian, many-to-one, multimodal, and implicit observation models.

Authors: Zhuoyuan Li, Yue Zhao, Ming Li
Categories: stat.ML, cs.LG, math.NA, math.OC, stat.ML
