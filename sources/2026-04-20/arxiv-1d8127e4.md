---
title: Geometric regularization of autoencoders via observed stochastic dynamics
url: 'https://arxiv.org/abs/2604.16282v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sean Hill
  - Felix X. -F. Ye
categories:
  - cs.LG
  - math.DS
  - math.PR
  - cs.LG
published: '2026-04-17T17:44:02Z'
fetched_at: '2026-04-20T05:39:43.391Z'
---
Stochastic dynamical systems with slow or metastable behavior evolve, on long time scales, on an unknown low-dimensional manifold in high-dimensional ambient space. Building a reduced simulator from short-burst ambient ensembles is a long-standing problem: local-chart methods like ATLAS suffer from exponential landmark scaling and per-step reprojection, while autoencoder alternatives leave tangent-bundle geometry poorly constrained, and the errors propagate into the learned drift and diffusion. We observe that the ambient covariance~$Λ$ already encodes coordinate-invariant tangent-space information, its range spanning the tangent bundle. Using this, we construct a tangent-bundle penalty and an inverse-consistency penalty for a three-stage pipeline (chart learning, latent drift, latent diffusion) that learns a single nonlinear chart and the latent SDE. The penalties induce a function-space metric, the $ρ$-metric, strictly weaker than the Sobolev $H^1$ norm yet achieving the same chart-quality generalization rate up to logarithmic factors. For the drift, we derive an encoder-pullback target via Itô's formula on the learned encoder and prove a bias decomposition showing the standard decoder-side formula carries systematic error for any imperfect chart. Under a $W^{2,\infty}$ chart-convergence assumption, chart-level error propagates controllably to weak convergence of the ambient dynamics and to convergence of radial mean first-passage times. Experiments on four surfaces embedde

Authors: Sean Hill, Felix X. -F. Ye
Categories: cs.LG, math.DS, math.PR, cs.LG
