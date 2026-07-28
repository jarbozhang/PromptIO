---
title: Learning Distributions from Multiple Data Providers
url: 'https://arxiv.org/abs/2607.24732v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jon Kleinberg
  - Amin Saberi
  - Xizhi Tan
  - Grigoris Velegkas
categories:
  - cs.DS
  - cs.GT
  - cs.LG
  - stat.ML
  - cs.DS
published: '2026-07-27T17:57:16Z'
fetched_at: '2026-07-28T11:02:16.571Z'
---
Motivated by learning from heterogeneous and overlapping data providers, we study a stylized model of distribution learning from restricted conditional samples. The goal is to learn an unknown distribution $p$ on a finite domain $[n]$. The learner is given a fixed family of queryable sets $\mathscr{S} \subseteq 2^{[n]}$, and each query to $S \in \mathscr{S}$ returns an independent sample from the conditional distribution $p(\cdot \mid S)$. Learnability is governed by the co-occurrence graph associated with $\mathscr{S}$: two domain elements are adjacent if they appear together in some queryable set. Pointwise consistency is achievable when this graph is connected on the target support. PAC learning requires more: it is possible when the co-occurrence graph is complete. The optimal sample complexity of PAC learning ranges from nearly linear to quadratic. Every query family with complete co-occurrence graph admits sample complexity $\widetilde O(n^2/ε^2)$, and this bound is tight in the worst case. On the other hand, if $[n]$ is queryable then ordinary sampling improves the bound to $Θ(n/ε^2)$, and this cannot be improved further even if every set is queryable. More generally, we identify hierarchical comparabilityas a sufficient structural condition on $\mathscr S$ under which the optimal complexity is nearly linear, $\widetilde Θ(n/ε^2)$, with pairwise query families as a canonical example. Finally, the full range of polynomial rates between linear and quadratic is attainable

Authors: Jon Kleinberg, Amin Saberi, Xizhi Tan, Grigoris Velegkas
Categories: cs.DS, cs.GT, cs.LG, stat.ML, cs.DS
