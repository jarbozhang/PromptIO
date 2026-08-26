---
title: >-
  Parameterized Complexity of $L_p$-Lipschitz Constants for Input Convex Neural
  Networks and $L_p$-Norm Maximization over Zonotopes
url: 'https://arxiv.org/abs/2608.24865v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aritra Das
  - Vincent Froese
  - Moritz Grillo
  - Debayan Gupta
  - Christoph Hertrich
categories:
  - cs.CC
  - cs.DM
  - cs.LG
  - cs.NE
  - cs.CC
published: '2026-08-25T17:47:37Z'
fetched_at: '2026-08-26T11:02:45.105Z'
---
Lipschitz constants are a standard way to quantify the sensitivity of neural networks to small input perturbations, but computing them is difficult even for shallow ReLU networks. We study this problem for two-layer input-convex neural networks (ICNNs), a restricted architecture where nonnegative output weights enforce convexity. Computing the $L_p$-Lipschitz constant for these networks is equivalent to maximizing the dual norm over a zonotope. While $L_1$- and $L_\infty$-norm maximization on zonotopes admit fixed-parameter and polynomial-time algorithms, respectively, the parameterized complexity of the remaining $L_p$-norms was open. We prove that, for every fixed $p\in (1,\infty)\cap \mathbb{Q}$, maximizing the $L_p$-norm over a zonotope in $\mathbb{R}^d$ is W[1]-hard with respect to the dimension $d$. Moreover, our hardness results imply that brute-force enumeration algorithms are essentially optimal for this problem under the Exponential Time Hypothesis. By duality, the same hardness results hold for computing the $L_p$-Lipschitz constant of two-layer ReLU ICNNs. Our proof first establishes the result for the $L_2$-norm and then transfers the construction to arbitrary fixed $p\in (1,\infty)\cap\mathbb{Q}$ using a suitable Taylor approximation. These results resolve the corresponding questions regarding the parameterized complexity status for zonotope norm maximization and two-layer ICNN Lipschitz constants. Our paper resolves an open problem posted at COLT'25. There are 

Authors: Aritra Das, Vincent Froese, Moritz Grillo, Debayan Gupta, Christoph Hertrich
Categories: cs.CC, cs.DM, cs.LG, cs.NE, cs.CC
