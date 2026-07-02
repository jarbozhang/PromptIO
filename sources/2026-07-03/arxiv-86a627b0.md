---
title: 'QuasiMoTTo: Quasi-Monte Carlo Test-Time Scaling'
url: 'https://arxiv.org/abs/2607.01179v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Michael Y. Li
  - Anthony Zhan
  - Kanishk Gandhi
  - Noah D. Goodman
  - Emily B. Fox
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-07-01T17:10:08Z'
fetched_at: '2026-07-02T23:01:57.294Z'
---
Scaling inference compute, by generating many parallel attempts per problem, is a costly but reliable lever for improving language model capabilities. By default these attempts are generated independently, wasting inference compute on redundant solutions. This waste seems unavoidable. After all, independence is what makes parallel sampling trivial to scale. However, this tradeoff is not fundamental: there is a rich design space of samplers that generate correlated but exact samples entirely in parallel. We explore this design space as an avenue for improving sample efficiency in scaling inference compute and reinforcement learning (RL). Concretely, we introduce QuasiMoTTo, which uses correlated samples as a drop-in replacement for i.i.d. samples. To generate these samples, QuasiMoTTo uses a reparameterization of autoregressive sampling as inverse-CDF sampling and draws the underlying uniforms with quasi-Monte Carlo (QMC); because QMC spreads the uniforms out more evenly than i.i.d., the resulting samples cover the output space with far less redundancy. Even though the batch is correlated, each sample is marginally distributed according to the language model, so we can use the batch for policy-gradient training. Our empirical analysis focuses on understanding how efficiently QuasiMoTTo can turn compute into performance. To evaluate correlated samplers, whose dependence breaks standard pass@k estimators, we first develop an unbiased bootstrap estimator. Across four reasoning be

Authors: Michael Y. Li, Anthony Zhan, Kanishk Gandhi, Noah D. Goodman, Emily B. Fox
Categories: cs.LG, cs.CL, cs.LG
