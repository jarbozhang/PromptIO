---
title: 'G-RRM: Guiding Symbolic Solvers with Recurrent Reasoning Models'
url: 'https://arxiv.org/abs/2607.02491v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Timo Bertram
  - Sidhant Bhavnani
  - Richard Freinschlag
  - Erich Kobler
  - Andreas Mayr
categories:
  - cs.AI
  - cs.AI
published: '2026-07-02T17:53:31Z'
fetched_at: '2026-07-05T23:02:48.003Z'
---
In this work, we focus on SE-RRMs, a symbol-equivariant instantiation of RRMs that exhibits improved extrapolation to larger problem sizes. We propose a neuro-symbolic approach, ``Guiding with Recurrent Reasoning Models'' (G-RRM), which integrates SE-RRMs with symbolic solvers for constraint satisfaction problems. SE-RRMs act as neural solvers that generate full solution proposals and guide classical symbolic solvers, such as backtracking or SAT-based methods like Glucose 4.1 and CaDiCaL 3.0.0, that produce globally correct solutions. Centrally, we investigate when neural guidance with G-RRM improves the search efficiency of symbolic solvers. % Our experiments show that the efficacy of G-RRM depends on two conditions: first, the problem instances must have an expansive combinatorial search space to expose potential gains, and second, the solver architecture must be capable of dynamically overwriting its branching choices to recover when neural hints are imperfect. When these conditions hold, guidance drives median conflict counts to zero and yields significant wall-clock speedups: on $9\times9$ Sudoku, where the SE-RRM correctly solves $91.1\%$ of instances, backtracking accelerates by $33.3\times$ and Glucose 4.1 by $1.70\times$ (median, $p&lt;0.001$), with Glucose 4.1 retaining a $1.17\times$ speedup on perfect-hint $25\times25$ grids. In contrast, CaDiCaL 3.0.0, whose runtime is overhead-dominated and which always respects the injected branching hints rather than overwriti

Authors: Timo Bertram, Sidhant Bhavnani, Richard Freinschlag, Erich Kobler, Andreas Mayr
Categories: cs.AI, cs.AI
