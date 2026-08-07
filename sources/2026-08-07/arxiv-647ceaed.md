---
title: >-
  Benchmarking and Enhancing LLMs for Rule-Intensive Review of National Standard
  Documents
url: 'https://arxiv.org/abs/2608.06312v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tao Wang
  - Qihao Yang
  - Rongjiao Liang
  - Lianghong Lin
  - Haitao Wang
categories:
  - cs.CL
  - cs.CL
published: '2026-08-06T17:27:23Z'
fetched_at: '2026-08-07T11:01:42.593Z'
---
Large language models (LLMs) increasingly support complex professional tasks, yet their capabilities in rule-intensive document review remain insufficiently evaluated. National standard documents, such as China GB/T standards, offer a representative testbed: they are lengthy, highly structured, and governed by explicit rules for scope, terminology, normative wording, and cross-section consistency. Existing benchmarks focus on domain knowledge and question answering, largely overlooking intrinsic quality review for professional documents. Such reviews rely heavily on human experts, making them costly and difficult to scale. To bridge this gap, we introduce GB/T-Bench, the first benchmark for the structured review of national standard documents. Its GB/T Review Taxonomy is a hierarchical schema covering document structure, scope alignment, normative modality, terminology consistency, and normative references, with 25 diagnosable error types. A controllable counterexample generation mechanism combines deterministic rules and constrained LLM rewriting to process 488 documents into 7,306 traceable review error instances for evaluation. We also develop a diagnosis-oriented evaluation protocol requiring exact matches on error location, review dimension, and error type, plus document-level coverage metrics. We further propose GB/T-Reviewer, a multi-agent framework that converts review knowledge into specialized skills and coordinates global inspection, targeted diagnosis, rule scanni

Authors: Tao Wang, Qihao Yang, Rongjiao Liang, Lianghong Lin, Haitao Wang
Categories: cs.CL, cs.CL
