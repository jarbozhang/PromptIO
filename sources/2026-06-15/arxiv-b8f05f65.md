---
title: 'SkMTEB: Slovak Massive Text Embedding Benchmark and Model Adaptation'
url: 'https://arxiv.org/abs/2606.13647v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Marek Šuppa
  - Andrej Ridzik
  - Daniel Hládek
  - Natália Kňažeková
  - Viktória Ondrejová
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-06-11T17:50:06Z'
fetched_at: '2026-06-14T23:19:44.404Z'
---
We introduce SkMTEB, the first comprehensive MTEB-style text embedding benchmark for Slovak, a low-resource West Slavic language, comprising 31 datasets across 7 task types -- nearly 4$\times$ the depth of existing multilingual benchmark coverage for Slovak. Our evaluation of 31 embedding models reveals that large instruction-tuned multilingual models achieve the strongest performance, while existing Slovak-specific models trained for NLU tasks transfer poorly to embedding tasks. To address the need for efficient, locally-deployable Slovak embeddings, we develop \texttt{e5-sk-small} (45M parameters) and \texttt{e5-sk-large} (365M) by applying vocabulary trimming and fine-tuning to Multilingual E5 models. Despite size reductions of up to 62\%, our open-source models achieve competitive performance with proprietary APIs while remaining locally deployable for semantic search and retrieval-augmented generation (RAG). We release the benchmark, models, datasets, and code openly, hoping our approach offers a replicable path for other under-resourced languages.

Authors: Marek Šuppa, Andrej Ridzik, Daniel Hládek, Natália Kňažeková, Viktória Ondrejová
Categories: cs.CL, cs.AI, cs.LG, cs.CL
