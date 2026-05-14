---
title: Improving Reproducibility in Evaluation through Multi-Level Annotator Modeling
url: 'https://arxiv.org/abs/2605.13801v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Deepak Pandita
  - Flip Korn
  - Chris Welty
  - Christopher M. Homan
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-13T17:22:27Z'
fetched_at: '2026-05-14T12:15:41.554Z'
---
As generative AI models such as large language models (LLMs) become more pervasive, ensuring the safety, robustness, and overall trustworthiness of these systems is paramount. However, AI is currently facing a reproducibility crisis driven by unreliable evaluations and unrepeatable experimental results. While human raters are often used to assess models for utility and safety, they introduce divergent biases and subjective opinions into their annotations. Overcoming this variance is exceptionally challenging because very little data exists to study how experimental repeatability actually improves as the annotator pool grows. Standard evaluation practices typically rely on a small number of annotations per item (often 3 to 5) and lack the persistent rater identifiers necessary to model individual variance across items. In this work, we introduce a multi-level bootstrapping approach to realistically model annotator behavior. Leveraging datasets with a large number of ratings and persistent rater identifiers, we analyze the tradeoffs between the number of items ($N$) and the number of responses per item ($K$) required to achieve statistical significance.

Authors: Deepak Pandita, Flip Korn, Chris Welty, Christopher M. Homan
Categories: cs.LG, cs.AI, cs.LG
