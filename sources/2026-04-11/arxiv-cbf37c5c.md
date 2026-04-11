---
title: 'Cram Less to Fit More: Training Data Pruning Improves Memorization of Facts'
url: 'https://arxiv.org/abs/2604.08519v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jiayuan Ye
  - Vitaly Feldman
  - Kunal Talwar
categories:
  - cs.CL
  - stat.ML
  - cs.CL
published: '2026-04-09T17:55:50Z'
fetched_at: '2026-04-11T01:43:18.433Z'
---
Large language models (LLMs) can struggle to memorize factual knowledge in their parameters, often leading to hallucinations and poor performance on knowledge-intensive tasks. In this paper, we formalize fact memorization from an information-theoretic perspective and study how training data distributions affect fact accuracy. We show that fact accuracy is suboptimal (below the capacity limit) whenever the amount of information contained in the training data facts exceeds model capacity. This is further exacerbated when the fact frequency distribution is skewed (e.g. a power law). We propose data selection schemes based on the training loss alone that aim to limit the number of facts in the training data and flatten their frequency distribution. On semi-synthetic datasets containing high-entropy facts, our selection method effectively boosts fact accuracy to the capacity limit. When pretraining language models from scratch on an annotated Wikipedia corpus, our selection method enables a GPT2-Small model (110m parameters) to memorize 1.3X more entity facts compared to standard training, matching the performance of a 10X larger model (1.3B parameters) pretrained on the full dataset.

Authors: Jiayuan Ye, Vitaly Feldman, Kunal Talwar
Categories: cs.CL, stat.ML, cs.CL
