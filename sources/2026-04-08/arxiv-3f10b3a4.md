---
title: >-
  Generating Synthetic Doctor-Patient Conversations for Long-form Audio
  Summarization
url: 'https://arxiv.org/abs/2604.06138v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yanis Labrak
  - David Grünert
  - Séverin Baroudi
  - Jiyun Chun
  - Pawel Cyrta
categories:
  - cs.SD
  - cs.AI
  - cs.SD
published: '2026-04-07T17:45:07Z'
fetched_at: '2026-04-08T02:58:13.563Z'
---
Long-context audio reasoning is underserved in both training data and evaluation. Existing benchmarks target short-context tasks, and the open-ended generation tasks most relevant to long-context reasoning pose well-known challenges for automatic evaluation. We propose a synthetic data generation pipeline designed to serve both as a training resource and as a controlled evaluation environment, and instantiate it for first-visit doctor-patient conversations with SOAP note generation as the task. The pipeline has three stages, persona-driven dialogue generation, multi-speaker audio synthesis with overlap/pause modeling, room acoustics, and sound events, and LLM-based reference SOAP note production, built entirely on open-weight models. We release 8,800 synthetic conversations with 1.3k hours of corresponding audio and reference notes. Evaluating current open-weight systems, we find that cascaded approaches still substantially outperform end-to-end models.

Authors: Yanis Labrak, David Grünert, Séverin Baroudi, Jiyun Chun, Pawel Cyrta
Categories: cs.SD, cs.AI, cs.SD
