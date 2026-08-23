---
title: Which Nash Equilibrium? Solver-Dependent Selection on Zero-Sum Nash Polytopes
url: 'https://arxiv.org/abs/2606.28308v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Luis Leal
categories:
  - cs.GT
  - cs.AI
  - cs.LG
  - cs.MA
  - cs.GT
published: '2026-06-26T17:53:30Z'
fetched_at: '2026-06-29T23:02:47.141Z'
---
Many two-player zero-sum games admit not a unique Nash equilibrium but a convex set of them: a polytope of profiles that all share the minimax value V* yet prescribe different behaviour. Standard solvers each converge to some equilibrium and are treated as interchangeable. We ask whether they instead select different members of the Nash set, systematically as a function of the algorithm rather than the seed. Using a tabular, exactly solvable testbed of six games with analytically known Nash sets -- including a two-dimensional Nash polytope and Kuhn poker -- we find that (i) selection is determined by the algorithm, not the seed, but families differ only on asymmetric Nash sets; (ii) regularized last-iterate methods (R-NaD, magnetic mirror descent) select the maximum-entropy member, the information projection of their uniform reference onto the Nash set -- exactly on the 2-D polytope and at 99.7% of maximum entropy in Kuhn -- while regret-averaging methods (CFR, CFR+, fictitious play) drift to a lower-entropy face; we confirm this on a randomized 180-game ensemble, where R-NaD attains the maximum-entropy member in 100% of converged games while CFR+ sits strictly below it in 94% (paired Wilcoxon p &lt; 10^-27); (iii) the selected member has downstream consequences against sub-optimal opponents that scale with sequential/hidden-information structure but stay bounded -- in Kuhn the max-entropy member is a strictly better hedge, whereas on the matrix games the members differ witho

Authors: Luis Leal
Categories: cs.GT, cs.AI, cs.LG, cs.MA, cs.GT
