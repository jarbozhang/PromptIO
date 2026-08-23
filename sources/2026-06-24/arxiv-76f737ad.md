---
title: >-
  ScaleToT: Generalizing Structured LLM Reasoning for Billion-Scale Low-Activity
  User Modeling
url: 'https://arxiv.org/abs/2606.24605v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tianbao Ma
  - Chang Xi
  - Yichuan Zou
  - Chengen Li
  - Linxun Chen
categories:
  - cs.AI
  - cs.AI
published: '2026-06-23T14:05:37Z'
fetched_at: '2026-06-24T01:28:36.382Z'
---
Accurate user modeling often depends on rich interaction histories, which are unavailable for billions of low-activity users. Large Language Models (LLMs) can infer latent user states from static profiles, but this reasoning becomes unreliable when profiles are sparse, and applying an LLM to billions of users is prohibitively expensive. We present ScaleToT, which learns structured reasoning from a small LLM-processed subset and extends it to the broader low-activity user population. To improve reasoning reliability, ScaleToT constructs typed user-state chains with a bounded entropy-guided Tree-of-Thought (ToT) refinement procedure. To make this structured reasoning usable from sparse profiles, the teacher-curated chains are used to train a student model on static profiles through supervised fine-tuning (SFT) and Outcome-Driven Segment-Aware Implicit Reward Policy Optimization (OSIPO). ScaleToT then transfers the student's reasoning representations to a lightweight profile encoder, providing shared reasoning signals for the remaining users without LLM inference. We evaluate ScaleToT on lifetime value (LTV) prediction in a billion-scale advertising deployment. A randomized online A/B test increased LT30 by 6.738\%, while offline reasoning covered only 7.32\% of the potential population, greatly reducing compute cost compared with full-population reasoning.

Authors: Tianbao Ma, Chang Xi, Yichuan Zou, Chengen Li, Linxun Chen
Categories: cs.AI, cs.AI
