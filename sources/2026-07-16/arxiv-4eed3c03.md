---
title: 'LatentFlow: A General Framework for Conditioning Stochastic Processes'
url: 'https://arxiv.org/abs/2607.12922v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Louis Sharrock
  - Lachlan Astfalck
  - Henry Moss
categories:
  - stat.ML
  - cs.LG
  - stat.ME
  - stat.ML
published: '2026-07-14T15:56:44Z'
fetched_at: '2026-07-15T23:03:05.479Z'
---
Stochastic-process models are, as a rule, far easier to simulate than to condition. Non-linear observations, non-Gaussian likelihoods, black-box information, and global constraints all induce intractable conditional laws, requiring bespoke, model-specific constructions. We introduce LatentFlow, a single framework for conditioning stochastic processes, with no learned neural approximations and no training. Our starting point is to write the stochastic process as the deterministic image of a tractable latent innovation, $f_0 = T_{\vartheta}(ξ_0)$, with $ξ_0$ sampled from a simple reference distribution. This reduces process-level conditioning to latent-space inference: pull the likelihood back through $T_{\vartheta}$, sample the resulting latent law with a tractable guided probability flow, and push the samples forward. This construction is provably exact at the level of the target law; in practice, approximation enters only through finite terminal noising, Monte Carlo guidance, and time discretisation of the continuous-time dynamics, each of which is explicit and systematically reducible. As LatentFlow is training-free, conditioning reduces to solving a single reverse-time SDE. This enables conditional sampling in seconds on a single desktop CPU across model classes that have never shared a scalable method: classical spatial priors, nonlinear stochastic dynamics, mechanistic models from the physical and life sciences, stochastic PDEs, heavy-tails and extremes, point and discre

Authors: Louis Sharrock, Lachlan Astfalck, Henry Moss
Categories: stat.ML, cs.LG, stat.ME, stat.ML
