---
title: >-
  CRAFT: Clustering Rubrics to Diagnose Weak LLM Capabilities and Generate
  Targeted Fine-Tuning Data
url: 'https://arxiv.org/abs/2607.16122v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Vipul Gupta
  - Zihao Wang
  - Razvan-Gabriel Dumitru
  - MohammadHossein Rezaei
  - Aakash Sabharwal
categories:
  - cs.AI
  - cs.LG
  - cs.AI
published: '2026-07-17T17:00:38Z'
fetched_at: '2026-07-20T23:02:10.419Z'
---
Evaluations should do more than measure a models current performance. They should tell us what to fix for the next model iteration and provide a way to generate targeted post training data. Most evaluation pipelines identify weak examples, topics, or categories, but they leave the underlying capability failure implicit: they say where a model fails, not why. We introduce CRAFT, a method that converts any rubric based evaluation dataset into a model specific diagnosis of weak capabilities. CRAFT treats each grading criterion as a capability probe: it extracts a capability description from every prompt rubric pair, clusters these descriptions into a hierarchical capability tree, scores the target model at every node, and selects low performing nodes dynamically across tree levels, at the granularity where each failure is clearest. The selected weak capabilities then direct the generation of targeted supervised finetuning data. Holding the data generation, finetuning, and evaluation setup fixed, we compare CRAFT against prompt level EvalTree clustering and untargeted random generation on four open source models, two professional domains (finance and legal), and 13 held out benchmarks disjoint from the diagnostic data. CRAFT achieves the strongest finance domain average for all four models under repeated temperature decoding; on legal domain, it is strongest for three of four models and remains within the decoding variance bands of the best baseline on the fourth. Diagnosing weak

Authors: Vipul Gupta, Zihao Wang, Razvan-Gabriel Dumitru, MohammadHossein Rezaei, Aakash Sabharwal
Categories: cs.AI, cs.LG, cs.AI
