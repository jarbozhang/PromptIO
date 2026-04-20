---
title: Optimizing Korean-Centric LLMs via Token Pruning
url: 'https://arxiv.org/abs/2604.16235v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hoyeol Kim
  - Hyeonwoo Kim
categories:
  - cs.CL
  - cs.CL
published: '2026-04-17T16:53:14Z'
fetched_at: '2026-04-20T05:39:43.395Z'
---
This paper presents a systematic benchmark of state-of-the-art multilingual large language models (LLMs) adapted via token pruning - a compression technique that eliminates tokens and embedding parameters corresponding to languages irrelevant to the target application. Focusing on Korean-centric natural language processing (NLP) tasks, we evaluate architectures including Qwen3, Gemma-3, Llama-3, and Aya across three vocabulary configurations: Original, English-Korean (EnKo), and English-Korean-Chinese (EnKoZh). Performance is assessed using established benchmarks for general aptitude, cultural literacy, instruction following, and machine translation. Our findings indicate that token pruning significantly improves generation stability by eliminating language confusion, and in the case of machine translation, frequently enhances performance on Korean-specific tasks. While instruction-following capabilities display architecture-dependent variance linked to latent cross-lingual representations, the significant reduction in vocabulary size validates token pruning as a highly effective optimization strategy for memory-constrained, domain-specific deployments, despite modest gains in inference latency.

Authors: Hoyeol Kim, Hyeonwoo Kim
Categories: cs.CL, cs.CL
