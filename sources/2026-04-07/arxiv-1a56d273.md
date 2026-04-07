---
title: Muon Dynamics as a Spectral Wasserstein Flow
url: 'https://arxiv.org/abs/2604.04891v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gabriel Peyré
categories:
  - math.OC
  - cs.AI
  - stat.ML
  - math.OC
published: '2026-04-06T17:41:12Z'
fetched_at: '2026-04-07T11:24:28.785Z'
---
Gradient normalization is central in deep-learning optimization because it stabilizes training and reduces sensitivity to scale. For deep architectures, parameters are naturally grouped into matrices or blocks, so spectral normalizations are often more faithful than coordinatewise Euclidean ones; Muon is the main motivating example of this paper. More broadly, we study a family of spectral normalization rules, ranging from ordinary gradient descent to Muon and intermediate Schatten-type schemes, in a mean-field regime where parameters are modeled by probability measures. We introduce a family of Spectral Wasserstein distances indexed by a norm gamma on positive semidefinite matrices. The trace norm recovers the classical quadratic Wasserstein distance, the operator norm recovers the Muon geometry, and intermediate Schatten norms interpolate between them. We develop the static Kantorovich formulation, prove comparison bounds with W2, derive a max-min representation, and obtain a conditional Brenier theorem. For Gaussian marginals, the problem reduces to a constrained optimization on covariance matrices, extending the Bures formula and yielding a closed form for commuting covariances in the Schatten family. For monotone norms, including all Schatten cases, we prove the equivalence between the static and dynamic Benamou-Brenier formulations, deduce that the resulting transport cost is a genuine metric equivalent to W2 in fixed dimension, and show that the induced Gaussian covari

Authors: Gabriel Peyré
Categories: math.OC, cs.AI, stat.ML, math.OC
