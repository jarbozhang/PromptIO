---
title: The Abstraction Gap in Vision-Language Causal Reasoning
url: 'https://arxiv.org/abs/2605.28779v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chinh Hoang
  - Mohammad Rashedul Hasan
categories:
  - cs.CL
  - cs.CV
  - cs.CL
published: '2026-05-27T17:38:10Z'
fetched_at: '2026-05-28T03:17:22.087Z'
---
Vision-language models (VLMs) generate fluent causal explanations, but current evaluations cannot distinguish linguistic plausibility from faithful causal reasoning. We introduce a dual-probe methodology that isolates these properties. The Text-Only Probe measures linguistic quality. The Chain-Text Probe requires models to first generate explicit causal chains. The Abstraction Gap (AG) metric quantifies the normalized performance difference. Evaluating eight VLMs on CAGE (Causal Abstraction Gap Evaluation), a benchmark of 49,500 questions across 5,500 images spanning Pearl's causal hierarchy, we find seven models exhibit AG exceeding 0.50 with text scores of 6--8 but chain scores below 2.5. Fine-tuning on 45,000 chain-annotated examples fails to close the gap. However, one model achieves near-zero AG. The capability exists within current VLM architectures and depends on pretraining and architectural choices. CAGE provides a diagnostic tool for assessing faithful causal reasoning in VLMs.

Authors: Chinh Hoang, Mohammad Rashedul Hasan
Categories: cs.CL, cs.CV, cs.CL
