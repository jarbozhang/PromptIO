---
title: >-
  When Can You Correct Distribution Drift in Temporal Graph Generation? A
  Sharpening--Drift Tension and an Impossibility for Observation-Based
  Correction
url: 'https://arxiv.org/abs/2607.24662v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tianpeng Li
  - Xuan Guo
  - Wenjun Wang
  - Wang Zhang
  - Pengfei Jiao
categories:
  - cs.LG
  - cs.SI
  - cs.LG
published: '2026-07-27T16:59:57Z'
fetched_at: '2026-07-28T11:02:16.574Z'
---
Generative models of temporal graphs are trained on one stretch of an evolving network and deployed on the next, and they degrade badly in the gap. We show this degradation is derivable, general, and not fixable from observations. The masked flow-matching loss decomposes exactly, with no independence assumption, into an irreducible entropy plus a divergence whose derivative along the training path is positive precisely for structures rare during training and common at deployment, diverging as their training probability goes to zero. Empirically the trade-off is a power law with exponent $-0.605$ ($R^2=0.9977$), and drift raises the sampler's error floor without changing how many steps reach it: across seven well-powered conditions the drift-period marginal error varies by at most $6\%$ over a $50\times$ range of sampling budgets, while the floor sits $2.2\times$ to $34.3\times$ above the in-period floor. Because the deployment period is observed, correction looks like a matter of measurement. It is not. We prove that any corrector measurable with respect to past observations leaves at least the conditional variance of the statistic it tracks, and that trend extrapolation beats trusting the last observation only when $μ^2&gt;v(1-2ρ)$. Both premises are measurable and both go the wrong way: the drift is trendless and mean-reverting, with a one-step innovation as large as the drift itself. An oracle removes $60\%$ of the error, the best observation-based corrector recovers $5.7\

Authors: Tianpeng Li, Xuan Guo, Wenjun Wang, Wang Zhang, Pengfei Jiao
Categories: cs.LG, cs.SI, cs.LG
