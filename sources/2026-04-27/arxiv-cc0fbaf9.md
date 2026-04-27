---
title: >-
  Rethinking XAI Evaluation: A Human-Centered Audit of Shapley Benchmarks in
  High-Stakes Settings
url: 'https://arxiv.org/abs/2604.22662v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Inês Oliveira e Silva
  - Sérgio Jesus
  - Iker Perez
  - Rita P. Ribeiro
  - Carlos Soares
categories:
  - cs.LG
  - cs.AI
  - cs.HC
  - cs.LG
published: '2026-04-24T15:38:44Z'
fetched_at: '2026-04-27T07:57:01.884Z'
---
Shapley values are a cornerstone of explainable AI, yet their proliferation into competing formulations has created a fragmented landscape with little consensus on practical deployment. While theoretical differences are well-documented, evaluation remains reliant on quantitative proxies whose alignment with human utility is unverified. In this work, we use a unified amortized framework to isolate semantic differences between eight Shapley variants under the low-latency constraints of operational risk workflows. We conduct a large-scale empirical evaluation across four risk datasets and a realistic fraud-detection environment involving professional analysts and 3,735 case reviews. Our results reveal a fundamental misalignment: standard quantitative metrics, such as sparsity and faithfulness, are decoupled from human-perceived clarity and decision utility. Furthermore, while no formulation improved objective analyst performance, explanations consistently increased decision confidence, signaling a critical risk of automation bias in high-stakes settings. These findings suggest that current evaluation proxies are insufficient for predicting downstream human impact, and we provide evidence-based guidance for selecting formulations and metrics in operational decision systems.

Authors: Inês Oliveira e Silva, Sérgio Jesus, Iker Perez, Rita P. Ribeiro, Carlos Soares
Categories: cs.LG, cs.AI, cs.HC, cs.LG
