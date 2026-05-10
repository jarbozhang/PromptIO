---
title: 'Superintelligent Retrieval Agent: The Next Frontier of Information Retrieval'
url: 'https://arxiv.org/abs/2605.06647v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zeyu Yang
  - Qi Ma
  - Jason Chen
  - Anshumali Shrivastava
categories:
  - cs.IR
  - cs.AI
  - cs.LG
  - cs.IR
published: '2026-05-07T17:54:29Z'
fetched_at: '2026-05-10T05:29:17.423Z'
---
Retrieval-augmented agents are increasingly the interface to large organizational knowledge bases, yet most still treat retrieval as a black box: they issue exploratory queries, inspect returned snippets, and iteratively reformulate until useful evidence emerges. This approach resembles how a newcomer searches an unfamiliar database rather than how an expert navigates it with strong priors about terminology and likely evidence, and results in unnecessary retrieval rounds, increased latency, and poor recall. We introduce \textit{SuperIntelligent Retrieval Agent} (SIRA), which defines \emph{superintelligence} in retrieval as the ability to compress multi-round exploratory search into a single corpus-discriminative retrieval action. SIRA does not merely ask what terms are relevant to the query; it asks which terms are likely to separate the desired evidence from corpus-level confusers. On the corpus side, an LLM enriches each document offline with missing search vocabulary; on the query side, it predicts evidence vocabulary omitted by the query; and document-frequency statistics as a tool call to filter proposed terms that are absent, overly common, or unlikely to create retrieval margin. The final retrieval step is a single weighted BM25 call combining the original query with the validated expansion. Across ten BEIR benchmarks and downstream question-answering tasks, SIRA achieves the significantly superior performance outperforming dense retrievers and state-of-the-art multi-r

Authors: Zeyu Yang, Qi Ma, Jason Chen, Anshumali Shrivastava
Categories: cs.IR, cs.AI, cs.LG, cs.IR
