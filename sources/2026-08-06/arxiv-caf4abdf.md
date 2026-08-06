---
title: >-
  OctoLong: Mid-Training On Cross-Repository Code Contexts Enhances Long-Context
  Modeling
url: 'https://arxiv.org/abs/2608.05141v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Indraneil Paul
  - Falko Helm
  - Goran Glavaš
  - Iryna Gurevych
categories:
  - cs.AI
  - cs.LG
  - cs.SE
  - cs.AI
published: '2026-08-05T17:58:15Z'
fetched_at: '2026-08-06T11:02:48.670Z'
---
Context lengths of language models (LMs) have dramatically increased, driven by the demands for in-context learning, self-improvement, and long-horizon agentic workflows. Existing long-context corpora, however, are dominated by books, academic articles, and code repositories, which are finite resources and often scarce in long-distance dependencies. In this work, we introduce OctoLong, a context engineering pipeline that instruments an AST parser, a language server backend, and a package manager to facilitate the recursive retrieval of code references, enabling the curation of dependency-rich code contexts of millions of tokens in length. We then train OctoLong-Instruct, a suite of capable long-context open LMs, derived from base models ranging in size from 600M to 14B parameters, via context-extension mid-training on a ~50B-token mixture containing ~6.2B tokens of OctoLong code contexts, followed by ~10B tokens of instruction tuning. Our training ablations and experimental evaluations against 18 state-of-the-art open-weight long-context LMs show that supplanting just 12% of traditional context-extension corpora with OctoLong data yields substantial gains in long-range retrieval, long-term state tracking, repository-level code understanding, and downstream agentic tasks, while also enhancing API usage in short-context coding scenarios.

Authors: Indraneil Paul, Falko Helm, Goran Glavaš, Iryna Gurevych
Categories: cs.AI, cs.LG, cs.SE, cs.AI
