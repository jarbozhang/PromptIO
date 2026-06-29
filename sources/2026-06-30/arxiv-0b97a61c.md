---
title: PAC-Bayesian Certificates for Quadratic Closed-Loop Control
url: 'https://arxiv.org/abs/2606.28281v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Domagoj Herceg
categories:
  - eess.SY
  - cs.LG
  - eess.SY
published: '2026-06-26T17:24:21Z'
fetched_at: '2026-06-29T23:02:47.146Z'
---
PAC-Bayesian bounds provide finite-sample guarantees for data-dependent randomized predictors, but applying them to learning-based control is difficult because the natural objective is a quadratic trajectory cost. Such losses are unbounded, non-Lipschitz , and lead to response-dependent Chernoff terms. We employ System Level Synthesis parameterization, which exposes the closed-loop trajectory map of a linear system directly and makes the quadratic control loss amenable to explicit certification. Moreover, we provide a set of PAC-Bayes-Chernoff certificates for posterior distributions over feasible closed-loop responses. For Gaussian disturbance trajectories with arbitrary covariance, we derive an exact one-sided Gaussian transform and a tractable quadratic upper bound expressed through closed-loop sensitivity quantities. We also derive a posterior-localized surrogate for settings where pointwise closed-loop response certificates are unavailable or have support related admissibility issues. Although PAC-Bayes certifies a non-degenerate posterior, the convex quadratic form of the SLS loss transfers the certificate to the posterior mean response. We present a deterministic mean response deployment result that is particularly suitable for control while retaining the stochastic posterior in the bound. Additionally, we provide a data-driven bound for this deployment, transitioning away from an oracle bound. Minimizing this bound naturally results in a learning algorithm for control

Authors: Domagoj Herceg
Categories: eess.SY, cs.LG, eess.SY
