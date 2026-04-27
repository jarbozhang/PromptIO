---
title: >-
  Operational Feature Fingerprints of Graph Datasets via a White-Box
  Signal-Subspace Probe
url: 'https://arxiv.org/abs/2604.22676v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuchen Xiong
  - Swee Keong Yeap
  - Zhen Hong Ban
categories:
  - cs.LG
  - cs.LG
published: '2026-04-24T16:00:53Z'
fetched_at: '2026-04-27T07:57:01.883Z'
---
Graph neural networks achieve strong node-classification accuracy, but their learned message passing entangles ego attributes, neighborhood smoothing, high-pass graph differences, class geometry, and classifier boundaries in an opaque representation. This obscures why a node is classified and what feature-level graph-learning mechanisms a dataset requires. We propose WG-SRC, a white-box signal-subspace probe for prediction and graph dataset diagnosis. WG-SRC replaces learned message passing with a fixed, named graph-signal dictionary of raw features, row-normalized and symmetric-normalized low-pass propagation, and high-pass graph differences. It combines Fisher coordinate selection, class-wise PCA subspaces, closed-form multi-alpha ridge classification, and validation-based score fusion, so prediction and analysis use explicit class subspaces, energy-controlled dimensions, and closed-form linear decisions. As a white-box graph-learning instrument, WG-SRC uses predictive performance to validate its diagnostics: across six node-classification datasets, the scaffold remains competitive with reproduced graph baselines and achieves positive average gain under aligned splits. Its atlas, produced by a predictor, decomposes behavior into raw-feature, low-pass, high-pass, class-geometric, and ridge-boundary components. These operational feature fingerprints distinguish low-pass-dominated Amazon graphs, mixed high-pass and class-geometrically complex Chameleon behavior, and raw- or bo

Authors: Yuchen Xiong, Swee Keong Yeap, Zhen Hong Ban
Categories: cs.LG, cs.LG
