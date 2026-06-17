---
title: >-
  Rethinking Dataset Distillation for Classification: Do Distilled Sets
  Outperform Coresets?
url: 'https://arxiv.org/abs/2606.18209v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Trisha Mittal
  - Akshay Mehra
  - Joshua Kimball
categories:
  - cs.LG
  - cs.LG
published: '2026-06-16T17:37:49Z'
fetched_at: '2026-06-17T03:04:24.951Z'
---
Dataset distillation (DD) has emerged as a prominent approach in data centric machine learning, aiming to synthesize compact training sets for efficient training by compressing the information in large datasets into a small number of synthetic samples. However, DD methods are often evaluated under inconsistent evaluation protocols, ranging from standard ERM to single/multi-teacher supervision, making it difficult to isolate the effectiveness of distilled data from evaluation. Moreover, many prior methods claim that DD outperforms data pruning approaches such as coreset selection (CS), based on the assumption that restricting condensed datasets to subsets of real samples fundamentally limits their expressiveness. In this work, we critically evaluate DD methods through large-scale experiments using standardized datasets and evaluation protocols to assess their intrinsic effectiveness. We benchmark seven state-of-the-art (SOTA) DD methods on ImageNet-1K, ImageNet100, and ImageNette, using three widely adopted training protocols against three CS strategies. Our results show that while some DD methods fail to outperform even simple random subsets, the SOTA DD approaches are comparable to or worse than coresets on large-scale datasets and incur a substantially higher cost for construction. Beyond accuracy, we also evaluate the representativeness, diversity, and quality of condensed sets, and find that coresets consistently achieve better coverage of the original data distribution. 

Authors: Trisha Mittal, Akshay Mehra, Joshua Kimball
Categories: cs.LG, cs.LG
