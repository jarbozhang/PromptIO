---
title: >-
  SpatialEvo: Self-Evolving Spatial Intelligence via Deterministic Geometric
  Environments
url: 'https://arxiv.org/abs/2604.14144v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Dinging Li
  - Yingxiu Zhao
  - Xinrui Cheng
  - Kangheng Lin
  - Hongbo Peng
categories:
  - cs.CV
  - cs.CL
  - cs.CV
published: '2026-04-15T17:59:12Z'
fetched_at: '2026-04-16T06:07:35.551Z'
---
Spatial reasoning over three-dimensional scenes is a core capability for embodied intelligence, yet continuous model improvement remains bottlenecked by the cost of geometric annotation. The self-evolving paradigm offers a promising path, but its reliance on model consensus to construct pseudo-labels causes training to reinforce rather than correct the model's own geometric errors. We identify a property unique to 3D spatial reasoning that circumvents this limitation: ground truth is a deterministic consequence of the underlying geometry, computable exactly from point clouds and camera poses without any model involvement. Building on this insight, we present SpatialEvo, a self-evolving framework for 3D spatial reasoning, centered on the Deterministic Geometric Environment (DGE). The DGE formalizes 16 spatial reasoning task categories under explicit geometric validation rules and converts unannotated 3D scenes into zero-noise interactive oracles, replacing model consensus with objective physical feedback. A single shared-parameter policy co-evolves across questioner and solver roles under DGE constraints: the questioner generates physically valid spatial questions grounded in scene observations, while the solver derives precise answers against DGE-verified ground truth. A task-adaptive scheduler endogenously concentrates training on the model's weakest categories, producing a dynamic curriculum without manual design. Experiments across nine benchmarks demonstrate that SpatialE

Authors: Dinging Li, Yingxiu Zhao, Xinrui Cheng, Kangheng Lin, Hongbo Peng
Categories: cs.CV, cs.CL, cs.CV
