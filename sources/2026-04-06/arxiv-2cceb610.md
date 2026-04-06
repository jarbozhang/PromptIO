---
title: >-
  go-$m$HC: Direct Parameterization of Manifold-Constrained Hyper-Connections
  via Generalized Orthostochastic Matrices
url: 'https://arxiv.org/abs/2604.02309v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Torque Dandachi
  - Sophia Diggs-Galligan
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-04-02T17:51:19Z'
fetched_at: '2026-04-06T00:50:51.197Z'
---
Doubly stochastic matrices enable learned mixing across residual streams, but parameterizing the set of doubly stochastic matrices (the Birkhoff polytope) exactly and efficiently remains an open challenge. Existing exact methods scale factorially with the number of streams ($d$), while Kronecker-factorized approaches are efficient but expressivity-limited. We introduce a novel exact parameterization grounded in the theory of generalized orthostochastic matrices, which scales as $\mathcal{O}(d^3)$ and exposes a single hyperparameter $s$ which continuously interpolates between a computationally efficient boundary and the fully expressive Birkhoff polytope. Building on Manifold-Constrained Hyper-Connections ($m$HC), a framework for learned dynamic layer connectivity, we instantiate this parameterization in go-$m$HC. Our method composes naturally with Kronecker-factorized methods, substantially recovering expressivity at similar FLOP costs. Spectral analysis indicates that go-$m$HC fills the Birkhoff polytope far more completely than Kronecker-factorized baselines. On synthetic stream-mixing tasks, go-$m$HC achieves the minimum theoretical loss while converging up to $10\times$ faster. We validate our approach in a 30M parameter GPT-style language model. The expressivity, efficiency, and exactness of go-$m$HC offer a practical avenue for scaling $d$ as a new dimension of model capacity.

Authors: Torque Dandachi, Sophia Diggs-Galligan
Categories: cs.LG, cs.CL, cs.LG
