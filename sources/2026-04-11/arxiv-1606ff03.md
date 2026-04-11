---
title: The Impact of Dimensionality on the Stability of Node Embeddings
url: 'https://arxiv.org/abs/2604.08492v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tobias Schumacher
  - Simon Reichelt
  - Markus Strohmaier
categories:
  - cs.LG
  - cs.LG
published: '2026-04-09T17:33:02Z'
fetched_at: '2026-04-11T01:43:18.434Z'
---
Previous work has established that neural network-based node embeddings return different outcomes when trained with identical parameters on the same dataset, just from using different training seeds. Yet, it has not been thoroughly analyzed how key hyperparameters such as embedding dimension could impact this instability. In this work, we investigate how varying the dimensionality of node embeddings influences both their stability and downstream performance. We systematically evaluate five widely used methods -- ASNE, DGI, GraphSAGE, node2vec, and VERSE -- across multiple datasets and embedding dimensions. We assess stability from both a representational perspective and a functional perspective, alongside performance evaluation. Our results show that embedding stability varies significantly with dimensionality, but we observe different patterns across the methods we consider: while some approaches, such as node2vec and ASNE, tend to become more stable with higher dimensionality, other methods do not exhibit the same trend. Moreover, we find that maximum stability does not necessarily align with optimal task performance. These findings highlight the importance of carefully selecting embedding dimension, and provide new insights into the trade-offs between stability, performance, and computational effectiveness in graph representation learning.

Authors: Tobias Schumacher, Simon Reichelt, Markus Strohmaier
Categories: cs.LG, cs.LG
