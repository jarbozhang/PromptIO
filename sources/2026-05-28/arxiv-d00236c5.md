---
title: >-
  Bias Leaves a Gradient Trail: Label-Free Bias Identification via Gradient
  Probes on Concept Decompositions
url: 'https://arxiv.org/abs/2605.28780v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Thomas Vitry
  - Kieran Edgeworth
  - Stefan Wermter
  - Jae Hee Lee
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-05-27T17:39:10Z'
fetched_at: '2026-05-28T03:17:22.086Z'
---
Vision classifiers can exploit spurious correlations, achieving high in-distribution accuracy yet failing under distribution shift. Existing approaches to bias mitigation and analysis often depend on curated datasets, spurious-attribute or group labels, or retraining, which may be infeasible once a model is deployed or the relevant bias is unknown. We present a bias-label-free, post-hoc method for identifying spurious concepts in frozen vision models, relying only on standard class labels from a held-out audit dataset. For each target class, we collect patches from inputs predicted as that class and apply non-negative matrix factorization to intermediate activations to obtain a bank of interpretable concept vectors. Candidate concepts are then ranked with a bias estimator derived from their interaction with backpropagated gradients on misclassified examples: bias concepts tend to get activated when correcting false negatives and suppressed when correcting false positives. On Colored MNIST and Waterbirds the method recovers concepts aligned with the known spurious cue, and on CelebA it surfaces decision-relevant directions that only partially coincide with the annotated gender attribute; suppressing the top-ranked concepts at inference time improves worst-group accuracy by up to 17.9 percentage points on Waterbirds and 10.4 on CelebA without any retraining or parameter updates. Our method identifies decision-relevant spurious directions that need not coincide with annotated on

Authors: Thomas Vitry, Kieran Edgeworth, Stefan Wermter, Jae Hee Lee
Categories: cs.CV, cs.LG, cs.CV
