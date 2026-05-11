---
title: >-
  Don't Get Your Kroneckers in a Twist: Gaussian Processes on High-Dimensional
  Incomplete Grids
url: 'https://arxiv.org/abs/2605.08036v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mads Greisen Højlund
  - August Smart Lykke-Møller
  - Henry Moss
  - Ove Christiansen
categories:
  - cs.LG
  - cs.LG
published: '2026-05-08T17:24:22Z'
fetched_at: '2026-05-11T08:20:12.075Z'
---
We introduce CUTS-GPR, a new method for performing numerically exact Gaussian process regression (GPR) in high-dimensional settings. The key component of CUTS-GPR is an extremely fast kernel matrix-vector product, which exhibits near-linear or even linear scaling with the amount of training data, $N$, and low-order polynomial scaling with dimensionality, $D$. This is obtained by combining an additive kernel with an incomplete grid and exploiting the resulting structure of the kernel matrix. We demonstrate the scalability of the matrix-vector product by running benchmarks with billions of data points and thousands of dimensions. Full GPR calculations, including hyperparameter optimization, are completed in a matter of hours for $N = 447 265$ and $D = 24$. We demonstrate that our CUTS-GPR enables Bayesian modeling of high-dimensional potential energy surfaces - a longstanding challenge in computational chemistry.

Authors: Mads Greisen Højlund, August Smart Lykke-Møller, Henry Moss, Ove Christiansen
Categories: cs.LG, cs.LG
