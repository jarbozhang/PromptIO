---
title: >-
  The Illusion of Robustness: Aggregate Accuracy Hides Prediction Flips under
  Task-Irrelevant Context
url: 'https://arxiv.org/abs/2607.12963v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yanzhe Zhang
  - Sanmi Koyejo
  - Diyi Yang
categories:
  - cs.CL
  - cs.CL
published: '2026-07-14T17:01:12Z'
fetched_at: '2026-07-15T23:03:05.477Z'
---
As large language models (LLMs) grow more capable, they are increasingly deployed in context-rich settings where task inputs are often accompanied by long, partially irrelevant context. In a controlled setting, we find that state-of-the-art models often appear robust to task-irrelevant context at the aggregate level: prepending it to benchmark questions causes little change in overall accuracy. This aggregate stability, however, masks significant per-example instability. Even semantically meaningless pseudo-words, formed by randomly combining characters, can markedly shift model predictions on a small fraction of examples, degrading performance on some while improving it on others. This two-sided effect holds consistently across a wide range of models and datasets, yet the affected examples are largely model-specific. We further show that this instability is modulated by context type, context length, test-time compute, and model development stage. Together, our findings reveal context-induced tail risks concealed by aggregate accuracy, motivating per-example reliability evaluation of language models.

Authors: Yanzhe Zhang, Sanmi Koyejo, Diyi Yang
Categories: cs.CL, cs.CL
