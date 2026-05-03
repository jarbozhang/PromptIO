---
title: Global Optimality for Constrained Exploration via Penalty Regularization
url: 'https://arxiv.org/abs/2604.28144v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Florian Wolf
  - Ilyas Fatkhullin
  - Niao He
categories:
  - cs.LG
  - math.OC
  - cs.LG
published: '2026-04-30T17:31:46Z'
fetched_at: '2026-05-03T12:56:18.795Z'
---
Efficient exploration is a central problem in reinforcement learning and is often formalized as maximizing the entropy of the state-action occupancy measure. While unconstrained maximum-entropy exploration is relatively well understood, real-world exploration is often constrained by safety, resource, or imitation requirements. This constrained setting is particularly challenging because entropy maximization lacks additive structure, rendering Bellman-equation-based methods inapplicable. Moreover, scalable approaches require policy parameterization, inducing non-convexity in both the objective and the constraints. To our knowledge, the only prior model-free policy-gradient approach for this setting under general policy parameterization is due to Ying et al. (2025). Unfortunately, their guarantees are limited to weak regret and ergodic averages, which do not imply that the final output is a single deployable policy that is near-optimal and nearly feasible. In this work we take a different approach to this problem, and propose Policy Gradient Penalty (PGP) method, a single-loop policy-space method that enforces general convex occupancy-measure constraints via quadratic-penalty regularization. PGP constructs pseudo-rewards that yield gradient estimates of the penalized objective, subsequently exploiting the classical Policy Gradient Theorem. We further establish the regularity of the penalized objective, providing the smoothness properties needed to justify the convergence of PGP

Authors: Florian Wolf, Ilyas Fatkhullin, Niao He
Categories: cs.LG, math.OC, cs.LG
