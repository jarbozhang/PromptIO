---
title: Benchmarking Sheaf Neural Networks for Inductive Tasks
url: 'https://arxiv.org/abs/2608.02558v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Stefano Fiorini
  - Edoardo Coppola
  - Pietro Liò
categories:
  - cs.LG
  - cs.LG
published: '2026-08-03T17:41:20Z'
fetched_at: '2026-08-04T11:02:55.240Z'
---
Sheaf Neural Networks (SNNs) generalize message passing by replacing scalar edge weights of standard Graph Neural Networks (GNNs) with learnable, edge-dependent restriction maps between node stalks. Despite their strong theoretical foundations and promising transductive results, SNNs have been evaluated almost exclusively on transductive node classification, leaving their behaviour under inductive protocols unknown. We address this gap through the first systematic benchmark of the sheaf design space, evaluating three diffusion mechanisms (neural sheaf diffusion, sheaf attention, and sheaf attention with Graph Attention Network v2), three restriction-map parameterizations, three stalk dimensions, and six modern GNN architectural components, within a message-passing reformulation that never assembles the heavy sheaf Laplacian, making the full design space trainable under cross-graph batching. Across $1{,}890$ controlled experiments on 14 inductive datasets, multiple insights emerge: restriction maps are the dominant design choice and general maps are preferable, larger stalks add capacity but not long-range reach, architectural components explain more performance variation than the entire sheaf-specific design space itself. Under a matched protocol, SNNs transfer to inductive settings but do not reach the strongest baselines, with gaps being dataset-dependent. Practically, a single sheaf configuration can generalize across datasets, so effort is better spent tuning the surround

Authors: Stefano Fiorini, Edoardo Coppola, Pietro Liò
Categories: cs.LG, cs.LG
