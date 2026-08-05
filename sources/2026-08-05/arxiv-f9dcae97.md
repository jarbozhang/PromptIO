---
title: Interpretable Adaptive Sampling for LLM Test-Time Scaling
url: 'https://arxiv.org/abs/2608.03961v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mobina Kashaniyan
  - Ali Jannesari
categories:
  - cs.AI
  - cs.AI
published: '2026-08-04T17:27:21Z'
fetched_at: '2026-08-05T11:02:38.585Z'
---
Test-time scaling improves LLM reasoning by generating and aggregating multiple candidate answers, yet many pipelines use fixed per-query budgets that spend the same compute on easy and difficult prompts. These fixed budgets are also difficult to inspect because they do not explain why a given prompt receives a particular number of samples. We propose adaptive} test-time scaling with a lightweight fuzzy controller that maps interpretable signals, including estimated prompt complexity and model confidence, to a per-query sampling budget. The controller assigns fewer samples to easier or more confident prompts and more samples to harder or less certain prompts, making inference-time compute inspectable rather than fixed or opaque. We evaluate under a fair-alignment protocol with matched decoding settings and controlled answer selection, and compare against best-of-$N$, compute-aware scaling, and self-certainty-based baselines on question-answering and mathematical reasoning tasks. Across models and datasets, adaptive fuzzy control improves over several standard baselines and remains close to a selector-matched full-budget control while reducing the average number of samples. These findings suggest that interpretable adaptive sampling is a practical direction for more efficient test-time reasoning in large language models.

Authors: Mobina Kashaniyan, Ali Jannesari
Categories: cs.AI, cs.AI
