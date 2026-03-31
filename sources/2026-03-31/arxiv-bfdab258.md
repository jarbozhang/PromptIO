---
title: >-
  Stop Probing, Start Coding: Why Linear Probes and Sparse Autoencoders Fail at
  Compositional Generalisation
url: 'https://arxiv.org/abs/2603.28744v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Vitória Barin Pacela
  - Shruti Joshi
  - Isabela Camacho
  - Simon Lacoste-Julien
  - David Klindt
categories:
  - cs.LG
  - cs.LG
published: '2026-03-30T17:52:16Z'
fetched_at: '2026-03-31T04:42:13.117Z'
---
The linear representation hypothesis states that neural network activations encode high-level concepts as linear mixtures. However, under superposition, this encoding is a projection from a higher-dimensional concept space into a lower-dimensional activation space, and a linear decision boundary in the concept space need not remain linear after projection. In this setting, classical sparse coding methods with per-sample iterative inference leverage compressed sensing guarantees to recover latent factors. Sparse autoencoders (SAEs), on the other hand, amortise sparse inference into a fixed encoder, introducing a systematic gap. We show this amortisation gap persists across training set sizes, latent dimensions, and sparsity levels, causing SAEs to fail under out-of-distribution (OOD) compositional shifts. Through controlled experiments that decompose the failure, we identify dictionary learning -- not the inference procedure -- as the binding constraint: SAE-learned dictionaries point in substantially wrong directions, and replacing the encoder with per-sample FISTA on the same dictionary does not close the gap. An oracle baseline proves the problem is solvable with a good dictionary at all scales tested. Our results reframe the SAE failure as a dictionary learning challenge, not an amortisation problem, and point to scalable dictionary learning as the key open problem for sparse inference under superposition.

Authors: Vitória Barin Pacela, Shruti Joshi, Isabela Camacho, Simon Lacoste-Julien, David Klindt
Categories: cs.LG, cs.LG
