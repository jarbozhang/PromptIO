---
title: >-
  Entropy-Constrained Machine Learning with Residual Data Augmentation for
  Modeling Chemical Kinetics
url: 'https://arxiv.org/abs/2607.09582v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Okezzi Ukorigho
  - Opeoluwa Owoyele
categories:
  - physics.flu-dyn
  - cs.LG
  - physics.flu-dyn
published: '2026-07-10T16:31:40Z'
fetched_at: '2026-07-13T23:03:29.913Z'
---
We present a physics-constrained machine learning framework for accelerating the direct numerical simulation (DNS) of turbulent reacting flows. The model replaces the direct evaluation of detailed chemical source terms with a surrogate that predicts reaction rates from a reduced thermochemical state. To improve physical consistency, the second law of thermodynamics is incorporated as a training constraint by enforcing non-negative entropy generation, which restricts the evolution of the thermochemical state to physically admissible directions and improves stability during time integration. The approach is demonstrated on DNS of a two-dimensional planar lean premixed methane-air flame interacting with a turbulent flow field. The model reproduces detailed-chemistry results with high fidelity while achieving more than an order-of-magnitude reduction in computational cost. Furthermore, a residual-based synthetic data augmentation strategy enables parametric exploration by constructing new training data from the original dataset, allowing accurate simulation at new inlet conditions without additional detailed-chemistry CFD runs. These results demonstrate that thermodynamically constrained machine learning can provide reliable and computationally efficient surrogates for detailed chemistry in high-fidelity combustion simulations.

Authors: Okezzi Ukorigho, Opeoluwa Owoyele
Categories: physics.flu-dyn, cs.LG, physics.flu-dyn
