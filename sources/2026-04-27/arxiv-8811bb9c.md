---
title: >-
  Can QPP Choose the Right Query Variant? Evaluating Query Variant Selection for
  RAG Pipelines
url: 'https://arxiv.org/abs/2604.22661v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Negar Arabzadeh
  - Andrew Drozdov
  - Michael Bendersky
  - Matei Zaharia
categories:
  - cs.IR
  - cs.CL
  - cs.IR
published: '2026-04-24T15:36:40Z'
fetched_at: '2026-04-27T07:57:01.884Z'
---
Large Language Models (LLMs) have made query reformulation ubiquitous in modern retrieval and Retrieval-Augmented Generation (RAG) pipelines, enabling the generation of multiple semantically equivalent query variants. However, executing the full pipeline for every reformulation is computationally expensive, motivating selective execution: can we identify the best query variant before incurring downstream retrieval and generation costs? We investigate Query Performance Prediction (QPP) as a mechanism for variant selection across ad-hoc retrieval and end-to-end RAG. Unlike traditional QPP, which estimates query difficulty across topics, we study intra-topic discrimination - selecting the optimal reformulation among competing variants of the same information need. Through large-scale experiments on TREC-RAG using both sparse and dense retrievers, we evaluate pre- and post-retrieval predictors under correlation- and decision-based metrics. Our results reveal a systematic divergence between retrieval and generation objectives: variants that maximize ranking metrics such as nDCG often fail to produce the best generated answers, exposing a "utility gap" between retrieval relevance and generation fidelity. Nevertheless, QPP can reliably identify variants that improve end-to-end quality over the original query. Notably, lightweight pre-retrieval predictors frequently match or outperform more expensive post-retrieval methods, offering a latency-efficient approach to robust RAG.

Authors: Negar Arabzadeh, Andrew Drozdov, Michael Bendersky, Matei Zaharia
Categories: cs.IR, cs.CL, cs.IR
