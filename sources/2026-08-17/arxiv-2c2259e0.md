---
title: 'Information Satisfaction: A Reader-Centered Axis for Summarization Evaluation'
url: 'https://arxiv.org/abs/2608.14457v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Isabel Cachola
  - William Walden
  - Reno Kriz
  - Mark Dredze
categories:
  - cs.CL
  - cs.CL
published: '2026-08-14T16:41:23Z'
fetched_at: '2026-08-17T11:03:44.075Z'
---
The majority of work on summarization evaluation focuses on general summary quality (e.g., ROUGE, BERTScore) or specific desired properties (e.g., readability, factuality). However, these metrics fail to measure the utility of a summary to an individual user. For example, a biomedical researcher learning about the latest vaccine research will have different informational needs from a family doctor. Query-focused summarization captures part of this need, but in practice, users rarely state everything relevant in a query: a single short query is likely inadequate to distinguish the needs of a researcher from those of a physician. By contrast, a reader's background or persona (their role and expertise) is comparatively stable across queries and recovers much of this missing context, which makes it a practical signal for assessing whether a summary satisfies that reader's needs. In this work, we assess how sensitive popular summarization metrics are to both informational and persona differences, and find that many popular metrics, including strong LLM-as-judge metrics, fail basic perturbation tests of informational content. We additionally conduct an expert human evaluation, measuring summary preferences based on information satisfaction given a specific person's background and use case. We find that both traditional and LLM-based metrics are insufficient measures of information satisfaction and agree poorly with human judgment.

Authors: Isabel Cachola, William Walden, Reno Kriz, Mark Dredze
Categories: cs.CL, cs.CL
