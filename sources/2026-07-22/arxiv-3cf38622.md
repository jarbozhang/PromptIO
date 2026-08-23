---
title: 1-Lipschitz Neural Networks on Hadamard Manifolds
url: 'https://arxiv.org/abs/2607.19335v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Davide Murari
  - Marta Ghirardelli
  - Ben Adcock
  - Elena Celledoni
  - Brynjulf Owren
categories:
  - math.NA
  - cs.LG
  - math.NA
published: '2026-07-21T17:54:34Z'
fetched_at: '2026-07-22T11:02:38.789Z'
---
Controlling the Lipschitz constant of a neural network is a standard way to promote robustness and stability. Most existing constraining strategies are designed for Euclidean spaces. In this work, we construct and analyze a class of 1-Lipschitz neural networks on Hadamard manifolds. Our layers are of gradient-descent type, $1$-Lipschitz, and quasi-$α$-firmly nonexpansive. The core building blocks of the proposed architecture are Busemann functions, and we exploit the properties of Busemann gradient flows to design $1$-Lipschitz geometry-preserving layers. We provide explicit constructions and examples for hyperbolic manifolds and the manifold of symmetric positive definite (SPD) matrices. We test the proposed architecture in two numerical experiments: robust classification on the Poincaré disk and masked-Wishart covariance reconstruction. On the Poincaré disk, the proposed networks yield robust classifiers under hyperbolic perturbations. On the SPD manifold, we train SPD-valued denoisers and adopt them as a Plug-and-Play prior for a masked-Wishart covariance reconstruction problem. We show improved results from the nonexpansive denoiser over static, data-only, and Log-Euclidean denoising baselines, and empirically test its convergence properties.

Authors: Davide Murari, Marta Ghirardelli, Ben Adcock, Elena Celledoni, Brynjulf Owren
Categories: math.NA, cs.LG, math.NA
