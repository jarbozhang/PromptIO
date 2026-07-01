---
title: >-
  When LLMs Read Tables Carelessly: Measuring and Reducing Data Referencing
  Errors
url: 'https://arxiv.org/abs/2606.32029v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuqing Yang
  - Qi Zhu
  - Zhen Han
  - Boran Han
  - Zhengyuan Shen
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-06-30T17:54:50Z'
fetched_at: '2026-07-01T23:03:14.690Z'
---
While large language models (LLMs) perform well on table tasks, they still make data referencing errors (DREs), i.e., incorrectly citing or omitting table values, despite understanding the table structure. Beyond final-answer accuracy, DREs directly compromise the correctness and reliability of intermediate reasoning steps. Yet prior studies have only offered limited, small-scale analyses. In this work, we present the first systematic evaluation of tabular data referencing errors across different models and tasks. Our results show that DREs occur across all tested models (1.7B to 20B parameters). Furthermore, we demonstrate that incorporating data referencing as a critic significantly improves answer accuracy up to 12.0%, through critic-based filtering and rejection sampling. Finally, we trained a lightweight 4B-parameter critic model that achieves an average F1 score of 78.2% in detecting both in-distribution and out-of-distribution DREs, and effectively assists inference for larger models.

Authors: Yuqing Yang, Qi Zhu, Zhen Han, Boran Han, Zhengyuan Shen
Categories: cs.CL, cs.AI, cs.CL
