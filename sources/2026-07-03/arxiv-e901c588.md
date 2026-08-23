---
title: Neural Certificate Pricing for Combinatorial Optimization Problems
url: 'https://arxiv.org/abs/2607.01185v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jingyi Chen
  - Xinyuan Zhang
  - Xinwu Qian
categories:
  - cs.LG
  - cs.LG
published: '2026-07-01T17:17:55Z'
fetched_at: '2026-07-02T23:01:57.293Z'
---
Combinatorial optimization (CO) problems are difficult because certifiable discrete structure induces exponential search. One needs to search over the set exponentially many candidates to certify optimality, however, the structural feasibility of a path, packing, or cover can be verified in polynomial time once supplied. In this study, we introduce Neural Certificate Pricing (NCP) that exploits this asymmetry under an unsupervised learning framework. A neural network is trained to predict certificate-level dual prices, while a structured recovery layer constructs the induced primal marginal. NCP can be viewed as amortized separation: instead of enumerating violated inequalities, it learns the residual prices through which their aggregate effect enters recovery. When the certificate-consistency condition holds, the recovered marginal is globally feasible, and a local theory shows that first-order errors in the predicted price induce only second-order loss in objective value. Across three classes of CO problems, NCP either outperforms state-of-the-art neural baselines by large margins or matches them at a fraction of the computation time, and shows stronger out-of-distribution generalization.

Authors: Jingyi Chen, Xinyuan Zhang, Xinwu Qian
Categories: cs.LG, cs.LG
