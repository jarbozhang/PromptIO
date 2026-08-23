---
title: >-
  Dimensionality Reduction Meets Network Science: Sensemaking on UMAP's kNN
  Graph
url: 'https://arxiv.org/abs/2607.08746v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Duen Horng Chau
  - Donghao Ren
  - Fred Hohman
  - Dominik Moritz
categories:
  - cs.LG
  - cs.AI
  - cs.DS
  - cs.HC
  - cs.LG
published: '2026-07-09T17:47:08Z'
fetched_at: '2026-07-12T23:02:53.801Z'
---
While UMAP is widely used for exploring high-dimensional data, typical workflows focus on its lower-dimensional embedding, largely overlooking the rich k-nearest-neighbor (kNN) graph that UMAP constructs internally. This graph encodes the data manifold in its original high-dimensional space, before the distortion that UMAP's 2D projection introduces. We demonstrate the untapped potential of this internal representation, showing how standard graph algorithms applied to this graph enhance data sensemaking: (1) PageRank identifies representative data points, (2) k-core decomposition reveals dense core regions versus sparse periphery, and (3) clustering coefficient detects tight-knit neighborhoods with highly-similar data points. Through quantitative and qualitative evaluation on MNIST and Fashion MNIST, we show that these graph-based analyses are not only practical but also competitive with or complementary to purpose-built methods (e.g., k-medoids for exemplar selection, HDBSCAN for density-based clustering).

Authors: Duen Horng Chau, Donghao Ren, Fred Hohman, Dominik Moritz
Categories: cs.LG, cs.AI, cs.DS, cs.HC, cs.LG
