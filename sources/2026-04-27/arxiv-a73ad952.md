---
title: >-
  BERAG: Bayesian Ensemble Retrieval-Augmented Generation for Knowledge-based
  Visual Question Answering
url: 'https://arxiv.org/abs/2604.22678v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jinghong Chen
  - Jingbiao Mei
  - Guangyu Yang
  - Bill Byrne
categories:
  - cs.CL
  - cs.CL
published: '2026-04-24T16:01:19Z'
fetched_at: '2026-04-27T07:57:01.882Z'
---
A common approach to question answering with retrieval-augmented generation (RAG) is to concatenate documents into a single context and pass it to a language model to generate an answer. While simple, this strategy can obscure the contribution of individual documents, making attribution difficult and contributing to the ``lost-in-the-middle'' effect, where relevant information in long contexts is overlooked. Concatenation also scales poorly: computational cost grows quadratically with context length, a problem that becomes especially severe when the context includes visual data, as in visual question answering. Attempts to mitigate these issues by limiting context length can further restrict performance by preventing models from benefiting from the improved recall offered by deeper retrieval. We propose Bayesian Ensemble Retrieval-Augmented Generation (BERAG), along with Bayesian Ensemble Fine-Tuning (BEFT), as a RAG framework in which language models are conditioned on individual retrieved documents rather than a single combined context. BERAG treats document posterior probabilities as ensemble weights and updates them token by token using Bayes' rule during generation. This approach enables probabilistic re-ranking, parallel memory usage, and clear attribution of document contribution, making it well-suited for large document collections. We evaluate BERAG and BEFT primarily on knowledge-based visual question answering tasks, where models must reason over long, imperfect re

Authors: Jinghong Chen, Jingbiao Mei, Guangyu Yang, Bill Byrne
Categories: cs.CL, cs.CL
