---
title: >-
  Behaviour-Conditioned Neural Processes for Adaptive Residential Short-Term
  Load Forecasting
url: 'https://arxiv.org/abs/2607.16168v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ramin Soleimani
  - Andrea Visentin
  - Dirk Pesch
categories:
  - cs.LG
  - cs.LG
published: '2026-07-17T17:48:22Z'
fetched_at: '2026-07-20T23:02:10.415Z'
---
Residential short-term load forecasting (STLF) is challenging because household demand is heterogeneous, temporally variable, and shaped by diverse behavioural routines. This work investigates whether inferred behavioural structure can be embedded within the forecasting mechanism of a Neural Process-based probabilistic model, rather than used only as an external grouping signal, for context-conditioned residential STLF. We propose a behaviour-conditioned Attentive Neural Process framework that treats each load profile as a forecasting task. Behavioural structure is represented by a discrete latent variable inferred from the available context and used for behaviour-conditioned decoder conditioning, while a continuous latent variable captures shared functional uncertainty across heterogeneous profiles. To enable conditioning without ground-truth behavioural labels, clustering-derived information provides weak supervision during training, whereas test-time conditioning relies only on context-inferred class distributions. Experiments on the Smart Grid, Smart City (SGSC) dataset use user-disjoint train/validation/test splits, variable context lengths, and multi-step forecast horizons, with comparisons against a label-agnostic ANP baseline and fixed-window deterministic STLF baselines. The proposed variants improve MAE and CRPS over ANP across horizons and context settings, with the largest gains under limited context. The best-performing variant achieves average reductions of 7.9%

Authors: Ramin Soleimani, Andrea Visentin, Dirk Pesch
Categories: cs.LG, cs.LG
