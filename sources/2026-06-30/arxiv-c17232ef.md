---
title: >-
  Second-Order KKT Guarantees for Bregman ADMM in Nonconvex and Non-Lipschitz
  Optimization
url: 'https://arxiv.org/abs/2606.28307v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shuang Li
  - Zhihui Zhu
  - Qiuwei Li
categories:
  - math.OC
  - cs.LG
  - math.OC
published: '2026-06-26T17:52:39Z'
fetched_at: '2026-06-29T23:02:47.142Z'
---
We analyze Bregman ADMM for nonconvex linearly constrained problems under two-sided relative smoothness, a condition that replaces the standard Lipschitz gradient assumption with a Hessian comparison relative to a Bregman kernel. This setting covers polynomial objectives arising in matrix and tensor models for which a global Lipschitz-gradient constant need not exist. We show that on an invariant open state-space domain, one iteration of Bregman ADMM defines a smooth primal--dual fixed-point map whose strict-saddle KKT points are unstable fixed points; consequently, from random initialization the iterates converge to a strict saddle with probability zero. Combined with existing first-order convergence results, this yields almost-sure second-order stationarity of limiting KKT points. We extend the analysis to a multi-block star consensus formulation for distributed optimization. The technical novelty lies in a determinant reduction with a Bregman-specific symmetrization and scaling step in the two block spectral argument, together with a null space cancellation exploiting the star graph structure in the consensus case. Numerical experiments on distributed matrix factorization illustrate the theory, and a symmetric tensor factorization example demonstrates the broader Bregman proximal splitting idea beyond the separable consensus setting.

Authors: Shuang Li, Zhihui Zhu, Qiuwei Li
Categories: math.OC, cs.LG, math.OC
