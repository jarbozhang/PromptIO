---
title: >-
  An Answer is just the Start: Related Insight Generation for Open-Ended
  Document-Grounded QA
url: 'https://arxiv.org/abs/2604.19685v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Saransh Sharma
  - Pritika Ramu
  - Aparna Garimella
  - Koyel Mukherjee
categories:
  - cs.CL
  - cs.CL
published: '2026-04-21T17:07:53Z'
fetched_at: '2026-04-22T08:06:49.540Z'
---
Answering open-ended questions remains challenging for AI systems because it requires synthesis, judgment, and exploration beyond factual retrieval, and users often refine answers through multiple iterations rather than accepting a single response. Existing QA benchmarks do not explicitly support this refinement process. To address this gap, we introduce a new task, document-grounded related insight generation, where the goal is to generate additional insights from a document collection that help improve, extend, or rethink an initial answer to an open-ended question, ultimately supporting richer user interaction and a better overall question answering experience. We curate and release SCOpE-QA (Scientific Collections for Open-Ended QA), a dataset of 3,000 open-ended questions across 20 research collections. We present InsightGen, a two-stage approach that first constructs a thematic representation of the document collection using clustering, and then selects related context based on neighborhood selection from the thematic graph to generate diverse and relevant insights using LLMs. Extensive evaluation on 3,000 questions using two generation models and two evaluation settings shows that InsightGen consistently produces useful, relevant, and actionable insights, establishing a strong baseline for this new task.

Authors: Saransh Sharma, Pritika Ramu, Aparna Garimella, Koyel Mukherjee
Categories: cs.CL, cs.CL
