---
title: >-
  CoMet: Context and Multiplicity Decomposition for Multimodal Uncertainty
  Estimation
url: 'https://arxiv.org/abs/2606.32012v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sanghyuk Chun
  - William Yang
  - Amaya Dharmasiri
  - Olga Russakovsky
categories:
  - cs.LG
  - cs.CV
  - cs.LG
published: '2026-06-30T17:46:09Z'
fetched_at: '2026-07-01T23:03:14.709Z'
---
Uncertainty estimation has been a long-standing challenge in AI models; it amounts to "knowing what you don't know," and metacognition is notoriously difficult even for humans (cf. the Dunning-Kruger effect). Although it is still far from solved even in simpler classification systems, tackling it in multimodal large language models (MLLMs) is becoming increasingly important. Within MLLMs, uncertainty can stem from any of the diverse sources as well as from their relationships, and further can stem from the unbounded answers in the open-ended setting. To tackle the issues, we propose CoMet, an MLLM uncertainty estimation method by decomposing uncertainty into a context-specific term and a multiplicity-specific term. The former captures ambiguity induced by the given context (e.g., task or prompt), while the latter captures how many plausible answers determined by the context remain compatible with the given input. We train a lightweight post-hoc uncertainty module to estimate these quantities, which enables efficient uncertainty estimation without autoregressive answer generation or repeated sampling. Experiments on various open-ended multimodal benchmarks, hallucination detection, and multiple-choice visual question answering benchmarks show that CoMet consistently improves uncertainty estimation over existing baselines while remaining efficient in practice. Code is available at https://github.com/princetonvisualai/comet_uncertainty

Authors: Sanghyuk Chun, William Yang, Amaya Dharmasiri, Olga Russakovsky
Categories: cs.LG, cs.CV, cs.LG
