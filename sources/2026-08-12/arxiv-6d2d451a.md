---
title: 'Beyond a Bag of Features: Set-Level Instability in Sparse Autoencoders'
url: 'https://arxiv.org/abs/2608.11197v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nikolai Bolik
  - Lennart Stöpler
  - Artur Andrzejak
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-08-11T17:55:59Z'
fetched_at: '2026-08-12T11:02:39.398Z'
---
Shani et al. (2026) show that LLM representations broadly recover human category boundaries, while failing to reflect fine-grained typicality structure. Their analysis uses cosine similarity over dense model representations. We revisit their approach using overlap over active sparse autoencoder (SAE) latent sets as a more interpretable similarity measure. We first verify that this set-level measure is meaningful: SAE latent sets can recover union-like compositional structure in controlled toy models and induce semantically coherent neighborhoods in natural text. Extending the human-concepts analysis to SAE set similarities, we find that SAE activation sets do not recover human category boundaries or within-category typicality more faithfully than dense embeddings or residual-stream states, but instead track model-internal similarity structure. To probe this gap further, we study active latent sets under well-controlled semantic modifications, revealing a substantial mismatch between human judgements of conceptual change and change in the SAE active set. We interpret this as evidence that, outside idealised settings, SAE features do not compose via simple bag-of-features semantics.

Authors: Nikolai Bolik, Lennart Stöpler, Artur Andrzejak
Categories: cs.LG, cs.CL, cs.LG
