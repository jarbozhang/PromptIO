---
title: >-
  De Jure: Iterative LLM Self-Refinement for Structured Extraction of Regulatory
  Rules
url: 'https://arxiv.org/abs/2604.02276v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Keerat Guliani
  - Deepkamal Gill
  - David Landsman
  - Nima Eshraghi
  - Krishna Kumar
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-04-02T17:06:50Z'
fetched_at: '2026-04-06T00:50:51.201Z'
---
Regulatory documents encode legally binding obligations that LLM-based systems must respect. Yet converting dense, hierarchically structured legal text into machine-readable rules remains a costly, expert-intensive process. We present De Jure, a fully automated, domain-agnostic pipeline for extracting structured regulatory rules from raw documents, requiring no human annotation, domain-specific prompting, or annotated gold data. De Jure operates through four sequential stages: normalization of source documents into structured Markdown; LLM-driven semantic decomposition into structured rule units; multi-criteria LLM-as-a-judge evaluation across 19 dimensions spanning metadata, definitions, and rule semantics; and iterative repair of low-scoring extractions within a bounded regeneration budget, where upstream components are repaired before rule units are evaluated. We evaluate De Jure across four models on three regulatory corpora spanning finance, healthcare, and AI governance. On the finance domain, De Jure yields consistent and monotonic improvement in extraction quality, reaching peak performance within three judge-guided iterations. De Jure generalizes effectively to healthcare and AI governance, maintaining high performance across both open- and closed-source models. In a downstream compliance question-answering evaluation via RAG, responses grounded in De Jure extracted rules are preferred over prior work in 73.8% of cases at single-rule retrieval depth, rising to 84.0% 

Authors: Keerat Guliani, Deepkamal Gill, David Landsman, Nima Eshraghi, Krishna Kumar
Categories: cs.AI, cs.CL, cs.LG, cs.AI
