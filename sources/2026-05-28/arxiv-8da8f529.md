---
title: >-
  Human Label Variation as Stable Signal: Learning Annotator-Specific
  Explanation Behavior via Cross-Annotator Preference Optimization
url: 'https://arxiv.org/abs/2605.28802v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Beiduo Chen
  - Pingjun Hong
  - Ziyun Zhang
  - Benjamin Roth
  - Anna Korhonen
categories:
  - cs.CL
  - cs.CL
published: '2026-05-27T17:55:00Z'
fetched_at: '2026-05-28T03:17:22.085Z'
---
Free-text explanations extend human label variation (HLV) beyond label disagreement by revealing the reasoning and preferences behind annotators' decisions. We study whether large language models (LLMs) can learn and reproduce such annotator-specific label-explanation behavior. Using two sentence-pair tasks with four annotators each -- natural language inference and paraphrase judgment -- we first analyze whether annotators exhibit stable individual patterns. We find that such patterns are weak at the single-annotation level due to strong input-content effects, but become detectable after input-content reduction and annotator-level aggregation. We then compare prompting and supervised fine-tuning (SFT) baselines and propose cross-annotator preference optimization (CAPO), which contrasts a target annotator's response with other valid but less target-specific annotations for the same input. Experiments show that prompting is limited and unstable, SFT better captures annotator-specific behavior, and CAPO further improves aggregation-aware imitation and judge-based attribution while preserving target-specific reasoning patterns under human validation. Overall, our results show that HLV can be learned as annotator-specific label-explanation behavior, suggesting a path toward scalable explanation-based annotation grounded in annotator histories rather than labels alone.

Authors: Beiduo Chen, Pingjun Hong, Ziyun Zhang, Benjamin Roth, Anna Korhonen
Categories: cs.CL, cs.CL
