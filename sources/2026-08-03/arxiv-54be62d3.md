---
title: 'CENDRe: Concept Extraction with Natural Domain Representations'
url: 'https://arxiv.org/abs/2607.29621v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Antonia Holzapfel
  - Andres Felipe Posada Moreno
  - Sebastian Trimpe
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-31T16:56:27Z'
fetched_at: '2026-08-03T11:02:19.118Z'
---
Convolutional neural networks (CNNs) are widely used for time-series classification, but their deployment in critical domains requires understanding the temporal and spectral patterns that drive their predictions. Concept extraction (CE) methods identify such patterns by analyzing representations within the models' latent space. However, existing time-series CE methods have three limitations: they operate only in the time domain and overlook frequency features, predefine the number of concepts, and produce localizations misaligned with the regions the model uses. We address these limitations by proposing CENDRe, a concept extraction method for CNNs. It first discovers concepts by clustering per-timestep latent representations in two stages, where silhouette-guided aggregation selects the number of concepts automatically. Then, it localizes each concept through gradients of a presence score that contrasts the latent representations with their prototypes, producing masks that concentrate on the regions driving the concept. These gradients, propagated through a differentiable invertible mapping of the input such as a Fourier transform, yield localizations for the same concepts in the frequency domain. Finally, each concept receives a relevance score that quantifies its contribution to each class. On synthetic benchmarks, CENDRe achieves representation correctness comparable to state-of-the-art CE methods and significantly higher importance correctness. On real bearing-fault data

Authors: Antonia Holzapfel, Andres Felipe Posada Moreno, Sebastian Trimpe
Categories: cs.LG, cs.AI, cs.LG
