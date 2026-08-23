---
title: >-
  Uncertainty Is Not Enough: Value-of-Information Routing for Mixtures of LoRA
  Experts
url: 'https://arxiv.org/abs/2608.02528v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tom Saliencro
  - Rohan Desai
  - Priya Nair
  - Maya Lindqvist
  - Daniel Whitmore
categories:
  - cs.LG
  - cs.LG
published: '2026-08-03T17:24:27Z'
fetched_at: '2026-08-04T11:02:55.241Z'
---
Mixtures of low-rank adaptation experts increase parameter-efficient capacity by routing each input through a subset of adapters. Recent dynamic routers activate more experts when the router or prediction is uncertain. This rule silently equates uncertainty with useful additional computation: an uncertain example may contain complementary, unqueried expert evidence, but it may instead remain ambiguous after every expert agrees. We formulate routing as certified value-of-information allocation. VI-MoLE learns the counterfactual risk remaining after each expert prefix, converts these predictions into simultaneous upper-risk certificates on held-out calibration data, and spends a global adapter budget on the token--layer action with the largest certified marginal risk reduction per unit cost. A terminal certificate then decides whether to answer or abstain. Unlike an uncertainty gate, this procedure distinguishes present ambiguity from recoverable and residual risk. We prove simultaneous certificate validity, optimal greedy allocation under diminishing certified gains, and allocation regret under value-estimation error. The evaluation protocol tests matched-compute accuracy, certificate coverage, risk--coverage, distribution shift, and tail latency against fixed and dynamic MoE-LoRA routers.

Authors: Tom Saliencro, Rohan Desai, Priya Nair, Maya Lindqvist, Daniel Whitmore
Categories: cs.LG, cs.LG
