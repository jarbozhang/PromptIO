---
title: >-
  LLM-Based Examination of Eligibility Criteria from Securities Prospectuses at
  the German Central Bank
url: 'https://arxiv.org/abs/2606.27316v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Serhii Hamotskyi
  - Akash Kumar Gautam
  - Christian Hänig
categories:
  - cs.CL
  - cs.CL
published: '2026-06-25T17:29:58Z'
fetched_at: '2026-06-28T00:49:08.594Z'
---
Verifying the eligibility of securities as collateral is a key responsibility of the German Central Bank. However, manually verifying these assets against legal and financial criteria within lengthy, semi-structured, and often bilingual prospectuses is a resource-intensive task. While previous efforts utilized traditional Named Entity Recognition (NER) for information extraction, these methods can struggle with OCR noise, linguistic variance, and rigid span-based constraints, and the need for manually annotated training data for each relevant annotation type. In this paper, we present the first case study applying Large Language Models (LLMs) to the eligibility examination process, shifting the paradigm toward a generative Information Extraction pipeline. Our approach decomposes the task into extraction, normalization, and interpretation, allowing for greater flexibility in handling noisy text and interleaved German-English content. We further introduce a value-based evaluation methodology using LLM-as-a-judge, which offers a more semantic assessment than location-based metrics. Our results demonstrate that LLM-based systems achieve high precision (up to 91%) in document-level eligibility, exhibiting a conservative operating profile that minimizes false acceptance.

Authors: Serhii Hamotskyi, Akash Kumar Gautam, Christian Hänig
Categories: cs.CL, cs.CL
