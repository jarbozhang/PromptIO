---
title: >-
  BioKERN: Biological Kernel Regularization for Histology-to-Transcriptomics
  Neighborhood Retrieval
url: 'https://arxiv.org/abs/2608.24823v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seungik Cho
  - Betul Orcan-Ekmekci
categories:
  - cs.LG
  - q-bio.QM
  - cs.LG
published: '2026-08-25T17:04:16Z'
fetched_at: '2026-08-26T11:02:45.134Z'
---
Spatially resolved biology requires representations that preserve biological neighborhood structure rather than only exact cross-modal correspondences. Existing histology--transcriptomics objectives can emphasize instance-level matching even when non-paired spots share molecular or spatial context. We introduce BioKERN, a multimodal spatial representation-learning framework that incorporates biological structure as an explicit, learnable inductive bias. BioKERN constructs a training-time biological kernel by combining transcriptomic similarity and spatial proximity, then uses it to provide graded neighborhood supervision and regularize embedding geometry. Evaluation uses a fixed, model-independent biological neighborhood definition shared by all methods. Across Mouse Brain Visium and Human Liver GSE240429, BioKERN consistently improves biological-neighborhood retrieval over BLEEP in both single- and multi-scale settings. Controlled shared-architecture experiments show that most of the improvement arises from biological-kernel regularization rather than increased model capacity. These results support explicit biological geometry as an interpretable inductive bias for multimodal learning in spatial biology.

Authors: Seungik Cho, Betul Orcan-Ekmekci
Categories: cs.LG, q-bio.QM, cs.LG
