---
title: >-
  EvoStruct: Bridging Evolutionary and Structural Priors for Antibody CDR Design
  via Protein Language Model Adaptation
url: 'https://arxiv.org/abs/2605.21485v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mansoor Ahmed
  - Sujin Lee
  - Umar Khayaz
  - Murray Patterson
categories:
  - cs.LG
  - cs.LG
published: '2026-05-20T17:59:16Z'
fetched_at: '2026-05-22T00:18:38.667Z'
---
Equivariant graph neural network (GNN) methods for antibody complementarity-determining region (CDR) design achieve the highest sequence recovery but suffer from severe vocabulary collapse. The current best GNN methods over-predict very few amino acids, such as tyrosine and glycine, while ignoring functionally important residues. We trace this failure to GNN encoders learning amino acid distributions de novo from limited structural data, discarding substitution patterns encoded in evolutionary databases. To resolve this, we propose EvoStruct, which bridges a frozen protein language model (PLM) with 3D structural context from an E(3)-equivariant GNN via a cross-attention adapter. Unlike prior PLM-structure adapters for general protein design, EvoStruct targets the vocabulary collapse problem specific to CDR design through progressive PLM unfreezing and R-Drop consistency regularization. On the CHIMERA-Bench dataset, EvoStruct achieves the highest amino acid recovery and lowest perplexity among several antibody design methods, improving sequence recovery by 16% and reducing perplexity by 43% relative to the best GNN baselines, while recovering 2.3x greater amino acid diversity and the highest binding-pair correlation with ground truth.

Authors: Mansoor Ahmed, Sujin Lee, Umar Khayaz, Murray Patterson
Categories: cs.LG, cs.LG
