---
title: 'From Classification to Regression: Using a Fruitfly to Solve Equations'
url: 'https://arxiv.org/abs/2607.27196v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shady E. Ahmed
  - Panos Stinis
categories:
  - cs.LG
  - math.NA
  - cs.LG
published: '2026-07-29T17:58:05Z'
fetched_at: '2026-07-30T11:02:59.250Z'
---
We present a novel approach to regression tasks using classification which is motivated by the mechanism used by fruitflies to sense their environment. Specifically, we formulate a general framework for learning nonlinear input-output relationships by replacing complex global surrogate models with a finite library of representative local patterns. Since scientific data often occupy limited and recurring regions of the input space, we generate predictions by measuring similarities between a query and stored patterns, then combining their associated responses through weighted reconstruction. We apply this approach to nonlinear dynamical systems, data-driven regression, and physics-informed learning using suitable embeddings and similarity measures. For dynamical systems, our offline-online workflow extracts patterns from data or governing equations during the offline phase, while online prediction requires only similarity evaluation and response aggregation. This structure helps us reduce computational and memory demands while providing explicit control over the trade-off among accuracy, storage, and inference cost.

Authors: Shady E. Ahmed, Panos Stinis
Categories: cs.LG, math.NA, cs.LG
