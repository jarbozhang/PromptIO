---
title: >-
  Detect, Unlearn, Restore: Defending Text Summarization Models Against Data
  Poisoning
url: 'https://arxiv.org/abs/2606.26036v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Poojitha Thota
  - Shirin Nilizadeh
categories:
  - cs.CL
  - cs.CR
  - cs.CL
published: '2026-06-24T17:12:42Z'
fetched_at: '2026-06-25T07:41:52.283Z'
---
Training-time data poisoning during fine-tuning poses a significant threat to large language models (LLMs) deployed for abstractive text summarization, where small task-specific datasets exert disproportionate influence on model behavior. In this setting, adversaries manipulate fine-tuning data to induce persistent summarization failures, such as biased or harmful summaries, while preserving standard evaluation metrics. We present a unified post-hoc defense framework for detecting and remediating fine-tuning-stage poisoning in summarization models across the machine learning supply chain. Our experiments show that in white-box settings, poisoned document-summary pairs exhibit abnormally high training influence, enabling detection via influence-function analysis with semantic consistency checks. In black-box settings, poisoned models display two to three times greater sensitivity to semantics-preserving perturbations, enabling behavioral auditing without training data access. Beyond existing poisoning formulations, we introduce novel attacks targeting factual distortion and representational bias, showing that poisoning alters summarization behavior without triggering conventional alarms. Across nine architectures and six benchmark datasets under adaptive attacks, our defenses achieve 85-92% detection precision, while gradient-ascent unlearning restores up to 96% of original behavior with minimal utility loss (less than 0.6% ROUGE degradation). These results indicate that fine-

Authors: Poojitha Thota, Shirin Nilizadeh
Categories: cs.CL, cs.CR, cs.CL
