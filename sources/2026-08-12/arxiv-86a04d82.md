---
title: >-
  Hierarchical Empirical-Bayes Naive Bayes: Minimax Smoothing and Calibration
  with AODE Extension
url: 'https://arxiv.org/abs/2608.11162v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nguyen Thai Anh
  - Truong Viet Vu
  - Tran Thien Thanh
  - Vo Nguyen Quoc Bao
  - Ngo Hoang Tu
categories:
  - cs.LG
  - cs.LG
published: '2026-08-11T17:21:31Z'
fetched_at: '2026-08-12T11:02:39.400Z'
---
The Naive Bayes (NB) classifier remains a standard choice for categorical data, yet its widely used smoothing rules, such as Laplace, Lidstone, Krichevsky-Trofimov, and the $m$-estimate, all prescribe a fixed smoothing strength that ignores feature cardinality, sample size, and class imbalance, inducing a non-vanishing bias on modern high-cardinality tabular data. We propose hierarchical empirical-Bayes Naive Bayes (HEB-NB), in which each class-feature conditional probability is smoothed by a Dirichlet prior whose concentration is learned data-adaptively via Type-II maximum likelihood, enabling principled information sharing across classes while retaining closed-form inference. We further introduce HEB average one-dependence estimators (HEB-AODE), showing that the adaptive smoothing transfers cleanly to structural relaxations of NB. Theoretically, we establish a non-asymptotic $\ell_1$ error bound for HEB-NB matching the empirical-distribution minimax rate plus a vanishing data-adaptive bias, together with a matching Laplace-tight lower bound that yields a finite-sample, risk-level strict separation from Laplace. We further derive a plug-in excess Bayes-risk bound via total-variation tensorization and a population top-1 expected calibration error (ECE) corollary. Empirically, across 31 UCI and OpenML benchmarks, HEB-NB attains the best average Friedman rank on probabilistic metrics, with up to 22.1% log-loss reductions on high-cardinality datasets and consistent improvements 

Authors: Nguyen Thai Anh, Truong Viet Vu, Tran Thien Thanh, Vo Nguyen Quoc Bao, Ngo Hoang Tu
Categories: cs.LG, cs.LG
