---
title: >-
  Radial Suppression Accelerates Algorithmic Generalization: A Geometric
  Analysis of Delayed Generalization
url: 'https://arxiv.org/abs/2606.32000v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Srijan Tiwari
  - Aditya Chauhan
  - Manjot Singh
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-30T17:34:13Z'
fetched_at: '2026-07-01T23:03:14.711Z'
---
Why do neural networks memorize algorithmic training data long before they generalize? We present a geometric case study demonstrating that, on tasks where generalization requires discovering structured low-dimensional circuits, the memorization-generalization delay is driven by radial inflation of hidden representations under cross-entropy optimization. We formalize a radial-angular decomposition of activation-space dynamics and derive three testable propositions: (i) that penalizing radial inflation induces anisotropic, data-dependent weight regularization; (ii) that it suppresses radial gradient energy below the isotropic random baseline, forcing predominantly angular updates; and (iii) that it biases convergence toward flatter minima. To empirically validate these propositions, we study a single-hyperparameter norm penalty that softly constrains activations to a sqrt(d)-radius hypersphere. On modular arithmetic, this penalty accelerates grokking up to 6x across MLPs and Transformers, and halves training steps for a 10M-parameter nanoGPT on 3-digit addition.

Authors: Srijan Tiwari, Aditya Chauhan, Manjot Singh
Categories: cs.LG, cs.AI, cs.LG
