---
title: >-
  Expectation Error Bounds for Transfer Learning in Linear Regression and Linear
  Neural Networks
url: 'https://arxiv.org/abs/2603.28739v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Meitong Liu
  - Christopher Jung
  - Rui Li
  - Xue Feng
  - Han Zhao
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-03-30T17:50:52Z'
fetched_at: '2026-03-31T16:54:12.139Z'
---
In transfer learning, the learner leverages auxiliary data to improve generalization on a main task. However, the precise theoretical understanding of when and how auxiliary data help remains incomplete. We provide new insights on this issue in two canonical linear settings: ordinary least squares regression and under-parameterized linear neural networks. For linear regression, we derive exact closed-form expressions for the expected generalization error with bias-variance decomposition, yielding necessary and sufficient conditions for auxiliary tasks to improve generalization on the main task. We also derive globally optimal task weights as outputs of solvable optimization programs, with consistency guarantees for empirical estimates. For linear neural networks with shared representations of width $q \leq K$, where $K$ is the number of auxiliary tasks, we derive a non-asymptotic expectation bound on the generalization error, yielding the first non-vacuous sufficient condition for beneficial auxiliary learning in this setting, as well as principled directions for task weight curation. We achieve this by proving a new column-wise low-rank perturbation bound for random matrices, which improves upon existing bounds by preserving fine-grained column structures. Our results are verified on synthetic data simulated with controlled parameters.

Authors: Meitong Liu, Christopher Jung, Rui Li, Xue Feng, Han Zhao
Categories: cs.LG, stat.ML, cs.LG
