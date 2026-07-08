---
title: >-
  Graph Convolutional Attention: A Spectral Perspective on Graph Denoising and
  Diffusion
url: 'https://arxiv.org/abs/2607.06546v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shervin Khalafi
  - Igor Krawczuk
  - Sergio Rozada
  - Charilaos Kanatsoulis
  - Antonio G Marques
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-07T17:52:17Z'
fetched_at: '2026-07-08T23:03:06.292Z'
---
Denoising graphs is a fundamental problem in graph learning and the core operation of graph diffusion models. Attention-based architectures like graph transformers have recently shown promise in denoising graphs. However, our principled understanding of attention-based graph denoising remains limited, making it unclear whether standard attention is the right mechanism for this task. Here we show that, under a denoising objective, linear attention is suboptimal and can only learn an average spectral denoising filter over the training distribution. This creates a fundamental limitation as graphs often vary spectrally across the distribution. To overcome this limitation, we introduce Spectral Attention, which directly utilizes the input graph spectrum and provably outperforms linear attention by a margin governed by the spectral diversity of the distribution. We then derive Graph Convolutional Attention (GCA), a practical and permutation-equivariant realization of this idea that implements spectral denoising through graph-filtered queries and keys. For stochastic block models, GCA provably matches the idealized Spectral Attention mechanism. We further show that the softmax operation, that follows the attention, provides additional denoising by approximately projecting noisy eigenvectors onto the clean eigenspace. Empirically, replacing linear attention with GCA consistently improves graph denoising and diffusion on synthetic and real datasets, with gains strongly correlated with

Authors: Shervin Khalafi, Igor Krawczuk, Sergio Rozada, Charilaos Kanatsoulis, Antonio G Marques
Categories: cs.LG, cs.AI, cs.LG
