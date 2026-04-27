---
title: 'CRAFT: Clustered Regression for Adaptive Filtering of Training data'
url: 'https://arxiv.org/abs/2604.22693v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Parthasarathi Panda
  - Asheswari Swain
  - Subhrakanta Panda
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-04-24T16:27:39Z'
fetched_at: '2026-04-27T07:57:01.881Z'
---
Selecting a small, high-quality subset from a large corpus for fine-tuning is increasingly important as corpora grow to tens of millions of datapoints, making full fine-tuning expensive and often unnecessary. We propose CRAFT (Clustered Regression for Adaptive Filtering of Training data), a vectorization-agnostic selection method for training sequence-to-sequence models. CRAFT decomposes the joint source-target distribution and performs a two-stage selection: (i) match the validation source distribution through proportional budget allocation across k-means clusters, and (ii) within each source cluster, select training pairs whose target embeddings minimize a conditional expected distance derived from the validation target distribution. We prove that proportional cluster allocation bounds the continuous KL divergence between selected and validation distributions, with the residual controlled by cluster diameters. We evaluate CRAFT on English-Hindi translation by selecting training data from 33 million NLLB sentence pairs and fine-tuning mBART via LoRA. CRAFT achieves 43.34 BLEU, outperforming TSDS (41.21) by 2.13 points on the same candidate pool and encoder while completing selection over 40 times faster. With TF-IDF vectorization, the entire pipeline completes in under one minute on CPU. TAROT achieves 45.61 BLEU, but CRAFT completes selection in 26.86 seconds versus TAROT's 75.6 seconds, a 2.8 time speedup.

Authors: Parthasarathi Panda, Asheswari Swain, Subhrakanta Panda
Categories: cs.CL, cs.AI, cs.CL
