---
title: Learning Over-Relaxation Policies for ADMM with Convergence Guarantees
url: 'https://arxiv.org/abs/2604.26932v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Junan Lin
  - Paul J. Goulart
  - Luca Furieri
categories:
  - math.OC
  - cs.LG
  - math.OC
published: '2026-04-29T17:45:52Z'
fetched_at: '2026-04-30T08:51:20.278Z'
---
The Alternating Direction Method of Multipliers (ADMM) is a widely used method for structured convex optimization, and its practical performance depends strongly on the choice of penalty and relaxation parameters. Motivated by settings such as Model Predictive Control (MPC), where one repeatedly solves related optimization problems with fixed structure and changing parameter values, we propose learning online updates of the relaxation parameter to improve performance on problem classes of interest. This choice is computationally attractive in OSQP-like architectures, since adapting relaxation does not trigger the matrix refactorizations associated with penalty updates. We establish convergence guarantees for ADMM with time-varying penalty and relaxation parameters under mild assumptions, and show on benchmark quadratic programs that the resulting learned policies improve both iteration count and wall-clock time over baseline OSQP.

Authors: Junan Lin, Paul J. Goulart, Luca Furieri
Categories: math.OC, cs.LG, math.OC
