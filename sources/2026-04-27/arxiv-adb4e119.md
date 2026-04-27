---
title: >-
  Spend Less, Fit Better: Budget-Efficient Scaling Law Fitting via Active
  Experiment Selection
url: 'https://arxiv.org/abs/2604.22753v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sijie Li
  - Shanda Li
  - Haowei Lin
  - Weiwei Sun
  - Ameet Talwalkar
categories:
  - cs.LG
  - cs.LG
published: '2026-04-24T17:59:42Z'
fetched_at: '2026-04-27T07:57:01.874Z'
---
Scaling laws are used to plan multi-million-dollar training runs, but fitting those laws can itself cost millions. In modern large-scale workflows, assembling a sufficiently informative set of pilot experiments is already a major budget-allocation problem rather than a routine preprocessing step. We formulate scaling-law fitting as budget-aware sequential experimental design: given a finite pool of runnable experiments with heterogeneous costs, choose which runs to execute so as to maximize extrapolation accuracy in a high-cost target region. We then propose an uncertainty-aware method for sequentially allocating experimental budget toward the runs most useful for target-region extrapolation. Across a diverse benchmark of scaling-law tasks, our method consistently outperforms classical design-based baselines, and often approaches the performance of fitting on the full experimental set while using only about 10% of the total training budget. Our code is available at https://github.com/PlanarG/active-sl.

Authors: Sijie Li, Shanda Li, Haowei Lin, Weiwei Sun, Ameet Talwalkar
Categories: cs.LG, cs.LG
