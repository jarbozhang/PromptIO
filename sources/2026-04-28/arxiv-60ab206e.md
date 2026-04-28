---
title: >-
  The Override Gap: A Magnitude Account of Knowledge Conflict Failure in
  Hypernetwork-Based Instant LLM Adaptation
url: 'https://arxiv.org/abs/2604.23750v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shuaizhi Cheng
  - Xiang Shi
  - Mingwei Li
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-26T14:59:14Z'
fetched_at: '2026-04-28T02:04:33.981Z'
---
Hypernetwork-based methods such as Doc-to-LoRA internalize a document into an LLM's weights in a single forward pass, but they fail systematically on conflicts: when the document contradicts pretraining knowledge, accuracy collapses to 46.4% on the deepest facts. We show the failure is a magnitude problem rather than a representational one. The hypernetwork already targets the right layers, but its adapter margin is approximately constant across documents while the pretrained margin grows with training frequency, so deep conflicts lose by construction. The account predicts that failure should track prior strength: sorting 194 conflicts by the base model's log-probability on the contradicted fact, baseline accuracy falls from 68% on weak-prior questions to 16% on strong-prior ones, a 52 percentage-point gap. The cure is amplitude. Selective Layer Boosting scales the adapter at its top-norm layers, and Conflict-Aware Internalization triggers boosting only when the base model is confident. Both are training-free; together they raise deep-conflict accuracy from 46.4% to 71.0% on Gemma-2B and from 53.6% to 72.5% on Mistral-7B while preserving novel-knowledge recall, and beat vanilla retrieval-augmented generation on medium conflicts by 18 percentage points despite operating entirely in parameter space. We release KID-Bench, a 489-question benchmark that separates novel recall, cross-knowledge combination, and prior-graded conflicts.

Authors: Shuaizhi Cheng, Xiang Shi, Mingwei Li
Categories: cs.LG, cs.AI, cs.LG
